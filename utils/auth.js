import http from '../api/http'
import { mutations } from './store'

const loginUrl = '/wechat/WechatMember/mpOauth'
const checkUrl = '/BaseController/validateExpiresTime'

// export default function login({ iv, encryptedData }) {
//   return new Promise((resolve, reject) => {
//     wx.login({
//       timeout: 10000,
//       success(res) {
//         if (res.code) {
//           http({
//             url: loginUrl,
//             method: 'POST',
//             data: {
//               code: res.code,
//               iv,
//               encryptedData
//             }
//           }).then(res => {
//             console.log('获取Token', res)
//             if (res.code === 200) {
//               resolve(res.data.token)
//             } else {
//               reject(res)
//             }
//           })
//         } else {
//           reject(res)
//         }
//       },
//       fail(err) {
//         reject(err)
//       }
//     })
//   })
// }

export default function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success(res) {
        if (res.code) {
          // 修复二次点击才能成功获取Token
          wx.getUserInfo({
            success(info) {
              const { iv, encryptedData } = info
              http({
                url: loginUrl,
                method: 'POST',
                data: {
                  code: res.code,
                  iv,
                  encryptedData
                }
              }).then(respond => {
                console.log('获取Token', respond)
                if (respond.code === 200) {
                  resolve(respond.data.token)
                } else {
                  reject(respond)
                }
              })
            },
            fail(err) {
              reject(err)
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

  // 检查登录态是否过期
  wx.checkSession({
    success() {
      // 核验token是否有效
      http({ url: checkUrl }).then(res => {
        if (res.code !== 200) {
          reLogin()
        }
      })
    },
    fail() {
      reLogin()
    }
  })
}

function reLogin() {
  login().then(res => {
    mutations.setToken(res)
    // 刷新页面
    const currentRouter = '/' + getCurrentPages()[0].route
    wx.reLaunch({
      url: currentRouter
    })
  }).catch(() => {
    mutations.setToken('')
  })
}