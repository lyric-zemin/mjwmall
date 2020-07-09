import http from '../api/http'
import { mutations } from './store'

const loginUrl = '/wechat/WechatMember/mpOauth'
const checkUrl = '/BaseController/validateExpiresTime'

export default function login({ iv, encryptedData }) {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success(res) {
        if (res.code) {
          http({
            url: loginUrl,
            method: 'POST',
            data: {
              code: res.code,
              iv,
              encryptedData
            }
          }).then(res => {
            console.log('获取Token', res)
            if (res.code === 200) {
              resolve(res.data.token)
            } else {
              reject(res)
            }
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

export function checkLogin() {
  const Token = wx.getStorageSync('Token')
  if (!Token) return

  mutations.setToken(Token)
  http({ url: checkUrl }).then(res => {
    // 无效token
    if (res.code !== 200) {
      wx.getUserInfo({
        success(info) {
          login(info).then(res => {
            mutations.setToken(res)
          }).catch(() => {
            mutations.setToken('')
          })
        },
        fail() {
          mutations.setToken('')
        }
      })
    }
  })
}