<template>
  <div>
    <el-dialog title="字段信息" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form :model="form">
        <el-form-item label="字段名称" :label-width="formLabelWidth">
          <el-input v-model="form.NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字段频率" :label-width="formLabelWidth">
            <el-col :span="4">
              <el-select v-model="form.FREQUENCY" placeholder="请选择">
                <el-option
                  v-for="item in FREQUENCY_OPTIONS"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="19" :offset="1">
              <el-input v-model="form.FREQUENCY" name="frequency" auto-complete="off"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="字段描述" :label-width="formLabelWidth">
          <el-input v-model="form.DESCRIPTION" name="desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.UNITS" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeAndSubmit" :disabled="!this.$util.dataTableEditAuthority">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="注释" :visible.sync="showDescriptionStatus" @close='closeDialogDes' width="600px">
      <template>
        <el-table
          :data="OPTIONS"
          style="width: 100%;  height: 45vh; overflow: auto;">
          <el-table-column
            prop="OPT_NO"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="OPT_TEXT"
            label="注释">
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <el-dialog title="清洗规则" :visible.sync="ruleDialogShow">
      <div class="clean_rules">
          清洗规则：
          <div class="clean_rules_icon" v-if="this.$util.dataTableEditAuthority">
              <div class="clean_rules_add" @click="AddRule" ></div>
          </div>
      </div>
      <div class="clean_rules_header">
        <div class="header_text">异常情况</div>
        <div class="header_text">清洗规则</div>
        <div style="width:50px;">操作</div>
      </div>
      <div class="clean_rules_content">
        <!--规则列表-->
        <div class="rule_list" v-for="(rule, index) in ruleArr" :key="rule.ID">
          <div class="abnormal_rule bg_purple">
              <el-select v-model="rule.condition" size="mini" :disabled="isCover">
                <el-option v-for="item1 in abnormalOptionCN" :key="item1.ID" :label="item1.VALUE" :value="item1.ID" ></el-option>
              </el-select>
              <el-input v-model="rule.condition_value" size="mini" :disabled="isCover" placeholder="请输入内容"></el-input>
          </div>
          <div class="clean_rule bg_purple">
            <el-select v-model="rule.solution" size="mini" :disabled="isCover" @change="solutionChange(rule, index)">
              <el-option v-for="item2 in cleanRuleOptionCN" :key="item2.ID" :label="item2.VALUE" :value="item2.ID"></el-option>
            </el-select>
            <el-input v-model="rule.solution_value" size="mini" :ref="'ruleInput'+index"
              :disabled="isCover ||rule.solution === '舍弃' ||rule.solution === '标准差修复' || rule.solution === '取前值' || rule.solution === '取后值' || rule.solution === '前后平均值' || rule.solution === 4 || rule.solution === 5 || rule.solution === 7 || rule.solution === 9 || rule.solution === 10" placeholder="请输入值" ></el-input>
          </div>
          <div class="clean_rule_button" @click="removeRule(index)" v-if="hasPerm">
            <div class="rule_delete"></div>
            <!-- <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRule(index)"></el-button> -->
          </div>
        </div>

        <!-- 添加规则 -->
        <!-- <div class="add_rule" v-show="ruleArr.length === 0 || clickAddRule"> -->
