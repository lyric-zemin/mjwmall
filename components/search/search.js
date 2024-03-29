Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: true
    }
  },

  externalClasses: ['custom-class'],

  /**
   * 组件的初始数据
   */
  data: {
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      const { value } = e.detail
      this.data.value = value
    },
    onClick(e) {
      // this.triggerEvent('search', this.data)
      wx.navigateTo({
        url: '/pages/search/search'
      })
    }
  }
})