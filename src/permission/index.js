/*
 * @Author: bujunjie
 * @Date: 2022-01-06 09:38:43
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-06 14:09:47
 * @Description: 权限表
 */
import util from '@/libs/util.js'
const permissionMap = {
  部门职员: ['index', 'fundCommited'],
  公司领导: ['index', 'fundCommited', 'fundApprove'],
  平台领导: ['index', 'fundCommited', 'fundApprove'],
  管理员: ['index', 'fundCommited', 'fundApprove', 'userList']
}

export const getPermissionList = () => {
  const role = util.cookies.get('role')
  return permissionMap[role]
}

export const filterByUserRole = (list) => {
  const permissionList = getPermissionList()
  const arr = []
  list.forEach(item => {
    if (item.id) {
      if (permissionList.findIndex(a => a === item.id) !== -1) {
        arr.push(item)
      }
    } else {
      arr.push(item)
    }
  })
  return arr
}
