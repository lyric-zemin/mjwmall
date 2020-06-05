import { getClassify } from '../../api/classify'

const DEFAULT_CATID = '2829' // activeName使用的为全等比对，统一用字符串类型

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: DEFAULT_CATID,
    classify: [],
    currentCatid: DEFAULT_CATID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { catid } = options
    this.getData().then(() => {
      if (catid) {
        this.setData({
          activeName: catid,
          currentCatid: catid
        })
      }
    })
  },

  getData() {
    return getClassify().then(res => {
      this.setData({
        classify: res.data
      })
    })
  },

  onChange(e) {
    const catid = e.detail
    this.setData({
      activeName: catid
    })
  },

  clickItem(e) {
    const { catid } = e.target.dataset
    this.setData({
      currentCatid: catid
    })
  }
})