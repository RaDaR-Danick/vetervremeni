import StoreService from "./storeService.js"
import { User, Product, Cart, CartProduct, UserDiscount } from "../models/models.js"
import xl from 'excel4node'
import UserDto from "../dtos/userDto.js"
import TokenPayController from "../controllers/tokenPayController.js"

export default class CartService {
    static async send(data) {
        const {name, phone, id, address, comment, added = [], withoutDocuments, type} = data
        let discount = 0
        let totalDiscount = 0
        let totalOldPrice = 0
        let totalPrice = 0
        let totalQuantity = 0
        let email = ''
        let discounts = {}
        let products = []

        if(id) {
            const getUser = await User.findOne({
                where: {id},
                include: [
                    {
                        model: UserDiscount
                    }
                ]
            })
            const user = new UserDto(getUser)

            discount = user.discount
            email = user.email
            discounts = user.coefficents
        }

        const roundPrice = (price) => {
            // return Math.ceil(price / 100) * 100
            return Math.ceil(price)
        }

        for(let item of added) {
            const {id, quantity} = item
            const productData = await Product.findOne({
                where: {id},
                raw: true
            })
            const { brandId } = productData

            let price = productData.price
            let percents = 0
            const oldPrice = price
            
            if(discounts[brandId]) {
                percents = discounts[brandId].ratio

                if(withoutDocuments && discounts[brandId].ratioWithoutDocuments) {
                    percents = discounts[brandId].ratioWithoutDocuments
                }
            } else if (discount) {
                percents = discount
            }

            if(percents) {
                price = roundPrice(price * (1 - percents * 0.01))
            }

            const itemTotalPrice = price * quantity
            const itemTotalOldPrice = oldPrice * quantity

            totalQuantity += quantity
            totalOldPrice += itemTotalOldPrice
            totalPrice += itemTotalPrice
            item.price = price
            item.oldPrice = oldPrice
            item.discount = percents

            products.push(item)
        }

        if(totalPrice !== totalOldPrice) {
            totalDiscount = Math.round((totalPrice / totalOldPrice) * 100)
        }

        if(products.length) {
            const cart = await Cart.create({
                name, phone, address, comment, type,
                discount: totalDiscount,
                quantity: totalQuantity,
                price: totalPrice,
                withoutDocuments: withoutDocuments ? 1 : 0,
                userId: id
            })
            let cartId = 0

            if(cart) {
                cartId = cart.id

                for(let item of products) {
                    const {id, price, quantity} = item
                    await CartProduct.create({
                        discount, price, quantity, cartId,
                        productId: id,
                    })
                }

                if(type === 'tokenpay') {
                    await TokenPayController.create(cartId)
                }
            }

            ///

            let partnerId
            const getPartner = await StoreService.getPartnerByPhone(phone)

            if(getPartner.length) {
                const partner = getPartner[0]
                partnerId = partner.id
            } else {
                const partner = await StoreService.createPartner(name, phone, email)
                partnerId = partner.id
            }

            const order = await StoreService.createOrder(cartId, type, partnerId, address, comment, products, withoutDocuments)
            order.id = cartId
            return order
        }
    }
    static async userOrders(userId) {
        const getUserOrders = await Cart.findAll({
            where: {userId},
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: CartProduct,
                include: [{
                    model: Product
                }]
            }]
        })

        return getUserOrders
    }
    static async orderSheet(id, userId, res) {
        const getOrder = await Cart.findOne({
            where: {id, userId},
            include: [{
                model: CartProduct,
                include: [{
                    model: Product
                }]
            }]
        })

        if(getOrder) {
            let matrix = [
                ['Заказ #' + id, new Date(getOrder.createdAt).toLocaleDateString('ru-RU')],
                ['Наименование', 'Количество', 'Стоимость'],
            ]
            let totalPrice = 0
            let totalQuantity = 0
            
            const products = getOrder.cart_products

            if(products.length) {
                for(let item of products) {
                    const {name} = item.product
                    const {quantity, price} = item
                    const calcPrice = price * quantity
                    
                    totalPrice += calcPrice
                    totalQuantity += quantity

                    matrix.push([name, quantity, calcPrice || 'Уточните цену'])
                }
            }
            
            matrix.push(['', totalQuantity, totalPrice])

            // EXCEL
            const wb = new xl.Workbook()
            const ws = wb.addWorksheet('Заказ #' + id)
            
            for(let i = 1; i <= matrix.length; i++) {
                const row = matrix[i - 1]

                for(let j = 1; j <= row.length; j++) {
                    const value = row[j - 1]
                    const ceil = ws.cell(i, j)

                    if(typeof value === 'number') {
                        ceil.number(value)
                    } else {
                        ceil.string(value)
                    }
                }
            }

            if(res) {
                wb.write(`Order${id}.xlsx`, res)
            }
        }

        return getOrder
    }
}