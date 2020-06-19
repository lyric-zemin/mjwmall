import { addAddress, getRegion, getEditAddress, delAddress } from '../../api/my'
import { toastMess } from '../../utils/helper'

const addressAttribute = ['truename', 'mobile', 'regionId', 'address', 'is_default']
const addressName = { truename: '联系人', mobile: '手机号', regionId: '省份', address: '地址' }
const DEFAULT_ADDRESS = { is_default: 0 }

function normarlize(arr) {
  return arr.map(item => ({ text: item.region_name, id: item.region_id }))
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: DEFAULT_ADDRESS,
    region: [
      {
        values: [{ text: '省份1', id: 1 }, { text: '省份2', id: 2 }],
        className: 'pid',
        defaultIndex: 0
      },
      {
        values: [{ text: '城市1', id: 10 }, { text: '城市2', id: 20 }],
        className: 'cid',
        defaultIndex: 0
      },
      {
        values: [{ text: '地区1', id: 100 }, { text: '地区2', id: 200 }],
        className: 'cid',
        defaultIndex: 0
      }
    ],
    show: false,
    regionName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { itemid } = options
    let pid, cid, did, pidIndex, cidIndex, didIndex

    pid = await this.getRegion().then(pidRes => {
      return normarlize(pidRes)
    })

    if (itemid) {
      const ret = await this.getEditAddress(itemid)
      ret.addressData.itemid = itemid

      pidIndex = pid.findIndex(item => item.id == ret.pid)

      cid = await this.getRegion(ret.pid).then(cidRes => {
        return normarlize(cidRes)
      })
      cidIndex = cid.findIndex(item => item.id == ret.cid)

      did = await this.getRegion(ret.cid).then(didRes => {
        return normarlize(didRes)
      })
      didIndex = did.findIndex(item => item.id == ret.did)

      this.setData({
        addressData: ret.addressData,
        regionName: ret.regionName
      })
    } else {
      // 加载默认省市区信息
      cid = await this.getRegion(pid[0].id).then(cidRes => {
        return normarlize(cidRes)
      })
      did = await this.getRegion(cid[0].id).then(didRes => {
        return normarlize(didRes)
      })
    }

    this.data.region[0].values = pid
    this.data.region[1].values = cid
    this.data.region[2].values = did

    this.setData({
      region: this.data.region
    })

    // 延迟设置defaultIndex，否则会无效
    setTimeout(() => {
      this.data.region[0].defaultIndex = pidIndex
      this.data.region[1].defaultIndex = cidIndex
      this.data.region[2].defaultIndex = didIndex
      this.setData({
        region: this.data.region
      })
    }, 50)
  },

  onChange(e) {
    const { name } = e.currentTarget.dataset
    const { detail } = e
    if (name === 'is_default') {
      if (detail) {
        this.data.addressData['is_default'] = 1
      } else {
        this.data.addressData['is_default'] = 0
      }
    } else {
      this.data.addressData[name] = detail
    }

    this.setData({
      addressData: this.data.addressData
    })
  },

  async pirckerChange(e) {
    const { index, value } = e.detail
    const currentVal = value[index]
    // console.log(index, value, currentVal)
    if (index === 0) {
      const cid = await this.getRegion(currentVal.id).then(cidRes => {
        return normarlize(cidRes)
      })
      const did = await this.getRegion(cid[0].id).then(didRes => {
        return normarlize(didRes)
      })
      this.data.region[1].values = cid
      this.data.region[2].values = did
      this.setData({
        region: this.data.region
      })
    }
    if (index === 1) {
      this.data.region[2].values = await this.getRegion(currentVal.id).then(didRes => {
        return normarlize(didRes)
      })
      this.setData({
        region: this.data.region
      })
    }
  },

  pirckerConfirm(e) {
    const { value } = e.detail
    const regionId = `pid:${value[0].id},cid:${value[1].id},did:${value[2].id}`
    const regionName = `${value[0].text} ${value[1].text} ${value[2].text}`
    this.data.addressData['regionId'] = regionId
    this.setData({
      regionName
    })
    this.closePicker()
  },

  showPicker() {
    this.setData({
      show: true
    })
  },

  closePicker() {
    this.setData({
      show: false
    })
  },

  confirmAddress() {
    const { addressData } = this.data

    for (let item of addressAttribute) {
      if (!addressData[item] && item != 'is_default') {
        toastMess(`${addressName[item]}为空`)
        return
      }
    }

    console.log('提交的地址信息', addressData)
    addAddress(addressData).then(res => {
      if (res.code === 200) {
        toastMess(`保存成功啦！`)
        this.setData({
          addressData: DEFAULT_ADDRESS,
          regionName: ''
        })
      } else {
        toastMess(`失败了，再试试吧！`)
      }
    })
  },

  getRegion(id = 1) {
    return getRegion(id).then(res => {
      return res.data
    })
  },

  getEditAddress(itemid) {
    return getEditAddress(itemid).then(res => {
      const ret = { addressData: {}, regionName: '', pid: -1, cid: -1, did: -1 }, { data } = res
      addressAttribute.forEach(item => ret.addressData[item] = data[item])
      ret.addressData.regionId = `pid:${data.region.province.id},cid:${data.region.city.id},did:${data.region.district.id}`
      ret.regionName = `${data.region.province.name} ${data.region.city.name} ${data.region.district.name}`
      ret.pid = data.region.province.id
      ret.cid = data.region.city.id
      ret.did = data.region.district.id
      return ret
    })
  },

  delAddress() {
    delAddress(this.data.addressData.itemid).then(res => {
      if (res.code === 200) {
        toastMess(`删除成功！`)
        this.setData({
          addressData: DEFAULT_ADDRESS,
          regionName: ''
        })
      } else {
        toastMess(`失败了，再试试吧！`)
      }
    })
  }
})