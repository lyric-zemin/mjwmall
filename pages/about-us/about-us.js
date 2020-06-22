import { getAboutUs } from '../../api/my'
import { loading, unLoading } from '../../utils/helper'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },

  getData() {
    loading()
    getAboutUs().then(res => {
      this.setData({
        content: res.data.content
      })
      unLoading()
    })
  }
})