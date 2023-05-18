import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import axios from 'axios'
import { Cart, MagicPay } from '../models/models.js'
import { KZTToUSD } from '../utils/price.js'

export default class MagicPayService {

    static async create(id) {
        const check = await MagicPay.findOne({
            where: {
                cartId: id
            }
        })

        if(check) {
            return { success: true, url: check.url }
        } else {
            const token = process.env.MAGICPAY_TOKEN
            const url = process.env.MAGICPAY_URL
    
            const order = await Cart.findOne({
                where: {id}
            })
            const amount = KZTToUSD(order.price)
    
            const data = {
                token, amount,
                order_id: 'wot' + id,
                currency: 'USD'
            }
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
    
            try {
                const sendRequest = await axios.post(url + 'init', data, { headers })
                const res = sendRequest.data
                
                await MagicPay.create({
                    url: res.url,
                    cartId: id
                })
    
                return { success: true, url: res.url }
            } catch (e) {
                return { success: false }
            }
        }
    }

    static async check(id) {
        const token = process.env.MAGICPAY_TOKEN
        const url = process.env.MAGICPAY_URL

        try {
            const data = {
                token: token,
                order_id: 'wot' + id,
            }
            const sendRequest = await axios.post(url + 'check', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.token
                }
            })
            const res = sendRequest.data
    
            return res
        } catch (e) {
            return {status: 0}
        }
    }

}