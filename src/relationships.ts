import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  const { compensationItem, enumeration, employee, user, product, chart } = sequelize.models

  employee.hasOne(enumeration)
  enumeration.hasMany(compensationItem)

  // Add user relationship
  user.hasOne(employee)
  employee.belongsTo(user)

  // Add product relationship
  chart.belongsTo(product, { foreignKey: { allowNull: false } })
  chart.belongsTo(user, { as: 'customer', foreignKey: { allowNull: false } })

  product.belongsTo(user, { as: 'seller', foreignKey: { name: 'sellerUuid', allowNull: false } })
}
