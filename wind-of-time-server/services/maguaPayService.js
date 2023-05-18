
import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import axios from 'axios'
import { Cart, MaguaPay, CartProduct, Product } from '../models/models.js'
import { Buffer } from 'buffer'
import StoreServiceController from '../controllers/storeServiceController.js'

export default class MaguaPayService {
    static async create(options) {
        const prefix = process.env.MAGUAPAY_PREFIX
        const account = process.env.MAGUAPAY_ACCOUNT
        const login = process.env.MAGUAPAY_LOGIN
        const password = process.env.MAGUAPAY_PASSWROD
        const url = process.env.MAGUAPAY_URL
        const siteUrl = process.env.SITE_URL
        // const siteUrl = 'https://vetervremeni.kz'
        const email = process.env.SITE_EMAIL
        const {id, cardHolder, cardNumber, cardMonth, cardYear, cardSecret} = options
        const order = await Cart.findOne({
            where: {id}
        })
        const price = order.price * 100
        const phone = order.phone
        const splitName = cardHolder.split(' ')
        const firstName = splitName.length > 1 ? splitName[0] : ''
        const lastName = splitName.length > 1 ? splitName[1] : ''
        const createMagua = await MaguaPay.create({
            type: 'maguapay',
            cartId: id
        })
        const maguaId = createMagua.id
        const puprose = 'Order #' + id

        const data = {
            account: account,
            order_id: prefix + maguaId,
            amount: price,
            currency: 'KZT',
            recurrent: false,
            merchant_site: siteUrl,
            purpose: puprose,
            customer_first_name: firstName,
            customer_last_name: lastName,
            customer_address: 'Almaty',
            customer_city: 'Almaty',
            customer_zip_code: '050000',
            customer_country: 'KZ',
            customer_phone: '+' + phone,
            customer_email: email,
            customer_ip_address: '127.0.0.1',
            success_url: siteUrl + '/success',
            fail_url: siteUrl + '/error',
            callback_url: siteUrl + '/server/maguapay/updateStatus',
            status_url: siteUrl,
            card_holder: cardHolder,
            card_number: cardNumber,
            card_exp_month: cardMonth,
            card_exp_year: cardYear,
            card_cvv: cardSecret,
            browser_accept_header: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            browser_java_enabled: 'false',
            browser_js_enabled: 'true',
            browser_color_depth: '24',
            browser_screen_height: '900',
            browser_screen_width: '1600',
            browser_language: 'en-US',
            browser_time_zone: '-300',
            browser_user_agent: 'Mozilla/5.0 (Linux; Android 11; V2025 Build/RP1A.200709.***; wv) AppleWebKit/***.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.*** Mobile Safari/***.36',
        }

        const headers = {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(login + ':' + password).toString('base64')
        }

        try {
            const sendRequest = await axios.post(url + 'initPaymentHost2Host', data, { headers })
            const res = sendRequest.data

            if(res.form_url) {
                return { success: true, url: res.form_url }
            } else {
                return { success: true }
            }
        } catch (e) {
            return { success: false }
        }
    }
    static async check(id) {
        const prefix = process.env.MAGUAPAY_PREFIX
        const login = process.env.MAGUAPAY_LOGIN
        const password = process.env.MAGUAPAY_PASSWROD
        const url = process.env.MAGUAPAY_URL
        const order = await Cart.findOne({
            where: {id},
            include: [{
                model: CartProduct,
                include: [{
                    model: Product
                }]
            }]
        })

        if(order) {
            const lastMagua = await MaguaPay.findOne({
                where: {
                    type: 'maguapay',
                    cartId: id
                },
                order: [ [ 'createdAt', 'DESC' ]],
                raw: true
            })
            
            if(lastMagua) {
                const data = {
                    order_id: prefix + lastMagua.id
                }
        
                const headers = {
                    'Content-type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(login + ':' + password).toString('base64')
                }
        
                try {
                    const sendRequest = await axios.post(url + 'check', data, { headers })
                    const res = sendRequest.data

                    if(res.status) {
                        return { success: true, status: 1 }
                    } else {
                        return { success: false, status: 0, order }
                    }
        
                } catch (e) {
                    return { success: false, status: 0, order }
                }
            } else {
                return { success: false, status: 0, order }
            }
        } else {
            return { success: false, status: -1 }
        }
    }
    static async updateStatus(body) {
        console.log(body);
        const { orderId } = body
        const login = process.env.MAGUAPAY_LOGIN
        const password = process.env.MAGUAPAY_PASSWROD
        const url = process.env.MAGUAPAY_URL

        const data = {
            order_id: orderId
        }

        const headers = {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(login + ':' + password).toString('base64')
        }

        try {
            const sendRequest = await axios.post(url + 'check', data, { headers })
            const res = sendRequest.data

            if(res.status) {
                const amount = res.amount / 100
                const clearMaguaId = Number(orderId.replaceAll(/[^0-9]/gm, ''))
                const maguaOrder = await MaguaPay.findOne({
                    where: {
                        id: clearMaguaId
                    },
                    include: [
                        {
                            model: Cart
                        }
                    ],
                    raw: true
                })
                const crmId = maguaOrder['cart.crmId']

                if(crmId) {
                    await StoreServiceController.createInvoice(crmId, amount)
                }

                return { success: true, status: res.status }
            } else {
                return { success: false, status: 0 }
            }

        } catch (e) {
            return { success: false, status: 0 }
        }
    }
}