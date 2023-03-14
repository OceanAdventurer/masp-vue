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
  <div style="width: 100%;height: 95%;">
    <el-form ref="form" :model="formData" label-width="18%" size="mini" style="margin-top: 10px;">
      <el-form-item label="选择筛选方式：">
        <el-input v-model="formData.shaixuanWay" @click="checkTimePoint"   readonly="readonly"  style="width: 78%;float: left;"></el-input>
        <el-button type="primary" size="small"  @click="checkTimePoint"  style="float: left;margin-left: 22px;width: 90px" v-show="isCurrentUser && !isLinkParam">筛选方式</el-button>
      </el-form-item>
      <el-form-item label="选择工程参数：">
        <el-input v-model="formData.gongchengParam" @click="checkColumnName"  readonly="readonly"  style="width: 78%;float: left;" ></el-input>
        <el-button type="primary" size="small" @click="checkColumnName" style="float: left;margin-left: 22px;width: 90px" v-show="isCurrentUser && !isLinkParam">工程参数树</el-button>
      </el-form-item>
      <div  v-if="this.ackTypeData.length > 1 && this.checkAcTypeData.checked && this.checkAcTypeData.checked === '1'">
        <div style="width: 100%;margin-top: 5px;">
          <div style="margin-left:10px;width: 25%;float: left;">
            <el-checkbox v-model="formData.checked" @change="checkedFlight">按机型自定义等级</el-checkbox>
          </div>
          <div style="width: 70%;margin-top: 10px;" v-show="this.checkAcTypeData.checked === '1' && formData.checked">
            <el-radio-group v-model="flightModel" >
              <div style="margin-left: 5px;float: left" v-for="(item, key) in ackTypeData" :key="key">
                <el-radio :label="item" >{{item}}</el-radio>
              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div style="width: 97%;margin-top: 5px;margin-left: 10px;">
        <el-table
          highlight-current-row
          :header-cell-style="{height:'25px',padding:'3px'}"
          :row-style="{height:'25px'}"
          :cell-style="{padding:'3px'}"
          size="mini"
          :row-class-name="tableRowClassName"
          @row-click="rowClick"
          :data="ScreeningMethodTable"
          border
          style="width: 100%">
          <el-table-column
            prop="level"
            label="事件等级"
            width="180">
          </el-table-column>
          <el-table-column
            prop="compare"
            label="比较">
          </el-table-column>
        </el-table>
        <div style="width: 100%;margin-top:10px; " v-show="showContent">
          <div style="width: 49%;float: left">
            <MultipleListInput ref="levelTableListDataRef"  :labelTitle= 'levelLabel' :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam" :dataTable="levelTableListData"></MultipleListInput>
          </div>
          <div style="width: 49%;float: left;margin-left: 2%;">
            <MultipleListInput ref="timeTableListDataRef" :labelTitle="timeLabel" :isCurrentUser="isCurrentUser" :isLinkParam="isLinkParam" :dataTable="timeTableListData"></MultipleListInput>
          </div>
          <div style="clear: both; width: 100%; height: 30px; padding-top: 10px;">
            <el-button type="primary"  @click="confirmData()" size="mini" style="float: right;">确定</el-button>
          </div>
        </div>
