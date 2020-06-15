import http from './http'

export function getGoodsList(filters = {}) {
  return http({
    url: '',
    data: filters,
    header: {
      Authorization: 11111
    }
  })
}
