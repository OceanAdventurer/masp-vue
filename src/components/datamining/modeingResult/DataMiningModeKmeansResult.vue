<!--  -->
<template>
  <div class="base-result df df-fd-c w100 h100">
    <div class="bt df df-fd-r df-f1 w100">
      <div class="base-result-content basic-tab df df-fd-c">
        <el-tabs v-model="modeingResultActiveName" ref="modeingResultTabs">
          <el-tab-pane label="kmeans" name="kmeans">
            <div class="modeing-content">
              <div class="chart-boxs df df-fd-r">
                <div class="xlj-charts">
                  <div id="xljScatterChartContent" class="pos-r w100 h100"></div>
                </div>
              </div>
              <div style="width: 100%;margin-top: 10px;text-align: center;">
                <el-checkbox-group v-model="checkedArr">
                  <el-checkbox :label="item['index']"  v-for="(item, index) in dataConfigChecxList" :key="index"> {{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div style="width: 100%;padding-top: 10px;padding-bottom: 10px;">
                Silhouette with squared euclidean distance = {{ result.WSSSE }}
              </div>
              <div class="table-wrapper">
                <el-table
                  :data="kmeansList"
                  border
                  style="width: 100%"
                  highlight-current-row :header-row-style="headerRowStyle" :header-cell-style="{height:'30px',padding:'5px'}"
                  :row-class-name="tableRowClassName"
                  :row-style="{height:'30px'}" :cell-style="{padding:'5px'}"
                  :header-row-class-name="headerRowClassName">
                  <el-table-column
                    v-for="(item, index) in kmeansListClounms"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop">
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
      modeingResultActiveName: 'kmeans',
      modeingAttrActiveName: 'modeingAttr', // 右边tab显示值，attr:属性
      canshu1Data: [],
      canshu2Data: [],
      kmeansList: [],
      kmeansListClounms: [{prop: '', label: ''}],
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
    this.resultData = this.data
    this.visualConfigAxisTwoTextName = this.resultData['createStep']['propertiesFormData']['features']
    this.result = this.resultData.result
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const that = this
    this.$nextTick(() => {
      that.sectCheckBoxData()
      that.setTableData()
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
      let checkedArr = []
      if (this.resultData['createStep'] && this.resultData['createStep']['dataConfigTableData']) { // 循环配置的参数
        for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
          obj = {}
          obj['name'] = this.resultData['createStep']['dataConfigTableData'][i]['name']
          obj['index'] = i
          this.paramNameMap[i] = obj['name']
          this.dataConfigChecxList.push(obj)
          if (checkedArr.length < 2) {
            checkedArr.push(i) // 默认选中2个
          }
        }
      }
      this.checkedArr = checkedArr
    },
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
        Object.keys(predictions).forEach(i => { // i代表第i个中心点数据
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
          // 组装center(1,2)
            for (let h = 0; h < checkedArr.length; h++) {
              if (h === 0) {
                centerShowData = this.result['centers'][i][checkedArr[h] * 1].toFixed(3)
              } else {
                centerShowData += ',' + this.result['centers'][i][checkedArr[h] * 1].toFixed(3)
              }
            }
          centerShowData = 'center' + (i * 1 + 1) + '(' + centerShowData + ')'
          obj['name'] = centerShowData
          obj['data'] = arrout
          obj['symbolSize'] = 3
          obj['type'] = checkedArr.length > 2 ? 'scatter3D' : 'scatter'
          series.push(obj)
          legendData.push(obj['name']) // series 中的 name 必须和 legend 数组中的值一致，否则不显示
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
      let clounms = []
      clounms.push({label: '属性', prop: 'canshu'})
      for (let i = 0; i < this.result.centers.length; i++) { // k值多少，就代表有多少列，一列是一个数组，2个数组代表2列
        clounms.push({label: 'center' + (i + 1), prop: 'prop' + (i + 1)})
      }
      this.kmeansListClounms = clounms
      let tabList = []
      let obj = {}
      for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
        obj = {}
        obj['canshu'] = this.resultData['createStep']['dataConfigTableData'][i]['name']
        for (let j = 0; j < this.result.centers.length; j++) { // k值多少，就代表有多少列，一列是一个数组，2个数组代表2列
          obj['prop' + (j + 1)] = this.result.centers[j][i]
        }
        tabList.push(obj)
      }
      this.kmeansList = tabList
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },

    drawChart () {

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
              fontSize: 10
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
          nameGap: 5,
          nameTextStyle: {
            color: '#666666',
            fontSize: 10
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
            autoRotate: true,
            projection: 'orthographic'
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
  height: 360px;
  width: 95%;
  border: solid 1px #DDDDDD;
}

</style>
