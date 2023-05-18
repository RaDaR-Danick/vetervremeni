import TokenPayService from "../services/tokenPayService.js"

export default class TokenPayController {
    static create = async (id) => {
        const createTokenPay = await TokenPayService.create(id)
        return createTokenPay
    }

    static check = async (req, res) => {
        const { id } = req.query
        const checkTokenPay = await TokenPayService.check(id)

        if(res) {
            res.json(checkTokenPay)
        } else {
            return checkTokenPay
        }
    }
}