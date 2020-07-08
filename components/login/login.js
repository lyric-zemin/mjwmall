import login from '../../utils/auth'
import { toastMess, loading, unLoading, toastFail } from '../../utils/helper'
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
    async login({ detail }) {
      loading('授权登录中...')
      const loginStatus = await login(detail)
      const currentRouter = '/' + getCurrentPages()[0].route
      // this.close()
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
