import { FAILURE_MESS } from '../config'

export function toastMess(title) {
  wx.showToast({
    title,
    icon: 'none',
    duration: 1500
  })
}

export function toastSuccess(title = '提交成功') {
  wx.showToast({
    title,
    duration: 1000
  })
}

export function toastFail(title = FAILURE_MESS) {
  wx.showToast({
    title,
    icon: 'none',
    duration: 1000
  })
}

export function loading(title = '加载中...') {
  wx.showLoading({
    title,
    mask: true
  })
}

export function unLoading() {
  wx.hideLoading()
}

export function goGoodsDetail(e) {
  const { itemid } = e.currentTarget.dataset
  wx.navigateTo({
    url: `/pages/goods-detail/goods-detail?itemid=${itemid}`
  })
}