<style scoped>
  .library-new-top{
    width: 100%;
    height: 90%;
  }
  .library-new-bottom{
    padding-top: 8px;
    width: 100%;
    height: 10%;
    border-top: solid 1px #DDDDDD;
    padding-right: 15%;
  }
  .library-new-left{
    width: 75%;
    float: left;
    /* height: 98%; */
    height: 100%;
    padding: 0px 5px;
  }
  .library-new-right{
    width: 24%;
    float: left;
    height: 100%;
    border-left: solid 1px #DDDDDD;
  }
  .point-ylgx{
    margin-top: 20px;
    width: 90%;
  }
  .param-two-time-point {
    /* position: absolute; */
    height: 100%;
    width: 100%;
  }
  /* 左侧 */
  .param-two-time-point-left {
    width: 35%;
    float: left;
    height: 100%;
  }
  .param-two-time-point-right{
    width: 63%;
    float: left;
    height: 100%;
    border-left: solid 1px #DDDDDD;
    overflow-y:auto;
  }
  .left_tree {
    overflow: auto;
    height: 93%;
    min-height: 350px;
    overflow-y: auto;
    border: 1px solid #ebeef5;
  }

  .left_tree::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }

  .left_tree::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #cccccc;
  }

  .left_filter {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #ebeef5;
    height: 7%;
  }

  .left_filter_search {
    background-image: url(../../assets/images/icon66_1.png);
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .left_filter_refresh {
    background-image: url(../../assets/images/icon67.png);
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .el-button.is-circle {
    border-radius: 50%;
    padding: 4px;
  }
  .el-button+.el-button {
    margin-left: 0px;
  }
  .table-ligc{
    border-right: solid 1px #DDDDDD;
    width: 650px;height: auto; border-top: solid 1px #DDDDDD;  border-left: solid 1px #DDDDDD; margin-top: 20px;margin-left: 10px;border-bottom: solid 1px #dddddd;
  }
  .tr-ligc{
    height: 40px; width: 100%;
  }
  .td-ligc{
    border-bottom: solid 1px #DDDDDD;border-right: solid 1px #DDDDDD;width: auto;height: 100%;float: left; line-height: 35px;
  }
  .script_left {
    float:left;
    width: 35%;
    height: 100%;
  }
  .script_edit {
    float:left;
    width: 65%;
    height: 100%;
  }
  #ifid {
    /* height: calc(100% - 32px); */
    height: 100%;
  }

  #iframeOrgChart {
    width: calc(100% - 1px);
    height: calc(100% - 80px);
  }
  .right_shade {
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity:.5;
    background:#000;
    z-index: 99;
  }

  .right_content {
    position: fixed;
    left: 1%;
    top: 10%;
    width: 98%;
    height: 80%;
    background:white;
    z-index: 105;
  }
