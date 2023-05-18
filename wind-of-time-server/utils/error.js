import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function writeError (status, message, res) {
    const date = new Date()
    // const errorFile = path.resolve(__dirname, '../', 'errors.txt')
    // fs.appendFileSync(errorFile, `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] ${message}\n`)

    if(res) {
        res.status(status)
        res.json({message})
    }

    console.log(message);
}