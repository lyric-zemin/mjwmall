import { getAddress } from '../../api/my'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAddress()
  },

  getAddress() {
    getAddress().then(res => {
      this.setData({
        addressList: res.data
      })
    })
  },

  addAddress() {
    wx.navigateTo({
      url: '/pages/add-address/add-address'
    })
  }
})