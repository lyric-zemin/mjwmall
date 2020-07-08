export const state = {
  token: ''
}

export const mutations = {
  setToken(token) {
    // 缓存token
    wx.setStorageSync('Token', token)
    state.token = token
  }
}