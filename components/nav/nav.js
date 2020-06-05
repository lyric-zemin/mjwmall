Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore() {
      wx.switchTab({
        url: '/pages/classify/classify'
      })
    },
    onTap(e) {
      const { catid } = e.target.dataset
      // 待优化
      wx.reLaunch({
        url: `/pages/classify/classify?catid=${catid}`
      })
    }
  }
})