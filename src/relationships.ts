import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  const { compensationItem, enumeration, employee, user } = sequelize.models

  employee.hasOne(enumeration)
  enumeration.hasMany(compensationItem)

  // Add user relationship
  user.hasOne(employee)
  employee.belongsTo(user)
}
