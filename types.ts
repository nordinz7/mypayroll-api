export type Ctx = {
  db: any
}

export type RouteHandler = (req: Request, ctx?: Ctx) => Response | Promise<Response>

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RouteHandlerModule = Partial<Record<RequestMethod, RouteHandler>>

