<template>
  <div class="pos-a w100 h100 df df-fd-c">
    <div class="df df-f1" style="padding: 10px 10px 0px;">
       <el-tabs v-model="activeName" @tab-click="handleClick" class="completeData">
        <el-tab-pane label="月报" name="first">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin: 10px 0px">
            <!-- <el-form-item label="年">
              <el-date-picker
                v-model="formInline.year"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="月">
              <el-date-picker
                v-model="formInline.month"
                type="monthrange"
                size="small"
                :clearable=false
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitMonth" size="small">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="monthData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :header-row-class-name="headerRowClassName"
            :row-class-name="tableRowClassName"
            height="calc(100% - 100px)"
            width="80%"
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            border>
            <el-table-column prop="date" label="月份"></el-table-column>
            <el-table-column prop="valids" label="有效航班数"></el-table-column>
            <el-table-column prop="errors" label="异常航班数">
              <template slot-scope="scope">
                <span @click="unmatchedFlight(scope.row)" style="color: rgb(24, 144, 255);text-decoration:underline;cursor:pointer">{{ scope.row.errors }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="flights" label="全航班数"></el-table-column>
            <el-table-column prop="percent" label="匹配率"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="日报" name="second">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin: 10px 0px">
            <el-form-item label="日">
              <el-date-picker
                v-model="formInline.day"
                type="daterange"
                size="small"
                :clearable=false
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitDay" size="small">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="monthData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :header-row-class-name="headerRowClassName"
            :row-class-name="tableRowClassName"
            height="calc(100% - 100px)"
            width="80%"
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            border>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="valids" label="有效航班数"></el-table-column>
             <el-table-column prop="errors" label="异常航班数">
              <template slot-scope="scope">
                <span @click="unmatchedFlightDay(scope.row)" style="color: rgb(24, 144, 255);text-decoration:underline;cursor:pointer">{{ scope.row.errors }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="flights" label="全航班数"></el-table-column>
            <el-table-column prop="percent" label="匹配率"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="data-clean-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 20, 30, 50]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next, total"
        :total="monthData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagesize: 15,
      referenceData: [],
      monthData: [],
      currentPage: 1,
      activeName: 'first',
      formInline: {
        month: [],
        day: []
      }
    }
  },
  components: {
  },
  methods: {
    unmatchedFlight (row) {
      console.log('未匹配航班')
      let nowDate = new Date(row.date.slice(0, 4), row.date.slice(5, 7), 0)
      const day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
        .getDate()
      let errorDate = [row.date + '-01', row.date + '-' + day]
      console.log(errorDate)
      let param = {
        // enName: 'dataTable_unmatchedFlights_menu',
        count: 0,
        enName: 'dataTable_unmatchedFlights_menu',
        isClosable: true,
        parent: 'dataTable_unmatchedFlights',
        zhName: '未匹配航班',
        errorDate: errorDate
      }
      // console.log(this.$bus)
      this.$bus.$emit('dataTableAddTab', param)
    },
    unmatchedFlightDay (row) {
      console.log(row)
      // let nowDate = new Date(row.date.slice(0, 4), row.date.slice(5, 7), 0)
      // const day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
      //   .getDate()
      let errorDate = [row.date, row.date]
      // console.log(errorDate)
      let param = {
        // enName: 'dataTable_unmatchedFlights_menu',
        count: 0,
        enName: 'dataTable_unmatchedFlights_menu',
        isClosable: true,
        parent: 'dataTable_unmatchedFlights',
        zhName: '未匹配航班',
        errorDate: errorDate
      }
      // console.log(this.$bus)
      this.$bus.$emit('dataTableAddTab', param)
    },
    handleClick (tab, event) {
        console.log(tab, event)
        if (tab.name === 'first') {
          this.onSubmitMonth()
        } else {
          this.onSubmitDay()
        }
      },
      onSubmitDay () {
        this.currentPage = 1
        let params = {mode: 'day'}
        if (this.formInline.day) {
          params = {
            mode: 'day',
            dateStart: this.formInline.day[0],
            dateEnd: this.formInline.day[1]
          }
        }
        this.$store.commit('SHOW_LOADING', '拼命加载中！')
        this.$axios({
          url: '/etl/completionPercent',
          method: 'get',
          params: params
        }).then(res => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          console.log(res)
          if (res.status === 200) {
            this.monthData = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('加载数据失败！')
        })
      },
      onSubmitMonth () {
        this.currentPage = 1
        console.log('submit!')
        console.log(this.formInline.month)
        let params = {mode: 'month'}
        if (this.formInline.month) {
          let year = this.formInline.month[1].slice(0, 4)
          let month = this.formInline.month[1].slice(5, 7)
          let lastdate = new Date(year, month, 0)
          params = {
            mode: 'month',
            dateStart: this.formInline.month[0],
            dateEnd: this.formInline.month[1].slice(0, 8) + lastdate.getDate()
          }
        }
        this.$store.commit('SHOW_LOADING', '拼命加载中！')
        this.$axios({
          url: '/etl/completionPercent',
          method: 'get',
          params: params
        }).then(res => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          console.log(res)
          if (res.status === 200) {
            this.monthData = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('加载数据失败！')
        })
      },
    setMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj['dataTable_data_statics'] = true
      if (this.$util.dataTableEditAuthority) {
        disabledMenuObj['dataTable_data_statics'] = false
      } else {
        disabledMenuObj['dataTable_data_statics'] = true
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'dataTable_dataStatic', hideMenuObj, disabledMenuObj)
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    readData () {
      this.$store.commit('SHOW_LOADING', '拼命加载中！')
      this.$axios({
        url: '/etl/data/statics',
        method: 'get'
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.referenceData = response.data
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('加载数据失败！')
      })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleSizeChange (size) {
      this.pagesize = size
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.readData()
      //获得当前年月日
      var nowDate = new Date()
      var year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1
      var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
        .getDate()
      var dateStr = year + '-' + month + '-' + day
      let dataBegin = year + '-01-01'
      // console.log(dateStr)
      this.formInline.month = [dataBegin, dateStr]
      this.formInline.day = [dataBegin, dateStr]
      this.onSubmitMonth()
    })
    // const that = this
    // this.$bus.$on('reloadDataCleanData', () => {
    //   that.readData()
    // })
  }
}
</script>
<style scoped>
.data-clean-pagination {
    position: relative;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
}
.completeData {
  width: 100%;
}
</style>
<style>
.completeData .el-tabs__content {
  height: 100%;
}
.completeData .el-form-item {
  margin-bottom: 0px !important;
}
</style>
