/*
 * @Author: bujunjie
 * @Date: 2021-12-20 14:03:55
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-20 14:20:41
 * @Description: 数据字典
 */
export default {
  dictData: {},
  /**
   * @description: 根据字典值获取对应文字
   * @param {*} val 值
   * @param {*} dictName 字典名称
   * @return {*}
   */
  getDictText (val, dictName) {
    const da = this.dictData[dictName].find(item => item.value === val)
    if (da && da.text) {
      return da.text
    } else {
      return val
    }
  },
  /**
   * @description: 根据字典文字获取对应值
   * @param {*} text 文字
   * @param {*} dictName 字典名称
   * @return {*}
   */
  getDictValue (text, dictName) {
    const da = this.dictData[dictName].find(item => item.text === text)
    if (da && da.value) {
      return da.value
    } else {
      return text
    }
  }
}
