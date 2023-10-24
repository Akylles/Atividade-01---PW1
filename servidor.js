import express from "express"
import router from "./routes/rotas.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(router)

const PORTA = 9090

app.listen(PORTA, () => console.log(`Aplicação ouvindo na porta ${PORTA}`))