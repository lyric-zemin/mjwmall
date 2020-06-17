import http from '../api/http'
import { mutations } from './store'

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
            console.log(res)
            // mutations.setToken(res)
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