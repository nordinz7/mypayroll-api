import { config } from '../app.config'
import graphqlPlugin from './plugins/graphql'
import routes from './routes'
import { DbSingletonSql } from './utils/sqldb'
import type { Server } from 'bun'
import type { Sequelize } from 'sequelize'

export type ServerInstance = {
  server: Server
  db: Sequelize
}

let serverInstance: ServerInstance['server']
let dbInstance: ServerInstance['db']

export const fetchWrapper = async (request: Request, misc: any): Promise<any> => {
  if (request.url.includes('/graphql')) {
    return graphqlPlugin(dbInstance)(request, misc)
  }

  return routes(request, { sequelize: dbInstance })
}

export const startServer = async (): Promise<ServerInstance> => {
  if (!dbInstance) {
    dbInstance = await DbSingletonSql.getInstance()
  }

  if (!serverInstance) {
    serverInstance = Bun.serve({
      port: config.PORT,
      error: (request) => {
        return new Response(JSON.stringify(request), { status: 500 })
      },
      hostname: config.HOSTNAME,
      development: config.NODE_ENV === 'development',
      fetch: fetchWrapper
    })

    const color = config.NODE_ENV === 'development' ? '36m' : '33m'

    console.log(`\x1b[${color}%s\x1b[0m`, `Listening on http://${config.HOSTNAME}:${serverInstance.port} on ${config.NODE_ENV} mode`)
  }

  return { server: serverInstance, db: dbInstance }
}

await startServer()
