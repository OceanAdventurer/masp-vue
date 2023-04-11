<template>
  <div class="user-log-data">
    <div class="user-log-data-container df df-fd-r">
      <div class="user-log-data-table">
        <div class="user-log-data-table-input df df-jc-c df-ai-c">
          <el-form :inline="true" label-width="70px">
            <el-form-item label="用户:" v-if="row.logType === 2">
              <el-input v-model.trim="form.logUser" clearable placeholder="用户" style="width: 200px; " />
            </el-form-item>
            <el-form-item label="数据行为:" v-else-if="row.logType === 1">
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
        <div class="user-log-data-table-info" v-if="row.logType === 2">
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
              prop="logUser"
              label="用户"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="组织单位"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="logIp"
              label="登录IP"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="logName"
              label="操作行为"
              :show-overflow-tooltip="true"
              min-width="200px">
            </el-table-column>
            <el-table-column
              prop="logTime"
              label="操作时间"
              width="180px">
            </el-table-column>
            <el-table-column label="操作" width="110px">
              <template slot-scope="scope">
                <el-button size="mini" v-show="scope.row.status === '0'" round @click.native="closeAuth(scope.row)">关闭权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="user-log-data-table-info" v-else-if="row.logType === 1">
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
              prop="logUser"
              label="用户"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="组织单位"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="logTime"
              label="操作时间"
              width="200px">
            </el-table-column>
          </el-table>
        </div>
        <div class="user-log-data-table-pagination df df-jc-fe df-ai-c">
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
  </div>
</template>
<script>

export default {
  name: 'UserLogData',
  components: {},
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      logTime: [],
      form: {
        logUser: '',
        logName: '',
        logTimeStart: '',
        logTimeEnd: ''
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: []
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      // 参数初始化
      this.initParams()
      // 列表初始化
      this.initList()
    })
  },
  watch: {
    row: {
      handler () {
        if (this.row.dialog) {
          // 参数初始化
          this.initParams()
          // 列表初始化
          this.initList()
        }
      },
      deep: true
    }
  },
  methods: {
    // 初始化参数
    initParams () {
      this.logTime = this.row.logTime
      this.form.logName = this.row.logName
      this.form.logUser = this.row.logUser
    },
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
        url: '/safetyMonitor/userLogDataPageList',
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
    closeAuth (row) {
      let userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
      if (userInfo.userName === row.logUser) {
        this.$message.warning('不能关闭自己的权限! ')
        return
      }
      this.$confirm('您确定要关闭用户【' + row.logUser + '】的权限吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        this.$axios({
          url: '/user/userInactive?loginName=' + row.logUser,
          method: 'get'
        }).then(res => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          if (res.data.status === '0') {
            this.$message.success('请求成功！')
            this.getList()
          } else {
            this.$message.error('请求失败! ')
          }
        }).catch(res => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
        })
      }).catch(() => {
        this.$message.info('已取消！')
      })
    }
  }
}
</script>
<style scoped>
.user-log-data {
  position: absolute;
  width: 100%;
  height: 100%;
}
.user-log-data-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.user-log-data-table {
  position: relative;
  width: calc(100vw - 204px);
  height:100%;
  margin-left: 12px;
}
.user-log-data-table-input {
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
}

.user-log-data-table-input .el-form--inline .el-form-item {
  margin-bottom: unset;
  /*margin-right: unset;*/
}

.user-log-data-table-input .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.user-log-data-table-input .el-button{
  padding: 9px 20px !important;
}

.user-log-data-table-info {
  position: relative;
  width: 100%;
  height: 80%;
}

.user-log-data-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}
</style>
