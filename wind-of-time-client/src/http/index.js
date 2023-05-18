import axios from "axios"
import AuthController from "../controllers/authController"

export const API_URL = window.location.protocol === 'https:' ? 'https://vetervremeni.kz/server/' : 'http://localhost:4000/server/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config

    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        try {
            const response = await axios.get(`${API_URL}auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log(e.message);
            AuthController.logout()
        }
    }

    throw error
})

export default $api