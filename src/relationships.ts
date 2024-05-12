import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  const { compensationItem, enumeration, employee, user } = sequelize.models

  employee.hasOne(enumeration)
  employee.belongsTo(enumeration)

  enumeration.hasMany(compensationItem)
  compensationItem.belongsTo(enumeration)

  // Add user relationship
  user.hasOne(employee)
  employee.belongsTo(user)
}
