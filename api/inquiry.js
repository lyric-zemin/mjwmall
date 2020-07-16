import http from './http'

export function addInquiry(data) {
  http({
    url: '/inquiry/inquiry/saveInquiry',
    method: 'POST',
    data
  })
}
