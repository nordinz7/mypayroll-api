import { SevenBoom } from 'graphql-apollo-errors'
import type { MutationCreateEmployeeArgs, MutationUpdateEmployeeArgs, QueryEmployeeArgs, QueryEmployeesArgs } from '../../types'
import { Op } from 'sequelize'
import type { Context } from '../../plugins/graphql'
import { validateEmployee } from './helper'

export default {
  Query: {
    employee: async (_: any, { id }: QueryEmployeeArgs, ctx: Context) => {
      if (!id) {
        return SevenBoom.badRequest('Employee id is required')
      }

      const employee = await ctx.sequelize.models.employee.findByPk(id)

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      return employee
    },
    employees: async (_: any, { input }: QueryEmployeesArgs, ctx: Context) => {
      if (!input) return SevenBoom.badRequest('Query input is required')

      const { q = '', limit = 10, offset = 0 } = input

      const { count, rows } = await ctx.sequelize.models.employee.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${q}%` } }
            // { email: { [Op.iLike]: `%${q}%` } }
          ]
        },
        limit,
        offset
      })

      return { rows, pagination: { count, limit, offset } }
    }
  },
  Mutation: {
    createEmployee: async (_: any, { input }: MutationCreateEmployeeArgs, ctx: Context) => {
      const dataInput = validateEmployee(input)

      return ctx.sequelize.models.employee.create({ ...dataInput })
    },
    updateEmployee: async (_: any, { id, input }: MutationUpdateEmployeeArgs, ctx: Context) => {
      if (!id) return SevenBoom.badRequest('Employee id is required')

      const dataInput = validateEmployee(input)

      const employee = await ctx.sequelize.models.employee.findByPk(id)

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      return employee?.update({ ...dataInput }, { where: { id } })
    }
  }
}
