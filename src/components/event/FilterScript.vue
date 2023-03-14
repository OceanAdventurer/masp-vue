<style scoped>
.table-ligc{
  border-right: solid 1px #DDDDDD;height: auto; border-top: solid 1px #DDDDDD;  border-left: solid 1px #DDDDDD; margin-top: 20px;margin-left: 10px;border-bottom: solid 1px #dddddd;
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
  <div style="width: 98%;height: 100%; overflow-x: hidden;margin-left:10px;">
    <el-form ref="form" size="mini">
      <div v-if="this.ackTypeData.length > 1 && this.checkAcTypeData.checked && this.checkAcTypeData.checked === '1'">
        <div style="width: 100%;margin-top: 10px;height: 30px;" >
          <div style="width: 25%;float: left;line-height: 30px" >
            <el-checkbox v-model="formData.checked" @change="checkedFlight">按机型自定义等级</el-checkbox>
          </div>
          <div style="width: 70%;margin-top: 10px;line-height: 30px" v-show="this.checkAcTypeData.checked === '1' && formData.checked">
            <el-radio-group v-model="flightModel" >
              <div style="margin-left: 5px;float: left" v-for="(item, key) in ackTypeData" :key="key">
                <el-radio :label="item" >{{item}}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
    <div style="width: 100%;margin-top: 10px;">
      <el-table
        highlight-current-row
        :header-cell-style="{height:'25px',padding:'3px'}"
        :row-style="{height:'25px'}"
        :cell-style="{padding:'3px'}"
        border
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        :data="FilterScriptTable"
        style="width: 100%;font-size: 12px">
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
      <div style="width: 100%;margin-top:10px;margin-left: -10px " v-show="showContent">
        <div style="width: 100%;">
          <div style="width: 50%;float: left;">
          <!--        <el-form-item label="持续时长：" style="margin-top: 10px;">-->
  <!--          <el-select-->
  <!--            v-model="filterFormData.durationCompare" placeholder="请选择" style="width: 35%;float: left" size="mini"  :disabled="!isCurrentUser || isLinkParam" >-->
  <!--            <el-option-->
  <!--              v-for="item in levelOptioins"-->
  <!--              :key="item.value"-->
  <!--              :label="item.label"-->
  <!--              :value="item.value">-->
  <!--            </el-option>-->
  <!--          </el-select>-->
  <!--          <el-input v-model="filterFormData.durationLevelValue" size="mini" style="width: 30%;float: left;margin-left: 10px" ></el-input>-->
  <!--        </el-form-item>-->
          <div v-for="(tableItem, index) in tableListData" :key="index">
            <div style="width: 100%;padding-left: 23px;margin-top: 5px;">
              <el-button
                type="primary"
                size="mini"
                circle
                v-show="tableItem.rl !== '' && tableItem.rl === '与'"
                @click="changeRelation(index, '', '或')" v-if="!isLinkParam && isCurrentUser">与
              </el-button>
              <el-button
                type="primary"
                size="mini"
                circle
                v-show="tableItem.rl !== '' && tableItem.rl === '与'"
                @click="changeRelation(index, '', '或')"  disabled="disabled"  v-else>与
              </el-button>
              <el-button
                type="warning"
                size="mini"
                circle
                v-show="tableItem.rl !== '' && tableItem.rl === '或'"
                @click="changeRelation(index, '', '与')" v-if="!isLinkParam && isCurrentUser">或
              </el-button>
              <el-button
                type="warning"
                size="mini"
                circle
                v-show="tableItem.rl !== '' && tableItem.rl === '或'"
                @click="changeRelation(index, '', '与')"  disabled="disabled"  v-else>或
              </el-button>
            </div>
            <div class="table-ligc">
              <div class="tr-ligc">
                <div class="td-ligc" style="width: 40.4%;text-align: center">
                  工程参数
                </div>
                <div class="td-ligc" style="width: 23%;text-align: center">
                  函数关系
                </div>
                <div class="td-ligc" style="width: 33%;text-align: center;border-right: 0px;">
                  值
                </div>
              </div>
              <div v-for="(tableValueItem, tvi) in tableItem['data']" :key="tvi">
                <div class="tr-ligc">
                  <div class="td-ligc" style="width: 40.4%">
                    <el-input
                      size="mini"
                      readonly="readonly"
                      placeholder="请选择工程参数"
                      style="width: 80%;float: right"
                      :value="tableValueItem.pm"
                      v-model="tableValueItem.pm"
                      @focus="focusParameterName(index, tvi)">
                    </el-input>
                    <div style="width: 10%;float: right;margin-right: 10px;">
                      <el-button
                        type="primary"
                        circle
                        size="mini"
                        v-show="tableValueItem.rl !== '' && tableValueItem.rl === '与'"
                        @click="changeRelation(index, tvi, '或')" v-if="!isLinkParam && isCurrentUser">与
                      </el-button>
                      <el-button
                        type="primary"
                        circle
                        size="mini"
                        v-show="tableValueItem.rl !== '' && tableValueItem.rl === '与'"
                        @click="changeRelation(index, tvi, '或')"  disabled="disabled"  v-else>与
                      </el-button>
                      <el-button
                        type="warning"
                        circle
                        size="mini"
                        v-show="tableValueItem.rl !== '' && tableValueItem.rl === '或'"
                        @click="changeRelation(index, tvi, '与')" v-if="!isLinkParam && isCurrentUser">或
                      </el-button>
                      <el-button
                        type="warning"
                        circle
                        size="mini"
                        v-show="tableValueItem.rl !== '' && tableValueItem.rl === '或'"
                        @click="changeRelation(index, tvi, '与')" v-else  disabled="disabled" >或
                      </el-button>
                    </div>
                  </div>
                  <div class="td-ligc" style="width: 23%">
                    <el-select v-model="tableValueItem.sv" placeholder="请选择" style="width: 100%;" size="mini" v-if="isCurrentUser && !isLinkParam" clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="tableValueItem.sv" placeholder="请选择" style="width: 100%;" size="mini"  disabled="disabled"  v-else clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="td-ligc" style="width: 33%;border-right: 0px;">
                    <el-input
                      v-if="isCurrentUser && !isLinkParam"
                      placeholder="请输入内容"
                      @blur="bllur(tableValueItem.pV)"
                      style="width: 100%;" size="mini"
                      :value="tableValueItem.pV"
                      v-model="tableValueItem.pV">
                    </el-input>
                    <el-input
                      v-else
                      readonly="readonly"
                      placeholder="请输入内容"
                      style="width: 100%;" size="mini"
                      :value="tableValueItem.pV"
                      v-model="tableValueItem.pV">
                    </el-input>
                  </div>
                </div>
                <div style="width: 100%;clear: both;" v-show="!tableItem['data'][parseInt(tvi)+1]" >
                  <div class="tr-ligc"   v-show="isCurrentUser && !isLinkParam" style="padding-left: 10px;">
                    <el-button type="primary" plain @click="addTableValueItem(index, tvi)" size="mini">增加</el-button>
                    <el-button type="primary" plain @click="delTableValueItem(index, tvi)" v-show="index > 0 || tvi >0"
                               size="mini">删除
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 100%;    padding-left: 10px;padding-top: 4px;" v-show="isCurrentUser && !isLinkParam">
              <el-button type="primary" size="mini" plain @click="delTableValueItem(index, '')" v-show="index > 0">删除表格</el-button>
            </div>
          </div>
          <div style="width: 100%;margin:10px 0px auto 10px" v-show="isCurrentUser && !isLinkParam">
          <el-button type="primary" plain @click="addRelation()" size="mini">增加逻辑关系</el-button>
          </div>
        </div>
          <div style="width: 48%;float: left;margin-left: 2%;">
            <MultipleListInput  :labelTitle= 'timeLabel' :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam" :dataTable="timeTableListData"></MultipleListInput>
          </div>
        </div>
        <div style="width: 100%;">
          <div style="width:55%; float: right">
            <el-button type="primary"  @click="confirmData()" size="mini" style="float: right">确定</el-button>
          </div>
        </div>
      </div>
    </div>
    </el-form>
  </div>
</template>

<script>
const MultipleListInput = () => import('components/event/child/MultipleListInput')

export default {
  data () {
    return {
      flightModel: '',
      timeLabel: '持续时间',
      tableCurrentIndex: 0,
      showContent: false,
      filterFormData: {
        'durationCompare': '',
        'durationLevelValue': ''
      },
      FilterScriptTable: [],
      levelOptioins: [{'value': '>', 'label': '>'}, {'value': '>=', 'label': '>='}, {'value': '=', 'label': '='}, {'value': '<', 'label': '<'}, {'value': '<=', 'label': '<='}],
      tableListData: {'0': {'data': { '0': {'rl': '', 'pm': '', 'sv': '请选择', 'pV': ''} }, 'rl': ''}},
      timeTableListData: {'0': {'data': {'0': {'rl': '', 'sv': '请选择', 'pV': ''}}}},
      currentInputTableIndex: 0,
      currentInputRowIndex: 0,
      ackTypeData: []
    }
  },
  components: {
    MultipleListInput
  },
  watch: {
    // 点击机型触发
    flightModel () { // 如果机型自定义的情况下。点击机型的时候，显示列表
      if (this.formData.checked) {
        this.showContent = false // 只显示列表，隐藏下面的内容
        // if (this.algorithmsLibraryNewEditStatus || this.algorithmsLibraryNewEditStatus === true) { // 编辑情况
        const list = this.flightModelData[this.flightModel]
        if (list && list.length > 0) {
          this.FilterScriptTable = list
        } else {
          this.FilterScriptTable = JSON.parse(JSON.stringify(this.FilterScriptTable1))
          this.flightModelData[this.flightModel] = JSON.parse(JSON.stringify(this.FilterScriptTable1))
        }
        // } else {
        //   this.MeasurementParametesTable = JSON.parse(JSON.stringify(this.flightModelData[this.flightModel]))
        // }
      }
    }
  },
  props: ['isLinkParam', 'isCurrentUser', 'options', 'scriptId', 'tableListEditData', 'FilterScriptTable1', 'formData', 'checkAcTypeData', 'flightModelData', 'algorithmsLibraryNewEditStatus'], // 编辑时传的值，因为组件还未初始化，无法通过this.$refs给子组件赋值，所以只能通过父传子的方式赋值
  mounted () {
    this.FilterScriptTable = JSON.parse(JSON.stringify(this.FilterScriptTable1)) // 防止修改了FilterScriptTable的同时修改了this.FilterScriptTable1
    this.getAckTypeData()
    this.setEditValue()
    setTimeout(() => {
      this.setDefaultFlightData()
    }, 500)
  },
  methods: {
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
    // 如编辑情况，并且没选中按照机型，默认给他赋一套值给对应机型
    setDefaultFlightData () {
      if (this.algorithmsLibraryNewEditStatus && !this.formData.checked) {
        for (let i = 0; i < this.ackTypeData.length; i++) {
          this.flightModelData[this.ackTypeData[i]] = JSON.parse(JSON.stringify(this.FilterScriptTable1))
        }
      }
    },
    checkedFlight () {
      this.flightModel = this.ackTypeData[0] // 默认选中第一个机型
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
        if (this.formData.checked) { // 如果选中按照机型，则设置默认值
          this.flightModel = this.ackTypeData[0] // 默认选中第一个机型
        }
      }
    },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex
    },
    // 行单击事件
    rowClick (row, event, column) {
      this.showContent = true
      this.tableCurrentIndex = row.index
      let tableListData = this.FilterScriptTable[this.tableCurrentIndex]['tld']
      if (tableListData !== undefined && JSON.stringify(tableListData) !== '{}') {
        this.tableListData = tableListData
      } else { // 如果不是空的则赋值，否则赋默认值
        this.tableListData = {'0': {'data': { '0': {'rl': '', 'pm': '', 'sv': '请选择', 'pV': ''} }, 'rl': ''}}
      }
      let timeTableListData = this.FilterScriptTable[this.tableCurrentIndex]['ttl']
      if (timeTableListData !== undefined && JSON.stringify(timeTableListData) !== '{}') {
        this.timeTableListData = timeTableListData
      } else { // 如果不是空的则赋值，否则赋默认值
        this.timeTableListData = {'0': {'data': { '0': {'rl': '', 'sv': '>', 'pV': '0'} }, 'rl': ''}}
      }
      // 回显。。"'CDSS_SUSP_SHOW_VID1' >= 1 AND 'CDSS_SUSP_SHOW_VID2' <= 1", "低级", "<", "3"
    },
    confirmData () {
      // 'RALTC' > 1 AND 'PITCH' < 5","高",">","1","'RALTC' > 1 AND 'PITCH' < 5","中",">","2"
        this.getemitMultipeListDataForLevel()
    },
    getemitMultipeListDataForLevel () {
      let script = '' // return _.data().eventByFilterScript("'RALTC' > 1 AND 'PITCH' < 5","高",">","1","'RALTC' > 1 AND 'PITCH' < 5","中",">","2");
      let scName = ''
      let compare = ''
      let paramIsNull = true
      script = ' "'
      for (let item in this.tableListData) {
        let data = this.tableListData[item]
        if (this.checkIsNotNull(data.rl)) {
          let rl = data.rl === '与' ? '并且' : ' 或者'
          // script += ' ' + rl + ' '
          script += ','
          scName += ','
          compare += ' ' + rl + ' '
        }
        for (let dt in data.data) {
          let obj = data.data[dt]
         if (obj.pm === undefined || obj.pm === '') {
            this.$message.error('请选择工程参数!')
            break
          } else if (obj.sv === '' || obj.sv === '请选择') {
            this.$message.error('请选择比较函数!')
            break
          } else if (obj.pV === undefined || obj.pV === '') {
            this.$message.error('请输入值!')
            break
          } else if (!this.bllur(obj.pV)) {
           break
         } else {
             if (this.checkIsNotNull(obj.rl)) {
               var rl1 = obj.rl === '与' ? '并且' : ' 或者'
               // var rl2 = obj.rl === '与' ? 'AND' : ' OR'
               // script += ' ' + rl2 + ' '
               compare += ' ' + rl1 + ' '
               script += ','
               scName += ','
             }
             paramIsNull = false
             // script += '\'' + obj.pm + '\' ' + obj.sv + ' ' + this.getParam(obj.pV)
             script += '\'' + obj.pm + '\'' + obj.sv + obj.pV
           scName += '\'' + obj.pm + '\'' + obj.sv + obj.pV
             compare += obj.pm + obj.sv + this.getParam(obj.pV)
          }
        }
        script = script.replace('AND()', '').replace('OR()', '').replace('AND ()', '').replace('OR ()', '')
        scName = scName.replace('AND()', '').replace('OR()', '').replace('AND ()', '').replace('OR ()', '')
      }
      if (paramIsNull) {
        // this.$message.error('工程参数不能有空值!')
        return false
      }
      let level = this.FilterScriptTable[this.tableCurrentIndex]['level']
      let levelIndex = this.FilterScriptTable[this.tableCurrentIndex]['level_index']
      script += '", "' + levelIndex + '" '
      scName += '", "' + level + '" '
      this.getemitMultipeListDataForTime(script, scName, compare)
    },
    // 持续时间
    getemitMultipeListDataForTime (script, scName, compare) {
      let script1 = ''
      let cp = ''
      // return _.data().eventByFilterAndScript("111","'RALTC' > 1",Constant.EVENT_ALERT,">","1","'RALTC' < 2",Constant.EVENT_WARN,">","2");
      for (let item in this.timeTableListData) {
        let data = this.timeTableListData[item]
        // if (this.checkIsNotNull(data.rl)) {
        //   let rl = data.rl === '与' ? '&&' : ' ||'
        //   script += ' ' + rl + ' '
        // }
        for (let dt in data.data) {
          let obj = data.data[dt]
          if ((obj.sv === '' || obj.sv === '请选择') && !obj.pV) { // 比较函数和值都为空直接退出
            break
          } else if ((obj.sv === '' || obj.sv === '请选择') && obj.pV) { // 如果持续时间选择了值，则必须输入值
            this.$message.error('请选择比较函数')
            break
          } else if (obj.sv !== '' && obj.sv !== '请选择' && !obj.pV) { // 如果持续时间选择了值，则必须输入值
            this.$message.error('请输入值！')
            break
          } else if (!this.bllur(obj.pV)) {
            break
          } else {
              if (this.checkIsNotNull(obj.rl)) { // 判断是否有 与或
                const rl1 = obj.rl === '与' ? ' 并且 ' : ' 或者 '
                cp += ' ' + rl1 + ' '
                script1 += ','
              }
              cp += obj.sv + obj.pV
              script1 += obj.sv + '@' + obj.pV
            }
        }
      }
      this.FilterScriptTable[this.tableCurrentIndex]['compare'] = cp === undefined || cp === '' ? compare : compare + '持续时间：' + cp
      this.FilterScriptTable[this.tableCurrentIndex]['script'] = script1 === undefined || script1 === '' ? script : script + ', "' + script1 + '"'
      this.FilterScriptTable[this.tableCurrentIndex]['scName'] = script1 === undefined || script1 === '' ? scName : scName + ', "' + script1 + '"'
      this.FilterScriptTable[this.tableCurrentIndex]['ttl'] = this.timeTableListData // 记录数组回显
      this.FilterScriptTable[this.tableCurrentIndex]['tld'] = this.tableListData // 记录数组回显
      if (this.formData.checked && this.checkAcTypeData.checked === '1') {
        this.flightModelData[this.flightModel] = this.FilterScriptTable
      } else { // 如果选中的是机型，直接赋值给对应机型，没有选中机型的，默认给第一个机型赋值
        this.flightModelData[this.ackTypeData[0]] = this.FilterScriptTable
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
    // 设置默认值
    setEditValue () {
      if (this.tableListEditData !== undefined && this.tableListEditData !== 'undefined' && JSON.stringify(this.tableListEditData) !== 'undefined' && JSON.stringify(this.tableListEditData) !== '{}') {
        this.tableListData = this.tableListEditData
      } else {
        this.tableListData = {'0': {'data': {
              '0': {'rl': '', 'pm': '', 'sv': '请选择', 'pV': ''},
              '1': { 'rl': '与', 'pm': '', 'sv': '请选择', 'pV': '' } },
            'rl': ''}
        }
      }
    },
    addRelation () { // 增加表格
      if (this.$util.isNotEmptyObject(this.tableListData)) { // 存在表格
        let tableIndex = 0
        for (let i in this.tableListData) {
          tableIndex = i
        }
        let tempTableIndex = parseInt(tableIndex) + 1
        let tempObj = {'data': {'0': {'rl': '', 'pm': '', 'sv': '请选择', 'pV': ''}}, 'rl': '与'}
        this.$set(this.tableListData, tempTableIndex.toString(), tempObj)
      } else { // 不存在表格
        let tempObj = {
          '0': {'data': {'0': {'rl': '', 'pm': '', 'sv': '请选择', 'pV': ''}}, 'rl': ''}
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
        let tempObj = {'rl': '与', 'pm': '', 'sv': '请选择', 'pV': ''}
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
        this.$set(this.tableListData[index]['data'][tvi], 'rl', type)
      } else { // 修改表格之间的关系
        this.$set(this.tableListData[index], 'rl', type)
      }
    },
    focusParameterName (index, tvi) { // 获取点击参数的位置
      this.currentInputTableIndex = index
      this.currentInputRowIndex = tvi
    },
    changeParameterName (val) { // 修改点击参数名字的值
      this.$set(this.tableListData[this.currentInputTableIndex]['data'][this.currentInputRowIndex], 'pm', val)
    },
    changeAndOr (index, type) { // 修改当前表格中每行的关系
      this.$set(this.tableListData[index], 'andOr', type)
    }
  }
}
</script>

<style scoped>

</style>
