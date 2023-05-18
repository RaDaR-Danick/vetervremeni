import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import { Sequelize } from 'sequelize'

export default new Sequelize(
    process.env.DB_NAME,            // Имя базы данных
    process.env.DB_USER,            // Пользователь
    process.env.DB_PASSWORD,        // Пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,  // Хостинг
        post: process.env.DB_PORT,   // Порт
        logging: false
    },
)