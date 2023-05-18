import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    search: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    code: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    brandId: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER, allowNull: true },
    oldPrice: { type: DataTypes.INTEGER },
    discountPrice: { type: DataTypes.INTEGER, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
})

const ProductAttribute = sequelize.define('product_attribute', {})

const AttributeGroup = sequelize.define('attribute_group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: false },
})

const AttributeValue = sequelize.define('attribute_value', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.STRING, allowNull: false },
})

const City = sequelize.define('city', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const ProductAvailability = sequelize.define('product_availability', {
    quantity: { type: DataTypes.INTEGER }
})

Product.hasMany(ProductAttribute)
ProductAttribute.belongsTo(Product)

AttributeGroup.hasMany(ProductAttribute)
ProductAttribute.belongsTo(AttributeGroup)

AttributeValue.hasMany(ProductAttribute)
ProductAttribute.belongsTo(AttributeValue)

Product.hasMany(ProductAvailability)
ProductAvailability.belongsTo(Product)

City.hasMany(ProductAvailability)
ProductAvailability.belongsTo(City)

export { Product, ProductAttribute, AttributeGroup, AttributeValue, City, ProductAvailability }