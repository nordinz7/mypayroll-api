import { SevenBoom } from "graphql-apollo-errors";
import { DbSingleton } from "../../plugins/db";

export default {
  Query: {
    employee: async (_: any, p: any, __: any) => {
      if (!p._id) {
        return SevenBoom.badRequest('Employee id is required');
      }
      const db = await DbSingleton.getInstance();

      const employee  =  await db.employees.findOne({ _id: p._id})

      if (!employee) {
        return SevenBoom.notFound('Employee not found');
      }

      return employee;
    },
  },
}