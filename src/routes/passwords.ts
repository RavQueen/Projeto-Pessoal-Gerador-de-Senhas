import express from 'express'
import { generatePassword, readPasswords, writePasswords } from '../utils'

const router = express.Router()

router.get('/', (req, res) => {
  readPasswords((passwords) => {
    res.json(passwords)
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const length = req.query.length ? parseInt(req.query.length as string) : undefined
  const includeNumbers = req.query.includeNumbers ? req.query.includeNumbers === 'true' : undefined
  const includeSymbols = req.query.includeSymbols ? req.query.includeSymbols === 'true' : undefined

  readPasswords((passwords) => {
    const index = passwords.findIndex(p => p.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Senha não encontrada.' })
    }

    if (length && (length < 4 || length > 128)) {
      return res.status(400).json({ error: 'Comprimento deve ser entre 4 e 128.' })
    }

    const newPassword = generatePassword(length || passwords[index].length, includeNumbers ?? passwords[index].includeNumbers, includeSymbols ?? passwords[index].includeSymbols)
    passwords[index] = { ...passwords[index], password: newPassword, length: length || passwords[index].length, includeNumbers: includeNumbers ?? passwords[index].includeNumbers, includeSymbols: includeSymbols ?? passwords[index].includeSymbols, updatedAt: new Date().toISOString() }

    writePasswords(passwords, () => {
      res.json(passwords[index])
    })
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  readPasswords((passwords) => {
    const filteredPasswords = passwords.filter(p => p.id !== id)

    if (filteredPasswords.length === passwords.length) {
      return res.status(404).json({ error: 'Senha não encontrada.' })
    }

    writePasswords(filteredPasswords, () => {
      res.json({ message: 'Senha deletada com sucesso.' })
    })
  })
})

export default router
