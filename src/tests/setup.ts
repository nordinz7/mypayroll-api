import { beforeAll, afterAll } from 'bun:test'
import { startServer } from '..'
import { DbSingletonSql } from '../utils/sqldb'

export const startSetup = async () => {
  beforeAll(async () => {
    console.log('--------steup test')
    // global setup
    await startServer(true)

    // empty the database
    const db = await DbSingletonSql.getInstance()

    await db.drop()
    await db.sync({ force: true })
  })

  afterAll(async () => {
  // global teardown
    await DbSingletonSql.getInstance().then((db) => db.close())
  })
}
