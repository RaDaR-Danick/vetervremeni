import { writeError } from "../utils/error.js"
import TokenService from "../services/tokenService.js"

export async function IsLogged(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return writeError(401, 'Не авторизован', res)
        }

        const accessToken = authHeader.split(' ')[1]
        if(!accessToken) {
            return writeError(401, 'Не авторизован', res)
        }

        const userData = await TokenService.validateAccessToken(accessToken)
        if(!userData) {
            return writeError(401, 'Неверный токен', res)
        }

        req.user = userData
        next()
    } catch (e) {
        return writeError(404, e.message, res)
    }
}