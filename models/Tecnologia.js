import mongoose from "../db/conexao.js";

const tecnologiaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    studied: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Tecnologia = new mongoose.model('tecnologia', tecnologiaSchema)

export default Tecnologia