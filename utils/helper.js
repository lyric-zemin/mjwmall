export function toastMess(title) {
  wx.showToast({
    title,
    icon: 'none',
    duration: 1500
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