import { getUserInfo } from '../../api/my'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserInfo()
  },

  getUserInfo() {
    getUserInfo().then(res => {
      this.setData({
        userInfo: res.data
      })
    })
  },

  goFavorite() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    })
  },

  goHistory() {
    wx.navigateTo({
      url: '/pages/history-record/history-record'
    })
  }
})