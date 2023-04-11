<template>
  <div class="user-data">
    <div class="user-data-container df df-fd-r">
      <div class="user-data-table">
        <div class="user-data-table-input df df-jc-c df-ai-c">
          <el-form :inline="true" label-width="70px">
            <el-form-item label="数据行为:">
              <el-input v-model.trim="form.logName" clearable placeholder="数据行为" style="width: 200px; " />
            </el-form-item>
            <el-form-item label="操作时间:">
              <el-date-picker
                v-model="logTime"
                style=" width: 360px; "
                range-separator="~"
                class="date-range-item"
                end-placeholder="结束时间"
                start-placeholder="开始时间"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="initList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="user-data-table-info">
          <el-table
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            highlight-current-row
            :data="tableData"
            height="100%"
            border
            style="width: 100%">
            <el-table-column
              prop="logName"
              label="操作行为"
              :show-overflow-tooltip="true"
              min-width="200px">
            </el-table-column>
            <el-table-column
              prop="logIp"
              label="登录IP"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="logCount"
              label="操作次数"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="logTime"
              label="操作时间"
              width="200px">
            </el-table-column>
            <el-table-column label="操作" width="80px">
              <template slot-scope="scope">
                <el-button size="mini" round @click.native="showInfo(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-data-table-pagination df df-jc-fe df-ai-c">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, total"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="用户数据行为查看" :visible.sync="userDataDialog" @close='closeDialog'>
      <UserLogDataInfo
        :row="row"
      >
      </UserLogDataInfo>
    </el-dialog>
  </div>
</template>
<script>

const UserLogDataInfo = () => import('components/safetyMonitor/UserLogDataInfo')

export default {
  name: 'UserData',
  components: {
    UserLogDataInfo
  },
  data () {
    return {
      logTime: [],
      form: {
        logName: '',
        logTimeStart: '',
        logTimeEnd: ''
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      userDataDialog: false,
      row: {}
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.initList()
    })
  },
  watch: {},
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getList()
    },
    initList () {
      this.currentPage = 1
      this.getList()
    },
    getList () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      // 起飞时间
      this.form.logTimeStart = ''
      this.form.logTimeEnd = ''
      if (this.logTime && this.logTime.length === 2) {
        this.form.logTimeStart = this.logTime[0]
        this.form.logTimeEnd = this.logTime[1]
      }
      let params = {
        ...this.form,
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      this.$axios({
        url: '/safetyMonitor/userDataPageList',
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
        let data = res.data
        this.tableData = data.content
        this.currentPage = Number(data.pageNo)
        this.pageSize = Number(data.pageSize)
        this.total = Number(data.recordCount)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    showInfo (row) {
      this.userDataDialog = true
      this.row = {
        'logType': 2,
        'logTime': this.logTime,
        'logName': row.logName,
        'logUser': '',
        'dialog': this.userDataDialog
      }
    },
    closeDialog () {
      this.userDataDialog = false
      this.row = { 'dialog': this.userDataDialog }
    }
  }
}
</script>
<style scoped>
.user-data {
  position: absolute;
  width: 100%;
  height: 100%;
}
.user-data-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.user-data-table {
  position: relative;
  width: calc(100vw - 204px);
  height:100%;
  margin-left: 12px;
}
.user-data-table-input {
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
}

.user-data-table-input .el-form--inline .el-form-item {
  margin-bottom: unset;
  /*margin-right: unset;*/
}

.user-data-table-input .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.user-data-table-input .el-button{
  padding: 9px 20px !important;
}

.user-data-table-info {
  position: relative;
  width: 100%;
  height: 80%;
}

.user-data-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}

.el-dialog__wrapper /deep/ .el-dialog {
  margin-top: 10vh !important;
  height: 60%;
  min-height: 600px;
  width: 80%;
  min-width: 800px;
}
.el-dialog__wrapper /deep/ .el-dialog__header {
  padding: 20px 20px 0 20px;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 20px 20px;
}
.el-dialog__wrapper /deep/ .user-log-data {
  margin: 0 10px;
  width: calc(100% - 60px);
  height: calc(100% - 80px);
}
.el-dialog__wrapper /deep/ .user-log-data .user-log-data-table {
  width: 100%;
  height: 100%;
}
</style>
