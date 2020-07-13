import { API_BASE_URL, OK_STATUS } from '../config'
import { state } from '../utils/store'
import { reLogin } from '../utils/auth'

export default function http({
  url,
  data = {},
  method = 'GET',
  header = {}
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_BASE_URL + url,
      method,
      header: Object.assign({ Authorization: 'Bearer ' + state.token }, header),
      data,
      success(res) {
        if (res.statusCode === OK_STATUS) {
          // 访问过程中Token失效,二次重发
          if (state.token && res.data.code === 4001) {
            reLogin(false).then(() => {
              wx.request({
                url: API_BASE_URL + url,
                method,
                header: Object.assign({ Authorization: 'Bearer ' + state.token }, header),
                data,
                success(res) {
                  resolve(res.data)
                }
              })
            })
            return
          }
          // 正常访问
          resolve(res.data)
        } else {
          toastErr()
        }
      },
      fail(err) {
        reject(err)
        toastErr()
      }
    })
  })
}

function toastErr(title = '似乎出了一些问题') {
  wx.showToast({
    title,
    icon: 'none',
    duration: 1500
  })
}