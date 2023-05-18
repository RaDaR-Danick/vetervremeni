import * as dotenv from 'dotenv'
dotenv.config()

import { writeError } from "../utils/error.js"
import AuthService from "../services/authService.js"
import { validationResult } from 'express-validator'
import StoreService from '../services/storeService.js'

export default class AuthController {
    static async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return writeError(404, 'Ошибка валидации', res)
            }

            const {name, email, password} = req.body
            const userData = await AuthService.register(name, email, password)

            await StoreService.updateDiscounts()

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return writeError(404, 'Ошибка валидации', res)
            }

            const {email, password} = req.body
            const userData = await AuthService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await AuthService.activate(activationLink)
            return res.redirect(process.env.SITE_URL)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await AuthService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async getUsers(req, res, next) {
        try {
            const users = await AuthService.getAllUsers()
            return res.json(users)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async changeData(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return writeError(404, 'Ошибка валидации', res)
            }
            
            const name = req.body.name
            const email = req.body.email.toLowerCase()
            const {refreshToken} = req.cookies
            const getUserData = await AuthService.getUserData(refreshToken)
            await AuthService.updateData(name, email, getUserData)

            const userData = await AuthService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async changePassword(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return writeError(404, 'Ошибка валидации', res)
            }
            
            const {password} = req.body
            const {refreshToken} = req.cookies
            console.log(refreshToken);
            const getUserData = await AuthService.getUserData(refreshToken)
            await AuthService.updatePassword(getUserData.id, password)

            return res.json({success: true})
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
    static async removeAllUsers(req, res) {
        try {
            await AuthService.removeAllUsers()
            
            if(res) {
                return res.json({success: true})
            }
        } catch (e) {
            writeError(404, e.message, res)
        }
    }
}