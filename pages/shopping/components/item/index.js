// pages/shopping/components/item/index.js
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

    selcetItem() {
      this.setData({
        select: !this.data.select
      })
    }
  }
})
