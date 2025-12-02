import express from 'express'
import { generatePassword, readPasswords, writePasswords } from '../utils'

const router = express.Router()

router.get('/', (req, res) => {
  const length = parseInt(req.query.length as string) || 8
  const includeNumbers = req.query.includeNumbers === 'true'
  const includeSymbols = req.query.includeSymbols === 'true'

  if (length < 4 || length > 128) {
    return res.status(400).json({ error: 'Comprimento deve ser entre 4 e 128.' })
  }

  const password = generatePassword(length, includeNumbers, includeSymbols)
  const newEntry = {
    id: Date.now().toString(),
    password,
    length,
    includeNumbers,
    includeSymbols,
    createdAt: new Date().toISOString()
  }

  readPasswords((passwords) => {
    passwords.push(newEntry)
    writePasswords(passwords, () => {
      res.status(201).json(newEntry)
    })
  })
})

export default router