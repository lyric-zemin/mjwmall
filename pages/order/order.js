import { getOrderList } from '../../api/my'

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
      this.changeStatus({
        detail: {
          name: status
        }
      })
    } else {
      this.changeStatus({
        detail: {
          name: this.data.currentStatus
        }
      })
    }
  },

  changeStatus(e) {
    const { name } = e.detail
    this.data.currentStatus = name

    if (this.data.orderList[name]) {
      return
    }

    this.getOrderList().then(res => {
      this.data.orderList[name] = res
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
  }
})