<!--        <div class="add_rule" v-show="clickAddRule">-->
<!--          <div class="abnormal_rule bg_purple">-->
<!--              <el-select v-model="conditionText" size="mini" >-->
<!--                <el-option v-for="item3 in abnormalOptionCN" :key="item3.ID" :label="item3.VALUE" :value="item3.ID"></el-option>-->
<!--              </el-select>-->
<!--              <el-input v-model="conditionValueText" size="mini" placeholder="请输入内容" @change="conValAddChange"></el-input>-->
<!--          </div>-->
<!--          <div class="clean_rule bg_purple">-->
<!--            <el-select v-model="solutionText" size="mini" @change="solutionAddChange">-->
<!--              <el-option v-for="item4 in cleanRuleOptionCN" :key="item4.ID" :label="item4.VALUE" :value="item4.ID"></el-option>-->
<!--            </el-select>-->
<!--            <el-input v-model="solutionValueText" size="mini" placeholder="请输入内容" :disabled="solutionText === 4 || solutionText === 5 || solutionText === 10"></el-input>-->
<!--          </div>-->
<!--          <div class="clean_rule_button" @click="clickAddRule = false">-->
<!--            <div class="rule_delete"></div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleRuleDialog">取 消</el-button
        >
        <el-button type="primary" @click="onSubmitCleanRule" :disabled="!this.$util.dataTableEditAuthority">保 存</el-button>
      </div>
    </el-dialog>
    <div class="pos-a w100 h100 df df-fd-c">
      <div class="df df-jc-fe mt10 mr10 mb10">
        <div>
          <el-input placeholder="请输入..." v-model="keyword" size="small" @keyup.enter.native="search">
            <i slot="suffix" class="el-input__icon el-icon-search" style="font-size: 24px;" @click="search"></i>
          </el-input>
        </div>
      </div>
      <div class="df df-f1" style="padding: 0px 10px;">
        <el-table
          :row-style="{height:'38px'}"
          :cell-style="{padding:'0px'}"
          :header-row-style="{height:'38px'}"
          :header-cell-style="{padding:'0px'}"
          :data="detailsData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          height="100%"
          width="100%"
          border
          :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @row-click="showDescription">
          <el-table-column prop="ID" type="selection" width="50px"></el-table-column>
          <el-table-column prop="MODEL_ID" label="版本库" width="90px"></el-table-column>
          <el-table-column prop="NAME_IN_CSV" label="字段名称" width="210px"></el-table-column>
          <el-table-column prop="DESCRIPTION" label="描述"  width="300px"></el-table-column>
          <el-table-column prop="FREQUENCY" label="频率" width="50px"></el-table-column>
          <el-table-column prop="UNITS" label="单位" width="80px"></el-table-column>
          <el-table-column prop="OPTIONS" label="注释">
            <template slot-scope="scope">
              <div v-if="scope.row.OPTIONS && scope.row.OPTIONS.length >= 2">
                {{scope.row.OPTIONS [0].OPT_NO}} - {{scope.row.OPTIONS [0].OPT_TEXT}} <br>
                {{scope.row.OPTIONS [1].OPT_NO}} - {{scope.row.OPTIONS [1].OPT_TEXT}} <br>
              </div>
              <div v-else-if="scope.row.OPTIONS && scope.row.OPTIONS.length === 1">
                {{scope.row.OPTIONS [0].OPT_NO}} - {{scope.row.OPTIONS [0].OPT_TEXT}} <br>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="200px">
            <template slot-scope="scope">
              <el-button size="mini" round @click.native="right_click(scope.row)" v-if="hasPerm">编辑</el-button>
              <el-button size="mini" round @click.native="openRuleDialog(scope.row.ID)">配置清洗规则</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="version-dtails-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 20, 30, 50]"
          :page-size="pagesize"
          layout="sizes, prev, pager, next, total"
          :total="detailsData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCover: false,
      hasPerm: false,
      buttonStatus: false,
      OPTIONS: [],
      hideMenuObj: {},
      disabledMenuObj: {},
      MODEL_ID: '',
      FREQUENCY_OPTIONS: ['1', '2', '4', '6', '8', '10', '16', '32'],
      keyword: '',
      currentPage: 1,
      pagesize: 15,
      detailsData: [],
      selectValue: '',
      multipleSelection: [],
      dialogFormVisible: false,
      showDescriptionStatus: false,
      form: {
        ID: '',
        NAME: '',
        FREQUENCY: '',
        DESCRIPTION: '',
        UNITS: ''
      },
      formLabelWidth: '100px',
      ruleArr: [], // 右侧清洗规则数组
      ruleOptionCN: [], // 规则值中文
      abnormalOptionCN: [], // 异常情况中文
      cleanRuleOptionCN: [], // 清洗规则中文
      ruleDialogShow: false, // 添加行默认隐藏
      conditionText: '', // 默认添加异常下拉框的值
      conditionValueText: '', // 默认添加异常input的值
      solutionText: '', // 默认添加清洗规则下拉框狂的值
      solutionValueText: '', // 默认添加清洗规则inpu的值
      beforeAfterText: '', // 取前值，取后值的input值
      cleanID: '', // 子节点id
      clickAddRule: false,
      timer: null
    }
  },
  props: ['modelID'],
  mounted  () {
    let editPermission = this.$store.state.userInfo.menuList.map(item => {
      return item.ID
    })
    if (editPermission.indexOf('7002') === -1) {
      this.isCover = true
    }
    this.setMenue()
    this.hasPerm = this.$util.dataTableEditAuthority
    this.$nextTick(function () {
      this.MODEL_ID = this.modelID
      this.readData(this.keyword)
    })
    this.$bus.$on('add_showDialog', () => {
      this.showDialog()
    })
    this.$bus.$on('syncModel', () => {
      this.syncModel()
    })
    this.$bus.$on('deleteZiduan', () => {
      this.deleteZiduan()
    })
  },
  destroyed () {
    // this.$bus.$off('add_showDialog' + this.MODEL_ID)
    // this.$bus.$off('syncModel' + this.MODEL_ID)
    // this.$bus.$off('deleteZiduan' + this.MODEL_ID)
  },
  methods: {
    setMenue () {
      let hide = {}
      let disable = {}
      if (this.$util.dataTableEditAuthority) {
        hide['dataTable_version_list_Import'] = false
        hide['dataTable_version_detail_synchronousUpdate'] = true
        hide['dataTable_version_detail_Delete'] = true
        hide['dataTable_version_detail_Add'] = true
        disable['dataTable_version_detail_Add'] = false
        disable['dataTable_version_detail_Delete'] = false
        disable['dataTable_version_detail_synchronousUpdate'] = false
      } else {
        hide['dataTable_version_list_Import'] = false
        hide['dataTable_version_detail_synchronousUpdate'] = true
        hide['dataTable_version_detail_Delete'] = true
        hide['dataTable_version_detail_Add'] = true
        disable['dataTable_version_detail_Add'] = true
        disable['dataTable_version_detail_Delete'] = true
        disable['dataTable_version_detail_synchronousUpdate'] = true
      }
      // this.hideMenuObj = hide
      // this.disabledMenuObj = disable
      this.$bus.$emit('openHeaderMenuItem', 'dataTable_repository', hide, disable) // 修改二级菜单
    },
    showDescription (row, var1, var2) {
      if (row.OPTIONS && row.OPTIONS.length > 0 && (var1.property === 'OPTIONS' || var2.property === 'OPTIONS')) {
        this.showDescriptionStatus = true
        this.OPTIONS = row.OPTIONS
      }
    },
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    initForm () {
      this.form = {
        ID: '',
        NAME: '',
        FREQUENCY: '',
        DESCRIPTION: '',
        UNITS: ''
      }
    },
    showDialog () {
      this.dialogFormVisible = true
    },
    closeDialog () {
      this.dialogFormVisible = false
      this.initForm()
    },
    closeDialogDes () {
      this.showDescriptionStatus = false
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    readData (keyword) { // 获取版本详情
      let that = this
      this.$store.commit('SHOW_LOADING', '拼命加载中！')
      this.$axios({
        url: '/etl/model/' + this.MODEL_ID,
        method: 'get',
        params: {
          keyword: keyword
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          that.detailsData = []
          response.data.forEach(v => {
            if (v['FREQUENCY'] && (v['FREQUENCY'][0] === 'G' || v['FREQUENCY'][0] === 'F')) {
              v['FREQUENCY'] = v['FREQUENCY'].split(':')[1]
            }
            that.detailsData.push(v)
          })
          this.currentPage = 1
        }
      }).catch(response => {
        console.log(response)
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },
    closeAndSubmit () {
      let vc = this
      if (this.form.NAME.length === 0) {
        this.$message.error('请输入名称')
        return false
      }
      if (vc.form.FREQUENCY.length === 0) {
        this.$message.error('请输入频率')
        return false
      }
      let allData = vc.form
      console.log(allData)
      this.$confirm('是否确认操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vc.$axios({
            url: '/etl/model/' + vc.MODEL_ID + '/addNewZiDuan',
            method: 'post',
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            params: allData
        }).then(response => {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            vc.$message(response.data.message)
            vc.readData(vc.keyword)
          }
          vc.initForm()
        })
      }).catch(() => {
          if (vc.form.ID !== '') {
            vc.initForm()
          }
      })
      this.dialogFormVisible = false
    },
    syncModel () {
      this.$confirm('是否执行同步？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/etl/model/' + this.MODEL_ID + '/sync').then(response => {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message({
              message: response.data.message,
              type: 'success'
            })
          }
        })
      })
    },
    deleteZiduan () {
        let delNames = this.multipleSelection.map((item) => {
          console.log(item)
          return item.NAME_IN_CSV
        })
        if (delNames.length === 0) {
          this.$message.error('请选择参数!')
          return false
        } else {
          let vc = this
          let formData = new FormData()
          formData.append('JSON', JSON.stringify(delNames))
          this.$confirm('是否确认删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post('/etl/model/' + this.MODEL_ID + '/del', formData).then(response => {
              if (response.data.status === 'E1001') {
                this.$bus.$emit('logBackInHandle', response.data)
              } else {
                this.$message({
                  message: response.data.message,
                  type: 'success'
                })
                vc.readData(vc.keyword)
              }
            }).catch(() => {
              this.$message.error('删除失败')
            })
          })
        }
    },
    right_click (row) {
        console.log(row)
        this.buttonStatus = true
        this.dialogFormVisible = true
        this.form.ID = row.ID
        this.form.NAME = row.NAME_IN_CSV
        this.form.FREQUENCY = row.FREQUENCY
        this.form.DESCRIPTION = row.DESCRIPTION
        this.form.UNITS = row.UNITS
    },
    getTranslate () {
      if (this.abnormalOptionCN.length <= 1 || this.cleanRuleOptionCN.length <= 1) {
        this.$axios.get('/etl/CandS/AllJson').then(response => {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            let data = response.data
            this.ruleOptionCN = data
            for (var a in data) {
              if (data[a].KEY === 'CONDITION') {
                this.abnormalOptionCN.push(data[a])
              } else if (data[a].KEY === 'SOLUTION') {
                this.cleanRuleOptionCN.push(data[a])
              }
            }
          }
        }).catch(response => {
        })
      }
    },
    // 获取规则数据
    getRules () {
      this.$axios.get('/etl/CandS/ListRole', {params: {GP_ID: this.cleanID}}).then(response => {
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          let data = response.data
          // 重新给condition/solution赋值为中文
          var ruleCnList = this.ruleOptionCN
          var ruleList = data
          this.numberTranslateCn(ruleCnList, ruleList)
          console.log(ruleList)
          this.ruleArr = ruleList
        }
      }).catch(response => {
      })
    },
    // 规则 数字翻译为中文
    numberTranslateCn (ruleCnList, ruleList) {
      for (var i in ruleCnList) {
        for (var k in ruleList) {
          if (ruleCnList[i].ID === ruleList[k].condition) {
            ruleList[k].condition = ruleCnList[i].VALUE
          } else if (ruleCnList[i].ID === ruleList[k].solution) {
            ruleList[k].solution = ruleCnList[i].VALUE
          }
        }
      }
      return ruleList
    },
    // 规则 中文翻译为数字
    cnTranslateNumber (ruleCnList, ruleList) {
      for (var i in ruleCnList) {
        for (var k in ruleList) {
          if (ruleList[k].condition === ruleCnList[i].VALUE) {
            ruleList[k].condition = ruleCnList[i].ID
          } else if (ruleList[k].solution === ruleCnList[i].VALUE) {
            ruleList[k].solution = ruleCnList[i].ID
          }
        }
      }
      return ruleList
    },
    // 清空清洗规则内容
    clearCleanRule () {
      this.ruleArr = []
      this.abnormalOptionCN = []
      this.cleanRuleOptionCN = []
    },
    // 清空添加规则内容
    clearRowRule () {
      this.conditionText = ''
      this.solutionText = ''
      this.conditionValueText = ''
      this.solutionValueText = ''
    },
    // 删除规则
    removeRule (index) {
      this.ruleArr.splice(index, 1)
    },
    conValAddChange (val) {
      this.conditionValueText = this.conditionValueText.toUpperCase()
    },
    solutionAddChange (val) {
      if (val === 4 || val === 5 || val === 10) {
        this.solutionValueText = ''
      }
    },
    solutionChange (rule, index) {
      if (rule.solution === 4 || rule.solution === 5 || rule.solution === 10) {
         rule.solution_value = ''
      }
    },
    openRuleDialog (id) {
      this.buttonStatus = true
      this.cleanID = id
      this.getTranslate() // 清洗规则中文翻译
      this.getRules()
      this.ruleDialogShow = true
    },
    onSubmitCleanRule () {
      if (this.clickAddRule) {
        var addObj = {
          ID: '',
          gp_id: this.gpId,
          condition: this.conditionText,
          solution: this.solutionText,
          condition_value: this.conditionValueText,
          solution_value: this.solutionValueText
        }
        // 校验添加功能的类型
        if (!this.$util.isDefine(this.conditionText) || !this.$util.isDefine(this.solutionText)) {
          this.$message({
            title: '新增数据警告',
            type: 'warning',
            message: '请选择类型'
          })
          return false
        }
        // 校验添加功能的异常情况--input
        if (this.conditionText === 0 || this.conditionText === '值类型') {
          if (!(this.conditionValueText === 'NUMBER' || this.conditionValueText === 'STRING')) {
            this.$message({
              title: '新增异常情况数据警告',
              message: '类型为值类型，则值只能为：NUMBER或STRING',
              type: 'warning'
            })
            return false
          }
        } else {
          var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
          if (!this.conditionValueText || new RegExp(reg).test(this.conditionValueText) === false) { // 非数字
            this.$message({
              title: '新增异常情况数据警告',
              message: '请输入正确的数字',
              type: 'warning'
            })
            return false
          }
        }
        if (this.solutionText === 10 || this.solutionText === '前后平均' || this.solutionText === 7 || this.solutionText === 9 ||
            this.solutionText === 4 || this.solutionText === 5) {
        } else {
          // 校验清洗规则--input
          if (this.conditionText) {
            var reg2 = /^[0-9]+([.]{1}[0-9]+){0,1}$/
            if (!this.solutionValueText || new RegExp(reg2).test(this.solutionValueText) === false) { // 非数字
              this.$message({
                title: '新增清洗规则数据警告',
                message: '请输入正确的数字',
                type: 'warning'
              })
              return false
            }
          }
        }
        this.ruleArr.push(addObj)
      }

      var ruleList = this.ruleArr
      var ruleCnList = this.ruleOptionCN
      this.cnTranslateNumber(ruleCnList, ruleList) // 中文转数字
      // 校验list
      console.log(this.ruleList)
      for (let item of ruleList) {
        let con = item.condition
        let sol = item.solution
        if (!this.$util.isDefine(con) || !this.$util.isDefine(sol)) {
          this.$message({
            title: '修改数据警告',
            type: 'warning',
            message: '请选择类型'
          })
          return false
        }
        if (!this.validConChange(item)) return false
        if (!this.validSolutionValue(item)) return false
      }
      console.log(this.ruleList)
      var paramStr = JSON.stringify(ruleList)
      let formData = new FormData()
      formData.append('GP_ID', this.cleanID)
      formData.append('data', paramStr)
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.post('/etl/CandS/EditRole', formData).then((response) => {
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          var data = response.data
          if (data.result === 1) {
            this.$message({
              message: '数据保存成功',
              type: 'success'
            })
            this.clearRowRule()
            this.clearCleanRule()
            this.getTranslate()
            this.getRules()
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
          }
          this.clearRowRule()
          this.clearCleanRule()
          this.clickAddRule = false
          // this.cleanRuleOptionCN()
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据保存失败')
        this.clearRowRule()
        this.clearCleanRule()
        this.clickAddRule = false
        // this.cleanRuleOptionCN()
      })
    },
    validConChange (rule) {
      var valid = true
      var conVal = rule.condition_value
      if (rule.condition === 0) { // 值类型
        if (!(conVal === 'NUMBER' || conVal === 'STRING')) { // 错误
          this.$message({
            title: '修改数据警告',
            message: '类型为值类型，则值只能为：NUMBER或STRING',
            type: 'warning'
          })
          valid = false
        }
      } else {
        if (!this.validInputValue(conVal)) valid = false
      }
      return valid
    },
    // 校验清洗规则  取值类型的input
    validSolutionValue (rule) {
      var valid = true
      if (rule.solution === 3) {
        var val = rule.solution_value
        var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
        if (!val || new RegExp(reg).test(val) === false) { // 非数字
          this.$message({
            title: '修改数据警告',
            message: '请输入正确的数字',
            type: 'warning'
          })
          valid = false
        }
      }
      return valid
    },
    // 校验异常情况input
    validInputValue (val) {
      var valid = true
      var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      if (!val || new RegExp(reg).test(val) === false) { // 非数字
        this.$message({
          title: '修改数据警告',
          message: '请输入正确的数字',
          type: 'warning'
        })
        valid = false
      }
      return valid
    },
    // 点击一下新增有行，每一行都是新的一个对象
    AddRule () {
      let obj = {
        'ID': '',
        'gp_id': '',
        'condition': '',
        'solution': '',
        'condition_value': '',
        'solution_value': ''
      }
      this.ruleArr.push(obj)
    },
    cancleRuleDialog () {
      this.ruleDialogShow = false
      this.clickAddRule = false
      this.clearRowRule()
      this.clearCleanRule()
    },
    search () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.readData(this.keyword)
      }, 300)
    }
  },
  computed: {
    // ...mapState(['showLoading'])
  },
  watch: {
  }
}
</script>
<style scoped>
.version-dtails-pagination {
    position: relative;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
}

.clean_rules {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}

.clean_rules_icon {
  display: flex;
  flex-direction: row;
}

.clean_rules_add {
  background-image: url(../../../../assets/images/icon91.png);
  background-size: cover;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
}

.rule_delete {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  background-image: url(../../../../assets/images/icon71.png);
  background-size: cover;
  cursor: pointer;
}

.clean_rules_devare {
  background-image: url(../../../../assets/images/icon75.png);
  background-size: cover;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.clean_rules_header {
  display:flex;
  flex-direction:row;
  height: 35px;
  line-height: 35px;
  margin-top: 10px;
  padding-left: 10px;
  border: 1px solid #ebeef5;
}

.header_text {
  width: 50%;
}

.clean_rules_content{
  height: 45vh;
  overflow: auto;
}

.rule_list, .add_rule {
  display: flex;
  flex-direction: row;
  border: 1px solid #ebeef5;
  height: 35px;
  line-height: 35px;
}

.clean_rule_button {
  width: 30px;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  padding: 3px 0px;
}

.bg_purple {
  width: 50%;
  padding: 0px 1px;
  display: flex;
  flex-direction: row;
}
</style>
