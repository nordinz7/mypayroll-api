import { DataTypes, type Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define('compensationItem', {
/**

type CompensationItem {
  id: Int!
  enumerationId: Int!

  name: String!
  amount: Float!
  startDate: String!
  endDate: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

 */
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE
  }
}
)
