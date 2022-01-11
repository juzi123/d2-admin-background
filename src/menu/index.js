import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  // { path: '/index', title: '首页', icon: 'home' },
  // { path: '/fundCommited', title: '拨款申请', icon: 'list-alt' },
  // { path: '/fundApprove', title: '拨款审批', icon: 'pencil-square-o' }
])

export const menuAside = supplementPath([
  { id: 'index', path: '/index', title: '首页', icon: 'home' },
  { id: 'fundCommited', path: '/fundCommited', title: '拨款申请', icon: 'list-alt' },
  { id: 'fundApprove', path: '/fundApprove', title: '拨款审批', icon: 'pencil-square-o' },
  { id: 'userList', path: '/userList', title: '用户管理', icon: 'user-o' }
  // {
  //   title: '页面',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '页面 1' },
  //     { path: '/page2', title: '页面 2' },
  //     { path: '/page3', title: '页面 3' }
  //   ]
  // }
])
