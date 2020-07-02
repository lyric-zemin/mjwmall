import { addInvoice, getEditInvoice } from '../../api/my'
import { loading, unLoading, toastFail, toastMess } from '../../utils/helper'
import { validator1, validator2, validator3 } from './validator'

/**
 * 1: 增值税发票
 * 2: 普通发票
 */
const DEFAULT_INVOICE_TYPE = 1
/**
 * 1: 企业
 * 2: 个人
 */
const DEFAULT_PERSON_TYPE = 1
// 发票数据结构
const invoiceObj1 = {
  title: '发票抬头',
  identification: '纳税人识别号',
  register_address: '注册地址',
  register_phone: '注册电话',
  bank: '开户银行',
  bank_account: '银行账号'
}

const invoiceObj2 = {
  title: '发票抬头',
  identification: '纳税人识别号'
}

const invoiceObj3 = {
  truename: '姓名'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceInfo: {},
    invoiceType: DEFAULT_INVOICE_TYPE, // invoice_type
    personType: DEFAULT_PERSON_TYPE    // itype
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    if (id) {
      loading()
      getEditInvoice(id).then(res => {
        if (res.code === 200) {
          const { data } = res
          this.setData({
            invoiceInfo: data,
            invoiceType: data.invoice_type,
            personType: data.itype
          }, () => unLoading())
        } else {
          toastMess(`获取发票信息失败了`)
        }
      })
    }
  },

  changeType(e) {
    const { value } = e.currentTarget.dataset
    this.setData({
      invoiceType: value
    })
  },

  changePerson(e) {
    const { value } = e.currentTarget.dataset
    this.setData({
      personType: value
    })
  },

  onChange(e) {
    const { detail } = e
    const { name } = e.currentTarget.dataset
    this.setData({
      [`invoiceInfo.${name}`]: detail
    })
  },

  saveInvoice() {
    loading(`保存中...`)
    const invoiceInfo = { ...this.data.invoiceInfo }
    // 最终提交的发票信息
    let saveObj = {}
    if (invoiceInfo.itemid) {
      saveObj.itemid = invoiceInfo.itemid
    }
    // 增值税发票
    if (this.data.invoiceType == 1) {
      if (!validator1.checkData(invoiceInfo)) return
      for (let i of Object.keys(invoiceObj1)) {
        saveObj[i] = invoiceInfo[i]
      }

      saveObj.invoice_type = 1
      this.addInvoice(saveObj)
    }
    // 企业普通发票
    if (this.data.invoiceType == 2 && this.data.personType == 1) {
      if (!validator2.checkData(invoiceInfo)) return
      for (let i of Object.keys(invoiceObj2)) {
        saveObj[i] = invoiceInfo[i]
      }

      saveObj.invoice_type = 2
      saveObj.itype = 1
      this.addInvoice(saveObj)
    }
    // 个人普通发票
    if (this.data.invoiceType == 2 && this.data.personType == 2) {
      if (!validator3.checkData(invoiceInfo)) return
      for (let i of Object.keys(invoiceObj3)) {
        saveObj[i] = invoiceInfo[i]
      }

      saveObj.invoice_type = 2
      saveObj.itype = 2
      this.addInvoice(saveObj)
    }
  },

  addInvoice(data) {
    addInvoice(data).then(res => {
      if (res.code === 200) {
        toastMess(`保存成功`)
        this.setData({
          invoiceInfo: {}
        })
      } else {
        toastFail()
      }
    })
  }
})