import fs from 'fs'
import path from 'path'

export const PUBLIC_DIR = path.join(__dirname, '..', 'public')
export const PASSWORDS_FILE = path.join(PUBLIC_DIR, 'passwords.json')

export function generatePassword(length: number, includeNumbers: boolean, includeSymbols: boolean): string {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  let charset = letters;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;

  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}

export function readPasswords(callback: (passwords: any[]) => void): void {
  fs.readFile(PASSWORDS_FILE, 'utf-8', (err, data) => {
    if (err) {
      return callback([])
    }
    try {
      const passwords = JSON.parse(data)
      callback(passwords)
    } catch (error) {
      callback([])
    }
  })
}
 
export function writePasswords(passwords: any[], callback: () => void): void {
  fs.mkdir(PUBLIC_DIR, { recursive: true }, (err) => {
    if (err) {
      console.error('Erro ao criar diretório:', err)
      return callback()
    }
    fs.writeFile(PASSWORDS_FILE, JSON.stringify(passwords, null, 2), (err) => {
      if (err) {
        console.error('Erro ao escrever arquivo:', err)
      }
      callback()
    })
  })
}