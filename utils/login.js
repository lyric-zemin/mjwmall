import http from '../api/http'

export default function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success(res) {
        if (res.code) {
          http({
            url: '',
            data: {
              code: res.code
            }
          }).then(res => {
            
          })
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}