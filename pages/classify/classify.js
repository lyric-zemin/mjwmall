import { getClassify, getRecommend } from '../../api/classify'

import { NO_DATA_CODE } from '../../config'

const DEFAULT_CATID = '2829' // activeName使用的为全等比对，统一用字符串类型

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: DEFAULT_CATID,
    classify: [],
    currentCatid: DEFAULT_CATID,
    recommend: {},
    isJump: false // 是否通过点击首页导航的标志位
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { catid } = options
    this.getClassify().then(() => {
      if (catid && catid !== this.data.activeName) {
        this.setData({
          isJump: true,
          activeName: catid,
          currentCatid: catid
        })
      }
      this.getRecommend()
    })
  },

  getClassify() {
    return getClassify().then(res => {
      this.setData({
        classify: res.data
      })
    })
  },

  getRecommend() {
    getRecommend(this.data.currentCatid).then(res => {
      if (res.code === NO_DATA_CODE) {
        this.setData({
          recommend: {}
        })
      } else {
        this.setData({
          recommend: res.data
        })
      }
    })
  },

  onChange(e) {
    const catid = e.detail
    this.setData({
      isJump: false,
      activeName: catid
    })
  },

  clickItem(e) {
    const { catid } = e.target.dataset
    this.setData({
      currentCatid: catid
    })
    this.getRecommend()
  },

  clickGoodsItem(e) {
    const { itemid } = e.target.dataset
    wx.navigateTo({
      url: `/pages/goods-detail/goods-detail?itemid=${itemid}`
    })
  },

  clickBrandItem(e) {
    console.log(e)
  }
})