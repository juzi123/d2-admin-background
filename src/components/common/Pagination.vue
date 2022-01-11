<template>
  <div class="table-pagination">
    <el-pagination
      :current-page="pagination.pageIndex"
      :page-sizes="pagination.pageSizeOptions || [10, 20, 30]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="sizeChange"
      @current-change="currentChange"
      background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    sizeChange (value) {
      this.$emit('pageSizeChange', value)
    },
    currentChange (value) {
      this.$emit('pageNoChange', value)
    }
  }
}
</script>

<style scoped>
.table-pagination {
  margin-top: 12px;
  float: right;
}
</style>
