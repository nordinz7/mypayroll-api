import { SevenBoom } from 'graphql-apollo-errors'
import type { Employee, MutationCreateEnumerationArgs, MutationUpdateEnumerationArgs, QueryEnumerationArgs } from '../../types'
import type { Context } from '../../plugins/graphql'

export default {
  Query: {
    enumeration: async (_: any, { id }: QueryEnumerationArgs, ctx: Context) => {
      if (!id) {
        return SevenBoom.badRequest('Enumeration Id is required')
      }

      const enumeration = await ctx.sequelize.models.enumeration.findByPk(id)

      if (!enumeration) {
        return SevenBoom.notFound('Enumeration not found')
      }

      return enumeration
    }
  },
  Mutation: {
    createEnumeration: async (_: any, { input }: MutationCreateEnumerationArgs, ctx: Context) => {
      const { basicSalary, employeeId, compensationItems } = input

      const employee = await ctx.sequelize.models.employee.findByPk(employeeId, { include: ctx.sequelize.models.enumerations })

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      if (employee.enumeration) {
        return SevenBoom.conflict('Enumeration already exists')
      }

      const enumeration = await employee.createEnumeration({
        basicSalary,
        employeeId,
        compensationItems
      })

      return enumeration
    },
    updateEnumeration: async (_: any, { input }: MutationUpdateEnumerationArgs, ctx: Context) => {
      const { basicSalary, employeeId, compensationItems } = input

      const employee = await ctx.sequelize.models.employee.findByPk(employeeId, { include: ctx.sequelize.models.enumerations })

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      if (!employee.enumeration) {
        return SevenBoom.notFound('Enumeration not found')
      }

      const enumeration = await employee.updateEnumeration({
        basicSalary,
        employeeId,
        compensationItems
      })

      return enumeration
    }
  }
}
