import type { RouteHandlerModule } from '../../../types'

export default {
  GET: async (req: Request, ctx) => {
    const file = await Bun.file('/home/nordin/dev/projects/simple-auth/api/src/public/register.html')
    return new Response(file)
  }
} satisfies RouteHandlerModule
