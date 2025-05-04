import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RetrievalQAChain } from 'langchain/chains';
import fs from 'fs';
import path from 'path';

const PDF_DIR = 'rag/docs';
const MODEL_DIR = 'rag/model';
const MODEL_PATH = path.join(MODEL_DIR, 'rag_model.json');

let vectorStore;

export async function trainRag() {

    if (fs.existsSync(MODEL_PATH)) {
        console.log('Carregando modelo existente de', MODEL_PATH);
        const storeData = JSON.parse(fs.readFileSync(MODEL_PATH));
        vectorStore = new MemoryVectorStore(new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY }));
        vectorStore.memoryVectors = storeData.vectors.map(v => ({
            id: v.id,
            embedding: v.embedding,
            content: v.content,
            metadata: v.metadata
        }));
        vectorStore.documents = storeData.documents;
        return vectorStore;
    }

    const pdfFiles = fs.readdirSync(PDF_DIR).filter(file => file.endsWith('.pdf'));
    if (pdfFiles.length === 0) {
        throw new Error('Nenhum PDF encontrado no diretório rag/pdfs');
    }

    let allText = '';
    for (const pdfFile of pdfFiles) {
        const pdfPath = path.join(PDF_DIR, pdfFile);
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);
        allText += data.text + '\n\n';
    }

    const chunks = allText.split('\n\n').filter(chunk => chunk.trim().length > 0);

    const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });
    vectorStore = await MemoryVectorStore.fromTexts(chunks, {}, embeddings);

    const storeData = {
        vectors: vectorStore.memoryVectors.map(vector => ({
            id: vector.id || `vector-${Math.random().toString(36).substr(2, 9)}`,
            embedding: vector.embedding,
            content: vector.content,
            metadata: vector.metadata 
        })),
        documents: chunks
    };
    fs.writeFileSync(MODEL_PATH, JSON.stringify(storeData, null, 2));

    return vectorStore;
}

export async function answerQuestion(question) {
    if (!vectorStore) {
        await trainRag();
    }

    const model = new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY,
        maxTokens: 400,
        temperature: 0.3
    });
    const chain = RetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),
        { returnSourceDocuments: false }
    );

    const response = await chain.call({
        query: question
    });

    return response.text;
}