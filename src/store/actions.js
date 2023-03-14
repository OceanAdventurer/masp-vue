import * as types from './mutation-type.js'

export const showloader = ({ commit }, payload) => {
  commit(types.SHOW_LOADING, payload)
}

export const hideloader = ({ commit }) => {
  commit(types.HIDE_LOADING)
}
