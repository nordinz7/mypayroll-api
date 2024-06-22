import { createYoga, createSchema, type YogaInitialContext } from 'graphql-yoga'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import path from 'path'
import { config } from '../../app.config'
import type { Sequelize } from 'sequelize'
import type { User } from '../types'
import { decodeJWT } from '../utils/auth'
import { useJWT } from '@graphql-yoga/plugin-jwt'

export type Context = {
  sequelize: Sequelize
  user?: User
}

const injectCtx = async ({ request }: YogaInitialContext) => {
  const obj = {}
  const { headers } = request // @ts-ignore
  const authHeader = headers?.authorization || ''
  const token = authHeader.split(' ')[1]

  const decoded = await decodeJWT(token, true)

  return {
    ...obj,
    user: decoded
  }
}

export default async (sequelize: Sequelize) => {
  const typesArray = loadFilesSync(path.resolve(__dirname, '../domains'), { extensions: ['graphql'], recursive: true })
  const typeDefs: any = mergeTypeDefs(typesArray)
  const resolversArray = loadFilesSync(path.resolve(__dirname, '../domains/**/*.resolvers.*'), { extensions: ['ts'], recursive: true })
  const resolvers: any = mergeResolvers(resolversArray)

  const cert = await Bun.file(path.join(__dirname, '../../cert/public_key.pem')).text()

  return createYoga({
    schema: createSchema({ typeDefs, resolvers }),
    graphiql: true,
    context: (initialContext: YogaInitialContext) => {
      return { sequelize, ...injectCtx(initialContext) }
    },
    maskedErrors: config.NODE_ENV === 'production',
    plugins: [useJWT({ signingKey: cert, issuer: 'mypayroll-api', ignoreExpiration: false, getToken: ({ request }) => request?.headers?.authorization?.split(' ')[1] })]
  })
}
