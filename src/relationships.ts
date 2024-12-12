import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => {
  const { compensationItem, enumeration, employee, user, product, chart, chartProduct, refreshToken,
    entity, event, payrollPeriod, payrollReport } = sequelize.models

  employee.hasOne(enumeration)
  enumeration.hasMany(compensationItem)

  // Add user relationship
  user.hasOne(employee)
  employee.belongsTo(user)

  // Add refresh token relationship
  user.hasMany(refreshToken)
  refreshToken.belongsTo(user)

  // Add product relationship
  user.hasOne(chart, { as: 'customer', foreignKey: { allowNull: false } })

  chart.hasMany(chartProduct, { as: 'products', foreignKey: { name: 'chartId', allowNull: false } })
  chartProduct.belongsTo(chart)
  chartProduct.belongsTo(product)

  product.belongsTo(user, { as: 'seller', foreignKey: { allowNull: false } })

  user.hasMany(event)
  event.belongsTo(user)
}
