import { SevenBoom } from 'graphql-apollo-errors'
import type { MutationCreateEmployeeArgs, QueryEmployeeArgs, QueryEmployeesArgs } from '../../types'
import { DbSingletonSql } from '../../utils/sqldb'
import { Op } from 'sequelize'

export default {
  Query: {
    employee: async (_: any, p: QueryEmployeeArgs, __: any) => {
      if (!p._id) {
        return SevenBoom.badRequest('Employee id is required')
      }

      const db = await DbSingletonSql.getInstance()

      const employee = await db.models.employee.findByPk(p._id)

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      return employee
    },
    employees: async (_: any, { input }: QueryEmployeesArgs, ___: any) => {
      const { q = '', limit = 10, offset = 0 } = input

      const db = await DbSingletonSql.getInstance()

      const { count, rows } = await db.models.employee.findAndCountAll({
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
    createEmployee: async (_: any, { input }: MutationCreateEmployeeArgs, __: any) => {
      if (!input) {
        return SevenBoom.badRequest('Employee data is required')
      }

      const db = await DbSingletonSql.getInstance()

      const res = await db.models.employee.create({ ...input })

      return { data: res.toJSON() }
    }
  }
}
