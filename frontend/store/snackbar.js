export const state = () => ({
  message: null,
  shown: true,
  messageId: 0,
})

export const mutations = {
  set(state, { text, type }) {
    state.message = { text, type }
  },
  show(state) {
    state.shown = true
  },
  hide(state) {
    state.shown = false
  },
  incrementId(state) {
    state.messageId += 1
  },
}

export const actions = {
  set({ commit }, { text, type }) {
    commit('set', { text, type })
    commit('incrementId')
    commit('show')
  },
  hide({ commit }) {
    commit('hide')
  },
}
