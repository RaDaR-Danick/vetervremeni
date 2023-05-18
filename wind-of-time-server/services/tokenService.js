import * as dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'
import { Token } from '../models/authModel.js'

export default class TokenService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {accessToken, refreshToken}
    }
    static async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}})

        if(tokenData) {
            await tokenData.update({refreshToken})
        } else {
            await Token.create({userId, refreshToken})
        }
    }
    static async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }
    static async findToken(refreshToken) {
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }
    static async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    static async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
}