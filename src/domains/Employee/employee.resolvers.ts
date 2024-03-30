import { SevenBoom } from 'graphql-apollo-errors'
import type { MutationCreateEmployeeArgs } from '../../types'
import { DbSingletonSql } from '../../utils/sqldb'

export default {
  Query: {
    employee: async (_: any, p: any, __: any) => {
      if (!p._id) {
        return SevenBoom.badRequest('Employee id is required')
      }

      const db = await DbSingletonSql.getInstance()

      const employee = await db.models.employee.findByPk(p._id)

      if (!employee) {
        return SevenBoom.notFound('Employee not found')
      }

      return employee
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
