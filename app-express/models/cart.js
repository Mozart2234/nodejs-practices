const { Model, DataTypes } = require('sequelize')
const sequelize = require('../util/database')

class Cart extends Model {}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
}, {
  sequelize,
  modelName: 'cart'
})

module.exports = Cart
