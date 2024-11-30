import { DataTypes, type Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define('refreshToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
})
