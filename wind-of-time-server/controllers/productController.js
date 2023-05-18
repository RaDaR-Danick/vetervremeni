import { Product, ProductAttribute, AttributeGroup, AttributeValue, ProductAvailability } from "../models/models.js"
import { Op, fn, where as sqWhere, col, literal } from "sequelize"

export default class ProductController {
    static async getAll(req, res) {
        const { limit = 12, page = 1, filters = {}, min = '', max = '', sort = [], ids = [], city, search, rand = false } = req.query
        const exception = req.query.exception && req.query.exception.length ? req.query.exception.map(item => Number(item)) : []
        const offset = page * limit - limit
        let where = {}
        let include = [
            {
                model: ProductAvailability
            }
        ]
        let filterIds = []
        let order = sort

        if (rand) {
            order = literal('random()')
        }

        if (search) {
            where = sqWhere(
                fn('lower', col('search')),
                {
                    [Op.substring]: String(search).toLocaleLowerCase()
                }
            )
        }

        if (city) {
            const getIds = await ProductAvailability.findAll({
                attributes: ['productId'],
                where: {
                    [Op.and]: {
                        cityId: city,
                        quantity: {
                            [Op.gt]: 0
                        }
                    },
                }
            })

            for (let item of getIds) {
                const { productId } = item.dataValues
                filterIds.push(productId)
            }
        }

        if (ids.length) {
            where.id = {
                [Op.in]: ids
            }
        }

        if (Object.keys(filters).length) {
            let processedFilters = []
            let length = Object.keys(filters).length
            let ids = []

            for (let filterKey in filters) {
                let filterValue = Object.values(filters[filterKey])

                processedFilters.push({
                    [Op.and]: [
                        {
                            attributeGroupId: filterKey
                        },
                        {
                            attributeValueId: {
                                [Op.in]: filterValue
                            }
                        }
                    ]
                })
            }

            const productIds = await ProductAttribute.findAll({
                attributes: ['productId', [fn('COUNT', 'productId'), 'count']],
                group: 'productId',
                where: {
                    [Op.or]: processedFilters
                },
            })

            for (let item of productIds) {
                const { count, productId } = item.dataValues
                if (Number(count) === length) {
                    ids.push(productId)
                }
            }

            if (exception.length) {
                ids = ids.filter(item => !exception.includes(item))
            }

            where.id = {
                [Op.in]: ids
            }
        } else {
            if (exception.length) {
                where.id = {
                    [Op.notIn]: exception
                }
            }
        }

        if (min && max) {
            where.price = {
                [Op.between]: [min, max]
            }
        }

        if (where.id && filterIds.length) {
            where.id[Op.in] = where.id[Op.in].filter(id => filterIds.includes(id))
        } else if (!where.id && filterIds.length) {
            where.id = {
                [Op.in]: filterIds
            }
        }

        const products = await Product.findAndCountAll({ limit, offset, where, order, include })
        const getIds = await Product.findAll({
            attributes: ['id'],
            where
        })

        products.ids = getIds.map(item => item.id)
        products.pages = Math.ceil(products.count / limit)

        return res.json(products)
    }
    static async getOne(req, res) {
        const { id } = req.params
        const where = isNaN(Number(id)) ? { slug: id } : { id }
        const product = await Product.findOne({
            where,
            include: [
                {
                    model: ProductAttribute,
                    include: [
                        {
                            model: AttributeGroup
                        },
                        {
                            model: AttributeValue
                        },
                    ]
                },
                {
                    model: ProductAvailability
                },
            ]
        })

        if (product) {
            const filtredAttributes = product.product_attributes.map(item => {
                const title = item.attribute_group.name
                const value = item.attribute_value.name

                if (title === 'Бренд') {
                    const filterId = item.attribute_group.id
                    const valueId = item.attribute_value.id

                    product.dataValues.brand = {
                        filterId,
                        valueId,
                        name: value,
                        link: `/products?filters=${filterId}:${valueId}`
                    }
                }

                return { title, value }
            })

            delete product.dataValues.product_attributes
            product.dataValues.attributes = filtredAttributes
        }

        res.json(product)
    }
    static async getQuantity(req, res) {
        const { id } = req.params
        const product = await ProductAvailability.findAll({
            where: {
                productId: id
            },
            attributes: ['quantity', 'cityId'],
            raw: true
        })

        res.json(product)
    }
}