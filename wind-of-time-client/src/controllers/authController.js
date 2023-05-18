import AuthService from "../service/AuthService"
import { setAuthAction, setUserAction } from "../store/authReducer"
import { dispatchStore, getStoreState } from "../store"
import axios from "axios"
import { API_URL } from "../http"
import CartController from "./cartController"

export default class AuthController {
    static setAuth(auth) {
        dispatchStore(setAuthAction(auth))
        CartController.updateCart()
    }

    static setUser(user) {
        dispatchStore(setUserAction(user))
        CartController.setDiscount(Number(user.discount) || 0)
    }

    static async login(email, password) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            result.success = true
            return result
        } catch (e) {
            result.message = 'Неверный email или пароль'
            return result
        }
    }

    static async register(name, email, password) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await AuthService.register(name, email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            result.success = true
            return result
        } catch(e) {
            result.message = e.response?.data?.message
            return result
        }
    }

    static async logout() {
        const result = {
            success: false,
            message: ''
        }

        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})

            CartController.setDiscount(0)
            result.success = true
            return result
        } catch(e) {
            result.message = 'Что-то пошло не так'
            return result
        }
    }

    static async checkAuth () {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await axios.get(`${API_URL}auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)

            result.success = true
            return result
        } catch (e) {
            this.logout()
            result.message = 'Что-то пошло не так'
            return result
        }
    }

    static async changeData (name, email) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const response = await AuthService.changeData(name, email)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            
            result.success = true
            return result
        } catch (e) {
            result.message = 'Email уже занят'
            return result
        }
    }

    static async changePassword (password) {
        const result = {
            success: false,
            message: ''
        }

        try {
            await AuthService.changePassword(password)
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
            
            result.success = true
            return result
        } catch (e) {
            result.message = 'Что-то пошло не так'
            return result
        }
    }
}