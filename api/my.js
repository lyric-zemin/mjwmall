import http from './http'

// 用户信息
export function getUserInfo() {
  return http({
    url: '/member/member/getMemberInfo'
  })
}

// 关于我们
export function getAboutUs() {
  return http({
    url: '/common/Webpage/detail?itemid=1'
  })
}

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

/**
 * 
 * 足迹类
 */
export function getHistory(page = 1) {
  return http({
    url: '/mall/mallview/getList',
    data: {
      page
    }
  })
}

export function delHistory(ids) {
  return http({
    url: '/mall/mallview/delete',
    method: 'POST',
    data: {
      ids
    }
  })
}

/**
 * 发票类
 */
export function getInvoice(data) {
  return http({
    url: '/invoice/Invoice/getInvoice',
    data
  })
}

export function delInvoice(itemid) {
  return http({
    url: '/invoice/Invoice/deleteInvoice',
    data: {
      itemid
    }
  })
}

export function addInvoice(data) {
  return http({
    url: '/invoice/Invoice/addInvoice',
    method: 'POST',
    data
  })
}

export function getEditInvoice(itemid) {
  return http({
    url: '/invoice/Invoice/singleInvoice',
    data: {
      itemid
    }
  })
}