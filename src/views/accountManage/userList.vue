<!--
 * @Author: bujunjie
 * @Date: 2021-12-31 14:48:40
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-05 14:32:28
 * @Description: 用户列表
-->
<template>
  <d2-container>
    <div class="header-wrap">
      <h2>用户列表</h2>
    </div>
    <!-- 查询区域 -->
    <!-- <div class="table-page-search-wrapper">
      <el-form layout="inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="名称">
              <el-input v-model="val" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <template v-if="toggleSearchStatus">
            <el-col :span="6">
              <el-form-item label="所属公司">
                <el-input v-model="val" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="6">
            <span class="table-page-search-submitButtons">
              <el-button icon="el-icon-search" @click="searchQuery" type="primary">搜索</el-button>
              <el-button icon="el-icon-refresh-left" @click="searchReset" type="primary">重置</el-button>
              <a @click="handleToggleSearch" class="search-expand-btn">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <i :class="toggleSearchStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
              </a>
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div> -->
    <!-- 操作按钮区域 -->
    <div class="operate-wrap">
      <el-button @click="handleAdd" type="primary">新建用户</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table-wrap">
      <el-table class="my-table" :data="tableData" border height="600px">
        <el-table-column prop="userName" label="用户名" width="300"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <span>{{ scope.row.isActive ? '已启用':'未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.row)" type="primary">查看</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="iPagination"></Pagination>
    </div>
    <userModal ref="modalForm" @ok="modalFormOk"></userModal>
  </d2-container>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue'
import { ListPageMixin } from '@/mixins/ListPageMixin'
import userModal from './modules/userModal.vue'
export default {
  name: 'userList',
  mixins: [ListPageMixin],
  components: {
    Pagination,
    userModal
  },
  data () {
    return {
      url: {
        list: '/api/User/GetPageList',
        delete: '/api/User/Delete'
        // deleteBatch: ''
      },
      queryMethod: 'get'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common/table-page-class.scss";
</style>
