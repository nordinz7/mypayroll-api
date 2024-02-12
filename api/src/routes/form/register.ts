import type { RouteHandlerModule } from "../../../types"

export default {
    GET(req: Request) {
        const url = new URL(req.url)
        console.log('--------url',url)
        return new Response(Bun.file('/home/nordin/dev/projects/simple-auth/api/src/public/register.html'))
    },
} satisfies RouteHandlerModule
