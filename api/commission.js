import http from './http'

export function addCommission(data) {
  return http({
    url: '/entrust/Entrust/entrust',
    method: 'POST',
    data
  })
}
