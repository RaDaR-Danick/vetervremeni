import { Router } from 'express'
import TokenPayController from '../controllers/tokenPayController.js'
import { body } from 'express-validator'
const router = new Router()

router.post('/create',
    body('id').notEmpty(),
    TokenPayController.create
)

router.get('/check',
    TokenPayController.check
)

export default router