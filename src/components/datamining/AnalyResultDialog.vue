<template>
  <div class="echart" ref="echart"></div>
</template>

<script>
export default {
  name: 'AnalyResultDialog',
  props: ['histogramData', 'fullScreenFlag'],
  data () {
    return {
      echart: ''
    }
  },
  mounted () {
    this.initCharts()
  },
  watch: {
    // 监听全屏切换事件
    fullScreenFlag () {
      this.echart.resize()
    }
  },
  methods: {
    // 初始化相关性事件热力图数据
    initCharts () {
      let name = this.histogramData.list.map(item => item.name)
      let value = this.histogramData.list.map(item => item.value)
      this.echart = ''
      this.echart = this.$echarts.init(this.$refs.echart)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: ''
          }
        },
        grid: {
          top: '15%',
          right: '3%',
          left: '5%',
          bottom: '12%'
        },
        xAxis: [{
          type: 'category',
          data: name,
          axisLine: {
            lineStyle: {
              color: '#7e9fb6'
            }
          },
          axisLabel: {
            margin: 10,
            color: '#7e9fb6',
            textStyle: {
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          }
        }],
        yAxis: [{
          name: '',
          axisLabel: {
            color: '#7e9fb6'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#7e9fb6'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(126,159,182,0.12)'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: value,
          barWidth: '60px',
          itemStyle: {
            color: '#1185C7'
          }
        }]
      }
      this.echart.clear()
      this.echart.setOption(option)
      this.echart.on('click', params => {
        console.log('params', params)
      })
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        this.echart.resize()
      })
    }
  }
}
</script>

<style scoped>
.echart {
  width: 100%;
  min-height: 500px;
}
</style>
