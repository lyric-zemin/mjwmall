import http from '../api/http'

const loginUrl = '/wechat/WechatMember/mpOauth'

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
            console.log(res)
            if (res.code === 200) {

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

}