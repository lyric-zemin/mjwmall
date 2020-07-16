import http from './http'

export function getBrandList() {
  return http({
    url: '/Choice/getChoice'
  })
}
