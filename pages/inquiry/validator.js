import WeValidator from 'we-validator'

export default new WeValidator({
  rules: {
    title: {
      required: true
    },
    brand: {
      required: true
    },
    amount: {
      required: true,
      number: true
    },
    thumb: {
      required: true
    },
    description: {
      required: true
    }
  },
  messages: {
    title: {
      required: '名称不可为空'
    },
    brand: {
      required: '品牌不可为空'
    },
    amount: {
      required: '数量不可为空',
      number: '数量必须为数字'
    },
    thumb: {
      required: '需要上传图片'
    },
    description: {
      required: '描述不可为空'
    }
  }
})
