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
  <div style="width: 100%;height: 100%; overflow-y: auto;overflow-x: hidden;">
    <div style="width: 90%;margin: auto;">
      <div v-for="(tableItem, index) in tableListData" :key="index">
        <div style="width: 100%;padding-left: 23px;margin-top: 5px;">
          <el-button
            type="primary"
            size="mini"
            circle
            v-show="tableItem.relation !== '' && tableItem.relation === '与'"
            @click="changeRelation(index, '', '或')" v-if="!isLinkParam && isCurrentUser">与
          </el-button>
          <el-button
            type="primary"
            size="mini"
            circle
            v-show="tableItem.relation !== '' && tableItem.relation === '与'"
            @click="changeRelation(index, '', '或')"  disabled="disabled"  v-else>与
          </el-button>
          <el-button
            type="warning"
            size="mini"
            circle
            v-show="tableItem.relation !== '' && tableItem.relation === '或'"
            @click="changeRelation(index, '', '与')" v-if="!isLinkParam && isCurrentUser">或
          </el-button>
          <el-button
            type="warning"
            size="mini"
            circle
            v-show="tableItem.relation !== '' && tableItem.relation === '或'"
            @click="changeRelation(index, '', '与')"  disabled="disabled"  v-else>或
          </el-button>
        </div>
        <div class="table-ligc">
          <div class="tr-ligc">
            <div class="td-ligc" style="width: 38.4%;text-align: center">
              参数名
            </div>
            <div class="td-ligc" style="width: 23%;text-align: center">
              函数关系
            </div>
            <div class="td-ligc" style="width: 38%;text-align: center;border-right: 0px;">
              值
            </div>
          </div>
          <div v-for="(tableValueItem, tvi) in tableItem['data']" :key="tvi">
            <div class="tr-ligc">
              <div class="td-ligc" style="width: 38.4%">
                <el-input
                  size="mini"
                  readonly="readonly"
                  placeholder="请选择内容"
                  style="width: 80%;float: right"
                  :value="tableValueItem.parameterName"
                  v-model="tableValueItem.parameterName"
                  @focus="focusParameterName(index, tvi)">
                </el-input>
                <div style="width: 10%;float: right;margin-right: 10px;">
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
              </div>
              <div class="td-ligc" style="width: 23%">
                <el-select v-model="tableValueItem.selectValue" placeholder="请选择" style="width: 100%;" size="mini" v-if="isCurrentUser && !isLinkParam" clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="tableValueItem.selectValue" placeholder="请选择" style="width: 100%;" size="mini"  disabled="disabled"  v-else clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="td-ligc" style="width: 38%;border-right: 0px;">
                <el-input
                  v-if="isCurrentUser && !isLinkParam"
                  placeholder="请输入内容"
                  style="width: 100%;" size="mini"
                  :value="tableValueItem.parameterValue"
                  v-model="tableValueItem.parameterValue">
                </el-input>
                <el-input
                  v-else
                  readonly="readonly"
                  placeholder="请输入内容"
                  style="width: 100%;" size="mini"
                  :value="tableValueItem.parameterValue"
                  v-model="tableValueItem.parameterValue">
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
    </div>
    <div style="width: 90%;margin:25px 0px auto 6.4%" v-show="isCurrentUser && !isLinkParam">
      <el-button type="primary" plain @click="addRelation()" size="mini">增加逻辑关系</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableListData: {'0': {'data': {
              '0': {'relation': '', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': ''},
              '1': { 'relation': '与', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': '' } },
              'relation': ''}
            },
        currentInputTableIndex: 0,
        currentInputRowIndex: 0
      }
    },
    watch: {
    },
    props: ['isLinkParam', 'isCurrentUser', 'options', 'scriptId', 'tableListEditData'], // 编辑时传的值，因为组件还未初始化，无法通过this.$refs给子组件赋值，所以只能通过父传子的方式赋值
    mounted () {
      this.setEditValue()
    },
    methods: {
      // 设置默认值
      setEditValue () {
        if (this.tableListEditData !== undefined && this.tableListEditData !== 'undefined' && JSON.stringify(this.tableListEditData) !== 'undefined' && JSON.stringify(this.tableListEditData) !== '{}') {
          this.tableListData = this.tableListEditData
        } else {
          this.tableListData = {'0': {'data': {
                '0': {'relation': '', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': ''},
                '1': { 'relation': '与', 'parameterName': '', 'selectValue': '请选择', 'parameterValue': '' } },
              'relation': ''}
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

<style scoped>

</style>
