<template>
  <div class="analy-result">
    <div class="echart" ref="heatEChart"></div>
    <!-- 柱状图弹框 -->
    <el-dialog :visible.sync="open" width="1200px" append-to-body center :fullscreen="fullScreenFlag">
      <template slot="title">
        <div class="dialog-content">
          <span>{{histogramData.activeName}}</span>
          <img src="../../assets/images/full-screen.png" @click="changeFullScreen" width="18px" height="18px" alt="" style="float: right;margin-right: 30px;cursor: pointer;">
        </div>
      </template>
      <AnalyResultDialog v-if="open" :histogramData="histogramData" ref="fullScreenRef" :fullScreenFlag="fullScreenFlag"></AnalyResultDialog>
    </el-dialog>
  </div>
</template>

<script>
import AnalyResultDialog from './AnalyResultDialog'
export default {
  name: 'AnalyResultHeatMap',
  components: {
    AnalyResultDialog
  },
  props: ['xgxClounms', 'xgxDataTableList'],
  data () {
    return {
      echarts: '',
      open: false,
      dataList: [],
      histogramData: {},
      fullScreenFlag: false // 是否是全屏
    }
  },
  watch: {
    // 列数据
    xgxClounms (val) {
      this.xgxClounms = val
    },
    // table 数据
    xgxDataTableList (val) {
      this.xgxDataTableList = val
    }
  },
  mounted () {
    // 初始化
    this.initCharts()
  },
  methods: {
    // 切换全屏方法
    changeFullScreen () {
      this.fullScreenFlag = !this.fullScreenFlag
      if (this.$refs.fullScreenRef) this.$refs.fullScreenRef.initCharts()
    },
    // 热力图，table切换
    changeTable () {
      this.$emit('changeTable', true)
    },
    // 处理柱状图数据
    handleDataList (activeName) {
      this.histogramData = {}
      let obj = {activeName, list: []}
      this.dataList.forEach(item => {
        if (item[0] === activeName) {
          obj['list'].push({name: item[1], value: item[2]})
        } else if (item[1] === activeName) {
          obj['list'].push({name: item[0], value: item[2]})
        }
      })
      if (obj.list.length) {
        obj.list = obj.list.sort((a, b) => a.value - b.value)
      }
      this.histogramData = obj
    },
    // 初始化相关性事件热力图数据
    initCharts () {
      let heatEChart = this.$echarts.init(this.$refs.heatEChart)
      let cols = this.xgxClounms.filter(item => item.label)
      let handleCols = cols.map(item => item.label)
      let data = []
      this.dataList = []
      this.xgxDataTableList.forEach((item, index) => {
        cols.forEach((item1, index1) => {
          if (item1.prop && item[item1.prop]) {
            data.push([index1, index, parseFloat(item[item1.prop])])
            this.dataList.push([item1.label, item.id, parseFloat(item[item1.prop])])
          }
        })
      })
      let counts = data.map(item => item[2])
      let maxCount = Math.max.apply(null, counts)
      let minCount = Math.min.apply(null, counts)
      let option = {
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          top: 80,
          left: 200,
          right: 50,
          bottom: 65,
          height: '50%'
        },
        xAxis: [{
          type: 'category',
          show: false,
          data: handleCols
        },
          {
            type: 'category',
            data: handleCols,
            inverse: false, // 是否是反向坐标轴
            triggerEvent: true,
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: {
          type: 'category',
          data: handleCols,
          inverse: true, // 是否是反向坐标轴
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        visualMap: {
          show: false,
          min: minCount,
          max: maxCount,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          color: ['#1185C7', '#D1F6FF']
        },
        series: [{
          name: '',
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            color: '#000000'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      heatEChart.clear()
      heatEChart.setOption(option)
      heatEChart.on('click', params => {
        if (params.componentType === 'xAxis') {
          this.handleDataList(params.value)
          this.open = !this.open
        }
      })
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        heatEChart.resize()
      })
    }
  }
}
</script>

<style scoped>
.analy-result {
  width: 100%;
  min-height: 768px;
  position:relative;
}
.analy-result .echart {
  width: 100%;
  min-height: 768px;
  z-index:99;
  position:absolute;
}
.analy-result .change-analy {
  z-index:999;
  float:left;
  position:absolute;
  top: 5px;
  left: 15px;
}
.analy-result .dialog-content {
  display: flex
}
</style>
