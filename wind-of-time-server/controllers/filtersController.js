import * as dotenv from 'dotenv'
dotenv.config()

import { ProductAttribute, AttributeGroup, AttributeValue, Product } from "../models/models.js"
import { Op } from "sequelize"

export default class FiltersController {
    static async getAll(req, res) {
        const { applied = {} } = req.body
        const allowed = process.env.ALLOWED_FILTERS.split(',').map(item => Number(item))
        let where
        let results = {}
        let attributeGroupIds = []
        let attributeValuesIds = []
        let attributeGroups = {}
        let attributeValues = {}
        let appliedValues = []
        let maxPrice = await Product.max('price')
        let minPrice = await Product.min('price')

        if (Object.keys(applied).length) {
            for (let item of Object.values(applied)) {
                appliedValues = [...appliedValues, ...item]
            }
        }

        where = {
            attributeGroupId: {
                [Op.in]: allowed
            }
        }

        // if (products.length && appliedValues.length) {
        //     where = {
        //         [Op.or]: [
        //             {
        //                 [Op.and]: [
        //                     {
        //                         productId: {
        //                             [Op.in]: products
        //                         }
        //                     },
        //                     {
        //                         attributeGroupId: {
        //                             [Op.in]: allowed
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 attributeValueId: {
        //                     [Op.in]: appliedValues
        //                 }
        //             }
        //         ]
        //     }
        // } else if (products.length) {
        //     where = {
        //         [Op.and]: [
        //             {
        //                 productId: {
        //                     [Op.in]: products
        //                 }
        //             },
        //             {
        //                 attributeGroupId: {
        //                     [Op.in]: allowed
        //                 }
        //             }
        //         ]
        //     }
        // } else if (appliedValues.length) {
        //     where = {
        //         [Op.or]: [
        //             {
        //                 attributeGroupId: {
        //                     [Op.in]: allowed
        //                 }
        //             },
        //             {
        //                 attributeValueId: {
        //                     [Op.in]: appliedValues
        //                 }
        //             }
        //         ]
        //     }
        // } else {
        //     where = {
        //         attributeGroupId: {
        //             [Op.in]: allowed
        //         }
        //     }
        // }

        const getAll = await ProductAttribute.findAll({ where })

        if (getAll.length) {
            let rawTree = {}

            for (let item of getAll) {
                const { attributeGroupId, attributeValueId } = item

                if (!attributeGroupIds.includes(attributeGroupId)) {
                    attributeGroupIds.push(attributeGroupId)
                }

                if (!attributeValuesIds.includes(attributeValueId)) {
                    attributeValuesIds.push(attributeValueId)
                }

                if (!rawTree[attributeGroupId]) {
                    rawTree[attributeGroupId] = {
                        children: {}
                    }
                }

                rawTree[attributeGroupId].children[attributeValueId] = {}
            }

            const getAttributeGroups = await AttributeGroup.findAll({
                where: {
                    id: {
                        [Op.in]: attributeGroupIds
                    }
                }
            })

            for (let item of getAttributeGroups) {
                attributeGroups[item.id] = {
                    id: item.id,
                    name: item.name,
                }
            }

            const getAttributeValues = await AttributeValue.findAll({
                where: {
                    id: {
                        [Op.in]: attributeValuesIds
                    }
                }
            })

            for (let item of getAttributeValues) {
                attributeValues[item.id] = {
                    id: item.id,
                    name: item.name,
                }
            }

            for (let groupId in rawTree) {
                let item = rawTree[groupId]
                let { children } = item

                item.data = attributeGroups[groupId]

                for (let valueId in children) {
                    children[valueId] = attributeValues[valueId]
                }
            }

            results = rawTree
        }

        res.json({
            minPrice,
            maxPrice,
            data: results
        })
    }
}