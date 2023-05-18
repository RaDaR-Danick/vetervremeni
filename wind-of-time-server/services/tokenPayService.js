import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import axios from 'axios'
import { createHmac } from 'crypto'
import { Cart, TokenPay } from '../models/models.js'
import { KZTToUSD } from '../utils/price.js'
import { toDataURL } from 'qrcode'

export default class TokenPayService {
    static async request(dir, params) {
        const terminalId = Number(process.env.TOKENPAY_TERMINAL_ID)
        const merchantKey = process.env.TOKENPAY_MERCHANT_KEY
        const secret = process.env.TOKENPAY_SECRET
        const url = process.env.TOKENPAY_URL

        params.terminal_id = terminalId

        const newParams = Object.keys(params).sort().reduce(
            (obj, key) => {
                obj[key] = params[key]
                return obj
            },
            {}
        )
        // const hmac = createHmac('sha256', secret).update(Object.values(newParams).join('|')).digest('hex')
        const paramsString = Object.values(newParams).join('|')
        const hmac = createHmac('sha512', secret).update(paramsString).digest().toString('hex')
        const headers = {
            'Content-Type': 'application/json',
            'MerchantKey': merchantKey,
            'HMAC': hmac,
        }

        try {
            const sendRequest = await axios.post(url + dir, params, { headers })
            const res = sendRequest.data    
            return { success: true, res }
        } catch(e) {
            return { success: false }
        }
    }

    static async create(id) {
        const order = await Cart.findOne({where: {id}})
        const price = KZTToUSD(order.price)
        const email = process.env.SITE_EMAIL
        const siteUrl = process.env.SITE_URL
        const data = {
            amount: price,
            order_id: 'wot' + id,
            currency: 'USDT.TRC20',
            merchant_site: siteUrl,
            customer_email: email,
        }
        const request = await this.request('initPayment', data)

        if(request.success) {
            const {code, address, currency, amount, timeout} = request.res

            if(code === 200) {
                await TokenPay.create({
                    currency, address, amount, timeout,
                    cartId: id,
                })
            }
        }

        return request
    }

    static async check(id) {
        const data = {
            order_id: 'wot' + id
        }
        const request = await this.request('checkPayment', data)
        const { code, status = -2 } = request.res
        const res = { status }

        if(code === 200 && status === 0) {
            const { amount, currency, address } = request.res
            const imageOptions = {
                quality: 1,
                errorCorrectionLevel: 'H',
                type: 'image/png',
                quality: 0.3,
                scale: 6,
                margin: 0
            }
            const imageLight = await toDataURL(address, {
                ...imageOptions,
                color: {
                    dark: '#000',
                    light: '#0000'
                }
            })
            const imageDark = await toDataURL(address, {
                ...imageOptions,
                color: {
                    dark: '#fff',
                    light: '#0000'
                }
            })

            res.image = {
                light: imageLight,
                dark: imageDark,
            }
            res.amount = amount
            res.currency = currency
            res.address = address
        }

        return res
    }
}