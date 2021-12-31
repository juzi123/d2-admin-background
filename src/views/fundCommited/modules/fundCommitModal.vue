<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 15:40:26
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-31 14:39:03
 * @Description: 拨款申请表单
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" top="40px" @close="close">
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px" :inline="true">
      <el-form-item label="所属公司:" class="one-line">
        <el-radio-group v-model="formData.Declaration">
          <el-radio label="本公司" border></el-radio>
          <el-radio label="科技公司" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目名称:" class="one-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="业主单位:" class="one-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" class="half-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" class="half-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="合同金额(万元):" class="half-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="本次支付比例(%):" class="half-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="本次支付金额(万元):" class="half-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="本次支付类型:" class="one-line">
        <el-radio-group v-model="formData.Declaration">
          <el-radio label="签订合同后支付" border></el-radio>
          <el-radio label="到货支付" border></el-radio>
          <el-radio label="初验支付" border></el-radio>
          <el-radio label="终验支付" border></el-radio>
          <el-radio label="质保到期支付" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同:" class="one-line">
        <UploadFile></UploadFile>
      </el-form-item>
      <el-form-item label="支付审批单:" class="one-line">
        <UploadFile></UploadFile>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOk">确 认</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UploadFile from '@/components/common/UploadFile.vue'
export default {
  name: 'fundCommitForm',
  components: {
    UploadFile
  },
  data () {
    return {
      title: '',
      dialogVisible: false,
      formData: {},
      // 校验规则
      rules: {}
    }
  },
  created () {},
  methods: {
    add () {
      this.edit({})
    },
    edit (record) {
      this.formData = Object.assign({}, record)
      this.dialogVisible = true
    },
    handleOk () {
      this.$emit('ok')
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
@import '~@/assets/style/common/form-class.scss';
</style>
