import { config } from '../app.config'
import graphqlPlugin from './plugins/graphql'
import { DbSingletonSql } from './utils/sqldb'

export const startServer = async (isTestEnvironment = false) => {
  if (isTestEnvironment) config.NODE_ENV = 'test'

  const server = Bun.serve({
    port: config.PORT,
    error: (request) => {
      return new Response(JSON.stringify(request), { status: 500 })
    },
    hostname: config.HOSTNAME,
    development: config.NODE_ENV === 'development',
    fetch: graphqlPlugin(await DbSingletonSql.getInstance())
  })

  const color = config.NODE_ENV === 'development' ? '36m' : '33m'

  console.log(`\x1b[${color}%s\x1b[0m`, `Listening on http://localhost:${server.port} on ${config.NODE_ENV} mode`)

  return server
}

startServer()
