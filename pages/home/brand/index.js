// pages/home/brand/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brands: {
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
    moreBrand() {
      wx.navigateTo({
        url: '/pages/brand/brand'
      })
    }
  }
})
