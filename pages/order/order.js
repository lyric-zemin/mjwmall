import { getOrderList, setOrderStatus, payNow } from '../../api/my'
import { toastMess, loading, unLoading, toastFail } from '../../utils/helper'

const orderStatus = {
  all: {
    title: '全部订单',
    index: -1
  },
  waitPay: {
    title: '待付款',
    index: 1
  },
  waitDelivery: {
    title: '待发货',
    index: 2
  },
  waitReceipt: {
    title: '待收货',
    index: 3
  },
  finish: {
    title: '已完成',
    index: 4
  }
}

const DEFAULT_STATUS = 'all'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus,
    currentStatus: DEFAULT_STATUS,
    orderList: {},
    /**
     * 1 待付款
     * 2 待发货
     * 3 已发货
     * 4 交易成功
     */
    status: ['待确认', '待付款', '待发货', '已发货', '交易成功', '申请退款', '已退款', '货到付款', '买家关闭', '卖家关闭']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { status } = options

    if (status) {
      this.setData({
        currentStatus: status
      })
      this.updateOrderList()
    } else {
      this.updateOrderList()
    }
  },

  /**
   * 监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.data.orderStatus[this.data.currentStatus].page = 1
    await this.updateOrderList()
    wx.stopPullDownRefresh()
  },

  async onReachBottom() {
    loading()
    // 分页
    let page = this.data.orderStatus[this.data.currentStatus].page || 1
    const total = this.data.orderStatus[this.data.currentStatus].total
    if (total && total > this.data.orderList[this.data.currentStatus].length) {
      this.data.orderStatus[this.data.currentStatus].page = ++page
    } else {
      toastMess('没有更多了')
      return
    }
    let ret = await this.getOrderList(page)
    ret = this.data.orderList[this.data.currentStatus].concat(ret)
    this.setData({
      [`orderList.${this.data.currentStatus}`]: ret
    }, () => unLoading())
  },

  changeStatus(e) {
    const { name } = e.detail
    this.data.currentStatus = name

    if (this.data.orderList[name]) {
      return
    }

    this.updateOrderList()
  },

  updateOrderList() {
    return this.getOrderList().then(res => {
      this.data.orderList[this.data.currentStatus] = res
      this.setData({
        orderList: this.data.orderList
      })
    })
  },

  getOrderList(page = 1) {
    const status = orderStatus[this.data.currentStatus].index

    return getOrderList(status, page).then(res => {
      this.data.orderStatus[this.data.currentStatus].total = res.data.total
      return res.data.data
    })
  },

  /**
   * 确认收货
   */
  confirmReceipt(e) {
    const { itemid } = e.currentTarget.dataset
    setOrderStatus({
      itemid,
      status: 4,
      note: '确认收货'
    }).then(res => {
      if (res.code === 200) {
        toastMess('确认收货成功！')
        this.updateOrderList()
      } else {
        toastMess('失败了，再试试吧！')
      }
    })
  },

  /**
   * 立即付款
   */
  payNow(e) {
    loading('正在拉取结算页')
    const { itemid } = e.currentTarget.dataset
    payNow(itemid).then(res => {
      console.log('结算返回数据', res)
      if (res.code === 200) {
        wx.requestPayment({
          ...res.data,
          success: res => {
            console.log('成功', res)
            unLoading()
            this.updateOrderList()
          },
          fail: err => {
            console.log('失败', err)
            toastMess('支付被取消')
            this.updateOrderList()
          }
        })
      } else {
        toastFail()
      }
    })
  }
})