import { config } from '../app.config'
import graphqlPlugin from './plugins/graphql'
import { DbSingletonSql } from './utils/sqldb'
import type { Server } from 'bun'
import type { Sequelize } from 'sequelize'

export type ServerInstance = {
  server: Server
  db: Sequelize
}

let serverInstance:ServerInstance['server']
let dbInstance:ServerInstance['db']

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
      fetch: graphqlPlugin(dbInstance)
    })

    const color = config.NODE_ENV === 'development' ? '36m' : '33m'

    console.log(`\x1b[${color}%s\x1b[0m`, `Listening on http://localhost:${serverInstance.port} on ${config.NODE_ENV} mode`)
  }

  return { server: serverInstance, db: dbInstance }
}

await startServer()
