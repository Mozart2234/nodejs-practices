const { Model, DataTypes } = require('sequelize')
const sequelize = require('../util/database')

class OrderItem extends Model {}

OrderItem.init({
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
  modelName: 'orderItem'
})

module.exports = OrderItem
