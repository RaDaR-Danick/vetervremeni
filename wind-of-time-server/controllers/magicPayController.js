import MagicPayService from "../services/magicPayService.js"

export default class MagicPayController {
    static create = async (req, res) => {
        const { id } = req.body
        const createMagicPay = await MagicPayService.create(id)

        if(res) {
            res.json(createMagicPay)
        } else {
            return createMagicPay
        }
    }

    static check = async (req, res) => {
        const { id } = req.query
        const checkMagicPay = await MagicPayService.check(id)

        if(res) {
            res.json(checkMagicPay)
        } else {
            return checkMagicPay
        }
    }
}