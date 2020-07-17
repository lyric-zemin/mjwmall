import { addCommission } from '../../api/commission'
import { API_BASE_URL } from '../../config'
import { state } from '../../utils/store'
import { loading, unLoading, toastFail, toastSuccess } from '../../utils/helper'
import validator from './validator'

const UPLOAD_URL = API_BASE_URL + '/inquiry/inquiry/upload_img'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    commitData: {
      agreement: true
    },
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onChange(e) {
    const { name } = e.currentTarget.dataset
    let { detail } = e

    if (name == 'content') {
      detail = detail.value
    }
    if (name == 'agreement') {
      this.setData({
        [`commitData.${name}`]: detail
      })
      return
    }

    this.data.commitData[name] = detail
  },

  afterRead(e) {
    const { file } = e.detail
    this.uploadImg(file.path).then(res => {
      file.id = res
      this.data.fileList.push(file)
      this.setData({
        fileList: this.data.fileList
      })
    }).catch(() => toastFail())
  },

  delete(e) {
    const { index } = e.detail
    this.data.fileList.splice(index, 1)
    this.setData({
      fileList: this.data.fileList
    })
  },

  uploadImg(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: UPLOAD_URL,
        filePath,
        header: { Authorization: 'Bearer ' + state.token },
        name: 'file',
        success: res => {
          const data = JSON.parse(res.data)
          console.log('上传文件结果', data)
          if (data.code === 200) {
            resolve(data.data)
          } else {
            reject(data)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  submit() {
    const { commitData, fileList } = this.data
    const thumb = []
    if (fileList.length) {
      fileList.forEach(item => {
        thumb.push(item.id)
      })
    }
    commitData.attach_id = thumb

    if (!validator.checkData(commitData)) return
    loading('提交中...')
    addCommission(commitData).then(res => {
      if (res.code === 200) {
        this.setData({
          fileList: [],
          commitData: { agreement: true }
        }, () => toastSuccess())
      } else {
        toastFail()
      }
    })
  },

  open() {
    this.setData({
      show: true
    })
  },

  close() {
    this.setData({
      show: false
    })
  }
})