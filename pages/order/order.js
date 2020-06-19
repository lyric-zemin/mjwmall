import { getOrderList, setOrderStatus } from '../../api/my'
import { toastMess } from '../../utils/helper'

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
    await this.updateOrderList()
    wx.stopPullDownRefresh()
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

  getOrderList() {
    const status = orderStatus[this.data.currentStatus].index

    return getOrderList(status).then(res => {
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
  }
})