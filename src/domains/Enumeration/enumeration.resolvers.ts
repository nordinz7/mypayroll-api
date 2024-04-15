import { SevenBoom } from 'graphql-apollo-errors'
import type { MutationCreateEnumerationArgs, MutationUpdateEnumerationArgs, QueryEnumerationArgs } from '../../types'
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

      try {
        const enumeration = await ctx.sequelize.transaction(async (transaction) => {
          const employee = await ctx.sequelize.models.employee.findByPk(employeeId, { include: ctx.sequelize.models.enumerations, raw: true, transaction })

          if (!employee) {
            return SevenBoom.notFound('Employee not found')
          }

          if (employee.enumerationId) {
            return SevenBoom.conflict('Cannot Create: Enumeration already exists, Please update it instead.')
          }

          const enumeration = await ctx.sequelize.models.enumeration.create({ basicSalary, employeeId, compensationItems }, { transaction })

          await ctx.sequelize.models.employee.update({ enumerationId: enumeration.toJSON().id }, { where: { id: employeeId }, transaction })

          return enumeration
        })

        return enumeration
      } catch (error) {
        return SevenBoom.badImplementation(error.message)
      }
    },
    updateEnumeration: async (_: any, { input }: MutationUpdateEnumerationArgs, ctx: Context) => {
      const { basicSalary, employeeId, compensationItems } = input

      try {
        const updatedEnumeration = await ctx.sequelize.transaction(async (transaction) => {
          const employee = await ctx.sequelize.models.employee.findByPk(employeeId, { include: ctx.sequelize.models.enumeration, raw: true, transaction })

          if (!employee) {
            return SevenBoom.notFound('Employee not found')
          }

          if (!employee.enumerationId) {
            return SevenBoom.notFound('Enumeration not found')
          }

          const [count, updated] = await ctx.sequelize.models.enumeration.update({ basicSalary, compensationItems }, { where: { id: employee.enumerationId }, returning: true, raw: true, transaction })

          return updated[0]
        })
        return updatedEnumeration
      } catch (error) {
        return SevenBoom.badImplementation(error.message)
      }
    }
  }
}
