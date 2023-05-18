import { Router } from 'express'
import ProductController from '../controllers/productController.js'
const router = new Router()

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.get('/quantity/:id', ProductController.getQuantity)

export default router