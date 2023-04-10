import * as types from './mutation-type.js'

const mutations = {
  [types.SHOW_LOADING] (state, payload) {
    state.showLoading = true
    state.loadingText = payload
  },
  [types.HIDE_LOADING] (state) {
    state.showLoading = false
  },
  [types.USER_INFO] (state, payload) {
    window.sessionStorage.setItem('DSAP-userInfo', JSON.stringify(payload))
    state.userInfo = payload
  },
  [types.ANALYSIS_PARAMS] (state, payload) {
    state.analysisParams = payload
  },
  [types.ANALYSIS_PARAMS_ID] (state, payload) {
    state.analysisParamsId = payload
  },
  [types.COPY_ANALYSIS_PARAMS_ID] (state, payload) {
    state.copyAnalysisParamsId = payload
  },
  [types.EVENT_STORE_DATA] (state, payload) {
    state.eventStoreData = payload
  },
  [types.MANAGER_TREE_NODE_ID] (state, payload) {
    state.managerTreeNodeId = payload
  },
  [types.TEMP_MANAGER_TREE_NODE_ID] (state, payload) {
    state.tempManagerTreeNodeId = payload
  },
  [types.MANAGER_DISABLED_MENU] (state, payload) {
    state.managerDisabledMenu = payload
  },
  [types.MANAGER_HIDE_MENU] (state, payload) {
    state.managerHideMenu = payload
  },
  [types.ANAVT_HIDE_MENU] (state, payload) {
    state.anaVTHidedMenu = payload
  },
  [types.ANAVT_DISABLED_MENU] (state, payload) {
    state.anaVTDisabledMenu = payload
  },
  [types.HOT_WORDS_SEARCH_OBJ] (state, payload) {
    window.sessionStorage.setItem('MSAP-hotWordsSearchObj', JSON.stringify(payload))
    state.hotWordsSearchObj = payload
  },
  [types.IS_DISABLED_MENU] (state, payload) {
  state.isDisabledMenu = payload
  },
  [types.SUBMIT_NEWFILE_TAB_ACTIVE] (state, payload) {
    state.submitNewFileTabActive = payload
  },
  [types.ANALYSIS_RESULT_ALL_DATA] (state, payload) {
    state.analysisResultAllData = payload
  },
  [types.MAIN_SUBLINE] (state, payload) {
    state.mainSubline = payload
  },
  [types.MENU_EDIT_STATUS] (state, payload) {
    state.menuEditStatus = payload
  },
  [types.PARAM_TWO_STATUS] (state, payload) {
    state.paramTwoStatus = payload
  }
}

export default mutations
