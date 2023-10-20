import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const mongoConnect = async () => {
  try {
    console.log('conectando ao db');
    await connect(process.env.MONGO_URL as string);
    console.log('db conectado com sucesso!');
    
  }
  catch(err) {
    console.log(err);
  }
}

export default mongoConnect;