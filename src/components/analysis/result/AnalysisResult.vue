<template>
  <div class="basic-tab analysis-result">
      <el-tabs v-model="activeName" @tab-click="tabChartContent">
        <el-tab-pane label="飞行记录视图" name="flightRecordView" id="flightRecordView">
          <AnalysisView :activeTabName="activeName"></AnalysisView>
        </el-tab-pane>
        <el-tab-pane label="表格" name="dataGrid" id="dataGrid" style="margin-top:20px">
          <AnalysisGrid :activeTabName="activeName"></AnalysisGrid>
        </el-tab-pane>
        <el-tab-pane label="2D图表" name="2dChart" id="2dChart">
          <AnalysisChart :chartType="analysisChartType" :chartZhName="analysisChartTypeName" :activeTabName="activeName"></AnalysisChart>
        </el-tab-pane>
        <el-tab-pane label="表格详情" name="tableDetail" id="tableDetail" style="margin-top:20px">
          <AnalysisTableDetail :activeTabName="activeName"></AnalysisTableDetail>
        </el-tab-pane>
      </el-tabs>
      <AddSubline></AddSubline>
      <Drilldown></Drilldown>
    </div>
</template>
<script>
const AnalysisView = () => import('components/analysis/result/AnalysisView')
const AnalysisGrid = () => import('components/analysis/result/AnalysisGrid')
const AnalysisChart = () => import('components/analysis/result/AnalysisChart')
const AnalysisTableDetail = () => import('components/analysis/result/AnalysisTableDetail')
const AddSubline = () => import('components/analysis/result/AddSubline')
const Drilldown = () => import('components/analysis/result/Drilldown')

export default {
  name: 'AnalysisResult',
  components: {
    AnalysisView,
    AnalysisGrid,
    AnalysisChart,
    AnalysisTableDetail,
    AddSubline,
    Drilldown
  },
  props: { // 属性定义
    analysisChartType: { // 图表类型
      type: String
    },
    analysisChartTypeName: { // 图表类型
      type: String
    },
    chartActiveName: { // 图表激活的名字
      type: String
    }
  },
  data () {
    return {
      activeName: this.chartActiveName, // 当前显示的tab
      activeNameToParent: { // tab标签对应自己的父组件名字
        'flightRecordView': 'analysis_view',
        '2dChart': 'analysis_chart',
        'dataGrid': 'analysis_grid',
        'tableDetail': 'analysis_table'
      }
    }
  },
  watch: {
    chartActiveName (newVal, oldVal) { // 由于prop绑定是单向的：当父组件的属性变化时，将传导给子组件，但是不会反过来。
      if (this.$util.isDefine(newVal) && newVal !== oldVal) {
        this.activeName = newVal // 在data中创建副本activeName，并且监测prop的值同步修改activeName中的值
      }
    },
    activeName (newVal, oldVal) {
      console.log('activeName', newVal, oldVal)
      if (newVal !== oldVal && this.$util.isDefine(newVal)) {
        this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[newVal], {}, this.$store.state.isDisabledMenu) // 子组件数据改变同步到外部组件数据改变
      }
    }
  },
  mounted () {
    const that = this
    this.$bus.$on('resetAnalysisResultMenuHandle', () => { // 接收显示表格右侧dom事件
      that.resetAnalysisResultMenu()
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('resetAnalysisResultMenuHandle') // 移除自定义事件监听器。
  },
  methods: {
    changedActiveName (val) {
      this.activeName = val
      this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[val], {}, this.$store.state.isDisabledMenu)
      console.log('####~: ' + val)
    },
    tabChartContent (vc) {
      console.log('analysisResult:', vc.name)
      if (vc.name === 'flightRecordView') {
        this.$bus.$emit('reloadViewChart')
      }
      this.$emit('activeTypeChanged', vc.name)
    },
    resetAnalysisResultMenu () {
      this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.activeName], {}, this.$store.state.isDisabledMenu) // 子组件数据改变同步到外部组件数据改变
    }
  }
}
</script>
<style scoped>
.analysis-result {
  position: absolute;
  width: 100%;
  height: 100%;
}
.analysis-result .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
.analysis-result >>> .el-tabs__header.is-top {
  height: 30px;
}

.analysis-result >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.analysis-result >>> .el-tab-pane {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
