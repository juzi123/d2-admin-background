<template>
  <d2-container>
    <TitleWrap style="width: 300px">
      <h2>{{ title }}</h2>
    </TitleWrap>
    <div class="main-content">
      <div>
        <TitleWrap>
          <h3>本月情况</h3>
        </TitleWrap>
        <div class="info-content">
          <div class="bgItem01">
            <div class="info-name">本月已支付</div>
            <div class="info-value">{{monthData.count}}笔</div>
          </div>
          <div class="bgItem02">
            <div class="info-name">本月已支付</div>
            <div class="info-value">{{monthData.amount}}万元</div>
          </div>
        </div>
      </div>
      <div>
        <TitleWrap>
          <div class="year-header">
            <h3>年度情况</h3>
            <el-button v-if="info.role === '管理员'" @click="changeAnnualPlan" type="primary">修改本年度计划金额</el-button>
          </div>
        </TitleWrap>
        <div class="info-content" v-if="info.role !== '管理员'">
          <div class="bgItem01">
            <div class="info-name">本年度已支付</div>
            <div class="info-value">{{yearData.count}}笔</div>
          </div>
          <div class="bgItem02">
            <div class="info-name">本年度已支付金额</div>
            <div class="info-value">{{yearData.amount}}万元</div>
          </div>
        </div>
        <div class="long-content bgItem02" v-else>
          <div class="info-name">本年度已支付金额</div>
          <div class="info-value">{{yearData.amount}}万元</div>
          <div class="money">本年度计划金额 {{yearData.annualPlan}}万元</div>
          <el-progress class="progress" :text-inside="true" :stroke-width="24" :percentage="yearData.percent" color="#AA97D5"></el-progress>
        </div>
      </div>
      <div>
        <TitleWrap>
          <h3>本月支付明细</h3>
        </TitleWrap>
        <el-table v-loading="loading1" class="my-table" :data="tableData1" height="390px">
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="ownerUnit" label="业主单位"></el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              {{ scope.row.paymentAmount }} 万元
            </template>
          </el-table-column>
          <el-table-column prop="approvalStatus" label="审批状态"></el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <a @click="handleDetail(scope.row)" class="link-span">详情</a>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :pagination="iPagination1"></Pagination>
      </div>
      <div>
        <TitleWrap>
          <h3>进行中的拨款</h3>
        </TitleWrap>
        <el-table v-loading="loading2" class="my-table" :data="tableData2" height="390px">
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="ownerUnit" label="业主单位"></el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              {{scope.row.paymentAmount }} 万元
            </template>
          </el-table-column>
          <el-table-column prop="approvalStatus" label="审批状态"></el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <a @click="handleDetail(scope.row)" class="link-span">详情</a>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :pagination="iPagination2"></Pagination>
      </div>
    </div>
    <fundApproveModal ref="modalForm"></fundApproveModal>
    <changeAnnualPlanModal ref="annualPlanModal" @ok="changePlanOk"></changeAnnualPlanModal>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/common/Pagination.vue'
import TitleWrap from '@/components/common/TitleWrap.vue'
import fundApproveModal from '@/views/fundApprove/modules/fundApproveModal.vue'
import changeAnnualPlanModal from './modules/changeAnnualPlanModal.vue'
export default {
  name: 'homePage',
  components: {
    TitleWrap,
    Pagination,
    fundApproveModal,
    changeAnnualPlanModal
  },
  data () {
    return {
      tableData1: [],
      tableData2: [],
      title: '',
      loading1: false,
      loading2: false,
      queryParam: {
        company: '',
        dept: ''
      },
      iPagination1: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      iPagination2: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      monthData: {
        amount: 0,
        count: 0
      },
      yearData: {
        amount: 0,
        annualPlan: 0,
        count: 0,
        percent: 0
      }
    }
  },
  created () {
    this.getMsg()
    this.getMonthSituation()
    this.getYearSituation()
    this.getMonthList()
    this.getOnGoingList()
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  methods: {
    getMsg () {
      if (this.info.role === '部门职员') {
        this.title = this.info.department
      } else if (this.info.role === '公司领导') {
        this.title = this.info.company
      } else {
        this.title = '平台总览'
      }
      this.queryParam.company = this.info.company
      this.queryParam.dept = this.info.department
    },
    getMonthSituation () {
      this.$api.getMonthSituation(this.queryParam).then(res => {
        this.monthData = res.result
      })
    },
    getYearSituation () {
      this.$api.getYearSituation(this.queryParam).then(res => {
        this.yearData = res.result
      })
    },
    getMonthList () {
      const params = {
        ...this.queryParam,
        pageIndex: this.iPagination1.pageIndex,
        pageSize: this.iPagination1.pageSize
      }
      this.loading1 = true
      this.$api
        .getMonthList(params)
        .then(res => {
          if (res.statusCode === 200) {
            this.tableData1 = res.result.pageList || res.result
            if (res.result.totalCount) {
              this.iPagination1.total = res.result.totalCount
            } else {
              this.iPagination1.total = 0
            }
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.loading1 = false
        })
    },
    getOnGoingList () {
      const params = {
        ...this.queryParam,
        pageIndex: this.iPagination2.pageIndex,
        pageSize: this.iPagination2.pageSize
      }
      this.loading2 = true
      this.$api
        .getOnGoingList(params)
        .then(res => {
          if (res.statusCode === 200) {
            this.tableData2 = res.result.pageList || res.result
            if (res.result.totalCount) {
              this.iPagination2.total = res.result.totalCount
            } else {
              this.iPagination2.total = 0
            }
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.loading2 = false
        })
    },
    handleDetail: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.state = 2
    },
    changeAnnualPlan: function () {
      this.$refs.annualPlanModal.edit()
    },
    changePlanOk () {
      this.getYearSituation()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-wrap: wrap;
  > div {
    box-sizing: border-box;
    width: 50%;
    padding: 10px 50px 0 0;
  }
}
.info-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  > div {
    width: 370px;
    height: 140px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    position: relative;
    .info-name {
      position: absolute;
      top: 25px;
      left: 40px;
    }
    .info-value {
      position: absolute;
      top: 66px;
      right: 40px;
    }
  }
}
.long-content {
  margin-top: 20px;
  height: 140px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  position: relative;
  .info-name {
    position: absolute;
    top: 17px;
    left: 40px;
  }
  .info-value {
    position: absolute;
    top: 40px;
    left: 40px;
  }
  .money {
    position: absolute;
    top: 40px;
    right: 40px;
  }
  .progress {
    width: calc(100% - 68px);
    padding: 0 34px;
    position: absolute;
    top: 80px;
  }
}
.bgItem01 {
  background: url(./images/xtsj01.png) no-repeat;
  background-size: 100% 100%;
}
.bgItem02 {
  background: url(./images/xtsj02.png) no-repeat;
  background-size: 100% 100%;
}
.link-span {
  cursor: pointer;
  color: #1890ff;
}
.year-header {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
