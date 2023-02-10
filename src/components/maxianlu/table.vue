<template>
  <div class="margin-top-10 flow">
    <!-- 检索 -->
    <app-search-warp
      :label-width="80"
      @subSearch="handleSearch"
      @subClear="handleClear"
    >
      <app-search-item label="流程名称:" class="Technical_rout">
        <el-input
          style="width:200px"
          v-model="searchInfo.processDefinitionName"
          placeholder="请输入流程名称"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="标题:" class="Technical_rout">
        <el-input
          style="width:200px"
          v-model="searchInfo.title"
          placeholder="请输入标题"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="发起人:" class="Technical_rout">
        <el-select
          style="width:200px"
          v-model="searchInfo.initiator"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in userOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="涉及人:" class="Technical_rout">
        <el-select
          style="width:200px"
          v-model="searchInfo.involvedUser"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in userOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="涉及组:" class="Technical_rout">
        <el-select
          style="width:200px"
          v-model="searchInfo.involvedGroup"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in groupOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="抄送人:" class="Technical_rout">
        <el-select
          style="width:200px"
          v-model="searchInfo.carbonCopy"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in userOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="是否结束:" class="Technical_rout">
        <el-select
          v-model="searchInfo.finished"
          clearable
          placeholder="请选择"
          style="width:200px"
        >
          <el-option label="否" value="false"></el-option>
          <el-option label="是" value="true"></el-option>
        </el-select>
      </app-search-item>
      <app-search-item label="是否删除:" class="Technical_rout">
        <el-select
          v-model="searchInfo.deleted"
          clearable
          placeholder="请选择"
          style="width:200px"
        >
          <el-option label="否" value="false"></el-option>
          <el-option label="是" value="true"></el-option>
        </el-select>
      </app-search-item>
    </app-search-warp>

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

export default {
  name: 'user',
  data() {
    return {
      groupOption: [],
      userOption: [],
      dataLoading: false,
      searchInfo: {},
      // 操作栏宽度
      optionWidth: 300,
      // 是否显示序号
      isShowNumber: true,
      // 操作栏按钮
      isHasButtons: false,
      isHasButtonIcon: true,
      // 操作栏按钮
      buttonsName: {
        normal: ['流程', '删除'],
        icon: ['file-text-o', 'trash']
      },
      tableConfig: [
        {
          label: '标题',
          prop: 'title'
        },
        {
          label: '流程名称',
          prop: 'processDefinitionName'
        },
        {
          label: '当前节点',
          prop: 'endActivityName'
        },
        {
          label: '发起人',
          prop: 'startUserName'
        },
        {
          label: '开始时间',
          prop: 'startTime'
        },
        {
          label: '结束时间',
          prop: 'endTime'
        },
        {
          label: '结束原因',
          prop: 'deleteReason'
        }
      ],
      taskId: null,
      isIncomeDialog: false,
      isurgentDialog: false,
      isSeasonMidDialog: false,
      isSeasonTimeDialog: false
    }
  },
  methods: {
    getSelect() {
      //用户组下拉
      FlowApi.getGroupSelect().then(res => {
        this.groupOption = res
      })
      //用户下拉
      FlowApi.getUserSelect().then(res => {
        this.userOption = res
      })
    },
    getList() {
      this.loadingStatus = true
      const params = {
        title: this.searchInfo.title,
        processInstanceId: this.searchInfo.processInstanceId,
        processDefinitionName: this.searchInfo.processDefinitionName,
        initiator: this.searchInfo.initiator,
        involvedUser: this.searchInfo.involvedUser,
        involvedGroup: this.searchInfo.involvedGroup,
        carbonCopy: this.searchInfo.carbonCopy,
        finished: this.searchInfo.finished,
        deleted: this.searchInfo.deleted,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.dataLoading = true
      FlowApi.getbpmHistory(params)
        .then(res => {
          this.loadingStatus = false
          this.dataLoading = false
          if (res.success) {
            this.listQueryParams.total = res.data.totalCount
            this.tableData = res.data.dataList
            this.tableData.map((item, index) => {
              if (item.startTime) {
                this.tableData[index].startTime = this.getDate(item.startTime)
              }
              if (item.endTime) {
                this.tableData[index].endTime = this.getDate(item.endTime)
              }
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
      if (option === '流程') {
        let type = row.processDefinitionName
        this.taskId = row.id
        if (type == '换季时刻调整流程') {
          this.isSeasonTimeDialog = true
        } else if (type == '季中时刻调整流程') {
          this.isSeasonMidDialog = true
        } else if (type == '新开航线一般流程') {
          this.isIncomeDialog = true
        } else if (type == '新开航线紧急流程') {
          this.isurgentDialog = true
        }
      } else if (option === '删除') {
        if (!row.endTime) {
          this.$message.warning('流程还未结束不能删除！')
          return
        }
        this.$confirm('确定删除此数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            FlowApi.deletebpmHistory(row.id)
              .then(res => {
                if (res.success) {
                  this.getList()
                  this.$message.success('删除成功！')
                } else {
                  this.$message.error(res.msg || '失败')
                }
              })
              .catch(() => {
                this.$message.error('失败')
              })
          })
          .catch(() => {})
      }
    },
    addIncomeClose() {
      this.isIncomeDialog = false
      this.isurgentDialog = false
      this.isSeasonMidDialog = false
      this.isSeasonTimeDialog = false
    },
    // 检索
    handleSearch() {
      this.listQueryParams.page = 1
      this.getList()
    },
    // 清除检索
    handleClear() {
      this.listQueryParams.page = 1
      this.searchInfo = {}
      this.getList()
    },
    // 处理时间
    getDate(timesTamp) {
      var date = new Date(timesTamp)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D =
        (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + ' '
      let h =
        (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':'
      let m =
        (date.getMinutes() >= 10
          ? date.getMinutes()
          : '0' + date.getMinutes()) + ':'
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return Y + M + D + h + m + s
    }
  }
}
</script>
<style>
.flow .Technical_rout .el-form-item__content {
  width: 200px;
}
.Group_over .el-tag--info {
  max-width: 110px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
