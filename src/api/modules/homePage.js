/*
 * @Author: bujunjie
 * @Date: 2022-01-04 16:00:07
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-05 16:25:52
 * @Description: 首页接口
 */
import { getAction } from '../manage'

export default () => ({
  // 获取本月情况
  getMonthSituation: (params) => getAction('/api/Home/GetMonthSituation', params),
  // 获取本年情况
  getYearSituation: (params) => getAction('/api/Home/GetYearSituation', params),
  // 获取本月支付明细
  getMonthList: (params) => getAction('/api/Home/GetMonthList', params),
  // 获取进行中拨款
  getOnGoingList: (params) => getAction('/api/Home/GetOnGoingList', params)
})
