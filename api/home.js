import http from './http'

export function getNav() {
  http({
    url: '/nav'
  }).then(res => {
    console.log(res)
  })
}