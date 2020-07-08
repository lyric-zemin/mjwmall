Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  externalClasses: ['wrap-class'],

  /**
   * 组件的初始数据
   */
  data: {
    grids: [
      {
        img: './image/spot.svg',
        text: '现货中心',
        url: '/pages/goods-list/goods-list?type=6'
      },
      {
        img: './image/product.svg',
        text: '产品中心',
        url: '/pages/goods-list/goods-list'
      },
      {
        img: './image/enterprise.svg',
        text: '品牌企业'
      },
      {
        img: './image/inquiry.svg',
        text: '发布询价'
      },
      {
        img: './image/goods.svg',
        text: '委托找货'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})