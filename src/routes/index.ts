import type { Context } from '..'
import { signIn, signUp } from '../domains/user/user.service'
import { ApiResponse } from '../utils/request'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}

export default async (request: Request, ctx: Context) => {
  if (request.method === 'OPTIONS') {
    return new ApiResponse(null, { status: 204, headers: corsHeaders })
  }

  let response: any

  try {
    const url = new URL(request.url)

    switch (request.method) {
      case 'GET':
        if (url.pathname === '/') {
          response = new ApiResponse({ status: 'ok' }, { status: 200 })
        } else if (url.pathname === '/health') {
          response = new ApiResponse({ health: 'ok' }, { status: 200 })
        }
        break
      case 'POST':
        try {
          const body = await request.json()

          if (url.pathname === '/api/public/auth/register') {
            const result = await signUp(body, ctx)
            response = new ApiResponse(result, { status: 200 })
          } else if (url.pathname === '/api/public/auth/login') {
            const result = await signIn(body, ctx)
            response = new ApiResponse(result, { status: 200 })
          } else if (url.pathname === '/api/public/auth/refresh-token') {
            response = new ApiResponse('Not Found', { status: 404 })
          } else {
            response = new ApiResponse('Not Found', { status: 404 })
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Internal server error'
          const statusCode = error.statusCode || 500
          response = new ApiResponse({ error: errorMessage }, { status: statusCode })
        }
        break
      default:
        response = new ApiResponse('Method Not Allowed', { status: 405 })
    }
  } catch (error) {
    console.error('Error handling request:', error)
    response = new ApiResponse('Internal Server Error', { status: 500 })
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
