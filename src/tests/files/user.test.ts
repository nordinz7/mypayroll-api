import { test, describe, expect } from 'bun:test'
import path from 'path'
import { requestLocal } from '../../utils/request'
import { startSetup } from '../setup'

const createUserTestMutation = `
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    uuid
    name
    email
    password
    status
    createdAt
    updatedAt
  }
}
`
startSetup()

describe('Users', async () => {
  test('Create User', async () => {
    const inputs = await Bun.file(path.join(__dirname, '..', 'fixtures', 'users.json')).json()
    for (const input of inputs) {
      console.log('--------inputs', input)
      const res = await requestLocal(createUserTestMutation, { input }, {})
      console.log('--------res', res)
    }
    // expect(res?.data.rootNode?.code).toBe('JD')
    // expect(res?.data.rootNode?._id).toBe(nodeId)
  })
})
