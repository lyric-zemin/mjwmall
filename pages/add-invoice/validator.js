import WeValidator from 'we-validator'

export const validator1 = new WeValidator({
  rules: {
    title: {
      required: true
    },
    identification: {
      required: true,
      number: true
    },
    register_address: {
      required: true
    },
    register_phone: {
      required: true,
      tel: true
    },
    bank: {
      required: true
    },
    bank_account: {
      required: true,
      number: true
    }
  },
  messages: {
    title: {
      required: '发票抬头不可为空'
    },
    identification: {
      required: '纳税人识别号不可为空',
      number: '纳税人识别号格式不正确'
    },
    register_address: {
      required: '注册地址不可为空'
    },
    register_phone: {
      required: '注册电话不可为空',
      tel: '注册电话格式不正确'
    },
    bank: {
      required: '开户银行不可为空'
    },
    bank_account: {
      required: '银行账号不可为空',
      number: '银行账号格式不正确'
    }
  }
})

export const validator2 = new WeValidator({
  rules: {
    title: {
      required: true
    },
    identification: {
      required: true,
      number: true
    }
  },
  messages: {
    title: {
      required: '发票抬头不可为空'
    },
    identification: {
      required: '纳税人识别号不可为空',
      number: '纳税人识别号格式不正确'
    }
  }
})

export const validator3 = new WeValidator({
  rules: {
    truename: {
      required: true
    }
  },
  messages: {
    truename: {
      required: '姓名不可为空'
    }
  }
})