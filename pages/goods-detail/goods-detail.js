import { getGoodsDetail, getGoodsAttrs, getGoodsPrice } from '../../api/goods-detail'

const REALITY_PRICE = 'realityPrice'  // 真实价格
const SELECTED = 'selected'  // 已选属性字符串

// const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    show: false,
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
    const { itemid } = options
    this.getDetail(itemid).then(() => {
      this.getAttrs()
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
  }
})