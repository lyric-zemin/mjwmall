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
    // if (!this.data.attrs.length) {
    //   this.getAttrs()
    // }
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
    const { attr, index, attrindex } = e.target.dataset
    this.data.checkAttr[index] = { text: attr, index: attrindex }
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
        this.data.checkAttr[index] = { text: item.char[0], index: 0 }
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
    let selected = ''
    Object.values(this.data.checkAttr).forEach(item => {
      selected += item.text + '、'
    })
    this.setData({
      [SELECTED]: selected.slice(0, -1)
    })
  },

  /**
   * 切换收藏状态
   */
  toggleCollection() {
    toggleCollection(this.data.goodsDetail.itemid).then(res => {
      if (res.code === 200) {
        // 修复数据不规范的问题
        if (this.data.goodsDetail.collection === null) {
          this.data.goodsDetail.collection = {}
          this.data.goodsDetail.collection.flag = 0
        }
        if (this.data.goodsDetail.collection.flag === 0) {
          this.data.goodsDetail.collection.flag = 1
          toastMess('收藏成功')
        } else {
          this.data.goodsDetail.collection.flag = 0
          toastMess('取消收藏成功')
        }
        this.setData({
          'goodsDetail.collection.flag': this.data.goodsDetail.collection.flag
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
      loading('正在加入购物车...')
      const { goodsDetail: { itemid, price }, num, realityPrice } = this.data
      let attr = ''
      Object.values(this.data.checkAttr).forEach(item => {
        attr += item.index + '_'
      })
      addCart({ itemid, num, attr: attr.slice(0, -1) }).then(res => {
        console.log('加入购物车返回信息', res)
        if (res.code === 200) {
          toastMess('加入成功')
          this.close()
        } else {
          toastFail()
        }
      })
    }
  },

  /**
   * 立即购买
   */
  checkout() {
    if (!this.data.show) {
      this.open()
    } else {
      loading('立即购买中...')
      const { goodsDetail: { itemid }, num } = this.data
      let attr = ''
      Object.values(this.data.checkAttr).forEach(item => {
        attr += item.index + '_'
      })
      wx.navigateTo({
        url: `/pages/checkout/checkout?goods_id=${itemid}&num=${num}&attr=${attr.slice(0, -1)}&buynow=1`
      })
      unLoading()
      this.close()
    }
  }
})