<!--
 * @Author: bujunjie
 * @Date: 2021-12-31 14:50:24
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-06 15:06:36
 * @Description:
-->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1200px" top="100px" @close="close">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="180px" :inline="true">
      <el-form-item label="用户名:" prop="userName" class="half-line">
        <el-input v-model="formData.userName" placeholder="请输入内容" :disabled="state !== 0"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" class="half-line" v-if="state === 0">
        <el-input v-model="formData.password" type="password" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="名称:" prop="name" class="half-line">
        <el-input v-model="formData.name" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="roleType" class="half-line">
        <el-select v-model="formData.roleType" class="form-item-content" placeholder="请选择" :disabled="disableDialog" @change="roleTypeChange">
          <el-option v-for="item in $dictData.roleDict" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用:" prop="isActive" class="half-line">
        <el-select v-model="formData.isActive" class="form-item-content" placeholder="请选择" :disabled="disableDialog">
          <el-option v-for="item in $dictData.userStatus" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司:" prop="company" class="half-line">
        <el-select v-model="formData.company" class="form-item-content" placeholder="请选择" :disabled="disableDialog">
          <el-option v-for="item in $dictData.companyDict" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门:" prop="department" class="half-line">
        <el-select v-model="formData.department" class="form-item-content" placeholder="请选择" :disabled="disableDialog">
          <el-option v-for="item in $dictData.departmentDict" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" class="half-line">
        <el-input v-model="formData.phoneNumber" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" class="half-line">
        <el-input v-model="formData.email" placeholder="请输入内容" :disabled="disableDialog"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOk">确 认</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateObjVal } from '@/utils/util'
import { setRequired } from '@/utils/validator'
import { postAction } from '@/api/manage'
export default {
  name: 'userModal',
  data () {
    return {
      state: 0, // 0 新增 1 修改 2 查看
      title: '新建用户',
      titleList: ['新建用户', '修改用户', '查看用户'],
      dialogVisible: false,
      disableDialog: false,
      formData: {},
      url: {
        add: '/api/User/Insert',
        edit: '/api/User/Update'
      },
      // 校验规则
      rules: {
        userName: setRequired('请输入用户名'),
        password: setRequired('请输入密码'),
        name: setRequired('请输入名称'),
        roleType: setRequired('请选择角色'),
        company: setRequired('请选择所属公司'),
        isActive: setRequired('请选择账号状态'),
        department: setRequired('请选择所属部门')
      }
    }
  },
  created () {
    this.init()
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
    // 角色修改
    roleTypeChange (val) {
      debugger
      this.rules.company = {}
      this.rules.department = {}
      if (val === 1) {
        this.rules.company = setRequired('请选择所属公司')
      } else if (val === 0) {
        this.rules.department = setRequired('请选择所属部门')
      }
    },
    init () {
      this.formData = {
        id: '',
        userName: '',
        password: '',
        name: '',
        roleType: 0,
        isActive: true,
        company: '',
        department: '',
        phoneNumber: '',
        email: ''
      }
    },
    add () {
      this.edit({})
    },
    edit (record) {
      this.init()
      updateObjVal(this.formData, record)
      this.roleTypeChange(record.roleType)
      this.dialogVisible = true
    },
    handleOk () {
      const formName = 'formData'
      let queryUrl = ''
      if (this.formData.id === '') {
        delete this.formData.id
        queryUrl = this.url.add
      } else {
        delete this.formData.password
        queryUrl = this.url.edit
      }
      this.formData.role = this.formData.roleType
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
