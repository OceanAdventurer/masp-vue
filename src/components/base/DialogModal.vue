<style scoped>
.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 10px;
}
.task_center .clean_records i::before {
  color: #3d5077;
  margin: 0 2px;
  cursor: pointer;
}
.running-jobs {
  color: #8c939d;
  font-size: 12px;
}

.el-table__row {
  line-height: 20px;
  height: 20px;
}

.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 15px;
}

.el-table td,
.el-table th {
  padding: 10px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.dialog_content_list .el-table td,
.dialog_content_list .el-table th {
  padding: 0px;
}

.dialog_content_list .cell {
  height: 15px;
  line-height: 15px;
}
.el-table-column {
  width: 100%;
}
.headerFixedBtn {
  position: fixed;
  right: 140px;
}
/* 窗口高度大于800px */
@media screen and (min-height: 800px) {
  .headerFixedBtn {
    top:0px;
  }
}
/* 窗口高度小于800px */
@media screen and (max-height: 800px) {
  .headerFixedBtn {
    top: 0px;
  }
}
</style>
<style>
.task_center .el-dialog__body {
  padding: 8px 20px;
}
.task_center .el-dialog__body {
  height: 400px;
}
.task_center .el-tabs.el-tabs--top {
  height: 100%;
}
.task_center .el-tabs__content {
  height: calc(100% - 40px);
}
.task_center .el-table__body-wrapper {
  height: calc(100% - 45px);
  overflow: auto;
  /* height: calc(100% - 120px); */
}
/* 窗口高度小于800px */
/* @media screen and (max-height: 1000px) {
} */
</style>
<template>
  <div>
    <!--任务详情-->
    <!-- <div class="headerFixedBtn" @click="dialogVisible = true"> 去掉权限v-show="isAdmin"
      <el-button type="text" title="任务详情" is-dot style="height:44px;line-height:28px">
        <img src="../../assets/images/icon76.png" style="height:16px;width: 16px;">
      </el-button>
    </div> -->
    <el-dialog title="任务详情"  :close-on-click-modal="false" :visible.sync="dialogVisible" width="800px;" class='task_center'>
      <div style="position:absolute;top:65px;right: 18px;z-index: 1">
        <template>
          <el-input
            size="small"
            placeholder="请输入内容"
            v-model="keyWords"
            @keyup.enter.native="searchBtn()"
          >
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchBtn()">
            </i>
          </el-input>
        </template>
      </div>
      <template>
        <el-tabs value="analysisRunning" @tab-click="handleClick">
        <!-- <el-tabs value="analysisRunning" @tab-click="handleClick" style="min-height: 200px;"> -->
          <el-tab-pane label="正在分析" name="analysisRunning" style="padding-top: 5px">
            <template>
             <el-table
                v-loading="loading"
                :data="RunningJobs"
                style="width: 100%;margin-top: -39px;font-size: 9px;">
               <el-table-column style="width: 100%;">
               <div slot-scope="scope">
                  <span style="float: left;">{{scope.row.title}} </span>
                  <span style="position:absolute;left:50%;top:25%;transform: translate(-50%,-50%);"> {{scope.row.finishCount}}/{{scope.row.totalCount}} </span>
                  <span style="color:#588ee6;float: right;margin-right: 3.5%;">{{scope.row.jobStatusDetail}}</span>
                  <div style="width: 97%;float: left;">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="scope.row.source"
                      :color="scope.row.progressColor">
                    </el-progress>
                  </div>
                  <div style="width: 4.6%;float:right;margin-top:-4px;margin-right:-1.75%;display:flex">
                    <span v-if="scope.row.buttonStatus==='PAUSE'" style="margin-right:4px">
                      <el-button type="text" title="开启任务" style=" padding: 0px 0px;" @click="startJob(scope.row.id)">
                        <img src="../../assets/images/icon77.png"/>
                      </el-button>
                    </span>
                    <span v-else-if="scope.row.buttonStatus==='RUNNING' || scope.row.buttonStatus==='ACCEPT'" style="margin-right:4px">
                      <el-button type="text" title="暂停任务" style=" padding: 0px 0px;" @click="waitJob(scope.row.id)">
                        <img src="../../assets/images/icon79.png"/>
                      </el-button>
                    </span>
                      <el-button type="text" title="终止任务" style=" padding: 0px 0px;" @click="stopJob(scope.row.id)">
                      <img src="../../assets/images/icon78.png"/>
                    </el-button>
                    </div>
                  <span style="float: left;">{{scope.row.name}}</span> <span style="float: right;margin-right:1%;">{{scope.row.date}}</span>
                  </div>
                </el-table-column>
              </el-table>
            </template>
            <span v-if="runCountPage>0">
              <div class="block" style="float: right;margin-top: 6px;">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="getRunningPage"
                  :current-page="runPageNo"
                  :page-sizes="[3, 5, 10, 15, 20]"
                  :page-size="pageSize"
                  layout="sizes, prev, pager, next, total"
                  :total="runCountPage">
                </el-pagination>
              </div>
            </span>
          </el-tab-pane>
          <el-tab-pane label="历史分析" name="analysisRecords">
            <el-table
              v-loading="loading"
              :data="RecordsJobs"
              style="width: 100%;margin-top: -39px;font-size: 9px;">
              <el-table-column style="width: 100%;">
                <div slot-scope="scope">
                  <span style="float: left;">{{scope.row.title}} </span>
                  <span  style="position:absolute;left:50%;top:25%;transform: translate(-50%,-50%);"> {{scope.row.finishCount}}/{{scope.row.totalCount}} </span>
                  <span style="color:#588ee6;float: right;margin-right: 2%;">{{scope.row.jobStatusDetail}}</span>
                  <div style="width: 99%;float: left;">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="scope.row.source"
                      :color="scope.row.progressColor">
                    </el-progress>
                  </div>
                  <div style="width:1%;float: right; margin-top: -4px; ">
                     <span v-if="scope.row.buttonStatus==='FINISHED'||scope.row.buttonStatus==='KILLED'">
                      <el-button type="text" title="删除任务" style=" padding: 0px 0px;margin-left: 3px;" @click="deleteJob(scope.$index,RecordsJobs,scope.row.id)">
                      <img src="../../assets/images/icon71.png"/>
                    </el-button>
                    </span>
                  </div>
                  <span style="float: left;">{{scope.row.name}}</span>
                  <span style="float: right;margin-right:1%;">完成时间：{{scope.row.date}}&nbsp;&nbsp;耗时：{{scope.row.time}}</span>
                </div>
              </el-table-column>
            </el-table>
            <span v-if="recordCountPage>0">
              <div class="block" style="float: right;margin-top: 6px;">
                <el-pagination
                  background
                  @size-change="handleSizeChangeHistory"
                  @current-change="getRecordPage"
                  :current-page="recordPageNo"
                  :page-sizes="[3, 5, 10, 15, 20]"
                  :page-size="pageSize"
                  layout="sizes, prev, pager, next, total"
                  :total="recordCountPage">
                </el-pagination>
              </div>
            </span>
          </el-tab-pane>
          <el-tab-pane label="正在清洗" name="cleanRunning" style="padding-top: 5px">
            <template>
             <el-table
                v-loading="loading"
                :data="RunningCleanJobs"
                style="width: 100%;margin-top: -39px;font-size: 9px;">
               <el-table-column style="width: 100%;">
               <div slot-scope="scope">
                   <span style="float: left;">{{scope.row.title}} </span>
                   <span style="color:#588ee6;float: right;margin-right: 3.5%;">{{scope.row.jobStatusDetail}}</span>
                    <div style="width: 97%;float: left;">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="15"
                        :percentage="scope.row.percent"
                        :color="scope.row.progressColor">
                      </el-progress>
                    </div>
                    <span style="float: right;margin-right:1%;">{{scope.row.date}}</span>
                  </div>
                </el-table-column>
              </el-table>
            </template>
            <span v-if="runCountPage>0">
              <div class="block" style="float: right;margin-top: 6px;">
                <el-pagination
                  background
                  @size-change="handleSizeChangeClean"
                  @current-change="getRunningPage"
                  :current-page="runPageNo"
                  :page-sizes="[3, 5, 10, 15, 20]"
                  :page-size="pageSize"
                  layout="sizes, prev, pager, next, total"
                  :total="runCountPage">
      </el-pagination>
              </div>
            </span>
          </el-tab-pane>
          <el-tab-pane label="历史清洗" name="cleanRecords">
            <el-table
              v-loading="loading"
              :data="RecordsCleanJobs"
              style="width: 100%;margin-top: -39px;font-size: 9px;">
              <el-table-column style="width: 100%;">
                <div slot-scope="scope" class='clean_records'>
                  <span style="float: left;">{{scope.row.title}} </span>
                  <span style="color:#588ee6;float: right;margin-right: 28px;">{{scope.row.jobStatusDetail}}</span>
                  <div style="width: calc(100% - 22px);float: left;">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="scope.row.percent"
                      :color="scope.row.progressColor">
                    </el-progress>
                  </div>
                  <div style="width:22px;float:right;margin-top:-4px;">
                     <span style='display:flex'>
                      <i class='el-icon-download' @click='downloadCleanedCSV(scope.row.id)'></i>
                      <el-button type="text" title="删除任务" style=" padding: 0px 0px;margin-left: 2px;" @click="deleteJob(scope.$index,RecordsJobs,scope.row.id, 'cleanRecords')">
                      <img src="../../assets/images/icon71.png"/>
                    </el-button>
                    </span>
                  </div>
                  <span style="float: right;margin-right:1%;">完成时间：{{scope.row.date}}&nbsp;&nbsp;耗时：{{scope.row.time}}</span>
                </div>
              </el-table-column>
            </el-table>
            <span v-if="recordCountPage>0">
              <div class="block" style="float: right;margin-top: 6px;">
                <el-pagination
                  background
                  @size-change="handleSizeChangeCleanHistory"
                  @current-change="getRecordCleanPage"
                  :current-page="recordPageNo"
                  :page-sizes="[3, 5, 10, 15, 20]"
                  :page-size="pageSize"
                  layout="sizes, prev, pager, next, total"
                  :total="recordCountPage">
                </el-pagination>
              </div>
            </span>
          </el-tab-pane>
        </el-tabs>
      </template>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">关  闭</el-button>
       </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      keyWords: '',
      tabName: 'analysisRunning', // 点击搜索按钮获取 tab页签的name 判断搜索那个接口，默认选择running /records
      loading: false,
      runLoading: false,
      runCleanLoading: false,
      pageSize: 5,
      runPageNo: 1,
      nowPageNo: 1,
      runCountPage: 0,
      RunningJobs: [],
      RunningCleanJobs: [],
      recordPageNo: 1,
      recordCountPage: 0,
      RecordsJobs: [],
      RecordsCleanJobs: [],
      jobsIds: '', // 存储任务id  1,2,3
      isAdmin: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.tabName === 'analysisRunning') {
        this.getRunningPage(1)
      } else if (this.tabName === 'analysisRecords') {
        this.getRecordPage(1)
      } else if (this.tabName === 'cleanRunning') {
        this.getRunningCleanPage(1)
      } else {
        this.getFinishedJobs(1, 'cleanRecords')
      }
      // 每隔一秒执行一次
      setInterval(this.refreshJobStatus, 3000)
    })

    const that = this
    this.$bus.$on('updateDialogModalBtn', () => { // 接收显示表格右侧dom事件
      that.isAdmin = that.$store.getters.userInfo.isAdmin
    })
    this.$bus.$on('task_list', () => {
      this.dialogVisible = true
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('analysisAddTab') // 移除自定义事件监听器。
  },
  methods: {
    // ajax 定时刷新状态
    refreshJobStatus () {
      // this.runLoading 刷新页面时，如果 该进程正在执行则不刷新，未执行则执行刷新
      if (this.dialogVisible && this.tabName === 'analysisRunning' && this.runLoading) {
        // 如果弹框开启 则执行刷新功能
        this.getRunningJobj(this.runPageNo)
      } else if (this.dialogVisible && this.tabName === 'cleanRunning' && this.runCleanLoading) {
        this.getRunningJobj(this.runPageNo, 'cleanRunning')
      }
    },
    searchBtn () {
      if (this.tabName === 'analysisRunning') {
        this.getRunningPage(1)
      } else if (this.tabName === 'analysisRecords') {
        this.getFinishedJobs(1)
      } else if (this.tabName === 'cleanRunning') {
        this.getRunningCleanPage(1)
      } else {
        this.getFinishedJobs(1, 'cleanRecords')
      }
    },
    // 点击页签，给tab赋值
    handleClick (tab, event) {
      this.tabName = tab.name
      this.pageSize = 5
      if (this.tabName === 'analysisRunning') {
        this.getRunningPage(1)
      } else if ((this.tabName === 'analysisRecords')) {
        this.getFinishedJobs(1)
      } else if (this.tabName === 'cleanRunning') {
        this.getRunningCleanPage(1)
      } else {
        this.getFinishedJobs(1, 'cleanRecords')
      }
    },
    downloadCleanedCSV (id) { // 下载清洗好的csv文件
      let params = id
      let url = '/DSAP/job/downloadCleandCSV'
      let form = document.createElement('form')
      form.style.display = 'none'
      form.action = url
      form.method = 'get'
      form.target = '_blank'
      document.body.appendChild(form)
      form.innerHTML = '<input name="id" id="downloadCleanedCSV" value="' + params + '" />'
      form.submit()
      form.remove()
    },
    // 改变分析进行的 页码大小
    handleSizeChange (val) {
      this.pageSize = val
      this.getRunningPage(1)
    },
    // 改变清洗进行的 页码大小
    handleSizeChangeClean (val) {
      this.pageSize = val
      this.getRunningCleanPage(1)
    },
    // 改变分析历史的页面大小
    handleSizeChangeHistory (val) {
      this.pageSize = val
      this.getRecordPage(1)
    },
    // 改变清洗历史的页面大小
    handleSizeChangeCleanHistory (val) {
      console.log(val, 'val---test')
      this.pageSize = val
      this.getRecordPage(1, 'cleanRecords')
    },
    getRunningPage (val) {
      this.runLoading = false // 表示暂时不执行定时任务等返回true在执行定时任务
      this.loading = true
      this.runPageNo = val
      setTimeout(this.getData(val), 2000)
    },
    getRunningCleanPage (val) {
      this.runCleanLoading = false // 表示暂时不执行定时任务等返回true在执行定时任务
      this.loading = true
      this.runPageNo = val
      setTimeout(this.getData(val, 'runningCleanJob'), 2000)
    },
    getRunningJobj (pageNo, type) {
      this.getData(pageNo, type)
    },
    getData (page, type) {
      let url = type ? '/job/getRunningCleanJobs' : '/job/getRunningJobs'
      this.jobsIds = ''
      this.$axios
        .get(url, {
          params: {
            searchContent: this.keyWords,
            pageNo: page,
            pageSize: this.pageSize
          }
        })
        .then(response => {
          this.loading = false
          let data = response.data.content
          this.RunningJobs = []
          this.RunningCleanJobs = []
          this.runCountPage = response.data.recordCount
          this.runPageNo = response.data.pageNo
          // console.log(this.runPageNo, 'runPageNo---test')
          for (var i = 0; i < data.length; i++) {
            let source = 0
            if (data[i].JOB_TOTAL_COUNT > 0) {
              var num = data[i].JOB_CURRENT_FINISHED_COUNT / data[i].JOB_TOTAL_COUNT * 100
              var num1 = parseFloat(num).toFixed(3)
              source = num1.substring(0, num1.toString().length - 2)
            }
            let color = ''
            if (this.jobsIds === '' || this.jobsIds === null) {
              this.jobsIds = data[i].ID
            } else {
              this.jobsIds += ',' + data[i].ID
            }
            if (data[i].JOB_STATUS === 'RUNNING' || data[i].JOB_STATUS === 'ACCEPT' || data[i].STATUS === '运行中') {
              color = '#588ee6'
            } else {
              color = '#ececec'
            }
            if (type) {
              this.RunningCleanJobs.push({
                id: data[i].ID,
                title: data[i].NAME,
                name: data[i].NAME,
                jobStatusDetail: data[i].STATUS_DETAIL,
                date: data[i].START_TIME,
                percent: data[i].PERCENT,
                buttonStatus: data[i].STATUS,
                progressColor: color
              })
            } else {
              this.RunningJobs.push({
                id: data[i].ID,
                title: data[i].JOB_NAME,
                name: data[i].JOB_CREATE_USER,
                jobStatusDetail: data[i].JOB_STATUS_DETAIL,
                date: data[i].JOB_START_TIME,
                totalCount: data[i].JOB_TOTAL_COUNT,
                finishCount: data[i].JOB_CURRENT_FINISHED_COUNT,
                buttonStatus: data[i].JOB_STATUS,
                progressColor: color,
                source: source * 1
              })
            }
          }
          this.runLoading = true // 执行完成之后才可以执行定时任务
          this.runCleanLoading = true
        }).catch(response => {
        this.loading = false
        // this.$message.error('数据加载失败!')
      })
    },
    getRecordPage (val, type) {
      this.getFinishedJobs(val, type)
    },
    getRecordCleanPage (val) {
      this.getFinishedJobs(val, 'cleanRecords')
    },
    getFinishedJobs (pageNo, type) {
      if (this.loading === false) {
        this.recordPageNo = pageNo
        this.loading = true
        let url = type ? '/job/getFinishedCleanJobs' : '/job/getFinishedJobs'
        var timestamp = new Date().getTime()
        this.$axios.get(url, {
          params: {
            searchContent: this.keyWords,
            pageNo: pageNo,
            pageSize: this.pageSize,
            timestamp: timestamp
          }
        })
        .then(response => {
          this.loading = false
          let data = response.data.content
          this.recordCountPage = response.data.recordCount
          this.RecordsJobs = []
          this.RecordsCleanJobs = []
          for (var i = 0; i < data.length; i++) {
            let source = 0
            if (data[i].JOB_TOTAL_COUNT > 0) {
              var num = data[i].JOB_CURRENT_FINISHED_COUNT / data[i].JOB_TOTAL_COUNT * 100
              var num1 = parseFloat(num).toFixed(3)
              source = num1.substring(0, num1.toString().length - 2)
            }

            let color = '' // '#588ee6'

            if (data[i].JOB_STATUS === 'FINISHED' || data[i].JOB_STATUS === 'KILLED' || data[i].PERCENT === 100) {
              color = '#588ee6'
            } else {
              color = '#ececec'
            }
            let time = ''
            let finishDate = data[i].END_TIME || data[i].JOB_FINISH_TIME
            let startDate = data[i].START_TIME || data[i].JOB_START_TIME

            var d1 = new Date(finishDate)
            var d2 = new Date(startDate)

            var t = (d1.getTime() - d2.getTime()) / 1000
            if (t > 60) {
              time = parseInt(t / 60) + '分' + t % 60 + '秒'
            } else {
              time = t + '秒'
            }
            if (type) {
              this.RecordsCleanJobs.push({
                id: data[i].ID,
                title: data[i].NAME,
                name: data[i].NAME,
                jobStatusDetail: data[i].STATUS_DETAIL,
                date: data[i].END_TIME,
                totalCount: data[i].JOB_TOTAL_COUNT,
                percent: data[i].PERCENT,
                progressColor: color,
                time: time
              })
            } else {
              this.RecordsJobs.push({
                id: data[i].ID,
                title: data[i].JOB_NAME,
                name: data[i].JOB_CREATE_USER,
                jobStatusDetail: data[i].JOB_STATUS_DETAIL,
                date: data[i].JOB_FINISH_TIME,
                totalCount: data[i].JOB_TOTAL_COUNT,
                finishCount: data[i].JOB_CURRENT_FINISHED_COUNT,
                buttonStatus: data[i].JOB_STATUS,
                progressColor: color,
                source: source * 1,
                time: time
              })
            }
          }
        }).catch(response => {
          // this.$message.error('数据加载失败!')
          this.loading = false
        })
      }
    },
    startJob (val) {
      this.$axios
        .get('/job/resumeJob', {
          params: {
            jobId: val
          }
        })
        .then(response => {
          var data = response.data
          if (data.status === '0') {
            // 修改页面按钮状态
            this.$message({
              message: '开启成功',
              type: 'success'
            })
          }
        })
    },
    waitJob (val) {
      this.$axios
        .get('/job/pauseJob', {
          params: {
            jobId: val
          }
        })
        .then(response => {
          var data = response.data
          if (data.status === '0') {
            // 修改页面按钮状态
            this.$message({
              message: '暂停成功',
              type: 'success'
            })
          }
        })
    },
    stopJob (val) {
      this.$confirm('确定终止服务？')
        .then(_ => {
          this.$axios
            .get('/job/killJob', {
              params: {
                jobId: val
              }
            })
            .then(response => {
              var data = response.data
              if (data.status === '0') {
                // 修改页面按钮状态
                this.$message({
                  message: '终止成功',
                  type: 'success'
                })
              }
            })
        })
        .catch(_ => {})
    },
    deleteJob (index, rows, val, type) {
      let url = type ? '/job/deleteCleanJob' : '/job/deleteJob'
      this.$confirm('确定删除任务？')
        .then(_ => {
          this.$axios
            .get(url, {
              params: {
                jobId: val
              }
            })
            .then(response => {
              var data = response.data
              if (data.status === '0') {
                // 页面删除行
                rows.splice(index, 1)
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getFinishedJobs(this.recordPageNo, type) // 重新加载该页面的数据
              }
            })
        })
        .catch(_ => {})
    }
  }
}
</script>