</style>
<template>
  <div style="height: 100%;" v-loading="LogicValueloadding">
    <!-- 新建分析参数算法之逻辑值 -->
    <div class="library-new-top">
      <div class="library-new-left">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%;">
          <!--  <el-tab-pane label="  ① 工程参数" name="setOneParam" style="height: 100%;">
              <LibraryMeasureOneParam :formAlign="formLabelAlign" :fmData="formData"></LibraryMeasureOneParam>
            </el-tab-pane>-->
            <div v-show="childCreatorList !==null && childCreatorList.length > 0"
                 style="width: 100%;height: 93%;clear: left; float: left; position: relative; left:40%; top: 15%;">
                <span v-if="childCreatorList.length > 0">
                <el-radio-group v-model="showRadio">
                 <el-form v-for="item in childCreatorList" :key="item.ID" label-width="20%" size="mini"
                          style="margin-top: 50px;">
                  <el-form-item>
                    <el-radio :label="item.ID" @change="radioCheckChange(item.ID,item.NAME)">{{item.NAME}}</el-radio>
                  </el-form-item>
                 </el-form>
                </el-radio-group>
            </span>
            </div>
            <span v-show="childCreatorList ===null || childCreatorList.length === 0">
               <span v-if="creatorId === '12' || creatorId === 12">
                <!--- creatorId = 12 表示显示多个度量值判断 -->
                 <div class="param-two-time-point">
                  <div class="param-two-time-point-left" v-loading="saveLoadding">
                    <!-- 过滤节点 -->
                    <div class="left_filter" v-show="searchShow">
                      <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
                      </el-input>
                    </div>
                    <!-- 树 -->
                    <div class="left_tree df-f1" v-loading="treeLoading">
                      <el-tree :data="fileNewTreeArr"  node-key="id" :props="defaultTreeProps" highlight-current
                                @node-click="handleNodeClick"
                                ref="tree" :filter-node-method="filterNode">
                      </el-tree>
                    </div>
                  </div>
                  <div class="param-two-time-point-right">
                          <div style="width: 90%;margin: auto">
                             <div  v-for="(tableItem, index) in tableListData" :key="index">
                                <div style="width: 100%;padding-left: 28px;margin-top: 15px;">
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    circle
                                    v-show="tableItem.relation !== '' && tableItem.relation === '与'"
                                    @click="changeRelation(index, '', '或')">与</el-button>
                                  <el-button
                                    type="warning"
                                    size="mini"
                                    circle
                                    v-show="tableItem.relation !== '' && tableItem.relation === '或'"
                                    @click="changeRelation(index, '', '与')">或</el-button>
                                </div>
                                <div class="table-ligc">
                                  <div class="tr-ligc">
                                    <div class="td-ligc" style="width: 39.54%">
                                      参数名
                                    </div>
                                    <div class="td-ligc" style="width: 30%">
                                      函数关系
                                    </div>
                                    <div class="td-ligc" style="width: 30%">
                                      值
                                    </div>
                                  </div>
                                  <div v-for="(tableValueItem, tvi) in tableItem['data']" :key="tvi">
                                    <div class="tr-ligc">
                                      <div class="td-ligc" style="width: 39.54%">
                                        <el-input
                                          size="mini"
                                          placeholder="请输入内容"
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
                                            @click="changeRelation(index, tvi, '或')">与</el-button>
                                          <el-button
                                            type="warning"
                                            circle
                                            size="mini"
                                            v-show="tableValueItem.relation !== '' && tableValueItem.relation === '或'"
                                            @click="changeRelation(index, tvi, '与')">或</el-button>
                                        </div>
                                      </div>
                                      <div class="td-ligc" style="width: 30%">
                                        <el-select v-model="tableValueItem.selectValue" placeholder="请选择" style="width: 100%;" size="mini">
                                          <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                          </el-option>
                                        </el-select>
                                      </div>
                                      <div class="td-ligc" style="width: 30%">
                                        <el-input
                                          placeholder="请输入内容"
                                          style="width: 100%;"     size="mini"
                                          :value="tableValueItem.parameterValue"
                                          v-model="tableValueItem.parameterValue">
                                        </el-input>
                                      </div>
                                    </div>
                                    <div style="width: 100%;clear: both;" v-show="!tableItem['data'][parseInt(tvi)+1]">
                                      <div class="tr-ligc" style="margin-top: 15px;">
                                        <el-button type="primary" plain @click="addTableValueItem(index, tvi)"     size="mini">增加</el-button>
                                        <el-button type="primary" plain @click="delTableValueItem(index, tvi)" v-show="index > 0 || tvi >0"    size="mini">删除</el-button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style="width: 100%;    padding-left: 10px;" >
                                  <el-button type="primary" plain @click="delTableValueItem(index, '')" v-show="index > 0">删除表格</el-button>
                                </div>
                              </div>
                          </div>
                          <div style="width: 90%;margin:25px 0px auto 6.4%">
                              <el-button type="primary" plain @click="addRelation()" size="mini">增加逻辑关系</el-button>
                          </div>
                        </div>
                  </div>
               </span>
                <span v-else-if="creatorId === '13' || creatorId === 13">
                  <div class="script_left" >
                    <ParamTwoLeft v-on:listenToChildEvent="showMsgFromChild"></ParamTwoLeft>
                  </div>
                  <div class="script_edit">
                    <iframe id="ifid" ref="iframe" src="/dsap/static/groovyIDE/index2.html" width="100%"></iframe>
                  </div>
               </span>
            </span>
        </el-tabs>
      </div>
      <div class="library-new-right">
        <el-tabs v-model="rightTabActive" class="tab-profile">
          <el-tab-pane label=" 属性" name="rightShuxing">
            <div class="point-ylgx">
              <el-form label-width="80px" :model="formLabelAlign" size="small">
                <el-form-item label="名称：">
                  <el-input v-model="formLabelAlign.twoDimensionName"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                  <el-input type="textarea" v-model="formLabelAlign.twoDimensionDescription"
                            :autosize="{ minRows: 3,rows:6, maxRows: 8}"></el-input>
                </el-form-item>
                <!-- <el-form-item label="说明：">
                  <el-input type="textarea" v-model="attrExplain" :autosize="{ minRows: 3,rows:6, maxRows: 8}"></el-input>
                </el-form-item> -->
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label=" 依赖关系" name="ylgx">
            <div style="margin-top: 15px;text-align: center">
              <el-collapse  v-model="activeName"  v-for="(item, index) in relyonArr" :key="item.id" @change="panelChangeTwo(item, index)">
                <el-collapse-item :title="index" :name="index">
                  <div v-show="errorShow" class="collapse_content" :ref="'collapse_content' + index"></div>
                  <div class="flight_no" :ref="'flight_no' + index"></div>
                </el-collapse-item>
              </el-collapse>
              <div v-show="rightShow">
                <div class="right_shade"></div>
                <div class="right_content">

                  <iframe id="iframeOrgChart" frameborder="no" border="0" ref="iframeOrgChart" src="/dsap/static/orgChart/color-coded/org_chart.html" ></iframe>
                  <el-button @click="closePopup" style="float:right;margin:10px 26px 0px 0px;">关闭</el-button>
                </div>
              </div>            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="library-new-bottom">
      <div v-show="explainShow" class="left_description" style="width:35%; float:left;height:10%;">
        <span>说明：</span>
        <span class="descri" ref="descri_text"></span>
      </div>
      <div class="sx_button" style="width: 90%;height:10%;">
        <el-button type="primary" style="float: left;margin-left:55%;" :disabled="disablePrevious" @click="previousClick">上一步</el-button>
        <el-button type="primary" style="float: left;margin-left:1%;" :disabled="childCreatorList ===null || childCreatorList === undefined || childCreatorList.length === 0"  @click="nextClick">下一步 </el-button>
        <el-button type="primary" style="float: left;margin-left:1%;" v-show="showTestBtn "  @click="onTest">测 试</el-button>
        <el-button type="primary" style="float: left;margin-left:1%; " v-show="showSaveBtn"  @click="onSubmit">保 存</el-button>
        <el-dialog
          title="PROFILE内容"
          :visible.sync="dialogVisible"
          width="400px">
          <el-select v-model="profileValue" placeholder="请选择" clearable @change="profileChange">
            <el-option
              v-for="item in profileData"
              :key="item.ID"
              :label="item.PROFILE_NAME"
              :value="item.ID">
            </el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="testScript">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
