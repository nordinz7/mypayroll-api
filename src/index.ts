import config from '../config'
import graphqlPlugin from './plugins/graphql'
import routes from './routes'
import { DbSingletonSql } from './utils/sqldb'
import type { Server } from 'bun'
import type { Sequelize, Transaction } from 'sequelize'
import { ApiResponse } from './utils/request'
import type Redis from 'ioredis'
import { CacheSingleton } from './utils/cache'
import type { User } from './types'
import { getUserFromToken, isAuthenticated } from './utils/auth'
import { SevenBoom } from 'graphql-apollo-errors'
import type { Queue } from 'bullmq'
import { QueueSingleton } from './utils/queue'
import type { YogaInitialContext } from 'graphql-yoga'
import EventService from './domains/event/event.service'


export type ServerInstance = {
  server: Server
  db: Sequelize
  cache: Redis
  queue: Queue
}

export interface Context extends YogaInitialContext {
  sequelize: Sequelize
  cache: Redis
  queue: Queue
  user?: User
  checkAuth: () => void
  addEvent: EventService['create']
  transaction: Transaction
}

let serverInstance: ServerInstance['server']
let dbInstance: ServerInstance['db']
let cacheInstance: ServerInstance['cache']
let queueInstance: ServerInstance['queue']

let ctx: any = {}


export const fetchWrapper = async (request: Request, misc: any): Promise<any> => {
  ctx = { sequelize: dbInstance, cache: cacheInstance, queue: queueInstance }

  const checkAuth = async (): Promise<void> => {
    const isAuth = await isAuthenticated(request, ctx)

    if (!isAuth.success || isAuth.error) {
      throw SevenBoom.unauthorized(isAuth.error?.message || 'Unauthorized')
    }
  }

  ctx.checkAuth = checkAuth
  ctx.addEvent = EventService.create

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

  if (!queueInstance) {
    queueInstance = await QueueSingleton.getInstance({ cache: cacheInstance, sequelize: dbInstance })
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

  return { server: serverInstance, db: dbInstance, cache: cacheInstance, queue: queueInstance }
}

await startServer()
