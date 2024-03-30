import { DataTypes, type Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define('employee', {
/**
 *   _id: ID
  name: String!
  birthDate: DateTime!
  nationality: String!
  religion: Religion
  race: Race
  martialStatus: MartialStatus
  qualification: String
  educationLevel: EducationLevel

  spouseName: String
  spouseOccupation: String
  children: Int

  enumeration: Enumeration

  phone: String
  email: String
  createdAt: String!
  updatedAt: String!
 */
  _id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
})
