export default {
  PORT: Bun.env.PORT || 8000,
  HOSTNAME: Bun.env.HOSTNAME || '0.0.0.0',
  NODE_ENV: Bun.env.NODE_ENV || 'development',
  SECRET_KEY: Bun.env.SECRET_KEY || 'secret',
  JWT_SECRET_PASSPHRASE: Bun.env.JWT_SECRET_PASSPHRASE || '12345t',

  POSTGRES_DB: Bun.env.POSTGRES_DB || 'payroll',
  POSTGRES_DB_TEST: Bun.env.POSTGRES_DB_TEST || 'payroll-test',
  POSTGRES_USER: Bun.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: Bun.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_HOST: Bun.env.POSTGRES_HOST || 'localhost', // need to port to docker container ip
  POSTGRES_PORT: Bun.env.POSTGRES_PORT || 5432,

  REDIS_HOST: Bun.env.REDIS_HOST || 'localhost',
  REDIS_PORT: +(Bun.env.REDIS_PORT || 6379),
  REDIS_PASSWORD: Bun.env.REDIS_PASSWORD || 'redis',
  REDIS_TTL: +(Bun.env.REDIS_TTL || 60 * 60 * 1),

  QUEUE_NAME: Bun.env.QUEUE_NAME || 'payroll',

  ACCESS_TOKEN_EXPIRES_IN: Bun.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRES_IN: Bun.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
}
