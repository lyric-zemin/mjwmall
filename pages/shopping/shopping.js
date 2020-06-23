import { getShoppingGoods, delShoppingGoods } from '../../api/shopping'
import * as Tips from '../../utils/helper'

let obj = {}, allShoppingList = [], checkGoodsList = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingList: [],
    checkCompanyList: {},
    checkList: {},
    checkAll: false,
    checkQuantity: 0,
    totalPrice: 0  //精确到小数点后两位数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    Tips.loading()
    this.getData()
    // 监听checkList变化
    Object.defineProperty(this.data, 'checkList', {
      get: function() {
        return obj
      },
      set: (val) => {
        obj = val
        this.Observe(val)
      }
    })
  },

  onShow() {
    Tips.loading()
    this.getData()
  },

  getData() {
    getShoppingGoods().then(res => {
      this.setData({
        shoppingList: res.data.carts
      })
      allShoppingList = []
      for (let i = 0; i < this.data.shoppingList.length; i++) {
        allShoppingList = allShoppingList.concat(this.data.shoppingList[i])
      }
      Tips.unLoading()
    })
  },

  // 商品切换选择
  toggleSelect({ detail }) {
    const { itemid, value } = detail
    if (value) {
      this.data.checkList[itemid] = true
    } else {
      delete this.data.checkList[itemid]
    }
    this.setData({
      checkList: this.data.checkList
    })
  },

  // 公司切换选择
  toggleCompanySelect(e) {
    const { detail } = e
    const { index } = e.currentTarget.dataset

    if (detail) {
      this.data.shoppingList[index].forEach(item => {
        this.data.checkList[item.key_no] = true
      })
    } else {
      this.data.shoppingList[index].forEach(item => {
        delete this.data.checkList[item.key_no]
      })
    }
    this.data.checkCompanyList[index] = detail
    this.setComponentSelect(detail, index)
    this.setData({
      checkCompanyList: this.data.checkCompanyList,
      checkList: this.data.checkList
    })
  },

  // 全选切换选择
  toggleAllSelect({ detail }) {
    if (detail) {
      this.data.shoppingList.forEach(ary => {
        ary.forEach(item => {
          this.data.checkList[item.key_no] = true
        })
      })
    } else {
      this.data.checkList = {}
    }
    this.setComponentSelect(detail)
    this.setData({
      checkAll: detail,
      checkList: this.data.checkList
    })
  },

  // 操作子组件切换
  setComponentSelect(val, index) {
    if (index !== undefined) {
      const itemAry = this.selectAllComponents(`.item${index}`)
      itemAry.forEach(item => item.setSelect(val))
    } else {
      for (let i = 0; i < this.data.shoppingList.length; i++) {
        const itemAry = this.selectAllComponents(`.item${i}`)
        itemAry.forEach(item => item.setSelect(val))
      }
    }
  },

  delItem(e) {
    const { companyindex, index } = e.currentTarget.dataset
    const { itemid } = e.detail
    delShoppingGoods(itemid).then(res => {
      if (res.code === 200) {
        if (this.data.checkList[itemid]) {
          delete this.data.checkList[itemid]
        }
        this.data.shoppingList[companyindex].splice(index, 1)
        this.setData({
          shoppingList: this.data.shoppingList,
          checkList: this.data.checkList
        })
        Tips.toastMess(`删除成功`)
      } else {
        Tips.toastFail()
      }
    })
  },

  numChange(e) {
    const { companyindex, index } = e.currentTarget.dataset
    const { itemid, num } = e.detail
    this.data.shoppingList[companyindex][index].goods_number = num
    this.setData({
      shoppingList: this.data.shoppingList
    })
    if (this.data.checkList[itemid]) {
      this.Observe(this.data.checkList)
    }
  },

  settlement() {

  },

  Observe(newVal) {
    // 生成选中的产品列表
    checkGoodsList = []
    for (let d in newVal) {
      for (let e = 0; e < allShoppingList.length; e++) {
        if (allShoppingList[e].key_no == d) {
          checkGoodsList.push(allShoppingList[e])
        }
      }
    }

    // 计算最终价格
    let totalPrice = 0
    if (checkGoodsList.length) {
      checkGoodsList.forEach(item => {
        totalPrice += (item.goods_price * item.goods_number)
      })
    }

    const { shoppingList } = this.data
    const checkLen = Object.keys(newVal).length

    // 响应是否全选
    if (allShoppingList.length === checkLen) {
      this.data.checkAll = true
    } else {
      this.data.checkAll = false
    }

    // 响应公司下产品全选
    shoppingList.forEach((ary, index) => {
      const isAll = ary.every(a => {
        for (let b in newVal) {
          if (b == a.key_no) {
            return true
          }
        }
        return false
      })

      if (isAll) {
        this.data.checkCompanyList[index] = true
      } else {
        this.data.checkCompanyList[index] = false
      }
    })
    console.log(totalPrice)
    this.setData({
      checkQuantity: checkLen,
      totalPrice: totalPrice * 100
    })

    this.setData({
      checkAll: this.data.checkAll
    })

    this.setData({
      checkCompanyList: this.data.checkCompanyList
    })
  }
})