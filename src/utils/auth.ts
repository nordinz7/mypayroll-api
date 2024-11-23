import JWT from 'jsonwebtoken'
import path from 'path'
import type { Context } from '..'
import { getUser } from '../domains/user/user.service'
import { SevenBoom } from 'graphql-apollo-errors'

export const signJWT = async (payload: string | Buffer | object) => {
  const cert = await Bun.file(path.join(__dirname, '../../cert/private_key.pem')).text()
  return JWT.sign(payload, cert, { expiresIn: '1d' })
}

export const verifyJWT = async (token: string): Promise<object | string | null> => {
  try {
    const cert = await Bun.file(path.join(__dirname, '../../cert/private_key.pem')).text()
    return JWT.verify(token, cert, { ignoreExpiration: false })
  } catch (e) {
    return new Error(`Failed to verify JWT: ${e instanceof Error ? e.message : 'Unknown error'}`)
  }
}

export const decodeJWT = async (token: string, isVerify: boolean = false) => {
  try {
    if (!token) throw SevenBoom.unauthorized('Unauthorized: No credentials provided')

    const decoded = JWT.decode(token)

    if (isVerify) {
      return verifyJWT(token) || null
    }

    return decoded
  } catch (e) {
    throw SevenBoom.unauthorized(e.message)
  }
}

export const getUserFromToken = async (request: Request, isCheckAuth = false, ctx: Context) => {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.split(' ')[1]

  try {
    const decoded = await decodeJWT(token, true) //@ts-ignore
    const user = decoded?.user

    if (!user?.uuid) {
      throw SevenBoom.unauthorized('Unauthorized: Invalid User')
    }

    if (isCheckAuth) {
      await getUser(user.uuid, ctx)
    }

    return { user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

export const isAuthenticated = async (request: Request, ctx: Context) => {
  try {
    const u = await getUserFromToken(request, true, ctx)
    return { success: !!u?.user?.uuid, error: u.error }
  } catch (error) {
    return { success: false, error }
  }
}