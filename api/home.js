import http from './http'

export function getNav() {
  return http({
    url: '/mall/SortController/index'
  })
}

export function getBanner() {
  return http({
    url: '/mall/Banner/getBanner'
  })
}

export function getBrand() {
  return http({
    url: '/Choice/choice'
  })
}