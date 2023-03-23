<template>
  <div class="df df-fd-c df-f1">
    <div class="table-content">
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        ref="detailTable"
        :data="tableDetailData"
        :header-row-class-name="headerRowClassName"
        :cell-class-name="tableRowClassName"
        height="100%"
        border
        tooltip-effect="dark"
        @sort-change="sortChange"
        @header-dragend="colChange"
        @selection-change="handleSelectionChange"
        :header-cell-class-name="handleTheadAddClass"
        style="width: 100%;">

        <el-table-column v-if="tableDetailColumnData.length > 0"
          type="selection"
          header-align="center"
          align="center"
          width="50">
        </el-table-column>

        <el-table-column
          v-for="(col, index) in tableDetailColumnData"
          :key="index"
          :prop="col.enName"
          :label="col.zhName"
          sortable="custom"
          show-overflow-tooltip
          width="auto">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-content">
      <el-pagination
        background
        @size-change="tableDetailSizeChange"
        @current-change="tableDetailCurrentChange"
        @prev-click="tableDetailCurrentChange"
        @next-click="tableDetailCurrentChange"
        :current-page="tableDetailCurrentPage"
        :page-sizes="[100, 150, 200, 250]"
        :page-size="tableDetailPageSize"
        layout="sizes, prev, pager, next, total, jumper"
        :total="tablePageCount">
      </el-pagination>
      <!-- <el-button type="primary" class="ml20 mr20" @click="exportTableDetailData">导出</el-button> -->
      <!-- <el-button type="primary" class="ml20 mr20" @click="openExportDialog">导出</el-button> -->
    </div>
    <div class="export-dialog">
      <el-dialog
        title="导出设置"
        :visible.sync="dialogExportVisible"
        @close="closeExportDialog">

        <!-- <div class="export-dialog-container">
          <el-radio-group v-model="exportTypeRadio" >
          <p>
            <el-radio :label="1">请设置导出数据行数</el-radio>
          </p>
          <div class="container" style="padding: 0 10px;">
            <el-radio-group v-model="exportTablePageCountRadio" @change="changeExportTablePageCountRadio">
              <el-radio v-for="item in exportDataList" :disabled="item.isDisabled" :key="item.value" :label="item.value" :value="item.value">{{item.label}}</el-radio>
            </el-radio-group>
            <el-input
              size="medium"
              placeholder="请输入行数"
              v-model="exportTablePageCount"
              clearable
              :disabled="disabledExportTablePageCount">
            </el-input>
          </div>

          <p>
            <el-radio :label="2" :disabled="tableDetailColumnData.length < 2">设置分组导出</el-radio>
          </p>
          <div class="container export-group df-fd-c">
            <div class="df df-fd-r df-jc-fs df-ai-c">
              <span>按</span>
              <el-select value-key="enName"
                v-model="exportGroup"
                @change="changeExportGroup"
                :disabled="tableDetailColumnData.length < 2"
                placeholder="请选择">
                <el-option
                  v-for="item in tableDetailColumnData"
                  :key="item.enName"
                  :label="item.zhName"
                  :value="item">
                </el-option>
              </el-select>
              <span>进行分组</span>

              <div v-if="exportGroupType === '3'">
                <span>， 保留</span>
                <el-select
                  v-model="exportGroupNum"
                  placeholder="请选择">
                  <el-option
                    v-for="item in axisNumArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>小数</span>
              </div>

              <div v-if="exportGroupType === '6'">
                <span>， 日期格式</span>
                <el-select v-model="exportGroupFormat" placeholder="请选择">
                  <el-option
                    v-for="item in axisDateArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="df df-fd-r df-jc-fs df-ai-c" style="margin-top: 20px;">
              <span>按</span>
              <el-select value-key="enName" v-model="exportObj" :disabled="tableDetailColumnData.length < 2" placeholder="请选择">
                <el-option
                  v-for="item in tableDetailColumnData"
                  :key="item.enName"
                  :label="item.zhName"
                  :value="item">
                </el-option>
              </el-select>

              <span>进行</span>
              <el-select v-model="exportSort" :disabled="tableDetailColumnData.length < 2" placeholder="请选择">
                <el-option
                  v-for="item in [{label: '正序', value: 'asc'}, {label: '倒序', value: 'desc'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <span>导出，取</span>
              <el-input
                size="medium"
                placeholder="请输入数字"
                v-model="exportGroupCount"
                :disabled="tableDetailColumnData.length < 2"
                clearable>
              </el-input>
            </div>
            <p>
              <el-checkbox v-model="checkedTimeZone" :disabled="tableDetailColumnData.length < 2">按东八区时区处理（系统默认按照UTC时间）</el-checkbox>
            </p>
          </div>
          </el-radio-group>
        </div> -->
        <div class="export-dialog-container">
          <p>请设置导出数据行数</p>
          <div class="container">
            <el-radio-group v-model="exportTablePageCountRadio" @change="changeExportTablePageCountRadio">
              <el-radio v-for="item in exportDataList" :disabled="item.isDisabled" :key="item.value" :label="item.value" :value="item.value">{{item.label}}</el-radio>
            </el-radio-group>
            <el-input
              size="medium"
              placeholder="请输入行数"
              v-model="exportTablePageCount"
              clearable
              :disabled="disabledExportTablePageCount">
            </el-input>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="exportTableDetailData">确&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="progress" v-show="percentage">
      <el-progress :percentage="percentage" :stroke-width="18"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnalysisTableDetail',
  props: { // 属性定义
    activeTabName: { // 当前激活的tab名字
      type: String
    }
  },
  data () {
    return {
      tablePageCount: 0,
      multipleSelection: [],
      tableDetailData: [],
      tableDetailColumnData: [],
      tableDetailCurrentPage: 1,
      tableDetailPageSize: 100,

      exportDataList: [
        // {value: 0, label: '5万', isDisabled: true},
        // {value: 'all', label: '全部', isDisabled: false},
        // {value: 'custom', label: '自定义', isDisabled: false}
      ],
      axisNumArr: [ // 数值数组
        {value: '0', label: '0'},
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5'},
        {value: '6', label: '6'},
        {value: '7', label: '7'},
        {value: '8', label: '8'},
        {value: '9', label: '9'},
        {value: '10', label: '10'}
      ],
      axisDateArr: [ // 日期数组
        {value: 'YYYY', label: 'YYYY'},
        {value: 'YYYY/MM', label: 'YYYY/MM'},
        {value: 'YYYY/MM/dd', label: 'YYYY/MM/dd'}
      ],
      exportTablePageCountRadio: 0,
      exportTablePageCount: '',
      disabledExportTablePageCount: true,
      isCustom: false,
      exportGroupType: '',
      percentage: 0,
      columnParams: '',
      curThead: '',
      currentColTime: 0,
      exportFlightIds: [],
      exportTypeRadio: 1,
      exportGroup: {},
      exportObj: {},
      exportGroupNum: '2',
      exportGroupFormat: 'YYYY/MM/dd',
      exportSort: 'asc',
      exportGroupCount: '',
      checkedTimeZone: true,
      dialogExportVisible: false // 是否显示导出设置 dialog
    }
  },
  // computed: {
  //   indeterminate(){
  //     return this.multipleSelection.length &&  this.multipleSelection.length < this.tableData3.length
  //   },
  //   checked: {
  //     get() {
  //       return this.multipleSelection.length === this.tableData3.length
  //     },
  //     set(val) {
  //       this.$refs.multipleTable.toggleAllSelection(val)
  //     }
  //   }
  // },
  mounted () {
    this.$nextTick(() => {
      this.initTableDetailData()

      // document.getElementsByClassName('table-content')[0].oncontextmenu = function (e) {
      //   return false
      // }
    })

    const that = this
    this.$bus.$on('openExportDialogHandle', () => { // 接收显示表格右侧dom事件
      that.openExportDialog()
    })

    this.$bus.$on('exportAllParamHandle', () => { // 接收显示表格右侧dom事件
      that.exportAllParam()
    })
  },
  destroyed () {
    this.$bus.$off('openExportDialogHandle') // 移除自定义事件监听器。
    this.$bus.$off('exportAllParamHandle') // 移除自定义事件监听器。
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.detailTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.detailTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      let disabledMenuObj = JSON.parse(JSON.stringify(this.$store.state.isDisabledMenu))
      this.multipleSelection = val

      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        disabledMenuObj['analysis_table_allParamExport'] = false

        if (this.multipleSelection.length > 1) {
          disabledMenuObj['flight_param_compare'] = false
        } else {
          disabledMenuObj['flight_param_compare'] = true
        }

        let flights = []
        this.multipleSelection.forEach((item, index) => {
          flights.push(item.vwid)
        })

        this.exportFlightIds = flights
        let flightObj = {}
        flightObj['flights'] = flights
        flightObj['tables'] = this.multipleSelection
        flightObj['disabledMenuObj'] = disabledMenuObj

        this.$bus.$emit('flightsHandle', flightObj)
      } else {
        disabledMenuObj['flight_param_compare'] = true
        disabledMenuObj['analysis_table_allParamExport'] = true
        disabledMenuObj['fpc_result_flinfo_dhbgcsdb'] = true

        this.exportFlightIds = []
        this.$bus.$emit('flightsHandle', disabledMenuObj)
      }

      this.$bus.$emit('openHeaderMenuItem', 'analysis_table', null, disabledMenuObj) // 修改头部显示效果
      this.$store.commit('IS_DISABLED_MENU', disabledMenuObj)
    },

    colChange (newWidth, oldWidth, column, event) {
      setTimeout(() => {
        console.log(newWidth, oldWidth, column, event)
        console.log('拖动表头改变列宽')
      }, 100)
    },
    handleTheadAddClass ({row, column, rowIndex, columnIndex}) {
      // 判断找到当前列 添加样式
      // if (column.prop === this.curThead) {
      //   return 'active-thead'
      // }
    },
    handleSortChange ({ column, prop, order }) {
      console.log(column, prop, order)
      //拿到当前列的某个属性
      this.curThead = prop
    },
    // sortChangeXp (params) {
    //   let tempTime = new Date().getTime()
    //   if (tempTime - this.currentColTime < 2000) {
    //     this.$refs.detailTable.clearSort()
    //     this.sortChangeXp()
    //   } else {
    //     this.sortChangeXp(params)
    //   }

    //   this.currentColTime = new Date().getTime()
    //   // setTimeout (() => {
    //   //   this.currentColTime = 0
    //   // }, 800)
    // },
    // @header-contextmenu="clearSort"
    // clearSort (column, event) {
    //   // event.target.oncontextmenu = function (event) {
    //   this.$refs.detailTable.clearSort()
    //   this.sortChange({column: null, prop: null, order: null})
    // },
    // 表格详情排序
    sortChange (params) {
      console.log(params)
      if (JSON.stringify(params) === JSON.stringify(this.columnParams)) {
        this.$refs.detailTable.clearSort()
        this.sortChange({column: null, prop: null, order: null})
        return false
      }

      // let colName = params.prop.toUpperCase
      let colName = ''
      let order = ''

      this.columnParams = params
      if (this.$util.isDefine(params.column) && this.$util.isNotEmptyObject(params.column)) {
        colName = params.column.label
        order = params.order === 'descending' ? 'desc' : 'asc'
      }

      this.tableDetailCurrentPage = 1
      let tempAnalysisResultAllDataObj = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData)) // 临时存储store中存放的分析结果数据
      let tempSubmitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (tempSubmitAnalysisParams.isGuide === '1') { // 添加辅助线标识
        tempSubmitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
      }
      tempSubmitAnalysisParams.tablePageSize = 0
      tempSubmitAnalysisParams.tablePageNum = this.tableDetailPageSize
      tempSubmitAnalysisParams.pageNo = 0
      tempSubmitAnalysisParams.isGuide = ''
      tempSubmitAnalysisParams.pageUUID = ''
      tempSubmitAnalysisParams['tableType'] = 1
      // tempSubmitAnalysisParams['reqType'] = 'orderTabConfig'

      let tableConfig = tempSubmitAnalysisParams.tableConfig
      if (tableConfig.length > 0) {
        tableConfig.forEach(item => {
          // console.log(item)
          if (item.name === colName) { // columnName | name
            item['sortOrder'] = order
          } else {
            item['sortOrder'] = ''
          }
        })
        tempSubmitAnalysisParams.tableConfig = tableConfig
      }
      console.log('sortChange@submitAnalysisParams~~~:', tempSubmitAnalysisParams)
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: '/submit/submitAnalysis',
        method: 'post',
        data: JSON.stringify(tempSubmitAnalysisParams),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        console.log('analysisTableDetail@submitAnalysis~~~:', response)
        if (response.data.status === '0') {
          let tableData = response.data.result.data.tableData // 表格详情数据
          if (this.$util.isDefine(tableData) && this.$util.isNotEmptyObject(tableData)) { // 分析结果中的表格详情数据
            tempAnalysisResultAllDataObj.tableData = tableData // 重新赋值state中tableData的值
          } else {
            tempAnalysisResultAllDataObj.tableData = {} // 清空state中tableData的值
          }
          this.$store.commit('ANALYSIS_RESULT_ALL_DATA', tempAnalysisResultAllDataObj) // 更新store中tableData数据
          this.initTableDetailData() // 重新加载表格数据
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }, response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    tableDetailSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.tableDetailPageSize = val
      this.tableDetailCurrentChange(1)
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },
    tableDetailCurrentChange (val) {
      this.tableDetailCurrentPage = val
      let tempAnalysisResultAllDataObj = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData)) // 临时存储store中存放的分析结果数据
      let tempSubmitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (tempSubmitAnalysisParams.isGuide === '1') { // 添加辅助线标识
        tempSubmitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
      }
      tempSubmitAnalysisParams.tablePageSize = val - 1 // 重新赋值页数，查询新的航班编号
      tempSubmitAnalysisParams.tablePageNum = this.tableDetailPageSize
      tempSubmitAnalysisParams.pageNo = 0
      tempSubmitAnalysisParams.isGuide = ''
      tempSubmitAnalysisParams.pageUUID = ''
      tempSubmitAnalysisParams['tableType'] = 1

      let colName = ''
      let order = ''
      if (this.$util.isDefine(this.columnParams.column) && this.$util.isNotEmptyObject(this.columnParams.column)) {
        colName = this.columnParams.column.label
        order = this.columnParams.order === 'descending' ? 'desc' : 'asc'
      }
      let tableConfig = tempSubmitAnalysisParams.tableConfig
      if (tableConfig.length > 0) {
        tableConfig.forEach(item => {
          // console.log(item)
          if (item.name === colName) { // columnName | name
            item['sortOrder'] = order
          } else {
            item['sortOrder'] = ''
          }
        })
        tempSubmitAnalysisParams.tableConfig = tableConfig
      }

      console.log('tableDetailCurrentChange@submitAnalysisParams~~~:', tempSubmitAnalysisParams)
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: '/submit/submitAnalysis',
        method: 'post',
        data: JSON.stringify(tempSubmitAnalysisParams),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        console.log('analysisTableDetail@submitAnalysis~~~:', response)
        if (response.data.status === '0') {
          if (this.isStringObject(response.data.result.data)) {
            let resUrl = response.data.result.data
            let tempUrl = ''
            if (resUrl.indexOf('7777') > -1) {
              tempUrl = resUrl
            } else {
              tempUrl = window.location.origin + resUrl
            }
            window.location.href = tempUrl
            return false
          }
          let tableData = response.data.result.data.tableData // 表格详情数据
          if (this.$util.isDefine(tableData) && this.$util.isNotEmptyObject(tableData)) { // 分析结果中的表格详情数据
            tempAnalysisResultAllDataObj.tableData = tableData // 重新赋值state中tableData的值
          } else {
            tempAnalysisResultAllDataObj.tableData = {} // 清空state中tableData的值
          }
          this.$store.commit('ANALYSIS_RESULT_ALL_DATA', tempAnalysisResultAllDataObj) // 更新store中tableData数据
          this.initTableDetailData() // 重新加载表格数据
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }, response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    initTableDetailData () { // 显示表格数据
      this.tableDetailData = []
      let tableDataObj = this.$store.state.analysisResultAllData.tableData

      if (this.$util.isDefine(tableDataObj) && this.$util.isNotEmptyObject(tableDataObj)) { // 表格详情数据存在且不为空
        let colsData = tableDataObj.colsData
        let rowsData = tableDataObj.rowsData
        let colsZhData = tableDataObj.colsZhData
        let submitAnalysisParams = this.$store.state.analysisResultAllData.submitAnalysisParams // 数据总条数
        if (this.$util.isNotEmptyObject(submitAnalysisParams) && this.$util.isDefine(submitAnalysisParams.tablePageCount)) {
          this.tablePageCount = parseInt(submitAnalysisParams.tablePageCount)

          this.setExporTableRadio()
        }
        if (this.$util.isDefine(colsData) && this.$util.isDefine(colsZhData) && this.$util.isDefine(rowsData)) {
          let colsDataArr = colsData.split(',')
          let colsZhDataArr = colsZhData.split(',')
          let tempCols = []
          if (colsDataArr.length > 0 && colsZhDataArr.length > 0 && colsDataArr.length === colsZhDataArr.length && rowsData.length > 0) {
            colsDataArr.forEach((item, index) => {
              tempCols.push({enName: item.toLowerCase(), zhName: colsZhDataArr[index]})
            })
            this.tableDetailColumnData = tempCols
            let tempRows = []
            rowsData.forEach((item, index) => {
              let tempObj = item
              for (let key in tempObj) {
                if (!this.$util.isDefine(tempObj[key])) {
                  tempObj[key] = '-'
                }
              }
              tempRows.push(tempObj)
            })
            this.tableDetailData = tempRows
          } else {
            // this.$message.error('表格详情数据，接口数据异常！')
          }
        } else {
          // this.$message.error('表格详情数据，接口数据异常！！')
        }
      } else {
        // this.$message.error('表格详情暂无数据！')
      }
    },
    openExportDialog  () {
      if (this.tableDetailData.length <= 0) {
        this.$message({
          type: 'warning',
          message: '没有数据无法导出！'
        })
        this.dialogExportVisible = false
      } else {
        if (this.$util.isDefine(this.exportTablePageCount)) {
            this.exportTablePageCountRadio = 'custom'
        } else {
          this.setExporTableRadio()
          this.disabledExportTablePageCount = true
          this.exportTablePageCount = ''
          this.isCustom = false

          this.exportGroupType = ''
          this.exportTypeRadio = 1
          this.exportGroup = {}
          this.exportObj = {}
          this.exportGroupNum = '2'
          this.exportGroupFormat = 'YYYY/MM/dd'
          this.exportSort = 'asc'
          this.exportGroupCount = ''
          this.checkedTimeZone = true
        }

        this.dialogExportVisible = true
      }
    },
    closeExportDialog () { // 关闭dialog时内部状态赋值默认值
      this.dialogExportVisible = false
    },
    changeExportTablePageCountRadio (value) {
      console.log(value)
      if (value === 'custom') {
        this.isCustom = true
        this.disabledExportTablePageCount = false
      } else {
        this.disabledExportTablePageCount = true
        this.exportTablePageCount = ''
        this.isCustom = false
      }
    },
    setExporTableRadio () {
      this.exportDataList = []
      if (this.tablePageCount < 50000) {
        this.exportDataList = [
          {value: 'all', label: '全部', isDisabled: false},
          {value: 'custom', label: '自定义', isDisabled: false}
        ]
        this.exportTablePageCountRadio = 'all'
      } else if (this.tablePageCount >= 50000 && this.tablePageCount < 100000) {
        this.exportDataList = [
          {value: 50000, label: '5万', isDisabled: false},
          {value: 'all', label: '全部', isDisabled: false},
          {value: 'custom', label: '自定义', isDisabled: false}
        ]
        this.exportTablePageCountRadio = 50000
      } else if (this.tablePageCount >= 100000 && this.tablePageCount < 200000) {
        this.exportDataList = [
          {value: 50000, label: '5万', isDisabled: false},
          {value: 100000, label: '10万', isDisabled: false},
          {value: 'all', label: '全部', isDisabled: false},
          {value: 'custom', label: '自定义', isDisabled: false}
        ]
        this.exportTablePageCountRadio = 50000
      } else if (this.tablePageCount >= 200000) {
        this.exportDataList = [
          {value: 50000, label: '5万', isDisabled: false},
          {value: 100000, label: '10万', isDisabled: false},
          {value: 200000, label: '20万', isDisabled: false},
          {value: 'all', label: '全部', isDisabled: false},
          {value: 'custom', label: '自定义', isDisabled: false}
        ]
        this.exportTablePageCountRadio = 50000
      }
    },

    changeExportGroup (value) {
      let tempConfig = this.getTableConfigObj(value)

      this.exportGroupType = tempConfig.type
      if (tempConfig.columnName === 'FLIGHT_DATE') {
        this.exportGroupType = '6'
      }
    },

    getTableConfigObj (obj) {
      console.log(obj)
      let tableConfig = this.$store.state.analysisResultAllData.submitAnalysisParams.tableConfig
      // let tempObj = {}
      // try {
      //   tableConfig.forEach(element => {
      //     if (element.name === obj.zhName) {
      //       tempObj = element
      //       // retrun false
      //       throw Error('结束循环')
      //     }
      //   })
      // } catch (error) {
      //   console.log(error.msg)
      // }
      // return tempObj

      return tableConfig.find(element => {
        return element.name === obj.zhName
      })
    },
    exportAllParam () {
      // /flightRecords/downloadMultiCSV
      if (this.exportFlightIds.length <= 0) {
        this.$message({
          type: 'warning',
          message: '没有数据无法导出！'
        })
        return false
      }
      this.$store.commit('SHOW_LOADING', '正在下载数据，请稍等！') // 打开加载提示框

      this.$axios({
        url: '/flightRecords/downloadMultiCSV',
        method: 'post',
        data: {
          flightIds: this.exportFlightIds.join(',')
        },
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        responseType: 'blob'
        // // `onUploadProgress` 允许为上传处理进度事件
        // onDownloadProgress: function (progressEvent) {
        //   // console.log('exportTableConfig~onUploadProgress~~:', progressEvent)
        //   // 对原生进度事件的处理
        //   if (progressEvent.lengthComputable) {
        //     //保留小数点后4位
        //     console.log(Math.floor((progressEvent.loaded / progressEvent.total) * 10000) / 10000)
        //     that.percentage = parseInt((progressEvent.loaded / progressEvent.total) * 100)

        //     //  that.$set(that.jindu,0,that.jindu)
        //     //  $("#progressing").html((percentComplete * 100) + "%");
        //   }
        // }
      }).then(response => {
        console.log('exportTableConfig~~~:', response)
        // that.percentage = 0

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
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    exportTableDetailData () { // 导出数据
      let tempTablePageCount = this.exportTablePageCountRadio
      if (this.tableDetailData.length <= 0) {
        this.$message({
          type: 'warning',
          message: '没有数据无法导出！'
        })
        this.dialogExportVisible = false
        return false
      }
      if (this.isCustom) {
        let isFlag = new RegExp('^[1-9][0-9]*$').test(this.exportTablePageCount)
        if (!isFlag) {
          this.$message.warning('请输入 1 ~ ' + this.tablePageCount + ' 的正整数！')
          return false
        }
        if (this.exportTablePageCount < 0 || this.exportTablePageCount > this.tablePageCount) {
          this.$message.warning('请保证自定义行数大于0并且小于' + this.tablePageCount + '！')
          return false
        }
      }
      if (tempTablePageCount === 'all') {
        tempTablePageCount = this.tablePageCount
      } else if (tempTablePageCount === 'custom') {
        tempTablePageCount = this.exportTablePageCount
      }

      // this.$store.commit('SHOW_LOADING', '正在导出数据[导出 ' + tempTablePageCount + ' 条数据]，请稍等！')

      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (submitAnalysisParams.isGuide === '1') { // 添加辅助线标识
        submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
      }
      submitAnalysisParams.tablePageSize = 0
      submitAnalysisParams.tablePageNum = 0
      submitAnalysisParams.pageNo = 0
      submitAnalysisParams['tablePageCount'] = tempTablePageCount

      let colName = ''
      let order = ''
      if (this.$util.isDefine(this.columnParams.column) && this.$util.isNotEmptyObject(this.columnParams.column)) {
        colName = this.columnParams.column.label
        order = this.columnParams.order === 'descending' ? 'desc' : 'asc'
      }
      let tableConfig = submitAnalysisParams.tableConfig
      if (tableConfig.length > 0) {
        tableConfig.forEach(item => {
          if (item.name === colName) {
            item['sortOrder'] = order
          } else {
            item['sortOrder'] = ''
          }
        })
        submitAnalysisParams.tableConfig = tableConfig
      }

      this.setExporTableRadio()
      this.disabledExportTablePageCount = true
      this.exportTablePageCount = ''
      this.isCustom = false

      console.log('exportTableConfig@params~~~:', JSON.stringify(submitAnalysisParams))

      if (this.exportTypeRadio === 2) {
        let isFlag = new RegExp('^[1-9][0-9]*$').test(this.exportGroupCount)
        if (!isFlag) {
          this.$message.warning('请输入正整数！')
          return false
        }

        let tempExportGroup = this.getTableConfigObj(this.exportGroup)
        console.log(tempExportGroup)
        let tempExportObj = this.getTableConfigObj(this.exportObj)
        if (tempExportGroup === tempExportObj) {
          this.$message.warning('分组列和排序列不能相同！')
          return false
        }

        let tempExportGroupFormat = ''
        if (this.exportGroupType === '3') {
          tempExportGroupFormat = this.exportGroupNum
        } else if (this.exportGroupType === '6') {
          tempExportGroupFormat = this.exportGroupFormat
        }

        let exportGroupObj = {
          exportGroup: tempExportGroup,
          exportGroupFormat: tempExportGroupFormat,
          exportObj: tempExportObj,
          exportSort: this.exportSort,
          exportCount: this.exportGroupCount,
          timeZone: this.checkedTimeZone
        }
        submitAnalysisParams['exportGroupObj'] = exportGroupObj

        console.log(submitAnalysisParams)
      }

      this.postExcelFile(submitAnalysisParams, '/dsap/export/exportTableConfig')

      /* let that = this
      let timer = setInterval(function () {
        console.log(that.percentage)
        that.percentage += 1
        if (that.percentage >= 100) {
          that.percentage = 0
          clearInterval(timer)
        }
      }, 500)

      this.$axios({
        url: '/export/exportTableConfig',
        method: 'post',
        data: JSON.stringify(submitAnalysisParams),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        responseType: 'blob'
        // // `onUploadProgress` 允许为上传处理进度事件
        // onDownloadProgress: function (progressEvent) {
        //   // console.log('exportTableConfig~onUploadProgress~~:', progressEvent)
        //   // 对原生进度事件的处理
        //   if (progressEvent.lengthComputable) {
        //     //保留小数点后4位
        //     console.log(Math.floor((progressEvent.loaded / progressEvent.total) * 10000) / 10000)
        //     that.percentage = parseInt((progressEvent.loaded / progressEvent.total) * 100)

        //     //  that.$set(that.jindu,0,that.jindu)
        //     //  $("#progressing").html((percentComplete * 100) + "%");
        //   }
        // }
      }).then(response => {
        console.log('exportTableConfig~~~:', response)
        that.percentage = 0
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
        this.dialogExportVisible = false
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      }) */
    },

    postExcelFile (params, url) { //params是post请求需要的参数，url是请求url地址
      let form = document.createElement('form')
      form.style.display = 'none'
      form.action = url
      form.method = 'post'
      // form.target = '_blank'
      document.body.appendChild(form)

      // for (let key in params) {
      //   var input = document.createElement('input')
      //   input.type = 'hidden'
      //   input.name = key
      //   input.id = key
      //   if (this.$util.isNotEmptyObject(params[key])) {
      //     let str = JSON.stringify(params[key])
      //     let reg = new RegExp('"', 'g')
      //     input.value = str.replace(reg, '&quot;')
      //   } else {
      //     input.value = params[key]
      //   }
      //   form.appendChild(input)
      // }

      // var input = document.createElement('input')
      // input.name = 'sub'
      // input.id = 'sub'
      // if (this.$util.isNotEmptyObject(params)) {
      //   let str = JSON.stringify(params)
      //   let reg = new RegExp('"', 'g')
      //   input.value = str.replace(reg, '&quot;')
      //   // input.innerText = str.replace(reg, '&quot;')
      // } else {
      //   input.value = params
      //   // input.innerText = params
      // }
      // form.appendChild(input)

      let str = JSON.stringify(params)
      let reg = new RegExp('"', 'g')
      form.innerHTML = '<input name="sub" id="sub" value="' + str.replace(reg, '&quot;') + '" />'

      form.submit()
      form.remove()
      this.dialogExportVisible = false
    }
  }
}
</script>

<style scoped>
.table-content {
  position: relative;
  width: 100%;
  height: 90%;
}
/* .table-content >>> .el-table__body-wrapper{
  height: 100% !important;
} */
/*
.table-content >>> .el-checkbox {
  margin-left: 5px;
}
.table-content >>> .el-table .el-table__header .el-table-column--selection .cell .el-checkbox__inner {
  margin-left: -30px;
  position: relative;
}
.table-content >>> .el-table .el-table__header .el-table-column--selection .cell::before {
  content: "全选";
  position: absolute;
  right: 5px;
  font-size: 12px;
}
 */

.pagination-content {
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.exportbtn {
  margin: 0 30px;
}

.export-dialog .export-dialog-container .container {
  display: flex;
  justify-content: start;
}
.export-dialog-container .export-group {
  padding: 0 24px;
}
.export-dialog-container >>> .el-radio {
  margin-left: 15px;
  line-height: 30px;
}
.export-dialog-container >>> .el-input {
  width: 120px;
  margin: 0 20px;
}

.export-dialog-container >>> .el-radio-group {
  font-size: 12px;
}

.export-dialog-container >>> .el-input__icon {
  line-height: 30px;
}

.export-dialog >>> .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.export-dialog >>> .el-dialog {
  width: auto;
  /* height: 30vh; */
  display: flex;
  flex-direction: column;
}
.export-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex-direction: row;
  height: 90%;
  margin: 5px 30px;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.export-dialog >>> .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
.export-dialog >>> .el-dialog__headerbtn {
  top: 10px !important;
}
.export-dialog >>> .el-dialog__header {
  padding: 5px 20px !important;
  border-bottom: 1px solid #DDDDDD;
}

.progress {
  position: absolute;
  top: 60%;
  left: 50%;
  width: 350px;
  height: 20px;
  margin-left: -70px;
  transform: translateX(-50%) translateY(-50%);
  z-index: 9999999;
}

.pagination-content >>> .el-pagination__editor.el-input {
  vertical-align: top;
}
</style>
