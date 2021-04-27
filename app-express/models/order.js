const { Model, DataTypes } = require('sequelize')
const sequelize = require('../util/database')

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
}, {
  sequelize,
  modelName: 'order'
})

module.exports = Order
