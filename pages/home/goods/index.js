const TYPE = {
  recommend: {
    name: '特别推荐',
    char: 0,
  },
  new: {
    name: '新品专区',
    char: 1
  },
  special: {
    name: '天天特卖',
    char: 2
  },
  used: {
    name: '二手设备',
    char: 3
  },
  selfEmployed: {
    name: '商家自营',
    char: 4
  }
}

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
    types: TYPE,
    active: 'recommend',
    dataCache: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      const { name } = e.detail
      const type = TYPE[name].char
      if (this.data.dataCache[name]) return
      console.log(name, type)
    }
  }
})
