<style scoped>
.table-ligc{
  border-right: solid 1px #DDDDDD;height: auto; border-top: solid 1px #DDDDDD;  border-left: solid 1px #DDDDDD; margin-top: 20px;border-bottom: solid 1px #dddddd;
}
.tr-ligc{
  width: 100%;
  height: 33px;
  padding-top: 3px;
}
.td-ligc{
  border-bottom: solid 1px #DDDDDD;border-right: solid 1px #DDDDDD;width: auto;height: 100%;float: left; line-height: 35px;
}
.el-button.is-circle {
  border-radius: 50%; padding: 4px;
}  .el-button+.el-button {
     margin-left: 0px;
   }
</style>
<template>
  <div style="width: 95%;height: 95%;margin: 0 auto;">
    <el-form ref="form" size="mini" :inline="true">
    <div style="width: 100%;margin-top: 10px;height: 30px;">
      <div style="width: 40%;float: left;line-height: 30px;">
         <div style="width: 80px;float: left">选择测量值:</div>
        <div style="width: calc(100% - 90px);float: left;">
          <el-input v-model="formData.analysisParameters" size="mini" readonly="readonly"></el-input>
        </div>
       </div>
      <div style="width: 40%;float: left;line-height: 30px;">
        <div style="margin-left:10px;width: 100px;float: left">选择飞行阶段:</div>
        <div style="width: calc(100% - 110px);float: left;">
          <el-select v-model="stageValue" multiple collapse-tags placeholder="飞行阶段" size="mini" @change="dataChange">
            <el-option
              v-for="item in stages"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="margin-left:10px;width: 15%;float: left;line-height: 30px" v-show="ackTypeData.length > 1 && checkAcTypeData.checked && checkAcTypeData.checked === '1'">
        <el-checkbox v-model="formData.checked" @change="checkedFlight">按机型自定义等级</el-checkbox>
      </div>
    </div>
      <div style="width: 100%;margin-top: 10px;" v-show="checkAcTypeData.checked === '1' && formData.checked">
        <el-radio-group v-model="flightModel" >
          <div style="margin-left: 5px;float: left" v-for="(item, key) in ackTypeData" :key="key">
            <el-radio :label="item" >{{item}}</el-radio>
          </div>
        </el-radio-group>
      </div>
      <div style="width: 100%;margin-top: 10px;">
      <el-table
        highlight-current-row
        :header-cell-style="{height:'25px',padding:'3px'}"
        :row-style="{height:'25px'}"
        :cell-style="{padding:'3px'}"
        border
        size="mini"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        :data="MeasurementParametesTable"
        style="width: 100%">
        <el-table-column
          prop="level"
          label="事件等级"
          width="100">
        </el-table-column>
        <el-table-column
          prop="compare"
          label="比较">
