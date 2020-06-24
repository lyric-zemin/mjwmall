import { getShoppingGoods, delShoppingGoods, changeShoppingGoodsNum } from '../../api/shopping'
import * as Tips from '../../utils/helper'

let allShoppingList = [], checkGoodsList = []

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
  },

  onShow() {
    this.onLoad()
  },

  getData() {
    getShoppingGoods().then(res => {
      this.setData({
        shoppingList: res.data.carts
      })
      this.updataAllShoppingList()
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
    this.Observe()
  },

  // 公司切换选择
  toggleCompanySelect(e) {
    const { detail } = e
    const { index, key } = e.currentTarget.dataset

    if (detail) {
      this.data.shoppingList[index].forEach(item => {
        this.data.checkList[item.key_no] = true
      })
    } else {
      this.data.shoppingList[index].forEach(item => {
        delete this.data.checkList[item.key_no]
      })
    }
    this.data.checkCompanyList[key] = detail
    this.setComponentSelect(detail, index)
    this.setData({
      checkCompanyList: this.data.checkCompanyList
    }, this.Observe)
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
      checkAll: detail
    }, this.Observe)
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

  // 删除购物车产品
  delItem(e) {
    const { companyindex, index } = e.currentTarget.dataset
    const { itemid } = e.detail
    delShoppingGoods(itemid).then(res => {
      if (res.code === 200) {
        // 如果是选中的也要删除
        if (this.data.checkList[itemid]) {
          delete this.data.checkList[itemid]
        }
        // 公司产品长度为一的直接删除这个数组
        if (this.data.shoppingList[companyindex].length === 1) {
          delete this.data.checkCompanyList[this.data.shoppingList[companyindex][0].username]
          this.data.shoppingList.splice(companyindex, 1)
        } else {
          this.data.shoppingList[companyindex].splice(index, 1)
        }
        this.updataAllShoppingList()
        this.setData({
          shoppingList: this.data.shoppingList
        }, this.Observe)
        Tips.toastMess(`删除成功`)
      } else {
        Tips.toastFail()
      }
    })
  },

  // 修改商品数量
  numChange(e) {
    const { companyindex, index } = e.currentTarget.dataset
    const { itemid, num } = e.detail
    changeShoppingGoodsNum(itemid, num).then(res => {
      if (res.code === 200) {
        this.setData({
          [`shoppingList[${companyindex}][${index}].goods_number`]: num
        }, () => {
          if (this.data.checkList[itemid]) {
            this.Observe()
          }
        })
        // Tips.toastMess('修改成功')
      } else {
        Tips.toastFail()
      }
    })
  },

  // 结算
  settlement() {

  },

  Observe() {
    const newVal = this.data.checkList
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
    if (checkLen !== 0 && allShoppingList.length === checkLen) {
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
        this.data.checkCompanyList[ary[0].username] = true
      } else {
        this.data.checkCompanyList[ary[0].username] = false
      }
    })

    this.setData({
      checkQuantity: checkLen,
      totalPrice: totalPrice * 100,
      checkAll: this.data.checkAll,
      checkCompanyList: this.data.checkCompanyList
    })
  },

  updataAllShoppingList() {
    allShoppingList = []
    for (let i = 0; i < this.data.shoppingList.length; i++) {
      allShoppingList = allShoppingList.concat(this.data.shoppingList[i])
    }
  }
})