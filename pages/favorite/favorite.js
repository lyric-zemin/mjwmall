import { getFavorite, delFavorite } from '../../api/my'
import { toastMess, loading, unLoading } from '../../utils/helper'

const itemType = {
  all: {
    title: '全部'
  },
  hasBuy: {
    title: '已买过'
  }
}

const DEFAULT_TYPE = 'all'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemType: itemType,
    activeItem: DEFAULT_TYPE,
    goodsList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.changeItem({
      detail: {
        name: DEFAULT_TYPE
      }
    })
  },

  getData() {
    return getFavorite(this.data.activeItem).then(res => {
      return res.data.list
    })
  },

  changeItem(e) {
    const { name } = e.detail
    this.data.activeItem = name
    if (this.data.goodsList[name]) {
      return
    }

    this.getData().then(res => {
      this.data.goodsList[name] = res
      this.setData({
        goodsList: this.data.goodsList
      })
    })
  },

  delFavorite(e) {
    const { itemid } = e.target.dataset
    const index = this.data.goodsList[this.data.activeItem].findIndex((item) => item.itemid == itemid)
    delFavorite(itemid).then(res => {
      if (res.code == 200) {
        this.data.goodsList[this.data.activeItem].splice(index, 1)
        this.setData({
          goodsList: this.data.goodsList
        })
      } else {
        toastMess('失败了，再试试吧')
      }
    })
  }
})