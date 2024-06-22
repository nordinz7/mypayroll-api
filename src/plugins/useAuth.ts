import { type Plugin } from 'graphql-yoga'
import { verifyJWT } from '../utils/auth'

export const useAuth = (): Plugin => {
  return {
    async onRequest ({ request, fetchAPI, endResponse }) {
      const rtnObj:any = { message: '' }

      const authToken = request.headers?.get('authorization')
      const [type, token] = authToken?.split(' ') || [null, null]

      if (type !== 'jwt') {
        rtnObj.message = 'Invalid token type'
      } else if (!token) {
        rtnObj.message = 'Missing Auth token'
      } else {
        try {
          const val = await verifyJWT(token || '')
          if (!val) {
            rtnObj.message = 'Invalid token'
          }
        } catch (error) {
          rtnObj.message = error
        }
      }

      if (rtnObj.message) {
        return endResponse(
          new fetchAPI.Response(
            JSON.stringify(rtnObj),
            {
              status: 403,
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        )
      }
    }
  }
}
