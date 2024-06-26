import { signIn, signUp } from '../domains/User/user.service'
import type { Context } from '../plugins/graphql'

export default async (request: Request, ctx: Context) => {
  const url = new URL(request.url)
  const body = await request.json()

  switch (request.method) {
  case 'GET':

    break
  case 'POST':
    if (url.pathname === '/api/public/register') {
      const res = await signUp(body, ctx)
      return new Response(JSON.stringify(res), { status: 200 })
    }

    if (url.pathname === '/api/public/login') {
      const res = await signIn(body, ctx)
      return new Response(JSON.stringify(res), { status: 200 })
    }
    break
  default:
    return new Response('Not Found', { status: 404 })
  }
}
