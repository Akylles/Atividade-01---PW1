import Usuario from '../models/Usuario.js'
import Tecnologia from '../models/Tecnologia.js'

const checkExistsUserAccount = async (req, res, next) => {
    const nomeUsuario = req.headers.username
    
    const usuario = await Usuario.findOne({ username: nomeUsuario})
    
    if (!usuario){
        res.status(404).send({
            error: `O usuário ${nomeUsuario} não existe`
        })
    }else{
        req.headers.usuario = usuario
        next()
    }
    
}

const verificaSeExisteTecnologia = async (req, res, next) =>{
    const id = req.params.id
    
    const usuario = req.headers.usuario
    const tecnologia = await Tecnologia.findById(id).exec()

    if (tecnologia && JSON.stringify(tecnologia.usuario) == JSON.stringify(usuario._id)){
        
        req.headers.tecnologia = tecnologia
        next()
    }else{
        res.status(404).send({
            error: `Tecnologia não registrada em nome do usuário ${usuario.username}.`
        })
    }

}

export {checkExistsUserAccount, verificaSeExisteTecnologia}