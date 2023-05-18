import * as dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import md5 from 'md5'
import { User, UserDiscount, Cart } from '../models/models.js'

export default class StoreService {
    static _appId = process.env.BUSINESS_RU_APP_ID
    static _secret = process.env.BUSINESS_RU_SECRET
    static _address = process.env.BUSINESS_RU_ADDRESS

    static async appPsw(params = {}) {
        try {
            const _token = await this.getToken()
            const { _appId, _secret } = this
            const newParams = { app_id: _appId, ...params }
            const orderedParams = Object.keys(newParams).sort().reduce(
                (obj, key) => {
                    obj[key] = newParams[key]
                    return obj
                },
                {}
            )
            const paramsString = new URLSearchParams(orderedParams).toString()
            const appPsw = md5(`${_token + _secret + paramsString}`)

            return appPsw
        } catch (e) {
            console.log(e.message);
        }
    }

    static async getToken() {
        try {
            const params = {
                app_id: this._appId,
                app_psw: md5(`${this._secret}app_id=${this._appId}`)
            }
            const response = await axios.get(
                `${this._address}/api/rest/repair.json`,
                { params }
            )

            this._token = response.data.token
            return response.data.token
        } catch (e) {
            console.log(e.message)
        }
    }

    static async request(method, model, params = {}, body = {}) {
        try {
            const appId = this._appId
            const address = this._address
            const appPsw = await this.appPsw(params)
            const url = `${address}/api/rest/${model}.json`
            const nativeParams = {
                app_id: appId,
                app_psw: appPsw,
            }

            let res

            if (method === 'get') {
                res = await axios.get(url, { params: { ...nativeParams, ...params }, body })
            } else if (method === 'post') {
                res = await axios.post(url, body, { params: { ...nativeParams, ...params } })
            } else if (method === 'put') {
                res = await axios.put(url, body, { params: { ...nativeParams, ...params } })
            }

            return res.data
        } catch (e) {
            console.log(e.message);
        }
    }

    static async getStores() {
        try {
            const res = await this.request('get', 'stores')
            return res.result
        } catch (e) {
            console.log(e.message);
        }
    }

    static async getRemains() {
        try {
            const params = {
                limit: 250
            }
            let total = []
            let remains = []
            let page = 1

            while (remains.length > 0 || page === 1) {
                params.page = page

                const res = await this.request('get', 'storegoods', { page, ...params })

                remains = res.result

                total = [...total, ...remains]
                page++
            }

            return total
        } catch (e) {
            console.log(e.message);
        }
    }

    static async storeGoods(storeId) {
        try {
            const res = await this.request('get', 'storegoods', { store_id: storeId })
            return res.result
        } catch (e) {
            console.log(e.message);
        }
    }

    static async getProducts(params = {}, body = {}) {
        try {
            let total = []
            let products = []
            let page = 1

            while (products.length > 0 || page === 1) {
                params.page = page

                const res = await this.request('get', 'goods', { page, ...params }, body)

                products = res.result

                total = [...total, ...products]
                console.log(`Loaded ${total.length} products`)
                page++
            }

            return total
        } catch (e) {
            console.log(e.message);
        }
    }

    static async getPartnerByPhone(phone) {
        try {
            const res = await this.request('get', 'partners', { phone })
            return res.result
        } catch (e) {
            console.log(e.message);
        }
    }

    static async createPartner(name, phone = '', email = '') {
        try {
            const partner = await this.request('post', 'partners', { name })
            const id = Number(partner.result.id)
            const types = await this.request('get', 'contactinfotypes')

            for (let type of types.result) {
                const typeId = Number(type.id)
                let value

                if (type.name === 'Email') {
                    value = email
                } else if (type.name === 'Телефон') {
                    value = phone
                }

                if (value) {
                    await this.request('post', 'partnercontactinfo', {
                        contact_info: value,
                        contact_info_type_id: typeId,
                        partner_id: id,
                    })
                }
            }

            return partner.result
        } catch (e) {
            console.log(e.message);
        }
    }

    static async updatePartner(id, phone = '', email = '') {
        try {
            const types = await this.request('get', 'contactinfotypes')

            for (let type of types.result) {
                const typeId = Number(type.id)
                let value

                if (type.name === 'Email') {
                    value = email
                } else if (type.name === 'Телефон') {
                    value = phone
                }

                if (value) {
                    await this.request('put', 'partnercontactinfo', {
                        contact_info: value,
                        contact_info_type_id: typeId,
                        partner_id: id,
                    })
                }
            }

            return { success: true }
        } catch (e) {
            console.log(e.message);
        }
    }

