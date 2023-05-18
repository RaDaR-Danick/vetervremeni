import { Router } from 'express'
import MaguaPayController from '../controllers/maguaPayController.js'
import { body } from 'express-validator'
const router = new Router()

router.post('/create',
    body('id').notEmpty(),
    body('cardHolder').notEmpty(),
    body('cardNumber').isLength({min: 16}),
    body('cardMonth').isLength({min: 2}),
    body('cardYear').isLength({min: 2}),
    body('cardSecret').isLength({min: 3}),
    MaguaPayController.create
)

router.post('/updateStatus', MaguaPayController.updateStatus)

router.get('/check',
    MaguaPayController.check
)

export default router