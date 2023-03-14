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
          v-model="searchInfo.processInstanceName"
          placeholder="请输入流程名称"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="任务名称:" class="Technical_rout">
        <el-input
          style="width:200px"
          v-model="searchInfo.title"
          placeholder="请输入任务名称"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="发起人:" class="Technical_rout">
        <el-input
          style="width:200px"
          v-model="searchInfo.initiator"
          placeholder="请输入发起人"
          size="small"
          clearable
          @keyup.native.enter="handleSearch"
        />
      </app-search-item>
      <app-search-item label="暂停/激活:" class="Technical_rout">
        <el-select v-model="searchInfo.isActive" placeholder="请选择">
          <el-option label="暂停" value="false"></el-option>
          <el-option label="激活" value="true"></el-option>
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

    <el-dialog
      title="流程图"
      :visible.sync="dialogVisible"
      width="700"
      :before-close="handleClose"
    >
      <el-image
        style="width: 100%; height: 50vh"
        :src="fileUrl"
        fit="contain"
        :preview-src-list="[fileUrl]"
      ></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 换季时刻调整流程 -->
    <SeasonTimeDialog
      :isIncomeDialog="isSeasonTimeDialog"
      :taskId="incometaskid"
      @addClose="addIncomeClose"
    />
    <!-- 流程 -->
    <IncomeDialog
      :isIncomeDialog="isIncomeDialog"
      :taskId="incometaskid"
      @addClose="addIncomeClose"
    />
  </div>
</template>

<script>
import tableMixin from '@/mixins/tableMixin'
import IncomeDialog from './index/incomeDialog'
import SeasonTimeDialog from './index/seasonTimeDialog'
import FlowApi from '@/api/flow'
export default {
  name: 'user',
  mixins: [tableMixin],
  components: {
    IncomeDialog,
    SeasonTimeDialog
  },
  data() {
    return {
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
        normal: ['流程', '流程图', '激活或挂起', '删除'],
        icon: ['file-text-o', 'image', 'minus-circle', 'trash']
      },
      tableConfig: [
        {
          label: '实例ID',
          prop: 'id'
        },
        {
          label: '流程名称',
          prop: 'processDefinitionName'
        },
        {
          label: '任务名称',
          prop: 'title'
        },
        {
          label: '当前节点',
          prop: 'currentTask'
        },
        {
          label: '当前处理人',
          prop: 'currentHandler'
        },
        {
          label: '发起人',
          prop: 'Initiator'
        },
        {
          label: '发起时间',
          prop: 'started'
        },
        {
          label: '状态',
          prop: 'suspended'
        }
      ],
      dialogVisible: false,
      fileUrl: '',
      isSeasonTimeDialog: false,
      isIncomeDialog: false,
      incometaskid: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loadingStatus = true
      const params = {
        title: this.searchInfo.title,
        processInstanceId: this.searchInfo.processInstanceId,
        processDefinitionName: this.searchInfo.processDefinitionName,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      this.dataLoading = true
      FlowApi.getbpmRunning(params)
        .then(res => {
          this.loadingStatus = false
          this.dataLoading = false
          if (res.success) {
            this.listQueryParams.total = res.data.totalCount
            this.tableData = res.data.dataList
            this.tableData.map((item, index) => {
              if (item.startedBy) {
                this.tableData[index].Initiator =
                  item.startedBy.firstName + item.startedBy.lastName
              }
              if (item.started) {
                this.tableData[index].started = this.getDate(item.started)
              }
              this.tableData[index].suspended = item.suspended ? '挂起' : '激活'
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
        console.log(row)
        this.incometaskid = row.id
        if (row.processDefinitionKey == 'SeasonTimeChg') {
          this.isSeasonTimeDialog = true
        } else {
          this.isIncomeDialog = true
        }
      } else if (option === '流程图') {
        this.dialogVisible = true
        this.fileUrl =
          '/api/bpm/bpmRunning/traceDiagram?processInstanceId=' + row.id
      } else if (option === '激活或挂起') {
        let str = '挂起'
        if (row.suspended == '挂起') {
          str = '激活'
        }
        this.$confirm('确定' + str + '此数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (str == '激活') {
              this.activebpmRunning(row.id)
            } else {
              this.suspendbpmRunning(row.id)
            }
          })
          .catch(() => {})
      } else if (option === '删除') {
        this.$prompt('请输入删除原因！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\S{1,200}$/,
          inputErrorMessage: '长度不能少于2'
        })
          .then(({ value }) => {
            let params = {
              deleteReason: value,
              updateOaTaskFlag: true
            }
            FlowApi.deletebpmRunning(row.id, params)
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
    suspendbpmRunning(id) {
      FlowApi.suspendbpmRunning(id)
        .then(res => {
          if (res.success) {
            this.getList()
            this.$message.success('挂起成功！')
          } else {
            this.$message.error(res.msg || '失败')
          }
        })
        .catch(() => {
          this.$message.error('失败')
        })
    },
    activebpmRunning(id) {
      FlowApi.activebpmRunning(id)
        .then(res => {
          if (res.success) {
            this.getList()
            this.$message.success('激活成功！')
          } else {
            this.$message.error(res.msg || '失败')
          }
        })
        .catch(() => {
          this.$message.error('失败')
        })
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
    handleClose() {
      this.dialogVisible = false
    },
    addIncomeClose() {
      this.isIncomeDialog = false
      this.isSeasonTimeDialog = false
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
      // let h =
      //   (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':'
      // let m =
      //   (date.getMinutes() >= 10
      //     ? date.getMinutes()
      //     : '0' + date.getMinutes()) + ':'
      // let s =
      //   date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      // return Y + M + D + h + m + s
      return Y + M + D
    }
  }
}
</script>
<style>
.flow .Technical_rout .el-form-item__content {
  width: 200px;
}
</style>
