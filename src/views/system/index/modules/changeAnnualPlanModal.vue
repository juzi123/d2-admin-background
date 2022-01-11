<!--
 * @Author: bujunjie
 * @Date: 2021-01-06 14:50:24
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-06 14:39:10
 * @Description:
-->
<template>
  <el-dialog title="修改本年度计划金额" :visible.sync="dialogVisible" width="800px" top="180px" @close="close">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" :inline="true">
      <el-form-item label="金额(万元):" prop="annualPlan" class="one-line">
        <el-input v-model="formData.annualPlan" placeholder="请输入金额"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOk">确 认</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getValidator } from '@/utils/validator'
import { postAction } from '@/api/manage'
export default {
  name: 'changeAnnualPlanModal',
  data () {
    return {
      dialogVisible: false,
      disableDialog: false,
      formData: {},
      url: {
        edit: '/api/Home/UpdatePlan'
      },
      // 校验规则
      rules: {
        annualPlan: getValidator('required', 'positiveNumber')
      }
    }
  },
  created () {
  },
  methods: {
    edit () {
      this.dialogVisible = true
    },
    handleOk () {
      const formName = 'formData'
      this.$refs[formName].validate(valid => {
        if (valid) {
          postAction(this.url.edit, this.formData)
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
</style>
