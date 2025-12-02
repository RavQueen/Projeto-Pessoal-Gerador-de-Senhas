import express from 'express'
import helmet from 'helmet'
import indexRouter from './routes/index'
import generateRouter from './routes/generate'
import passwordsRouter from './routes/passwords'

const server = express();
const PORT = 3000;

server.use(helmet())
server.use(express.json())

server.use('/', indexRouter)
server.use('/generate', generateRouter)
server.use('/passwords', passwordsRouter)

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})