import http from './http'

export function addInquiry(data) {
  return http({
    url: '/inquiry/inquiry/saveInquiry',
    method: 'POST',
    data
  })
}