<!--          <div slot-scope="data">-->
<!--            {{data.row.script}}-->
<!--          </div>-->
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;" v-show="showContent">
        <div v-for="(tableItem, index) in tableListData" :key="index">
          <div class="table-ligc">
            <div class="tr-ligc">
              <div class="td-ligc" style="width: 10%;text-align: center">
                函数关系
              </div>
              <div class="td-ligc" style="width: 43%;text-align: center">
                比较
              </div>
              <div class="td-ligc" style="width: 46%;text-align: center;border-right: 0px;">
                值
              </div>
            </div>
            <div v-for="(tableValueItem, tvi) in tableItem['data']" :key="tvi">
              <div class="tr-ligc">
                <div class="td-ligc" style="width: 10%;text-align: center;">
                    <el-button
                      type="primary"
                      circle
                      size="mini"
                      v-show="tableValueItem.relation !== '' && tableValueItem.relation === '与'"
                      @click="changeRelation(index, tvi, '或')" v-if="!isLinkParam && isCurrentUser">与
                    </el-button>
                    <el-button
                      type="primary"
                      circle
                      size="mini"
                      v-show="tableValueItem.relation !== '' && tableValueItem.relation === '与'"
                      @click="changeRelation(index, tvi, '或')"  disabled="disabled"  v-else>与
                    </el-button>
                    <el-button
                      type="warning"
                      circle
                      size="mini"
                      v-show="tableValueItem.relation !== '' && tableValueItem.relation === '或'"
                      @click="changeRelation(index, tvi, '与')" v-if="!isLinkParam && isCurrentUser">或
                    </el-button>
                    <el-button
                      type="warning"
                      circle
                      size="mini"
                      v-show="tableValueItem.relation !== '' && tableValueItem.relation === '或'"
                      @click="changeRelation(index, tvi, '与')" v-else  disabled="disabled" >或
                    </el-button>
                </div>
                <div class="td-ligc" style="width: 43%">
                  <el-select v-model="tableValueItem.selectValue" placeholder="请选择" style="width: 80%;margin-left: 10%" size="mini" v-if="isCurrentUser && !isLinkParam" clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="tableValueItem.selectValue" placeholder="请选择" style="width: 80%;margin-left: 10%"  size="mini"  disabled="disabled"  v-else>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="td-ligc" style="width: 46%;border-right: 0px;">
                  <el-input
                    v-if="isCurrentUser && !isLinkParam"
                    placeholder="请输入内容"
                    style="width: 80%;margin-left: 10%" size="mini"
                    @blur="bllur(tableValueItem.parameterValue)"
                    :value="tableValueItem.parameterValue"
                    v-model="tableValueItem.parameterValue">
                  </el-input>
                  <el-input
                    v-else
                    readonly="readonly"
                    placeholder="请输入内容"
                    style="width: 80%;margin-left: 10%" size="mini"
                    @blur="bllur(tableValueItem.parameterValue)"
                    :value="tableValueItem.parameterValue"
                    v-model="tableValueItem.parameterValue">
                  </el-input>
                </div>
              </div>
              <div style="width: 100%;clear: both;" v-show="!tableItem['data'][parseInt(tvi)+1]" >
                <div class="tr-ligc"   v-show="isCurrentUser && !isLinkParam" style="padding-left: 10px;">
                  <el-button type="primary" plain @click="addTableValueItem(index, tvi)" size="mini">增加</el-button>
                  <el-button type="primary" plain @click="delTableValueItem(index, tvi)" v-show="index > 0 || tvi >0" size="mini">删除 </el-button>
                  <el-button type="primary"  @click="confirmData()" size="mini" style="float: right;margin-right: 20px;">确定</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        flightModel: '',
        stages: [{
          value: '1',
          label: 'Engine Stopped'
        }, {
          value: '2',
          label: 'Taxi Out'
        }, {value: '3',
          label: 'Take Off'
        }, {value: '4',
          label: 'Rejected Take Off'
        }, {value: '5',
          label: '2nd Segment'
        }, {value: '6',
          label: 'Initial Climb'
        }, {value: '7',
          label: 'Climb'
        }, {value: '8',
          label: 'Cruise'
        }, {value: '9',
          label: 'Descent'
        }, {value: '10',
          label: 'Approach'
        }, {value: '11',
          label: 'Final Approach'
        }, {value: '12',
          label: 'Landing'
        }, {value: '13',
          label: 'Go Around'
        }, {value: '14',
          label: 'Taxi In'
        }],
        MeasurementParametesTable: [],
        showContent: false,
        levelOptioins: [{'value': '>', 'label': '>'}, {'value': '>=', 'label': '>='}, {'value': '=', 'label': '='}, {'value': '<', 'label': '<'}, {'value': '<=', 'label': '<='}],
        tableListData: {'0': {'data': {'0': {'relation': '', 'selectValue': '请选择', 'parameterValue': ''}}}},
        options: [{
          value: '>',
          label: '>'
        }, {
          value: '<',
          label: '<'
        }, {
          value: '=',
          label: '='
        }, {value: '>=',
          label: '>='
        }, {value: '<=',
          label: '<='
        }],
        tableCurrentIndex: 0,
        ackTypeData: [],
        stageValue: []
      }
    },
    watch: {
      // 点击机型触发
      flightModel () { // 如果机型自定义的情况下。点击机型的时候，显示列表
        if (this.formData.checked) {
          this.showContent = false // 只显示列表，隐藏下面的内容
          // if (this.algorithmsLibraryNewEditStatus || this.algorithmsLibraryNewEditStatus === true) { // 编辑情况
            const list = this.flightModelData[this.flightModel]
            if (list && list.length > 0) {
              this.MeasurementParametesTable = list
            } else {
              this.MeasurementParametesTable = JSON.parse(JSON.stringify(this.MeasurementParametesTable1))
              this.flightModelData[this.flightModel] = JSON.parse(JSON.stringify(this.MeasurementParametesTable1))
            }
          // } else {
          //   this.MeasurementParametesTable = JSON.parse(JSON.stringify(this.flightModelData[this.flightModel]))
          // }
        }
      }
    },
    props: ['formData', 'isLinkParam', 'isCurrentUser', 'checkAcTypeData', 'flightModelData', 'MeasurementParametesTable1', 'parentName', 'algorithmsLibraryNewEditStatus'],
    mounted () {
      this.$bus.$on('emitAnalysisParameters', () => {})
      let data = JSON.parse(JSON.stringify(this.MeasurementParametesTable1))
      this.MeasurementParametesTable = data
      this.getAckTypeData()
      this.stageValue = this.formData.stage.split(',') || []
      setTimeout(() => {
        this.setDefaultFlightData()
      }, 500)
    },
    methods: {
      // 选择飞行阶段发生变化
      dataChange (val) {
        let data = val.join(',')
        this.$emit('getChangeData', data)
      },
      // 如编辑情况，并且没选中按照机型，默认给他赋一套值给对应机型
      setDefaultFlightData () {
        if (this.algorithmsLibraryNewEditStatus && !this.formData.checked) {
          for (let i = 0; i < this.ackTypeData.length; i++) {
            this.flightModelData[this.ackTypeData[i]] = JSON.parse(JSON.stringify(this.MeasurementParametesTable1))
          }
        }
      },
      // 点击选中按照机型，则设置默认值
      checkedFlight () {
          this.flightModel = this.ackTypeData[0] // 默认选中第一个机型
      },
      bllur (v) {
        if (v === undefined || v === '') {
          return true
        }
        let reg = /^(-)?(([0-9])|([1-9]([0-9]+)))(.[0-9]+)?$/
        if (!reg.test(v)) {
          this.$message.error('请输入数字')
          return false
        }
        return true
      },
      // 获取机型的值
      getAckTypeData () {
       if (this.checkAcTypeData.checked === '1') {
         let i = 0
         Object.keys(this.checkAcTypeData.list).forEach(key => {
           if (i === 0) { // 只要第一个就行
             this.ackTypeData = this.checkAcTypeData.list[key]
           }
           i++
         })

         if (this.formData.checked) { // 如果是选中按照机型的，则设置默认值
           this.flightModel = this.ackTypeData[0] // 默认选中第一个机型
         }
       }
      },
      tableRowClassName ({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex
      },
      // 行单击事件
      rowClick (row, eveMeasuremenFormDatant, column) {
        this.showContent = true
        this.tableCurrentIndex = row.index
        let tableListData = this.MeasurementParametesTable[this.tableCurrentIndex]['tbList']
        if (tableListData !== undefined && JSON.stringify(tableListData) !== '{}') {
          this.tableListData = tableListData
        } else { // 如果不是空的则赋值，否则赋默认值
          this.tableListData = {'0': {'data': {'0': {'relation': '', 'selectValue': '请选择', 'parameterValue': ''}}}}
        }
       },
      confirmData () {
        if (this.formData.analysisParameters === undefined || this.formData.analysisParameters === '') {
          this.$message.error('分析参数不能为空!')
        } else {
          let levelIndex = this.MeasurementParametesTable[this.tableCurrentIndex]['level_index']
          let level = this.MeasurementParametesTable[this.tableCurrentIndex]['level']
          // return _.data().eventByFilterScript("'RALTC' > 1 AND 'PITCH' < 5","高",">","1","'RALTC' > 1 AND 'PITCH' < 5","中",">","2");
          // let paramIsNull = true
          let script = ''
          let scriptName = ''
          let compare = ''
          for (let item in this.tableListData) {
            let data = this.tableListData[item]
            // if (this.checkIsNotNull(data.relation)) {
            //   let relation = data.relation === '与' ? '&&' : ' ||'
            //   script += ' ' + relation + ' '
            // }
            script += '"'
            scriptName += '"'
            for (let dt in data.data) {
              let obj = data.data[dt]
              if (obj.selectValue === '' || obj.selectValue === '请选择') {
                this.$message.error('请选择比较函数!')
                break
              } else if (obj.parameterValue === undefined || obj.parameterValue === '') {
                this.$message.error('请输入值')
                break
              } else if (!this.bllur(obj.parameterValue)) {
                break
              } else {
                if (this.checkIsNotNull(obj.relation)) { // 判断是否有 与或
                  let relation1 = obj.relation === '与' ? ' 并且 ' : ' 或者 '
                  let relation2 = obj.relation === '与' ? ' && ' : ' || '
                  script += ' ' + relation2 + ' '
                  scriptName += ' ' + relation2 + ' '
                  compare += ' ' + relation1 + ' '
                }
                // paramIsNull = false
                //"_.run2(\" + 测量值id + "\") > 10",Constant.EVENT_ALERT,"_.run2(\" + 测量值id + "\") > 5 && _.run2(\" + 测量值id + "\") <= 10",Constant.EVENT_WARN
                compare += obj.selectValue + obj.parameterValue
                script += '_.run2(\\"@\\" ) ' + obj.selectValue + ' ' + this.getParam(obj.parameterValue)
                scriptName += '_.run2(\\"#\\" ) ' + obj.selectValue + ' ' + this.getParam(obj.parameterValue)
              }
            }
            script = script.replace('&&()', '').replace('||()', '').replace('&& ()', '').replace('|| ()', '')
            scriptName = scriptName.replace('&&()', '').replace('||()', '').replace('&& ()', '').replace('|| ()', '')
            script += '", "' + levelIndex + '"'
            scriptName += '", "' + level + '"'
          }
          // if (paramIsNull) {
          //   this.$message.error('不能有空值!')
          //   return false
          // }
          this.MeasurementParametesTable[this.tableCurrentIndex]['compare'] = compare // 比较值
          this.MeasurementParametesTable[this.tableCurrentIndex]['script'] = script // 每个等级一个脚本最后统一拼接
          this.MeasurementParametesTable[this.tableCurrentIndex]['scName'] = scriptName // 每个等级一个脚本最后统一拼接
          this.MeasurementParametesTable[this.tableCurrentIndex]['tbList'] = this.tableListData // 记录数组回显
          if (this.formData.checked && this.checkAcTypeData.checked === '1') {
            this.flightModelData[this.flightModel] = this.MeasurementParametesTable
          } else { // 如果选中的是机型，直接赋值给对应机型，没有选中机型的，默认给第一个机型赋值
            this.flightModelData[this.ackTypeData[0]] = this.MeasurementParametesTable
          }
        }
      },
      checkIsNotNull (val) {
        if (val !== null && val !== undefined && val !== '') {
          return true
        } else return false
      },
      getParam (val) {
        if (isNaN(val)) {
          return '\'' + val + '\''
        } else {
          return val
        }
      },
      addRelation () { // 增加表格
        if (this.$util.isNotEmptyObject(this.tableListData)) { // 存在表格
          let tableIndex = 0
          for (let i in this.tableListData) {
            tableIndex = i
          }
          let tempTableIndex = parseInt(tableIndex) + 1
          let tempObj = {'data': {'0': {'relation': '', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': ''}}, 'relation': '与'}
          this.$set(this.tableListData, tempTableIndex.toString(), tempObj)
        } else { // 不存在表格
          let tempObj = {
            '0': {'data': {'0': {'relation': '', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': ''}}, 'relation': ''}
          }
          this.tableListData = tempObj
        }
      },
      addTableValueItem (index, tvi) { // 增加表格中的一行
        if (this.$util.isNotEmptyObject(this.tableListData[index]['data'])) {
          let rowIndex = 0
          for (let i in this.tableListData[index]['data']) {
            rowIndex = i
          }
          let tempRowIndex = (parseInt(rowIndex) + 1).toString()
          let tempObj = {'relation': '与', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': ''}
          this.$set(this.tableListData[index]['data'], tempRowIndex, tempObj) // 修改表格行数据
          this.$set(this.tableListData[index], 'data', this.tableListData[index]['data']) // 修改表格数据
        }
      },
      delTableValueItem (index, tvi) {
        if (tvi !== '') { // 删除表格之间的行数据
          this.$delete(this.tableListData[index]['data'], tvi.toString())
          if (!this.$util.isNotEmptyObject(this.tableListData[index]['data'])) {
            this.$delete(this.tableListData, index.toString())
          }
        } else { // 删除表格
          this.$delete(this.tableListData, index.toString())
        }
      },
      changeRelation (index, tvi, type) { // 修改当前表格中每行的关系
        if (tvi !== '') { // 修改表格中行之间的关系
          this.$set(this.tableListData[index]['data'][tvi], 'relation', type)
        } else { // 修改表格之间的关系
          this.$set(this.tableListData[index], 'relation', type)
        }
      },
      focusParameterName (index, tvi) { // 获取点击参数的位置
        this.currentInputTableIndex = index
        this.currentInputRowIndex = tvi
      },
      changeParameterName (val) { // 修改点击参数名字的值
        this.$set(this.tableListData[this.currentInputTableIndex]['data'][this.currentInputRowIndex], 'parameterName', val)
      },
      changeAndOr (index, type) { // 修改当前表格中每行的关系
        this.$set(this.tableListData[index], 'andOr', type)
      }
    }
  }
</script>
