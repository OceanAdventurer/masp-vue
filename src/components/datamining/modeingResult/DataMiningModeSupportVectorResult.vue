<!--  -->
<template>
  <div class="base-result df df-fd-c w100 h100">
    <div class="bt df df-fd-r df-f1 w100">
      <div class="base-result-content basic-tab df df-fd-c">
        <el-tabs v-model="modeingResultActiveName" ref="modeingResultTabs">
          <el-tab-pane label="支持向量机" name="svm">
            <div class="modeing-content">

              <div class="chart-boxs df df-fd-r">
              <div class="xlj-charts">
                  <div id="svmChartContent" class="pos-r w100 h100"></div>
                </div>
              </div>
              <div class="chart-boxs df df-fd-r" style="margin-top: 25px;">
                <div class="xlj-charts" >
                  <div id="xljScatterChartContent" class="pos-r w100 h100" ></div>
                </div>
              </div>
              <div style="width: 100%;margin-top: 10px;text-align: center;">
                <el-checkbox-group v-model="checkedArr">
                  <el-checkbox :label="item['index']"  v-for="(item, index) in dataConfigChecxList" :key="index"> {{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="table-wrapper">
                <el-table
                  :data="svmTablePageList"
                  border
                  style="width: 100%"
                  highlight-current-row :header-row-style="headerRowStyle" :header-cell-style="{height:'30px',padding:'5px'}"
                  :row-class-name="tableRowClassName"
                  :row-style="{height:'30px'}" :cell-style="{padding:'5px'}"
                  :header-row-class-name="headerRowClassName">
                  <el-table-column
                    v-for="(item, index) in svmListClounms"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop">
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  @size-change="changePageSize"
                  @current-change="gettabaDataList"
                  :current-page="pageNo"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pageSize"
                  layout="sizes, prev, pager, next,total, jumper"
                  :total="svmList.length">
                </el-pagination>
              </div>
            </div>
           </el-tab-pane>
        </el-tabs>
      </div>

      <div class="base-result-right basic-tab df df-fd-c">
        <el-tabs v-model="modeingAttrActiveName" ref="modeingAttrTabs">
          <el-tab-pane label="属性" name="modeingAttr">
            <ModelingResultProperties :data="resultData"></ModelingResultProperties>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
const ModelingResultProperties = () => import('components/datamining/modeingResult/ModelingResultProperties')

export default {

  // import引入的组件需要注入到对象中才能使用
  components: {
    ModelingResultProperties
  },

  data () {
    // 这里存放数据
    return {
      pageNo: 1,
      pageSize: 10,
      paramNameMap: {}, // key 为 index ,name
      bool: false,
      series: [{
        name: 'ss1',
        type: 'scatter',
        data: []
      }, {
        name: 'ss2',
        type: 'scatter',
        data: []
      }, {
        name: '12321',
        type: 'scatter3D',
        dimensions: ['canshu1', 'canshu2', 'canshu3'],
        data: []
      }],
      paramNames: ['11', '222', '333'], // 显示坐标的名称
      legendData: [], // 中心点1 中心点2
      checkedArr: [],
      lastCheckedArr: [],
      dataConfigChecxList: [],
      canshuMap: {}, // key 是 参数id，value是 name
      headerRowStyle: {
        'color': '#2A436F',
        'background': '#F9F9F9'
      },
      resultData: {},
      result: {},
      modeingResultActiveName: 'svm',
      modeingAttrActiveName: 'modeingAttr', // 右边tab显示值，attr:属性
      canshu1Data: [],
      canshu2Data: [],
      svmList: [],
      svmTablePageList: [],
      svmListClounms: [{prop: '', label: ''}],
      svmChart: '',
      xljScatterChart: ''
    }
  },

  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    checkedArr () {
      if (this.checkedArr.length < 2) {
        this.$message.error('请最少选中两个')
        this.checkedArr = JSON.parse(JSON.stringify(this.lastCheckedArr))
      } else if (this.checkedArr.length <= 3) {
        this.lastCheckedArr = JSON.parse(JSON.stringify(this.checkedArr))
        this.setDefaultData()
      } else {
        this.checkedArr = JSON.parse(JSON.stringify(this.lastCheckedArr))
        this.$message.error('选中的参数不能超过3个')
      }
    }
  },
  props: ['data'],
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.modeingResultActiveName = 'svm'
    this.resultData = this.data
    this.visualConfigAxisTwoTextName = this.resultData['createStep']['propertiesFormData']['features']
    this.result = this.resultData.result
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // const that = this
    this.$nextTick(() => {
      this.setRocLineChart()
      this.setTableData()
      this.sectCheckBoxData()
    })
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
    sectCheckBoxData () {
      let obj = {}
      this.paramNameMap = {}
      let arr = []
      if (this.resultData['createStep'] && this.resultData['createStep']['dataConfigTableData']) { // 循环配置的参数
        for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
          obj = {}
          obj['name'] = this.resultData['createStep']['dataConfigTableData'][i]['name']
          obj['index'] = i
          this.paramNameMap[i] = obj['name']
          this.dataConfigChecxList.push(obj)
          if (arr.length < 2) {
            arr.push(i) // 默认选中2个
          }
        }
      }
      this.checkedArr = arr
    },
    // sectCheckBoxData () {
    //   let obj = {}
    //   let checkedArr = []
    //   this.paramNameMap = {}
    //   if (this.resultData['createStep'] && this.resultData['createStep']['dataConfigTableData']) { // 循环配置的参数
    //     for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
    //       if (this.resultData['createStep']['propertiesFormData']['features'] !== this.resultData['createStep']['dataConfigTableData'][i]['name']) {
    //         obj = {}
    //         obj['name'] = this.resultData['createStep']['dataConfigTableData'][i]['name']
    //         obj['index'] = i
    //         this.paramNameMap[i] = obj['name']
    //         this.dataConfigChecxList.push(obj)
    //         if (checkedArr.length < 2) {
    //           checkedArr.push(i) // 默认选中2个
    //         }
    //       }
    //     }
    //   }
    //   this.checkedArr = checkedArr
    // },
    setDefaultData () {
      if (this.checkedArr !== [] && this.checkedArr.length > 1) {
        this.bool = true
        let legendData = []
        let predictions = this.result['predictions']
        let arr = []
        let arrout = []
        let arrinner = []
        let obj = {} // 渲染中心点的对象
        let series = [] // 存储要显示的中心点的对象的数组
        let checkedArr = this.checkedArr //this.checkedArr
        let centerShowData = ''
        // let nameArr = []
        // for (let i = 0; i < checkedArr.length; i++) {
        //   nameArr.push(this.paramNameMap[checkedArr[i]])
        // }
        // this.paramNames = nameArr
        // checkedArr.sort(function (a, b) { return a * 1 - b * 1 }) //arr = [1,2,3,4,5,7,8,11]
        let index = 0
        Object.keys(predictions).forEach(i => { // i代表中心点的k属性
          arr = predictions[i]
          obj = {}
          arrout = []
          centerShowData = ''
          for (let j = 0; j < arr.length; j++) { // 保证中心点里面的数据的顺序和 参数的顺序一致的
            arrinner = []
            for (let x = 0; x < this.dataConfigChecxList.length; x++) { // 循环参数列表
              if (checkedArr.indexOf(x) > -1) { // 取出参数列表的坐标判断是否选中的数组中存在
                arrinner.push(arr[j][x]) // 根据选中的参数坐标获取对应arr[j] 中的第x个参数
              }
            }
            arrout.push(arrinner)
          }
          centerShowData = 'center' + (index * 1 + 1)
          obj['name'] = centerShowData
          obj['data'] = arrout
          obj['symbolSize'] = 3
          obj['type'] = checkedArr.length > 2 ? 'scatter3D' : 'scatter'
          series.push(obj)
          legendData.push(obj['name']) // series 中的 name 必须和 legend 数组中的值一致，否则不显示
          index++
        })

        let nameArr = []
        for (let i = 0; i < this.dataConfigChecxList.length; i++) {
          if (checkedArr.indexOf(i) > -1) {
            nameArr.push(this.paramNameMap[i])
          }
        }
        this.paramNames = nameArr
        for (let i = 0; i < legendData.length; i++) {

        }
        this.legendData = legendData

        this.series = series
        if (checkedArr.length > 2) {
          this.setScatterChartThree()
        } else {
          this.setScatterChart()
          this.bool = false
        }
      }
    },
    setTableData () {
      let svmListClounms = []
      let obj = {}
      let name = ''
      let index = 0
      for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
        name = this.resultData['createStep']['dataConfigTableData'][i]['name']
        if (name !== this.resultData['createStep']['propertiesFormData']['features']) {
          obj = {}
          obj['prop'] = 'index' + i
          obj['label'] = this.resultData['createStep']['dataConfigTableData'][i]['name']
          svmListClounms.push(obj)
          index++
        }
      }
      svmListClounms.push({prop: 'index' + index, label: this.resultData['createStep']['propertiesFormData']['features']})
      svmListClounms.push({prop: 'index' + (index + 1), label: 'svm分类结果'})
      this.svmListClounms = svmListClounms
      let predictions = this.result['predictions']
      let arr = []
      let tableList = []
      let obj1 = {}
      let index1 = 0
      Object.keys(predictions).forEach(i => {
        arr = predictions[i]
        for (let j = 0; j < arr.length; j++) {
          index1 = 0
          obj1 = {}
          for (let x = 0; x < arr[j].length; x++) {
            obj1['index' + x] = arr[j][x]
            index1++
          }
          index += 1
          obj1['index' + index1] = i
          tableList.push(obj1)
        }
      })
      this.svmList = tableList
      this.svmTablePageList = tableList.slice(0, this.pageSize)
    },
    gettabaDataList (pageNo) {
      this.pageNo = pageNo
      let list = this.svmList
      this.svmTablePageList = list.slice(this.pageSize * (this.pageNo * 1 - 1), this.pageNo * this.pageSize)
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.gettabaDataList(1)
    },
    drawChart () {

    },
    setRocLineChart () {
      let data = []
      let arr = []
      for (let i = 0; i < this.result['rocCurve'].length; i++) {
        arr = []
        arr.push(this.result['rocCurve'][i]['xAxis'])
        arr.push(this.result['rocCurve'][i]['yAxis'])
        data.push(arr)
      }
      // let ft = [
      //   [2.0, 2.0], [0.98, 1.0], [0.95, 1.0], [0.89, 1.0], [0.84, 0.99], [0.78, 0.99], [0.74, 0.98], [0.7, 0.96], [0.67, 0.95], [0.64, 0.94], [0.61, 0.93], [0.59, 0.92], [0.56, 0.92], [0.53, 0.91], [0.51, 0.91], [0.5, 0.9], [0.47, 0.89], [0.44, 0.88], [0.42, 0.87], [0.41, 0.86], [0.39, 0.86], [0.37, 0.85], [0.36, 0.83], [0.35, 0.82],
      //   [0.33, 0.8], [0.31, 0.78], [0.3, 0.78], [0.29, 0.76], [0.28, 0.75], [0.26, 0.73], [0.25, 0.73], [0.24, 0.7], [0.22, 0.69], [0.21, 0.67], [0.2, 0.66], [0.19, 0.65], [0.18, 0.65], [0.18, 0.64], [0.17, 0.63], [0.16, 0.6], [0.14, 0.58],
      //   [0.14, 0.58], [0.14, 0.57], [0.13, 0.55], [0.13, 0.55], [0.12, 0.54], [0.11, 0.52], [0.1, 0.5], [0.1, 0.49], [0.09, 0.48], [0.09, 0.47], [0.09, 0.46], [0.08, 0.45], [0.08, 0.44], [0.07, 0.42], [0.07, 0.39], [0.06, 0.38], [0.05, 0.37],
      //   [0.05, 0.34], [0.05, 0.32], [0.04, 0.31], [0.04, 0.31], [0.04, 0.31], [0.04, 0.28], [0.04, 0.27], [0.04, 0.23], [0.03, 0.22], [0.03, 0.2], [0.03, 0.19], [0.03, 0.18], [0.02, 0.16], [0.02, 0.14], [0.02, 0.13], [0.02, 0.12],
      //   [0.02, 0.1], [0.02, 0.08], [0.01, 0.07], [0.01, 0.05], [0.01, 0.05], [0.01, 0.04], [0.01, 0.04], [0.0, 0.02], [0.0, 0.01], [0.0, 0.01], [0.0, 0.01], [0.0, 0.0], [0.0, 0.0],
      //   [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0]
      // ]

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
          name: '',
          show: true,
          min: 0,
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
          name: '',
          min: 0,
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
          data: data,
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
      this.svmChart = this.$echarts.init(document.getElementById('svmChartContent'))
      this.svmChart.setOption(option, true)
    },
    setScatterChart () {
      let option = {
        title: {
          // text: '支持向量机',
          subtext: '', //图中坐标选维度参数1和维度参数2；其中图颜色以‘SVM分类结果’列为依据
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
                params.value[0] + params.value[1]
            } else {
              return params.seriesName + ' :<br/>' +
                params.name + '' +
                params.value
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
          data: this.legendData,
          left: 'center'
        },
        xAxis: [
          {
            name: this.paramNames[0],
            nameRotate: 90,
            nameTextStyle: {
              color: '#666666',
              fontSize: 10,
              padding: [0, 0, 0, 80]
            },
            position: 'left',
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            }
          }],
        yAxis: [{
          name: this.paramNames[1],
          nameGap: 3,
          nameTextStyle: {
            color: '#666666',
            fontSize: 10,
            align: 'left',
            padding: [4, 4, 4, 80]
          },
          type: 'value',
          scale: true,
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: true
          }
        }],
        series: this.series
      }

      this.xljScatterChart = this.$echarts.init(document.getElementById('xljScatterChartContent'))
      this.xljScatterChart.setOption(option, true)
    },
    // 三维
    setScatterChartThree () {
      let option = {
        tooltip: {},
        legend: {
          data: this.legendData,
          left: 'center'
        },
        xAxis3D: {
          name: this.paramNames[0],
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: true
          }
        },
        yAxis3D: {
          name: this.paramNames[1],
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: true
          }
        },
        zAxis3D: {
          name: this.paramNames[2],
          type: 'value',
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: true
          }
        },
        grid3D: {
          axisLine: {
            lineStyle: {
              color: '#696969'
            }
          },
          axisPointer: {
            lineStyle: {
              color: '#dddddd'
            }
          },
          viewControl: {
            // // autoRotate: true,
            // autoRotateDirection: 'ccw',
            // autoRotateAfterStill: 20,
            // // animationDurationUpdate: 1000,
            // // damping: 0.8,
            // // animation: true,
            // // animationEasingUpdate: 'cubicInOut',
            // projection: 'orthographic'
          }
        },
        // 点的名称，类型，数据
        series: this.series
      }
      this.xljScatterChart = this.$echarts.init(document.getElementById('xljScatterChartContent'))
      this.xljScatterChart.setOption(option, true)
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
  width: 77%;
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
  width: 23%;
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
  width: 130px;
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
  margin-left: 30px;
  height: 400px;
  width: 95%;
  border: solid 1px #DDDDDD;
}

</style>
