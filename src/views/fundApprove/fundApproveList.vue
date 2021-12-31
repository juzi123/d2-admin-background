<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 09:40:03
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-31 14:18:45
 * @Description: 拨款审批列表
-->
<template>
  <d2-container>
    <div class="header-wrap">
      <h2>拨款审批</h2>
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
      <el-radio-group v-model="val" @change="loadData">
        <el-radio-button :label="false">待审批</el-radio-button>
        <el-radio-button :label="true">已审批</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 表格区域 -->
    <div class="table-wrap">
      <el-table v-loading="loading" :data="tableData" border height="530px">
        <el-table-column prop="Content" label="项目名称" width="300"></el-table-column>
        <el-table-column prop="Content" label="业主单位"></el-table-column>
        <el-table-column prop="Content" label="联系人"></el-table-column>
        <el-table-column prop="Content" label="申请时间"></el-table-column>
        <el-table-column prop="Content" label="本次支付金额"></el-table-column>
        <el-table-column prop="Content" label="支付类型"></el-table-column>
        <el-table-column prop="Content" label="审批状态"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleApprove">审批</el-button>
            <el-button size="mini" @click="handleDetail">查看</el-button>
            <el-button size="mini" @click="handleEdit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="iPagination"></Pagination>
    </div>
    <fundApproveModal ref="modalForm"></fundApproveModal>
  </d2-container>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue'
import { ListPageMixin } from '@/mixins/ListPageMixin'
import fundApproveModal from './modules/fundApproveModal.vue'
export default {
  name: 'fundApprove',
  mixins: [ListPageMixin],
  components: {
    Pagination,
    fundApproveModal
  },
  data () {
    return {
      url: {
        list: '',
        delete: '',
        deleteBatch: ''
      },
      val: '',
      queryParams: {},
      tableData: [
        {
          Content: 111
        }
      ]
    }
  },
  methods: {
    handleView () {
      this.$refs.fundApproveForm.showDialog(1)
    },
    handleApprove () {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common/table-page-class.scss";
</style>
