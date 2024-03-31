import { DataTypes, type Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define('enumeration', {
/**
type Enumeration {
  id: Int!
  employeeId: Int!

  basicSalary: Float!
  compensationItems: [CompensationItem]
  createdAt: DateTime!
  updatedAt: DateTime!
}

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
  basicSalary: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}
)
