import { addAddress } from '../../api/my'

const addressAttribute = ['truename', 'mobile', 'address', 'is_default', 'regionId']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {},
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onChange(e) {
    const { name } = e.currentTarget.dataset
    const { detail } = e
    this.data.addressData[name] = detail
    this.setData({
      addressData: this.data.addressData
    })

  }
})