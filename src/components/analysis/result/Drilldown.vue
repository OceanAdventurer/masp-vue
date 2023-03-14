<template>
  <div class="grid-dialog">
    <el-dialog title="钻取" :visible.sync="dialogTableVisible" @close="closeGridDialog" @open="openGridDialog">
      <transition>
        <div class="df df-fd-c df-f1 mt10 pos-r w100" id="gridDialogParams" v-if="filterParamsFilp">
          <div class="filter-front">
            <div class="filterName pl10 mb10">
              <span>新过滤器</span>
            </div>
            <div class="filter-table">
              <el-table
                :row-style="{height:'38px'}"
                :cell-style="{padding:'0px'}"
                :header-row-style="{height:'38px'}"
                :header-cell-style="{padding:'0px'}"
                :data="newFilterTableData"
                :header-row-class-name="headerRowClassNameHandle"
                :row-class-name="tableRowClassNameHandle"
                :height="elTableHeight">
                <el-table-column prop="newParameter" label="参数" class="df-f1"></el-table-column>
                <el-table-column prop="newFilterCondition" label="过滤条件" class="df-f1"></el-table-column>
                <el-table-column label="" width="50" align="center">
                  <template slot-scope="scope">
                    <div class="icon-delete tab-icon-set row-icon-group" @click.stop="newFilterRowDelete(scope.$index, newFilterTableData)"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="filterName pl10 mb10 mt10">
              <span>现有过滤器</span>
            </div>
            <div class="filter-table">
              <el-table
                :row-style="{height:'38px'}"
                :cell-style="{padding:'0px'}"
                :header-row-style="{height:'38px'}"
                :header-cell-style="{padding:'0px'}"
                :data="existFilterTableData"
                :header-row-class-name="headerRowClassNameHandle"
                :row-class-name="tableRowClassNameHandle"
                :height="elTableHeight">
                <el-table-column prop="existParameter" label="参数" class="df-f1"></el-table-column>
                <el-table-column prop="existFilterCondition" label="过滤条件" class="df-f1"></el-table-column>
                <el-table-column label="" width="50" align="center">
                  <template slot-scope="scope">
                    <div class="icon-delete tab-icon-set row-icon-group" @click.stop="existFilterRowDelete(scope.$index, existFilterTableData)"></div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="view-table-btn df df-fd-r df-jc-c df-ai-c">
              <el-button class="edit" @click="editFilterParams">编辑</el-button>
              <el-button class="submit" @click="resetSubmitAnalysisParams">提交</el-button>
            </div>
          </div>
        </div>
        <div class="df df-f1 pos-r w100" v-else>
          <AddNewFileParam :pageMenuType="pageMenuType"></AddNewFileParam>
        </div>
      </transition>
    </el-dialog>
  </div>
</template>
<script>
const AddNewFileParam = () => import('components/analysis/file/AddNewFileParam')

