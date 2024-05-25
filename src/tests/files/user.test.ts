import { test, describe, expect } from 'bun:test'
import path from 'path'
import { requestLocal } from '../../utils/request'

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
describe('Users', async () => {
  test('Create User', async () => {
    const inputs = await Bun.file(path.join(__dirname, '..', 'fixtures', 'users.json')).json()

    for (const input of inputs) {
      const res = await requestLocal(createUserTestMutation, { input }, {})
      expect(res?.data.createUser).toBeTruthy()
      expect(res?.data.createUser?.uuid).toEqual(input.uuid)
      expect(res?.data.createUser?.name).toEqual(input.name)
      expect(res?.data.createUser?.email).toEqual(input.email)
      expect(res?.data.createUser?.password).toEqual(input.password)
      expect(res?.data.createUser?.password).toEqual(input.confirmPassword)
    }
  })
})
