
// 自定义全局过滤器
import dict from '@/dict'
import dayjs from 'dayjs'
export default {
  install (Vue) {
    /**
     * @description: 数据字典过滤器
     * @param {*} dictFilter 数据字典过滤器
     * @param {*} function
     * @param {String} dictName 字典名称
     * @param {Boolean} needTransfer 是否转换为整数
     * @return {String} 对应的字典文字
     */
    Vue.filter('dictFilter', function (val, dictName, needTransferInt = false) {
      let value = val
      if (needTransferInt) {
        value = parseInt(val)
      }
      const da = dict.dictData[dictName].find(item => item.value === value)
      if (da && da.text) {
        return da.text
      } else {
        return val
      }
    })
    // 转换为日期时间格式
    Vue.filter('timeFilter', function (val) {
      if (val) {
        const time = dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        if (time) return time
      }
      return val
    })
    // 转换为日期格式
    Vue.filter('dateFilter', function (val) {
      if (val) {
        const time = dayjs(val).format('YYYY-MM-DD')
        if (time) return time
      }
      return val
    })
  }
}
