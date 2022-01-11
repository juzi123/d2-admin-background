<!--
 * @Author: bujunjie
 * @Date: 2022-01-10 17:16:15
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-11 16:38:56
 * @Description: 器材审批表单
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" top="40px" @close="close">
    <h3 class="sub-title">申请详情:</h3>
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px" :inline="true">
      <el-form-item label="所属公司:" class="one-line">
        <el-radio-group v-model="formData.company" :disabled="true">
          <el-radio label="公司" border></el-radio>
          <el-radio label="科技公司" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="供应商名称:" class="one-line">
        <el-input v-model="formData.ownerUnit" placeholder="请输入内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" class="half-line">
        <el-input v-model="formData.ownerContact" placeholder="请输入内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" class="half-line">
        <el-input v-model="formData.ownerPhone" placeholder="请输入内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="欠款金额(万元):" class="half-line">
        <el-input v-model="formData.contractAmount" placeholder="请输入内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="本次申请金额(万元):" class="half-line">
        <el-input v-model="formData.paymentAmount" placeholder="请输入内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="备注:" class="one-line">
        <el-input type="textarea" v-model="formData.remark" placeholder="请输入内容" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="佐证材料:" class="one-line">
        <UploadFile v-model="formData.contract" :disabled="true"></UploadFile>
      </el-form-item>
      <el-form-item label="发票:" class="one-line">
        <UploadFile v-model="formData.receipt" :disabled="true"></UploadFile>
      </el-form-item>
    </el-form>
    <el-steps class="step" :active="approvedStage" align-center finish-status="success">
      <el-step v-for="item in flowData" :key="item.progress" :title="item.progress">
        <div slot="description">
          <div>{{ item.approver }}</div>
          <div>{{ item.result }}</div>
          <div>{{ item.approveTime | timeFilter }}</div>
        </div>
      </el-step>
    </el-steps>
    <div v-if="!disableDialog">
      <div class="division-line"></div>
      <h3 class="sub-title">{{ approveStageText }}:</h3>
      <el-form ref="approveForm" :model="approveForm" :rules="rules" label-width="180px">
        <el-form-item label="是否同意:" class="one-line">
          <el-radio-group v-model="approveForm.isPass">
            <el-radio :label="true" border>通过</el-radio>
            <el-radio :label="false" border>不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批人:" class="one-line">
          <el-input v-model="info.name" placeholder="请输入内容" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审批意见:" class="one-line">
          <el-input type="textarea" :row="3" v-model="approveForm.opinion" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="state===3" type="primary" @click="handleOk">提 交</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { postAction } from '@/api/manage'
import UploadFile from '@/components/common/UploadFile.vue'
export default {
  name: 'equipmentApproveModal',
  components: {
    UploadFile
  },
  data () {
    return {
      state: 0, // 0 新增 1 修改 2 查看 3 审批
      title: '新建申请',
      titleList: ['新建申请', '修改申请', '查看申请', '拨款审批'],
      url: {
        approve: '/api/Application/Approve'
      },
      dialogVisible: false,
      disableDialog: true,
      formData: {},
      approveForm: {},
      // 校验规则
      rules: {},
      flowData: [],
      approveStageText: '',
      approvedStage: 0
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
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
        }
      })
    },
    init () {
      this.formData = {}
      this.approveForm = {
        applicationId: '',
        opinion: '',
        isPass: true
      }
    },
    add () {
      this.edit({})
    },
    edit (record) {
      this.approveStageText = record.approvalStatus
      this.approvedStage = record.approvalStatusType
      this.formData = Object.assign({}, record)
      this.approveForm.applicationId = record.id
      this.getApproveStageData(record.id)
      this.dialogVisible = true
    },
    handleOk () {
      const formName = 'approveForm'
      const queryUrl = this.url.approve
      this.$refs[formName].validate(valid => {
        if (valid) {
          postAction(queryUrl, this.approveForm)
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
.sub-title {
  font-size: 19px;
  margin-left: 40px;
}
.division-line {
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.step {
  margin: 20px 0;
}
</style>
