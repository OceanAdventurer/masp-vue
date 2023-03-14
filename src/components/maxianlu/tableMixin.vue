<template>
  <div class="margin-top-10 flow">
    <!-- 检索 -->
    <app-search-warp
      :label-width="80"
      :hasAddSearch="true"
      :addSearchButtonText="'新增'"
      :hasDownloadFile="false"
      :hasBatchSearch="true"
      :hasBatchSearchText="'批量新增'"
      @subBatchAdd="userBatchAdd"
      @subSearch="handleSearch"
      @subClear="userHandleClear"
      @subAdd="userHandleAdd"
    >
      <app-search-item label="用户名:" class="Technical_rout">
        <el-input
          style="width:200px"
          v-model="displayName"
          placeholder="请输入用户名"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="工号:" class="Technical_rout">
        <el-input
          style="width:200px"
          v-model="userId"
          placeholder="请输入工号"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
    </app-search-warp>

    <!-- 新增用户 -->
    <AddDialog
      :isAddDialog="isAddDialog"
      @addClose="addClose"
      @addSubmit="addSubmit"
    />

    <!-- 批量新增用户 -->
    <BatchDialog
      :isBatchDialog="isBatchDialog"
      @batchClose="batchHandleClose"
      @batchSubmit="batchSubmitForm"
    />

    <!-- 绑定解绑用户 -->
    <BindDialog
      :isBindDialog="isBindDialog"
      :bindTitle="bindTitle"
      :bindUserId="bindUserId"
      @bindClose="bindHandleClose"
      @bindSubmit="bindSubmitForm"
    />

    <!-- 数据展示 -->
    <el-card
      class="margin-top-10"
      v-loading="dataLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <app-table
        :isHasButtons="isHasButtons"
        :isHasButtonIcon="isHasButtonIcon"
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import FlowApi from '@/api/flow'
import AddDialog from './index/addDialog'
import BatchDialog from './index/batchDialog'
import BindDialog from './index/bindDialog'

export default {
  name: 'user',
  mixins: [tableMixin],
  components: {
    AddDialog,
    BatchDialog,
    BindDialog
  },
  data() {
    return {
      dataLoading: false,
      isAddDialog: false,
      isBatchDialog: false,
      isBindDialog: false,
      bindTitle: '绑定或解绑',
      bindUserId: null,
      displayName: '',
      userId: '',
      // 操作栏宽度
      optionWidth: 300,
      // 是否显示序号
      isShowNumber: true,
      // 操作栏按钮
      isHasButtons: false,
      isHasButtonIcon: true,
      // 操作栏按钮
      buttonsName: {
        // normal: ['绑定', '解绑', '删除'],
        // icon: ['user-plus', 'user-times', 'trash']
        normal: ['绑定或解绑', '删除'],
        icon: ['user', 'trash']
      },
      tableConfig: [
        {
          label: '工号',
          prop: 'id'
        },
        {
          label: '用户名',
          prop: 'fullName'
        },
        {
          label: '邮箱',
          prop: 'email'
        },
        {
          label: '是否已绑定',
          prop: 'binding'
        },
        {
          label: '已绑定的组',
          prop: 'groupsIncludeUser'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.loadingStatus = true
      const params = {
        displayName: this.displayName,
        userId: this.userId,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.dataLoading = true
      FlowApi.getUserPage(params)
        .then(res => {
          this.loadingStatus = false
          this.dataLoading = false
          if (res.success) {
            this.listQueryParams.total = res.data.totalCount
            this.tableData = res.data.dataList
            this.tableData.map((item, index) => {
              this.tableData[index].binding = item.binding ? '是' : '否'
              this.tableData[index].groupsIncludeUser =
                item.groupsIncludeUser.length > 0
                  ? item.groupsIncludeUser.join(',')
                  : ' '
              this.tableData[index].fullName =
                (item.firstName || '') + (item.lastName || '')
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.dataLoading = false
          this.loadingStatus = false
          this.$message.error('数据加载失败')
        })
    },
    // 表格操作功能
    handleTableOption(index, row, option) {
      if (option === '删除') {
        this.$confirm('确定删除此数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            FlowApi.deleteUser({ userId: row.id })
              .then(res => {
                if (res.success) {
                  this.getList()
                  this.$message.success('成功')
                } else {
                  this.$message.error(res.msg || '失败')
                }
              })
              .catch(() => {
                this.$message.error('失败')
              })
          })
          .catch(() => {})
      } else if (option === '绑定或解绑') {
        this.bindTitle = '绑定或解绑'
        this.bindUserId = row.id
        this.isBindDialog = true
      }
    },
    // 检索
    handleSearch() {
      this.listQueryParams.page = 1
      this.getList()
    },
    // 清除检索
    handleClear() {
      this.listQueryParams.page = 1
      this.displayName = ''
      this.userId = ''
      this.getList()
    },
    // 用户新增
    userHandleAdd() {
      this.isAddDialog = true
    },
    userHandleClear() {
      this.listQueryParams.page = 1
      this.displayName = ''
      this.userId = ''
      this.getList()
    },
    // 用户新增关闭
    addClose() {
      this.isAddDialog = false
    },
    // 用户新增提交
    addSubmit() {
      this.isAddDialog = false
      this.getList()
    },
    // 批量新增
    userBatchAdd() {
      this.isBatchDialog = true
    },
    // 批量新增关闭
    batchHandleClose() {
      this.isBatchDialog = false
    },
    // 批量新增提交
    batchSubmitForm() {
      this.isBatchDialog = false
      this.getList()
    },
    // 绑定或解绑
    bindHandleClose() {
      this.isBindDialog = false
    },
    // 绑定或解绑
    bindSubmitForm() {
      this.getList()
    }
  }
}
</script>
<style>
.flow .Technical_rout .el-form-item__content {
  width: 200px;
}
</style>
