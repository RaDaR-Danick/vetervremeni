import $api from "../http"

export default class FiltersSevice {
    static async getAll(products, applied) {
        return $api.post('/api/filters', {products, applied})
    }
}