<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 15:40:26
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-10 17:05:33
 * @Description: 拨款申请表单
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" top="40px" @close="close">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="180px" :inline="true">
      <el-form-item label="项目类型:" prop="isCommercial" class="one-line">
        <el-radio-group v-model="formData.isCommercial" :disabled="disableDialog" @change="isCommercialChange">
          <el-radio :label="true" border>经营性项目</el-radio>
          <el-radio :label="false" border>非经营性项目</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目编号:" prop="projectNo" class="one-line">
        <el-input v-model="formData.projectNo" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="所属公司:" prop="company" class="one-line">
        <el-radio-group v-model="formData.company" :disabled="disableDialog">
          <el-radio label="慧源公司" border></el-radio>
          <el-radio label="科技公司" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目名称:" prop="projectName" class="one-line">
        <el-input v-model="formData.projectName" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="业主单位:" prop="ownerUnit" class="one-line">
        <el-input v-model="formData.ownerUnit" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="ownerContact" class="half-line">
        <el-input v-model="formData.ownerContact" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="ownerPhone" class="half-line">
        <el-input v-model="formData.ownerPhone" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="合同金额(万元):" prop="contractAmount" class="half-line">
        <el-input v-model="formData.contractAmount" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="本次支付比例(%):" prop="paymentPercent" class="half-line">
        <el-input v-model="formData.paymentPercent" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="本次支付金额(万元):" prop="paymentAmount" class="half-line">
        <el-input v-model="formData.paymentAmount" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="付款备注:" class="half-line">
        <el-input v-model="formData.paymentAmountRemark" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="本次支付类型:" prop="paymentType" class="one-line">
        <el-radio-group v-model="formData.paymentType" :disabled="disableDialog" class="radio-margin">
          <el-radio v-for="item in $dictData.paymentType" :key="item.value" :label="item.value" border>{{item.text}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:" class="one-line">
        <el-input type="textarea" v-model="formData.remark" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="合同:" prop="contract" class="one-line">
        <UploadFile v-model="formData.contract" :disabled="disableDialog"></UploadFile>
      </el-form-item>
      <el-form-item label="支付审批单:" prop="paymentApprovalForm" class="one-line">
        <UploadFile v-model="formData.paymentApprovalForm" :disabled="disableDialog"></UploadFile>
      </el-form-item>
      <el-form-item label="发票:" class="one-line">
        <UploadFile v-model="formData.receipt" :disabled="disableDialog"></UploadFile>
      </el-form-item>
    </el-form>
    <el-steps v-if="formData.id" class="step" :active="approvedStage" align-center finish-status="success">
      <el-step v-for="item in flowData" :key="item.progress" :title="item.progress">
        <div slot="description">
          <div>{{ item.approver }}</div>
          <div>{{ item.result }}</div>
          <div>{{ item.approveTime | timeFilter }}</div>
        </div>
      </el-step>
    </el-steps>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="state !== 2" type="primary" @click="handleOk">确 认</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateObjVal } from '@/utils/util'
import { postAction } from '@/api/manage'
import { getValidator, setRequired } from '@/utils/validator'
import UploadFile from '@/components/common/UploadFile.vue'
export default {
  name: 'fundCommitForm',
  components: {
    UploadFile
  },
  data () {
    return {
      state: 0, // 0 新增 1 修改 2 查看
      title: '项目拨款申请',
      titleList: ['项目拨款申请', '修改项目拨款申请', '查看项目拨款申请'],
      url: {
        add: '/api/Application/Insert',
        edit: '/api/Application/Update'
      },
      dialogVisible: false,
      disableDialog: false,
      formData: {},
      // 校验规则
      rules: {
        isCommercial: getValidator('required'),
        projectNo: getValidator('required'),
        company: getValidator('required'),
        projectName: getValidator('required'),
        ownerUnit: getValidator('required'),
        ownerContact: getValidator('required'),
        ownerPhone: getValidator('required'),
        contractAmount: getValidator('required', 'positiveNumber'),
        paymentPercent: getValidator('required', 'positiveNumber'),
        paymentAmount: getValidator('required', 'positiveNumber'),
        paymentType: getValidator('required'),
        contract: setRequired('请上传合同'),
        paymentApprovalForm: setRequired('请上传支付审批单')
      },
      flowData: [],
      approveStageText: '',
      approvedStage: 0
    }
  },
  created () {
    this.init()
  },
  computed: {
    paymentAmount: function () {
      return (this.formData.contractAmount * this.formData.paymentPercent) / 100
    }
  },
  watch: {
    paymentAmount: function (newVal) {
      if (this.state === 0) {
        this.formData.paymentAmount = newVal
      }
    },
    state: function (newVal, oldVal) {
      this.title = this.titleList[newVal]
      if (newVal === 2) {
        this.disableDialog = true
      } else {
        this.disableDialog = false
      }
    }
  },
  methods: {
    // 获取审批流程数据
    getApproveStageData (id) {
      this.$api.getApprovalProgress({ id }).then(res => {
        if (res.statusCode === 200) {
          this.flowData = res.result
        } else {
          this.$message.warning('获取审批流程数据失败')
        }
      })
    },
    init () {
      this.formData = {
        id: '',
        company: '慧源公司',
        projectName: '',
        isCommercial: true,
        projectNo: '',
        ownerUnit: '',
        ownerContact: '',
        ownerPhone: '',
        contractAmount: '',
        paymentPercent: 0,
        paymentAmount: 0,
        paymentAmountRemark: '',
        paymentType: 1,
        remark: '',
        contract: null,
        paymentApprovalForm: null,
        receipt: null
      }
    },
    // 非经营性项目项目编号选填
    isCommercialChange (val) {
      if (val) {
        this.rules.projectNo = getValidator('required')
      } else {
        this.rules.projectNo = {}
      }
    },
    add () {
      this.edit({})
    },
    edit (record) {
      this.init()
      updateObjVal(this.formData, record)
      this.isCommercialChange(this.formData.isCommercial)
      if (record.id) {
        this.approvedStage = record.approvalStatusType
        this.getApproveStageData(record.id)
      }
      this.dialogVisible = true
    },
    handleOk () {
      const formName = 'formData'
      let queryUrl = ''
      if (!this.formData.id) {
        delete this.formData.id
        queryUrl = this.url.add
      } else {
        queryUrl = this.url.edit
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          postAction(queryUrl, this.formData)
            .then(res => {
              if (res.statusCode === 200) {
                this.$message.success(res.message)
                this.$emit('ok')
              } else {
                this.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.confirmLoading = false
              this.close()
            })
        } else {
          return false
        }
      })
    },
    handleCancel () {
      this.close()
    },
    close () {
      const formName = 'formData'
      this.$refs[formName].resetFields()
      this.$emit('close')
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
// 表单样式
@import "~@/assets/style/common/form-class.scss";
.radio-margin {
  .el-radio.is-bordered {
    width: 180px;
    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }
}
</style>
