import $api from "../http"

export default class CityService {
    static async getAll() {
        return $api.get('/businessRu/cities')
    }
}