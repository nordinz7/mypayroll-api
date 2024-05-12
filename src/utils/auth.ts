import JWT from 'jsonwebtoken'

export const signJWT = async (payload: string | Buffer | object) => {
  const cert = await Bun.file('../../cert/public_key.pem').text()
  return JWT.sign(payload, cert)
}
