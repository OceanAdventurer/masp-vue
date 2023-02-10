<template>
  <div class="analysisChart df-f1 w100 h100">
    <div id="axisChartInfo" v-show="isShowAxisChart" class="df df-fd-r w100 h100">
      <div class="axis-chart-content df-f1 h100">
        <div id="axisChartContent" ref="axisChartContent"></div>
      </div>
      <div class="axis-chart-style-content">
        <div class="axis-content">
          <div class="axis-info">信息</div>
          <span class="axis-info-jiantou"></span>
        </div>
        <div class="axis-data-content">
          <div class="axis-data-set" @click="openMoreInfo(axisOneTreeId, currAxisItemStatus)" v-show="isShowOneAxis">
            <div class="df df-fd-r axis-data-title"
              :class="{'active': currAxisItemId === axisOneTreeId}">
              <div class="axis-type">轴1:</div>
              <div class="axis-name"><div class="axis-name-text">{{axisOneName}}</div></div>
            </div>
            <div class="df df-fd-c axis-item-list" :class="{'active': currAxisItemId === axisOneTreeId}">
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">分析数量：</span>
                <span>{{axisOneNameObj['sumAnalysis']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">最小值：</span>
                <span>{{axisOneNameObj['minValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">总数：</span>
                <span>{{axisOneNameObj['sumNum']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">最大值：</span>
                <span>{{axisOneNameObj['maxValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">平均值：</span>
                <span>{{axisOneNameObj['avgValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">无效数量：</span>
                <span>{{axisOneNameObj['isNullNum']}}</span>
              </div>
            </div>
          </div>
          <div class="axis-data-set" @click="openMoreInfo(axisTwoTreeId, currAxisItemStatus)" v-show="isShowTwoAxis">
            <div class="df df-fd-r axis-data-title"
              :class="{'active': currAxisItemId === axisTwoTreeId}">
              <div class="axis-type">轴2:</div>
              <div class="axis-name"><div class="axis-name-text">{{axisTwoName}}</div></div>
            </div>
            <div class="df df-fd-c axis-item-list" :class="{'active': currAxisItemId === axisTwoTreeId}">
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">分析数量：</span>
                <span>{{axisTwoNameObj['sumAnalysis']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">最小值：</span>
                <span>{{axisTwoNameObj['minValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">总数：</span>
                <span>{{axisTwoNameObj['sumNum']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">最大值：</span>
                <span>{{axisTwoNameObj['maxValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">平均值：</span>
                <span>{{axisTwoNameObj['avgValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">无效数量：</span>
                <span>{{axisTwoNameObj['isNullNum']}}</span>
              </div>
            </div>
          </div>
          <div class="axis-data-set" @click="openMoreInfo(axisThreeTreeId, currAxisItemStatus)" v-show="isShowThreeAxis">
            <div class="df df-fd-r axis-data-title"
              :class="{'active': currAxisItemId === axisThreeTreeId}">
              <div class="axis-type">轴3:</div>
              <div class="axis-name"><div class="axis-name-text">{{axisThreeName}}</div></div>
            </div>
            <div class="df df-fd-c axis-item-list" :class="{'active': currAxisItemId === axisThreeTreeId}">
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">分析数量：</span>
                <span>{{axisThreeNameObj['sumAnalysis']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">最小值：</span>
                <span>{{axisThreeNameObj['minValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">总数：</span>
                <span>{{axisThreeNameObj['sumNum']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">最大值：</span>
                <span>{{axisThreeNameObj['maxValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">平均值：</span>
                <span>{{axisThreeNameObj['avgValue']}}</span>
              </div>
              <div class="df df-fd-r axis-item">
                <span class="axis-item-name">无效数量：</span>
                <span>{{axisThreeNameObj['isNullNum']}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="export-btn" style="display: none;">
          <el-button type="primary" @click="downloadImgByChart">导出</el-button>
        </div>
      </div>

      <div class="percentage df df-fd-r" style="right: 400px;">
        <el-checkbox v-model="isShowChartText" :disabled="disabledChartText" @change="handleCheckedChartTextChange">显示数值</el-checkbox >

        <!-- <el-checkbox v-model="isShowScatterChart" :disabled="disabledScatterChart" @change="handleCheckedScatterChartChange">切换散点图</el-checkbox > -->
      </div>
    </div>
    <div class="axis-chart-empty-text" v-show="!isShowAxisChart">暂无图表数据</div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'

export default {
  name: 'AnalysisChart',
  props: { // 属性定义
    chartType: { // 图表类型
      type: String // 值类型：String
    },
    chartZhName: {
      type: String
    },
    activeTabName: { // 当前激活的tab名字
      type: String
    }
  },
  data () {
    return {
      charts: '', // 图表实例
      isShowOneAxis: false, // 是否显示轴1标识，默认false不显示，true显示
      isShowTwoAxis: false, // 是否显示轴2标识，默认false不显示，true显示
      isShowThreeAxis: false, // 是否显示轴3标识，默认false不显示，true显示
      summaryObj: {}, // 临时存储数据汇总数据
      isShowAxisChart: false, // 是否显示图表，默认false不显示，true显示
      currAxisItemId: '', // 当前点击的轴编号
      currAxisItemStatus: false, // 当前点击的轴状态
      axisOneName: '', // 轴1的名字
      axisOneTreeId: '', // 轴1的节点编号
      axisOneNameObj: {}, // 轴1信息
      axisTwoName: '', // 轴2的名字
      axisTwoTreeId: '', // 轴2的节点编号
      axisTwoNameObj: {}, // 轴2的信息
      axisThreeName: '', // 轴3的名字
      axisThreeTreeId: '', // 轴3的节点编号
      axisThreeNameObj: {}, // 轴3的信息
      isShowPercentage: false, // 是否显示百分比复选框
      disabledPercentage: true, // 是否禁用百分比复选框
      isShowBartage: false, // 是否显示柱状图复选框
      disabledBartage: true, // 是否禁用柱状图复选框
      isShowFlightRate: false, // 是否显示航班率复选框
      disabledFlightRate: true, // 是否禁用航班率复选框
      isShowChartText: false, // 是否显示图表文本
      disabledChartText: true, // 是否禁用图表文本
      isShowScatterChart: false,
      disabledScatterChart: true,
      bartageText: '是否显示柱状图',
      currentAxisName: '', // 当前显示的轴名字
      symbolSize: 5, // 散点的大小
      tempTwoAgg: '',
      chartParams: [], // 点击图表保存数据，钻取时使用
      axisDateObj: { // 轴日期格式
        'YYYY': 'YYYY',
        'YYYY/MM': 'YYYY/MM',
        'YYYY/MM/dd': 'YYYY/MM/dd',
        'YYYY/MM/dd HH': 'YYYY/MM/dd HH',
        'YYYY/MM/dd HH:mm': 'YYYY/MM/dd HH:mm',
        'YYYY/MM/dd HH:mm:ss': 'YYYY/MM/dd HH:mm:ss',
        'quarter': '季度',
        'month': '月',
        'dayofweek': '星期',
        'day': '日',
        'hour': '时'
      },
      quarterValObj: {
        '第一季度': 1,
        '第二季度': 2,
        '第三季度': 3,
        '第四季度': 4
      },
      weekValObj: {
        '星期一': 2,
        '星期二': 3,
        '星期三': 4,
        '星期四': 5,
        '星期五': 6,
        '星期六': 7,
        '星期日': 1
      },
      dataPointWObj: {
        2: '一',
        3: '二',
        4: '三',
        5: '四',
        6: '五',
        7: '六',
        1: '日'
      },
      tempOneFormatData: '',
      tempTwoFormatData: '',
      eventTreeObj: {},
      isLastLine: false
    }
  },
  watch: {
    chartType (newVal, oldVal) { // 监控图表的类型
      // TODO: 拆分图表数据接口
      console.log('chartType:', newVal, oldVal)
      if (this.$util.isDefine(newVal) && this.$util.isDefine(this.$util.CHART_TYPE_OBJ[newVal]) && newVal !== oldVal) {
        this.drawChart()
      }
    }
  },
  created () {
    this.initSummaryData()

    this.inintEventTreeData()
  },
  mounted () {
    this.$nextTick(() => { // 整个视图都渲染完毕后开始渲染图表数据
    setTimeout(() => {
        this.drawChart()
      }, 20)
    })

    // 然后监听window的resize事件．在浏览器窗口变化时再设置下图表宽高．
    window.addEventListener('resize', () => {
      setTimeout(() => {
        if (this.charts) this.charts.resize()
      }, 50)
    })

    // 点击logo重置图表大小
    document.getElementById('app').addEventListener('click', (e) => {
        let currentClassName = e.target.className
        if (currentClassName !== '') {
          setTimeout(() => {
            if (document.getElementById('analysisContent') && document.getElementById('analysis_result')) {
            if (document.getElementById('analysisContent').style.display !== 'none' &&
              document.getElementById('analysis_result').style.display !== 'none' &&
              this.activeTabName === '2dChart') {
                console.log('重置图表样式大小')
                this.resetChartWH('axisChartContent') // 重置图表大小
                if (this.charts) this.charts.resize()
              }
            }
          }, 50)
        }
      }
    )

    this.$bus.$on('drawChartHandle', () => {
      this.drawChart()
    })

    // 点击钻取跳转到新建分析界面
    this.$bus.$on('resumitAnalysisByDrilldownHandle', () => {
      this.resetAnalysisParamsByDrilldown()
    })

    // 点击导出 导出图表图片
    this.$bus.$on('downloadImgByChartHandle', () => {
      this.downloadImgByChart()
    })
  },
  destroyed () {
    this.$bus.$off('drawChartHandle')
    this.$bus.$off('resumitAnalysisByDrilldownHandle') // 移除自定义事件监听器。
    this.$bus.$off('downloadImgByChartHandle') // 移除自定义事件监听器。
  },
  methods: {
    initSummaryData () { // 初始化汇总数据
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.summaryData)) {
        this.summaryObj = this.$store.state.analysisResultAllData.summaryData
        this.tempTwoAgg = this.$store.state.analysisResultAllData.submitAnalysisParams.twoAggregation

        if (this.$util.isDefine(this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneName)) {
          this.axisOneName = this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneName
          this.axisOneTreeId = this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneTreeId
          if (this.$util.isDefine(this.summaryObj.axisOneKey)) {
            this.axisOneNameObj = this.summaryObj.axisOneKey
            this.isShowOneAxis = true
          }
        }

        if (this.$util.isDefine(this.$store.state.analysisResultAllData.submitAnalysisParams.axisTwoName)) {
          this.axisTwoName = this.$store.state.analysisResultAllData.submitAnalysisParams.axisTwoName
          this.axisTwoTreeId = this.$store.state.analysisResultAllData.submitAnalysisParams.axisTwoTreeId
          if (this.$util.isDefine(this.summaryObj.axisTwoKey)) {
            this.axisTwoNameObj = this.summaryObj.axisTwoKey
            this.isShowTwoAxis = true
          }
        }

        if (this.$util.isDefine(this.$store.state.analysisResultAllData.submitAnalysisParams.axisThreeName)) {
          this.axisThreeName = this.$store.state.analysisResultAllData.submitAnalysisParams.axisThreeName
          this.axisThreeTreeId = this.$store.state.analysisResultAllData.submitAnalysisParams.axisThreeTreeId
          if (this.$util.isDefine(this.summaryObj.axisThreeKey)) {
            this.axisThreeNameObj = this.summaryObj.axisThreeKey
            this.isShowThreeAxis = true
          }
        }
      }
    },
    inintEventTreeData () {
      let submitAnalysisParams = this.$store.state.analysisResultAllData.submitAnalysisParams // 临时存取已经提交的新建分析参数
      let treeType = submitAnalysisParams['axisOneTreeType'] // 对应tree的TYPE

      if (treeType === 'event') {
        this.$axios({
          url: '/submit/eventParams',
          method: 'get',
          params: {
            id: submitAnalysisParams['axisOneTreeId']
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框

          if (this.$util.isNotEmptyObject(response.data)) {
            this.eventTreeObj = response.data
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    openMoreInfo (name, status) {
      if (status) {
        this.currAxisItemStatus = false
        this.currAxisItemId = ''
      } else {
        this.currAxisItemStatus = true
        this.currAxisItemId = name
      }
    },
    drawChart () { // 渲染图表
      if (this.charts) { // 如果图表存在，则销毁重新渲染
        this.charts.dispose()
      }
      this.disabledBartage = true
      this.isShowBartage = false
      this.disabledFlightRate = true
      // this.isShowFlightRate = false
      this.disabledChartText = true

      this.disabledScatterChart = true

      this.resetChartWH('axisChartContent') // 重置图表大小
      this.charts = this.$echarts.init(document.getElementById('axisChartContent')) // 初始化图表

      if (this.chartType === 'bar' || this.chartType === 'line') { // 设置柱状和折线类型图表参数
        if (this.chartType === 'bar') {
          this.disabledFlightRate = false
        }
        this.disabledChartText = false
        this.setBarOrLineChart()
      } else if (this.chartType === 'pie') { // 饼状类型图表
        this.setPieChart()
      } else if (this.chartType === 'barStack') { // 堆叠图类型图表
        this.disabledChartText = false
        this.setBarStackChart()
      } else if (this.chartType === 'scatter') { // 散点类型图表
        if (this.$store.state.analysisResultAllData.submitAnalysisParams.axisThreeTreeType === '3') {
          this.isShowScatterChart = true
          this.setScatter3DChart()
        } else {
          this.setScatter()
        }
      } else if (this.chartType === 'boxplot') { // 蜡烛类型图表
        this.setBoxplotChart()
      } else if (this.chartType === 'bar3D') { // 3D柱状图类型图表
        this.disabledChartText = false
        this.setBar3DChart()
      } else if (this.chartType === 'scatter3D') { // 3D散点图类型图表
        this.disabledScatterChart = false
        this.isShowScatterChart = false
        this.setScatter3DChart()
      }
    },
    setBarOrLineChart () { // 设置柱状图或折线图
      if (this.$util.isDefine(this.$store.state.analysisResultAllData.submitAnalysisParams.isGuide)) {
        this.disabledPercentage = true // 添加辅助线禁用百分比
      } else {
        this.disabledPercentage = false // 启用百分比
      }
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.barLinePieData)) {
        if (this.$store.state.analysisResultAllData.barLinePieData.xAxisData.length > 0 && this.$store.state.analysisResultAllData.barLinePieData.seriesData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        this.currentAxisName = this.$store.state.analysisResultAllData.barLinePieData.xAxisName // 默认显示当前轴的名字
        let tempSeriesDataArr = []
        let colorArr = [] // 图形的颜色
        let legendArr = [] // 图例
        for (let i = 0; i < this.$store.state.analysisResultAllData.barLinePieData.seriesData.length; i++) {
          if (this.isShowPercentage) { // 百分比数据
            tempSeriesDataArr.push({type: this.chartType, barMaxWidth: 30, data: this.$store.state.analysisResultAllData.barLinePieData.seriesPercentData[i]})
          } else { // 原始数据
            if (this.$store.state.analysisResultAllData.submitAnalysisParams.isGuide === '1') { // 添加辅助线
              tempSeriesDataArr.push({
                name: this.$store.state.analysisResultAllData.submitAnalysisParams.sublineNameColor[i].sublineName,
                type: this.chartType,
                barMaxWidth: 30,
                label: {
                  show: this.isShowChartText,
                  position: 'top',
                  distance: 8,
                  align: 'left',
                  verticalAlign: 'middle',
                  rotate: 90,
                  formatter: '{val|{c}}',
                  fontSize: 12,
                  color: '#000',
                  rich: {
                    name: {
                      color: '#000',
                      textBorderColor: '#fff'
                    },
                    val: {
                      color: '#000',
                      textBorderWidth: 2
                    }
                  }
                },
                data: this.$store.state.analysisResultAllData.barLinePieData.seriesData[i]
              })
            } else { // 非添加辅助线的数据
              if (this.isShowFlightRate && !this.disabledFlightRate) {
                tempSeriesDataArr.push({
                  type: this.chartType,
                  barMaxWidth: 30,
                  label: {
                    show: this.isShowChartText,
                    position: 'top',
                    distance: 8,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    formatter: '{val|{c}}',
                    fontSize: 12,
                    color: '#000',
                    rich: {
                      name: {
                        color: '#000',
                        textBorderColor: '#fff'
                      },
                      val: {
                        color: '#000',
                        textBorderWidth: 2
                      }
                    }
                  },
                  data: this.$store.state.analysisResultAllData.barLinePieData.seriesData[i]
                })
              } else {
                if (this.isShowChartText && !this.disabledChartText) {
                  tempSeriesDataArr.push({
                    type: this.chartType,
                    barMaxWidth: 30,
                    label: {
                      show: true,
                      position: 'top', //  'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
                      distance: 8,
                      align: 'left',
                      verticalAlign: 'middle',
                      rotate: 90,
                      formatter: '{val|{c}}', //   {name|{a}}
                      fontSize: 12,
                      color: '#000',
                      rich: {
                        name: {
                          color: '#000',
                          textBorderColor: '#fff'
                        },
                        val: {
                          // textBorderColor: '#fff',
                          color: '#000',
                          textBorderWidth: 2
                        }
                      }
                    },
                    data: this.$store.state.analysisResultAllData.barLinePieData.seriesData[i]
                  })
                } else {
                  tempSeriesDataArr.push({
                    type: this.chartType,
                    barMaxWidth: 30,
                    data: this.$store.state.analysisResultAllData.barLinePieData.seriesData[i]
                  })
                }
              }
            }
          }
        }

        if (this.$store.state.analysisResultAllData.submitAnalysisParams.isGuide === '1') { // 添加辅助线
          let sublineNameColorArr = this.$store.state.analysisResultAllData.submitAnalysisParams.sublineNameColor
          if (sublineNameColorArr.length > 0) {
            sublineNameColorArr.map((item) => {
              legendArr.push(item.sublineName)
              colorArr.push(item.sublineColor)
            })
          }
        } else {
          colorArr.push('#3A6BB9')
        }
        let that = this
        this.charts.setOption({
          title: {
            show: true,
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            left: 'center',
            top: 10
          },
          legend: {
            data: legendArr,
            align: 'left',
            left: 10,
            top: 20
          },
          color: colorArr,
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
              let value = 0
              let str = ''
              let s1 = ''
              str += params[0].axisValue
              params.forEach((item, i) => {
                if (item.value !== '-' && item.value !== '0' && item.value !== 0) {
                  value += parseFloat(item.value)
                  s1 += item.marker + item.seriesName + ': ' + this.numFormat(item.value) + '<br>'
                }
              })

              if (params.length > 1) {
                str += ': ' + this.numFormat(value) + '<br>' + s1
              } else {
                str += ': ' + this.numFormat(value)
              }

              return str
            }
            // formatter: this.isShowPercentage ? '{b}<br/>{c}%' : ''
          },
          grid: {
            left: '120',
            right: '4%',
            bottom: '100',
            containLabel: false
          },
          xAxis: {
            // name: this.$store.state.analysisResultAllData.barLinePieData.xAxisName,
            name: this.axisOneName,
            nameLocation: 'center',
            nameGap: 76,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            type: 'category',
            axisLabel: {
              interval: 'auto', // 0强制显示所有标签
              rotate: 30,
              margin: 10
            },
            data: this.$store.state.analysisResultAllData.barLinePieData.xAxisData
          },
          yAxis: {
            // name: this.$store.state.analysisResultAllData.barLinePieData.yAxisName ? this.$store.state.analysisResultAllData.barLinePieData.yAxisName : '航班数量',
            name: this.axisTwoName && this.tempTwoAgg !== 'count' ? this.axisTwoName : this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '事件数量' : '航班数量',
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
              interval: 'auto',
              // formatter: this.isShowPercentage ? '{value}%' : '{value}'
              formatter: (val) => {
                if (that.isShowPercentage) {
                  return val + '%'
                } else {
                  // let val = '{value}'
                  if (val >= 10000) {
                    return (val / 1000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                  } else if (val >= 100000) {
                    return (val / 10000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                  } else {
                    return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                  }
                }
              }
            }
          },
          series: tempSeriesDataArr
        })

        this.charts.on('click', (params) => {
          console.log('setBarOrLineChart:', params)

          this.assemblyChartParams(params)
          // this.$bus.$emit('drillDownHandler', 'drillDown', tempParams) // 在分析结果中表格tab页面打开钻取页面

          // let seriesData = this.charts.getOption().series[0].data
          // let index = params.dataIndex
          // for (var i = 0; i < seriesData.length; i++) {
          //   if (seriesData[i].value) {
          //     seriesData[i] = seriesData[i].value
          //   }
          //   if (index === i) {
          //     seriesData[i] = {
          //       value: seriesData[i],
          //       itemStyle: { color: 'red' }
          //     }
          //   }
          // }
          // console.log(JSON.stringify(seriesData))
          // this.charts.setOption({
          //   series: [{
          //     data: seriesData
          //     // data: []
          //   }]
          // })
        })
      } else if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.barStackData)) {
        this.isShowBartage = true
        this.setBarStackChart()
      } else {
        this.isShowAxisChart = false
      }
    },
    setPieChart () { // 设置饼状图
      if (this.$util.isDefine(this.$store.state.analysisResultAllData.submitAnalysisParams.isGuide)) {
        this.disabledPercentage = true // 添加辅助线禁用百分比
      } else {
        this.disabledPercentage = false // 启用百分比
      }
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.barLinePieData)) {
        if (this.$store.state.analysisResultAllData.barLinePieData.pieChartData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        this.currentAxisName = this.$store.state.analysisResultAllData.barLinePieData.xAxisName // 默认显示当前轴的名字

        let tempSeriesDataArr = []
        if (this.isShowPercentage) {
          tempSeriesDataArr.push({type: 'pie', radius: '55%', data: this.$store.state.analysisResultAllData.barLinePieData.piePercentData})
        } else {
          tempSeriesDataArr.push({type: 'pie', radius: '55%', data: this.$store.state.analysisResultAllData.barLinePieData.pieChartData})
        }
        this.charts.setOption({
          title: {
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: this.isShowPercentage ? '{b}<br/>{c}<br/>{d}%' : '{b}<br/>{c}'
          },
          series: tempSeriesDataArr
        })

        this.charts.on('click', (params) => {
          console.log('setPieChart:', params)
          this.assemblyChartParams(params)
        })
      } else {
        this.isShowAxisChart = false
      }
    },
    numFormat (num) {
      if (this.$util.isDefine(num)) {
        let str = ''
        let len = this.$store.state.analysisResultAllData.submitAnalysisParams.twoFormatData
        let tempNum = parseFloat(num)
        if (this.$util.isDefine(tempNum)) {
          str = tempNum.toFixed(len).toString()
        } else {
          str = num.toString()
        }

        return str.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
      }
      return 0
    },
    setBarStackChart () { // 设置堆叠图
      let that = this
      this.disabledPercentage = true // 禁用百分比
      this.disabledBartage = false
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.barStackData)) {
        let tempSeriesData = this.$store.state.analysisResultAllData.barStackData.seriesData
        let tempLegendData = this.$store.state.analysisResultAllData.barStackData.legendData
        let tempXAsixData = this.$store.state.analysisResultAllData.barStackData.xAsixData
        if (tempSeriesData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        this.currentAxisName = this.$store.state.analysisResultAllData.barStackData.xName // 默认显示当前轴的名字
        let tempSeriesDataArr = []
        for (let i = 0; i < tempSeriesData.length; i++) {
          let tempItem = tempSeriesData[i]
          let tempObj = {}
          if (this.isShowBartage) {
            tempObj = {
              name: tempLegendData[i],
              type: 'bar',
              barMaxWidth: 30,
              data: tempItem
            }

            tempObj['label'] = {
              show: this.isShowChartText,
              position: 'top', //  'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
              distance: 8,
              align: 'left',
              verticalAlign: 'middle',
              rotate: 90,
              formatter: '{val|{c}}', //   {name|{a}}
              fontSize: 12,
              color: '#000',
              rich: {
                name: {
                  color: '#000',
                  textBorderColor: '#fff'
                },
                val: {
                  // textBorderColor: '#fff',
                  color: '#000',
                  textBorderWidth: 2
                }
              }
            }
          } else {
            tempObj = {
              name: tempLegendData[i],
              type: 'bar',
              stack: 'barStack',
              barMaxWidth: 30,
              data: tempItem
            }

            tempObj['label'] = {
              show: this.isShowChartText,
              position: 'inside', //  'left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
              // distance: 8,
              align: 'center',
              verticalAlign: 'middle',
              rotate: 90,
              formatter: '{val|{c}}', //   {name|{a}}
              fontSize: 12,
              color: '#000',
              rich: {
                name: {
                  color: '#000',
                  textBorderColor: '#fff'
                },
                val: {
                  // textBorderColor: '#fff',
                  color: '#000',
                  textBorderWidth: 2
                }
              }
            }
          }

          tempSeriesDataArr.push(tempObj)
        }
        this.charts.setOption({
          title: {
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
              let value = 0
              let str = ''
              let s1 = ''
              str += params[0].axisValue
              params.forEach((item, i) => {
                if (item.value !== '-' && item.value !== '0' && item.value !== 0) {
                  value += parseFloat(item.value)
                  s1 += item.marker + item.seriesName + ': ' + this.numFormat(item.value) + '<br>'
                }
              })
              str += ': ' + this.numFormat(value) + '<br>' + s1
              return str
            }
          },
          grid: {
            left: '120',
            right: '4%',
            bottom: '100',
            containLabel: false
          },
          legend: {
            data: tempLegendData,
            top: 30
          },
          xAxis: [
            {
              type: 'category',
              data: tempXAsixData,

              name: this.axisOneName,
              nameLocation: 'center',
              nameGap: 76,
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
              }
            }
          ],
          yAxis: [
            {
              // type: 'value'
              name: this.axisThreeName && this.tempTwoAgg !== 'count' ? this.axisThreeName : this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '事件数量' : '航班数量',
              type: 'value',
              position: 'left',
              nameLocation: 'middle',
              nameGap: 80,
              nameTextStyle: {
                color: '#000',
                fontWeight: 'bold',
                letterSpacing: '2px',
                fontSize: 12
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                // formatter: this.isShowPercentage ? '{value}%' : '{value}'
                formatter: (val) => {
                  if (that.isShowPercentage) {
                    return val + '%'
                  } else {
                    // let val = '{value}'
                    if (val >= 10000) {
                      return (val / 1000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                    } else if (val >= 100000) {
                      return (val / 10000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                    } else {
                      return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                    }
                  }
                }
              }
            }
          ],
          series: tempSeriesDataArr
        })
        // console.log(JSON.stringify(this.charts.getOption()))
        this.charts.on('click', (params) => {
          console.log('setBarStackChart:', params)
          this.assemblyChartParams(params)
        })

        // legend的点击事件以及数据渲染
        this.charts.on('legendselectchanged', (object) => {
          console.log('setBarStackChart:', object)

          console.log('setBarStackChart - Legend:', tempLegendData)
          console.log('setBarStackChart - Series:', tempSeriesDataArr)

          if (!that.$store.state.analysisResultAllData.submitAnalysisParams.isSort) {
            return
          }

          let obj = {
            'data0': tempXAsixData,
            'data1': [],
            'data2': []
          }
          let selected = object.selected
          // 获取option对象
          let option = this.charts.getOption()

          let t = 0
          for (let o in selected) {
            if (selected[o]) {
              obj.data1.push(option.series[t].data)
            }
            t += 1
          }

          // 清空需要重新渲染的数据
          option.xAxis[0].data = []
          option.series.forEach((item, index) => {
            obj.data2.push(item.data)
            item.data = []
          })

          // 调用排序方法，返回排序好的对象
          let multiObj = this.multi_bubbleSort(obj, that.$store.state.analysisResultAllData.submitAnalysisParams.sortType)
          // 给上面清空的数据添加值
          option.xAxis[0].data = multiObj.data0
          option.series.forEach((item, index) => {
            item.data = multiObj.data2[index]
          })

          // 调用setOption方法，重新渲染堆积柱状图
          this.charts.setOption(option)
        })
      } else {
        this.isShowAxisChart = false
      }
    },

    /**
     * 堆积柱状图排序
     */
    multi_bubbleSort (obj, type) {
      let data0 = obj.data0 // 横坐标数组
      let data = new Array(data0.length).fill(0) // 定义一组与横坐标数组相同大小的且全部为0的数组，用来存储堆积柱状图的和
      let len = obj.data0.length // 横坐标数组长度
      for (let k = 0; k < len; k++) {
        for (let m = 0; m < obj.data1.length; m++) {
          data[k] = Number(data[k]) + Number(obj.data1[m][k]) // 求和，用来排序
        }
      }
      // 简单排序
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (type === 'DESC') {
            if (Number(data[j]) < Number(data[j + 1])) { // 相邻元素两两对比, 由大到小
              let temp = data[j + 1] // 元素交换
              data[j + 1] = data[j]
              data[j] = temp

              // 交换横坐标元素
              let te = obj.data0[j + 1] // 元素交换
              obj.data0[j + 1] = obj.data0[j]
              obj.data0[j] = te

              // 交换各堆积柱状图元素
              for (let m = 0; m < obj.data2.length; m++) {
                let tem = obj.data2[m][j + 1]
                obj.data2[m][j + 1] = obj.data2[m][j]
                obj.data2[m][j] = tem
              }
            }
          } else {
            if (Number(data[j]) > Number(data[j + 1])) { // 相邻元素两两对比, 由小到大
              let temp = data[j + 1] // 元素交换
              data[j + 1] = data[j]
              data[j] = temp

              // 交换横坐标元素
              let te = obj.data0[j + 1] // 元素交换
              obj.data0[j + 1] = obj.data0[j]
              obj.data0[j] = te

              // 交换各堆积柱状图元素
              for (let m = 0; m < obj.data2.length; m++) {
                let tem = obj.data2[m][j + 1]
                obj.data2[m][j + 1] = obj.data2[m][j]
                obj.data2[m][j] = tem
              }
            }
          }
        }
      }
      return obj
    },

    setScatter () { // 设置散点图
      this.disabledPercentage = true // 禁用百分比
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.scatterData)) {
        if (this.$store.state.analysisResultAllData.scatterData.seriesData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        this.currentAxisName = this.$store.state.analysisResultAllData.scatterData.xAxisName // 默认显示当前轴的名字
        this.charts.setOption({
          title: {
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            left: 'center'
          },
          tooltip: {},
          grid: {
            left: '120',
            right: '4%',
            bottom: '100',
            containLabel: false
          },
          xAxis: {
            // name: this.$store.state.analysisResultAllData.scatterData.xAxisName,
            name: this.axisOneName,
            nameLocation: 'center',
            nameGap: 76,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            type: 'category',
            axisLabel: {
              interval: 'auto', // 0强制显示所有标签
              rotate: 30,
              margin: 10
            }
          },
          yAxis: {
            // name: this.$store.state.analysisResultAllData.scatterData.yAxisName,
            // name: this.axisTwoName && this.tempTwoAgg !== 'count' ? this.axisTwoName : '航班数量',
            name: this.axisTwoName,
            type: 'value',
            position: 'left',
            nameLocation: 'middle',
            nameGap: 60,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: this.isShowPercentage ? '{value}%' : '{value}'
            }
          },
          dataZoom: [{
            type: 'inside'
          }],
          animation: false,
          color: ['#3A6BB9'],
          series: [
            {
              symbolSize: this.symbolSize,
              name: this.$store.state.analysisResultAllData.scatterData.xAxisName,
              type: 'scatter',
              data: this.$store.state.analysisResultAllData.scatterData.seriesData
            }
          ]
        })

        this.charts.on('click', (params) => {
          console.log('setScatter:', params)
          this.assemblyChartParams(params)
        })
      } else {
        this.isShowAxisChart = false
      }
    },
    setBoxplotChart () { // 设置蜡烛图
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.candleData)) {
        if (this.$store.state.analysisResultAllData.candleData.seriesData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        let tempSeriesDataArr = []
        let tempData = this.$echarts.dataTool.prepareBoxplotData(this.$store.state.analysisResultAllData.candleData.seriesData)
        let toFix = this.$store.state.analysisResultAllData.submitAnalysisParams.twoFormatData
        let tempObj = {
          type: 'boxplot',
          data: tempData.boxData,
          tooltip: {
            formatter: function (param) {
              return [
                // 'Experiment ' + param.name + ': ',
                param.name,
                'upper: ' + param.data[5].toFixed(toFix),
                'Q3: ' + param.data[4].toFixed(toFix),
                'median: ' + param.data[3].toFixed(toFix),
                'Q1: ' + param.data[2].toFixed(toFix),
                'lower: ' + param.data[1].toFixed(toFix)
              ].join('<br/>')
            }
          }
        }
        tempSeriesDataArr.push(tempObj)
        tempSeriesDataArr.push({
          type: 'scatter',
          data: tempData.outliers
        })

        this.currentAxisName = this.$store.state.analysisResultAllData.candleData.xAxisName // 默认显示当前轴的名字
        this.charts.setOption({
          title: [
            {
              text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
              left: 'center'
            }
          ],
          tooltip: {
            trigger: 'item'
          },
          color: ['#3A6BB9'],
          grid: {
            left: '120',
            right: '4%',
            bottom: '100',
            containLabel: false
          },
          xAxis: {
            type: 'category',
            data: this.$store.state.analysisResultAllData.candleData.xAxisNameValue,
            boundaryGap: true,
            // nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
                show: false
            },

            name: this.axisOneName,
            nameLocation: 'center',
            nameGap: 76,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 18
            },
            axisLabel: {
              interval: 'auto', // 0强制显示所有标签
              rotate: 30,
              margin: 10
            }
          },
          yAxis: {
            name: this.axisTwoName,
            type: 'value',
            position: 'left',
            nameLocation: 'middle',
            nameGap: 60,
            scale: true,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: this.isShowPercentage ? '{value}%' : '{value}'
            }
          },
          dataZoom: [{
            type: 'inside'
          }],
          series: tempSeriesDataArr
        })

        this.charts.on('click', (params) => {
          console.log('setBoxplotChart:', params)
          this.assemblyChartParams(params)
        })
      } else {
        this.isShowAxisChart = false
      }
    },
    setBar3DChart () { // 设置3D柱状图
      this.disabledPercentage = true // 禁用百分比
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.barThreeData)) {
        if (this.$store.state.analysisResultAllData.barThreeData.seriesData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        this.currentAxisName = this.$store.state.analysisResultAllData.barThreeData.xName // 默认显示当前轴的名字
        let tempSeriesDataArr = []
        let tempObj = {
          type: 'bar3D',
          shading: 'lambert',
          data: this.$store.state.analysisResultAllData.allBarThreeData.seriesData,
          dimensions: this.$store.state.analysisResultAllData.barThreeData.dimensions,
          label: {
            show: this.isShowChartText,
            formatter: (params) => {
                // return params.value[params.encode.z[0]]
                console.log(params)
                return params.value[2]
            },
            textStyle: {
                fontSize: 12,
                borderWidth: 1
            }
          },
          emphasis: {
            label: {
              show: true,
              formatter: function (p) {
                return p.data[2]
              }
            }
          }
        }
        tempSeriesDataArr.push(tempObj)
        this.charts.setOption({
          title: {
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            left: 'center'
          },
          grid3D: {
            top: -50
          },
          tooltip: {
          },
          xAxis3D: {
            type: 'category',
            name: this.axisOneName,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            }
          },
          yAxis3D: {
            type: 'category',
            name: this.axisTwoName,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 18
            }
          },
          color: ['#3A6BB9'],
          zAxis3D: {
            name: this.axisThreeName && this.tempTwoAgg !== 'count' ? this.axisThreeName : this.$util.isNotEmptyObject(this.$store.state.eventStoreData) ? '事件数量' : '航班数量',
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: (val) => {
                if (val >= 10000) {
                  return (val / 1000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                } else if (val >= 100000) {
                  return (val / 10000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                } else {
                  return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                }
              }
            }
          },
          series: tempSeriesDataArr
        })

        this.charts.on('click', (params) => {
          console.log('setBar3DChart:', params)
          this.assemblyChartParams(params)
        })
      } else {
        this.isShowAxisChart = false
      }
    },
    setScatter3DChart () { // 设置3D散点图
      this.disabledPercentage = true // 禁用百分比
      if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.scatterData)) {
        if (this.$store.state.analysisResultAllData.scatterData.seriesData.length > 0) { // 判断是否有数据
          this.isShowAxisChart = true
        } else {
          this.isShowAxisChart = false
        }
        this.currentAxisName = this.$store.state.analysisResultAllData.scatterData.xAxisName // 默认显示当前轴的名字

if (this.isShowScatterChart) {
        let tempSeriesDataArr = []

        let tempAxisOneTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneTreeType // 轴类型,3：数值；6：日期
        let tempAxisTwoTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisTwoTreeType

        let tempLegendData = this.$store.state.analysisResultAllData.barStackData.legendData
        // let tempXAsixData = this.$store.state.analysisResultAllData.barStackData.xAsixData
        let scaterList = this.$store.state.analysisResultAllData.scatterData.seriesData

        let lenObj = {}

if (tempAxisTwoTreeType === '3') {
        for (let okey of tempLegendData) {
          lenObj[okey] = []

          for (let item of scaterList) {
            let xaxis = item[0]
            let yaxis = parseFloat(item[1])
            let val = item[2]

            let keys = okey.split('~')
            let min = parseFloat(keys[0])
            let max = parseFloat(keys[1])

            if (min <= yaxis && yaxis < max) {
              lenObj[okey].push([xaxis, val])
            }
          }
        }
} else {
        for (let item of scaterList) {
          let xaxis = item[0]
          let yaxis = item[1]
          let val = item[2]

          if (Object.keys(lenObj).includes(yaxis)) {
            lenObj[yaxis].push([xaxis, val])
          } else {
            lenObj[yaxis] = [[xaxis, val]]
          }
        }
}

        console.log(lenObj)

        for (let key in lenObj) {
          let tempObj = {
            name: key,
            type: 'scatter',
            symbolSize: this.symbolSize,
            data: lenObj[key]
          }

          tempSeriesDataArr.push(tempObj)
        }

        this.charts.setOption({
          title: {
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            left: 'center'
          },
          tooltip: {
            // trigger: 'axis',
            showDelay: 0,
            // formatter: function (params) {
            //     if (params.value.length > 1) {
            //         return params.seriesName + ' :<br/>'
            //         + params.value[0] + ' '
            //         + params.value[1] + ' ';
            //     }
            //     else {
            //         return params.seriesName + ' :<br/>'
            //         + params.name + ' : '
            //         + params.value + ' ';
            //     }
            // },
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
          },
          grid: {
            left: '120',
            right: '4%',
            bottom: '100',
            containLabel: false
          },
          legend: {
            data: tempLegendData,
            // left: 'center'
            top: 30
          },
          xAxis: {
            name: this.axisOneName,
            nameLocation: 'center',
            nameGap: 76,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },

            // type: 'value',
            // type: 'category',
            type: tempAxisOneTreeType === '3' ? 'value' : 'category',
            scale: true,
            axisLabel: {
              interval: 'auto', // 0强制显示所有标签
              rotate: 30,
              margin: 10
            }
          },
          yAxis: {
            name: this.axisThreeName ? this.axisThreeName : '',
            type: 'value',
            scale: true,
            position: 'left',
            nameLocation: 'middle',
            nameGap: 60,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: this.isShowPercentage ? '{value}%' : '{value}'
            }
          },
          dataZoom: [{
            type: 'inside'
          }],
          animation: false,
          // color: ['#3A6BB9'],
          series: tempSeriesDataArr
        })
} else {
        let tempAxisOneTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneTreeType // 轴类型,3：数值；6：日期
        let tempAxisTwoTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisTwoTreeType

        let tempSeriesDataArr = []
        let tempObj = {
          type: 'scatter3D',
          shading: 'lambert',
          symbolSize: this.symbolSize,
          name: this.$store.state.analysisResultAllData.scatterData.xAxisName,
          data: this.$store.state.analysisResultAllData.scatterData.seriesData,
          dimensions: this.$store.state.analysisResultAllData.scatterData.dimensions,
          emphasis: {
            label: {
              show: true,
              formatter: function (p) {
                return p.data[2]
              }
            }
          }
        }
        tempSeriesDataArr.push(tempObj)
        this.charts.setOption({
          title: {
            text: this.$store.state.analysisResultAllData.submitAnalysisParams.chartName,
            left: 'center'
          },
          color: ['#3A6BB9'],
          grid3D: {
            top: -50
          },
          tooltip: {
            // trigger: 'axis' // axis | item
          },
          xAxis3D: {
            // type: 'category', // category | value
            type: tempAxisOneTreeType === '3' ? 'value' : 'category',
            name: this.axisOneName,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            }
          },
          yAxis3D: {
            // type: 'value',
            type: tempAxisTwoTreeType === '3' ? 'value' : 'category',
            scale: true,
            name: this.axisTwoName,
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            }
          },
          zAxis3D: {
            name: this.axisThreeName ? this.axisThreeName : '',
            nameTextStyle: {
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: 12
            },
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: (val) => {
                if (val >= 10000) {
                  return (val / 1000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                } else if (val >= 100000) {
                  return (val / 10000).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + 'K'
                } else {
                  return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
                }
              }
            }
          },
          series: tempSeriesDataArr
        })
}

        this.charts.on('click', (params) => {
          console.log('setScatter3DChart:', params)
          this.assemblyChartParams(params)
        })
      } else {
        this.isShowAxisChart = false
      }
    },
    resetChartWH (id) { // 重置图表大小
      document.getElementById(id).style.width = document.getElementsByClassName('analysisChart')[0].offsetWidth - 240 + 'px'
      document.getElementById(id).style.height = document.getElementsByClassName('analysisChart')[0].offsetHeight + 'px'
      // console.log('axisChartContent@@@$$$~~~:', document.getElementById(id).style.width, document.getElementById(id).style.height)
    },
    handleCheckedScatterChartChange (value) { // 是否显示文本
      console.log('handleCheckedScatterChartChange', value, this.chartType)
      this.isShowScatterChart = value
      this.drawChart() // 重新渲染图表数据
    },
    handleCheckedChartTextChange (value) { // 是否显示文本
      console.log('handleCheckedChartTextChange', value, this.chartType)
      this.isShowChartText = value
      this.drawChart() // 重新渲染图表数据
    },
    handleCheckedPercentageChange (value) { // 是否显示百分比
      console.log('handleCheckedPercentageChange', value, this.chartType)
      this.isShowPercentage = value
      this.drawChart() // 重新渲染图表数据
    },
    handleCheckedBartage (value) { // 是否显示柱状图
      console.log('handleCheckedBartage', value, this.chartType)
      this.isShowBartage = value
      // if (value) {
      //   this.bartageText = '是否显示堆叠图'
      // } else {
      //   this.bartageText = '是否显示柱状图'
      // }
      this.drawChart() // 重新渲染图表数据
    },
    handleCheckedFlightRate (value) { // 是否显示航班率
      console.log('handleCheckedFlightRate', value, this.chartType)
      this.isShowFlightRate = value
      this.drawChart() // 重新渲染图表数据
    },
    assemblyChartParams (params) { // 组装点击图表后的数据
      let tempParams = [] // 临时存储组装后的参数

      let tempAxisOneTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneTreeType // 轴类型,3：数值；6：日期
      let tempAxisTwoTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisTwoTreeType // 2轴类型,3：数值；6：日期
      let tempAxisThreeTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisThreeTreeType // 3轴类型,3：数值；6：日期

      this.tempOneFormatData = this.$store.state.analysisResultAllData.submitAnalysisParams.oneFormatData
      this.tempTwoFormatData = this.$store.state.analysisResultAllData.submitAnalysisParams.twoFormatData

      console.log('assemblyChartParams@@~~:', tempAxisOneTreeType, tempAxisTwoTreeType, tempAxisThreeTreeType, this.tempOneFormatData, this.tempTwoFormatData)
      console.log('assemblyChartParams@@params@@~~:', params.data, params.name)

      if (this.$util.isDefine(tempAxisOneTreeType) && this.$util.isDefine(tempAxisTwoTreeType) && this.$util.isDefine(tempAxisThreeTreeType)) {
        let xAxisVal = ''
        let yAxisVal = ''

        xAxisVal = params.data[0] || ''
        yAxisVal = params.data[1] || ''

        if (params.seriesType === 'bar') {
          xAxisVal = params.name
          yAxisVal = params.seriesName

          if (tempAxisOneTreeType === '3') { // 数值
            let xAxisVals = xAxisVal.split('~')

            let tempValOne = xAxisVals[0] || ''
            let tempValTwo = xAxisVals[1] || xAxisVals[0]
            tempParams = [this.assemblyAnalysisParams(tempValOne, tempValTwo, 'One')]
          } else if (tempAxisOneTreeType === '6') { // 日期
            let tempValOne = ''
            let tempValTwo = ''

            if (this.tempOneFormatData.indexOf('YYYY') >= 0) {
              if (xAxisVal.length < 5) {
                // tempValOne = this.$moment().year(this.$moment(xAxisVal).year()).startOf('year').format('YYYY-MM-DD HH:mm:ss')
                // tempValTwo = this.$moment().year(this.$moment(xAxisVal).year()).endOf('year').format('YYYY-MM-DD HH:mm:ss')
                tempValOne = this.$moment(xAxisVal).startOf('year').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(xAxisVal).endOf('year').format('YYYY-MM-DD HH:mm:ss')
              } else if (xAxisVal.length > 5 && xAxisVal.length < 8) {
                // tempValOne = this.$moment().month(this.$moment(xAxisVal).month()).startOf('month').format('YYYY-MM-DD HH:mm:ss')
                // tempValTwo = this.$moment().month(this.$moment(xAxisVal).month()).endOf('month').format('YYYY-MM-DD HH:mm:ss')
                tempValOne = this.$moment(xAxisVal).startOf('month').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(xAxisVal).endOf('month').format('YYYY-MM-DD HH:mm:ss')
              } else if (xAxisVal.length > 8) {
                // tempValOne = this.$moment().date(this.$moment(xAxisVal).date()).startOf('date').format('YYYY-MM-DD HH:mm:ss')
                // tempValTwo = this.$moment().date(this.$moment(xAxisVal).date()).endOf('date').format('YYYY-MM-DD HH:mm:ss')
                tempValOne = this.$moment(xAxisVal).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(xAxisVal).endOf('day').format('YYYY-MM-DD HH:mm:ss')
              }
              // let tempValOne = xAxisVal.substring(0, 10) + ' 00:00:00'
              // let tempValTwo = xAxisVal.substring(0, 10) + ' 23:59:59'

              tempParams = [this.assemblyAnalysisParams(tempValOne, tempValTwo, 'One')]
            } else {
              tempParams = [this.assemblyAnalysisParams(xAxisVal, '', 'One')]
            }
          } else {
            tempParams = [this.assemblyAnalysisParams(xAxisVal, '', 'One')]
          }

          if (tempAxisTwoTreeType === '3') { // 数值
            let yAxisVals = yAxisVal.split('~')

            let tempValOne = yAxisVals[0] || ''
            let tempValTwo = yAxisVals[1] || yAxisVals[0]

            tempParams.push(this.assemblyAnalysisParams(tempValOne, tempValTwo, 'Two'))
          } else if (tempAxisTwoTreeType === '6') { // 日期
            let tempValOne = ''
            let tempValTwo = ''

            if (this.tempOneFormatData.indexOf('YYYY') >= 0) {
              if (yAxisVal.length < 5) {
                tempValOne = this.$moment(yAxisVal).startOf('year').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(yAxisVal).endOf('year').format('YYYY-MM-DD HH:mm:ss')
              } else if (yAxisVal.length > 5 && yAxisVal.length < 8) {
                tempValOne = this.$moment(yAxisVal).startOf('month').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(yAxisVal).endOf('month').format('YYYY-MM-DD HH:mm:ss')
              } else if (yAxisVal.length > 8) {
                tempValOne = this.$moment(yAxisVal).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(yAxisVal).endOf('day').format('YYYY-MM-DD HH:mm:ss')
              }
              tempParams = [this.assemblyAnalysisParams(tempValOne, tempValTwo, 'One')]
            } else {
              tempParams = [this.assemblyAnalysisParams(yAxisVal, '', 'One')]
            }
          } else {
            tempParams.push(this.assemblyAnalysisParams(yAxisVal, '', 'Two'))
          }
        } else {
          if (tempAxisOneTreeType === '3') { // 数值
            let xAxisVals = xAxisVal.split('~')

            let tempValOne = xAxisVals[0] || ''
            let tempValTwo = xAxisVals[1] || xAxisVals[0]

            tempParams = [this.assemblyAnalysisParams(tempValOne, tempValTwo, 'One')]
          } else if (tempAxisOneTreeType === '6') { // 日期
            let tempValOne = ''
            let tempValTwo = ''

            if (this.tempOneFormatData.indexOf('YYYY') >= 0) {
              if (xAxisVal.length < 5) {
                tempValOne = this.$moment(xAxisVal).startOf('year').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(xAxisVal).endOf('year').format('YYYY-MM-DD HH:mm:ss')
              } else if (xAxisVal.length > 5 && xAxisVal.length < 8) {
                tempValOne = this.$moment(xAxisVal).startOf('month').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(xAxisVal).endOf('month').format('YYYY-MM-DD HH:mm:ss')
              } else if (xAxisVal.length > 8) {
                tempValOne = this.$moment(xAxisVal).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                tempValTwo = this.$moment(xAxisVal).endOf('day').format('YYYY-MM-DD HH:mm:ss')
              }
              // let tempValOne = xAxisVal.substring(0, 10) + ' 00:00:00'
              // let tempValTwo = xAxisVal.substring(0, 10) + ' 23:59:59'
              tempParams = [this.assemblyAnalysisParams(tempValOne, tempValTwo, 'One')]
            } else {
              tempParams = [this.assemblyAnalysisParams(xAxisVal, '', 'One')]
            }
          } else {
            tempParams = [this.assemblyAnalysisParams(xAxisVal, '', 'One')]
          }

          if (tempAxisTwoTreeType === '3') { // 数值
            let yAxisVals = yAxisVal.split('~')

            let tempValOne = yAxisVals[0] || ''
            let tempValTwo = yAxisVals[1] || yAxisVals[0]

            tempParams.push(this.assemblyAnalysisParams(tempValOne, tempValTwo, 'Two'))
          } else if (tempAxisTwoTreeType === '6') { // 日期
            let tempValOne = yAxisVal.substring(0, 10) + ' 00:00:00'
            let tempValTwo = yAxisVal.substring(0, 10) + ' 23:59:59'

            tempParams.push(this.assemblyAnalysisParams(tempValOne, tempValTwo, 'Two'))
          } else {
            tempParams.push(this.assemblyAnalysisParams(yAxisVal, '', 'Two'))
          }
        }
      } else {
        let tempAxisData = this.$store.state.analysisResultAllData.barLinePieData.xAxisData
        if (tempAxisOneTreeType === '3') { // 数值
          let tempNameOne = ''
          let tempNameTwo = ''
          if (params.seriesType === 'scatter') {
            if (params.data[0] === 9) { //  && this.$util.isDefine(tempAxisData)
              tempNameOne = tempAxisData[params.data[0] - 1].split('~')[1]
              tempNameTwo = tempAxisData[params.data[0]].split('<=')[1]
            } else { // if (this.$util.isDefine(tempAxisData))
              tempNameOne = tempAxisData[params.data[0]].split('~')[0]
              tempNameTwo = tempAxisData[params.data[0]].split('~')[1] || tempAxisData[params.data[0]].split('~')[0]
            }
          } else {
            if (tempAxisData[params.dataIndex].indexOf('=') === -1) {
              tempNameOne = tempAxisData[params.dataIndex].split('~')[0]
              tempNameTwo = tempAxisData[params.dataIndex].split('~')[1] || tempAxisData[params.dataIndex].split('~')[0]
              this.isLastLine = false
            } else {
              this.isLastLine = true
              tempNameOne = tempAxisData[params.dataIndex - 1].split('~')[1]
              tempNameTwo = tempAxisData[params.dataIndex].split('<=')[1]
            }
            // if (params.dataIndex === 9) { //  && this.$util.isDefine(tempAxisData)
            //   tempNameOne = tempAxisData[params.dataIndex - 1].split('~')[1]
            //   tempNameTwo = tempAxisData[params.dataIndex].split('<=')[1]
            // } else { // if (this.$util.isDefine(tempAxisData))
            //   tempNameOne = tempAxisData[params.dataIndex].split('~')[0]
            //   tempNameTwo = tempAxisData[params.dataIndex].split('~')[1] || tempAxisData[params.dataIndex].split('~')[0]
            // }
          }
          tempParams = [this.assemblyAnalysisParams(tempNameOne, tempNameTwo, 'One')]
        } else if (tempAxisOneTreeType === '6') { // 日期
          let tempNameOne = ''
          let tempNameTwo = ''

          if (this.tempOneFormatData.indexOf('YYYY') >= 0) {
            if (params.name.length < 5) {
              tempNameOne = this.$moment(params.name).startOf('year').format('YYYY-MM-DD HH:mm:ss')
              tempNameTwo = this.$moment(params.name).endOf('year').format('YYYY-MM-DD HH:mm:ss')
            } else if (params.name.length > 5 && params.name.length < 8) {
              tempNameOne = this.$moment(params.name).startOf('month').format('YYYY-MM-DD HH:mm:ss')
              tempNameTwo = this.$moment(params.name).endOf('month').format('YYYY-MM-DD HH:mm:ss')
            } else if (params.name.length > 8) {
              tempNameOne = this.$moment(params.name).startOf('day').format('YYYY-MM-DD HH:mm:ss')
              tempNameTwo = this.$moment(params.name).endOf('day').format('YYYY-MM-DD HH:mm:ss')
            }
            // let tempNameOne = params.name.substring(0, 10) + ' 00:00:00'
            // let tempNameTwo = params.name.substring(0, 10) + ' 23:59:59'
            tempParams = [this.assemblyAnalysisParams(tempNameOne, tempNameTwo, 'One')]
          } else {
            tempParams = [this.assemblyAnalysisParams(params.name, '', 'One')]
          }
        } else {
          tempParams = [this.assemblyAnalysisParams(params.name, '', 'One')]
        }
      }

      this.chartParams = tempParams // 临时参数赋值
      console.log('assemblyChartParams~~~~~~tempParams:', JSON.stringify(tempParams))

      let tempDisabledMenuObj = this.$store.state.isDisabledMenu
      tempDisabledMenuObj['analysis_chart_drillDown'] = false // 显示钻取菜单
      this.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj) // 修改头部显示效果
    },
    assemblyChartParams1 (params) { // 组装点击图表后的数据
      let tempParams = [] // 临时存储组装后的参数
      let tempAxisOneTreeType = this.$store.state.analysisResultAllData.submitAnalysisParams.axisOneTreeType // 轴类型,3：数值；6：日期
      let tempAxisData = this.$store.state.analysisResultAllData.barLinePieData.xAxisData
      if (tempAxisOneTreeType === '3') { // 数值
        let tempNameOne = ''
        let tempNameTwo = ''
        // tempNameOne = params.name.split('-')[0]
        // tempNameTwo = params.name.split('-')[1]
        if (params.dataIndex === 9 && this.$util.isDefine(tempAxisData)) {
          tempNameOne = tempAxisData[params.dataIndex - 1].split('-')[1]
          tempNameTwo = tempAxisData[params.dataIndex].split('<=')[1]
        } else if (this.$util.isDefine(tempAxisData)) {
          tempNameOne = tempAxisData[params.dataIndex].split('-')[0]
          tempNameTwo = tempAxisData[params.dataIndex].split('-')[1]
        }
        tempParams = [this.assemblyAnalysisParams(tempNameOne, tempNameTwo, 'One')]
      } else if (tempAxisOneTreeType === '6') { // 日期
        let tempNameOne = params.name.substring(0, 10) + ' 00:00:00'
        let tempNameTwo = params.name.substring(0, 10) + ' 23:59:59'
        tempParams = [this.assemblyAnalysisParams(tempNameOne, tempNameTwo, 'One')]
      } else {
        tempParams = [this.assemblyAnalysisParams(params.name, '', 'One')]
      }

      this.chartParams = tempParams // 临时参数赋值
      // if (this.$store.state.analysisResultAllData.submitAnalysisParams.axisThreeTreeType === '') { // 三轴没有数据时才显示，目前不支持三轴
        let tempDisabledMenuObj = this.$store.state.isDisabledMenu
        tempDisabledMenuObj['analysis_chart_drillDown'] = false // 显示钻取菜单
        this.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj) // 修改头部显示效果
      // }
      console.log('assemblyChartParams~~~~~~tempParams:', JSON.stringify(tempParams))
    },
    assemblyAnalysisParams (valOne, valTwo, type) { // 组装提交分析时需要的参数格式
      let submitAnalysisParams = this.$store.state.analysisResultAllData.submitAnalysisParams // 临时存取已经提交的新建分析参数
      // 处理从2d图表点击后带来的数据组装参数时，相关的参数默认使用第一根轴的数据
      // 2：文本(精确查找),3:数值(x>=y,x<=m),6:日期(>=当前时间和小于当前日期的24点)7:非热词查询,8:热词查询
      let treeType = submitAnalysisParams['axis' + type + 'TreeType'] // 对应tree的TYPE
      // let columnType = submitAnalysisParams['axis' + type + 'ColumnType'] // 对应tree的COLUMNTYPE
      let columnNameValue = submitAnalysisParams['axis' + type + 'Value'] // 对应tree的RESULT_COLUMN_INDEX/COLUMNNAME组装后的数据
      let columnName = submitAnalysisParams['axis' + type] // 对应tree的RESULT_COLUMN_INDEX/COLUMNNAME
      let dataSourceName = submitAnalysisParams['axis' + type + 'DataSourceName'] // 对应tree的DATASOURCE_NAME
      let name = submitAnalysisParams['axis' + type + 'Name'] // 对应tree的NAME
      let tableIndex = submitAnalysisParams['axis' + type + 'TableIndex'] // 对应tree的RESULT_TABLE_INDEX
      let treeId = submitAnalysisParams['axis' + type + 'TreeId'] // 对应tree的ID

      let attrRadioFlag = ''
      let attrRadioValue = ''
      let operatordId = ''
      let selectValueOne = ''
      let selectValueTwo = ''
      let paramValueOne = ''
      let paramValueTwo = ''
      let condition = ''
      let filterName = ''
      if (treeType === '2') {
        operatordId = '11'
        paramValueOne = valOne
        condition = '= \'' + valOne + '\''
        filterName = valOne
      } else if (treeType === '3') {
        if (this.isLastLine) {
          attrRadioFlag = '1'
          attrRadioValue = '1'
          operatordId = '7'
          selectValueOne = '7'
          paramValueOne = valOne
          paramValueTwo = valTwo
          let tempSqlType = ''
          if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
            tempSqlType = columnName
          } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && (columnNameValue === columnName)) {
            tempSqlType = columnName
          } else {
            tempSqlType = 'g' + columnName
          }
          condition = valOne + ' <= cast( ' + tempSqlType + ' as double) and cast( ' + tempSqlType + ' as double) <= ' + valTwo
          filterName = valOne + ' <= x <= ' + valTwo
        } else {
          attrRadioFlag = '1'
          attrRadioValue = '1'
          operatordId = '8'
          selectValueOne = '8'
          paramValueOne = valOne
          paramValueTwo = valTwo
          let tempSqlType = ''
          if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
            tempSqlType = columnName
          } else if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && (columnNameValue === columnName)) {
            tempSqlType = columnName
          } else {
            tempSqlType = 'g' + columnName
          }
          condition = valOne + ' <= cast( ' + tempSqlType + ' as double) and cast( ' + tempSqlType + ' as double) < ' + valTwo
          filterName = valOne + ' <= x < ' + valTwo
        }
      } else if (treeType === '4') {
        operatordId = '4'
        selectValueOne = valOne
        paramValueOne = valOne
        condition = '= ' + (valOne === '否' ? '0' : '1')
        filterName = valOne
      } else if (treeType === '6') {
        if (this.$util.isDefine(valTwo)) {
          attrRadioFlag = '3'
          attrRadioValue = '3'
          operatordId = '37'
          paramValueOne = valOne
          paramValueTwo = valTwo
          condition = columnName + ' >= \'' + valOne + '\' and ' + columnName + ' < \'' + valTwo + '\''
          filterName = valOne + '~' + valTwo
        } else {
          let tempOF = this.tempOneFormatData
          let dataPoinObj = {
            year: [],
            month: [],
            day: [],
            hour: [],
            quarter: [],
            dayofweek: []
          }
          let tempData = ''
          let tempStr = ''
          let joinStr = this.axisDateObj[tempOF]

          if (tempOF === 'quarter') {
            tempData = this.quarterValObj[valOne]
            tempStr = tempData
          } else if (tempOF === 'dayofweek') {
            tempData = this.weekValObj[valOne]
            tempStr = this.dataPointWObj[this.weekValObj[valOne]]
          } else if (tempOF === 'hour') {
            tempData = parseInt(valOne.split('点')[0])
            tempStr = tempData
          } else {
            tempData = parseInt(valOne.split(joinStr)[0])
            tempStr = tempData
          }
          dataPoinObj[tempOF].push(tempData)

          // TODO
          let tt = JSON.stringify(dataPoinObj)
          attrRadioFlag = '4'
          attrRadioValue = '4'
          operatordId = '38'
          paramValueOne = joinStr + '：' + tempStr
          condition = tt.substring(1, tt.length - 1)
          filterName = joinStr + '：' + tempStr
        }
      } else if (treeType === '7' || treeType === '8') {
        operatordId = '13'
        selectValueOne = valOne
        // if (columnType === 'NUMBER') {
        //   condition = 'in (' + valOne + ')'
        // } else {
          condition = "in ('" + valOne + "')"
        // }
        filterName = valOne
      } else if (treeType === 'event') {
        operatordId = '51'
        let evLevel = ['高', '中', '低']
        filterName = `已选事件: ${valOne}, 已选事件等级: ${evLevel.join(',')}`

        condition = this.eventTreeObj[valOne].ID

        treeType = '51'
        selectValueOne = this.eventTreeObj[valOne].ID
        selectValueTwo = evLevel.join(',')
        treeId = this.eventTreeObj[valOne].ID
        columnNameValue = 'g' + this.eventTreeObj[valOne].RESULT_COLUMN_INDEX
        tableIndex = this.eventTreeObj[valOne].RESULT_TABLE_INDEX
      }

      return {
        attrRadioFlag: attrRadioFlag,
        attrRadioValue: attrRadioValue,
        columnName: treeType === '3' ? '' : columnName,
        condition: condition,
        dataSourceNameValue: dataSourceName,
        filterName: filterName,
        operatordId: operatordId,
        paramId: treeId + '_' + new Date().getTime(),
        paramName: name,
        paramType: treeType,
        paramValueOne: paramValueOne,
        paramValueTwo: paramValueTwo,
        paramValueThree: '',
        resultColumnIndex: tableIndex ? columnNameValue.substr(1) : '',
        resultTableIndex: tableIndex,
        selectValueOne: selectValueOne,
        selectValueTwo: selectValueTwo,
        selectValueThree: ''
      }
    },
    resetAnalysisParamsByDrilldown () { // 通过钻取重新提交分析参数
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (!this.$util.isDefine(submitAnalysisParams.filter)) {
        submitAnalysisParams.filter = []
      }

      if (this.chartParams.length > 0) { // 点击图表的某个值
        if (this.$store.state.analysisResultAllData.submitAnalysisParams.isGuide === '1') { // 添加辅助线
          let mainSubline = JSON.parse(JSON.stringify(this.$store.state.mainSubline))
          if (this.$util.isDefine(mainSubline)) {
            mainSubline.map((item) => {
              submitAnalysisParams.filter.push(item)
            })
          }
        }
        this.chartParams.map((item) => {
          submitAnalysisParams.filter.push(item)
        })
        this.$store.commit('ANALYSIS_PARAMS', submitAnalysisParams) // 子集配置参数存放到store中，newFile.vue初始化需要
        this.$bus.$emit('analysisAddTab', {enName: 'analysis_file_new', zhName: submitAnalysisParams.fileNewName ? submitAnalysisParams.fileNewName : '钻取', isClosable: true, parent: 'analysis_file', count: 0})
        console.log('resetAnalysisParamsByDrilldown@@@@:', JSON.stringify(submitAnalysisParams))
      } else {
        this.$message({
          message: '请选择图表数据!',
          type: 'warning'
        })
      }
    },

    downloadImgByChart () {
      if (this.isShowAxisChart) {
        let tempDisabledMenuObj = this.$store.state.isDisabledMenu
        tempDisabledMenuObj['analysis_chart_export'] = true // 显示钻取菜单
        this.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj)

        setTimeout(() => {
          this.saveImage('axisChartContent', this.$store.state.analysisResultAllData.submitAnalysisParams.fileNewName) // ' - ' + this.chartZhName
        }, 500)
      } else {
        this.$message({
          message: '没有图表，导出失败!',
          type: 'error'
        })
      }
    },
    /*
     * 保存图片的方法（即按钮点击触发的方法）
     * 第一个参数为需要保存的div的id名
     * 第二个参数为保存图片的名称
     */
    saveImage (divText, imgText) {
      this.$store.commit('SHOW_LOADING', '正在导出图表，请稍等！')

      let canvasID = this.$refs[divText]
      let that = this
      let a = document.createElement('a')
      html2canvas(canvasID).then(canvas => {
        let dom = document.body.appendChild(canvas)
        dom.style.display = 'none'
        a.style.display = 'none'
        document.body.removeChild(dom)
        let blob = that.$util.dataURLToBlob(dom.toDataURL('image/png'))
        a.setAttribute('href', URL.createObjectURL(blob))
        //这块是保存图片操作  可以设置保存的图片的信息
        a.setAttribute('download', imgText + '.png')
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(blob)
        document.body.removeChild(a)
        // that.chartInfoTool = false
        // document.getElementById('photoInfo').style.display = 'none'

        setTimeout(() => {
          that.$store.commit('HIDE_LOADING', '拼命加载中!')
          let tempDisabledMenuObj = that.$store.state.isDisabledMenu
          tempDisabledMenuObj['analysis_chart_export'] = false // 显示钻取菜单
          that.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, tempDisabledMenuObj)
        }, 4 * 1000)
      })
    },

    // 导出图片
    downloadImgByChart1 () {
      var myChart = this.$echarts.getInstanceByDom(document.getElementById('axisChartContent'))
      var url = myChart.getConnectedDataURL({
        pixelRatio: 5, //导出的图片分辨率比率,默认是1
        backgroundColor: '#fff', //图表背景色
        excludeComponents: [ //保存图表时忽略的工具组件,默认忽略工具栏
          'toolbox'
        ],
        type: 'png' //图片类型支持png和jpeg
      })
      var $a = document.createElement('a')
      var type = 'png'
      // $a.download = myChart.getOption().title[0].text + '.' + type
      // $a.download = this.$store.state.analysisResultAllData.submitAnalysisParams.fileNewName + ' - ' + this.chartZhName + '.' + type
      $a.download = this.$store.state.analysisResultAllData.submitAnalysisParams.fileNewName + '.' + type
      $a.target = '_blank'
      $a.href = url
      // Chrome and Firefox
      if (typeof MouseEvent === 'function') {
        var evt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        })
        $a.dispatchEvent(evt)
      } else { // IE
        var html = '' +
          '<body style="margin:0;">' +
          '![](' + url + ')' +
          '</body>'
        var tab = window.open()
        tab.document.write(html)
      }
    }

  }
}
</script>
<style scoped>
.summaryInfo {
  width: 200px;
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 99;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  background-color: #eee;
}
.dataTotal {
  text-align: center;
}
.axisButton {
  width: 200px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
}
.axisButton > button {
  padding: 5px 15px;
}
.axis_two_pie {
  overflow: auto;
  padding: 10px;
}
.axis-chart-empty-text{
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  color: #909399;
}
.axis-chart-style-content {
  position: relative;
  width: 240px;
  height: 100%;
  border-left: 1px solid #DDDDDD;
}
.axis-content {
  border-bottom: 1px solid #DDDDDD;
}
.axis-content:after {
  position: absolute;
  left: 28px;
  top: 20px;
  content: "";
  -webkit-transition: all .25s;
  -moz-transition: all .25s;
  -ms-transition: all .25s;
  -o-transition: all .25s;
  transition: all .25s;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #437ACF;
}
.axis-info-jiantou {
  position: relative;
  color: #2F4B77;
  font-size: 20px;
}
.axis-info {
  font-size: 12px;
  color: #555555;
  margin: 10px 21px;
  line-height: 20px;
}
.axis-data-set {
  margin-left: 21px;
}
.axis-data-title {
  position: relative;
  padding: 20px 20px 10px 0;
  font-size: 12px;
  border-bottom: 1px solid #DDDDDD;
}
.axis-type {
  width: 30px;
}
.axis-name {
  width: 170px;
  padding-left: 5px;
}
.axis-name-text {
  width: 155px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.axis-data-title::after, .axis-data-title::before {
  position: absolute;
  right: 8px;
  width: 0;
  top: 23px;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #FFFFFF;
  content: "";
  -webkit-transform: rotate(0deg);
     -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
       -o-transform: rotate(0deg);
        transform: rotate(0deg);
  -webkit-transition: all .3s;
     -moz-transition: all .3s;
      -ms-transition: all .3s;
       -o-transition: all .3s;
          transition: all .3s;
}
.axis-data-title::before{
  top: 25px;
  right: 8px;
  border-top-color: #999999;
  position: absolute;
  -webkit-transform: rotate(0deg);
     -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
       -o-transform: rotate(0deg);
      transform: rotate(0deg);
  -webkit-transition: all .3s;
     -moz-transition: all .3s;
      -ms-transition: all .3s;
       -o-transition: all .3s;
          transition: all .3s;
}
.axis-data-title.active:after{
    top: 15px;
    -webkit-transform: rotate(180deg);
       -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
         -o-transform: rotate(180deg);
            transform: rotate(180deg);
    -webkit-transition: all .3s;
       -moz-transition: all .3s;
        -ms-transition: all .3s;
         -o-transition: all .3s;
            transition: all .3s;
}
.axis-data-title.active:before{
  top: 13px;
    -webkit-transform: rotate(180deg);
       -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
         -o-transform: rotate(180deg);
            transform: rotate(180deg);
    -webkit-transition: all .3s;
       -moz-transition: all .3s;
        -ms-transition: all .3s;
         -o-transition: all .3s;
            transition: all .3s;
}
.axis-item-list {
  height: 0;
  position: relative;
  overflow: hidden;
  -webkit-transition: height .6s;
  -moz-transition: height .6s;
  -o-transition: height .6s;
  transition: height .6s;
}
.axis-item-list.active {
  height: auto;
}
.axis-item {
  margin-top: 16px;
}
.axis-item-name {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  line-height: 14px;
  margin-right: 10px;
}
.percentage {
  height: 30px;
  line-height: 30px;
  position: relative;
  /* right: 520px; */
  /* right: 400px; */
  top: 10px;
}

.export-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 4px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>
