import { startServer, type ServerInstance } from '..'
import { beforeAll, afterAll } from 'bun:test'

let serverInstance: ServerInstance

const beforeAllTest = async () => {
  serverInstance = await startServer(true)

  await serverInstance.db.drop()
  await serverInstance.db.sync({ force: true })
}

const afterAllTest = async () => {
  await serverInstance.server.stop()
  await serverInstance.db.close()
}

beforeAll(beforeAllTest)
afterAll(afterAllTest)
