import * as dotenv from 'dotenv'
dotenv.config()

import { Token, User, UserDiscount } from "../models/authModel.js"
import bcrypt from 'bcrypt'
import { v4 } from "uuid"
import TokenService from "./tokenService.js"
import UserDto from "../dtos/userDto.js"
import { Op } from 'sequelize'

export default class AuthService {
    static async register (name, email, password) {
        const candidate = await User.findOne({where: {email}})

        if(candidate) {
            throw new Error(`Email ${email} уже занят`)            
        }
        
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = v4()
        const user = await User.create(
            {name, email, password: hashPassword, activationLink, isActivated: true},
            {
                include: [{
                  model: UserDiscount
                }]
            }
        )
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    static async activate (activationLink) {
        const user = await User.findOne({where: {activationLink, isActivated: false}})

        if(!user) {
            throw new Error(`Некорректная ссылка активации`)
        }

        await user.update({isActivated: true})
    }

    static async login (email, password) {
        const user = await User.findOne({
            where: {email},
            include: [{
                model: UserDiscount
            }]
        })

        if(!user) {
            throw new Error(`Пользователь не зарегистрирован`)
        }

        const isPassEqual = await bcrypt.compare(password, user.password)
        if(!isPassEqual) {
            throw new Error(`Неверный пароль`)
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    static async logout (refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    static async refresh (refreshToken) {
        if(!refreshToken) {
            throw new Error(`Не авторизован`)
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenData = await TokenService.findToken(refreshToken)

        if(!userData || !tokenData) {
            throw new Error(`Ошибка валидации`)
        }

        const user = await User.findOne({
            where: {id: tokenData.dataValues.userId},
            include: [{
                model: UserDiscount
            }]
        })
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    static async getAllUsers() {
        const users = await User.findAll()
        return users
    }

    static async removeAllUsers() {
        return await User.destroy({
            where: {},
        })
    }

    static async updateData(name, email, userData) {
        const checkEmail = await User.findOne({
            where: {
                [Op.and]: [
                    {email},
                    {
                        email: {
                            [Op.ne]: userData.email
                        }
                    }
                ]
            }
        })

        if(checkEmail) {
            throw new Error(`Email уже занят`)
        }

        await User.update(
            {name, email},
            {
                where: {
                    id: userData.id
                }
            }
        )
    }

    static async updatePassword(id, password) {
        const hashPassword = await bcrypt.hash(password, 3)
        await User.update(
            {password: hashPassword},
            {where: {id}}
        )
    }

    static async getUserData(refreshToken) {
        const data = TokenService.validateRefreshToken(refreshToken)
        return data
    }
}