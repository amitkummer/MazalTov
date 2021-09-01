import { getDaysUntilDate } from '@/assets/utils.js'
import { expect, test } from '@jest/globals'

const day = 1000 * 60 * 60 * 24 // milliseconds in a day
const now = new Date('2021-12-12T22:08:00.000Z')

test('Days until date in the future and current year', () => {
  const date = new Date(now.getTime() + 10 * day)
  expect(getDaysUntilDate(date, now)).toBe(10)
})

test('Days until date in next year', () => {
  const date = new Date(now.getTime() + 100 * day)
  expect(getDaysUntilDate(date, now)).toBe(100)
})

test('Days until date 2 years in the future', () => {
  const date = new Date(now.getTime() + 500 * day)
  expect(getDaysUntilDate(date, now)).toBe(135)
})

test('Days until date exactly 1 year in the future', () => {
  const date = new Date(now.getTime() + 365 * day)
  expect(getDaysUntilDate(date, now)).toBe(0)
})

test('Days until the current date', () => {
  const date = new Date(now.getTime())
  expect(getDaysUntilDate(date, now)).toBe(0)
})

test('Days until date in the past', () => {
  const date = new Date(now.getTime() - 100 * day)
  expect(getDaysUntilDate(date, now)).toBe(265)
})

test('Days until date 1 year in the past', () => {
  const date = new Date(now.getTime() - 500 * day)
  expect(getDaysUntilDate(date, now)).toBe(230)
})

test('Days until date exactly 1 year in the past', () => {
  const date = new Date(now.getTime() - 365 * day)
  expect(getDaysUntilDate(date, now)).toBe(0)
})
