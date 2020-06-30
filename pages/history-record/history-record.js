import { getHistory, delHistory } from '../../api/my'
import { toastMess, loading, unLoading, goGoodsDetail } from '../../utils/helper'

const MAX_LEN = 30

Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: MAX_LEN,
    total: 0,
    page: 1,
    historyList: [],
    checkList: {},
    showDel: false,
    checkAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },

  onReachBottom() {
    this.getData(true)
  },

  getData(loadMore) {
    loading()
    if (loadMore) {
      if (this.data.historyList.length < this.data.total) {
        this.data.page++
      } else {
        toastMess('没有更多了')
        return
      }
    }
    getHistory(this.data.page).then(res => {
      const list = this.data.historyList.concat(res.data.data)
      this.setData({
        total: res.data.total,
        historyList: list
      })
      unLoading()
    })
  },

  toggleDel() {
    this.setData({
      showDel: !this.data.showDel
    })
  },

  toggleCheck(e) {
    const { id } = e.currentTarget.dataset, { detail } = e
    this.data.checkList[id] = detail

    this.validityAllCheck()
  },

  toggleAll(e) {
    const { detail } = e
    if (detail) {
      this.data.historyList.forEach(item => {
        const id = item.vid
        this.data.checkList[id] = true
      })
    } else {
      this.data.checkList = {}
    }

    this.setData({
      checkAll: detail,
      checkList: this.data.checkList
    })
  },

  // 验证是否全选
  validityAllCheck() {
    const checkList = this.data.checkList
    for (let i in checkList) {
      if (!checkList[i]) {
        delete checkList[i]
      }
    }

    if (Object.keys(checkList).length === this.data.historyList.length) {
      this.data.checkAll = true
    } else {
      this.data.checkAll = false
    }

    this.setData({
      checkList: this.data.checkList,
      checkAll: this.data.checkAll
    })
  },

  delHistory() {
    const delAry = Object.keys(this.data.checkList)
    if (!delAry.length) {
      toastMess('还没选择呢')
    } else {
      delHistory(delAry.join(',')).then(res => {
        if (res.code === 200) {
          this.data.total = this.data.total - delAry.length
          this.data.checkList = {}
          this.data.historyList = this.data.historyList.filter(item => {
            for (let vid of delAry) {
              if (item.vid == vid) {
                return false
              }
            }
            return true
          })
          this.setData({
            total: this.data.total,
            checkList: this.data.checkList,
            historyList: this.data.historyList
          })

          toastMess('删除成功')
        } else {
          toastMess('失败了，再试试吧')
        }
      })
    }
  },

  goGoodsDetail(e) {
    goGoodsDetail(e)
  }
})