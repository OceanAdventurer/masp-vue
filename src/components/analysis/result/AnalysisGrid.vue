<template>
  <div class="pos-r w100 h100 df df-fd-r df-f1">
    <div class="df df-fd-c df-f1 w100">
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        :data="analysisGridTableData.slice((tableCurrentPage-1)*tablePageSize,tableCurrentPage*tablePageSize)"
        height="100%"
        style="width: 100%;"
        highlight-current-row
        border
        v-show="showGuide === 1"
        :header-row-class-name="headerRowClassName"
        :row-class-name="tableRowClassName">
        <el-table-column prop="name" :label="tableAxisName" width="300" align="center"></el-table-column>
        <el-table-column v-if="tableAxisTwoName" prop="nameTwo" :label="tableAxisTwoName" width="300" align="center"></el-table-column>
        <el-table-column prop="value" :label="tableAxisValue" width="auto" align="left"></el-table-column>
      </el-table>

      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        :data="analysisGridTableData.slice((tableCurrentPage-1)*tablePageSize,tableCurrentPage*tablePageSize)"
        height="100%"
        style="width: 100%;"
        highlight-current-row
        border
        v-show="showGuide === 2"
        :header-row-class-name="headerRowClassName"
        :row-class-name="tableRowClassName">
        <el-table-column
          v-for="(col, index) in tableAxisData"
          :key="index"
          :prop="col.enCol"
          :label="col.zhCol"
          width="auto">
        </el-table-column>
      </el-table>

      <div class="df df-jc-fe df-ai-c" style="height:10%">
        <el-pagination
          background
          @size-change="tableSizeChange"
          @current-change="tableCurrentChange"
          @prev-click="tableCurrentChange"
          @next-click="tableCurrentChange"
          :current-page="tableCurrentPage"
          :page-sizes="[100, 150, 200, 250]"
          :page-size="tablePageSize"
          layout="sizes, prev, pager, next, total, jumper"
          :total="analysisGridTableData.length">
        </el-pagination>
        <!-- <el-button type="primary" class="m20" @click="exportGridTableData">??????</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AnalysisGrid',
  props: { // ????????????
    activeTabName: { // ???????????????tab??????
      type: String
    }
  },
  data () {
    return {
      analysisGridTableData: [],
      tableCurrentPage: 1,
      tablePageCount: 0,
      tablePageSize: 100,

      showGuide: 1,
      tableAxisData: [],

      tableAxisName: '??????',
      tableAxisTwoName: '',
      tableAxisValue: this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '????????????' : '????????????',
      tableAxisValueObj: {
        count: this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '????????????' : '????????????',
        sum: '??????',
        variance: '??????',
        stddev: '?????????',
        avg: '?????????',
        max: '?????????',
        min: '?????????',
        appx_median: '?????????'
        // groupBy: '??????' // ??????????????????????????????
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initAnalysisGridTableData()
    })

    const that = this
    this.$bus.$on('exportGridTableDataHandle', () => { // ????????????????????????dom??????
      that.exportGridTableData()
    })
  },
  destroyed () {
    this.$bus.$off('exportGridTableDataHandle') // ?????????????????????????????????
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // ??????????????????
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // ???????????????
      return 'table-row-class-name'
    },
    tableSizeChange (val) {
      this.tablePageSize = val
      this.tableCurrentPage = 1
      // this.tableCurrentChange(1)
    },
    tableCurrentChange (val) {
      console.log(`??? ${val} ???`)
      this.tableCurrentPage = val
    },
    initAnalysisGridTableData () {
      let tempParams = this.$store.state.analysisResultAllData.submitAnalysisParams

      if (this.$util.isNotEmptyObject(tempParams)) {
        if (!tempParams.isGuide === '1') { // ?????????????????????
          tempParams = this.$store.state.analysisResultAllData.sublineAnalysisParams
        }
        let axisOne = tempParams.axisOne
        let axisTwo = tempParams.axisTwo
        let axisThree = tempParams.axisThree
        if (this.$util.isDefine(axisOne) || this.$util.isDefine(axisTwo)) { // ??????????????????????????????
          let tempDataArr = []
          let tempData = this.$store.state.analysisResultAllData.barLinePieData
          if (tempParams.isGuide === '1') { // ?????????????????????
            this.showGuide = 2
            tempData = this.$store.state.analysisResultAllData.sublineBarLinePieData

            let xAxisDataArr = tempData.xAxisData
            let seriesDataArr = tempData.seriesData
            let colData = []
            let colStr = this.tableAxisValueObj[tempParams.twoAggregation]

            if (xAxisDataArr && xAxisDataArr.length > 0) {
              colData.push({
                enCol: 'xName',
                zhCol: tempData.xAxisName
              })
              colData.push({
                enCol: 'value',
                zhCol: colStr
              })
              let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
              let tempSublineNameColor = submitAnalysisParams.sublineNameColor
              tempSublineNameColor.shift()
              console.log(JSON.stringify(tempSublineNameColor))
              seriesDataArr.forEach((item, index) => {
                if (index > 0) {
                  colData.push({
                    enCol: 'value' + index,
                    // zhCol: colStr + ' - ?????????' + index
                    zhCol: colStr + ' - ' + tempSublineNameColor[index - 1].sublineName
                  })
                }
              })

              xAxisDataArr.forEach((item, index) => {
                let tObj = {
                  xName: item,
                  value: seriesDataArr[0][index]
                  // value1: seriesDataArr[1][index]
                }
                seriesDataArr.forEach((jobj, j) => {
                  if (j > 0) {
                    let ss = 'value' + j
                    tObj[ss] = jobj[index]
                  }
                })
                tempDataArr.push(tObj)
              })

              this.tableAxisData = colData
              this.analysisGridTableData = tempDataArr

              this.tablePageCount = this.analysisGridTableData.length
            }
          } else {
            this.showGuide = 1

            if (this.$util.isNotEmptyObject(tempData)) {
              let pieChartDataArr = tempData.pieChartData
              let xAxisName = tempData.xAxisName
              if (pieChartDataArr.length > 0) {
                pieChartDataArr.forEach((item, index) => {
                  if (this.$util.isDefine(item.value) && this.$util.isDefine(item.name)) {
                    tempDataArr.push({name: item.name, value: item.value})
                  } else if (this.$util.isDefine(item.name)) {
                    tempDataArr.push({name: item.name, value: '-'})
                  }
                })
                this.analysisGridTableData = tempDataArr
                this.tableAxisName = xAxisName
                this.tableAxisValue = this.tableAxisValueObj[tempParams.twoAggregation]

                this.tablePageCount = this.analysisGridTableData.length
              }
            }
          }
        }

        if (this.$util.isDefine(axisOne) && this.$util.isDefine(axisTwo) && this.$util.isDefine(axisThree)) { // ????????????
          let tempDataArr = []
          let tempBarData = this.$store.state.analysisResultAllData.barThreeData
          if (!tempParams.isGuide === '1') { // ?????????????????????
            tempBarData = this.$store.state.analysisResultAllData.sublineBarThreeData
          }
          if (this.$util.isNotEmptyObject(tempBarData)) {
            let seriesDataArr = tempBarData.seriesData // ??????????????????
            let xAxisName = tempBarData.xAxisName
            let yAxisName = tempBarData.yAxisName
            if (seriesDataArr.length > 0) {
              seriesDataArr.forEach((item, index) => {
                // let _val = isNaN(parseInt(item[2])) ? item[2] : parseInt(item[2])
                // tempDataArr.push({name: item[0], nameTwo: item[1], value: _val})
                if (this.$util.isDefine(item[2])) {
                  tempDataArr.push({name: item[0], nameTwo: item[1], value: item[2]})
                } else {
                  tempDataArr.push({name: item[0], nameTwo: item[1], value: '-'})
                }
              })
              this.analysisGridTableData = tempDataArr
              this.tableAxisName = xAxisName
              this.tableAxisTwoName = yAxisName
              this.tableAxisValue = this.tableAxisValueObj[tempParams.twoAggregation]

              this.tablePageCount = this.analysisGridTableData.length
            }
          }
        }
      }
    },
    exportGridTableData () { // ??????????????????
      let exportURL = '/export/exportTable' // exportTableGuide | exportTable
      if (this.analysisGridTableData.length <= 0) {
        this.$message({
          type: 'warning',
          message: '???????????????????????????'
        })
        return false
      }
      this.$store.commit('SHOW_LOADING', '?????????????????????????????????')
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (submitAnalysisParams.isGuide === '1') { // ?????????????????????
        submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
        submitAnalysisParams.filter = []
        submitAnalysisParams.isGuide = '1'
        submitAnalysisParams['filterList'] = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams)).filterList
        submitAnalysisParams['sublineNameColor'] = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams)).sublineNameColor
        submitAnalysisParams['tableIndex'] = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams)).tableIndex

        exportURL = '/export/exportTableGuide'
      }
      submitAnalysisParams.tablePageSize = 0
      submitAnalysisParams.tablePageNum = 0
      submitAnalysisParams.pageNo = 0

      if (submitAnalysisParams.isGuide === '1') {
        submitAnalysisParams.isGuide = '1'
      } else {
        submitAnalysisParams.isGuide = ''
      }
      console.log('exportTable@param~~~:', JSON.stringify(submitAnalysisParams))
      this.$axios({
        url: exportURL,
        method: 'post',
        data: JSON.stringify(submitAnalysisParams),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        responseType: 'blob'
      }).then(response => {
        console.log('exportTable~~~:', response)
        this.$store.commit('HIDE_LOADING', '??????????????????') // ???????????????
        let contentDispositionStr = response.headers['content-disposition']
        let contentDispositionArr = contentDispositionStr.split('=')
        let fileName = contentDispositionArr[1] // ??????????????????
        let blobType = response.headers['content-type'] // ????????????
        let blob = new Blob([response.data], {type: blobType})
        if ('download' in document.createElement('a')) { // ???IE??????
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // ??????URL ??????
          document.body.removeChild(elink)
        } else { // IE10+??????
          navigator.msSaveBlob(blob, fileName)
        }
        this.$message({
          message: '?????????????????????',
          type: 'success'
        })
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '???????????????!')
        this.$message.error('???????????????????????????????????????')
      })
    }
  }
}
</script>
<style scoped>
.df >>> .el-pagination__editor.el-input {
  vertical-align: top;
}
</style>
