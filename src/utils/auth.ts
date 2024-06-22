import { SevenBoom } from 'graphql-apollo-errors'
import JWT from 'jsonwebtoken'
import path from 'path'

export const signJWT = async (payload: string | Buffer | object) => {
  const cert = await Bun.file(path.join(__dirname, '../../cert/private_key.pem')).text()
  return JWT.sign(payload, cert, { expiresIn: '1d' })
}

export const verifyJWT = async (token: string): Promise<object | string> => {
  try {
    const cert = await Bun.file(path.join(__dirname, '../../cert/public_key.pem')).text()
    return JWT.verify(token, cert, { ignoreExpiration: false })
  } catch (e) {
    throw SevenBoom.badRequest(`Failed to verify JWT: ${e instanceof Error ? e.message : 'Unknown error'}`)
  }
}

export const decodeJWT = async (token: string, isVerify: boolean = false) => {
  try {
    const decoded = JWT.decode(token)
    if (isVerify) {
      return verifyJWT(token)
    }
    return decoded
  } catch (e) {
    throw SevenBoom.badRequest(`Failed to decode JWT: ${e instanceof Error ? e.message : 'Unknown error'}`)
  }
}
