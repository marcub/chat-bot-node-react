import { answerQuestion } from '../service/ragService.js';

export async function getAnswerQuestion(request, response, next) {

    const { question } = request.body;

    if (!question) {
        return response.status(400).json({ error: 'Pergunta é obrigatória' });
    }

    try {
        const answer = await answerQuestion(question);
        response.status(200).json({ answer });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }

}