function checkEditor (vue, val) {
  if (vue && vue.$refs && vue.$refs.iframe && vue.$refs.iframe.contentWindow && vue.$refs.iframe.contentWindow.insertMethod) {
    vue.$refs.iframe.contentWindow.insertMethod(val)
    vue.$refs.iframe.contentWindow.setFuncType('2')
  } else {
    setTimeout(function () {
      checkEditor(vue, val)
    }, 500)
  }
}

const ParamTwoLeft = () => import('components/paramtwo/ParamTwoLeft')

export default {
  data () {
    return {
      relyonArr: [],
      errorShow: false,
      rightShow: false,
      options: [{
        value: '==',
        label: '=='
      }, {
        value: '>',
        label: '>'
      }, {
        value: '<',
        label: '<'
      }, {
        value: '!=',
        label: '!='
      }, {value: '>=',
        label: '>='
      }, {value: '<=',
        label: '<='
      }],
      scriptId: '',
      showTestBtn: false,
      LogicValueloadding: true,
      saveLoadding: false,
      disablePrevious: true, // 禁用 上一步
      showSaveBtn: false,
      saveStepsJson: {},
      showRadio: '', // 默认不选中
      creatorId: '', // 节点id
      arrCreatorId: [], // 存储点击过的节点id，
      scriptTypes: [], // 存储 父节点id 根节点为scriptType的值
      stepTitle: '逻辑值',
      childCreatorList: [], // 子菜单集合
      showMenueItem: true, // 默认显示选项
      showContentPage: false, // 默认不显示 内容
      // scriptType: '3', //  根节点id（分析函数的菜单 type）
      activeName: 'logicaValue',
      rightTabActive: 'rightShuxing',
      tag: '', // 1 工程参数 2 公式  修改的时候要根据这个选中radio
      formLabelAlign: {
        twoDimensionName: '',
        twoDimensionDescription: ''
      },
      treeLoading: false,
      fileNewTreeArr: [], // 左侧树状数据
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      userId: '1',
      iconMoreShow: false, // 自定义节点图标
      iconOtherShow: false, // 自定义节点图标
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '', // 子节点id
      parentId: '-1', // 默认父节点id
      tabProfileName: '', // tab的name
      tabProfileLabel: '', // tab 的label
      tableLoading: false,
      profileObj: [],
      typeMap: {
        'timePoint': '1', // 时间点
        'measuredValue': '3', // 测量值 3
        'logicalValue': '4', // 逻辑值5
        'operation': '5' // 事件
      },
      // 根据返回的 type 显示默认图标用
      typeMapById: {
        '1': 'timePoint',
        '3': 'measuredValue',
        '4': 'logicalValue',
        '5': 'operation'
      },
      currentInputTableIndex: '', // 临时存储当前点击参数名input框处于哪个表格索引
      currentInputRowIndex: '', // 临时存储当前点击参数名input框处于表格中的行索引
      tableListData: {}, // 临时存储当前所有表关系数据
      dialogVisible: false, // profile默认不显示弹出框
      profileValue: '', // profile默认值
      profileSelectValue: '', // profile选中值
      pageLoad: false,
      profileData: [], // profile数组
      attrExplain: '', // 说明--工程参数
      explainShow: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  components: {
    ParamTwoLeft
  },
  props: ['sid', 'scriptType'],
  mounted () {
    this.scriptTypes.push(this.scriptType)
    this.getChildCreatorByScriptType(this.scriptType) // 查询 子节点菜单
  },
  methods: {

    // 查询子节点
    getChildCreatorByScriptType (creatorId) {
      this.$axios.get('/apm/getChildCreator', {params: {id: creatorId}}).then(response => {
        if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.childCreatorList = []
          this.childCreatorList = response.data
          if (this.childCreatorList.length > 0) {
            this.showSaveBtn = false
          } else {
            this.showSaveBtn = true
          }
          // 修改时查询
          if (this.sid !== null && this.sid !== undefined && this.sid !== '') {
            this.scriptId = this.sid
            this.getTwoDimensionScriptById()
          } else {
            this.checkedRadio()
          }
          this.LogicValueloadding = false
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
        this.treeLoading = false
      })
    },
    // 选中 radio
    checkedRadio () {
      if (this.arrCreatorId !== null && this.arrCreatorId !== undefined && this.arrCreatorId.length > 0) {
        for (var i = 0; i < this.childCreatorList.length; i++) {
          var item = this.childCreatorList[i]
          for (var j = 0; j < this.arrCreatorId.length; j++) {
            var itme1 = this.arrCreatorId[j]
            if (itme1.ID === item.ID) {
              this.creatorId = item.ID
              this.showRadio = this.creatorId * 1
              this.arrCreatorId.splice(j, 1)
            }
          }
        }
      }
    },
    // 根据scriptID查询详情
    getTwoDimensionScriptById () {
      this.$axios.get('/apm/getTwoDimensionScriptById', {params: {id: this.scriptId}}).then(response => {
        var data = response.data
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.scriptId = data.id
          this.formLabelAlign.twoDimensionName = data.name
          if (data.createSteps !== null && data.createSteps !== undefined && data.createSteps !== '') {
            var json = JSON.parse(data.createSteps) // 解析返回的 steps json
            this.setVal(data, json)
          }
        }
      }).catch(response => {
        this.$message.error('数据加载失败!')
      })
    },
    setVal (data, json) {
      // this.scriptTypes = json.scriptTypes // 取出 父节点id
      this.arrCreatorId = json.arrCreatorId // 取出子节点id 集合
      this.formLabelAlign.twoDimensionDescription = json.description
      this.creatorId = json.creatorId
      if (this.creatorId === '12' || this.creatorId === 12) {
        this.tableListData = json.contentList
      } else if (this.creatorId === '13' || this.creatorId === 13) {
        checkEditor(this, data.twoDimensionContent) // 脚本内容
      } else { // 说明不是当前累的this.creatorId 将其清空
        this.creatorId = ''
      }
      this.checkedRadio()
    },
    // 初始化树
    getTree () {
      this.treeLoading = true
      this.$axios.get('/apm/getProfileCatalogByUserIdWithoutStandard', {params: {type: '3'}}).then(response => {
        this.treeLoading = false
        this.fileNewTreeArr = []
        var data = response.data
        if (data !== null && data.length > 0) {
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            for (var i = 0; i < data.length; i++) {
              this.fileNewTreeArr.push({
                ID: data[i].ID,
                NAME: data[i].NAME,
                CHILDREN: data[i].CHILDREN
              })
            }
          }
        }
      }).catch(response => {
        this.treeLoading = false
      })
    },
    // 树节点过滤图标
    filterTree (flag) {
      flag === 'treeSearch'
        ? ([this.iconShow, this.searchShow] = [this.searchShow, this.iconShow])
        : ([this.searchShow, this.iconShow] = [this.iconShow, this.searchShow])
    },
    // 刷新事件
    refresh () {
      this.treeLoading = true
      this.getTree()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.NAME.indexOf(value) !== -1
    },
    handleClick (vc) {},
    // 点击上一步，根据上一步的父id查询
    previousClick () {
      this.explainShow = false
      this.attrExplain = ''
      this.tableListData = {}
      this.showTestBtn = false
      let lastIndex = this.scriptTypes.length - 1
      let scriptType = this.scriptTypes[lastIndex] // 获取到父节点
      this.scriptTypes.splice(lastIndex, 1) // 删除数组中该父节点
      this.getChildCreatorByScriptType(scriptType)
      if (this.scriptTypes === null || this.scriptTypes.length === 0) {
        this.disablePrevious = true
        this.scriptTypes.push(this.scriptType)
      }
    },
    // 点击下一步，如果没有数据，则显示保存按钮，以及需要提交的数据，树等
    nextClick () {
      if (this.creatorId === null || this.creatorId === '') {
        this.$message.error('请先选择!')
      } else {
        if (this.sid === null || this.sid === undefined || this.sid === '') {
          this.tableListData = {}
        } else {
          this.arrCreatorId = []
        }
          this.$axios.get('/apm/getChildCreator', {params: {id: this.creatorId}}).then(response => {
          if (response.data.status !== null && response.data.status !== '' && response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.disablePrevious = false
            this.childCreatorList = response.data
            this.arrCreatorId.push({
              ID: this.creatorId
            }) // 存选中的节点
            if (this.childCreatorList !== null && this.childCreatorList.length > 0) {
              this.scriptTypes.push(this.creatorId + '') // 如果有子节点存储当前id为父节点
              this.showSaveBtn = false
            } else { // 没有子节点
              this.getTree()
              if (this.creatorId === '13' || this.creatorId === 13) {
                this.showTestBtn = true
              }
              this.showSaveBtn = true
              this.setDefaultValue()
            }
          }
        }).catch(response => {

        })
      }
    },
    // 设置默认值
    setDefaultValue () {
      // 新增的时候设置 默认输入框，新增的时候根据id查询有多少显示多少
        let tableIndex = 0
        for (let i in this.tableListData) {
          tableIndex = i
        }
        if (tableIndex === 0) {
          for (var i = 0; i < 2; i++) {
            this.addRelation()
            for (var j = 0; j < 1; j++) {
              this.addTableValueItem(i, j)
            }
          }
        }
    },
    // 点击的时候赋值
    radioCheckChange (id, name) {
      this.creatorId = id
      this.stepTitle = name
    },
    // 子节点击事件 加载中间及右侧数据
    handleNodeClick (data, node, nodeCommpent) {
      if (!data['CHILDREN'] && data.NAME !== null) {
        // 无子节点
        // 给对应坐标的对象属性赋值
        this.$set(this.tableListData[this.currentInputTableIndex]['data'][this.currentInputRowIndex], 'parameterName', data.NAME)
      } else {
      }
    },
    // 保存事件
    onSubmit () {
      if (this.creatorId === '12' || this.creatorId === 12) {
        this.saveMeasure()
      } else if (this.creatorId === '13' || this.creatorId === 13) {
        this.saveEditor()
      }
    },
    // 加载工程参数子节点-说明
    getDetail (id) {
      var param = { gpId: id }
      this.$axios.get('/apm/getGpDetail', { params: param }).then(response => {
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        this.$refs.descri_text.textContent = data.DESCRIPTION
        if (!this.$util.isDefine(data.DESCRIPTION)) {
          this.explainShow = false
        } else {
          this.explainShow = true
        }
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据加载失败!')
      })
    },
    // 左侧节点值赋给右侧编辑器
    showMsgFromChild (data) {
      if (data === 'hide') {
        this.explainShow = false
      } else {
        var iframeDocument = this.$refs.iframe
        iframeDocument.contentWindow.insertMethod('"' + data.NAME + '"') // 赋值到编辑器
        this.getDetail(data.ID)
      }
    },
    // 保存编辑器
    saveEditor () {
      var url = ''
      if (this.scriptId === null || this.scriptId === undefined || this.scriptId === '') {
        url = '/apm/addTwoDimensionScriptByCreator'
      } else {
        url = '/apm/updateTwoDimensionScriptByCreator'
      }
      var steps = '{"arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "description": "' + this.formLabelAlign.twoDimensionDescription + '", "stepTitle": "' + this.stepTitle + '", "creatorId": "' + this.creatorId + '"}'
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue()
      var paramObj = {
        twoDimensionScriptId: this.scriptId,
        name: this.formLabelAlign.twoDimensionName, // 名称
        userId: this.userId,
        type: this.scriptType,
        json: editorContent,
        creatorId: this.creatorId,
        steps: steps,
        twoDimensionDescription: this.formLabelAlign.twoDimensionDescription // 注释
      }
      var paramStr = this.$qs.stringify(paramObj)
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等！')
      this.$axios.post(url, paramStr, {headers: { 'Content-type': 'application/x-www-form-urlencoded' }}).then((response) => {
        var data = response.data
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (data.status === '0') {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else if (data.status === 'E1027') {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error(data.message)
        } else {
          this.$message.error(data.message)
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据保存失败')
      })
    },
    saveMeasure () {
      var script = '('
      for (var item in this.tableListData) {
        var data = this.tableListData[item]
        if (this.checkIsNotNull(data.relation)) {
          var relation = data.relation === '与' ? '&&' : '||'
          script += relation
        }
        script += '('
        for (var dt in data.data) {
          var obj = data.data[dt]
          if (this.checkIsNotNull(obj.relation)) {
            var relation1 = obj.relation === '与' ? '&&' : '||'
            script += ' ' + relation1 + ' '
          }
          if (obj.parameterName === null || obj.parameterName === undefined || obj.parameterName === '') {
            script = script.substring(0, script.lastIndexOf(relation1) - 1)
          } else {
            script += '_.runScript(\\"' + obj.parameterName + '\\") ' + obj.selectValue + ' ' + this.getParam(obj.parameterValue)
          }
        }
        script += ')'
      }
      script += ')'
      // script += " && _.runScript(\"" + measurement + "\") " + comparator + " " + value;
      var paramStr
      let url = ''
      if (this.scriptId === null || this.scriptId === undefined || this.scriptId === '') {
        url = '/apm/addTwoDimensionScriptByCreator'
      } else {
        url = '/apm/updateTwoDimensionScriptByCreator'
      }
      var steps = '{"contentList": ' + JSON.stringify(this.tableListData) + ', "arrCreatorId": ' + JSON.stringify(this.arrCreatorId) + ', "scriptTypes": ' + JSON.stringify(this.scriptTypes) + ', "description": "' + this.formLabelAlign.twoDimensionDescription + '", "stepTitle": "' + this.stepTitle + '", "creatorId": "' + this.creatorId + '"}'
      if (this.creatorId === 12 || this.creatorId === '12') {
        paramStr = this.$qs.stringify({
          twoDimensionScriptId: this.scriptId,
          name: this.formLabelAlign.twoDimensionName,
          description: this.formLabelAlign.twoDimensionDescription,
          userId: this.userId,
          creatorId: this.creatorId,
          type: this.scriptType,
          json: '{"CONDISION": "' + script + '"}',
          steps: steps
        })
      }
      this.$axios.post(url, paramStr,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then((response) => {
        var dataRes = response.data
        if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
        this.$message.error('保存失败!')
      })
    },
    getParam (val) {
      if (isNaN(val)) {
        return '\\"' + val + '\\"'
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
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (tvi !== '') { // 删除表格之间的行数据
          this.$delete(this.tableListData[index]['data'], tvi.toString())
          if (!this.$util.isNotEmptyObject(this.tableListData[index]['data'])) {
            this.$delete(this.tableListData, index.toString())
          }
        } else { // 删除表格
          this.$delete(this.tableListData, index.toString())
        }
      }).catch(() => {
      })
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
    },
    checkIsNotNull (val) {
      if (val !== null && val !== undefined && val !== '') {
        return true
      } else return false
    },
    // 测试事件--加载profileId
    onTest () {
      this.dialogVisible = true
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getProfilesByUserId', { params: {} }).then(response => {
        var data = response.data
        if (data['status']) {
          if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data) {
          this.profileData = data
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据加载失败，请刷新页面重试！')
      })
    },
    // 选中的值
    profileChange (val) {
      this.profileSelectValue = val
    },
    // 测试二参数数脚本
    testScript () {
      this.dialogVisible = false
      this.$store.commit('SHOW_LOADING', '正在测试脚本，请稍等！')
      var editorContent = this.$refs.iframe.contentWindow.editor.getValue() // 获取编辑器的内容
      var paramStr = this.$qs.stringify({
        content: editorContent,
        modelId: '',
        profileId: this.profileSelectValue
      })
      this.$axios.post('/apm/getTwoTreesByContent', paramStr, {headers: { 'Content-type': 'application/x-www-form-urlencoded' }}).then((response) => {
        var data = response.data
        if (data) {
          if (data.status !== null && data.status !== '' && data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.relyonArr = data
            this.rightTabActive = 'ylgx'
          }
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('脚本测试失败')
      })
    },
    // 展示详细信息
    panelChangeTwo (item, index) {
      if (item['EXCEPTION_REASON']) {
        this.errorShow = true
        this.$refs['collapse_content' + index][0].textContent = item.EXCEPTION_REASON
      } else {
        this.rightShow = true
        if (item['test_data']) {
          this.$refs['flight_no' + index][0].textContent = item.test_data[0].id
        }
        delete item.test_data
        var obj = {}
        obj[index] = item
        this.$refs.iframeOrgChart.contentWindow.getInfo(obj)
      }
    },
    closePopup () {
      this.rightShow = false
      this.$refs.iframeOrgChart.contentDocument.getElementById('chart-container').innerText = ''
    }
  }
}
</script>
