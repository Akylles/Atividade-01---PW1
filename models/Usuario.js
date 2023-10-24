import mongoose from "../db/conexao.js";

const usuarioSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
})

const Usuario = new mongoose.model('usuario', usuarioSchema)

export default Usuario