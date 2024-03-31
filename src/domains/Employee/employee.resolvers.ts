import { SevenBoom } from 'graphql-apollo-errors'
import type { MutationCreateEmployeeArgs, QueryEmployeeArgs, QueryEmployeesArgs } from '../../types'
import { Op } from 'sequelize'
import type { Context } from '../../plugins/graphql'

export default {
  Query: {
    employee: async (_: any, p: QueryEmployeeArgs, ctx: Context) => {
      if (!p._id) {
        return SevenBoom.badRequest('Employee id is required')
      }

      const employee = await ctx.sequelize.models.employee.findByPk(p._id)

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      return employee
    },
    employees: async (_: any, { input }: QueryEmployeesArgs, ctx: Context) => {
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
      if (!input) {
        return SevenBoom.badRequest('Employee data is required')
      }

      const res = await ctx.sequelize.models.employee.create({ ...input })

      return { data: res.toJSON() }
    }
  }
}
