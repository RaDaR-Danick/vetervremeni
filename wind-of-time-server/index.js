import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import express from 'express'
import sequelize from  './db.js'
import appRoutes from './routes/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import * as models from './models/models.js'
import cronService from './services/cronService.js'
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 4000
const corsConfig = {
    credentials: true,
    origin: process.env.ORIGIN.split(','),
    optionsSuccessStatus: 200
}
app.use(cors(corsConfig))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(appRoutes)
app.use('/server', express.static(path.resolve(__dirname, 'static')))

const startApp = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => {
            cronService.start()
            console.log(`Server started on port ${PORT}`)
            console.log(`Client: ${process.env.SITE_URL}`)
        })
    } catch (e) {
        console.log(e.message);
    }
}

startApp()