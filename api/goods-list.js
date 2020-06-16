import http from './http'

export function getGoodsList(filters = {}) {
  return http({
    url: '/mall/SortController/getCommodity',
    data: filters
  })
}
