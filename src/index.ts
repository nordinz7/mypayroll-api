import config from '../config'
import graphqlPlugin from './plugins/graphql'
import routes from './routes'
import { DbSingletonSql } from './utils/sqldb'
import type { Server } from 'bun'
import type { Sequelize } from 'sequelize'
import { ApiResponse } from './utils/request'
import type Redis from 'ioredis'
import { CacheSingleton } from './utils/cache'
import type { User } from './types'
import { getUserFromToken, isAuthenticated } from './utils/auth'
import { SevenBoom } from 'graphql-apollo-errors'

export type ServerInstance = {
  server: Server
  db: Sequelize
  cache: Redis
}

export type Context = {
  sequelize: Sequelize
  cache: Redis
  user?: User
  checkAuth: () => void
}

let serverInstance: ServerInstance['server']
let dbInstance: ServerInstance['db']
let cacheInstance: ServerInstance['cache']



export const fetchWrapper = async (request: Request, misc: any): Promise<any> => {
  const ctx: any = { sequelize: dbInstance, cache: cacheInstance }

  const checkAuth = async (): Promise<void> => {
    const isAuth = await isAuthenticated(request, ctx)

    if (!isAuth.success || isAuth.error) {
      throw SevenBoom.unauthorized(isAuth.error?.message || 'Unauthorized')
    }
  }

  ctx.checkAuth = checkAuth

  if (request.url.includes('/graphql')) {
    const { user } = await getUserFromToken(request, false, ctx)

    ctx.user = user

    return graphqlPlugin(ctx)(request, { ...misc, context: ctx })
  }

  return routes(request, ctx)
}

export const startServer = async (): Promise<ServerInstance> => {
  if (!dbInstance) {
    dbInstance = await DbSingletonSql.getInstance()
  }

  if (!cacheInstance) {
    cacheInstance = await CacheSingleton.getInstance()
  }

  if (!serverInstance) {
    serverInstance = Bun.serve({
      port: config.PORT,
      error: (request) => {
        return new ApiResponse(request, { status: 500 })
      },
      hostname: config.HOSTNAME,
      development: config.NODE_ENV === 'development',
      fetch: fetchWrapper
    })

    const color = config.NODE_ENV === 'development' ? '36m' : '33m'

    console.log(`\x1b[${color}%s\x1b[0m`, `Listening on http://${config.HOSTNAME}:${serverInstance.port} on ${config.NODE_ENV} mode`)
  }

  return { server: serverInstance, db: dbInstance, cache: cacheInstance }
}

await startServer()
