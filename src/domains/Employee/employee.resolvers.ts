import { SevenBoom } from 'graphql-apollo-errors'
import { DbSingleton } from '../../utils/db'
import type { MutationCreateEmployeeArgs } from '../../types'

export default {
  Query: {
    employee: async (_: any, p: any, __: any) => {
      if (!p._id) {
        return SevenBoom.badRequest('Employee id is required')
      }
      const db = await DbSingleton.getInstance()

      const employee  =  await db.employees.findOne({ _id: p._id})

      if (!employee) {
        return SevenBoom.notFound('Employee not found');
      }

      return employee
    },
  },
  Mutation: {
    createEmployee: async (_: any, {input}: MutationCreateEmployeeArgs, __: any) => {
      if (!input){
        return SevenBoom.badRequest('Employee data is required')
      }

      const db = await DbSingleton.getInstance()
      const employee = await db.employees.insertOne({...input})

      return { success: employee.acknowledged  }
    },
  }
}