import { signIn, signUp } from '../domains/User/user.service'
import type { Context } from '../plugins/graphql'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}

export default async (request: Request, ctx: Context) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  let response

  try {
    const url = new URL(request.url)
    const body = await request.json()

    switch (request.method) {
    case 'GET':

      response = new Response('GET method not supported', { status: 405 })
      break
    case 'POST':
      try {
        if (url.pathname === '/api/public/register') {
          const result = await signUp(body, ctx)
          response = new Response(JSON.stringify(result), { status: 200 })
        } else if (url.pathname === '/api/public/login') {
          const result = await signIn(body, ctx)
          response = new Response(JSON.stringify(result), { status: 200 })
        } else {
          response = new Response('Not Found', { status: 404 })
        }
      } catch (error: any) {
        const errorMessage = error.message || 'Internal server error'
        const statusCode = error.statusCode || 500
        response = new Response(JSON.stringify({ error: errorMessage }), { status: statusCode })
      }
      break
    default:
      response = new Response('Method Not Allowed', { status: 405 })
    }
  } catch (error) {
    console.error('Error handling request:', error)
    response = new Response('Internal Server Error', { status: 500 })
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
