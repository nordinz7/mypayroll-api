import graphqlPlugin from './plugins/graphql'
import { DbSingletonSql } from './utils/sqldb'

const server = Bun.serve({
  port: Bun.env.PORT || 3000,
  error: (request) => {
    return new Response(JSON.stringify(request), { status: 500 })
  },
  hostname: Bun.env.HOSTNAME || 'localhost',
  development: Bun.env.NODE_ENV === 'development',
  fetch: graphqlPlugin(await DbSingletonSql.getInstance())

})

console.log(`Listening on http://localhost:${server.port} ...`)
