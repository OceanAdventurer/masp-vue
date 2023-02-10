<!--  -->
<template>
  <div class="base-result df df-fd-c w100 h100">
    <div class="bt df df-fd-r df-f1 w100">
      <div class="base-result-content basic-tab df df-fd-c">
        <el-tabs v-model="modeingResultActiveName" @tab-click="handleClick" ref="modeingResultTabs">
          <el-tab-pane label="建模结果" name="xhgResult">
            <div class="modeing-content p10">
              <div class="xhg">
                <p>回归方程：</p>
                <p>
                  A = <span class="c-r">0.1242</span> *
                  B + <span class="c-r">0.0291</span> *
                  C - <span class="c-l">0.0578</span> *
                  D + <span class="c-r">4.4592</span> *
                  E + <span class="c-r">0.0230</span> *
                  F + <span class="c-r">97.0088</span>
                </p>
              </div>

              <div class="table-wrapper">
                <el-table
                  :data="xhgcData"
                  border
                  style="width: 100%"
                  :header-row-class-name="headerRowClassName"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    prop="param"
                    label="参数"
                    width="200">
                  </el-table-column>

                  <el-table-column
                    prop="val"
                    label="值"
                    width="auto">
                  </el-table-column>
                </el-table>
              </div>

              <div class="xhg-charts">
                <div id="xhgChartContent" class="pos-r w100 h100"></div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="建模结果" name="xljResult">
            <div class="modeing-content p10">
              <div class="chart-boxs df df-fd-r">
                <div class="xlj-charts">
                  <div id="xljScatterChartContent" class="pos-r w100 h100"></div>
                </div>

                <div class="df-f1" style="border: 1px solid #ddd;">
                  <div id="xljLineChartContent" class="pos-r w100 h100"></div>
                </div>
              </div>

              <div class="table-wrapper">
                <el-table
                  :data="xljData"
                  border
                  style="width: 100%"
                  :header-row-class-name="headerRowClassName"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    prop="paramOne"
                    label="维度参数1"
                    width="200">
                  </el-table-column>

                  <el-table-column
                    prop="paramTwo"
                    label="维度参数2"
                    width="auto">
                  </el-table-column>

                  <el-table-column
                    prop="paramThree"
                    label="维度参数3"
                    width="auto">
                  </el-table-column>

                  <el-table-column
                    prop="consultParam"
                    label="参考参数"
                    width="auto">
                  </el-table-column>

                  <el-table-column
                    prop="svmVal"
                    label="SVM分类结果"
                    width="auto">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="base-result-right basic-tab df df-fd-c">
        <el-tabs v-model="modeingAttrActiveName" ref="modeingAttrTabs">
          <el-tab-pane label="属性" name="modeingAttr">
            <div class="m10 df df-fd-c">
              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">名称:</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text">model1</div>
                  </div>
                </div>
              </div>

              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">算法:</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text">线性回归</div>
                  </div>
                </div>
              </div>

              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">归一化:</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text">离差标准化</div>
                  </div>
                </div>
              </div>

              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">正则函数类型(ElasticNetParam):</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text">0</div>
                  </div>
                </div>
              </div>

              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">正则系数(RegParam):</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text">3</div>
                  </div>
                </div>
              </div>

              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">最大迭代次数(Maxlter):</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text">7</div>
                  </div>
                </div>
              </div>

              <div class="modeing-data-set">
                <div class="df df-fd-r modeing-data-title">
                  <div class="modeing-type">选中标签列:</div>
                  <div class="modeing-name df-f1">
                    <div class="modeing-name-text"></div>
                  </div>
                </div>
              </div>
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="base-result-bottom">
      <el-button type="primary" size="mini">保存</el-button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'BaseResult',

  // import引入的组件需要注入到对象中才能使用
  components: {},

  data () {
    // 这里存放数据
    return {
      modeingResultActiveName: 'xljResult',
      modeingAttrActiveName: 'modeingAttr', // 右边tab显示值，attr:属性

      xhgcData: [
        { param: 'R方', val: '0.1827' },
        { param: '均差根误差', val: '0.612' }
      ],

      xljData: [
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '1', svmVal: '1' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '2', svmVal: '1' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '2', svmVal: '2' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '2', svmVal: '2' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '1', svmVal: '2' }
      ],

      xhgChart: '',
      xljLineChart: '',
      xljScatterChart: ''
    }
  },

  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},

  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const that = this
    this.$nextTick(() => {
      // setTimeout(() => {
      //   this.modeingResultActiveName = 'xhgResult'
      //   this.modeingAttrActiveName = 'modeingAttr'
      // }, 10000)
    })

    that.setLineChart()

    that.setRocLineChart()
    that.setScatterChart()
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发

  // 方法集合
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },

    drawChart () {

    },

    setLineChart () {
      this.xhgChart = this.$echarts.init(document.getElementById('xhgChartContent'))

      let option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        yAxis: {
          type: 'value',
          scale: false,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: ['#ccc'],
              width: 1,
              type: 'dotted',
              opacity: 1
            }
          }
        },
        series: [{
          data: [2.3, 2.22, 2, 3, 4, 5, 6, 8, 9, 9.5, 10],
          type: 'line',
          // smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: {
            color: '#2A4370',
            width: 2,
            type: 'solid' // 'solid' | 'dashed' | 'dotted'
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#2A4370',
            color: 'blue'
          }
        }]
      }

      this.xhgChart.setOption(option)
    },

    setRocLineChart () {
      let ft = [
        [1.0, 1.0], [0.98, 1.0], [0.95, 1.0], [0.89, 1.0], [0.84, 0.99], [0.78, 0.99], [0.74, 0.98], [0.7, 0.96], [0.67, 0.95], [0.64, 0.94], [0.61, 0.93], [0.59, 0.92], [0.56, 0.92], [0.53, 0.91], [0.51, 0.91], [0.5, 0.9], [0.47, 0.89], [0.44, 0.88], [0.42, 0.87], [0.41, 0.86], [0.39, 0.86], [0.37, 0.85], [0.36, 0.83], [0.35, 0.82],
        [0.33, 0.8], [0.31, 0.78], [0.3, 0.78], [0.29, 0.76], [0.28, 0.75], [0.26, 0.73], [0.25, 0.73], [0.24, 0.7], [0.22, 0.69], [0.21, 0.67], [0.2, 0.66], [0.19, 0.65], [0.18, 0.65], [0.18, 0.64], [0.17, 0.63], [0.16, 0.6], [0.14, 0.58],
        [0.14, 0.58], [0.14, 0.57], [0.13, 0.55], [0.13, 0.55], [0.12, 0.54], [0.11, 0.52], [0.1, 0.5], [0.1, 0.49], [0.09, 0.48], [0.09, 0.47], [0.09, 0.46], [0.08, 0.45], [0.08, 0.44], [0.07, 0.42], [0.07, 0.39], [0.06, 0.38], [0.05, 0.37],
        [0.05, 0.34], [0.05, 0.32], [0.04, 0.31], [0.04, 0.31], [0.04, 0.31], [0.04, 0.28], [0.04, 0.27], [0.04, 0.23], [0.03, 0.22], [0.03, 0.2], [0.03, 0.19], [0.03, 0.18], [0.02, 0.16], [0.02, 0.14], [0.02, 0.13], [0.02, 0.12],
        [0.02, 0.1], [0.02, 0.08], [0.01, 0.07], [0.01, 0.05], [0.01, 0.05], [0.01, 0.04], [0.01, 0.04], [0.0, 0.02], [0.0, 0.01], [0.0, 0.01], [0.0, 0.01], [0.0, 0.0], [0.0, 0.0],
        [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0]
      ]

      let option = {
        title: {
          text: 'ROC curve',
          textStyle: {
              fontWeight: 'normal',
              fontSize: 14
          },
          textAlign: 'center',
          left: '50%',
          top: '10'
        },
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        grid: {
          // containLabel: true,
          // top: 80,
          left: '8%',
          right: '6%',
          bottom: '8%'
        },
        xAxis: [{
          type: 'value',
          name: 'fpr',
          show: true,
          min: 0,
          max: 1,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: 'tpr',
          min: 0,
          max: 1,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: 'Log',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 0.1,
          lineStyle: {
            normal: {
              width: 2,
              color: '#594D90'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12
            }
          },
          data: ft,

          markLine: {
            symbol: 'none', // 去掉箭头
            lineStyle: {
              width: 2,
              color: 'red',
              type: 'dashed'
            },
            label: {
              show: false
            },
            data: [
              [{type: 'min'}, {type: 'max'}]
            ]
          }
        }]
      }

      this.xljLineChart = this.$echarts.init(document.getElementById('xljLineChartContent'))
      this.xljLineChart.setOption(option)
    },

    setScatterChart () {
      let option = {
        title: {
          // text: '支持向量机',
          subtext: '图中坐标选维度参数1和维度参数2；其中图颜色以‘SVM分类结果’列为依据',
          textAlign: 'left',
          bottom: 10,
          left: '3%'
        },
        grid: {
          top: 50,
          left: '3%',
          right: '7%',
          bottom: '12%',
          containLabel: true
        },
        tooltip: {
          // trigger: 'axis',
          show: true,
          trigger: 'item',
          formatter: function (params) {
            console.log(params)

            if (params.value.length > 1) {
              return params.seriesName + ' :<br/>' +
                params.value[0] + 'm ' +
                params.value[1] + 'g '
            } else {
              return params.seriesName + ' :<br/>' +
                params.name + ' : ' +
                params.value + 'g '
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        legend: {
          data: ['参数1', '参数2'],
          left: 'center'
        },
        xAxis: [{
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value} m'
          },
          splitLine: {
            show: false
          }
          // axisPointer: {
          //   show: true,
          //   type: 'line',
          //   label: {
          //     show: false
          //   },
          //   lineStyle: {
          //     width: 0.5
          //   }
          // }
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value} g'
          },
          splitLine: {
            show: false
          }
          // axisPointer: {
          //   show: true,
          //   type: 'line',
          //   label: {
          //     show: false
          //   },
          //   lineStyle: {
          //     width: 0.5
          //   }
          // }
        }],
        series: [{
          name: '参数1',
          type: 'scatter',

          data: [
            [174, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6]
          ]

          // markArea: {
          //   silent: true,
          //   itemStyle: {
          //     normal: {
          //       color: 'transparent',
          //       borderWidth: 1,
          //       borderType: 'dashed'
          //     }
          //   },
          //   data: [
          //     [{
          //       name: '参数1分布区间',
          //       xAxis: 'min',
          //       yAxis: 'min'
          //     }, {
          //       xAxis: 'max',
          //       yAxis: 'max'
          //     }]
          //   ]
          // },
          // markPoint: {
          //   data: [{
          //     type: 'max',
          //     name: '最大值'
          //   }, {
          //     type: 'min',
          //     name: '最小值'
          //   }]
          // },
          // markLine: {
          //   lineStyle: {
          //     normal: {
          //       type: 'solid'
          //     }
          //   },
          //   data: [{
          //     type: 'average',
          //     name: '平均值'
          //   }, {
          //     xAxis: 160
          //   }]
          // }
        }, {
          name: '参数2',
          type: 'scatter',

          data: [
            [161.2, 51.6], [167.5, 59], [159.5, 49.2], [157, 63]
          ]

          // markArea: {
          //   silent: true,
          //   itemStyle: {
          //     normal: {
          //       color: 'transparent',
          //       borderWidth: 1,
          //       borderType: 'dashed'
          //     }
          //   },
          //   data: [
          //     [{
          //       name: '参数2分布区间',
          //       xAxis: 'min',
          //       yAxis: 'min'
          //     }, {
          //       xAxis: 'max',
          //       yAxis: 'max'
          //     }]
          //   ]
          // },
          // markPoint: {
          //   data: [{
          //     type: 'max',
          //     name: '最大值'
          //   }, {
          //     type: 'min',
          //     name: '最小值'
          //   }]
          // }
          // markLine: {
          //   lineStyle: {
          //     normal: {
          //       type: 'solid'
          //     }
          //   },
          //   data: [{
          //     type: 'average',
          //     name: '平均值'
          //   }, {
          //     xAxis: 170
          //   }]
          // }
        }]
      }

      this.xljScatterChart = this.$echarts.init(document.getElementById('xljScatterChartContent'))
      this.xljScatterChart.setOption(option)
    },

    handleClick (tab, event) {
      let attrObj = tab.$attrs
      console.log(tab, event)
      console.log(attrObj)

      if (tab.name === 'xhgResult') {
        setTimeout(() => {
          if (this.xhgChart) this.xhgChart.resize()
        }, 100)
      } else if (tab.name === 'xljResult') {
        setTimeout(() => {
          this.xljLineChart.resize()
          this.xljScatterChart.resize()
        }, 100)
      }
    }
  }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .bt {
    border-bottom: 1px solid #DDDDDD;
  }

  .base-result-content {
    border-right: 1px solid #DDDDDD;
    width: 70%;
    height: 100%;
  }
  .base-result-content .el-tabs.el-tabs--top {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .base-result-content >>> .el-tabs {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .base-result-content >>> .el-tabs__header.is-top {
    height: 50px;
  }
  .base-result-content >>> .el-tabs__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .base-result-content >>> .el-tab-pane{
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .base-result-right{
    width: 30%;
    height: 100%;
    overflow: auto;
  }

  .modeing-data-set {
    margin-left: 10px;
  }
  .modeing-data-title {
    position: relative;
    padding: 20px 10px 10px 0;
    font-size: 12px;
    border-bottom: 1px solid #dddddd;
  }
  .modeing-type {
    width: 210px;
  }
  .modeing-name {
    min-width: 0;
    padding-left: 5px;
  }
  .modeing-name-text {
    width: 155px;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
  }

  .modeing-data-title::before {
    top: 25px;
    right: 8px;
    border-top-color: #999999;
    position: absolute;
    transform: rotate(0deg);
    transition: all 0.3s;
  }
  .modeing-data-title.active:after {
    top: 15px;
    transform: rotate(180deg);
    transition: all 0.3s;
  }
  .modeing-data-title.active:before {
    top: 13px;
    transform: rotate(180deg);
    transition: all 0.3s;
  }
  .modeing-item-list {
    height: 0;
    position: relative;
    overflow: hidden;
    transition: height 0.6s;
  }
  .modeing-item-list.active {
    height: auto;
  }
  .modeing-item {
    margin-top: 16px;
  }
  .modeing-item-name {
    font-size: 12px;
    color: #999999;
    letter-spacing: 0;
    line-height: 12px;
    margin-right: 10px;
  }

  .base-result-bottom {
    width: 100%;
    height: 70px;
  }

  .base-result-bottom  button {
    padding: 0;
    margin: 20px;
    float: right;
    font-size: 12px;
    border-radius: 4px;
    line-height: 22px;
    width: 126px;
    height: 34px;
  }

  .modeing-content {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .c-r {
    color: red;
  }
  .c-l {
    color: green;
  }

  .table-wrapper {
    margin-top: 10px;
    /* border: 1px solid #DDDDDD; */
    /* border-bottom: none; */
  }

  .table-wrapper >>> .el-table::before {
    height: 0;
  }

  .xhg-charts {
    position: relative;

    margin-top: 10px;
    height: 340px;

    border: 1px solid #ddd
  }

  .chart-boxs {
    margin-top: 10px;
  }

  .xlj-charts {
    position: relative;

    height: 340px;

    width: 50%;
    margin-right: 20px;

    border: 1px solid #ddd
  }
</style>
