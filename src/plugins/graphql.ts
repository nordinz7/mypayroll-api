import { createYoga, createSchema } from 'graphql-yoga'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import path from 'path'
import { config } from '../../app.config'
import type { Sequelize } from 'sequelize'

export type Context = {
  sequelize: Sequelize
}

export default (sequelize: Sequelize) => {
  const typesArray = loadFilesSync(path.resolve(__dirname, '../domains'), { extensions: ['graphql'], recursive: true })
  const typeDefs: any = mergeTypeDefs(typesArray)
  const resolversArray = loadFilesSync(path.resolve(__dirname, '../domains/**/*.resolvers.*'), { extensions: ['ts'], recursive: true })
  const resolvers: any = mergeResolvers(resolversArray)

  return createYoga({
    schema: createSchema({ typeDefs, resolvers }),
    graphiql: true,
    context: {
      sequelize
    }
  })
}
