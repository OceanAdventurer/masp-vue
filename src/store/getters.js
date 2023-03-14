export const showLoading = (state) => {
  return state.showLoading
}

export const userInfo = (state) => {
  if (JSON.stringify(state.userInfo) === '{}' || Object.keys(state.userInfo).length === 0) {
    state.userInfo = JSON.parse(window.sessionStorage.getItem('MSAP-userInfo'))
  }
  return state.userInfo
}

export const hotWordsSearchObj = (state) => {
  if (JSON.stringify(state.hotWordsSearchObj) === '{}' || Object.keys(state.hotWordsSearchObj).length === 0) {
    state.hotWordsSearchObj = JSON.parse(window.sessionStorage.getItem('MSAP-hotWordsSearchObj'))
  }
  return state.hotWordsSearchObj
}