    static async createOrder(cartId, type, partnerId, address = '', comment = '', products, withoutDocuments = false) {
        try {
            const employees = await this.request('get', 'employees')
            let employeeId

            for (let employee of employees.result) {
                if (employee.email === 'ilyasov.zhan@gmail.com') {
                    employeeId = Number(employee.id)
                }
            }

            if (!employeeId) {
                employeeId = Number(employees.result[0].id)
            }

            ///

            const organizations = await this.request('get', 'organizations')
            let organizationId = Number(organizations.result[0].id)

            if (type == 'maguapay') {
                comment = [comment, 'Maguapay'].join("\n")
            }

            ///

            const order = await this.request('post', 'customerorders', {
                author_employee_id: employeeId,
                comment: withoutDocuments ? "Без документов\n" + comment : comment,
                delivery_address: address,
                organization_id: organizationId,
                partner_id: partnerId,
                responsible_employee_id: employeeId,
            })

            const id = Number(order.result.id)

            for (let item of products) {
                await this.request('post', 'customerordergoods', {
                    amount: item.quantity,
                    customer_order_id: id,
                    good_id: item.id,
                    price: item.oldPrice,
                    discount_type: 1,
                    discount_value: item.discount
                })
            }

            await Cart.update({
                crmId: id,
            }, {
                where: {
                    id: cartId
                }
            })

            return { success: true }
        } catch (e) {
            console.log(e.message)
        }
    }

    static async updateDiscounts() {
        try {
            const users = await User.findAll()

            if (users && users.length) {
                const coefficients = [
                    {
                        brandId: 229047,
                        ratioId: 31,
                        ratioWithoutDocumentsId: 32
                    },
                    {
                        brandId: 274381,
                        ratioId: 33,
                        ratioWithoutDocumentsId: 34
                    },
                    {
                        brandId: 274592,
                        ratioId: 35,
                        ratioWithoutDocumentsId: 36
                    },
                    {
                        brandId: 306090,
                        ratioId: 37,
                        ratioWithoutDocumentsId: 38
                    },
                    {
                        brandId: 318739,
                        ratioId: 39,
                        ratioWithoutDocumentsId: 40
                    },
                    {
                        brandId: 322893,
                        ratioId: 41,
                        ratioWithoutDocumentsId: 42
                    },
                    {
                        brandId: 332355,
                        ratioId: 43,
                        ratioWithoutDocumentsId: 44
                    },
                    {
                        brandId: 341889,
                        ratioId: 45,
                        ratioWithoutDocumentsId: 46
                    },
                    {
                        brandId: 414742,
                        ratioId: 47,
                        ratioWithoutDocumentsId: 48
                    },
                    {
                        brandId: 642423,
                        ratioId: 49,
                        ratioWithoutDocumentsId: 50
                    },
                ]

                await UserDiscount.destroy({
                    where: {},
                    truncate: true
                })

                for (let user of users) {
                    const { id, email } = user
                    const partner = await this.request('get', 'partners', { email, with_additional_fields: 1 })

                    if (partner && partner.result && partner.result.length) {
                        const partnerData = partner.result[0]
                        const discount = Number(partnerData[13]) || 0

                        for (let coefficient of coefficients) {
                            const { brandId, ratioId, ratioWithoutDocumentsId } = coefficient
                            let ratio = partnerData[ratioId] || 0
                            let ratioWithoutDocuments = partnerData[ratioWithoutDocumentsId] || 0

                            if (ratio || ratioWithoutDocuments) {
                                await UserDiscount.create({
                                    userId: id,
                                    brandId,
                                    ratio,
                                    ratioWithoutDocuments
                                })
                            }
                        }

                        await user.update({ discount })
                    }
                }
            }

            return { success: true }
        } catch (e) {
            console.log(e.message)
        }
    }

    static async getGroups() {
        const order = await this.request('get', 'groupsofgoods')

        return order
    }

    static async getOrder(id) {
        const order = await this.request('get', 'customerorders', {
            id: id,
            with_additional_fields: 1,
        })

        return order
    }

    static async createInvoice(id, amount) {
        const getOrder = await this.getOrder(id)

        if (getOrder.status === 'ok' && getOrder.result && getOrder.result.length) {
            const order = getOrder.result[0]
            const partnerId = order.partner_id

            const employees = await this.request('get', 'employees')
            let employeeId

            for (let employee of employees.result) {
                if (employee.email === 'ilyasov.zhan@gmail.com') {
                    employeeId = Number(employee.id)
                }
            }

            if (!employeeId) {
                employeeId = Number(employees.result[0].id)
            }

            const organizations = await this.request('get', 'organizations')
            let organizationId = Number(organizations.result[0].id)

            const payment = await this.request('post', 'paymentin', {
                owner_employee_id: employeeId,
                author_employee_id: employeeId,
                organization_id: organizationId,
                payment_type: 2,
                sum: amount,
                partner_id: partnerId,
                operation_id: 2
            })

            if (payment.status === 'ok') {
                const paymentData = payment.result
                const paymentId = paymentData.id

                await this.request('post', 'paymentintocustomerorder', {
                    paymentin_id: paymentId,
                    customer_order_id: id,
                    sum: amount
                })
                return { success: true }
            } else {
                return { success: false }
            }
        }
    }
}