import graphqlPlugin from "./plugins/graphql"


const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    error:(request) =>{
        console.log('--------req',request )
        return new Response(JSON.stringify(request), { status: 500 })
    },
    hostname: Bun.env.HOSTNAME || 'localhost',
    development: Bun.env.NODE_ENV === 'development',
    fetch: graphqlPlugin()

})

console.log(`Listening on http://localhost:${server.port} ...`)
