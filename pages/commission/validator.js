import WeValidator from 'we-validator'

WeValidator.addRule('isTrue', {
  message: '需先同意协议',
  rule(value) {
    return value === true
  }
})

export default new WeValidator({
  rules: {
    agreement: {
      isTrue: true
    },
    truename: {
      required: true
    },
    company: {
      required: true
    },
    mobile: {
      required: true,
      mobile: true
    },
    attach_id: {
      required: true
    },
    content: {
      required: true
    }
  },
  messages: {
    truename: {
      required: '委托人为空'
    },
    company: {
      required: '公司名称为空'
    },
    mobile: {
      required: '号码为空'
    },
    attach_id: {
      required: '需上传图片'
    },
    content: {
      required: '详情为空'
    }
  }
})
