import sequelize from '../db.js'
import { DataTypes } from 'sequelize'
import { Product } from './productModel.js'
import { User } from './authModel.js'

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    crmId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT },
    comment: { type: DataTypes.TEXT },
    discount: { type: DataTypes.INTEGER },
    withoutDocuments: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
})

const CartProduct = sequelize.define('cart_product', {
    discount: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
})

const MagicPay = sequelize.define('magic_pay', {
    url: { type: DataTypes.TEXT },
})

const TokenPay = sequelize.define('token_pay', {
    currency: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    amount: { type: DataTypes.DOUBLE },
    timeout: { type: DataTypes.INTEGER },
})

const MaguaPay = sequelize.define('magua_pay', {
    type: { type: DataTypes.STRING },
})

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Cart.hasMany(MagicPay)
MagicPay.belongsTo(Cart)

Cart.hasMany(TokenPay)
TokenPay.belongsTo(Cart)

Cart.hasMany(MaguaPay)
MaguaPay.belongsTo(Cart)

Product.hasOne(CartProduct)
CartProduct.belongsTo(Product)

User.hasMany(Cart)
Cart.belongsTo(User)

export { Cart, CartProduct, MagicPay, TokenPay, MaguaPay }