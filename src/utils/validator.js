/*
 * @Author: bujunjie
 * @Date: 2021-12-27 15:49:28
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-28 09:35:14
 * @Description: 校验方法
 */

// 必填
const required = { required: true, message: '请输入对应数据', trigger: 'blur' }
// 正数
const positiveNumber = {
  transform (value) {
    return Number(value)
  },
  validator (rule, value, callback) {
    if (Number.isFinite(value) && value >= 0) {
      callback()
    } else {
      callback(new Error('请输入不小于0的数字'))
    }
  },
  trigger: 'blur'
}
// 整数
const integerNumber = {
  transform (value) {
    return Number(value)
  },
  validator (rule, value, callback) {
    if (Number.isFinite(value) && /^-?[1-9]\d*|0$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入整数'))
    }
  },
  trigger: 'blur'
}
// 正整数
const positiveIntegerNumber = {
  transform (value) {
    return Number(value)
  },
  validator (rule, value, callback) {
    if (Number.isFinite(value) && /^[1-9]\d*|0$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正整数'))
    }
  },
  trigger: 'blur'
}
// 邮箱
const email = { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
// 手机号
const phone = {
  validator: function (rule, value, callback) {
    if (/^1[34578]\d{9}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
    }
  },
  trigger: 'blur'
}
// 年龄
const age = {
  validator: function (rule, value, callback) {
    if (/^[0-9]*$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的数字'))
    }
  },
  trigger: 'blur'
}
const validatorMap = { required, positiveNumber, integerNumber, positiveIntegerNumber, email, phone, age }

/**
 * @description: 必填校验
 * @param { String } msg 显示信息
 * @return { Object }
 */
function setRequired (msg) {
  return { required: true, message: msg, trigger: 'blur' }
}

/**
 * @description: 获取校验规则
 * @param {array} args 校验规则名称
 * @return {array} 校验规则数组
 */
function getValidator (...args) {
  const validators = []
  args.forEach(item => {
    if (validatorMap[item]) {
      validators.push(validatorMap[item])
    } else {
      console.warn(`没有名称为${item}的校验规则`)
    }
  })
  return validators
}

export { getValidator, setRequired, validatorMap }
