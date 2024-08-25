export const config = {
  PORT: Bun.env.PORT || 8000,
  HOSTNAME: Bun.env.HOSTNAME || 'localhost',
  NODE_ENV: Bun.env.NODE_ENV || 'development',
  SECRET_KEY: Bun.env.SECRET_KEY || 'secret',
  JWT_SECRET_PASSPHRASE: Bun.env.JWT_SECRET_PASSPHRASE || '12345t',

  POSTGRES_DB: Bun.env.POSTGRES_DB || 'payroll',
  POSTGRES_DB_TEST: Bun.env.POSTGRES_DB_TEST || 'payroll-test',
  POSTGRES_USER: Bun.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: Bun.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_HOST: Bun.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: Bun.env.POSTGRES_PORT || 5432,
}
