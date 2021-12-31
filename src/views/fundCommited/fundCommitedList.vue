<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 09:38:24
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-31 14:18:58
 * @Description: 申请拨款列表
-->
<template>
  <d2-container>
    <div class="header-wrap">
      <h2>我的申请</h2>
    </div>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <el-form layout="inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目名称">
              <el-input v-model="val" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批状态">
              <el-input v-model="val" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <template v-if="toggleSearchStatus">
            <el-col :span="6">
              <el-form-item label="支付类型">
                <el-input v-model="val" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
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
    </div>
    <!-- 操作按钮区域 -->
    <div class="operate-wrap">
      <el-button @click="handleAdd" type="primary">新建申请</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table-wrap">
      <el-table class="my-table" :data="tableData" border height="530px">
        <el-table-column prop="Content" label="项目名称" width="300"></el-table-column>
        <el-table-column prop="Content" label="业主单位"></el-table-column>
        <el-table-column prop="Content" label="申请时间"></el-table-column>
        <el-table-column prop="Content" label="本次支付金额"></el-table-column>
        <el-table-column prop="Content" label="支付类型"></el-table-column>
        <el-table-column prop="Content" label="审批状态"></el-table-column>
      </el-table>
      <Pagination :pagination="iPagination"></Pagination>
    </div>
    <fundCommitModal ref="modalForm" @ok="modalFormOk"></fundCommitModal>
  </d2-container>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue'
import { ListPageMixin } from '@/mixins/ListPageMixin'
import fundCommitModal from './modules/fundCommitModal.vue'
export default {
  name: 'fundCommited',
  mixins: [ListPageMixin],
  components: {
    Pagination,
    fundCommitModal
  },
  data () {
    return {
      url: {
        list: '',
        delete: '',
        deleteBatch: ''
      },
      val: '',
      queryParams: {}
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common/table-page-class.scss";
</style>
