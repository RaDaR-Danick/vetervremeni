import * as dotenv from 'dotenv'
dotenv.config()

import StoreService from "../services/storeService.js"
import { Product, AttributeGroup, AttributeValue, ProductAttribute, City, ProductAvailability, CartProduct, Cart } from "../models/models.js"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createOrUpdate } from "../utils/db.js"
import { writeError } from "../utils/error.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default class StoreServiceController {
    static getStores = async (req, res) => {
        const stores = await StoreService.getStores()
        res.json(stores)
    }

    static getProducts = async (req, res) => {
        let products = []

        const groups = process.env.GROUPS.split(',')
        const params = {
            store_ids: Number(process.env.BUSINESS_RU_STORE_ID),
            with_attributes: 1,
            with_prices: 1,
            with_remains: 1,
            with_additional_fields: 1
        }

        for (let groupId of groups) {
            const getProducts = await StoreService.getProducts({
                ...params,
                group_id: Number(groupId)
            })
            products = products.concat(getProducts)
        }
        console.log(`Products: ${products.length}`);

        if (products && products.length) {
            let length = products.length
            let index = 1

            for (let product of products) {
                console.log(`${index}/${length}`);
                await this.insertProduct(product)

                index++
            }
        }

        console.log('Products updated');

        if (res) {
            res.json(products)
        }
    }

    static insertAttrubutes = async (productId, attributes) => {
        await ProductAttribute.destroy({
            where: {
                productId: productId
            }
        })

        if (attributes && attributes.length) {
            for (let item of attributes) {
                const { attribute, value } = item

                if (attribute.name && value.name) {
                    const attributeId = Number(attribute.id)
                    const valueId = Number(value.id)
                    const attributeGroupData = {
                        id: attributeId,
                        name: attribute.name
                    }
                    const attributeValueData = {
                        id: valueId,
                        name: value.name
                    }
                    const productAttributesData = {
                        productId: productId,
                        attributeGroupId: attributeId,
                        attributeValueId: valueId,
                    }

                    await createOrUpdate(AttributeGroup, attributeGroupData, { id: attributeId })
                    await createOrUpdate(AttributeValue, attributeValueData, { id: valueId })

                    await ProductAttribute.create(productAttributesData)

                    if (attribute.name === 'Бренд') {
                        await Product.update({ brandId: valueId }, { where: { id: productId } })
                    }
                }
            }
        }
    }

    static deleteProduct = async (id) => {
        await Product.destroy({
            where: { id }
        })
    }

    static insertProduct = async (data) => {
        if (data.id && data.part) {
            try {
                const id = Number(data.id)
                const dontLoad = data['52']

                if (dontLoad === 'TRUE') {
                    this.deleteProduct(id)
                } else {
                    const slug = data.part
                    const name = data.full_name
                    const search = data.full_name.replaceAll(/[^A-Za-z0-9]/gm, '') + name
                    const description = data.description
                    const code = data.code
                    const prices = data.prices
                    const attributes = data.attributes
                    const fileName = String(slug).replaceAll('/', '') + '.webp'
                    const imagePath = path.resolve(__dirname, '../', 'static', fileName)
                    const imageCheck = await fs.existsSync(imagePath)

                    let price = 0
                    let oldPrice = 0
                    let discountPrice = 0
                    let image = null

                    if (imageCheck) {
                        image = fileName
                    }

                    if (prices && prices.length) {
                        for (let item of prices) {
                            if (item.price_type.name === 'Отпускные розничные') {
                                price = item.price
                                discountPrice = item.price
                            } else if (item.price_type.name === 'Цена без скидки') {
                                oldPrice = item.price
                            }
                        }
                    }

                    const productData = { id, slug, name, search, description, code, price, discountPrice, image, oldPrice }
                    await createOrUpdate(Product, productData, { id })
                    await this.insertAttrubutes(id, attributes)
                }
            } catch (e) {
                writeError(404, e.message + ' ID:' + data.id)
            }
        }
    }

    static insertAvailability = async (productId, cityId, quantity) => {
        await ProductAvailability.create({ productId, cityId, quantity })
    }

    static updateAvailability = async (req, res) => {
        const remains = await StoreService.getRemains()

        try {
            if (remains.length) {
                const cities = {
                    645800: 'Алматы',
                }
                const cityAvailability = {}

                for (let item of remains) {
                    const { store_id, good_id, amount } = item
                    const city = cities[store_id]

                    if (city) {
                        if (!cityAvailability[city]) {
                            cityAvailability[city] = {}
                        }

                        const oldQuantity = cityAvailability[city][good_id] || 0

                        cityAvailability[city][good_id] = oldQuantity + amount
                    }
                }

                await ProductAvailability.destroy({
                    where: {},
                    truncate: true
                })

                const cityIds = {}

                for (let city in cityAvailability) {
                    const cityRemains = cityAvailability[city]

                    for (let productId in cityRemains) {
                        const quantity = cityRemains[productId]
                        let cityId = cityIds[city]

                        if (!cityId) {
                            const getCity = await City.findOne({
                                where: {
                                    name: city
                                }
                            })

                            if (getCity) {
                                cityId = getCity.dataValues.id
                            } else {
                                const insertCity = await City.create({ name: city })
                                cityId = insertCity.dataValues.id
                            }

                            cityIds[city] = cityId
                        }

                        try {
                            await this.insertAvailability(productId, cityId, quantity)
                        } catch (e) {
                            // console.log(`Ошибка обновления ${productId}`);
                        }
                    }
                }

                console.log('Availability updated');

                if (res) {
                    res.json(cityAvailability)
                }
            }
        } catch (e) {
            console.log(`Update error: ${new Date()}`);
        }
    }

    static getCities = async (req, res) => {
        const cities = await City.findAll()
        res.json(cities)
    }

    static createInvoice = async (id, amount) => {
        await StoreService.createInvoice(id, amount)
    }

    static removeAllProducts = async () => {
        const models = [CartProduct, Cart, ProductAttribute, ProductAvailability, Product]

        for (let model of models) {
            await model.truncate({ cascade: true })
        }
    }

    static getGroups = async () => {
        const groups = await StoreService.getGroups()
        return groups
    }
}