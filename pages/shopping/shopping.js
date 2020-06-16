
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeSelection: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  toggleSelection() {
    this.setData({
      completeSelection: !this.data.completeSelection
    })
  },

  confirm() {

  }
})