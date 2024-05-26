import { test, describe, expect } from 'bun:test'
import path from 'path'
import { requestLocal } from '../../utils/request'
import { verifyJWT } from '../../utils/auth'

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

const userQuery = `
query user($uuid: UUID) {
  user(uuid: $uuid) {
      uuid
      name
      email
      password
    }
}
`
const updateUserMutation = `
mutation updateUser($input: CreateUserInput!) {
  updateUser(input: $input) {
    uuid
    name
    email
    password
    status
    createdAt
    updatedAt
}
`
const deleteUserMutation = `
mutation deleteUser($uuid: UUID!) {
  deleteUser(uuid: $uuid) {
    uuid
    name
    email
    password
    status
    createdAt
    updatedAt
}
}`

const unDeleteUserMutation = `
mutation unDeleteUser($uuid: UUID!) {
  unDeleteUser(uuid: $uuid) {
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

const signInMutation = `
mutation signIn($input: SignInInput) {
  signIn(input: $input) {
      jwt
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

  test('Query User', async () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174002'
    const res = await requestLocal(userQuery, { uuid }, {})
    console.log('--------Query User', res)
    expect(res?.data.user).toBeTruthy()
    expect(res?.data.user?.uuid).toBe(uuid)
    expect(res?.data.user?.name).toBe('Bob Smith')
    expect(res?.data.user?.email).toBe('bob.smith@example.com')
    expect(res?.data.user?.password).toBe('password789')
  })

  test('Query Users', async () => {
    const input = { limit: 10, offset: 0 }
    const res = await requestLocal(usersIndexQuery, { input }, {})
    console.log('--------Query Users', res)
    expect(res?.data.users).toBeTruthy()
    expect(res?.data.users?.rows).toHaveLength(3)
  })

  test('Sign in', async () => {
    const input = { email: 'john.doe@example.com', password: 'password123' }
    const res = await requestLocal(signInMutation, { input }, {})
    console.log('--------Sign in', res)
    const jwt = res?.data?.signIn?.jwt
    const decoded = await verifyJWT(jwt)
    console.log('--------decoded', decoded)
    expect(jwt).toBeTruthy()
  })
  test('Sign in with invalid email should throw error user not found', async () => {
    const input = { email: 'john.doe+1@example.com', password: 'password123' }
    const res = await requestLocal(signInMutation, { input }, {})
    console.log('--------Sign in', res)
    expect(res?.data?.signIn?.jwt).toBeFalsy()
    expect(res?.errors).toBeTruthy()
    expect(res?.errors[0].message).toBe('User not found')
  })
  test('Sign in with invalid password should throw error invalid password', async () => {
    const input = { email: 'john.doe@example.com', password: 'password1234' }
    const res = await requestLocal(signInMutation, { input }, {})
    console.log('--------Sign in', res)
    expect(res?.data?.signIn?.jwt).toBeFalsy()
    expect(res?.errors).toBeTruthy()
    expect(res?.errors[0].message).toBe('Invalid password')
  })
})
