import $api from "../http"

export default class MaguapayService {
    static async create(data) {
        return $api.post('/maguapay/create', data)
    }
    static async check(id) {
        return $api.get('/maguapay/check', {
            params: {id}
        })
    }
}