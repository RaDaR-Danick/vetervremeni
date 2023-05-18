import { Router } from "express"
import StoreServiceController from "../controllers/storeServiceController.js"
const router = Router()

router.get('/stores', StoreServiceController.getStores)
router.get('/cities', StoreServiceController.getCities)

export default router