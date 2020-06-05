import http from './http'

export function getClassify() {
  return http({
    url: '/mall/SortController/Superset'
  })
}