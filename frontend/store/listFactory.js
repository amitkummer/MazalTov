export function createListModule(
  { listGetUrl, listPostUrl, detailUrl },
  { dateFields = [], ...options }
) {
  return {
    namespaced: true,
    state: () => ({
      list: null,
    }),
    mutations: {
      updateList(state, { list }) {
        const parsedList = list.map((item) => {
          for (const dateField of dateFields) {
            if (dateField in item) {
              item[dateField] = new Date(item[dateField])
            }
          }
          return item
        })
        state.list = parsedList
      },
      updateItem(state, { id, item }) {
        for (const dateField of dateFields) {
          if (dateField in item) {
            item[dateField] = new Date(item[dateField])
          }
        }
        const index = state.list.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.list[index] = item
        }
      },
      createItem(state, { item }) {
        for (const dateField of dateFields) {
          if (dateField in item) {
            item[dateField] = new Date(item[dateField])
          }
        }
        state.list.push(item)
      },
      deleteList(state) {
        state.list = null
      },
      deleteItem(state, { id }) {
        const index = state.list.findIndex((item) => item.id === id)
        if (index !== -1) {
          state.list.splice(index, 1)
        }
      },
    },
    actions: {
      create(context, { item }) {
        const formData = new FormData()
        for (const field in item) {
          if (item[field]) {
            formData.append(field, item[field])
          }
        }
        return this.$axios.post(listPostUrl, formData).then((response) => {
          context.commit('createItem', { item: response.data })
          return response.data
        })
      },
      update(context, { item, id }) {
        const formData = new FormData()
        for (const field in item) {
          if (item[field]) {
            formData.append(field, item[field])
          }
        }
        return this.$axios
          .put(`${detailUrl}${id}/`, formData)
          .then((response) => {
            context.commit('updateItem', { item: response.data, id })
            return response.data
          })
      },
      delete(context, { id }) {
        return this.$axios.delete(`${detailUrl}${id}/`).then((response) => {
          context.commit('deleteItem', { id })
          return response.data
        })
      },
      refresh(context) {
        context.commit('deleteList')
        return this.$axios.get(listGetUrl).then((response) => {
          context.commit('updateList', { list: response.data })
          return response.data
        })
      },
    },
    ...options,
  }
}

export function singleUrl(url) {
  return {
    listGetUrl: url,
    listPostUrl: url,
    detailUrl: url,
  }
}
