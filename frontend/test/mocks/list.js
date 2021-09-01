import MockAdapter from 'axios-mock-adapter'

function getIndex(url) {
  const index = url.match(/\/(\d+)\/?$/)
  return Number.parseInt(index[1], 10)
}

export function setupListMock(axios) {
  const mock = new MockAdapter(axios)

  const list = [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
  ]

  mock.onGet('/api/list/').reply(() => {
    return [200, Array.from(list)]
  })
  mock.onPost('/api/list/').reply((config) => {
    list.push(JSON.parse(config.data))
    return [201, config.data]
  })

  mock.onPut(/^\/api\/list\/\d+\/?$/).reply((config) => {
    const id = getIndex(config.url)
    const index = list.findIndex((item) => item.id === id)
    if (index !== -1) {
      list[index] = JSON.parse(config.data)
      return [200, config.data]
    } else {
      return [404]
    }
  })
  mock.onDelete(/^\/api\/list\/\d+\/?$/).reply((config) => {
    const id = getIndex(config.url)
    const index = list.findIndex((item) => item.id === id)
    if (index !== -1) {
      return [204, list.splice(index, 1)[0]]
    } else {
      return [404]
    }
  })
}
