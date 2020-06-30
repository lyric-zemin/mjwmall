import http from './http'

export function getShoppingGoods() {
  return http({
    url: '/cart/cart/getCartList'
  })
}

export function delShoppingGoods(key_no) {
  return http({
    url: '/cart/Cart/deleteCart/',
    method: 'POST',
    data: {
      key_no
    }
  })
}

export function changeShoppingGoodsNum(key_no, num) {
  return http({
    url: '/cart/Cart/deleteShop',
    method: 'POST',
    data: {
      key_no,
      num
    }
  })
}

export function checkout(key_no) {
  return http({
    url: '/mall/order/checkout',
    method: 'POST',
    data: {
      key_no
    }
  })
}