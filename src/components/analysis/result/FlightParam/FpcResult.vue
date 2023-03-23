<template>
  <div class="basic-tab fpc-result">
    <el-tabs v-model="activeName" @tab-click="tabChartContent">
      <el-tab-pane label="飞行记录视图" name="flightRecordView" id="flightRecordView">
        <AnalysisView :activeTabName="activeName"></AnalysisView>
      </el-tab-pane>
      <el-tab-pane label="表格" name="fpcDataGrid" id="fpcDataGrid">
        <div class="grid-wrap df df-fd-c df-f1">
          <div class="df df-fd-c df-f1 w100 pos-r">
            <!-- :header-cell-style = "handleHeaderCell" -->
            <el-table
              :data="fpcGridData.slice((gridCurrentPage-1)*gridPageSize,gridCurrentPage*gridPageSize)"
              height="100%"
              style="width: 100%;"
              highlight-current-row
              border
              :header-row-class-name="headerRowClassName"
              :row-class-name="tableRowClassName">
              <el-table-column
                v-for="(col, index) in fpcGridColumData"
                :fixed="index === 0"
                :key="index"
                :header-align="index === 0 ? 'center' : 'left'"
                :prop="col.enName"
                :label="col.zhName"
                min-width="150"
                :width="fpcGridColumData.length > 12 && index > 0 ? '170' : 'auto'"> <!-- :render-header="renderHeader" -->
                  <template slot="header" slot-scope="{ column, $index }">
                    <div v-if="$index === 0" class="fpc-result-grid-first" :style="{'--diagonalWidth': diagonalWidth, '--diagonalAngel': diagonalAngel}">
                      <span class="title1">航班日期</span>
                      <br>
                      <span class="title2">{{ column.label }}</span>
                      <br>
                      <span class="title3">时间</span>
                    </div>
                    <span v-else-if="column.label === '平均值' || column.label.indexOf('分位') > 0">{{ column.label }}</span>
                    <span v-else>
                      航班日期：{{ column.label.split('_')[0] }}
                      <br>
                      航班号：{{ column.label.split('_')[1] }}
                    </span>
                  </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="df df-jc-fe df-ai-c" style="height:10%">
            <el-pagination
              background
              @size-change="gridSizeChange"
              @current-change="gridCurrentChange"
              @prev-click="gridCurrentChange"
              @next-click="gridCurrentChange"
              :current-page="gridCurrentPage"
              :page-sizes="[30, 50, 70]"
              :page-size="gridPageSize"
              layout="sizes, prev, pager, next, total, jumper"
              :total="fpcGridData.length">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="2D图表" name="fpc2dChart" id="fpc2dChart">
        <div class="flight-chart df-f1">
          <div id="fpcChartInfo" class="df df-fd-r w100 h100">
            <!-- <div v-if="dataZoomChart" class="fpc-chart-content df-f1 h100 pos-r df df-fd-c">
              <div id="fpcChartContent" ref="fpcChartContent" class="por-r w100 df-f1"></div>

              <div class="slider">
                <el-slider
                  v-model="value"
                  range
                  :marks="marks">
                </el-slider>
              </div>
            </div>
            <div v-else class="fpc-chart-content df-f1 h100 pos-r">
              <div id="fpcChartContent" ref="fpcChartContent" class="por-r w100 h100"></div>
            </div> -->
            <div class="fpc-chart-content df-f1 h100 pos-r">
              <div id="fpcChartContent" ref="fpcChartContent" class="por-r w100 h100"></div>
            </div>

            <div class="fpc-chart-style-content">
              <div class="fpc-content">
                <div class="fpc-info">信息</div>
                <span class="fpc-info-jiantou"></span>
              </div>

              <div class="fpc-data-content">
                <div class="fpc-data-set">
                  <div class="df df-fd-r fpc-data-title">
                    <div class="fpc-type">时间点:</div>
                    <div class="fpc-name df-f1">
                      <div class="fpc-name-text">{{this.fpcFlightObj.fpcParamText.timePointText}}</div>
                    </div>
                  </div>
                </div>

                <div class="fpc-data-set">
                  <div class="df df-fd-r fpc-data-title">
                    <div class="fpc-type">工程参数:</div>
                    <div class="fpc-name df-f1">
                      <div class="fpc-name-text">{{this.fpcFlightObj.fpcParamText.enginParamText}}</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div class="fpc-chart-empty-text" v-show="isShowChart">
            <span v-if="parseInt(this.$store.state.analysisResultAllData.flightPageCount) > 0">时间点或工程参数无数据</span>
            <span v-else>暂无数据</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="航班信息" name="fpcFlightInfo" id="fpcFlightInfo">
        <div class="flight-info-wrap df df-fd-c df-f1">
          <div class="df df-fd-c df-f1 w100">
            <el-table
              ref="flightInfoTable"
              :data="flightInfoData"
              :header-row-class-name="headerRowClassName"
              :cell-class-name="tableRowClassName"
              height="100%"
              border
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              style="width: 100%;">

              <el-table-column v-if="flightInfoColumnData.length > 0"
                type="selection"
                header-align="center"
                align="center"
                width="50">
              </el-table-column>

              <el-table-column
                v-for="(col, index) in flightInfoColumnData"
                :key="index"
                :prop="col.enName"
                :label="col.zhName"
                show-overflow-tooltip
                width="auto">
              </el-table-column>
            </el-table>
          </div>

          <div class="pagination-content" style="display: none;">
            <el-pagination
              background
              @size-change="flightInfoSizeChange"
              @current-change="flightInfoCurrentChange"
              @prev-click="flightInfoCurrentChange"
              @next-click="flightInfoCurrentChange"
              :current-page="flightInfoCurrentPage"
              :page-sizes="[100, 150, 200, 250]"
              :page-size="flightInfoPageSize"
              layout="sizes, prev, pager, next, total, jumper"
              :total="tablePageCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="export-dialog">
      <el-dialog
        title="导出设置"
        :visible.sync="dialogExportVisible"
        @close="closeExportDialog">

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
  </div>
