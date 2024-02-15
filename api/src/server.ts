import type { RouteHandler } from '../types'
import { createYoga, createSchema } from 'graphql-yoga'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import path from 'path'

const router = new Bun.FileSystemRouter({
    dir: process.cwd() + '/src/routes',
    style: 'nextjs'
})

const typesArray = loadFilesSync(path.resolve(__dirname, './domains'), { extensions: ['graphql'], recursive: true })
console.log('--------typesArray', typesArray)
const typeDefs: any = mergeTypeDefs(typesArray)
console.log('--------typeDefs', typeDefs)
const resolversArray = loadFilesSync(path.resolve(__dirname, './domains**/*.resolvers.*'), { extensions: ['ts'], recursive: true })
console.log('--------resolversArray', resolversArray)
const resolvers: any = mergeResolvers(resolversArray)
console.log('--------resolvers', resolvers)
const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }), graphiql: true })

const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    error:(request) =>{
        request.message && console.error(request.message)
        return new Response(JSON.stringify(request), { status: 500 })
    },
    hostname: Bun.env.HOSTNAME || 'localhost',
    development: Bun.env.NODE_ENV === 'development',
    fetch: yoga
    // fetch: async(req)=> {
    //     const url = new URL(req.url)

    //     Bun.env.NODE_ENV === 'development' && console.log('Registered routes',Object.keys(router.routes ))

    //     const match = router.match(url.pathname) // get the match from FileSystemRouter

    //     if (match) {
    //         const  routeHandler  = await import(match.filePath) // dynamically import the handler

    //         try {
    //             const fetchFnc: RouteHandler = routeHandler?.default?.[req.method] || routeHandler?.[req.method]

    //             if (!fetchFnc){
    //                 return new Response('Method not found for this route')
    //             }

    //             return fetchFnc(req) // call the handler and return the response
    //         } catch (error) {
    //             console.error(error)
    //             return new Response(`500 Internal Server Error at ${match.filePath}`, { status: 500 })
    //         }
    //     }


    //     return new Response('404 Not Found', { status: 404 })
    // },
})

console.log(`Listening on http://localhost:${server.port} ...`)
