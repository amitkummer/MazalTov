import Vue from 'vue'
import Vuex from 'vuex'
import { create } from 'axios'

import { createListModule, singleUrl } from '@/store/listFactory'
import { beforeAll, expect, test } from '@jest/globals'
import { setupListMock } from '../mocks/list'

Vue.use(Vuex)
const store = new Vuex.Store(
  createListModule(singleUrl('/api/list/'), { dateFields: ['date'] })
)
store.$axios = create({})

const defaultList = [
  { id: 0, value: 'a' },
  { id: 1, value: 'b' },
  { id: 2, value: 'c' },
]

beforeAll(() => {
  setupListMock(store.$axios)
})

test('Refresh', async () => {
  const response = await store.dispatch('refresh')
  expect(response).toEqual(defaultList)
  expect(store.state.list).toEqual(defaultList)
})

test('Create', async () => {
  const response = await store.dispatch('create', {
    item: { id: 4, value: 'hello' },
  })
  expect(response).toEqual({ id: 4, value: 'hello' })
  expect(store.state.list).toEqual([...defaultList, { id: 4, value: 'hello' }])
})

test('Update', async () => {
  const response = await store.dispatch('update', {
    item: { id: 1, value: 'hello' },
    id: 1,
  })
  expect(response).toEqual({ id: 1, value: 'hello' })
  expect(store.state.list).toEqual([
    { id: 0, value: 'a' },
    { id: 1, value: 'hello' },
    { id: 2, value: 'c' },
    { id: 4, value: 'hello' },
  ])
})

test('Create with date field', async () => {
  await store.dispatch('create', {
    item: { id: 5, value: 'foo', date: '1999-03-26T22:00:00.000Z' },
  })
  expect(store.state.list).toEqual([
    { id: 0, value: 'a' },
    { id: 1, value: 'hello' },
    { id: 2, value: 'c' },
    { id: 4, value: 'hello' },
    { id: 5, value: 'foo', date: new Date('1999-03-26T22:00:00.000Z') },
  ])
})

test('Update with date field', async () => {
  await store.dispatch('update', {
    item: { id: 4, value: 'bar', date: '1999-03-26T22:00:00.000Z' },
    id: 4,
  })
  expect(store.state.list).toEqual([
    { id: 0, value: 'a' },
    { id: 1, value: 'hello' },
    { id: 2, value: 'c' },
    { id: 4, value: 'bar', date: new Date('1999-03-26T22:00:00.000Z') },
    { id: 5, value: 'foo', date: new Date('1999-03-26T22:00:00.000Z') },
  ])
})

test('Refresh with date field', async () => {
  await store.dispatch('refresh')
  const expectedList = [
    { id: 0, value: 'a' },
    { id: 1, value: 'hello' },
    { id: 2, value: 'c' },
    { id: 4, value: 'bar', date: new Date('1999-03-26T22:00:00.000Z') },
    { id: 5, value: 'foo', date: new Date('1999-03-26T22:00:00.000Z') },
  ]
  expect(store.state.list).toEqual(expectedList)
})
