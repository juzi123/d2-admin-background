/*
 * @Author: bujunjie
 * @Date: 2021-12-31 10:18:07
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-31 10:20:20
 * @Description:
 */

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj (obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) &&
      (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}
