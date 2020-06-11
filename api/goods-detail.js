import http from './http'

export function getGoodsDetail(itemid) {
  return http({
    url: '/mall/SortController/deTails',
    data: {
      itemid
    }
  })
}

export function getGoodsAttrs(itemid) {
  return http({
    url: '/mall/SortController/Attribute',
    data: {
      itemid
    }
  })
}

export function getGoodsPrice(itemid, attr) {
  return http({
    url: '/mall/SortController/Price',
    data: {
      itemid,
      attr
    }
  })
}