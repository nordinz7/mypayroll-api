export default {
  Query: {
    enumeration: async (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.userAPI.getUserById({ id })
    }
  }
}