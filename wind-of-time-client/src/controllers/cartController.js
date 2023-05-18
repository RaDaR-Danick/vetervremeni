
import { dispatchStore, getStoreState } from "../store"
import { setAddedAction, setProductsAction, setPriceAction, setPurePriceAction, setQuantityAction, setDiscountAction } from "../store/cartReducer"
import ProductController from "./productController"
import CartService from "../service/CartService"
import { calcPrice } from "../utils/price"
import CityController from "./cityController"
import NotifController from "./notifController"
import { quantityFormate } from "../utils/quantity"

export default class CartController {
    static async setCart (added) {
        localStorage.setItem('cart', JSON.stringify(added))

        await dispatchStore(setAddedAction(added))
        await this.updateProducts()
    }
    static async addToCart (id, quantity = 1) {
        let city = await CityController.getCity()
        let added = JSON.parse(localStorage.getItem('cart')) || []
        let found = false
        let status = 1 // 1: Добавлен, -1: Превышает лимит
        let getQuantity = await ProductController.getQuantity(id)
        let maxQuantity = 0

        getQuantity.data.forEach(item => {
            if(item.cityId === city) {
                maxQuantity = item.quantity
            }
        })

        for(let item of added) {
            if(item.id === id) {
                const newQuantity = item.quantity + quantity
                found = true

                if(newQuantity <= maxQuantity) {
                    item.quantity += quantity
                } else {
                    status = -1
                }
            }
        }

        if(!found) {
            if(quantity <= maxQuantity) {
                added.push({id, quantity})
            } else {
                status = -1
            }
        }

        this.setCart(added)

        if(status === 1) {
            NotifController.addNotif({
                title: 'Товар добавлен',
                text: 'Нажмите чтобы перейти в корзину',
                status: 'success',
                link: '/cart'
            })
        } else {
            NotifController.addNotif({
                title: 'Ошибка',
                text: `Максимальное количество: ${quantityFormate(maxQuantity)}`,
                status: 'error',
            })
        }

        return status
    }
    static async updateProducts () {
        const {cart} = getStoreState()
        const {added} = cart
        let products = Object.assign(cart.products)
        let ids = []

        if(added && added.length) {
            for(let item of added) {
                const {id} = item
                
                if(!products[id]) {
                    ids.push(id)
                }
            }

            if(ids.length) {
                const getProducts = await ProductController.getByIds(ids)
                
                if(getProducts.success) {
                    for(let item of getProducts.data.rows) {
                        products[item.id] = item
                    }

                    await dispatchStore(setProductsAction(products))
                }
            }
        }

        await this.updateCart()
    }
    static async updateCart () {
        const {cart, auth} = getStoreState()
        const {added, products} = cart
        let multiplier = 1
        let totalPrice = 0
        let purePrice = 0
        let totalQuantity = 0

        for(let item of added) {
            const {id, quantity} = item
            const product = calcPrice(products[id], auth.user, auth.withoutDocuments)

            if(product) {
                const price = Math.round(product.price * multiplier)

                totalQuantity += quantity
                totalPrice += price * quantity
                purePrice += product.price * quantity
            }
        }

        await dispatchStore(setPriceAction(totalPrice))
        await dispatchStore(setPurePriceAction(purePrice))
        await dispatchStore(setQuantityAction(totalQuantity))
    }
    static async setDiscount (discount) {
        await dispatchStore(setDiscountAction(discount))
        await this.updateCart()
    }
    static async clearCart () {
        await dispatchStore(setAddedAction([]))
        await dispatchStore(setProductsAction({}))
        await dispatchStore(setPriceAction(0))
        await dispatchStore(setPurePriceAction(0))
        await dispatchStore(setQuantityAction(0))

        localStorage.removeItem('cart')
    }
    static async setQuantity (id, quantity) {
        const {cart} = getStoreState()
        let added = [...cart.added]

        added = added.map(item => {
            if(item.id === id) {
                item.quantity = quantity
            }

            return item
        })

        await this.setCart(added)
    }
    static async removeItem (id) {
        const {cart} = getStoreState()
        let added = [...cart.added]

        if(added.length) {
            added = added.filter(item => item.id !== id)
        }

        await this.setCart(added)
    }
    static async send (data) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const send = await CartService.send(data)
            result.success = true
            result.id = send.data.id
            return result
        } catch (e) {
            result.message = 'Ошибка при отправке данных'
            return result
        }
    }
    static async userOrders (id) {
        const result = {
            success: false,
            message: ''
        }

        try {
            const data = await CartService.userOrders(id)
            result.success = true
            result.data = data
            return result
        } catch (e) {
            result.message = 'Ошибка при отправке данных'
            return result
        }
    }
    static async download (id, userId) {
        await CartService.download(id, userId)
    }
    static async checkAvailability () {
        const city = await CityController.getCity()
        const added = JSON.parse(localStorage.getItem('cart')) || []

        if(added.length) {
            let newAdded = []

            for(let item of added) {
                const { id, quantity } = item
                const getQuantity = await ProductController.getQuantity(id)
                let maxQuantity = 0

                getQuantity.data.forEach(item => {
                    if(item.cityId === city) {
                        maxQuantity = item.quantity
                    }
                })

                if(maxQuantity) {
                    newAdded.push({
                        id,
                        quantity: Math.min(maxQuantity, quantity)
                    })
                }
            }

            this.setCart(newAdded)
        }
    }
}