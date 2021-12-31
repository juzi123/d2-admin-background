<template>
  <d2-container>
    <TitleWrap style="width: 300px">
      <h2>平台总览</h2>
    </TitleWrap>
    <div class="main-content">
      <div>
        <TitleWrap>
          <h3>本月情况</h3>
        </TitleWrap>
        <div class="info-content">
          <div class="bgItem01">
            <div class="info-name">本月已支付</div>
            <div class="info-value">20笔</div>
          </div>
          <div class="bgItem02">
            <div class="info-name">本月已支付</div>
            <div class="info-value">253.32万元</div>
          </div>
        </div>
      </div>
      <div>
        <TitleWrap>
          <h3>年度情况</h3>
        </TitleWrap>
        <div class="info-content">
          <div class="bgItem01">
            <div class="info-name">本年度已支付</div>
            <div class="info-value">20笔</div>
          </div>
          <div class="bgItem02">
            <div class="info-name">本年度已支付金额</div>
            <div class="info-value">253.32万元</div>
          </div>
        </div>
      </div>
      <div>
        <TitleWrap>
          <h3>本月支付明细</h3>
        </TitleWrap>
        <el-table class="my-table" :data="tableData" height="430px">
          <el-table-column prop="Content" label="项目名称" width="300"></el-table-column>
          <el-table-column prop="Content" label="业主单位"></el-table-column>
          <el-table-column prop="Content" label="金额"></el-table-column>
          <el-table-column prop="Content" label="审批状态"></el-table-column>
          <el-table-column prop="Content" label="操作"></el-table-column>
        </el-table>
      </div>
      <div>
        <TitleWrap>
          <h3>进行中的拨款</h3>
        </TitleWrap>
        <el-table class="my-table" :data="tableData" height="430px">
          <el-table-column prop="Content" label="项目名称" width="300"></el-table-column>
          <el-table-column prop="Content" label="业主单位"></el-table-column>
          <el-table-column prop="Content" label="金额"></el-table-column>
          <el-table-column prop="Content" label="审批状态"></el-table-column>
          <el-table-column prop="Content" label="操作"></el-table-column>
        </el-table>
      </div>
    </div>

  </d2-container>
</template>

<script>
import TitleWrap from '@/components/common/TitleWrap.vue'
export default {
  components: {
    TitleWrap
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
.bgItem01 {
  background: url(./images/xtsj01.png) no-repeat;
  background-size: 100% 100%;
}
.bgItem02 {
  background: url(./images/xtsj02.png) no-repeat;
  background-size: 100% 100%;
}
</style>
