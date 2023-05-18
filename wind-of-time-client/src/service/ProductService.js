import $api from "../http"

export default class ProductService {
    static async getAll(options = {}) {
        const {limit = 12, page = 1, filters = {}, min = '', max = '', sort, exception, ids, city, search, rand} = options

        return $api.get('/api/products', {
            params: {limit, page, filters, min, max, sort, exception, ids, city, search, rand}
        })
    }

    static async getOne(id) {
        return $api.get('/api/products/' + id)
    }

    static async getQuantity(id) {
        return $api.get('/api/products/quantity/' + id)
    }
}