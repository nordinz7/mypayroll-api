export default {
    GET(req: Request) {
        return new Response(JSON.stringify({root: true}))
    },
}
