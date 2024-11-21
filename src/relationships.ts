import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  const { compensationItem, enumeration, employee, user, product, chart } = sequelize.models

  employee.hasOne(enumeration)
  enumeration.hasMany(compensationItem)

  // Add user relationship
  user.hasOne(employee)
  employee.belongsTo(user)

  // Add product relationship
  product.hasOne(chart, { foreignKey: { allowNull: false } })
  user.hasMany(chart, { foreignKey: { allowNull: false } })

  user.hasMany(product, { foreignKey: { name: 'sellerUuid', allowNull: false } })
}
