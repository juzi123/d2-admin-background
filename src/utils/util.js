/*
 * @Author: bujunjie
 * @Date: 2021-12-31 10:18:07
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-04 21:54:59
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

/**
 * @description: 直接更新原对象中有的值，不改变对象的key
 * @param {Object} oldObj 原对象
 * @param {Object} newObj 新对象
 */
export function updateObjVal (oldObj, newObj) {
  if (typeof oldObj !== 'object' || typeof newObj !== 'object') {
    return
  }
  for (const key of Object.keys(oldObj)) {
    if (newObj[key] !== undefined) {
      oldObj[key] = newObj[key]
    }
  }
}
