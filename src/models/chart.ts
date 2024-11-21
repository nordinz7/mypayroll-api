import { DataTypes, type Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define('chart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
