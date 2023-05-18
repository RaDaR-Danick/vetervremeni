import MaguapayService from "../service/MaguapayService"

export default class MaguapayController {
    static async create(data) {
        const create = await MaguapayService.create(data)
        return create.data
    }
    static async check(id) {
        const check = await MaguapayService.check(id)
        return check.data
    }
}