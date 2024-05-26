import JWT from 'jsonwebtoken'
import path from 'path'

export const signJWT = async (payload: string | Buffer | object) => {
  const cert = await Bun.file(path.join(__dirname, '../../cert/private_key.pem')).text()
  return JWT.sign(payload, cert)
}

export const verifyJWT = async (token: string) => {
  const cert = await Bun.file(path.join(__dirname, '../../cert/public_key.pem')).text()
  return JWT.verify(token, cert)
}
