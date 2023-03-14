import * as types from './mutation-type.js'

const mutations = {
  [types.SHOW_LOADING] (state, payload) {
    state.showLoading = true
    state.loadingText = payload
  },
  [types.HIDE_LOADING] (state) {
    state.showLoading = false
  }
}

export default mutations
