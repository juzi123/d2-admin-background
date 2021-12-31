<!--
 * @Author: bujunjie
 * @Date: 2021-12-30 08:41:39
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-31 14:39:08
 * @Description: 拨款审批表单
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" top="40px" @close="close">
    <h3 class="sub-title">申请详情:</h3>
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
      <el-form-item :label="'支付审批单:\n(需要签字到董长)'" class="one-line warp-line">
        <UploadFile></UploadFile>
      </el-form-item>
    </el-form>
    <el-steps class="step" :active="approvedStage" align-center finish-status="success">
      <el-step v-for="item in flowData" :key="item.Progress" :title="item.Progress">
        <div slot="description">
          <div v-if="item.Result === '待审批'">
            <span>待审批</span>
          </div>
          <div v-else>
            <div>{{ item.Approver }}</div>
            <div>{{ item.Result }}</div>
            <div>{{ item.ApproveTime | timeFilter }}</div>
          </div>
        </div>
      </el-step>
    </el-steps>
    <div class="division-line"></div>
    <h3 class="sub-title">审批:</h3>
    <el-form ref="elForm" :model="formData" :rules="rules" label-width="180px">
      <el-form-item label="是否同意:" class="one-line">
        <el-radio-group v-model="formData.Declaration">
          <el-radio label="通过" border></el-radio>
          <el-radio label="不通过" border></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批人:" class="one-line">
        <el-input v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="审批意见:" class="one-line">
        <el-input type="textarea" :row="3" v-model="formData.Declaration" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOk">提 交</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UploadFile from '@/components/common/UploadFile.vue'
export default {
  name: 'fundApproveForm',
  components: {
    UploadFile
  },
  data () {
    return {
      title: '',
      dialogVisible: false,
      formData: {},
      // 校验规则
      rules: {},
      flowData: [],
      approvedStage: 0
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
@import "~@/assets/style/common/form-class.scss";
.sub-title {
  font-size: 19px;
  margin-left: 40px;
}
.division-line {
  width: 100%;
  border-bottom: 1px solid #ddd;
}
</style>
