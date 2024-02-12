export default {
    GET(req: Request) {
        console.log('--------req',req )
        return new Response(Bun.file('/home/nordin/dev/projects/simple-auth/api/src/public/index.html'))
    },
}
