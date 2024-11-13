import { createYoga, createSchema, type YogaInitialContext } from 'graphql-yoga'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import path from 'path'
import config from '../../config'
import { decodeJWT } from '../utils/auth'

const injectCtx = async (params: YogaInitialContext) => {
  const { request } = params

  const obj = {}
  const { headers } = request || {} // @ts-ignore
  const authHeader = headers?.authorization || ''
  const token = authHeader.split(' ')[1]

  const decoded = await decodeJWT(token, true)

  return {
    ...obj,
    user: decoded
  }
}

export default (ctx: Record<string, any> = {}) => {
  const typesArray = loadFilesSync(path.resolve(__dirname, '../domains'), { extensions: ['graphql'], recursive: true })
  const typeDefs: any = mergeTypeDefs(typesArray)
  const resolversArray = loadFilesSync(path.resolve(__dirname, '../domains/**/*.resolvers.*'), { extensions: ['ts'], recursive: true })
  const resolvers: any = mergeResolvers(resolversArray)

  return createYoga({
    schema: createSchema({ typeDefs, resolvers }),
    graphiql: true,
    context: (initialContext: YogaInitialContext) => {
      return { ...ctx, ...injectCtx(initialContext) }
    },
    maskedErrors: config.NODE_ENV === 'production',
  })
}
