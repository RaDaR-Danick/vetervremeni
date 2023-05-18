import { Router } from 'express'
import MagicPayController from '../controllers/magicPayController.js'
import { body } from 'express-validator'
const router = new Router()

// router.post('/create',
//     body('id').notEmpty(),
//     MagicPayController.create
// )

router.get('/check',
    MagicPayController.check
)

export default router