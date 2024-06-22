import { SevenBoom } from 'graphql-apollo-errors'
import JWT from 'jsonwebtoken'
import path from 'path'

export const signJWT = async (payload: string | Buffer | object) => {
  const cert = await Bun.file(path.join(__dirname, '../../cert/private_key.pem')).text()
  return JWT.sign(payload, cert, { expiresIn: '1d' })
}

export const verifyJWT = async (token: string): Promise<object | string | null> => {
  try {
    const cert = await Bun.file(path.join(__dirname, '../../cert/public_key.pem')).text()
    return JWT.verify(token, cert, { ignoreExpiration: false })
  } catch (e) {
    console.error(`Failed to verify JWT: ${e instanceof Error ? e.message : 'Unknown error'}`)
    return null
  }
}

export const decodeJWT = async (token: string, isVerify: boolean = false) => {
  try {
    const decoded = JWT.decode(token)
    if (isVerify) {
      return verifyJWT(token) || null
    }
    return decoded
  } catch (e) {
    console.log(`Failed to decode JWT: ${e instanceof Error ? e.message : 'Unknown error'}`)
    return null
  }
}
