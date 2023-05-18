import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.TEXT, allowNull: false},
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'customer'},
    discount: {type: DataTypes.INTEGER, defaultValue: 0},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.TEXT},
})

const UserDiscount = sequelize.define('user_discount', {
    brandId: {type: DataTypes.INTEGER},
    ratio: {type: DataTypes.DOUBLE},
    ratioWithoutDocuments: {type: DataTypes.DOUBLE},
})

User.hasOne(Token)
Token.belongsTo(User)
User.hasMany(UserDiscount)
UserDiscount.belongsTo(User)

export {User, Token, UserDiscount}