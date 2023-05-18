import { Router } from 'express'
import FiltersController from '../controllers/filtersController.js'
const router = new Router()

router.post('/', FiltersController.getAll)

export default router