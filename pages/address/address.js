import { getAddress } from '../../api/my'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    isChoose: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    if (option.choose == 1) {
      this.data.isChoose = true
    }
  },

  onShow() {
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
  },

  editAddress(e) {
    const { itemid } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/add-address/add-address?itemid=${itemid}`
    })
  },

  chooseAddress(e) {
    if (!this.data.isChoose) {
      return
    }
    const { index } = e.currentTarget.dataset
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', this.data.addressList[index])
    wx.navigateBack()
  }
})