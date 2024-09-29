import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const mongoConnect = async () => {
  try {
    console.log('conectando ao db');
    await connect(`mongodb+srv://gabrielneoob:${process.env.MONGO_PASSWORD}@todolist.xn3ye2a.mongodb.net/?retryWrites=true&w=majority&appName=todolist`);
    console.log('db conectado com sucesso!');
    
  }
  catch(err) {
    console.log(err);
  }
}

export default mongoConnect;