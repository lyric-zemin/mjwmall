import { getGoods } from '../../../api/home'

const TYPE = {
  recommend: {
    name: '特别推荐',
    char: 1,
  },
  new: {
    name: '新品专区',
    char: 2
  },
  special: {
    name: '天天特卖',
    char: 3
  },
  used: {
    name: '二手设备',
    char: 4
  },
  selfEmployed: {
    name: '商家自营',
    char: 5
  }
}

const DEFAULT_TYPR = 'recommend'

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
    active: DEFAULT_TYPR,
    dataCache: {}
  },

  lifetimes: {
    created() {
      this.onChange({
        detail: {
          name: DEFAULT_TYPR
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      const { name } = e.detail
      const type = TYPE[name].char
      if (this.data.dataCache[name]) return
      getGoods(type).then(res => {
        this.data.dataCache[name] = res.data
        this.setData({
          dataCache: this.data.dataCache
        })
      })
    }
  }
})
