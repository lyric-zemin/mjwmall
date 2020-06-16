import { getGoodsList } from '../../api/goods-list'
import { toastMess } from '../../utils/helper'

const SORT = {
  synthesis: {
    name: '综合',
    char: 1
  },
  sales: {
    name: '销量',
    char: 2
  },
  price: {
    name: '价格',
    char: 3
  }
}

const TYPE = {
  new: {
    name: '新品上市',
    char: 2
  },
  spot: {
    name: '现货',
    char: 6
  },
  used: {
    name: '二手设备',
    char: 4
  },
  selfEmployed: {
    name: '自营',
    char: 5
  }
}

const DEFAULT_SORT = 'synthesis'
const DEFAULT_TYPE = 'new'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: SORT,
    type: TYPE,
    list: [],
    filters: {},
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { catid } = options
    this.data.filters.catid = catid
    this.data.filters.sort = SORT[DEFAULT_SORT].char
    this.data.filters.type = TYPE[DEFAULT_TYPE].char

    this.setData({
      filters: this.data.filters
    })
    this.getList()
  },

  getList() {
    getGoodsList(this.data.filters).then(res => {
      this.setData({
        list: res.data
      })
    })
  },

  open() {
    toastMess('功能开发中...')
    // this.setData({
    //   show: true
    // })
  },

  close() {
    this.setData({
      show: false
    })
  },

  toggleSort(e) {
    const { index, value } = e.currentTarget.dataset
    console.log(index, value)
    if (this.data.filters.sort == value) {
      this.data.sort[index].char = -value
      this.data.filters.sort = -value
    } else {
      this.data.sort[index].char = value
      this.data.filters.sort = value
    }

    this.setData({
      sort: this.data.sort,
      filters: this.data.filters
    })
    this.getList()
  },

  toggleType(e) {
    const { value } = e.target.dataset
    this.data.filters.type = value

    this.setData({
      filters: this.data.filters
    })
    this.getList()
  }
})