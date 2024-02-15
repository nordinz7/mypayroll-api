export const config = {
  PORT: Bun.env.PORT || 3000,
  HOSTNAME: Bun.env.HOSTNAME || 'localhost',
  NODE_ENV: Bun.env.NODE_ENV || 'development',
  SECRET_KEY: Bun.env.SECRET_KEY || 'secret',
  MONGOD_URL_STRING: Bun.env.MONGOD_URL_STRING || 'mongodb://localhost:27017/test'
}


export default {
  MONGOD_URL_STRING: 'mongodb://localhost:27017/test'
}