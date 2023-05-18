import { Router } from 'express'
import CartController from '../controllers/cartController.js'
import { body } from 'express-validator'
const router = new Router()

router.post('/',
    body('name').isLength({min: 2, max: 100}),
    body('phone').isLength(11),
    body('added').notEmpty(),
    CartController.send)

router.get('/user', CartController.userOrders)
router.get('/download', CartController.downloadOrder)

export default router