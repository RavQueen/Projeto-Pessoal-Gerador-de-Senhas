import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    title: "Bem-vindo ao Gerador de Senhas Aleatórias",
    description: "Esta é uma API para gerar, salvar e gerenciar senhas. Use as rotas abaixo para interagir. Todas as respostas são em JSON.",
    menu: {
      generateAndSave: {
        method: "GET",
        route: "/generate?length=12&includeNumbers=true&includeSymbols=true",
        description: "Gera e salva a senha em um arquivo na pasta public."
      },
      listPasswords: {
        method: "GET",
        route: "/passwords",
        description: "Lista todas as senhas salvas em JSON."
      },
      updatePassword: {
        method: "PUT",
        route: "/passwords/:id?length=16&includeNumbers=false&includeSymbols=true",
        description: "Atualiza uma senha existente via parâmetros na URL."
      },
      deletePassword: {
        method: "DELETE",
        route: "/passwords/:id",
        description: "Remove uma senha salva pelo ID."
      }
    },
  })
})


export default router