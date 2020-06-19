import http from './http'

/**
 * 
 * 收藏类
 */
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

/**
 * 
 * 地址类
 */
export function getAddress() {
  return http({
    url: '/member/address/getAddressList'
  })
}

export function addAddress(data) {
  return http({
    url: '/member/address/storeAddress',
    method: 'POST',
    data
  })
}

export function delAddress(itemid) {
  return http({
    url: '/member/address/delete',
    method: 'POST',
    data: {
      itemid
    }
  })
}

export function getEditAddress(itemid) {
  return http({
    url: '/member/address/editAddress',
    data: {
      itemid
    }
  })
}

export function getRegion(pid) {
  return http({
    url: '/common/region/getList',
    data: {
      pid
    }
  })
}

/**
 * 
 * 订单类
 */
export function getOrderList(status) {
  return http({
    url: '/mall/order/getOrderList',
    data: {
      status
    }
  })
}

export function setOrderStatus(data) {
  return http({
    url: '/mall/order/setOrderStatus',
    method: 'POST',
    data
  })
}