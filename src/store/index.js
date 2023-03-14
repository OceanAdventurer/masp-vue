import Vue from 'vue'
import Vuex from 'vuex'
import createLog from 'vuex/dist/logger'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLog()]
    : []
})
