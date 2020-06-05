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

export function getGoods(type) {
  return http({
    url: '/mall/Arrondi/arronDi',
    data: {
      type
    }
  })
}