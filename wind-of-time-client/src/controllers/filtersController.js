import FiltersSevice from "../service/FiltersService"

export default class FiltersController {
    static async getAll(products, applied) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await FiltersSevice.getAll([], applied)

            result.data = response.data
            result.success = true
            return result
        } catch (e) {
            result.message = 'Ошибка при получении данных'
            return result
        }
    }
}