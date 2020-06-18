import http from './http'

export function getFavorite(type) {
  return http({
    url: '/member/collection/getCollectionList',
    data: {
      type
    }
  })
}

export function delFavorite(itemid) {
  return http({
    url: '/member/collection/delete',
    data: {
      itemid
    },
    method: 'POST'
  })
}

export function getOrderList(status) {
  return http({
    url: '/mall/order/getOrderList',
    data: {
      status
    }
  })
}

export function getAddress() {
  return http({
    url: '/member/address/getAddressList'
  })
}

export function addAddress(data) {
  return http({
    url: '/member/address/storeAddress',
    method: 'POST',
    data: data
  })
}