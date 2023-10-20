import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config()

const server = express();

server.use(express.urlencoded({ extended: true }))

server.use(cors())

server.get('/server',(req: Request, res: Response) => {
  res.json({ online: true });
})


server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
});