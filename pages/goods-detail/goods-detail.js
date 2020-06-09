import { getGoodsDetail } from '../../api/goods-detail'

// const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { itemid } = options
    this.getDetail(itemid)
  },

  getDetail(itemid) {
    getGoodsDetail(itemid).then(res => {
      this.setData({
        goodsDetail: res.data
      })
      wx.setNavigationBarTitle({
        title: this.data.goodsDetail.title
      })
    })
  }
})