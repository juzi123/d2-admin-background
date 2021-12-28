// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 数据字典
import dict from '@/dict'
// 时间插件
import moment from 'moment'

// 核心插件
Vue.use(d2Admin)

Vue.prototype.$moment = moment
Vue.prototype.$dictData = dict.dictData

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
    const time = moment(val).format('YYYY-MM-DD HH:mm:ss')
    if (time) return time
  }
  return val
})
// 转换为日期格式
Vue.filter('dateFilter', function (val) {
  if (val) {
    const time = moment(val).format('YYYY-MM-DD')
    if (time) return time
  }
  return val
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
