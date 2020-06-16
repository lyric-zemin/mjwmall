export function toastMess(title) {
  wx.showToast({
    title,
    icon: 'none',
    duration: 1500
  })
}