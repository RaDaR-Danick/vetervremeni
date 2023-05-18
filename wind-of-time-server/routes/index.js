import { Router } from "express"
import businessRuRouter from './businessRuRouter.js'
import productRouter from './productRouter.js'
import filtersRouter from './filtersRouter.js'
import authRouter from './authRouter.js'
import cartRouter from './cartRouter.js'
import magicPayRouter from './magicPayRouter.js'
import maguaPayRouter from './maguaPayRouter.js'
import tokenPayRouter from './tokenPayRouter.js'
import basicRouter from './basicRouter.js'
import instagram from "./instagram.js";

const router = Router()

router.use('/server/businessRu', businessRuRouter)
router.use('/server/api/products', productRouter)
router.use('/server/api/filters', filtersRouter)
router.use('/server/api/cart', cartRouter)
router.use('/server/magicpay', magicPayRouter)
router.use('/server/maguapay', maguaPayRouter)
router.use('/server/tokenpay', tokenPayRouter)
router.use('/server/auth', authRouter)
router.use("/", instagram);
// router.use('/server/', basicRouter)

export default router