import { getBrandList } from '../../api/brand'
import { loading, unLoading, toastFail } from '../../utils/helper'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList: [],
    brandList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData().then(res => this.getIndexList(res))
  },

  getData() {
    loading()
    return getBrandList().then(res => {
      if (res.code === 200) {
        this.setData({
          brandList: res.data
        }, () => unLoading())
        return res.data
      }
    })
  },

  getIndexList(data) {
    const indexList = []
    if (data && data instanceof Array) {
      data.forEach(item => {
        if (item.letter == '推荐') {
          indexList.push('荐')
        } else {
          indexList.push(item.letter)
        }
      })
    }
    this.setData({
      indexList
    })
  }
})