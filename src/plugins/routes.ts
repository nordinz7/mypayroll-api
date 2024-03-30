const router = new Bun.FileSystemRouter({
  dir: process.cwd() + '/src/routes',
  style: 'nextjs'
})

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