import CartService from "../services/cartService.js"
import { writeError } from "../utils/error.js"
import { validationResult } from "express-validator"

export default class CartController {
    static async send(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return writeError(404, 'Ошибка валидации', res)
            }

            const send = await CartService.send(req.body)
            return res.json(send)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async userOrders(req, res, next) {
        try {
            const {id} = req.query

            if(!id) {
                return writeError(404, 'Ошибка валидации', res)
            }

            const send = await CartService.userOrders(id)
            return res.json(send)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async downloadOrder(req, res, next) {
        try {
            const {id, userId} = req.query
            const sheet = await CartService.orderSheet(id, userId, res)

            return sheet
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
}