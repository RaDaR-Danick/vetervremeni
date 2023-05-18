import ProductService from "../service/ProductService"

export default class ProductController {
    static async getAll(options = {}) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await ProductService.getAll(options)
            
            result.data = response.data
            result.success = true
            return result
        } catch (e) {
            result.message = 'Ошибка при получении данных'
            return result
        }
    }
    static async getOne(id) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await ProductService.getOne(id)
            
            result.data = response.data
            result.success = true
            return result
        } catch (e) {
            result.message = 'Ошибка при получении данных'
            return result
        }
    }
    static async getQuantity(id) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await ProductService.getQuantity(id)
            
            result.data = response.data
            result.success = true
            return result
        } catch (e) {
            result.message = 'Ошибка при получении данных'
            return result
        }
    }
    static async getByIds(ids) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await ProductService.getAll({ids})
            
            result.data = response.data
            result.success = true
            return result
        } catch (e) {
            result.message = 'Ошибка при получении данных'
            return result
        }
    }
}