import * as dotenv from 'dotenv'
dotenv.config()
dotenv.config({ path: `.env.local`, override: true })

import schedule from 'node-schedule'
import StoreService from './storeService.js'
import StoreServiceController from '../controllers/storeServiceController.js'
import AuthController from '../controllers/authController.js'

class CronService {
    async start() {
        schedule.scheduleJob('45 0 * * *', () => {
            StoreService.updateDiscounts()
        })

        schedule.scheduleJob('45 0 * * *', () => {
            StoreServiceController.updateAvailability()
        })

        schedule.scheduleJob('45 0 * * *', async () => {
            await StoreServiceController.getProducts()
            await StoreServiceController.updateAvailability()
        })

        if (process.env.UPDATE) {
            await StoreServiceController.getProducts()
            await StoreServiceController.updateAvailability()
        }

        if (process.env.UPDATE_QUANTITY) {
            await StoreServiceController.updateAvailability()
        }

        if (process.env.CLEAR_USERS) {
            await AuthController.removeAllUsers()
        }

        if (process.env.CLEAR_PRODUCTS) {
            await StoreServiceController.removeAllProducts()
        }
    }
}

export default new CronService()