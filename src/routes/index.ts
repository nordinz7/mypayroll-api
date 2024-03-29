import type { RouteHandlerModule } from '../../types'

export default {
  GET: async (req: Request, ctx) => {
    return new Response(JSON.stringify({ root: true }))
  }
} satisfies RouteHandlerModule
