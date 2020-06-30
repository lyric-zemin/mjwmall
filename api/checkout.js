import http from './http'

export function getCheckoutGoods(data) {
  return http({
    url: '/mall/order/checkout',
    method: 'POST',
    data
  })
}

export function getDefaultAddress() {
  return http({
    url: '/member/address/getDefaultAddress'
  })
}

export function submitOrder(data) {
  return http({
    url: '/mall/order/done',
    method: 'POST',
    data
  })
}