</template>

<script>
  const AnalysisView = () => import('components/analysis/result/AnalysisView')

  export default {
    name: 'FpcResult',

    components: {
      AnalysisView
    },

    props: {
      fpcFlightObj: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },

    data () {
      return {
        activeName: 'fpc2dChart',

        // 第一个单元格的类名
        headerCellClassName: '',
        // 第一个单元格的宽度
        headerCellOffsetWidth: 0,
        // 第一个单元格的高度
        headerCellOffsetHeight: 0,
        // 对角线旋转的角度
        diagonalAngel: 0,
        // 对角线的长度
        diagonalWidth: 0,

        screenWidth: document.body.clientWidth,
        timer: null,

        dataZoomChart: false,
        value: [30, 60],
        marks: {
          0: '0%',
          8: '8%',
          37: '37%',
          50: {
            style: {
              color: '#1989FA'
            },
            label: this.$createElement('strong', '50%')
          }
        },

        activeNameToParent: { // tab标签对应自己的父组件名字
          'flightRecordView': 'fpc_result_view',
          'fpcDataGrid': 'fpc_result_grid',
          'fpc2dChart': 'fpc_result_chart',
          'fpcFlightInfo': 'fpc_result_flinfo'
        },

        isShowChart: true,

        fpCharts: '',

        fpcGridColumData: [],
        fpcGridData: [],
        gridCurrentPage: 1,
        gridPageSize: 30,

        tablePageCount: 0,
        flightInfoPageSize: 100,
        flightInfoCurrentPage: 1,
        flightInfoData: [],
        flightInfoColumnData: [],
        fpcMultipleSelection: [],

        gridVWID: [],
        exportDataList: [],
        exportTablePageCountRadio: 0,
        exportTablePageCount: '',
        disabledExportTablePageCount: true,
        isCustom: false,
        columnParams: '',
        exportFlightIds: [],
        dialogExportVisible: false // 是否显示导出设置 dialog
      }
    },

    created () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
    },

    watch: {
      // // 监听window窗口的变化，执行getDiagonal（）方法，更新对角线的角度与长度。
      // screenWidth (nVal, oVal) {
      //   if (nVal === oVal) {
      //     return false
      //   }
      //   let _this = this
      //   if (!_this.timer) {
      //     // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
      //     _this.screenWidth = nVal
      //     _this.timer = true
      //     setTimeout(function () {
      //       _this.getDiagonal()
      //       _this.timer = false
      //     }, 400)
      //   }
      // }
    },

    mounted () {
      this.$nextTick(() => { // 整个视图都渲染完毕后开始渲染图表数据
        console.log('FPCRESULT=====:', this.fpcFlightObj)

        setTimeout(() => {
          this.drawChart()
          this.initFlightInfoData()

          // this.getDiagonal()
        }, 20)

        setTimeout(() => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }, 500)

        // let _this = this
        // // mounted里挂载window.onresize事件
        // window.onresize = () => {
        //   return (() => {
        //     window.screenWidth = document.body.clientWidth
        //     _this.screenWidth = window.screenWidth
        //   })()
        // }
      })

      const that = this
      this.$bus.$on('resetFpcResultMenuHandle', () => {
        that.resetFpcResultMenu()
      })

      this.$bus.$on('exportFpcGridHandle', () => { // 接收显示表格右侧dom事件
        that.exportFpcGrid()
      })

      this.$bus.$on('exportFpcAllParamHandle', () => { // 接收显示表格右侧dom事件
        that.exportAllParam()
      })

      this.$bus.$on('openDhbExportDialogHandle', () => { // 接收显示表格右侧dom事件
        that.openExportDialog()
      })
    },

    destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
      this.$bus.$off('exportFpcGridHandle')
      this.$bus.$off('resetFpcResultMenuHandle')
      this.$bus.$off('exportFpcAllParamHandle')
      this.$bus.$off('openDhbExportDialogHandle')
    },

    methods: {
      renderHeader (createElement, {column, _self}) {
        console.log(createElement) // function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
        const label = column.label
        const labelArr = label.split('_')
        if (_self === 0) {
          return createElement(
            'span', // 创建最外层的标签可随意
            [
              createElement('span', { // 创建第一个元素的标签可随意
                attrs: { type: 'text' }
              }, [label])
            ]
          )
        }
        return createElement(
          'span', // 创建最外层的标签可随意
          [
            createElement('span', { // 创建第一个元素的标签可随意
              attrs: { type: 'text' }
            }, ['航班日期：' + labelArr[0]]),
            createElement('p', { // 创建第二个元素的标签可随意
              attrs: { type: 'text', style: 'font-size: 12px' } // 给分割的某个元素单独加样式
            }, ['航班号：' + labelArr[1] || ''])
          ]
        )

        // h('span', {}, [
        //   h('span', {}, column.label.split('|')[0]),
        //   h('br'),
        //   h('span', {}, column.label.split('|')[1])
        // ])
      },
      tabChartContent (vc) {
        console.log('fpcResult:', vc.name)
        this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.activeName], {}, this.$store.state.isDisabledMenu) // 子组件数据改变同步到外部组件数据改变

        if (vc.name === 'flightRecordView') {
          this.$bus.$emit('reloadViewChart')
        }
      },

      resetFpcResultMenu () {
        this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.activeName], {}, this.$store.state.isDisabledMenu) // 子组件数据改变同步到外部组件数据改变
      },

      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.flightInfoTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.flightInfoTable.clearSelection()
        }
      },

      handleSelectionChange (val) {
        let disabledMenuObj = JSON.parse(JSON.stringify(this.$store.state.isDisabledMenu))
        this.fpcMultipleSelection = val

        console.log(this.fpcMultipleSelection)

        if (this.fpcMultipleSelection.length > 0) {
          disabledMenuObj['fpc_result_flinfo_allParamExport'] = false

          if (this.fpcMultipleSelection.length > 1) {
            disabledMenuObj['fpc_result_flinfo_dhbgcsdb'] = false
          } else {
            disabledMenuObj['fpc_result_flinfo_dhbgcsdb'] = true
          }

          let flights = []
          this.fpcMultipleSelection.forEach((item, index) => {
            flights.push(item.vwid)
          })

          this.exportFlightIds = flights
          let flightObj = {}
          flightObj['flights'] = flights
          flightObj['tables'] = this.fpcMultipleSelection
          flightObj['disabledMenuObj'] = disabledMenuObj

          this.$bus.$emit('flightsHandle', flightObj)
        } else {
          disabledMenuObj['fpc_result_flinfo_allParamExport'] = true
          disabledMenuObj['fpc_result_flinfo_dhbgcsdb'] = true

          this.exportFlightIds = []
          this.$bus.$emit('flightsHandle', {})
        }

        this.$bus.$emit('openHeaderMenuItem', 'fpc_result_flinfo', null, disabledMenuObj) // 修改头部显示效果
        this.$store.commit('IS_DISABLED_MENU', disabledMenuObj)
      },

      headerRowClassName ({row, rowIndex}) { // 表格头部样式
        return 'header-row-class-name'
      },

      tableRowClassName ({row, rowIndex}) { // 表格行样式
        return 'table-row-class-name'
      },

      flightInfoSizeChange (val) {
        this.flightInfoPageSize = val
        this.flightInfoCurrentChange(1)
      },

      flightInfoCurrentChange (val) {
      },

      initFlightInfoData () { // 显示表格数据
        this.flightInfoData = []
        let tableDataObj = this.$store.state.analysisResultAllData.tableData

        if (this.$util.isDefine(tableDataObj) && this.$util.isNotEmptyObject(tableDataObj)) { // 表格详情数据存在且不为空
          let colsData = tableDataObj.colsData
          let rowsData = tableDataObj.rowsData
          let colsZhData = tableDataObj.colsZhData

          if (this.$util.isDefine(colsData) && this.$util.isDefine(colsZhData) && this.$util.isDefine(rowsData)) {
            let colsDataArr = colsData.split(',')
            let colsZhDataArr = colsZhData.split(',')
            let tempCols = []
            if (colsDataArr.length > 0 && colsZhDataArr.length > 0 && colsDataArr.length === colsZhDataArr.length && rowsData.length > 0) {
              colsDataArr.forEach((item, index) => {
                tempCols.push({enName: item.toLowerCase(), zhName: colsZhDataArr[index]})
              })
              this.flightInfoColumnData = tempCols

              this.flightInfoData = this.fpcFlightObj.tables
            }
          }
        }
      },

      drawChart () {
        this.loadLineChart()
      },

      loadLineChart () {
        if (this.fpCharts) {
          this.fpCharts.dispose()
          console.log('销毁存在的echarts')
        }

        if (!this.$util.isNotEmptyObject(this.fpcFlightObj.fpcParamResult)) {
          return false
        }

        this.fpCharts = this.$echarts.init(document.getElementById('fpcChartContent'))
        // this.fpCharts.showLoading()
        this.gridVWID = []

        let that = this
        let fullPoint = this.fpcFlightObj.fpcParamResult.fullPoint
        if (fullPoint) {
          this.dataZoomChart = true
        } else {
          this.dataZoomChart = false
        }

        let pointData = this.fpcFlightObj.fpcParamResult.pointData
        let pointIndex = this.fpcFlightObj.fpcParamResult.pointIndex
        let flightData = this.fpcFlightObj.fpcParamResult.flightData
        let avgData = this.fpcFlightObj.fpcParamResult.aggData.avg
        let tantileData25 = this.fpcFlightObj.fpcParamResult.aggData.q25
        let tantileData50 = this.fpcFlightObj.fpcParamResult.aggData.q50
        let tantileData75 = this.fpcFlightObj.fpcParamResult.aggData.q75
        this.fpcGridColumData = []

        let seriesData = []
        let legendData = []
        let gridTableKeys = []

        if (flightData.length <= 0) {
          return false
        }

        this.fpcGridColumData.push({enName: 'engName', zhName: this.fpcFlightObj.fpcParamText.enginParamText})

        flightData.forEach((item, index) => {
          that.gridVWID.push(item.vwid)

          let tempSeries = {
            name: item.flight_date + '_' + item.flight_no,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 3,
            // step: 'middle',
            lineStyle: {
              width: 1
            },
            data: []
          }

          if (this.dataZoomChart) {
            tempSeries = {
              name: item.flight_date + '_' + item.flight_no,
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              lineStyle: {
                width: 1
              },
              data: []
            }
          }

          if (this.dataZoomChart) {
            legendData.push(item.flight_date + '_' + item.flight_no)
          }

          let pointList = pointData[item.vwid]
          if (pointList && pointList.length > 0) {
            that.fpcGridColumData.push({enName: tempSeries.name, zhName: tempSeries.name})
            gridTableKeys = pointData[item.vwid]

            pointList.forEach((n, num) => {
              tempSeries.data.push([n.index, n.data])
            })
          }

          // 平均值
          if (gridTableKeys.length > 0 && avgData.length > 0 && this.fpcFlightObj.fpcParam.avg) {
            if (legendData.indexOf('平均值') < 0) {
              let tempSubSeries = JSON.parse(JSON.stringify(tempSeries))
              tempSubSeries.name = '平均值'
              legendData.push('平均值')
              tempSubSeries.lineStyle.width = 3
              tempSubSeries.data = []
              tempSubSeries['z'] = 901

              gridTableKeys.forEach((n, num) => {
                tempSubSeries.data.push([n.index, avgData[num]])
              })
              seriesData.push(tempSubSeries)
            }
          }
          // 25分位值
          if (gridTableKeys.length > 0 && tantileData25.length > 0 && this.fpcFlightObj.fpcParam.tantile25) {
            if (legendData.indexOf('25分位值') < 0) {
              let tempSubSeries = JSON.parse(JSON.stringify(tempSeries))
              tempSubSeries.name = '25分位值'
              legendData.push('25分位值')
              tempSubSeries.lineStyle.width = 3
              tempSubSeries.data = []
              tempSubSeries['z'] = 902

              gridTableKeys.forEach((n, num) => {
                tempSubSeries.data.push([n.index, tantileData25[num]])
              })
              seriesData.push(tempSubSeries)
            }
          }
          // 50分位值
          if (gridTableKeys.length > 0 && tantileData50.length > 0 && this.fpcFlightObj.fpcParam.tantile50) {
            if (legendData.indexOf('50分位值') < 0) {
              let tempSubSeries = JSON.parse(JSON.stringify(tempSeries))
              tempSubSeries.name = '50分位值'
              legendData.push('50分位值')
              tempSubSeries.lineStyle.width = 3
              tempSubSeries.data = []
              tempSubSeries['z'] = 903

              gridTableKeys.forEach((n, num) => {
                tempSubSeries.data.push([n.index, tantileData50[num]])
              })
              seriesData.push(tempSubSeries)
            }
          }
          // 75分位值
          if (gridTableKeys.length > 0 && tantileData75.length > 0 && this.fpcFlightObj.fpcParam.tantile75) {
            if (legendData.indexOf('75分位值') < 0) {
              let tempSubSeries = JSON.parse(JSON.stringify(tempSeries))
              tempSubSeries.name = '75分位值'
              legendData.push('75分位值')
              tempSubSeries.lineStyle.width = 3
              tempSubSeries.data = []
              tempSubSeries['z'] = 904

              gridTableKeys.forEach((n, num) => {
                tempSubSeries.data.push([n.index, tantileData75[num]])
              })
              seriesData.push(tempSubSeries)
            }
          }

          if (this.fpcFlightObj.fpcParam.avg ||
              this.fpcFlightObj.fpcParam.tantile25 ||
              this.fpcFlightObj.fpcParam.tantile50 ||
              this.fpcFlightObj.fpcParam.tantile75
          ) {
            tempSeries.lineStyle['color'] = '#8e8e8e'
            tempSeries.symbolSize = 1
            tempSeries['itemStyle'] = {
              color: '#8e8e8e'
            }
            // tempSeries.symbol = 'none'
          }
          seriesData.push(tempSeries)
        })

        if (avgData.length > 0 && this.fpcFlightObj.fpcParam.avg) {
          this.fpcGridColumData.push({enName: 'avgName', zhName: '平均值'})
        }
        if (tantileData25.length > 0 && this.fpcFlightObj.fpcParam.tantile25) {
          this.fpcGridColumData.push({enName: 'tantile25Name', zhName: '25分位值'})
        }
        if (tantileData50.length > 0 && this.fpcFlightObj.fpcParam.tantile50) {
          this.fpcGridColumData.push({enName: 'tantile50Name', zhName: '50分位值'})
        }
        if (tantileData75.length > 0 && this.fpcFlightObj.fpcParam.tantile75) {
          this.fpcGridColumData.push({enName: 'tantile75Name', zhName: '75分位值'})
        }

        // that.fpcGridData.push({
        //   engName: 'TAXT_OUT-10',
        //   '2020-02-10_9126': '11',
        //   '2020-02-10_5912': '12',
        //   '2020-02-10_9886': '13',
        //   avgName: '12'
        // })
        if (!this.$util.isNotEmptyObject(pointData)) {
          return false
        }
        gridTableKeys.forEach((jtem, jndex) => {
          // this.fpcFlightObj.fpcParamText.timePointText
          let eName = jtem.index
          let tempRowObj = {}

          tempRowObj['engName'] = eName.replace('T', this.fpcFlightObj.fpcParamText.timePointText)
          flightData.forEach((item, index) => {
            let name = item.flight_date + '_' + item.flight_no
            let pointList = pointData[item.vwid]

            try {
              let value = pointList[jndex].data
              tempRowObj[name] = value
            } catch (error) {
              tempRowObj[name] = '-'
            }
          })

          if (avgData.length > 0 && this.fpcFlightObj.fpcParam.avg) {
            tempRowObj['avgName'] = avgData[jndex] || '-'
          }
          if (tantileData25.length > 0 && this.fpcFlightObj.fpcParam.tantile25) {
            tempRowObj['tantile25Name'] = tantileData25[jndex] || '-'
          }
          if (tantileData50.length > 0 && this.fpcFlightObj.fpcParam.tantile50) {
            tempRowObj['tantile50Name'] = tantileData50[jndex] || '-'
          }
          if (tantileData75.length > 0 && this.fpcFlightObj.fpcParam.tantile75) {
            tempRowObj['tantile75Name'] = tantileData75[jndex] || '-'
          }

          that.fpcGridData.push(tempRowObj)
        })

        let disabledMenuObj = JSON.parse(JSON.stringify(this.$store.state.isDisabledMenu))
        if (that.fpcGridData.length > 0) {
          disabledMenuObj['fpc_result_grid_export'] = false
          this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.activeName], null, disabledMenuObj)
        } else {
          disabledMenuObj['fpc_result_grid_export'] = true
          this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.activeName], null, disabledMenuObj)
        }
        this.$store.commit('IS_DISABLED_MENU', disabledMenuObj)

        if (seriesData.length > 0) {
          this.isShowChart = false
        } else {
          this.isShowChart = true
        }

        let option = {
          title: {
            show: false,
            // text: '图表名称',
            left: 'center'
          },
          grid: {
            left: '120',
            right: '4%',
            bottom: '100',
            containLabel: false
          },
          legend: {
            top: '12',
            type: 'scroll',
            textStyle: {
              lineHeight: 20,
              rich: {
                a: {
                  // color: 'red',
                  lineHeight: 18
                },
                x: {
                  fontSize: 12,
                  lineHeight: 18,
                  borderColor: '#449933',
                  borderRadius: 4
                }
              }
            },
            formatter: function (name) {
              let names = name.split('_')
              if (names.length > 1) {
                return `{a|航班日期：${names[0]}}\n{x|航  班 号：${names[1]}}`
              } else {
                return name
              }
            },
            data: legendData
          },
          tooltip: {
            trigger: 'item', // axis | item
            formatter: param => {
              // console.log(param)
              let dataIndex = param.dataIndex
              let tempStr = ''
              if (this.fpcFlightObj.fpcParam.avg) {
                tempStr += '<br> ----<br>平均值：' + avgData[dataIndex]
              }
              if (this.fpcFlightObj.fpcParam.tantile25) {
                tempStr += '<br> ----<br>25分位值：' + tantileData25[dataIndex]
              }
              if (this.fpcFlightObj.fpcParam.tantile50) {
                tempStr += '<br> ----<br>50分位值：' + tantileData50[dataIndex]
              }
              if (this.fpcFlightObj.fpcParam.tantile75) {
                tempStr += '<br> ----<br>75分位值：' + tantileData75[dataIndex]
              }
              let tempStrs = param.seriesName.split('_')
              let hbh = tempStrs[1] ? '航班日期：' + tempStrs[0] + '<br>航班号：' + tempStrs[1] : ''
              return hbh + '<br>' + param.marker + param.name + '：' + param.value[1] + tempStr
            },
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'cross' // 默认为直线，可选为：'line' | 'shadow' | 'cross'
            }
          },
          xAxis: {
            name: this.fpcFlightObj.fpcParamText.timePointText,
            nameLocation: 'center',
            type: 'category',
            nameGap: 76,
            boundaryGap: false,
            // alignWithLabel: 'auto',
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              interval: 'auto', // 0强制显示所有标签
              rotate: 30,
              margin: 10
            },
            axisTick: {
              show: true
            }
            // data: ['', '', '', '', '', '', '', '', '', '']
          },
          yAxis: {
            name: this.fpcFlightObj.fpcParamText.enginParamText,
            // position: 'left',
            // nameLocation: 'middle',
            // nameTextStyle: {
            //   color: '#999999',
            //   fontSize: 14
            // },
            // nameGap: 40
            type: 'value',
            position: 'left',
            nameLocation: 'middle',
            nameGap: '80',
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              show: true,
              interval: 'auto'
            }
          },
          series: seriesData
          // series: [{
          //   type: 'line',
          //   step: 'middle', // start | middle | end
          //   data: [12, 23, 34, 24, 43, 45, 67, 46, 54, 65]
          // }]
        }

        this.fpCharts.setOption(option)

        if (this.dataZoomChart) {
          this.fpCharts.setOption({
            color: ['#13ADFF', '#01D4C7', '#AECB56', '#3A44FB', '#70E81A', '#F5A623', '#F44336', '#F3BFF3', '#84B3F9', '#ECF013'],
            xAxis: {
              data: pointIndex
            },
            dataZoom: [{
              type: 'inside',
              start: 0,
              end: 10
            }, {
              start: 0,
              end: 10,
              // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              // handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }]
          })
        }

        // const myCharts = this.fpCharts
        // this.fpCharts.on('mouseover', (params) => { // 鼠标移入
        //   // setTimeout(() => {
        //     let series = option.series[params.seriesIndex]
        //     series.symbolSize = 8
        //     series.lineStyle.width = 6
        //     series.lineStyle['color'] = 'red'
        //     series['zlevel'] = 10

        //     option.series[params.seriesIndex] = series
        //     myCharts.setOption(option, true)
        //   // }, 100)
        // })

        // this.fpCharts.on('mouseout', (params) => { // 鼠标移出
        //   // setTimeout(() => {
        //     let series = option.series[params.seriesIndex]
        //     series.symbolSize = 2
        //     series.lineStyle.width = 1
        //     series['zlevel'] = 0

        //     delete series.lineStyle['color']

        //     option.series[params.seriesIndex] = series
        //     myCharts.setOption(option, true)
        //   // }, 100)
        // })

        // this.fpCharts.hideLoading()
      },

      gridSizeChange (val) {
        this.gridPageSize = val
        this.gridCurrentPage = 1
      },
      gridCurrentChange (val) {
        this.gridCurrentPage = val
      },

      exportFpcGrid () {
        this.$store.commit('SHOW_LOADING', '正在下载数据，请稍等！') // 打开加载提示框

        let tempParam = JSON.parse(JSON.stringify(this.fpcFlightObj.fpcParam))
        tempParam['gridVWID'] = this.gridVWID.join(',')

        // delete tempParam['avg']

        this.$axios({
          url: '/flightRecords/exportMultiFlightData',
          method: 'post',
          data: tempParam,
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          responseType: 'blob'
        }).then(response => {
          console.log('exportTableConfig~~~:', response)
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

      exportAllParam () {
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
        }).then(response => {
          console.log('exportTableConfig~~~:', response)
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

      openExportDialog  () {
        if (this.flightInfoData.length <= 0) {
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
      exportTableDetailData () { // 导出数据
        let tempTablePageCount = this.exportTablePageCountRadio
        if (this.flightInfoData.length <= 0) {
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
        submitAnalysisParams['gridVWID'] = this.gridVWID.join(',')

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

        this.postExcelFile(submitAnalysisParams, '/dsap/export/exportTableConfig')
      },
      postExcelFile (params, url) { //params是post请求需要的参数，url是请求url地址
        let form = document.createElement('form')
        form.style.display = 'none'
        form.action = url
        form.method = 'post'
        // form.target = '_blank'
        document.body.appendChild(form)

        let str = JSON.stringify(params)
        let reg = new RegExp('"', 'g')
        form.innerHTML = '<input name="sub" id="sub" value="' + str.replace(reg, '&quot;') + '" />'

        form.submit()
        form.remove()
        this.dialogExportVisible = false
      },

      handleHeaderCell ({ row, column, rowIndex, columnIndex }) {
        console.log(row[0].id)
        var _this = this
        _this.headerCellClassName = row[0].id
        this.$nextTick(() => {
          _this.getDiagonal()
        })
      },
      getDiagonal () {
        var _this = this
        // 获取第一个单元格DOM元素
        // let oHeaderCell = document.getElementsByClassName(_this.headerCellClassName)[0]
        let oHeaderCell = document.getElementsByClassName('fpc-result-grid-first')[0]
        // 通过一个单元格的宽高，确定对角线的长度与正切值。
        try {
          _this.headerCellOffsetWidth = oHeaderCell.offsetWidth
          _this.headerCellOffsetHeight = oHeaderCell.offsetHeight
        } catch (error) {
          // _this.headerCellOffsetWidth = oHeaderCell
          console.log(error.message)
        }

        _this.diagonalWidth = Math.sqrt(
          Math.pow(_this.headerCellOffsetWidth, 2) + Math.pow(_this.headerCellOffsetHeight, 2)
        )
        _this.diagonalAngel = Math.atan(
          _this.headerCellOffsetHeight / _this.headerCellOffsetWidth
        ) * 180 / Math.PI

        _this.diagonalWidth = _this.diagonalWidth + 'px'
        _this.diagonalAngel = `rotate(-${_this.diagonalAngel}deg)`
      }
    }
  }
</script>

<style>
div[class=fpc-result-grid-first]{
  width: 100%;
}
div[class=fpc-result-grid-first]::before {
  content: "";
  position: absolute;
  /* width: 1px; */
  height: 1px;
  /* height: var(--diagonalWidth); */
  /* top: 0; */
  right: -60%;
  bottom: -4px;
  left: 0;

  background-color: #e4e7ed;
  display: block;
  /* transform: rotate(-75deg); */
  /* transform: var(--diagonalAngel); */
  transform: rotate(8deg);
  transform-origin: top;
  /* -ms-transform: rotate(-75deg);
  -ms-transform-origin: top; */
}
div[class=fpc-result-grid-first]::after {
  content: "";
  position: absolute;
  /* width: 1px; */
  /* height: 75px; */
  height: 1px;
  /* top: 0; */
  right: -60%;
  bottom: 14px;
  left: 0;
  background-color: #e4e7ed;
  display: block;
  /* transform: rotate(-45deg); */
  transform: rotate(26deg);
  transform-origin: top;
  /* -ms-transform: rotate(-45deg); */
  /* -ms-transform-origin: top; */
}
.title1{
  position: absolute;
  top: 0px;
  right: 10px;
}
.title2{
  position: absolute;
  top: -6px;
  left: 30px;
}
.title3{
  position: absolute;
  top: 26px;
  left: 8px;
}
</style>

<style scoped>
  .fpc-result {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .fpc-result .el-tabs.el-tabs--top {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  .fpc-result >>> .el-table th {
    background: #fff !important;
  }
  .fpc-result >>> .el-tabs__header.is-top {
    height: 30px;
  }
  .fpc-result >>> .el-tabs__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .fpc-result >>> .el-tab-pane {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .fpc-result >>> .el-table th:nth-child(1) .cell {
    overflow: initial;
  }

  .flight-chart,
  .grid-wrap,
  .flight-info-wrap {
    position: relative;

    height: 100vh;

    box-sizing: border-box;
  }

  .flight-chart .slider {
    margin: 10px;
    padding: 0 10px;
  }

  .fpc-chart-empty-text {
    position: absolute;
    left: 42%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #909399;
  }
  .fpc-chart-style-content {
    position: relative;
    width: 240px;
    height: 100%;
    border-left: 1px solid #dddddd;
  }
  .fpc-content {
    border-bottom: 1px solid #dddddd;
  }
  .fpc-content:after {
    position: absolute;
    left: 28px;
    top: 20px;
    content: '';
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #437acf;
  }
  .fpc-info-jiantou {
    position: relative;
    color: #2f4b77;
    font-size: 20px;
  }
  .fpc-info {
    font-size: 12px;
    color: #555555;
    margin: 10px 21px;
    line-height: 20px;
  }
  .fpc-data-set {
    margin-left: 10px;
  }
  .fpc-data-title {
    position: relative;
    padding: 20px 10px 10px 0;
    font-size: 12px;
    border-bottom: 1px solid #dddddd;
  }
  .fpc-type {
    width: 65px;
  }
  .fpc-name {
    min-width: 0;
    padding-left: 5px;
  }
  .fpc-name-text {
    width: 155px;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
  }

  .fpc-data-title::before {
    top: 25px;
    right: 8px;
    border-top-color: #999999;
    position: absolute;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .fpc-data-title.active:after {
    top: 15px;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .fpc-data-title.active:before {
    top: 13px;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .fpc-item-list {
    height: 0;
    position: relative;
    overflow: hidden;
    -webkit-transition: height 0.6s;
    -moz-transition: height 0.6s;
    -o-transition: height 0.6s;
    transition: height 0.6s;
  }
  .fpc-item-list.active {
    height: auto;
  }
  .fpc-item {
    margin-top: 16px;
  }
  .fpc-item-name {
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 14px;
    margin-right: 10px;
  }

  .export-dialog .export-dialog-container .container {
    justify-content: center;
    display: flex;
  }
  .export-dialog-container >>> .el-radio {
    margin-left: 15px;
    line-height: 30px;
  }
  .export-dialog-container >>> .el-input {
    width: 120px;
    margin-left: 20px;
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
</style>
