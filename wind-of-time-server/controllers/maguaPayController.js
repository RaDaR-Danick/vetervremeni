import MaguaPayService from "../services/maguaPayService.js"

export default class MaguaPayController {
    static create = async (req, res) => {
        const createMaguaPay = await MaguaPayService.create(req.body)

        if(res) {
            res.json(createMaguaPay)
        } else {
            return createMaguaPay
        }
    }

    static async updateStatus(req, res) {
        try {
            const send = await MaguaPayService.updateStatus(req.body)
            return res.json(send)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }

    static check = async (req, res) => {
        const { id } = req.query
        const checkMaguaPay = await MaguaPayService.check(id)

        if(res) {
            res.json(checkMaguaPay)
        } else {
            return checkMaguaPay
        }
    }
}