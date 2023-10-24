import mongoose from "mongoose";
import 'dotenv/config'

await mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Conexao criada com sucesso'))
.catch(()=>console.log('Infelizmente, não funcionou a conexao'))        

export default mongoose