<!--        <el-form-item label="等级定义：" style="margin-top: 5px;" v-show="showContent">-->
<!--          <el-select-->
<!--            v-model="screeningData.levelCompare" placeholder="请选择" style="width: 35%;float: left" size="mini"  :disabled="!isCurrentUser || isLinkParam" >-->
<!--            <el-option-->
<!--              v-for="item in levelOptioins"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          <el-input v-model="screeningData.levelValue" size="mini" style="width: 30%;float: left;margin-left: 10px" ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="持续时间：" style="margin-top: 5px;" v-show="showContent">-->
<!--          <el-select-->
<!--            v-model="screeningData.timeCompare" placeholder="请选择" style="width: 35%;float: left" size="mini"  :disabled="!isCurrentUser || isLinkParam" >-->
<!--            <el-option-->
<!--              v-for="item in levelOptioins"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          <el-input v-model="screeningData.timelevelValue" size="mini" style="width: 30%;float: left;margin-left: 10px" ></el-input>-->
<!--          <el-button type="primary" size="mini" style="float: left;margin-left: 15px" @click="confirmData()"> 确 定 </el-button>-->
<!--        </el-form-item>-->
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
      levelLabel: '等级定义',
      timeLabel: '持续时间',
      tableCurrentIndex: 0,
      showContent: false,
      screeningData: {
        levelCompare: '',
        levelValue: '',
        timeCompare: '',
        timelevelValue: ''
      },
      levelOptioins: [{'value': '>', 'label': '>'}, {'value': '>=', 'label': '>='}, {'value': '=', 'label': '='}, {'value': '<', 'label': '<'}, {'value': '<=', 'label': '<='}],
      levelTableListData: {'0': {'data': {'0': {'rl': '', 'sv': '请选择', 'pV': ''}}}},
      timeTableListData: {'0': {'data': {'0': {'rl': '', 'sv': '请选择', 'pV': ''}}}},
      url: '',
      params: {},
      urlFlag: '',
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '', // 子节点id
      parentId: '-1', // 默认父节点id
      treeType: '',
      ScreeningMethodTable: [],
      ackTypeData: []
    }
  },
  components: {
    MultipleListInput
  },
  props: ['formData', 'isLinkParam', 'isCurrentUser', 'checkAcTypeData', 'flightModelData', 'ScreeningMethodTable1', 'algorithmsLibraryNewEditStatus'],
  watch: {
    // 点击机型触发
    flightModel () { // 如果机型自定义的情况下。点击机型的时候，显示列表
      if (this.formData.checked) {
        this.showContent = false // 只显示列表，隐藏下面的内容
        // if (this.algorithmsLibraryNewEditStatus || this.algorithmsLibraryNewEditStatus === true) { // 编辑情况
        const list = this.flightModelData[this.flightModel]
        if (list && list.length > 0) {
          this.ScreeningMethodTable = list
        } else {
          this.ScreeningMethodTable = JSON.parse(JSON.stringify(this.ScreeningMethodTable1))
          this.flightModelData[this.flightModel] = JSON.parse(JSON.stringify(this.ScreeningMethodTable1))
        }
        // } else {
        //   this.MeasurementParametesTable = JSON.parse(JSON.stringify(this.flightModelData[this.flightModel]))
        // }
      }
    }
  },
  mounted () {
    let data = JSON.parse(JSON.stringify(this.ScreeningMethodTable1))
    this.ScreeningMethodTable = data
    this.getAckTypeData()
    setTimeout(() => {
      this.setDefaultFlightData()
    }, 500)
  },
  methods: {
    // 如编辑情况，并且没选中按照机型，默认给他赋一套值给对应机型
    setDefaultFlightData () {
      if (this.algorithmsLibraryNewEditStatus && !this.formData.checked) {
        for (let i = 0; i < this.ackTypeData.length; i++) {
          this.flightModelData[this.ackTypeData[i]] = JSON.parse(JSON.stringify(this.ScreeningMethodTable1))
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
    checkTimePoint () {
      this.$emit('treeType1', 'shaixuanway')
    },
    // 点击工程参数输入框
    checkColumnName () {
      this.$emit('treeType1', 'gongchengparam')
    },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex
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
    confirmData () {
      if (!this.formData.shaixuanWay || !this.formData.gongchengParam) {
        this.$message.error('筛选方式和工程参数不能为空!')
      } else {
        this.getemitMultipeListDataForLevel()
      }
    },
    // 等级定义确定
    getemitMultipeListDataForLevel () {
      //  "'RALTC' > 1",等级 ,">","1"
      // RALTC' > 1 等级定义 'RALTC' > 1  >@3,<=@2
      let level = this.ScreeningMethodTable[this.tableCurrentIndex]['level']
      let levelIndex = this.ScreeningMethodTable[this.tableCurrentIndex]['level_index']
      let paramIsNull = true
      let compare = ''
      let scriptName = ' "\'' + this.formData.gongchengParam + '\''
      let sc = ' "\'' + this.formData.gongchengParam + '\''
      for (let item in this.levelTableListData) {
        let data = this.levelTableListData[item]
        // if (this.checkIsNotNull(data.rl)) {
        //   let rl = data.rl === '与' ? '&&' : ' ||'
        //   script += ' ' + rl + ' '
        // }
        for (let dt in data.data) {
          let obj = data.data[dt]
          if (obj.sv === '' || obj.sv === '请选择') {
            this.$message.error('请选择比较函数！')
            break
          } else if (obj.pV === undefined || obj.pV === '') {
            this.$message.error('请输入值')
            break
          } else if (!this.bllur(obj.pV)) {
            break
          } else {
            if (this.checkIsNotNull(obj.rl)) { // 判断是否有 与或
              var rl1 = obj.rl === '与' ? ' 并且 ' : ' 或者 '
              compare += ' ' + rl1 + ' '
              scriptName += ',' // 代表与 或者
              sc += ',' // 代表与 或者
            }
            paramIsNull = false
            compare += obj.sv + obj.pV
            scriptName += obj.sv + obj.pV
            sc += obj.sv + obj.pV
          }
        }
      }
      if (paramIsNull) {
        // this.$message.error('等级定义不能有空值!')
        return false
      }
      scriptName += '", "' + level + '"'
      sc += '", "' + levelIndex + '"'
      this.getemitMultipeListDataForTime(compare, scriptName, sc)
    },
    // 持续时间
    getemitMultipeListDataForTime (compare1, scriptName, sc) {
      // 那持续时间，就改成>3,<2这种用逗号隔开的吧
      let script1 = ''
      let compare = ''
         // return _.data().eventByFilterAndScript("id","'IVV'>1.7", "低级", ">@1,<@2","'IVV'>1.7", "中级", ">=2,<@4");
      // 时间可能不定义，则为空，直接显示开头和结尾的 ""
          for (let item in this.timeTableListData) {
            let data = this.timeTableListData[item]
            // if (this.checkIsNotNull(data.rl)) {
            //   let rl = data.rl === '与' ? '&&' : ' ||'
            //   script += ' ' + rl + ' '
            // }
            for (let dt in data.data) {
              let obj = data.data[dt]
              if ((obj.sv === '' || obj.sv === '请选择') && (obj.pV === undefined || obj.pV === '')) { // 比较函数和值都为空直接退出
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
                  var rl1 = obj.rl === '与' ? ' 并且 ' : ' 或者 '
                  compare += ' ' + rl1 + ' '
                  script1 += ','
                }
                compare += obj.sv + this.getVal(obj.pV)
                script1 += obj.sv + '@' + this.getVal(obj.pV)
              }
            }
          }
        this.ScreeningMethodTable[this.tableCurrentIndex]['compare'] = compare === undefined || compare === '' ? compare1 : compare1 + ' 持续时间:' + compare
        this.ScreeningMethodTable[this.tableCurrentIndex]['script'] = script1 === undefined || script1 === '' ? sc : sc + ', "' + script1 + '"'
        this.ScreeningMethodTable[this.tableCurrentIndex]['scName'] = script1 === undefined || script1 === '' ? scriptName : scriptName + ', "' + script1 + '"'
        this.ScreeningMethodTable[this.tableCurrentIndex]['tData'] = this.timeTableListData // 记录数组回显
        this.ScreeningMethodTable[this.tableCurrentIndex]['lData'] = this.levelTableListData // 记录数组回显
        if (this.formData.checked && this.checkAcTypeData.checked === '1') {
          this.flightModelData[this.flightModel] = this.ScreeningMethodTable
        } else { // 如果选中的是机型，直接赋值给对应机型，没有选中机型的，默认给第一个机型赋值
          this.flightModelData[this.ackTypeData[0]] = this.ScreeningMethodTable
        }
    },
    getVal (v) {
      return v
    },
    // 行单击事件
    rowClick (row, event, column) {
      this.showContent = true
      this.tableCurrentIndex = row.index
      let timeTableListData = this.ScreeningMethodTable[this.tableCurrentIndex]['tData']
      let levelTableListData = this.ScreeningMethodTable[this.tableCurrentIndex]['lData']
      if (timeTableListData && JSON.stringify(timeTableListData) !== '{}') {
        this.timeTableListData = timeTableListData
      } else {
        this.timeTableListData = {'0': {'data': {'0': {'rl': '', 'sv': '>', 'pV': '0'}}}}
      }
      if (levelTableListData && JSON.stringify(levelTableListData) !== '{}') {
        this.levelTableListData = levelTableListData
      } else {
        this.levelTableListData = {'0': {'data': {'0': {'rl': '', 'sv': '请选择', 'pV': ''}}}}
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
    }
  }
}
</script>
