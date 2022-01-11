<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 09:38:24
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-10 17:04:17
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
              <el-input v-model="requestBody.projectName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批状态">
              <el-select v-model="requestBody.approvalStatus" class="search-content" placeholder="请选择">
                <el-option v-for="item in $dictData.approveStatusType" :key="item.value" :label="item.text" :value="item.text"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="toggleSearchStatus">
            <el-col :span="6">
              <el-form-item label="支付类型">
                <el-select v-model="requestBody.paymentType" class="search-content" placeholder="请选择">
                  <el-option v-for="item in $dictData.paymentType" :key="item.value" :label="item.text" :value="item.text"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属公司">
                <el-select v-model="requestBody.company" class="search-content" placeholder="请选择">
                  <el-option v-for="item in $dictData.companyDict" :key="item.value" :label="item.text" :value="item.text"></el-option>
                </el-select>
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
      <el-button @click="handleAdd()" type="primary">项目拨款申请</el-button>
      <el-button @click="handleAdd('equipmentModal')" type="primary">器材拨款申请</el-button>
      <el-button @click="handleAdd('maintenanceModal')" type="primary">维护拨款申请</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table-wrap">
      <el-table class="my-table" :data="tableData" border height="530px">
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="ownerUnit" label="业主单位" width="200"></el-table-column>
        <el-table-column prop="ownerContact" label="联系人"></el-table-column>
        <el-table-column label="申请时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paymentAmount" label="本次支付金额(万元)" width="120"></el-table-column>
        <el-table-column label="申请类型">
          <template slot-scope="scope">
            <span>{{ scope.row.applyType | dictFilter('applyType') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <span>{{ scope.row.approvalStatus | dictFilter('approveStatusType') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="projectNo" label="项目编号" width="280"></el-table-column>
        <el-table-column prop="company" label="所属公司" width="100"></el-table-column>
        <el-table-column label="项目类型" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.isCommercial ? '经营性项目':'非经营性项目' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ownerPhone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="contractAmount" label="合同金额(万元)" width="120"></el-table-column>
        <el-table-column prop="paymentPercent" label="本次支付比例(%)" width="80"></el-table-column>
        <el-table-column prop="paymentAmount" label="本次支付金额(万元)" width="120"></el-table-column>
        <el-table-column prop="paymentAmountRemark" label="付款备注" width="220"></el-table-column>
        <el-table-column label="本次支付类型" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.paymentType | dictFilter('paymentType') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="220"></el-table-column>
        <el-table-column label="合同" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.contract | fileFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付审批单" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.paymentApprovalForm | fileFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.receipt | fileFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.row, getFormName(scope.row.applyType))" type="primary">查看</el-button>
            <el-button size="mini" @click="handleEdit(scope.row, getFormName(scope.row.applyType))">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pagination="iPagination"></Pagination>
    </div>
    <fundCommitModal ref="modalForm" @ok="modalFormOk"></fundCommitModal>
    <equipmentModal ref="equipmentModal" @ok="modalFormOk"></equipmentModal>
    <maintenanceModal ref="maintenanceModal" @ok="modalFormOk"></maintenanceModal>
  </d2-container>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue'
import { ListPageMixin } from '@/mixins/ListPageMixin'
import fundCommitModal from './modules/fundCommitModal.vue'
import equipmentModal from './modules/equipmentModal.vue'
import maintenanceModal from './modules/maintenanceModal.vue'
export default {
  name: 'fundCommited',
  mixins: [ListPageMixin],
  components: {
    Pagination,
    fundCommitModal,
    equipmentModal,
    maintenanceModal
  },
  data () {
    return {
      url: {
        list: '/api/Application/GetPageList',
        delete: '/api/Application/Delete',
        deleteBatch: ''
      },
      requestBody: {
        projectName: '',
        approvalStatus: '',
        paymentType: '',
        company: ''
      }
    }
  },
  methods: {
    getFormName (approveType) {
      switch (approveType) {
        case 1:
          return 'modalForm'
        case 2:
          return 'equipmentModal'
        case 3:
          return 'maintenanceModal'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/common/table-page-class.scss";
</style>
