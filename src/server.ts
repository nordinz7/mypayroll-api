import { config } from '../app.config'
import graphqlPlugin from './plugins/graphql'
import { DbSingletonSql } from './utils/sqldb'

const server = Bun.serve({
  port: config.PORT,
  error: (request) => {
    return new Response(JSON.stringify(request), { status: 500 })
  },
  hostname: config.HOSTNAME,
  development: config.NODE_ENV === 'development',
  fetch: graphqlPlugin(await DbSingletonSql.getInstance())

})

console.log(`Listening on http://localhost:${server.port} ...`)