export default {
  name: 'Drilldown',
  components: {
    AddNewFileParam
  },
  data () {
    return {
      filterParamsFilp: true, // 默认显示钻取表格
      tempNotNullStr: '', // 临时存储notNull数据
      tempTableIndexStr: '', // 临时存储tableIndex数据
      tempDataSourceNameStr: '', // 临时存储DataSourceName数据
      newFilterTableData: [], // 新过滤条件表格数据
      existFilterTableData: [], // 已经存在过滤条件表格数据
      dialogTableVisible: false, // 是否显示钻取dialog
      pageMenuType: 'Drilldown', // 钻取菜单打开的页面
      elTableHeight: '28vh', // 表格默认的高度
      chartResultParams: '' // 分析结果中2d柱状图表点击某根柱子传过来的参数
    }
  },
  mounted () {
    const that = this
    this.$bus.$on('drillDownHandler', (type, params) => { // 点击分析结果页面中表格tab对应的二级菜单中的钻取按钮
      that.dialogTableVisible = true // 显示钻取的dialog
      if (params) {
        that.chartResultParams = params
      }
      this.showExistFilterData() // 显示已经存在的过滤条件
    })
    this.$bus.$on('editFilterParamsHandle', () => { // 钻取中过滤条件页面和新增条件页面切换事件
      that.editFilterParams()
    })
    this.$bus.$on('addNewFileParamsHandle', (obj) => { // 新增条件通知钻取页面显示条件的事件
      that.showNewFilterParams(obj)
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('drillDownHandler') // 移除自定义事件监听器。
    this.$bus.$off('editFilterParamsHandle') // 移除自定义事件监听器。
    this.$bus.$off('addNewFileParamsHandle') // 移除自定义事件监听器。
  },
  methods: {
    headerRowClassNameHandle ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassNameHandle ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    editFilterParams () { // 编辑参数的切换效果
      if (this.filterParamsFilp) {
        this.filterParamsFilp = false
      } else {
        this.filterParamsFilp = true
      }
    },
    showExistFilterData () { // 显示已经存在的过滤条件
      console.log('showExistFilterData')
      let tempExistFilterTableData = [] // 临时存取已经存在过滤条件
      let submitAnalysisParams = this.$store.state.analysisResultAllData.submitAnalysisParams // 临时存取已经提价的新建分析参数
      if (this.$util.isNotEmptyObject(submitAnalysisParams)) {
        let filterArr = submitAnalysisParams.filter // 临时存储已经存在的过滤条件
        if (filterArr.length > 0) { // 处理已经提交的分析参数
          for (let i = 0; i < filterArr.length; i++) {
            tempExistFilterTableData.push({existParameter: filterArr[i].paramName, existFilterCondition: filterArr[i].filterName, filterInfo: filterArr[i]}) // 组装已经存在过滤条件的表格数据
          }
          if (this.$util.isNotEmptyObject(this.chartResultParams)) { // 只有点击柱状图的数据时
            let tempResultParams = this.assemblyParams()
            if (this.$util.isNotEmptyObject(tempResultParams)) {
              tempExistFilterTableData.push({existParameter: tempResultParams.paramName, existFilterCondition: tempResultParams.filterName, filterInfo: tempResultParams})
            }
          }
          this.existFilterTableData = tempExistFilterTableData // 显示已经存在的过滤条件的表格
        }
      }
    },
    assemblyParams () {
      // 处理从2d图表点击后带来的数据组装参数时，相关的参数默认使用第一根轴的数据
      // 2：文本(精确查找),3:数值(x>=y,x<=m),6:日期(>=当前时间和小于当前日期的24点)7:非热词查询,8:热词查询
      let submitAnalysisParams = this.$store.state.analysisResultAllData.submitAnalysisParams // 临时存取已经提价的新建分析参数
      let tempChartParams = this.chartResultParams
      let treeType = submitAnalysisParams.axisOneTreeType // 对应tree的TYPE
      let columnType = submitAnalysisParams.axisOneColumnType // 对应tree的COLUMNTYPE
      let columnNameValue = submitAnalysisParams.axisOneValue // 对应tree的RESULT_COLUMN_INDEX/COLUMNNAME组装后的数据
      let columnName = submitAnalysisParams.axisOne // 对应tree的RESULT_COLUMN_INDEX/COLUMNNAME
      let dataSourceName = submitAnalysisParams.axisOneDataSourceName // 对应tree的DATASOURCE_NAME
      let name = submitAnalysisParams.axisOneName // 对应tree的NAME
      let tableIndex = submitAnalysisParams.axisOneTableIndex // 对应tree的RESULT_TABLE_INDEX
      let treeId = submitAnalysisParams.axisOneTreeId // 对应tree的ID

      let attrRadioFlag = ''
      let attrRadioValue = ''
      let operatordId = ''
      let selectValueOne = ''
      let paramValueOne = ''
      let paramValueTwo = ''
      let condition = ''
      let filterName = ''
      if (treeType === '2') {
        operatordId = '11'
        paramValueOne = tempChartParams.nameOne
        condition = '= \'' + tempChartParams.nameOne + '\''
        filterName = tempChartParams.name
      } else if (treeType === '3') {
        attrRadioFlag = '1'
        attrRadioValue = '1'
        operatordId = '7'
        selectValueOne = '7'
        paramValueOne = tempChartParams.nameOne
        paramValueTwo = tempChartParams.nameTwo
        let tempSqlType = ''
        if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
          tempSqlType = columnName
        } else {
          tempSqlType = 'g' + columnName
        }
        condition = tempChartParams.nameOne + ' <= cast( ' + tempSqlType + ' as double) and cast( ' + tempSqlType + ' as double) <= ' + tempChartParams.nameTwo
        filterName = tempChartParams.nameOne + ' <= x <= ' + tempChartParams.nameTwo
      } else if (treeType === '6') {
        attrRadioFlag = '3'
        attrRadioValue = '3'
        operatordId = '37'
        paramValueOne = tempChartParams.nameOne
        paramValueTwo = tempChartParams.nameTwo
        condition = columnName + ' >= \'' + tempChartParams.nameOne + '\' and ' + columnName + ' < \'' + tempChartParams.nameTwo + '\''
        filterName = tempChartParams.nameOne + '~' + tempChartParams.nameTwo
      } else if (treeType === '7' || treeType === '8') {
        operatordId = '13'
        selectValueOne = tempChartParams.nameOne
        if (columnType === 'NUMBER') {
          condition = 'in (' + tempChartParams.nameOne + ')'
        } else {
          condition = "in ('" + tempChartParams.nameOne + "')"
        }
        filterName = tempChartParams.nameOne
      }
      return {
        attrRadioFlag: attrRadioFlag,
        attrRadioValue: attrRadioValue,
        columnName: columnName,
        condition: condition,
        dataSourceNameValue: dataSourceName,
        filterName: filterName,
        operatordId: operatordId,
        paramId: treeId,
        paramName: name,
        paramType: treeType,
        paramValueOne: paramValueOne,
        paramValueTwo: paramValueTwo,
        paramValueThree: '',
        resultColumnIndex: tableIndex ? columnNameValue.substr(1) : '',
        resultTableIndex: tableIndex,
        selectValueOne: selectValueOne,
        selectValueTwo: '',
        selectValueThree: ''
      }
    },
    showNewFilterParams (obj) { // 显示新增的过滤条件
      let tempNewFilterTableData = []
      let filterArr = obj.filterArr
      this.tempNotNullStr = obj.notNullArr // 赋值临时存储notNull的值
      this.tempTableIndexStr = obj.tableIndexArr // 赋值临时存储tableIndex的值
      this.tempDataSourceNameStr = obj.dataSourceName // 赋值临时存储datasourceName的值
      if (filterArr.length > 0) {
        for (let i = 0; i < filterArr.length; i++) {
          tempNewFilterTableData.push({newParameter: filterArr[i].paramName, newFilterCondition: filterArr[i].filterName, filterInfo: filterArr[i]}) // 组装新增过滤条件的表格数据
        }
        this.newFilterTableData = this.newFilterTableData.concat(tempNewFilterTableData) // 显示新增过滤条件的表格
      }
    },
    newFilterRowDelete (index, rows) { // 新增筛选配置中表格删除行
      console.log('newFilterRowDelete', index, rows)
      rows.splice(index, 1)
    },
    existFilterRowDelete (index, rows) { // 已经存在筛选配置中表格删除行
      console.log('existFilterRowDelete', index, rows)
      rows.splice(index, 1)
    },
    resetSubmitAnalysisParams () { // 重新组装已经提交的分析参数，然后重新提交数据
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))
      if (this.$util.isNotEmptyObject(submitAnalysisParams)) {
        let newFilterArr = []
        this.existFilterTableData.map((item) => {
          newFilterArr.push(item.filterInfo)
        })

        this.newFilterTableData.map((item) => {
          newFilterArr.push(item.filterInfo)
        })

        if (newFilterArr.length > 0) { // 把刚刚临时存储过滤条件参数的数组，临时存储的notNull的值，临时存储的tableIndex的值，重新赋值给已经提交过得分析参数，然后再次提交数据
          submitAnalysisParams.filter = newFilterArr
        } else {
          submitAnalysisParams.filter = []
        }

        if (this.$util.isDefine(this.tempNotNullStr)) {
          submitAnalysisParams.notNull = this.tempNotNullStr + ',' + submitAnalysisParams.notNull
        } else {
          submitAnalysisParams.notNull = submitAnalysisParams.notNull
        }

        if (this.$util.isDefine(this.tempTableIndexStr)) {
          submitAnalysisParams.tableIndex = this.tempTableIndexStr + ',' + submitAnalysisParams.tableIndex
        } else {
          submitAnalysisParams.tableIndex = submitAnalysisParams.tableIndex
        }

        if (this.$util.isDefine(this.dataSourceNameStr)) {
          let tempStr = this.dataSourceNameStr + ',' + submitAnalysisParams.dataSourceName
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.dataSourceName = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.dataSourceName = submitAnalysisParams.dataSourceName
        }

        submitAnalysisParams.isGuide = '2' // 钻取这个字段标识的值是2
        console.log('drillDownComponent@submitAnalysisParams:', JSON.stringify(submitAnalysisParams))
        this.dialogTableVisible = false
        this.$bus.$emit('submitNewFileDataHandle', submitAnalysisParams, 'drillDownComponent') // 调用提交新建方法，此方法在Manager.vue中, 第三个参数表示从哪个功能提交的
      }
    },
    closeGridDialog () { // 关闭dialog时内部状态赋值默认值
      this.filterParamsFilp = true
    },
    openGridDialog () { // 在打开表格时重新赋值表格的宽度
      setTimeout(() => {
        let dialogParamsHeight = document.getElementById('gridDialogParams').clientHeight
        if (this.$util.isDefine(dialogParamsHeight) && dialogParamsHeight > 0) {
          this.elTableHeight = parseInt(dialogParamsHeight - 144) / 2
        }
      }, 20)
    }
  }
}
</script>
<style scoped>
.grid-dialog >>> .el-dialog {
  margin: 5vh auto !important;
  width: 95%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.grid-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 90%;
}
.grid-dialog >>> .el-dialog__header {
  border-bottom: 1px solid #DDDDDD;
}
.filterName {
  border-left: 2px solid #437ACF;
}
.view-table-btn {
  height: 26px;
  width: 100%;
  padding: 20px 0;
}
.view-table-btn button {
  width: 126px;
  height:30px;
  padding: 3px 20px;
  border-radius: 4px;
}
.view-table-btn button.edit {
  border: 1px solid #DDDDDD;
  background-color: #FFFFFF;
  font-size: 12px;
  color: #1E3354;
}
.view-table-btn button.submit {
  background-color: #437ACF;
  font-size: 12px;
  color: #FFFFFF;
  margin-left: 60px;
}
.filter-front {
  position: relative;
  overflow: auto;
  padding: 0 20px;
}
</style>
