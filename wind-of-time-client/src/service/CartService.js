import $api from "../http"
import { API_URL } from "../http"

export default class CartService {
    static async send(data) {
        return $api.post('/api/cart/', data)
    }
    static async userOrders(id) {
        return $api.get('/api/cart/user/', {
            params: {id}
        })
    }
    static async download(id, userId) {
        window.open(`${API_URL}api/cart/download/?id=${id}&userId=${userId}`, '_blank')
    }
}