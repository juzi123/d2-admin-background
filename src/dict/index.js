/*
 * @Author: bujunjie
 * @Date: 2021-12-20 14:03:55
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-10 16:48:30
 * @Description: 数据字典
 */
export default {
  dictData: {
    companyDict: [
      {
        text: '科技公司',
        value: '科技公司'
      },
      {
        text: '慧源公司',
        value: '慧源公司'
      }
    ],
    departmentDict: [
      {
        text: '建设部',
        value: '建设部'
      },
      {
        text: '商务部',
        value: '商务部'
      },
      {
        text: '综合部',
        value: '综合部'
      },
      {
        text: '技术部',
        value: '技术部'
      },
      {
        text: '研发部',
        value: '研发部'
      }
    ],
    userStatus: [
      {
        text: '已启用',
        value: true
      },
      {
        text: '未启用',
        value: false
      }
    ],
    applyType: [
      {
        text: '项目拨款申请',
        value: 1
      },
      {
        text: '器材拨款申请',
        value: 2
      },
      {
        text: '维护拨款申请',
        value: 3
      }
    ],
    // 角色字典
    roleDict: [
      {
        text: '部门职员',
        value: 0
      },
      {
        text: '公司领导',
        value: 1
      },
      {
        text: '平台领导',
        value: 2
      },
      {
        text: '管理员',
        value: 3
      }
    ],
    // 支付类型
    paymentType: [
      {
        text: '签订合同后支付',
        value: 1
      },
      {
        text: '到货支付',
        value: 2
      },
      {
        text: '初验支付',
        value: 3
      },
      {
        text: '终验支付',
        value: 4
      },
      {
        text: '质保到期支付',
        value: 5
      },
      {
        text: '审计支付',
        value: 6
      },
      {
        text: '随进度付款',
        value: 7
      },
      {
        text: '其他',
        value: 8
      }
    ],
    // 审批状态类型
    approveStatusType: [
      {
        text: '待确认',
        value: 0
      },
      {
        text: '公司审批',
        value: 1
      },
      {
        text: '平台审批',
        value: 2
      },
      {
        text: '资料确认',
        value: 3
      },
      {
        text: '审批通过',
        value: 4
      }
    ]
  },
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
