import http from './http'

export function getClassify() {
  return http({
    url: '/mall/SortController/Superset'
  })
}

export function getRecommend(catid) {
  return http({
    url: '/mall/SortController/getRecommend',
    data: {
      catid
    }
  })
}