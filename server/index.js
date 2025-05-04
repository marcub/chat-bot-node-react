import express, { json } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { connect } from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import pandaRoutes from "./routes/pandaRoutes.js";
import ragRoutes from "./routes/ragRoutes.js";
import { trainRag } from "./service/ragService.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(json());

app.use("/api/auth", userRoutes);
app.use("/api", pandaRoutes);
app.use("/api", ragRoutes);

(async () => {
    try {
        await trainRag();
        console.log('Modelo RAG treinado com sucesso');
    } catch (error) {
        console.error('Erro ao treinar o modelo RAG:', error.message);
        process.exit(1);
    }
})();

connect(process.env.MONGO_URL).then(()=> {
    console.log("DB connection successfull")
}).catch((err)=> {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server started on port: ${process.env.PORT}`)
})