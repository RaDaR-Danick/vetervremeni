import $api from "../http";

export default class AuthService {
    static async login (email, password) {
        return $api.post('/auth/login', {email, password})
    }
    
    static async register (name, email, password) {
        return $api.post('/auth/register', {name, email, password})
    }
    
    static async logout () {
        return $api.post('/auth/logout')
    }
    
    static async refresh () {
        return $api.post('/auth/refresh')
    }

    static async getAllUsers () {
        return $api.get('/auth/users')
    }

    static async changeData (name, email) {
        return $api.post('/auth/changeData', {name, email})
    }

    static async changePassword (password) {
        return $api.post('/auth/changePassword', {password})
    }
}