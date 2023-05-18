import * as dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(email, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: `Активация аккаунта на сайте "${process.env.SITE_NAME}"`,
            text: '',
            html: `
                <div>
                    <p>Для активации перейдите оп <a href="${link}">ссылке</a></p>
                </div>
            `
            
        })
    }
}

export default new MailService()