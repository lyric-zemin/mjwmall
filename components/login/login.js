import login from '../../utils/auth'
import { toastMess, loading, toastFail } from '../../utils/helper'
import { mutations } from '../../utils/store'

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
    login({ detail }) {
      loading('授权登录中...')
      // 拒绝授权
      if (detail.errMsg !== 'getUserInfo:ok') {
        toastFail()
        return
      }

      login().then(res => {
        mutations.setToken(res)
        // 刷新页面
        const currentRouter = '/' + getCurrentPages()[0].route
        wx.reLaunch({
          url: currentRouter
        })
      }).catch(() => {
        toastFail()
      })
    },
    close() {
      this.setData({
        show: false
      })
    },
    open() {
      this.setData({
        show: true
      })
    }
  },

  lifetimes: {
    attached() {
      const { token } = App.store
      if (!token) {
        this.open()
      }
    }
  }
})
