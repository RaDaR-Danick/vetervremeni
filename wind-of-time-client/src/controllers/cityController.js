import CityService from "../service/CityService"
import { dispatchStore, getStoreState } from "../store"
import { setCityAction } from "../store/cityReducer"

export default class CityController {
    static async getAll() {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await CityService.getAll()
            
            result.data = response.data
            result.success = true
            return result
        } catch (e) {
            result.message = 'Ошибка при получении данных'
            return result
        }
    }

    static async setCity(city) {
        localStorage.setItem('city', city)
        dispatchStore(setCityAction(city))
    }

    static async getCity() {
        const store = await getStoreState()
        const city = store.city.selected

        return city
    }
}