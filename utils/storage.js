export function setStorage(key, val, maxLen = 10) {
  const storage = getStorage(key) || []

  if (!(storage instanceof Array)) return
  if (storage.length >= maxLen) {
    storage.pop()
  }
  storage.unshift(val)

  wx.setStorageSync(key, storage)
}

export function getStorage(key) {
  return wx.getStorageSync(key)
}

export function clearStorage(key) {
  wx.removeStorageSync(key)
}
