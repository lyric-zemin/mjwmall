import { API_BASE_URL, OK_STATUS } from '../config'

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
      header,
      data,
      success(res) {
        if (res.statusCode === OK_STATUS) {
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