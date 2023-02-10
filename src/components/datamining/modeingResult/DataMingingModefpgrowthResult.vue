<!--  -->
<template>
  <div class="base-result df df-fd-c w100 h100">
    <div class="bt df df-fd-r df-f1 w100">
      <div class="base-result-content basic-tab df df-fd-c">
        <el-tabs v-model="modeingResultActiveName" ref="modeingResultTabs">
          <el-tab-pane label="FP-growth" name="FP-growth">
            <div>
              <el-table :data="dataList" highlight-current-row :header-row-style="headerRowStyle" :header-cell-style="{height:'30px',padding:'5px'}"
                        :row-class-name="tableRowClassName"  height="500px"
                        :row-style="{height:'30px'}" :cell-style="{padding:'5px'}">
                <el-table-column prop="paramArray" label="参数组合"></el-table-column>
                <el-table-column prop="reult" label="结果"></el-table-column>
                <el-table-column prop="support" label="支持度"></el-table-column>
              </el-table>
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
      dataList: [],
      modeingAttrActiveName: 'modeingAttr',
      modeingResultActiveName: 'FP-growth',
      resultData: {},
      result: {},
      headerRowStyle: {
        'color': '#2A436F',
        'background': '#F9F9F9'
      }
    }
  },

  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  props: ['data'],
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.resultData = this.data
    this.result = this.resultData.result
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.$nextTick(() => {
      this.setTableData()
    })
  },

  // 方法集合
  methods: {
    setTableData () {
      let result = this.result
      let arr = []
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let xianqian = ''
      let paramId = ''
      let obj = {}
      let tableList = []
      let map = {}
      let paramNameArr = ''
      for (let i = 0; i < this.resultData['createStep']['dataConfigTableData'].length; i++) {
        map[this.resultData['createStep']['dataConfigTableData'][i]['dataId']] = this.resultData['createStep']['dataConfigTableData'][i]['name']
      }
      Object.keys(result).forEach(v => {
        // 第一步切割result的 key取出参数id和先前的值
        paramNameArr = ''
        arr = v.split(',')
        for (let i = 0; i < arr.length; i++) {
          arr1 = arr[i].split('.')
          paramId = arr1[0] // 参数id
          xianqian = arr1[1] // 先前的值
          if (paramNameArr === '') {
            paramNameArr = map[paramId] + ':' + xianqian
          } else {
            paramNameArr += ',' + map[paramId] + ':' + xianqian
          }
        }
        for (let j = 0; j < result[v].length; j++) {
          obj = {}
          arr2 = result[v][j]
          arr3 = arr2[0].split('.')
          obj['paramArray'] = paramNameArr // 以这边的数据为一行，如过多行，参数依然用同一个参数
          obj['reult'] = map[arr3[0]] + ':' + arr3[1]
          obj['support'] = arr2[1]
          tableList.push(obj)
        }
      })
      this.dataList = tableList
    },
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
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
