import { Router } from "express"
import AuthController from "../controllers/authController.js"
import { body } from 'express-validator'
import { IsLogged } from "../middlewares/authMiddleware.js"

const router = new Router()

router.post('/register',
    body('name').isLength({min: 2, max: 52}),
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AuthController.register)

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AuthController.login)
    
router.post('/changeData',
    IsLogged,
    body('name').isLength({min: 2, max: 52}),
    body('email').isEmail(),
    AuthController.changeData)
    
router.post('/changePassword',
    IsLogged,
    body('password').isLength({min: 3, max: 32}),
    AuthController.changePassword)

router.post('/logout', AuthController.logout)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)
router.get('/users', IsLogged, AuthController.getUsers)

export default router