const { Model, DataTypes } = require('sequelize')
const sequelize = require('../util/database')

class CartItem extends Model {}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'cartItem'
})

module.exports = CartItem
