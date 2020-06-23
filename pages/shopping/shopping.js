import { getShoppingGoods } from '../../api/shopping'
import * as Tips from '../../utils/helper'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkAll: false,
    checkQuantity: 1,
    totalPrice: 0,  //精确到小数点后两位数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(this)
  },

  toggleAllSelect() {
    this.setData({
      checkAll: !this.data.checkAll
    })
  },

  settlement() {

  },

  loadMore() {

  },


})