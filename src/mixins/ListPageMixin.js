/*
 * @Author: bujunjie
 * @Date: 2021-12-31 09:53:40
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-10 16:59:52
 * @Description: 列表页混入
 */
import { filterObj } from '@/utils/util'
import util from '@/libs/util'
import { deleteAction, httpAction } from '@/api/manage'

export const ListPageMixin = {
  data () {
    return {
      /* 查询参数 */
      queryParam: {},
      /* 查询体参数 */
      requestBody: {},
      /* 列表数据 */
      tableData: [],
      /* 分页参数 */
      iPagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 30]
      },
      // 列表请求方式
      queryMethod: 'post',
      /* table加载状态 */
      loading: false,
      /* table选中keys */
      selectedRowKeys: [],
      /* table选中records */
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus: false
    }
  },
  created () {
    if (!this.disableMixinCreated) {
      console.log(' -- mixin created -- ')
      this.init()
      this.loadData()
      // 初始化字典配置 在自己页面定义
      this.initDictConfig()
    }
  },
  computed: {
    tokenHeader () {
      const head = { Authorization: util.cookies.get('token') }
      return head
    }
  },
  methods: {
    // 初始化参数
    init () {
      this.requestBody = {}
    },
    loadData (arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.iPagination.pageIndex = 1
      }
      const params = this.getQueryParams()// 查询条件
      this.loading = true
      httpAction(this.url.list, this.queryMethod, params, this.requestBody).then((res) => {
        if (res.statusCode === 200) {
          this.tableData = res.result.pageList || res.result
          if (res.result.totalCount) {
            this.iPagination.total = res.result.totalCount
          } else {
            this.iPagination.total = 0
          }
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    initDictConfig () {
      // console.log('--这是一个假的方法!')
    },
    getQueryParams () {
      // 获取查询条件
      const sqp = {}
      var param = Object.assign(sqp, this.queryParam)
      param.pageIndex = this.iPagination.pageIndex
      param.pageSize = this.iPagination.pageSize
      return filterObj(param)
    },
    onSelectChange (selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    onClearSelected () {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    searchQuery () {
      this.loadData(1)
      // 点击查询清空列表选中行
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    superQuery () {
      this.$refs.superQueryModal.show()
    },
    searchReset () {
      this.init()
      this.queryParam = {}
      this.loadData(1)
    },
    batchDel: function () {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
          onOk: function () {
            that.loading = true
            deleteAction(that.url.deleteBatch, { ids: ids }).then((res) => {
              if (res.statusCode === 200) {
                // 重新计算分页问题
                that.reCalculatePage(that.selectedRowKeys.length)
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.loading = false
            })
          }
        })
      }
    },
    handleDelete: function (id) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      deleteAction(that.url.delete, { id: id }).then((res) => {
        if (res.statusCode === 200) {
          // 重新计算分页问题
          that.reCalculatePage(1)
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    reCalculatePage (count) {
      // 总数量-count
      const total = this.iPagination.total - count
      // 获取删除后的分页数
      const currentIndex = Math.ceil(total / this.iPagination.pageSize)
      // 删除后的分页数<所在当前页
      if (currentIndex < this.iPagination.current) {
        this.iPagination.current = currentIndex
      }
      console.log('currentIndex', currentIndex)
    },
    handleEdit: function (record, modalName = 'modalForm') {
      this.$refs[modalName].edit(record)
      this.$refs[modalName].state = 1
    },
    handleAdd: function (modalName = 'modalForm') {
      this.$refs[modalName].add()
      this.$refs[modalName].state = 0
    },
    // handleTableChange (pagination, filters, sorter) {
    //   // 分页、排序、筛选变化时触发
    //   // TODO 筛选
    //   console.log(pagination)
    //   if (Object.keys(sorter).length > 0) {
    //     this.isorter.column = sorter.field
    //     this.isorter.order = sorter.order === 'ascend' ? 'asc' : 'desc'
    //   }
    //   this.iPagination = pagination
    //   this.loadData()
    // },
    handleToggleSearch () {
      this.toggleSearchStatus = !this.toggleSearchStatus
    },
    modalFormOk () {
      // 新增/修改 成功时，重载列表
      this.loadData()
      // 清空列表选中
      this.onClearSelected()
    },
    handleDetail: function (record, modalName = 'modalForm') {
      this.$refs[modalName].edit(record)
      this.$refs[modalName].state = 2
    },
    // 每页数据条数修改
    pageSizeChange (pagesize) {
      this.iPagination.pageSize = pagesize
      this.loadData(1)
    },
    // 页码修改
    pageNoChange (currentPage) {
      this.iPagination.pageIndex = currentPage
      this.loadData()
    }
  }

}
