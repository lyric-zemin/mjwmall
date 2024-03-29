import http from './http'

/**
 * 列表类
 */
export function getGoodsList(filters = {}) {
  return http({
    url: '/mall/SortController/getCommodity',
    data: filters
  })
}

/**
 * 搜索类
 */
export function searchGoodsList(brand, page) {
  return http({
    url: '/Choice/HomeSearch',
    data: {
      brand,
      page
    }
  })
}

/**
 * 详情类
 */
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

export function toggleCollection(itemid) {
  return http({
    url: '/mall/SortController/getStore',
    method: 'POST',
    data: {
      itemid
    }
  })
}

export function addCart(data) {
  return http({
    url: '/cart/Cart/addCart/',
    method: 'POST',
    data
  })
}
