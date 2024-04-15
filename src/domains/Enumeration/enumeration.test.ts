import { expect, test } from 'bun:test'

const cases = [
  [1, 2, 3],
  [3, 4, 7]
]

test.each(cases)('%p + %p should be %p', (a, b, expected) => {
  // runs once for each test case provided
  expect(a + b).toBe(expected)
})
