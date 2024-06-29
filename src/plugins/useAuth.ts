import { type Plugin } from 'graphql-yoga'
import { verifyJWT } from '../utils/auth'

export const useAuth = (): Plugin => {
  return {
    async onRequest (params) {
      const { request, fetchAPI, endResponse } = params
      const rtnObj:any = { message: '' }
      const authToken = request.headers?.get('authorization')
      const [type, token] = authToken?.split(' ') || [null, null]

      if (!authToken) {
        rtnObj.message = 'Missing Auth token'
      } else if (!type || !token) {
        rtnObj.message = 'Invalid Auth token'
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
