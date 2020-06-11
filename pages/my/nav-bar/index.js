// pages/my/myNavBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    safeHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {
      const res = wx.getSystemInfoSync()
      this.setData({
        safeHeight: res.statusBarHeight
      })
    }
  }
})
