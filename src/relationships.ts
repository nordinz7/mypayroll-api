import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  const { compensationItem, enumeration, employee } = sequelize.models

  employee.hasOne(enumeration)
  employee.belongsTo(enumeration)

  enumeration.hasMany(compensationItem)
  compensationItem.belongsTo(enumeration)
}
