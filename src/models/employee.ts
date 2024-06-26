import { DataTypes, type Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define('employee', {
/**
 *   _id: ID
   name: String!
  birthDate: DateTime!
  nationality: String!
  religion: Religion
  race: Race
  martialStatus: MartialStatus!
  qualification: String
  educationLevel: EducationLevel

  spouseName: String
  spouseOccupation: String
  children: Int

  joinDate: DateTime!
  endDate: DateTime
  phone: String
  email: String
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
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  race: {
    type: DataTypes.STRING,
    allowNull: true // Assuming race can be optional
  },
  maritalStatus: { // Corrected typo from "martialStatus" to "maritalStatus"
    type: DataTypes.STRING,
    allowNull: false
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: true // Assuming qualification can be optional
  },
  educationLevel: {
    type: DataTypes.STRING,
    allowNull: true // Assuming education level can be optional
  },
  spouseName: {
    type: DataTypes.STRING,
    allowNull: true // Assuming spouse name can be optional
  },
  spouseOccupation: {
    type: DataTypes.STRING,
    allowNull: true // Assuming spouse occupation can be optional
  },
  children: {
    type: DataTypes.INTEGER,
    allowNull: true // Assuming number of children can be optional
  },
  joinDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true // Assuming end date can be optional (for current employees)
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true // Assuming phone can be optional
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true // Assuming email can be optional
  }

})
