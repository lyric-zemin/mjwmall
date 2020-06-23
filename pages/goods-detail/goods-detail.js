import { getGoodsDetail, getGoodsAttrs, getGoodsPrice, toggleCollection, addCart } from '../../api/goods'
import { toastMess, loading, unLoading, toastFail } from '../../utils/helper'

const SELECTED = 'selected'  // 已选属性字符串
const REALITY_PRICE = 'realityPrice'  // 真实价格

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    goodsDetail: {},
    attrs: [],
    checkAttr: {},
    num: 1,
    [SELECTED]: '',
    [REALITY_PRICE]: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    loading()
    const { itemid } = options
    this.getDetail(itemid).then(() => {
      this.getAttrs()
      unLoading()
    })
  },

  getDetail(itemid) {
    return getGoodsDetail(itemid).then(res => {
      this.setData({
        goodsDetail: res.data
      })
      wx.setNavigationBarTitle({
        title: this.data.goodsDetail.title
      })
    })
  },

  open() {
    if (!this.data.attrs.length) {
      this.getAttrs()
    }
    this.setData({
      show: true
    })
  },

  close() {
    this.setData({
      show: false
    })
  },

  selectTag(e) {
    const { attr, index } = e.target.dataset
    this.data.checkAttr[index] = attr
    this.setData({
      checkAttr: this.data.checkAttr
    })
    this.setSelected()
    this.getPrice()
  },

  numChange(e) {
    this.setData({
      num: e.detail
    })
  },

  getAttrs() {
    getGoodsAttrs(this.data.goodsDetail.itemid).then(res => {
      const attrs = res.data[0].attr
      // 没有属性的情况下真实价格即默认价格
      if (!attrs) {
        this.setData({
          [REALITY_PRICE]: +this.data.goodsDetail.price
        })
        return
      }

      attrs.forEach((item, index) => {
        this.data.checkAttr[index] = item.char[0]
      })
      this.setData({
        attrs,
        checkAttr: this.data.checkAttr
      })
      this.setSelected()
      this.getPrice()
    })
  },

  getPrice() {
    getGoodsPrice(this.data.goodsDetail.itemid, this.data[SELECTED]).then(res => {
      this.setData({
        [REALITY_PRICE]: +res.data.price1
      })
    })
  },

  /**
   * 设置已选属性
   */
  setSelected() {
    let selected = Object.values(this.data.checkAttr).join('、')
    this.setData({
      [SELECTED]: selected
    })
  },

  /**
   * 切换收藏状态
   */
  toggleCollection() {
    toggleCollection(this.data.goodsDetail.itemid).then(res => {
      if (res.code === 200) {
        if (this.data.goodsDetail.flag === 0) {
          this.data.goodsDetail.flag = 1
          toastMess('收藏成功')
        } else {
          this.data.goodsDetail.flag = 0
          toastMess('取消收藏成功')
        }
        this.setData({
          goodsDetail: this.data.goodsDetail
        })
      }
    })
  },

  /**
   * 加入购物车
   */
  addCart() {
    if (!this.data.show) {
      this.open()
    } else {
      const { goodsDetail: { itemid, price }, num, realityPrice } = this.data
      loading('正在加入购物车...')
      addCart({ itemid, num, attr: this.data.checkAttr }).then(res => {
        console.log('加入购物车返回信息', res)
        if (res.code === 200) {
          toastMess('加入成功')
          this.close()
        } else {
          toastFail()
        }
      })
    }
  }
})