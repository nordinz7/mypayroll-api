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
const usersIndexQuery = `
query users($input: UserQueryInput) {
  users(input: $input) {
    rows {
      uuid
      name
      email
    }
    pageInfo {
      count
      limit
      offset
    }
  }
}
`

describe('Users', async () => {
  const inputs = await Bun.file(path.join(__dirname, '..', 'fixtures', 'users.json')).json()

  test('Create User', async () => {
    for (const input of inputs) {
      const res = await requestLocal(createUserTestMutation, { input }, {})
      console.log('--------Create User', res)
      expect(res?.data.createUser).toBeTruthy()
      expect(res?.data.createUser?.uuid).toEqual(input.uuid)
      expect(res?.data.createUser?.name).toEqual(input.name)
      expect(res?.data.createUser?.email).toEqual(input.email)
      expect(res?.data.createUser?.password).toEqual(input.password)
      expect(res?.data.createUser?.password).toEqual(input.confirmPassword)
    }
  })

  test('Query Users', async () => {
    const input = { limit: 10, offset: 0 }
    const res = await requestLocal(usersIndexQuery, { input }, {})
    console.log('--------Query Users', res)
    expect(res?.data.users).toBeTruthy()
    expect(res?.data.users?.rows).toHaveLength(3)
  })
})
