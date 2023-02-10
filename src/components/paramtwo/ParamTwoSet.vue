<template>
  <div class="tempDeom">
    <el-row class="mt10 ml10">
      <el-button plain @click="changeParameterName('AAAAA')">AAAAA</el-button>
      <el-button type="primary" plain @click="changeParameterName('BBBBB')">BBBBB</el-button>
      <el-button type="success" plain @click="changeParameterName('CCCCC')">CCCCC</el-button>
      <el-button type="info" plain @click="changeParameterName('DDDDD')">DDDDD</el-button>
      <el-button type="warning" plain @click="changeParameterName('EEEEE')">EEEEE</el-button>
      <el-button type="danger" plain @click="changeParameterName('FFFFF')">FFFFF</el-button>
      <el-button type="primary" plain @click="addRelation()">增加关系</el-button>
      <el-button type="primary" @click="saveTableData()">保存关系数据</el-button>
    </el-row>
    <div class="table-content">
      <div class="df df-fd-c table-content-item"
          v-for="(tableItem, index) in tableListData" :key="index">
        <div class="df df-fd-r df-jc-sa df-ai-c w15">
          <el-row>
            <el-button
              type="primary"
              circle
              v-show="tableItem.relation !== '' && tableItem.relation === '与'"
              @click="changeRelation(index, '', '或')">与</el-button>
            <el-button
              type="warning"
              circle
              v-show="tableItem.relation !== '' && tableItem.relation === '或'"
              @click="changeRelation(index, '', '与')">或</el-button>
          </el-row>
          <el-button type="primary" plain @click="delTableValueItem(index, '')" v-show="index !== 0">删除</el-button>
        </div>
        <div class="table-item df df-fd-c">
          <div class="table-title df df-fd-r df-jc-c df-ai-c pb10 pt10">
            <div class="tx-c w10">条件关系</div>
            <div class="tx-c w25">参数名</div>
            <div class="tx-c w25">函数关系</div>
            <div class="tx-c w25">值</div>
            <div class="tx-c w15">操作</div>
          </div>
          <div class="table-value-list df df-fd-c">
            <div class="table-value-item df df-fd-r df-jc-sa df-ai-c mb10"
              v-for="(tableValueItem, tvi) in tableItem['data']" :key="tvi">
              <el-row class="w10">
                <el-button
                  type="primary"
                  circle
                  v-show="tableValueItem.relation !== '' && tableValueItem.relation === '与'"
                  @click="changeRelation(index, tvi, '或')">与</el-button>
                <el-button
                  type="warning"
                  circle
                  v-show="tableValueItem.relation !== '' && tableValueItem.relation === '或'"
                  @click="changeRelation(index, tvi, '与')">或</el-button>
              </el-row>
              <el-input
                placeholder="请输入内容"
                style="width: 200px;"
                :value="tableValueItem.parameterName"
                v-model="tableValueItem.parameterName"
                @focus="focusParameterName(index, tvi)" class="w25">
              </el-input>
              <el-select v-model="tableValueItem.selectValue" placeholder="请选择"  class="w25">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input
                placeholder="请输入内容"
                style="width: 200px;"
                :value="tableValueItem.parameterValue"
                v-model="tableValueItem.parameterValue" class="w25">
              </el-input>
              <el-row v-show="!tableItem['data'][parseInt(tvi)+1]" class="w15 df df-fd-r df-jc-c df-ai-c">
                <el-button type="primary" plain @click="addTableValueItem(index, tvi)">增加</el-button>
                <el-button type="primary" plain @click="delTableValueItem(index, tvi)" v-show="tvi !== 0">删除</el-button>
              </el-row>
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
      options: [ // 默认函数关系值
        {value: '=', label: '='},
        {value: '>', label: '>'},
        {value: '<', label: '<'},
        {value: '!=', label: '!='},
        {value: '>=', label: '>='},
        {value: '<=', label: '<='}
      ],
      currentInputTableIndex: '', // 临时存储当前点击参数名input框处于哪个表格索引
      currentInputRowIndex: '', // 临时存储当前点击参数名input框处于表格中的行索引
      tableListData: {} // 临时存储当前所有表关系数据
    }
  },
  methods: {
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
      console.log(index, tvi)
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
      console.log(index, tvi)
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
      console.log(index, tvi, type)
      if (tvi !== '') { // 修改表格中行之间的关系
        this.$set(this.tableListData[index]['data'][tvi], 'relation', type)
      } else { // 修改表格之间的关系
        this.$set(this.tableListData[index], 'relation', type)
      }
    },
    focusParameterName (index, tvi) { // 获取点击参数的位置
      console.log(index, tvi)
      this.currentInputTableIndex = index
      this.currentInputRowIndex = tvi
    },
    changeParameterName (val) { // 修改点击参数名字的值
      console.log(val)
      this.$set(this.tableListData[this.currentInputTableIndex]['data'][this.currentInputRowIndex], 'parameterName', val)
    },
    saveTableData () {
      console.log(JSON.stringify(this.tableListData))
    }
  }
}
</script>
<style scoped>
.tx-c {
  text-align: center;
}
.table-item {
  border: 1px solid #cdcdcd;
  padding: 5px;
  margin: 10px;
}
.tempDeom {
  overflow: auto;
}
.gx {
  width: 10%;
  height: 40px;
  line-height: 40px;
  color: #409EFF;
  background: #ecf5ff;
}
.w10 {
  width: 10%;
}
.w15 {
  width: 15%;
}
.w25 {
  width: 25%;
}
.table-content-item {
  margin-top: 20px;
  border-bottom: 1px solid #000000;
}
</style>
