import { getInvoice, delInvoice } from '../../api/my'
import { loading, unLoading, toastFail, toastMess } from '../../utils/helper'

const INVOICE_TYPE = {
  '1': '增值税发票',
  '2': '普通发票'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceList: [],
    isChoose: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options && options.choose == 1) {
      this.data.isChoose = true
    }
  },

  onShow() {
    this.getData()
  },

  getData() {
    loading()
    getInvoice().then(res => {
      const ary = res.data
      ary.forEach(item => {
        item.typeName = INVOICE_TYPE[item.invoice_type]
      })
      this.setData({
        invoiceList: ary
      }, () => unLoading())
    })
  },

  delInvoice(e) {
    const { id, index } = e.currentTarget.dataset
    delInvoice(id).then(res => {
      if (res.code === 200) {
        this.data.invoiceList.splice(index, 1)
        this.setData({
          invoiceList: this.data.invoiceList
        }, () => toastMess(`删除成功`))
      } else {
        toastFail()
      }
    })
  },

  editInvoice(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/add-invoice/add-invoice?id=${id}`
    })
  },

  addInvoice() {
    wx.navigateTo({
      url: '/pages/add-invoice/add-invoice'
    })
  },

  chooseInvoice(e) {
    if (!this.data.isChoose) {
      return
    }
    const { index } = e.currentTarget.dataset
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', this.data.invoiceList[index])
    wx.navigateBack()
  }
})