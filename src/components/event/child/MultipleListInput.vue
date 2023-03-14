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
  <div style="width: 100%;height: 99%;">
    <div v-for="(tableItem, index) in tableListData" :key="index">
      <div class="table-ligc">
        <div class="tr-ligc">
          <div class="td-ligc" style="width: 20%;text-align: center">
            {{ labelTitle }}
          </div>
          <div class="td-ligc" style="width: 33%;text-align: center">
            比较
          </div>
          <div class="td-ligc" style="width: 46%;text-align: center;border-right: 0px;">
            值
          </div>
        </div>
        <div v-for="(tableValueItem, tvi) in tableItem['data']" :key="tvi">
          <div class="tr-ligc">
            <div class="td-ligc" style="width: 20%;text-align: center">
              <el-button
                type="primary"
                circle
                size="mini"
                @click="changeRelation(index, tvi, '或')"
                v-show="tableValueItem.rl !== '' && tableValueItem.rl === '与'" >与
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
            <div class="td-ligc" style="width: 33%;">
              <el-select v-model="tableValueItem.sv" placeholder="请选择" style="width: 80%;margin-left: 10%" size="mini" v-if="isCurrentUser && !isLinkParam" clearable>
                <el-option
                  v-for="item in levelOptioins"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="tableValueItem.sv" placeholder="请选择" style="width: 80%;margin-left: 10%"  size="mini"  disabled="disabled"  v-else clearable >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="td-ligc" style="width: 45%;border-right: 0px;">
              <el-input
               :readonly="!isCurrentUser || isLinkParam"
                placeholder="请输入内容"
               @blur="bllur(tableValueItem.pV)"
                style="width: auto;margin-left: 5px" size="mini"
                :value="tableValueItem.pV"
                v-model="tableValueItem.pV">
              </el-input>
            </div>
          </div>
          <div style="width: 100%;clear: both;" v-show="!tableItem['data'][parseInt(tvi)+1]" >
            <div class="tr-ligc"   v-show="isCurrentUser && !isLinkParam" style="padding-left: 10px;">
              <el-button type="primary" plain @click="addTableValueItem(index, tvi)" size="mini">增加</el-button>
              <el-button type="primary" plain @click="delTableValueItem(index, tvi)" v-show="index > 0 || tvi >0" size="mini">删除 </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addBtn: false,
      tableCurrentIndex: 0,
      showContent: false,
      screeningData: {
        levelCompare: '',
        levelValue: '',
        timeCompare: '',
        timelevelValue: ''
      },
      levelOptioins: [{'value': '>', 'label': '>'}, {'value': '>=', 'label': '>='}, {'value': '=', 'label': '='}, {'value': '<', 'label': '<'}, {'value': '<=', 'label': '<='}],
      tableListData: {'0': {'data': {'0': {'rl': '', 'sv': '请选择', 'pV': ''}}}},
      url: '',
      params: {},
      urlFlag: '',
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '', // 子节点id
      parentId: '-1', // 默认父节点id
      treeType: ''
    }
  },
  props: ['labelTitle', 'isLinkParam', 'isCurrentUser', 'dataTable'],
  watch: {
    dataTable () {
      this.tableListData = this.dataTable
      console.log(this.tableListData)
    }
  },
  mounted () {
    // console.log(this.dataTable)
    this.tableListData = this.dataTable
    console.log(this.tableListData)
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
    // checkTimePoint () {
    //   this.$emit('treeType1', 'shaixuanway')
    // },
    // // 点击工程参数输入框
    // checkColumnName () {
    //   this.$emit('treeType1', 'gongchengparam')
    // },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex
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
      this.addBtn = true
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
