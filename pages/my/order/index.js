// pages/my/order/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    order: [
      {
        img: './image/all.png',
        text: '全部订单',
        type: 'all'
      },
      {
        img: './image/payment.png',
        text: '待付款',
        type: 'waitPay'
      },
      {
        img: './image/receipt.png',
        text: '待发货',
        type: 'waitDelivery'
      },
      {
        img: './image/delivery.png',
        text: '待收货',
        type: 'waitReceipt'
      },
      // {
      //   img: './image/afterSale.png',
      //   text: '退款/售后',
      //   type: 'afterSale'
      // }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
