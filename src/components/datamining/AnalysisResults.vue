<style scoped>
.tab_file_new {
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 78vh;
  width: 100%;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  color: #fff;
  background-color: #2A436F;
  border-color: #2A436F;
  box-shadow: -1px 0 0 0 #2A436F;
}
.el-radio-button:correl-child .el-radio-button__inner {
  border-left: 1px solid #DCDFE6;
  border-radius: 4px 0 0 4px;
  box-shadow: none !important;
}
.export {
  position: absolute;
  right: 15px;
  top: 5px;
}
</style>
<!-- 写入公共样式文件中并引入到main.js中-->
<style>
 .el-tabs__content {
  overflow: auto !important;
}
 .el-table__footer-wrapper, .el-table__header-wrapper {
   overflow: auto !important;
 }
.el-tabs__nav-scroll {
  overflow:auto !important;
}
.cm-data-detail .el-table {
  height: 74vh !important;
}
.el-select-dropdown {
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px 0;
  width: 19%;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  color: #fff;
  background-color: #2A436F;
  border-color: #2A436F;
  box-shadow: -1px 0 0 0 #2A436F;
}
.el-radio-button:correl-child .el-radio-button__inner {
  border-left: 1px solid #DCDFE6;
  border-radius: 4px 0 0 4px;
  box-shadow: none !important;
}
.el-form-item {
  margin-bottom: 0;
}
.el-table::before {
  height: 0px;
}
.gccsm:hover>select {
  display: block;
}
td .el-input__inner {
  border: none;
}
td [class*=" el-icon-"], [class^=el-icon-] {
  /* font-family: element-icons!important; */
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<template>
  <div class="tab_file_new">
    <el-form ref="form" style="width: 98%;height: 98%; margin: 0 auto;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="相关性结果" name="correl">
          <el-table v-if='changeTable' :data="xgxDataTableList" highlight-current-row :header-row-style="headerRowStyle" :header-cell-style="{height:'38px',padding:'5px'}"
                     :row-class-name="tableRowClassName"
                    :row-style="{height:'38px'}" :cell-style="{padding:'5px'}">
            <el-table-column  v-for="(item,index) in xgxClounms.slice(0,1)" :prop="item.prop" :label="item.label" :key="index">
              <template slot="header" slot-scope="scope">
                <el-button
                  size="mini" @click="changeTable=!changeTable"
                 >切换</el-button>
              </template>
            </el-table-column>
            <template v-if="xgxClounms.length > 1">
              <el-table-column  v-for="(item,index) in xgxClounms.slice(1)" :prop="item.prop" :label="item.label" :key="index"></el-table-column>
            </template>
          </el-table>
          <AnalyResultHeatMap v-else :xgxClounms="xgxClounms" :xgxDataTableList="xgxDataTableList" @changeTable="val => changeTable=val"></AnalyResultHeatMap>
        </el-tab-pane>
        <el-tab-pane label="数据统计" name="statistics">
          <el-table :data="statisticsTableList" highlight-current-row :header-row-style="headerRowStyle" :header-cell-style="{height:'38px',padding:'5px'}"
                   :row-class-name="tableRowClassName"
                    :row-style="{height:'38px'}" :cell-style="{padding:'5px'}">
            <el-table-column  v-for="(item,index) in statisticsClounms" :prop="item.prop" :label="item.label" :key="index"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="数据详情" name="detail" class="cm-data-detail">
          <el-table :data="detailTableList" highlight-current-row :header-row-style="headerRowStyle" :header-cell-style="{height:'38px',padding:'5px'}"
                    :row-class-name="tableRowClassName"  height="500px"
                    :row-style="{height:'38px'}" :cell-style="{padding:'5px'}">
            <el-table-column  v-for="(item,index) in detailClounms" :prop="item.prop" :label="item.label" :key="index"></el-table-column>
          </el-table>
          <div class="content_page_pag" style="display:flex;flex-direction:row;align-items: center;float: right;margin-top: 10px;" v-show="detailTableList && detailTableList.length > 0">
            <el-pagination
              background
              @size-change="changePageSize"
              @current-change="getDataDetail"
              :current-page="pageNo"
              :page-sizes="[20, 50, 100,150,200]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next,total, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="export" v-if="activeName === 'correl' || activeName === 'statistics'">
      <el-button
        size="mini"
        @click="handleExport"
      >导出</el-button>
    </div>
  </div>
</template>
<script>
import AnalyResultHeatMap from './AnalyResultHeatMap.vue'
export default {
  components: {
    AnalyResultHeatMap
  },
  data () {
    return {
      dataConfigTableData: [],
      filterConfigTableData: [],
      flightFilterData: {},
      xgxDataTableList: [],
      statisticsTableList: [],
      detailTableList: [],
      xgxClounms: [{prop: '', label: ''}],
      statisticsClounms: [{prop: '', label: ''}],
      detailClounms: [{prop: '', label: ''}],
      activeName: 'correl',
      pageNo: 1,
      pageSize: 20,
      totalCount: 0,
      headerRowStyle: {
        'color': '#2A436F',
        'background': '#F9F9F9'
      },
      changeTable: true
    }
  },
  watch: {
    activeName () {
      if (this.activeName === 'statistics') {
        this.statistics()
      } else if (this.activeName === 'detail') {
        this.pageSize = 20
        this.getDataDetail(1)
      } else {
        this.getcorrel()
      }
    }
  },
  props: ['data', 'filterData', 'flightFilter'],
  mounted () {
    this.dataConfigTableData = this.data
    this.filterConfigTableData = this.filterData
    this.flightFilterData = this.flightFilter
    this.getcorrel()
  },
  methods: {
    handleExport () {
      let urlParam = 'export/exportCorrelExcel'
      this.$store.commit('SHOW_LOADING', '正在导出数据，请稍等！')
      let twoDimensionIds = []
      let clounms = []
      let obj = {prop: 'id', label: ''}
      clounms.push(obj)
      for (let i = 0; i < this.dataConfigTableData.length; i++) {
        obj = {}
        twoDimensionIds.push(this.dataConfigTableData[i]['dataId'])
        obj['prop'] = this.dataConfigTableData[i]['dataId']
        obj['label'] = this.dataConfigTableData[i]['name']
        clounms.push(obj)
      }
      // 行跟列一样多
      this.xgxClounms = clounms
      let paramStr = {
        config: JSON.stringify({ids: twoDimensionIds, idArray: this.dataConfigTableData}),
        filter: this.flightFilterData,
        tabName: this.activeName === 'statistics' ? 'DataAnalysis' : 'CorrelationResults'
      }
      if (this.activeName === 'statistics') {
        urlParam = 'export/exportStatisticsExcel'
      }
      this.$axios.post(urlParam, this.$qs.stringify(paramStr), {responseType: 'blob'}).then((response) => {
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
    },
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    // 相关性结果
    getcorrel () {
      this.$store.commit('SHOW_LOADING', '正在处理中...')
      let twoDimensionIds = []
      let clounms = []
      let obj = {prop: 'id', label: ''}
      clounms.push(obj)
      for (let i = 0; i < this.dataConfigTableData.length; i++) {
        obj = {}
        twoDimensionIds.push(this.dataConfigTableData[i]['dataId'])
        obj['prop'] = this.dataConfigTableData[i]['dataId']
        obj['label'] = this.dataConfigTableData[i]['name']
        clounms.push(obj)
      }
      // 行跟列一样多
      this.xgxClounms = clounms

      var paramStr = {
        config: JSON.stringify({ids: twoDimensionIds, idArray: this.dataConfigTableData}),
        filter: this.flightFilterData
      }
      this.$axios.post('dm/correl', this.$qs.stringify(paramStr)).then((response) => {
        var dataRes = response.data
        if (dataRes) {
          if (dataRes['message']) {
            this.$store.commit('HIDE_LOADING', '正在处理中...')
            this.$message.error(dataRes['message'])
            return false
          }
          let tableList = []
          for (let i = 0; i < this.dataConfigTableData.length; i++) {
            let obj = {}
            obj['id'] = this.dataConfigTableData[i]['name']
            for (let j = 0; j < this.dataConfigTableData.length; j++) {
              let v = ''
              if (this.dataConfigTableData[i]['dataId'] === this.dataConfigTableData[j]['dataId']) {
                v = '1'
              } else {
                let id = this.dataConfigTableData[i]['dataId'] + '$' + this.dataConfigTableData[j]['dataId']
                v = dataRes[id] // 从data中获取
              }
              obj[this.dataConfigTableData[j]['dataId']] = v
            }
            tableList.push(obj)
          }
          this.xgxDataTableList = tableList
        } else if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
        this.$store.commit('HIDE_LOADING', '正在处理中...')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在处理中...')
      })
    },
    // 数据统计
    statistics () {
      this.statisticsTableList = []
      this.$store.commit('SHOW_LOADING', '正在处理中...')
      let twoDimensionIds = []
      let clounms = []
      let dataRes = []
      let obj = {prop: 'title', label: ''}
      clounms.push(obj)
      for (let i = 0; i < this.dataConfigTableData.length; i++) {
        obj = {}
        twoDimensionIds = []
        twoDimensionIds.push(this.dataConfigTableData[i]['dataId'])
        obj['prop'] = this.dataConfigTableData[i]['dataId']
        obj['label'] = this.dataConfigTableData[i]['name']
        clounms.push(obj)
      this.statisticsClounms = clounms

      var paramStr = {
        config: JSON.stringify({ids: twoDimensionIds, idArray: this.dataConfigTableData}),
        filter: this.flightFilterData
      }
      this.$axios.post('dm/statistics', this.$qs.stringify(paramStr)).then((response) => {
        var data = response.data
        if (data) {
          if (data['message']) {
            this.$store.commit('HIDE_LOADING', '正在处理中...')
            this.$message.error(data['message'])
            return false
          }
          dataRes.push(data[0])
          if (dataRes.length === this.dataConfigTableData.length) {
            let tableList = []
            let obj = {}
            let dataId = ''
            let arr = ['最大值', '最小值', '平均值', '标准差']
            for (let i = 0; i < arr.length; i++) {
              obj = {}
              obj['title'] = arr[i]
              for (let j = 0; j < this.dataConfigTableData.length; j++) { // 循环动态列的值
                dataId = this.dataConfigTableData[j]['dataId']
                for (let x = 0; x < dataRes.length; x++) {
                  if (dataRes[x]['id'] === dataId) {
                    if (arr[i] === '最大值') {
                      obj[dataId] = dataRes[x]['max']
                    } else if (arr[i] === '最小值') {
                      obj[dataId] = dataRes[x]['min']
                    } else if (arr[i] === '平均值') {
                      obj[dataId] = dataRes[x]['avg']
                    } else if (arr[i] === '标准差') {
                      obj[dataId] = dataRes[x]['standard']
                    }
                    break
                  }
                }
              }
              tableList.push(obj)
            }
            this.statisticsTableList = tableList
            this.$store.commit('HIDE_LOADING', '正在处理中...')
          }
        } else if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在处理中...')
      })
      }
    },
    // 数据详情
    getDataDetail (pageNo) {
      this.$store.commit('SHOW_LOADING', '正在处理中...')
      let twoDimensionIds = []
      let clounms = []
      let obj = {}
      for (let i = 0; i < this.dataConfigTableData.length; i++) {
        obj = {}
        twoDimensionIds.push(this.dataConfigTableData[i]['dataId'])
        obj['prop'] = 'prop' + (i + 1) // 因为值里面的第一列是 flightInfoId 从第二列开始，所以这里也从i+1开始
        obj['label'] = this.dataConfigTableData[i]['name']
        clounms.push(obj)
      }
      this.detailClounms = clounms

      var paramStr = {
        config: JSON.stringify({ids: twoDimensionIds, idArray: this.dataConfigTableData}),
        filter: this.flightFilterData,
        pageNo: pageNo,
        pageSize: this.pageSize
      }
      this.$axios.post('dm/getDataDetail', this.$qs.stringify(paramStr)).then((response) => {
        var dataRes = response.data
        if (dataRes !== null && dataRes.length > 0) {
          if (dataRes['message']) {
            this.$store.commit('HIDE_LOADING', '正在处理中...')
            this.$message.error(dataRes['message'])
            return false
          }
          let tableList = []
          let content = dataRes[0].content
          let obj = {}
          for (let i = 0; i < content.length; i++) {
            obj = {}
            for (let j = 0; j < content[i].length; j++) {
              if (j > 0) {
                obj['prop' + j] = content[i][j]
              }
            }
            tableList.push(obj)
          }
          this.detailTableList = tableList
          this.pageSize = dataRes[0].pageSize
          this.pageNo = dataRes[0].pageNo
          this.totalCount = dataRes[0].recordCount
        } else if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
        this.$store.commit('HIDE_LOADING', '正在处理中...')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在处理中...')
      })
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.getDataDetail(1)
    },
    handleClick (v) {
    }
  }
}
</script>
