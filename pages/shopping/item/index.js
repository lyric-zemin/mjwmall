import { loading, unLoading } from '../../../utils/helper'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBtn: false,
    select: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleBtn() {
      this.setData({
        showBtn: !this.data.showBtn
      })
    },

    toggleSelect() {
      this.triggerEvent('change', { itemid: this.data.item.key_no, value: !this.data.select })
      this.setData({
        select: !this.data.select
      })
    },

    delItem() {
      this.triggerEvent('delete', { itemid: this.data.item.key_no })
    },

    /**
     * 父组件引用方法
     */
    setSelect(val) {
      this.setData({
        select: val
      })
    },

    changeNum({ detail }) {
      this.triggerEvent('count', { itemid: this.data.item.key_no, num: detail })
    }
  }
})
