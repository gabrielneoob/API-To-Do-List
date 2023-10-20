import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import database from './database/mongo';
import routes from './routes/routes'

dotenv.config()

const server = express();

database();

server.use(routes);

server.use(express.urlencoded({ extended: true }));

server.use(cors());
 
server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint not find" });
})


server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`)
});