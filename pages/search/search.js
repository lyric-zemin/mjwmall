import { searchGoodsList } from '../../api/goods'
import * as Storage from '../../utils/storage'
import { toastMess, loading, unLoading, toastFail } from '../../utils/helper'

const HISTORY = 'history'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    history: [],
    searchList: [],
    page: 1,
    total: -1,
    showSearch: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const history = Storage.getStorage(HISTORY)
    this.setData({
      history
    })
  },

  getData(q, page = 1) {
    loading()
    searchGoodsList(q, page).then(res => {
      if (res.code === 200) {
        this.data.total = res.data.total
        const searchList = this.data.searchList.concat(res.data.list)
        this.setData({
          searchList,
          showSearch: true
        }, () => unLoading())
      } else {
        toastFail()
      }
    })
  },

  loadMore() {
    if (this.data.searchList.length < this.data.total) {
      const page = ++this.data.page
      this.getData(this.data.value, page)
    } else {
      toastMess('到底了')
    }
  },

  onSearch({ detail }) {
    this.data.page = 1
    this.getData(detail)
    const history = Storage.setStorage(HISTORY, detail)
    this.setData({
      history,
      value: detail
    })
  },

  onCancel() {
    this.setData({
      showSearch: false,
      searchList: []
    })
  },

  chooseTag(e) {
    const { value } = e.currentTarget.dataset
    this.setData({
      value
    }, () => this.onSearch({ detail: value }))
  },

  clearTag() {
    wx.showModal({
      content: '确认清空历史搜索？',
      success: res => {
        if (res.confirm) {
          Storage.clearStorage(HISTORY)
          this.setData({
            history: []
          })
        }
      }
    })
  }
})