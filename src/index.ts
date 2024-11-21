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
import { decodeJWT } from './utils/auth'

export type ServerInstance = {
  server: Server
  db: Sequelize
  cache: Redis
}

export type Context = {
  sequelize: Sequelize
  cache: Redis
  user?: User
}

let serverInstance: ServerInstance['server']
let dbInstance: ServerInstance['db']
let cacheInstance: ServerInstance['cache']

const getUserFromToken = async (request: Request) => {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.split(' ')[1]

  const decoded = await decodeJWT(token, true)

  return { //@ts-ignore
    user: decoded?.user
  }
}

export const fetchWrapper = async (request: Request, misc: any): Promise<any> => {
  const ctx = { sequelize: dbInstance, cache: cacheInstance, user: await getUserFromToken(request) }

  if (request.url.includes('/graphql')) {
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
