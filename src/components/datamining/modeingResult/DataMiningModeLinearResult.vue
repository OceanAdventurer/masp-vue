<!--  -->
<template>
  <div class="base-result df df-fd-c w100 h100">
    <div class="bt df df-fd-r df-f1 w100">
      <div class="base-result-content basic-tab df df-fd-c">
        <el-tabs v-model="modeingResultActiveName" ref="modeingResultTabs">
          <el-tab-pane label="线性回归" name="linear" >
            <div class="modeing-content p10" style="margin-top: -15px;">
              <div class="xhg">
                <p>回归方程：</p>
                <p>
                  {{resultData['createStep']['propertiesFormData']['features']}} =
                  <span v-for="(item, index ) in checkedList" :key="index">
                    <span v-if="index > 0">
                      +
                    </span>
                     <span class="c-r">{{item.value}}</span> * {{item.name}}
                  </span>
                  {{result.intercept}}
                  <!--                  <span>A = <span class="c-r">0.1242</span> *</span>-->
                  <!--                  B + <span class="c-r">0.0291</span> *-->
                  <!--                  C - <span class="c-l">0.0578</span> *-->
                  <!--                  D + <span class="c-r">4.4592</span> *-->
                  <!--                  E + <span class="c-r">0.0230</span> *-->
                  <!--                  F + <span class="c-r">97.0088</span>-->
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
                <div id="xhgChartContent"  class="pos-r w100 h100" style="padding-left: 20px;"></div>
              </div>
              <div style="width: 100%;margin-top: 10px;text-align: center;">
                <el-checkbox-group v-model="checkedVal">
                  <el-checkbox :label="item['id']"  v-for="(item, index) in checkedList" :key="index"> {{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div style="clear:both;width: 100%;margin-top: 10px;padding-top:5px;border-top: 1px solid #dddddd">
                预测值：
              </div>
              <div style="width: 100%;margin-top: 10px;margin-bottom: 10px;">
                {{resultData['createStep']['propertiesFormData']['features']}} =
                <span v-for="(item, index ) in checkedList" :key="index">
                    <span v-if="index > 0">
                      +
                    </span>
                  <span class="c-r">{{item.value}}</span> * <el-input size="mini" style="width: 100px;" v-model="item.inputValue" @blur="linerBlur(item.inputValue)"></el-input>
                  </span>
                {{result.intercept}}
                <el-button type="primary" size="mini" @click="jisuan">计算</el-button>
              </div>
              <div>结果是：{{resutlValue}}</div>
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

    <!--        <div class="base-result-bottom">-->
    <!--          <el-button type="primary" size="mini">保存</el-button>-->
    <!--        </div>-->

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
      showThree: false,
      option: {},
      canshuXishuMap: {}, // key 是 参数id，value是参数的系数
      canshuMap: {}, // key 是 参数id，value系数
      resutlValue: '',
      checkedVal: [],
      lastcheckedVal: [],
      xDataList: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
      yDataList: [],
      visualConfigAxisTwoTextName: '',
      result:
        {
          'coefficients': [{
            '3b341f101c0d4d5caae96fd459bece85': '-0.0040034045'
          }, {
            '52b489fc01504dfaad53d32c8c080d90': '0.0041264418'
          }],
          'intercept': '-0.0816453375',
          'numIterations': 1,
          'r2': '0.0088266565',
          'RMSE': '0.03719'
        },
      checkedList: [],
      resultData: {},
      modeingResultActiveName: 'linear',
      modeingAttrActiveName: 'modeingAttr', // 右边tab显示值，attr:属性
      xhgcData: [
      ],
      xljData: [
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '1', svmVal: '1' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '2', svmVal: '1' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '2', svmVal: '2' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '2', svmVal: '2' },
        { paramOne: '', paramTwo: '', paramThree: '', consultParam: '1', svmVal: '2' }
      ],
      xhgChart: ''
    }
  },
  props: ['data'],

  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    checkedVal () {
      if (this.checkedVal.length >= 3 || this.checkedVal.length === 0) {
        this.checkedVal = JSON.parse(JSON.stringify(this.lastcheckedVal))
        this.$message.error('选中的参数不能超过2个且最少选中1个')
      } else if (this.checkedVal.length === 1) {
        this.lastcheckedVal = JSON.parse(JSON.stringify(this.checkedVal))
        this.showThree = false
        this.exchageChart() // 加载选中的
      } else if (this.checkedVal.length === 2) {
        this.lastcheckedVal = JSON.parse(JSON.stringify(this.checkedVal))
        this.showThree = false
        this.exchageChartThree() // 三维的
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.resultData = this.data
    this.visualConfigAxisTwoTextName = this.resultData['createStep']['propertiesFormData']['features']
    this.result = this.resultData.result
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$nextTick(() => {
      this.setData()
    })
    // that.setRocLineChart()
    // that.setScatterChart()
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
    setData () {
      if (this.result.intercept.indexOf('-') === -1 && this.result.intercept.indexOf('+') === -1) { // 如果不带- 并且不带 + 说明是正数
        this.result.intercept = '+' + this.result.intercept
      }
      let checkedVal = []
      let obj1 = { param: 'R方', val: this.result.r2 }
      let obj2 = { param: '均差根误差', val: this.result.RMSE }
      this.xhgcData.push(obj1)
      this.xhgcData.push(obj2)
      let obj = {}
      if (this.resultData['createStep'] && this.resultData['createStep']['dataConfigTableData']) {
        for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
          for (let j = 0; j < this.result['coefficients'].length; j++) {
            Object.keys(this.result['coefficients'][j]).forEach(key => {
              if (key === this.resultData['createStep']['dataConfigTableData'][i]['dataId']) {
                console.log('fafafaaffaa' + key)
                obj = {}
                obj['name'] = this.resultData['createStep']['dataConfigTableData'][i]['name']
                obj['value'] = this.result['coefficients'][j][key]
                obj['inputValue'] = ''
                obj['id'] = key
                this.checkedList.push(obj)
                this.canshuXishuMap[key] = obj['value'] // 根据id取系数
                this.canshuMap[key] = obj['name'] // 存放参数名，根据id取参数名
                // 如果id和key相等则默认选中第一个，i = 0 的可能是选中的标签列。。
                if (checkedVal.length === 0) {
                  checkedVal.push(this.resultData['createStep']['dataConfigTableData'][i]['dataId']) // 默认选中第一个的值
                }
              }
            })
          }
        }
      }
      this.checkedVal = checkedVal
    },
    // 三维
    exchageChartThree () {
      let option = {
        tooltip: {},
        backgroundColor: '#fff',
        visualMap: {
          show: false,
          dimension: 2,
          min: -1,
          max: 1,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          name: this.canshuMap[this.checkedVal[0]], // 选中的参数数组中的第一个id做为 x 的id 并且从map中取出对应的参数名名
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          type: 'value'
        },
        yAxis3D: {
          name: this.canshuMap[this.checkedVal[1]],
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          type: 'value'
        },
        zAxis3D: {
          name: this.resultData['createStep']['propertiesFormData']['features'],
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          type: 'value'
        },
        grid3D: {
          viewControl: {
            autoRotate: true
            // projection: 'orthographic'
          },
          axisLine: {
            lineStyle: {
              color: '#696969'
            }
          },
          axisPointer: {
            lineStyle: {
              color: '#dddddd'
            }
          }
        },
        series: [{
          type: 'surface',
          wireframe: {
            // show: false
          },
          equation: {
            xaa: {
              step: 0.05
            },
            y: {
              step: 0.05
            },
            d: this.result.intercept * 1,
            e1: this.canshuXishuMap[this.checkedVal[0]] * 1, // 选中数组中的第一个id对应的系数作为e1
            e2: this.canshuXishuMap[this.checkedVal[1]] * 1,
            z: function (x, y) {
              return x * this.e1 + y * this.e2 + this.d // Z=e1*Y+e2*X+d;
            }
          }
        }]
      }
      this.xhgChart = this.$echarts.init(document.getElementById('xhgChartContent'))
      this.xhgChart.setOption(option, true)
    },
    // 二维 根据选中的参数系数 以及 x 计算y值
    exchageChart () {
      // y = ax1 + bx2 + cx3 + d 目前暂时用一维
      // y = ax1 + d
      let y = ''
      let ylist = [] // [2.3, 2.22, 2, 3, 4, 5, 6, 8, 9, 9.5, 10]
      for (let i = 0; i < this.xDataList.length; i++) {
        y = this.canshuXishuMap[this.checkedVal] * this.xDataList[i] * 1 + this.result.intercept * 1
        ylist.push(y)
      }
      this.yDataList = ylist
      let option = {
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xDataList
        },
        yAxis: {
          type: 'value',
          scale: false,
          axisLine: {
            show: false
          },
          name: this.visualConfigAxisTwoTextName,
          position: 'left',
          nameLocation: 'middle',
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
          },
          nameGap: 55,
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
          data: this.yDataList,
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
      this.xhgChart = ''
      this.xhgChart = this.$echarts.init(document.getElementById('xhgChartContent'))
      this.xhgChart.setOption(option, true)
    },
    jisuan () {
      let count = 0
      for (let i = 0; i < this.checkedList.length; i++) {
        count += this.checkedList[i]['value'] * 1 * this.checkedList[i]['inputValue'] * 1
      }
      let c = this.result.intercept * 1
      count += c
      this.resutlValue = count
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    linerBlur (v) {
     let reg = /^(-)?(([0-9])|([1-9]([0-9]+)))(.[0-9]+)?$/
     if (v !== undefined && v !== '' && !reg.test(v)) {
       this.$message.error('请输入数字')
       return false
     }
     return true
    },
    drawChart () {

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

  height: 340px;

  width: 50%;
  margin-right: 20px;

  border: 1px solid #ddd
}

</style>
<style>
.base-result-content[data-v-d2f843be] .el-tabs__header.is-top {
  height: 30px;
}
</style>
