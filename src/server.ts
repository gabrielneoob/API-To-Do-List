import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import database from './database/mongo';
import routes from './routes/routes'

dotenv.config();

database();

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(cors());

server.use(routes);
server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint not find" });
})


server.listen('3000', () => {
  console.log(`Servidor rodando em: http://localhost:3000`)
});