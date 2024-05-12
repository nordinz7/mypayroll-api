import { DataTypes, type Sequelize } from 'sequelize'
import { ActiveStatus } from '../types'

export default (sequelize: Sequelize) => sequelize.define('user', {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(ActiveStatus.Active, ActiveStatus.Deleted),
    allowNull: false,
    defaultValue: ActiveStatus.Active
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }

})
