import express from 'express'
import Usuario from '../models/Usuario.js'
import Tecnologia from '../models/Tecnologia.js'
import { checkExistsUserAccount, verificaSeExisteTecnologia } from './middlewares.js'

const router = express.Router()

router.use('/technologies', checkExistsUserAccount)
router.use('/technologies/:id', verificaSeExisteTecnologia)

router.post('/users', async (req, res) => {
    const usuario = {
        name: req.body.name,
        username: req.body.username
    }
    
    try {
        await new Usuario(usuario).save()
        res.status(201).send(usuario)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/technologies', async (req, res) => {
    const usuario = req.headers.usuario

    const tecnologias = await Tecnologia.find({usuario: usuario._id})
        
    if (tecnologias.length > 0){
        res.status(201).send(tecnologias)
    }else{
        res.status(404).send(`Não existem tecnologias registradas em nome do usuário ${usuario.username}`)
    }

})

router.post('/technologies', async (req, res) => {

    const usuario = req.headers.usuario
    
    try {
        const tecnologia = {
            title: req.body.title,
            deadline: req.body.deadline,
            usuario: usuario._id
        }        
        await new Tecnologia(tecnologia).save()   
        res.status(201).send(tecnologia)
    } catch (error) {
        res.status(500).send(error)
    }

    
})

router.put('/technologies/:id', async (req, res) => {
    
    const usuario = req.headers.usuario
    const tecnologia = req.headers.tecnologia

    const filter = {
        _id: tecnologia._id,
        usuario: usuario._id
    }
    
    const update = {
        title: req.body.title,
        deadline: req.body.deadline
    }

    try {
        await Tecnologia.findOneAndUpdate(filter, update)
        res.send({
            title: tecnologia.title,
            deadline: tecnologia.deadline.toLocaleString('pt-BR', { timezone: 'UTC' }),
            usuario: usuario.username,
            studied: true
        })
    } catch (error) {
        res.send(error)
    }

})

router.patch('/technologies/:id/studied', async (req, res) => {
    const usuario = req.headers.usuario
    const tecnologia = req.headers.tecnologia

    const filter = {
        _id: tecnologia._id,
        usuario: usuario._id
    }
    
    const update = {
        studied: true
    }

    try {
        await Tecnologia.findOneAndUpdate(filter, update)
        res.send({
            title: tecnologia.title,
            deadline: tecnologia.deadline.toLocaleString('pt-BR', { timezone: 'UTC' }),
            usuario: usuario.username,
            studied: true
        })
    } catch (error) {
        res.send(error)
    }

})

router.delete('/technologies/:id', async (req, res) => {
    const tecnologia = req.headers.tecnologia

    await Tecnologia.deleteOne({_id: tecnologia._id})
    const listaUsuarios = await Tecnologia.find()

    res.send(listaUsuarios)
})

export default router