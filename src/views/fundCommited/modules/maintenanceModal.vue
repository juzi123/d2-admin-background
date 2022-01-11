<!--
 * @Author: bujunjie
 * @Date: 2022-01-10 16:31:13
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-10 17:05:42
 * @Description: 维护拨款申请
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" top="40px" @close="close">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="180px" :inline="true">
      <el-form-item label="所属公司:" prop="company" class="one-line">
        <el-radio-group v-model="formData.company" :disabled="disableDialog">
          <el-radio label="慧源公司" border></el-radio>
          <el-radio label="科技公司" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="维护单位:" prop="ownerUnit" class="one-line">
        <el-input v-model="formData.ownerUnit" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="ownerContact" class="half-line">
        <el-input v-model="formData.ownerContact" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="ownerPhone" class="half-line">
        <el-input v-model="formData.ownerPhone" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="本次申请维护金额(万元):" prop="paymentAmount" class="half-line">
        <el-input v-model="formData.paymentAmount" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="备注:" class="one-line">
        <el-input type="textarea" v-model="formData.remark" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="合同:" prop="contract" class="one-line">
        <UploadFile v-model="formData.contract" :disabled="disableDialog"></UploadFile>
      </el-form-item>
      <el-form-item label="计算清单:(需签字)" prop="paymentApprovalForm" class="one-line warp-line">
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
  name: 'maintenanceModal',
  components: {
    UploadFile
  },
  data () {
    return {
      state: 0, // 0 新增 1 修改 2 查看
      title: '维护拨款申请',
      titleList: ['维护拨款申请', '修改维护拨款申请', '查看维护拨款申请'],
      url: {
        add: '/api/Application/InsertMaintenanceApplication',
        edit: '/api/Application/UpdateMaintenanceApplication'
      },
      dialogVisible: false,
      disableDialog: false,
      formData: {},
      // 校验规则
      rules: {
        company: getValidator('required'),
        ownerUnit: getValidator('required'),
        ownerContact: getValidator('required'),
        ownerPhone: getValidator('required'),
        paymentAmount: getValidator('required', 'positiveNumber'),
        contract: setRequired('请上传合同'),
        paymentApprovalForm: setRequired('请上传计算清单')
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
  },
  watch: {
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
        ownerUnit: '',
        ownerContact: '',
        ownerPhone: '',
        paymentAmount: '',
        remark: '',
        contract: null,
        paymentApprovalForm: null,
        receipt: null
      }
    },
    add () {
      this.edit({})
    },
    edit (record) {
      this.init()
      updateObjVal(this.formData, record)
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
