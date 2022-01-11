/*
 * @Author: bujunjie
 * @Date: 2022-01-05 15:44:54
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-05 15:51:07
 * @Description: 审批
 */
import { getAction } from '../manage'

export default () => ({
  // 获取审批进度
  getApprovalProgress: (params) => getAction('/api/Application/GetApprovalProgress', params)
})
