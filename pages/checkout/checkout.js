import { getCheckoutGoods } from '../../api/checkout'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    checkoutList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  choiceAddress() {
    wx.navigateTo({
      url: '/pages/address/address?choose=1',
      events: {
        acceptDataFromOpenedPage: data => {
          this.setAddress(data)
        }
      }
    })
  },

  addAddress() {
    wx.navigateTo({
      url: '/pages/add-address/add-address?choose=1',
      // events: {
      //   acceptDataFromOpenedPage: data => {
      //     this.setAddress(data)
      //   }
      // }
    })
  },

  setAddress(address) {
    this.setData({
      address
    })
  }
})