import { getCheckoutGoods, getDefaultAddress, submitOrder } from '../../api/checkout'
import { toastMess, loading, unLoading } from '../../utils/helper'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    checkoutList: [],
    pieces: 0,
    totalPrice: 0,
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    loading()
    this.data.options = options
    this.getData(options)
  },

  getData(data) {
    getDefaultAddress().then(res => {
      if (res.code === 200) {
        this.setData({
          address: res.data
        })
      } else {
        toastMess('获取默认地址失败了')
      }
    })
    getCheckoutGoods(data).then(res => {
      const { carts, total } = res.data
      this.setData({
        checkoutList: carts,
        pieces: total.total_number,
        totalPrice: total.amount
      }, () => unLoading())
    })
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
      url: '/pages/add-address/add-address?choose=1'
    })
  },

  setAddress(address) {
    this.setData({
      address
    })
  },

  submitOrder() {
    const address_id = this.data.address.itemid
    if (!address_id) {
      toastMess('还未选择地址')
      return
    }
    const { buynow } = this.data.options
    const invoice_id = '1,2'

    // 购物车购买
    if (buynow == 0) {
      const { key_no } = this.data.options
      console.log('购物车购买', key_no, buynow, address_id, invoice_id)
      submitOrder({ key_no, address_id, invoice_id, buynow }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.payment()
        }
      })
    }

    // 立即购买
    if (buynow == 1) {
      const { key_no } = this.data.checkoutList[0][0]
      const { num } = this.data.options
      console.log('立即购买', key_no, buynow, address_id, invoice_id, num)
    }
  },

  payment(obj) {
    wx.requestPayment({
      ...obj,
      success(res) { console.log(res) },
      fail(err) { console.log(err) }
    })
  }
})