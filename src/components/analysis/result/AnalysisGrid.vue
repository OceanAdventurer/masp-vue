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
        <!-- <el-button type="primary" class="m20" @click="exportGridTableData">导出</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AnalysisGrid',
  props: { // 属性定义
    activeTabName: { // 当前激活的tab名字
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

      tableAxisName: '名称',
      tableAxisTwoName: '',
      tableAxisValue: this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '事件数量' : '航班数量',
      tableAxisValueObj: {
        count: this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '事件数量' : '航班数量',
        sum: '求和',
        variance: '方差',
        stddev: '标准差',
        avg: '平均值',
        max: '最大值',
        min: '最小值',
        appx_median: '中位值'
        // groupBy: '分组' // 服务端报错，暂时隐藏
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initAnalysisGridTableData()
    })

    const that = this
    this.$bus.$on('exportGridTableDataHandle', () => { // 接收显示表格右侧dom事件
      that.exportGridTableData()
    })
  },
  destroyed () {
    this.$bus.$off('exportGridTableDataHandle') // 移除自定义事件监听器。
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    tableSizeChange (val) {
      this.tablePageSize = val
      this.tableCurrentPage = 1
      // this.tableCurrentChange(1)
    },
    tableCurrentChange (val) {
      console.log(`第 ${val} 页`)
      this.tableCurrentPage = val
    },
    initAnalysisGridTableData () {
      let tempParams = this.$store.state.analysisResultAllData.submitAnalysisParams

      if (this.$util.isNotEmptyObject(tempParams)) {
        if (!tempParams.isGuide === '1') { // 添加辅助线标识
          tempParams = this.$store.state.analysisResultAllData.sublineAnalysisParams
        }
        let axisOne = tempParams.axisOne
        let axisTwo = tempParams.axisTwo
        let axisThree = tempParams.axisThree
        if (this.$util.isDefine(axisOne) || this.$util.isDefine(axisTwo)) { // 存在一个轴或者两个轴
          let tempDataArr = []
          let tempData = this.$store.state.analysisResultAllData.barLinePieData
          if (tempParams.isGuide === '1') { // 添加辅助线标识
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
                    // zhCol: colStr + ' - 辅助线' + index
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

        if (this.$util.isDefine(axisOne) && this.$util.isDefine(axisTwo) && this.$util.isDefine(axisThree)) { // 存在三轴
          let tempDataArr = []
          let tempBarData = this.$store.state.analysisResultAllData.barThreeData
          if (!tempParams.isGuide === '1') { // 添加辅助线标识
            tempBarData = this.$store.state.analysisResultAllData.sublineBarThreeData
          }
          if (this.$util.isNotEmptyObject(tempBarData)) {
            let seriesDataArr = tempBarData.seriesData // 默认取第一个
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
    exportGridTableData () { // 导出表格数据
      let exportURL = '/export/exportTable' // exportTableGuide | exportTable
      if (this.analysisGridTableData.length <= 0) {
        this.$message({
          type: 'warning',
          message: '没有数据无法导出！'
        })
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在导出数据，请稍等！')
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (submitAnalysisParams.isGuide === '1') { // 添加辅助线标识
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
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        let contentDispositionStr = response.headers['content-disposition']
        let contentDispositionArr = contentDispositionStr.split('=')
        let fileName = contentDispositionArr[1] // 获取文件名字
        let blobType = response.headers['content-type'] // 获取类型
        let blob = new Blob([response.data], {type: blobType})
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        this.$message({
          message: '数据导出成功！',
          type: 'success'
        })
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
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
