<!--  -->
<template>
  <div class="esr-container df df-fd-r df-jc-fs">
    <div class="esr-wapper df-f1">
      <div class="header">
        分析结果
      </div>

      <div id="barChartMain" class="chart-wrapper"></div>

      <div class="axis-chart-empty-text" v-show="isShowBarChart">暂无图表数据</div>
    </div>

    <div class="esr-right df df-fd-c df-jc-sb">
      <div class="event-store-info df-fd-c df-jc-sb">

        <div class="event-store-info-item line df df-fd-r df-jc-fs">
          <div class="icon-header">
            <img src="../../../assets/images/sjfscs.png" alt="事件发生次数" />
          </div>

          <strong>事件发生次数</strong>
          <span>1000</span>
        </div>

        <div class="event-store-info-item line df df-fd-r df-jc-fs">
          <div class="icon-header">
            <img src="../../../assets/images/hbgs.png" alt="航班个数" />
          </div>

          <strong>航班个数</strong>
          <span>25000</span>
        </div>

        <div class="event-store-info-item df df-fd-r df-jc-fs">
          <div class="icon-header">
            <img src="../../../assets/images/sjfsl.png" alt="事件率" />
          </div>

          <strong>事件率</strong>
          <span>4%</span>
        </div>

      </div>

      <div class="event-chart-wrap df-f1">
        <div class="header">
          中高低事件数占比
        </div>

        <div id="pieChartMain" class="chart-wrapper"></div>
        <div class="axis-chart-empty-text" v-show="isShowPieChart">暂无图表数据</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EventStoreResult',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      barCharts: '',
      pieCharts: '',

      isShowBarChart: false,
      isShowPieChart: false,

      timer: false,
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      screenOffSetWidth: document.body.offsetWidth, // (包括边线的宽)
      screenOffSetHeight: document.body.offsetHeight // (包括边线的宽)
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true

        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenWidth)

          that.timer = false
          that.$forceUpdate()
          if (that.barCharts) {
            that.barCharts.resize()
          }

          if (that.pieCharts) {
            that.pieCharts.resize()
          }
        }, 400)
      }
    }
  },
  // 方法集合
  methods: {
    loadBarChart () {
      this.barCharts = this.$echarts.init(document.getElementById('barChartMain')) // 初始化图表

      this.barCharts.setOption({
        color: ['#598ee6'],
        tooltip: {
          trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'cross', // 默认为直线，可选为：'line' | 'shadow' | 'cross
              lineStyle: {
                  type: 'dashed',
                  width: 1
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['事件A', '事件B', '事件C', '事件D', '事件E', '事件F', '事件G'],
              axisTick: {
                // alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              // name: '数量',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
      })

      this.barCharts.on('click', (params) => {
        console.log('loadBarChart:', params)
      })
    },

    loadPieChart () {
      this.pieCharts = this.$echarts.init(document.getElementById('pieChartMain')) // 初始化图表

      this.pieCharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          data: ['高风险', '中风险', '低风险']
        },
        color: ['#ffab35', '#729fea', '#4bcfd0'],
        series: [
          {
            name: '中高低事件数',
            type: 'pie',
            selectedMode: 'single',
            center: ['50%', '48%'],
            radius: [0, '80%'],
            label: {
              position: 'outside',
              formatter: '{b}: {d}'
            },
            labelLine: {
                show: true
            },
            data: [
              {value: 335, name: '高风险'},
              {value: 679, name: '中风险'},
              {value: 1548, name: '低风险'}
            ]
          }
        ]
      })

      this.pieCharts.on('click', (params) => {
        console.log('loadPieChart:', params)
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const _this = this
    this.$nextTick(() => { // 整个视图都渲染完毕后开始渲染图表数据
      _this.loadBarChart()
      _this.loadPieChart()
    })

    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        _this.screenWidth = window.screenWidth
      })()
    }
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped>
.esr-container {
  position: absolute;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
}

.esr-wapper {
  position: relative;

  margin: 10px 10px 0;

  box-sizing: border-box;

  height: 79vh;
  border: 1px solid rgba(204, 204, 204, 1);
}

.header {
  height: 40px;
  line-height: 40px;

  padding: 0 14px;

  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  color: #000000;
  box-sizing: border-box;
  background-color: rgba(245, 245, 245, 1);
}

.esr-right {
  width: 470px;
  height: 80vh;

  margin-right: 10px;
  box-sizing: border-box;
}

.event-store-info {
  position: relative;
  height: 260px;

  margin-top: 10px;

  box-sizing: border-box;

  border: 1px solid rgba(204, 204, 204, 1);
}

.event-store-info-item {
  box-sizing: border-box;
  height: 33%;
  padding: 20px;

  box-sizing: border-box;
}

.event-store-info-item > * {
  display: flex;

  align-items: center;
  text-align: left;

  font-weight: 700;
  font-style: normal;
  font-size: 12px;

  box-sizing: border-box;
}
.icon-header {
  background: #4576af;
  width: 45px;
  height: 44px;
  border-radius: 50%;
}
.event-store-info-item .icon-header img {
  position: relative;
  margin: auto;
}
.event-store-info-item strong {
  width: 120px;
  margin-left: 14px;
}
.event-store-info-item span {
  font-size: 22px;
  color: #13ADFF;
}

.line {
  border-bottom: 1px dashed rgba(204, 204, 204, 1);
}

.event-chart-wrap {
  position: relative;
  margin-top: 10px;

  box-sizing: border-box;
  border: 1px solid rgba(204, 204, 204, 1);
}

.chart-wrapper {
  position: absolute;

  top: 54px;
  right: 14px;
  bottom: 14px;
  left: 14px;

  box-sizing: border-box;
}

.axis-chart-empty-text{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #909399;
}
</style>
