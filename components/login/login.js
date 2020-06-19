import login from '../../utils/auth'

const App = getApp()

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
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    noLogin() {
      wx.reLaunch({
        url: '/pages/home/home'
      })
    },
    async login({ detail }) {
      console.log(detail)
      // login()
      this.close()
    },
    close() {
      this.setData({
        show: false
      })
    }
  },

  lifetimes: {
    attached() {
      const { token } = App.store
      if (!token) {
        this.setData({
          show: true
        })
      }
    }
  }
})
