<style scoped>
.tab_file_new {
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 78vh;
  width: 100%;
}
.cm_main_content .el-tabs__content .el-tab-pane.content_tab_pane {
  margin: 0 auto;
}
/* 左侧 */
.tab_file_new_left {
  height: 95%;
  width: 20%;
  padding-top: 10px;
  border-right: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
  .left_tree {
    height: -webkit-fill-available;
    cursor: pointer;
    overflow: auto;
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
  /* align-items: center; */
  /* border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5; */
  height: 40px;
  /* margin-bottom: 16px; */
}
.left_filter_search {
  background-image: url(../../assets/images/icon66_1.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.left_filter_refresh {
  background-image: url(../../assets/images/icon67.png);
  background-size: cover;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.tab_file_new_middle {
  width: calc(100% - 22.5%);
}
.tab_file_new_middle .tab_font{
  font-size: 12px;
}

.tab_file_new_main {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
/* 中间 */
.main_content {
  width: 70%;
  padding: 0px 2px;
  font-size: 14px;
  color: #606266;
  border-bottom: 1px solid #DDDDDD;
}

.content_tab_pane {
  width: 97%;
  font-size: 14px;
  color: #606266;
  margin: 0px auto;
}

.content_mapped_id {
  display: none;
}

.content_mapped_value {
  color: #df5593;
  cursor: pointer;
}

.content_condition {
  display: flex;
  justify-content: space-between;
}

.input_condition {
  width: 40%;
}
.list_mapped {
  color: #409EFF;
  cursor: pointer;
}

.tab_file_new .content_page {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
}

/* 右侧 */
.main_attr {
  width: 30%;
  height: 100%;
  padding-left: 0px;
  border-left: 1px solid #ebeef5;
}

.content_tab_attr {
  margin: 0 auto;
  font-size: 12px;
  color: #606266;
}

.main_attr_detail {
  margin-top: 10px;
  display: grid;
  grid-row-gap: 10px;
}

.detail_div {
  display: flex;
  flex-direction: row;
  width: 93%;
  margin: 0 auto;
}

.label_name {
  width: 65px;
  height: 32px;
  line-height: 32px;
  text-align: right;
}

.label_text {
  width: 75%;
}

.radio_attr {
  height: 32px;
  line-height: 32px;
  display: flex;
  flex-direction: row;
}

.equation_img {
  background-image: url(../../assets/images/icon91.png);
  background-size: cover;
  width: 20px;
  height: 18px;
  cursor: pointer;
}

.detail_mapped_text {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input_text_mapped {
  width: 170px;
  margin-right: 10px;
}

.tab_attr_mapped {
  font-size: 14px;
  color: #606266;
}
.main_save {
  margin-top: 13px;
  margin-right: 25px;
  float: right;
  display: flex;
  flex-direction: row;
}

.main_attr_config {
  height: 70%;
  margin-top: 10px;
  display: grid;
  grid-row-gap: 20px;
}

.detail_senior_save {
  position: relative;
  left: 188px;
  top: 0px;
}

.content_tab_clear {
  margin: 0 auto;
  width: 95%;
  font-size: 12px;
  color: #606266;
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
  background-image: url(../../assets/images/icon91.png);
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
  background-image: url(../../assets/images/icon71.png);
  background-size: cover;
  cursor: pointer;
}

.clean_rules_devare {
  background-image: url(../../assets/images/icon75.png);
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
.el-tabs__nav{
  transform: translate(11px) !important;
}
.el-tabs__content > .el-tab-pane > div {
  position: relative;
  /* height: 100%; */
}
.cm_main_content .content_list {
  height: calc(100% - 88px);
  padding-top: 10px;
}
.cm_main_content .content_page {
  height: 40px;
}
</style>
<!-- 写入公共样式文件中并引入到main.js中-->
<style>
/*表格行高（联合表格高度使用）*/
/* .content_list .el-table td ,.content_list .el-table th { */
  /* padding: 6px; */
  /*height: 50vh*/
/* } */
/* .cm_main_content .el-table--border::after, .el-table--group::after{
  width: 0px !important;
} */
.cm_main_content .el-tabs__content {
  height: calc(100% - 40px);
  padding-top: 10px;
}
.el-tabs__item{
  font-size: 12px;
}
</style>

<template>
  <!-- 工程参数主界面 -->
  <div class="tab_file_new">
    <!-- 左侧元素 -->
    <div class="tab_file_new_left cm_tab_file_new_left" >
      <!-- 树 -->
      <div class="left_filter" v-show="searchShow">
        <el-input placeholder="请输入关键字搜索" v-model="filterText"  @keyup.enter.native="filterTree('treeKey')" size="small">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')" style="font-size:20px;height:0px;"></i>
        </el-input>
      </div>
      <div class="left_tree df-f1" v-loading="treeLoading">
          <el-tree :data="fileNewTreeArr" node-key="ID" :props="defaultTreeProps" highlight-current
                   :default-expanded-keys="expandedKeys"
                   @node-click="handleNodeClick" draggable
                    ref="tree" :filter-node-method="filterNode"
                    :render-content="renderContent" @node-drag-end="handleDragEnd">
          </el-tree>
      </div>
  </div>
  <!-- 默认显示元素 -->
  <div class="tab_file_new_middle" v-show="middleShow" >
      <el-tabs value="middleFirst" >
          <el-tab-pane label="属性" name="middleFirst" class="tab_font"></el-tab-pane>
      </el-tabs>
  </div>
  <!-- 点击节点显示元素 -->
  <div class="tab_file_new_main cm_tab_file_new_main" v-show="mainShow" v-loading="dataLoading">
      <!-- 中间列表 -->
      <div class="main_content cm_main_content">
          <el-tabs value="contentFirst" style="height:100%">
              <el-tab-pane :label="mainTitle" name="contentFirst" class="content_tab_pane">
                  <div class="content_condition" style="height:28px">
                      <el-checkbox v-model="checked" @change="getUnmapped">只显示未映射字段</el-checkbox>
                      <el-input placeholder="请输入关键字搜索" size="mini" class="input_condition" v-model="searchCondition" @keyup.enter.native="searchContent(searchCondition)">
                          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchContent(searchCondition)"></i>
                      </el-input>
                  </div>
                  <div class="content_list">
                      <el-table :data="tableArr" height="100%" highlight-current-row  width="90%" border :row-style="{height:'38px'}"
                      :cell-style="{padding:'0px'}" :header-row-style="{height:'38px'}" :header-cell-style="{padding:'0px'}" ref="multipleTable"
                                @row-click="rowClick"   @selection-change="handleSelectionChange">
                        <el-table-column  type="selection" align="center" width="45"  v-if="this.$util.paramOneEditAuthority"></el-table-column>
                        <el-table-column prop="tableRepository" label="版本库" align="center" width="100" ></el-table-column>
                          <el-table-column prop="tablePlane" label="机型"  align="center" width="200"></el-table-column>
                          <el-table-column prop="tableType" label="类型"  align="center" width="120"></el-table-column>
                          <el-table-column prop="tableMapped" label="映射"  align="center">
                            <template slot-scope="scope">
                              <div v-if="scope.row.tableType === '工程函数'">
                                <span class="list_mapped" @click="gotoEquationEdit(scope.row)">{{scope.row.tableMapped}}</span>
                              </div>
                              <div v-else>
                                {{scope.row.tableMapped}}
                              </div>
                            </template>
                          </el-table-column>
                      </el-table>
                  </div>
                 <div class="content_page">
                     <el-pagination
                       @size-change="handleSizeChange"
                       @current-change="currentChangeClick"
                       @prev-click="prevClick"
                       @next-click="nextClick"
                       v-model="currentPage"
                       background
                       :page-sizes="[10, 15, 20]"
                       :page-size="pageSize"
                       :current-page.sync="currentPage"
                       :total="totalCount"
                       layout="sizes, prev, pager, next, total">
                     </el-pagination>
                  </div>
              </el-tab-pane>
          </el-tabs>
      </div>
      <!-- 右边属性 -->
      <div class="main_attr cm_main_attr" >
          <el-tabs v-model="nodeAttrDefault" v-show="nodeAttrShow" style="height:88%" @tab-click="handleClick">
              <!-- 属性 -->
              <el-tab-pane label="属性" name="attrFirst" class="content_tab_attr">
                  <div class="main_attr_detail">
                      <div class="detail_param_no detail_div">
                        <div class="label_name">参数编号：</div>
                        <div class="label_text">
                          <el-input type="text" size="small" class="input_text"  v-model="paramNo" :disabled="!this.$util.paramOneEditAuthority">
                              <i slot="suffix" class="el-input__icon el-icon-close" @click="clearContent('paramNo')"></i>
                          </el-input>
                        </div>
                      </div>
                      <div class="detail_name detail_div">
                        <div class="label_name">名称：</div>
                        <div class="label_text">
                          <el-input type="text" size="small" v-model="attrName" :disabled="!this.$util.paramOneEditAuthority">
<!--                              <i slot="suffix" class="el-input__icon el-icon-close" @click="clearContent('name')"></i>-->
                          </el-input>
                        </div>
                      </div>
                      <div class="detail_chinese_name detail_div">
                        <div class="label_name">中文名：</div>
                        <div class="label_text">
                          <el-input type="text" size="small" class="input_text" v-model="chineseName" :disabled="!this.$util.paramOneEditAuthority">
                              <i slot="suffix" class="el-input__icon el-icon-close" @click="clearContent('chineseName')"></i>
                          </el-input>
                        </div>
                      </div>
                      <div class="detail_div">
                          <div class="label_name">类型：</div>
                          <div class="label_text radio_attr">
                            <div style="width:50%"><el-radio v-model="radioType" label="0" :disabled="!this.$util.paramOneEditAuthority">字符</el-radio></div>
                            <div><el-radio v-model="radioType" label="1" :disabled="!this.$util.paramOneEditAuthority">数值</el-radio></div>
                          </div>
                      </div>
                      <div class="detail_div">
                        <div class="label_name">单位：</div>
                        <div class="label_text">
                          <el-input type="text" size="small" class="input_text" v-model="attrUnit" :disabled="!this.$util.paramOneEditAuthority">
                              <i slot="suffix" class="el-input__icon el-icon-close" @click="clearContent('unit')"></i>
                          </el-input>
                        </div>
                      </div>
                      <div class="detail_div">
                          <div class="label_name">中文说明：</div>
                          <div class="label_text">
                            <el-input type="textarea" :rows="3" v-model="attrExplain" placeholder="请输入内容" :disabled="!this.$util.paramOneEditAuthority"></el-input>
                          </div>
                      </div>
<!--                       <div class="detail_div">
                          <div class="label_name">英文说明：</div>
                          <div class="label_text">
                            <el-input type="textarea" :rows="3" v-model="attrExplainEn" placeholder="请输入内容" :disabled="!this.$util.paramOneEditAuthority"></el-input>
                          </div>
                      </div>-->
                  </div>
              </el-tab-pane>
              <el-tab-pane label="清洗规则" name="attrSecond" class="content_tab_clear" >
                  <div class="clean_rules">
                      清洗规则：
                      <div class="clean_rules_icon">
                           <div class="clean_rules_add" @click="rowRuleShow = true"></div>
<!--                          <div class="clean_rules_add" @click="rowRuleShow = false"></div>-->
                      </div>
                  </div>
                  <div class="clean_rules_header">
                    <div class="header_text">异常情况</div>
                    <div class="header_text">清洗规则</div>
                    <div style="width:50px;">操作</div>
                  </div>
                  <div class="clean_rules_content">
                    <!-- 添加规则 -->
                    <div class="add_rule" v-show="rowRuleShow && this.$util.paramOneEditAuthority" >
                      <div class="abnormal_rule bg_purple">
                          <el-select v-model="conditionText" size="mini" >
                            <el-option v-for="item3 in abnormalOptionCN" :key="item3.ID" :label="item3.VALUE" :value="item3.ID"></el-option>
                          </el-select>
                          <el-input v-model="conditionValueText" size="mini" placeholder="请输入内容" @change="conValAddChange"></el-input>
                      </div>
                      <div class="clean_rule bg_purple">
                        <el-select v-model="solutionText" size="mini" @change="solutionAddChange">
                          <el-option v-for="item4 in cleanRuleOptionCN" :key="item4.ID" :label="item4.VALUE" :value="item4.ID"></el-option>
                        </el-select>
                        <el-input v-model="solutionValueText" size="mini" placeholder="请输入内容" :disabled="solutionText === 4 || solutionText === 5"></el-input>
                      </div>
                      <div class="clean_rule_button">
                        <!-- <el-button type="danger" plain icon="el-icon-close" size="mini" @click="rowRuleShow = false"></el-button> -->
                        <div class="rule_delete" @click="rowRuleShow = false"></div>
                      </div>
                    </div>
                    <!--规则列表-->
                    <div class="rule_list" v-for="(rule, index) in ruleArr" :key="rule.ID">
                      <div class="abnormal_rule bg_purple">
                          <el-select v-model="rule.condition" size="mini" >
                            <el-option v-for="item1 in abnormalOptionCN" :key="item1.ID" :label="item1.VALUE" :value="item1.ID" ></el-option>
                          </el-select>
                          <el-input v-model="rule.condition_value" size="mini" placeholder="请输入内容" @change="conValChange(rule)"></el-input>
                      </div>
                      <div class="clean_rule bg_purple">
                        <el-select v-model="rule.solution" size="mini" @change="solutionChange(rule, index)">
                          <el-option v-for="item2 in cleanRuleOptionCN" :key="item2.ID" :label="item2.VALUE" :value="item2.ID"></el-option>
                        </el-select>
                        <el-input v-model="rule.solution_value" size="mini" :ref="'ruleInput'+index"
                          :disabled="rule.solution === '取前值' || rule.solution === '取后值' || rule.solution === 4 ||rule.solution === 5" placeholder="请输入内容" ></el-input>
                      </div>
                      <div class="clean_rule_button">
                        <!-- <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRule(index)"></el-button> -->
                        <div class="rule_delete" @click="rowRuleShow = false"></div>
                      </div>
                    </div>
                  </div>
              </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="rowAttrDefault" v-show="rowAttrShow" style="height:88%">
            <el-tab-pane label="映射" name="rowFirst" class="content_tab_attr">
              <div class="main_attr_config" >
                <div class="detail_div">
                  <div class="label_name">映射：</div>
                  <div class="label_text" ref="row_mapped">
                    <el-select
                      :disabled="!this.$util.paramOneEditAuthority"
                      remote
                      reserve-keyword
                      :remote-method="remoteMethod"
                      v-model="mappedText" placeholder="请输入" size="small"
                               filterable clearable  class="input_text" :loading="loading" @change="mappedChange">
                      <el-option v-for="item in mappedArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="main_save">
             <el-button type="primary" v-show="nodeAttrDefault === 'attrSecond' && this.$util.paramOneEditAuthority" @click="cleanFun" style="width:90px;height:34px;line-height:0">清洗</el-button>
<!--            <el-button type="primary" v-show="nodeAttrDefault === 'attrSecond'"  size="mini">清洗</el-button>-->
            <el-button type="primary" @click="onSubmit"  size="mini" v-show="this.$util.paramOneEditAuthority">保存</el-button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'

export default {
  data () {
    return {
      userInfo: {},
      URL: 'paramOne',
      hasMenue: false,
      checkId: '', // 当前选中的ID
      authorityId: '7001', // 7001 表示有工程参数的编辑权限
      multipleSelection: [], // 选中的版本库映射数据
      editRowClick: false,
      dataLoading: false,
      treeLoading: false,
      editPermiss: false, // 是否有编辑权限
      checkedLibraryList: [], //选中的版本库集合
      engineParameterData: {}, // 选中的工程参数
      fileNewTreeArr: [], // 左侧树状数据
      expandedKeys: [], // 默认展开的keys数组
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      parentId: '-1', // 默认父节点id
      iconMoreShow: false, // 自定义节点图标
      iconOtherShow: false, // 自定义节点图标
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      isAddTreeNode: false, // 当前节点编辑状态
      filterText: '',
      gpId: '', // 子节点id
      middleShow: true, // 默认显示的元素
      mainShow: false,
      mainTitle: '',
      hideMenuObj: {}, // 记录点击过的菜单
      disabledMenuObj: {},
      checked: false,
      defaultMappedVal: '', // 中间默认映射的默认值
      tableArr: [], // 默认表格列表
      searchCondition: '', // 表格查询条件
      modelId: '', // 版本库
      currentPage: 1, // 当前页
      pageSize: 20, // 每页条数
      totalCount: 0, // 总记录数
      pageCount: 0, // 总页数
      nodeAttrShow: true, // 默认显示节点属性
      rowAttrShow: false, // 行属性
      attrName: '', // 默认属性名称
      attrUnit: '', // 默认属性单位'
      defautlMappedArr: [], // 默认映射下拉列表数组
      defaultMappedText: '', // 默认映射下拉列表默认id
      defaultMappedCon: '', // 默认映射下拉列表默认值
      defaultMappedId: '', // 默认映射id
      mappedArr: [], // 映射下拉列表默认数组
      mappedText: '', // 映射下拉列表默认值
      mappedId: '', // 映射id
      attrExplain: '', // 中文说明
      attrExplainEn: '', // 英文说明
      radioType: '', // 类型单选框默认值(1,2)
      paramNo: '',
      chineseName: '',
      oemName: '',
      agsDescription: '',
      radioCheck: '', // 校验情况，单选框默认值(1,2)
      cleanArr: [], // 清洗规则数组
      cleanText: '',
      rowAttrDefault: 'rowFirst', // 右侧行默认tab
      radioAttributeType: '', // attribute参数：1:外部计算参数 2:记录参数
      seniorRadio: '',
      seniorMappedArr: [], // 高级映射数组
      seniorMappedText: '', // 高级映射下拉列表默认值
      seniorMappedId: '', // 高级映射id
      seniorMappedCon: '', // 高级映射下拉的值
      nodeAttrDefault: 'attrFirst',
      ruleArr: [], // 右侧清洗规则数组
      ruleOptionCN: [], // 规则值中文
      abnormalOptionCN: [], // 异常情况中文
      cleanRuleOptionCN: [], // 清洗规则中文
      rowRuleShow: false, // 添加行默认隐藏
      conditionText: '', // 默认添加异常下拉框的值
      conditionValueText: '', // 默认添加异常input的值
      solutionText: '', // 默认添加清洗规则下拉框狂的值
      solutionValueText: '', // 默认添加清洗规则inpu的值
      beforeAfterText: '', // 取前值，取后值的input值
      loading: false,
      beforeEditValue: '' // 树节点编辑之前的值
    }
  },
  watch: {
    seniorRadio (val) {
      if (val) {
        this.mappedText = ''
      }
    },
    mappedText (v) {
      this.remoteMethod(v)
    },
    currentPage (val) {
      this.currentChangeClick(val)
    }
  },
  props: ['parentToChild'],
  mounted () {
    this.$bus.$on('backParamOneManager', () => {
      this.multipleSelection = [] // 清空选中
      this.defaultChildrenMenu()
      this.getTableData((this.currentPage = 1)) // 中间表格数据
    })
    this.$nextTick(() => {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      console.log('加载工程参数数据------------------------')
      this.userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
      if (this.userInfo) {
        this.getInitData()
      } else {
        setTimeout(() => {
          console.log('等待1秒加载工程参数初始化数据------------------------')
          this.getInitData()
        }, 1000)
      }
    })
  },
  methods: {
    getInitData () {
      this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！') // 关闭加载
      this.userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
      console.log('工程参数当前用户userInfo{}', this.userInfo)
      let status = false
      for (let i = 0; i < this.userInfo.menuList.length; i++) {
        if (this.userInfo.menuList[i]['ID'] === '7001' || this.userInfo.menuList[i]['ID'] === 7001) { // 如果是7001 则表示有工程参数编辑权限
          status = true // 有编辑权限的肯定有菜单
          this.hasMenue = true
          break
        } else if (this.userInfo.menuList[i]['URL'] === this.URL) { // 有菜单，但是不 一定有权限的
          this.hasMenue = true
        }
      }
      if (this.hasMenue) { // 有菜单的情况下查询。
        console.log('工程参数有菜单权限')
        if (status) {
          console.log('工程参数有编辑权限')
          this.$util.paramOneEditAuthority = true // 工程参数
        } else {
          console.log('工程参数无编辑权限')
          this.$util.paramOneEditAuthority = false // 工程参数
        }
        this.getTree()
      }
    },
    // 删除节点
    deleteGp (data) {
      this.$confirm('您确定要删除该工程参数吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.$confirm('工程参数被删除后不可恢复，请确定是否要删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/apm/deleteGp', {params: {id: data.ID}}).then(response => {
          var retData = response.data
          if (retData['status']) {
            if (retData.status === '0') {
              this.$message({
                type: 'success',
                message: retData.message
              })
              this.mainShow = false
              let parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
              parentNode.CHILDREN.forEach((v, i) => {
                if (v.ID === data.ID) {
                  parentNode.CHILDREN.splice(i, 1)
                }
              })
            } else if (retData.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              this.$message.error(retData.message)
            }
          }
        }).catch(response => {
        })
      })
      })
    },
    // 只刷新的时候，默认展开已经打开的ID
    getTreeRefresh () {
      this.treeLoading = true
      this.fileNewTreeArr = []
      this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId}}).then(response => {
        this.treeLoading = false
        var data = response.data
        if (data['status']) {
          if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data) {
          this.fileNewTreeArr = data.data
          this.expandedKeys = this.checked
        } else {
          this.treeLoading = false
        }
      }).catch(response => {
        this.treeLoading = false
      })
    },
    getTree () {
        this.treeLoading = true
        this.fileNewTreeArr = []
        this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId}}).then(response => {
          this.treeLoading = false
          var data = response.data
          if (data['status']) {
            if (data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            }
          }
          if (data) {
            this.fileNewTreeArr = data.data
            this.expandedKeys = data.defaultNode
          } else {
            this.treeLoading = false
          }
        }).catch(response => {
          this.treeLoading = false
        })
    },
    // 自定义子节点内容
    renderContent (h, {node, data, store}) {
      var that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          type: 'paramone', // 工程参数
          isShowMore: this.$util.paramOneEditAuthority, // 是否显示更多按钮
          isShowMoreForNode: this.$util.paramOneEditAuthority, // 子节点是否显示更多按钮
          isShowEdit: this.$util.paramOneEditAuthority, // 是否显示编辑按钮
          isShowDelete: this.$util.paramOneEditAuthority, //删除按钮
          isShowMoreForCatalog: this.$util.paramOneEditAuthority // 目录是否显示更多按钮
        },
        on: { // 绑定方法 data node store type是当前节点信息
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          openTreeNodeHandle: ((data, node, type) => that.openNodeFun(data, node, type)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node, type) => that.cancelNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node, type) => that.deleteNodeFun(data, node, type))
        }
      })
    },
    deleteNodeFun (data, node, type) {
      this.deleteGp(data)
    },
    // 编辑节点
    editNodeFun (data, node) { // 编辑节点
      let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
      if (tempFlag) {
        this.$message({
          message: '有节点处于编辑中，请编辑完再添加!',
          type: 'warning'
        })
      } else {
        this.beforeEditValue = data.NAME
        this.$set(data, 'status', 1)
        this.$set(data, 'isAdd', false)
        console.log('editNodeFun', data, node)
      }
    },
    // 新增，清空，编辑算法
    openNodeFun (data, node, type) {
      let enName = ''
      switch (type) {
        case 'create' : enName = 'paramOne_add_suanfa'
              break
        case 'edit' : enName = 'paramOne_edit_suanfa'
              break
        case 'clear': enName = 'paramOne_clear_suanfa'
              break
      }
      this.$bus.$emit('paramOneAddTab', {enName: enName, zhName: data.NAME, isClosable: true, parent: 'paramOne_file', count: 0})
    },
    // 增加节点,且是处于编辑中
    addNodeFun (data, node, type) {
      this.checked = data.ID
      let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
      if (tempFlag) {
        this.$message({
          message: '有节点处于编辑中，请编辑完再添加!',
          type: 'warning'
        })
      } else {
        node.expanded = true // 展开节点显示添加的节点信息
        if (data.NAME) {
          // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
          if (type === 'catalog') { // 新增目录
            setTimeout(() => {
              data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, CHILDREN: [], status: 1, nodeType: type, isAdd: true})
            }, 300)
          } else {
            setTimeout(() => {
              data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, status: 1, nodeType: type, isAdd: true})
            }, 300)
          }
        }
      }
    },
    // 保存节点内容，且是处于编辑中
    saveNodeFun (data, node) {
      // alert(data)
      // let reg = /\s/
      // if (reg.test(data.NAME)) {
      //   this.$message({
      //     message: '不能包含空格，请重新输入',
      //     type: 'warning'
      //   })
      // } else {
      var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode // 递归查找父节点
      if (data.isAdd) { // 新增节点
        this.addTreeData(data, parentNode)
      } else { // 编辑节点
        // 请输入节点内容，此else不能删除
        this.editTreeData(data)
      }
      this.isAddTreeNode = false
      // }
    },
    traverseTreeNode (node) { // 递归遍历树节点
      for (var i = 0; i < node.length; i++) {
        if (this.node) { // 整个树节点信息不存在
          break
        }

        var nodeObj = node[i]
        if (!nodeObj || !nodeObj.ID) {
          continue
        }
        if (nodeObj.status && nodeObj.status === 1) {
          this.isAddTreeNode = true
          break
        } else {
          if (nodeObj.CHILDREN && nodeObj.CHILDREN.length > 0) {
            this.traverseTreeNode(nodeObj.CHILDREN)
          } else {
            continue
          }
        }
      }
      return this.isAddTreeNode
    },
    // 保存新增节点
    addTreeData (data, parentNode) {
      var url = ''
      var paramStr = {}
      if (data.nodeType === 'catalog') {
        url = '/apm/addGpCatalog'
        paramStr = {parentId: parentNode.ID, name: data.NAME}
      } else {
        url = '/apm/addGp'
        paramStr = {gpName: data.NAME, cataLogId: parentNode.ID}
      }
      paramStr = this.$qs.stringify(paramStr)
      // 保存节点到数据库
      this.$axios.post(url, paramStr).then((response) => {
        var dataRes = response.data
        if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
          this.getTreeRefresh()
          // // 保存节点到页面
          // var childData = parentNode.CHILDREN
          // for (var i = 0; i < childData.length; i++) {
          //   if (childData[i].ID === data.ID) {
          //     data.status = 0
          //     parentNode.CHILDREN.splice(i, 1, data)
          //   }
          // }
          // // 加载新增节点的id--刷新节点
          // this.$axios.get('/apm/getGpTree', {params: {parentId: parentNode.ID}}).then(response => {
          //   var resData = response.data
          //   if (resData['status']) {
          //     if (response.data.status === 'E1001') {
          //       this.$bus.$emit('logBackInHandle', response.data)
          //     }
          //   }
          //   if (resData.length > 0) {
          //     parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
          //     parentNode.CHILDREN = resData
          //   }
          // }).catch(response => {
          //
          // })
        } else if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
      })
    },
    // 取消处于编辑中的新增节点
    cancelNodeFun (data, node, type) {
      this.isAddTreeNode = false // 取消正在编辑状态
      this.$bus.$emit('isAddTreeNode', this.isAddTreeNode)
      if (data.isAdd) { // 新增
        var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
        parentNode.CHILDREN.forEach((v, i) => {
          if (v.ID === data.ID) {
            parentNode.CHILDREN.splice(i, 1)
          }
        })
      } else { // 编辑
        if (this.$util.isDefine(this.parentToChild)) {
          data.NAME = this.parentToChild
        } else {
          data.NAME = this.beforeEditValue
        }
        this.$set(data, 'status', 0)
      }
    },
    // 编辑树节点
    editTreeData (data) {
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等!') // 打开加载提示框
      this.$axios(
        {
          url: '/apm/updateGpCatalog',
          method: 'post',
          params: {
            id: data.ID,
            name: data.NAME
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }
      ).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框
        if (response.data.status === '0') {
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: response.data.message
          })
          this.getTreeRefresh()
        } else if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },
    // 树节点过滤图标
    filterTree (flag) {
      this.mainShow = false
      this.treeLoading = true
      this.fileNewTreeArr = []
      this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId, content: this.filterText}}).then(response => {
        this.treeLoading = false
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data) {
          this.fileNewTreeArr = data.data
          this.expandedKeys = data.defaultNode
        } else {
          this.treeLoading = false
        }
      }).catch(response => {
        this.treeLoading = false
      })
    },
    setSearchExpandKeys (data) {
      if (data[0].TYPE !== 'CATALOG') {
        this.expandedKeys.push(data[0].ID)
      } else {
        this.setSearchExpandKeys(data[0].CHILDREN)
      }
    },
    // 刷新事件
    refresh () {
      this.getTree()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.NAME.indexOf(value) !== -1
    },
    // 节点击事件 加载中间及右侧数据
    handleNodeClick (data, node, nodeCommpent) {
      this.checkId = data.ID
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
      }
      let disabledMenuObj = {}
      if (!data['CHILDREN'] && data.status !== 1) {
        // 子节点
        this.middleShow = false
        this.mainShow = true // 主内容展示(包含中间和右侧)
        this.nodeAttrShow = true // 右侧节点属性展示
        this.rowAttrShow = false // 右侧行属性隐藏
        this.rowRuleShow = false // 添加规则隐藏
        this.mainTitle = data.NAME // 中间panel标题
        this.nodeAttrDefault = 'attrFirst'
        this.clearMainContent() // 清空节点内容
        this.clearCleanRule() // 清空清洗规则内容
        this.clearRowRule() // 清空添加规则内容
        this.gpId = data.ID // 子节点id
        this.getTableData((this.currentPage = 1)) // 中间表格数据
        this.getDetail() // 中间默认映射和右侧数据
        this.getTranslate() // 清洗规则中文翻译
        this.defaultChildrenMenu() // 开启禁用按钮等
        this.engineParameterData = data
      } else {
        //父节点
        hideMenuObj.paramOne_add_catalog = true
        hideMenuObj.paramOne_file_new = true
        hideMenuObj.paramOne_file_edit = true
        if (this.$util.paramOneEditAuthority) { // 有权限不禁用，否则禁用
          disabledMenuObj.paramOne_add_catalog = false
          disabledMenuObj.paramOne_file_new = false
          disabledMenuObj.paramOne_file_edit = false
        } else {
          disabledMenuObj.paramOne_add_catalog = true
          disabledMenuObj.paramOne_file_new = true
          disabledMenuObj.paramOne_file_edit = true
        }
        this.middleShow = true
        this.mainShow = false
        this.hideMenuObj = hideMenuObj // tab 页签点击显示或隐藏对应的菜单用
        this.disabledMenuObj = disabledMenuObj
        this.$bus.$emit('openHeaderMenuItem', 'paramOne_file', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
      }
      this.$bus.$emit('getTreeData', this.fileNewTreeArr)
      this.$bus.$emit('isAddTreeNode', this.isAddTreeNode)
      this.$bus.$emit('paramOneAddCatalog', data, node) // 传值过去，然后点击二级菜单，触发对应的事件要用到
    },
    // 清空节点内容
    clearMainContent () {
      this.pageSize = 20
      this.checked = false // 清空条件（只显示未映射字段）
      this.tableArr = [] // 清空表格
      this.searchCondition = '' // 清空条件(搜索框)
      this.attrName = '' // 清空节点属性-名称
      this.attrUnit = '' // 清空节点属性-单位
      this.defaultMappedCon = '' // 清空节点属性--默认映射下拉框
      this.attrExplain = '' // 清空节点属性--说明
      this.paramNo = ''
      this.chineseName = ''
      this.oemName = ''
      this.agsDescription = ''
    },
    // 表格数据
    getTableData (currentPage) {
      this.tableArr = []
      var param = {
        gpId: this.gpId,
        isUnBinded: this.checked,
        pageNo: currentPage,
        pageSize: this.pageSize
      }
      param['searchContent'] = this.searchCondition.length > 0 ? this.searchCondition : '' // json对象动态添加属性
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/apm/getModels', { params: param }).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        var tempTableArr = []
        let versionList = []
        if (data.content.length > 0) {
          for (var obj of data.content) {
            this.totalCount = data.recordCount
            this.pageCount = data.pageCount
            this.pageSize = data.pageSize
            this.currentPage = data.pageNo
            var type = ''
            if (obj.TYPE === 'one') {
              type = '工程函数'
            } else if (obj.TYPE === 'global') {
              type = '标准字段'
            }
            versionList.push(obj.MODEL_ID)
            tempTableArr.push({
              ID: obj.ID,
              tableRepository: obj.MODEL_ID,
              tablePlane: obj.DESCRIPTION,
              tableType: type,
              refId: obj.REFID,
              tableMapped: obj.COLUMNNAME
            })
            this.tableArr = tempTableArr
          }
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.tableArr = []
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据加载失败，请刷新页面重试！')
      })
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getTableData(this.currentPage)
    },
    // 当前页加载数据
    currentChangeClick (currentPage) {
      this.getTableData(currentPage)
    },
    // 上一页加载数据
    prevClick (currentPage) {
      this.getTableData(currentPage)
    },
    // 下一页加载数据
    nextClick (currentPage) {
      this.getTableData(currentPage)
    },
    // 表格数据--根据映射字段为空
    getUnmapped (val) {
      this.checked = val
      this.getTableData(this.currentPage = 1)
    },
    // 表格数据--根据查询条件
    searchContent () {
      this.getTableData(this.currentPage = 1)
    },
    // 选中指定的行的复选框
    toggleSelection (rows) {
      this.$refs.multipleTable.clearSelection() // 选中当前点击的行 CheckBox即可
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      }
    },
    // 选中CheckBox
    handleSelectionChange (val) {
      if (val.length > 0) {
        if (this.editRowClick) {
          this.$bus.$emit('parameditRowClickHideMenue', true)
          this.editRowClick = false
        } else {
          if (val.length === 1) { // 如果选中的是一个 将当前行也选中，并且调用点击行的数据，并且显示行属性
            let row = val[0]
            this.setCurrent(row) // 选中当前行
            this.getRowData(row) // 获取当前行的数据
          } else { // 选中多个或为空 的话默认都是 节点的属性
            this.nodeAttrShow = true // 显示节点属性
            this.rowAttrShow = false // 隐藏行属性
            this.nodeAttrDefault = 'attrFirst'
            this.setCurrent() // 否则清空选中的行
          }
          this.multipleSelection = val
          this.checkHasMapping()
        }
      } else {
        this.defaultChildrenMenu()
      }
    },
    // 选中当前行
    setCurrent (row) {
      this.$refs.multipleTable.setCurrentRow(row)
    },
    // 行单击事件
    rowClick (row, event, column) {
      let arr = [row]
      this.toggleSelection(arr) // 点击当前行，根据行的值选中对应行的CheckBox,会自动执行 handleSelectionChange
    },
    // 获取当前行对应的数据
    getRowData (row) {
      this.nodeAttrShow = false // 隐藏节点属性
      this.rowAttrShow = true // 显示行属性
      this.nodeAttrDefault = 'attrFirst'
      this.clearRowInfo() // 清空行属性内容
      // this.getModelColumns(row.tableRepository) // 加载行映射数据
      this.getModelAttr(row.tableRepository) // 加载行属性数据
      this.modelId = row.tableRepository // 版本库 字段
      this.seniorMappedArr = this.defautlMappedArr // 加载高级映射列表
      if (row.tableType) {
        if (row.tableType === '工程函数') {
          this.seniorRadio = '1' // set高级映射
          this.seniorMappedText = row.tableMapped
        } else if (row.tableType === '标准字段') {
          this.mappedText = row.tableMapped // set映射
        }
      }
    },
    // 判断选中的是否有映射
    checkHasMapping () {
      let disabledMenuObj = {}
      let hideMenuObj = {}
      let count = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i]['tableType'] && this.multipleSelection[i]['tableType'] === '工程函数' && this.multipleSelection[i]['tableMapped']) {
          count++
          break
        }
      }
      if (count > 0) {
        // 有映射，显示编辑,清空菜单。
        this.openChildrenEditMenue(hideMenuObj, disabledMenuObj)
      } else {
        this.defaultChildrenMenu()
      }
    },
    getDefaultMenue () {
      let hideMenuObj = {}
      hideMenuObj.paramOne_add_suanfa = false
      hideMenuObj.paramOne_edit_suanfa = false
      hideMenuObj.paramOne_clear_suanfa = false
      hideMenuObj.paramOne_file_remove = false
      hideMenuObj.paramOne_edit_suanfa = false
      hideMenuObj.paramOne_clear_suanfa = false
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_file', hideMenuObj, {}) // 修改二级菜单是否显示
    },
    // 点击子节点开启 按钮，并禁用编辑清空按钮
    defaultChildrenMenu () {
      let disabledMenuObj = {}
      let hideMenuObj = {}
      hideMenuObj.paramOne_add_suanfa = true
      hideMenuObj.paramOne_edit_suanfa = true
      hideMenuObj.paramOne_clear_suanfa = true
      hideMenuObj.paramOne_file_remove = true
      if (this.$util.paramOneEditAuthority) { // 有权限不禁用否则禁用
        disabledMenuObj.paramOne_add_suanfa = false
        disabledMenuObj.paramOne_edit_suanfa = false
        disabledMenuObj.paramOne_clear_suanfa = false
        disabledMenuObj.paramOne_file_remove = false
      } else {
        disabledMenuObj.paramOne_add_suanfa = true
        disabledMenuObj.paramOne_edit_suanfa = true
        disabledMenuObj.paramOne_clear_suanfa = true
        disabledMenuObj.paramOne_file_remove = true
      }
      // 编辑清除默认都是禁用
      disabledMenuObj.paramOne_edit_suanfa = true // 禁用
      disabledMenuObj.paramOne_clear_suanfa = true // 禁用
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_file', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
    },
    // 点击子节点时如果有映射显清空 和编辑
    openChildrenEditMenue (hideMenuObj, disabledMenuObj) {
      hideMenuObj.paramOne_add_suanfa = true
      hideMenuObj.paramOne_edit_suanfa = true
      hideMenuObj.paramOne_clear_suanfa = true
      hideMenuObj.paramOne_file_remove = true
      if (this.$util.paramOneEditAuthority) { // 有权限不禁用否则禁用
        disabledMenuObj.paramOne_add_suanfa = false
        disabledMenuObj.paramOne_edit_suanfa = false
        disabledMenuObj.paramOne_clear_suanfa = false
        disabledMenuObj.paramOne_file_remove = false
        disabledMenuObj.paramOne_edit_suanfa = false
        disabledMenuObj.paramOne_clear_suanfa = false
      } else {
        disabledMenuObj.paramOne_add_suanfa = true
        disabledMenuObj.paramOne_edit_suanfa = true
        disabledMenuObj.paramOne_clear_suanfa = true
        disabledMenuObj.paramOne_file_remove = true
        disabledMenuObj.paramOne_edit_suanfa = true
        disabledMenuObj.paramOne_clear_suanfa = true
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'paramOne_file', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
    },
    // 清空行属性内容
    clearRowInfo () {
      this.mappedText = '' // 清空映射
      this.seniorRadio = '' // 默认高级映射
      this.seniorMappedText = '' // 清空高级映射的下拉框的值
      this.oemName = '' // 清空oem参数
      this.agsDescription = '' // 清空ags描述
      this.radioAttributeType = '' // 清空attribute参数
    },
    // 图标X清楚方法
    clearContent (val) {
      if (val === 'name') {
        this.attrName = ''
      } else if (val === 'unit') {
        this.attrUnit = ''
      } else if (val === 'paramNo') {
        this.paramNo = ''
      } else if (val === 'chineseName') {
        this.chineseName = ''
      } else if (val === 'oemName') {
        this.oemName = ''
      }
    },
    // 加载中间默认映射和右侧数据
    getDetail () {
      var param = { gpId: this.gpId }
      this.$axios.get('/apm/getGpDetail', { params: param }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data.GP_NAME) {
          if (data.DEFAULT_ONE_DIMENSION_NAME === null) {
            data.DEFAULT_ONE_DIMENSION_NAME = ''
          }
          // this.$refs.mapped_id.textContent = data.DEFAULT_ONE_DIMENSION_ID // 中间默认映射的id
          // this.$refs.mapped_value.textContent = data.DEFAULT_ONE_DIMENSION_NAME // 中间默认映射
          this.defaultMappedVal = data.DEFAULT_ONE_DIMENSION_NAME
          this.attrName = data.GP_NAME // 右侧-名称
          data.TYPE === '0' ? (this.radioType = '0') : (this.radioType = '1')
          this.attrUnit = data.UNIT
          this.attrExplain = data.DESCRIPTION
          this.paramNo = data.GP_NO
          this.chineseName = data.GP_CHINESE_NAME
          this.oemName = data.OEM_NAME
          this.agsDescription = data.AGS_DESCRIPTION
        }
      }).catch(response => {
      })
    },
    // 加载行属性数据
    getModelAttr (modelId) {
      this.$axios.get('/apm/getModelAttribute', {params: {gpId: this.gpId, modelId: modelId}}).then(response => {
        var data = response.data
        if (data['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data) {
          this.oemName = data.OEM_NAME
          this.agsDescription = data.AGS_DESCRIPTION
          var type = ''
          if (data.ATTRIBUTE === '1') {
            type = '0'
          } else if (data.ATTRIBUTE === '2') {
            type = '1'
          }
          this.radioAttributeType = type
        }
      }).catch(response => {

      })
    },
    // 加载行映射的  映射字段
    // getModelColumns (modelId, columnName) {
    //   this.$axios.get('/apm/getModelColumns', {params: {modelId: modelId, columnName: columnName}}).then(response => {
    //     var data = response.data
    //     if (data['status']) {
    //       if (response.data.status === 'E1001') {
    //         this.$bus.$emit('logBackInHandle', response.data)
    //       }
    //     }
    //     if (data.length > 0) {
    //       this.mappedArr = []
    //       for (var obj of data) {
    //         this.mappedArr.push({ value: obj.ID, label: obj.NAME_IN_CSV })
    //       }
    //     }
    //   }).catch(response => {
    //   })
    // },
    // 从服务器加载映射数据
    remoteMethod (query) {
      if (query) {
        this.loading = true
        setTimeout(() => {
          this.mappedArr = []
          this.$axios.get('/apm/getModelColumn', {params: {modelId: this.modelId, columnName: query}}).then(response => {
            var data = response.data
            if (data['status']) {
              if (response.data.status === 'E1001') {
                this.$bus.$emit('logBackInHandle', response.data)
              }
              this.loading = false
            }
            if (data.length > 0) {
              this.mappedArr = []
              for (var obj of data) {
                this.mappedArr.push({ value: obj.ID, label: obj.NAME_IN_CSV })
              }
              this.loading = false
            }
            this.loading = false
          }).catch(response => {
            this.loading = false
          })
        }, 200)
      } else {
        this.mappedArr = []
      }
    },
    // 获取默认映射下拉框id及value
    defaultMappedChange (val) {
      if (val) {
        var obj = {}
        obj = this.defautlMappedArr.find((item) => {
          return item.value === val // 筛选出匹配数据
        })
        this.defaultMappedCon = obj.label
      } else {
        this.defaultMappedCon = ''
      }
      this.defaultMappedId = val
    },
    // 获取映射id
    mappedChange (val) {
      if (val) {
        this.mappedId = val
        this.seniorRadio = ''
        this.seniorMappedText = ''
      }
    },
    // 保存事件
    onSubmit (val) {
      if (this.nodeAttrShow) {
        if (this.nodeAttrDefault === 'attrFirst') { // 保存节点属性
          this.onSubmitNode()
        } else { // 保存节点清洗规则
          //this.onSubmitCleanRule()
        }
      } else { // 保存行属性
        this.onSubmitRowMapped()
      }
    },
    // 保存节点属性
    onSubmitNode () {
      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      if (!reg.test(this.attrName) && this.$util.isDefine(this.attrName)) {
        this.$message({
          message: '只含有汉字、数字、字母，前后不能有空格！',
          type: 'warning'
        })
        return false
      } else if (!reg1.test(this.attrName) && this.$util.isDefine(this.attrName)) {
        this.$message({
          message: '不能有连续的空格！',
          type: 'warning'
        })
        return false
      } else {
        this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等！')
        var type = ''
        type = this.radioType === '0' ? '0' : '1'
        var paramStr = this.$qs.stringify({
          id: this.gpId,
          gpName: this.attrName,
          type: type,
          unit: this.attrUnit,
          defaultOneDimensionId: this.defaultMappedId,
          description: this.attrExplain,
          descriptionEn: this.attrExplainEn,
          gpNo: this.paramNo,
          gpChineseName: this.chineseName
        })
        this.$axios.post('/apm/updateGp', paramStr, {
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          var data = response.data
          if (data['status']) {
            if (response.data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            }
          }
          if (data.status === '0') {
            this.$message({
              message: data.message,
              type: 'success'
            })
            // 重加载中间默认映射
            if (this.defaultMappedVal !== this.defaultMappedCon) {
              this.getDetail()
            }
            // engineParameterData
            var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, this.gpId).parentNode // 递归查找父节点
            this.reloadNode(this.engineParameterData.PARENT_ID, parentNode)
          } else if (data.status === 'E0019') {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message.error('global parameter已被绑定，不能修改')
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('数据保存失败')
        })
      }
    },
    // 保存节点清洗规则
    onSubmitCleanRule () {
      var addObj = {}
      if (this.rowRuleShow) { // 添加一条规则
        addObj = {
          ID: '',
          gp_id: this.gpId,
          condition: this.conditionText,
          solution: this.solutionText,
          condition_value: this.conditionValueText,
          solution_value: this.solutionValueText
        }
        // 校验添加功能的类型
        if (!this.$util.isDefine(this.gpId) || !this.$util.isDefine(this.conditionText) ||
          !this.$util.isDefine(this.solutionText)) {
          this.$notify({
            title: '新增数据警告',
            type: 'warning',
            message: '请选择类型'
          })
          return false
        }
        // 校验添加功能的异常情况--input
        if (this.conditionText === 0 || this.conditionText === '值类型') {
          if (!(this.conditionValueText === 'NUMBER' || this.conditionValueText === 'STRING')) {
            this.$notify({
              title: '新增异常情况数据警告',
              message: '类型为值类型，则值只能为：NUMBER或STRING',
              type: 'warning'
            })
            return false
          }
        } else {
          var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
          if (!this.conditionValueText || new RegExp(reg).test(this.conditionValueText) === false) { // 非数字
            this.$notify({
              title: '新增异常情况数据警告',
              message: '请输入正确的数字',
              type: 'warning'
            })
            return false
          }
        }
        // 校验清洗规则--input
        if (this.conditionText) {
          var reg2 = /^[0-9]+([.]{1}[0-9]+){0,1}$/
          if (!this.solutionValueText || new RegExp(reg2).test(this.solutionValueText) === false) { // 非数字
            this.$notify({
              title: '新增清洗规则数据警告',
              message: '请输入正确的数字',
              type: 'warning'
            })
            return false
          }
        }
        this.ruleArr.push(addObj)
        this.rowRuleShow = false
        this.clearRowRule()
      }
      var ruleList = this.ruleArr
      var ruleCnList = this.ruleOptionCN
      this.cnTranslateNumber(ruleCnList, ruleList) // 中文转数字
      // 校验list
      for (let item of ruleList) {
        let con = item.condition
        let sol = item.solution
        if (!this.$util.isDefine(con) || !this.$util.isDefine(sol)) {
          this.$notify({
            title: '修改数据警告',
            type: 'warning',
            message: '请选择类型'
          })
          return false
        }
        if (!this.validConChange(item)) return false
        if (!this.validSolutionValue(item)) return false
      }
      var paramStr = JSON.stringify(ruleList)
      let formData = new FormData()
      formData.append('GP_ID', this.gpId)
      formData.append('data', paramStr)
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.post('/etl/CandS/EditRole', formData).then((response) => {
        var data = response.data
        if (data.result === 1) {
          this.$message({
            message: '数据保存成功',
            type: 'success'
          })
          this.getRules()
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据保存失败')
      })
    },
    // 保存行属性
    onSubmitRowAttr () {
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等！')
      var type = ''
      type = this.radioAttributeType === '0' ? '1' : '2'
      var paramStr = this.$qs.stringify({
        gpId: this.gpId,
        modelId: this.modelId,
        oemName: this.oemName,
        agsDescription: this.agsDescription,
        attributes: type
      })
      this.$axios.post('/apm/updateModelAttribute', paramStr, {
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        var data = response.data
        if (data.status === '0') {
          this.$message({
            message: data.message,
            type: 'success'
          })
          // 重加载中间默认映射
          if (this.defaultMappedVal !== this.defaultMappedCon) {
            this.getDetail()
          }
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        } else if (data.status === 'E0019') {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('global parameter已被绑定，不能修改')
        } else if (data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据保存失败')
      })
    },
    // 保存行映射
    onSubmitRowMapped () {
      console.log(123)
      var mappedText = this.mappedText // 映射
      var seniorMappedText = this.seniorMappedText // 高级映射
      var mappedType = ''
      var sellectId = ''
      if (mappedText) {
        mappedType = 'template'
        sellectId = this.mappedId
      } else if (seniorMappedText) {
        mappedType = 'oneDimension'
        sellectId = this.seniorMappedId
      }
      if (sellectId === '') {
        sellectId = ' '
      }
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等!')
      // var mappedParams = {gpId: this.gpId, modelIds: this.modelId, type: mappedType, id: sellectId}
      this.$axios(
      {
        url: '/apm/bindGp?gpId=' + this.gpId + '&modelIds=' + this.modelId + '&type=' + mappedType,
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: sellectId
      }
    ).then(response => {
        this.$store.commit('HIDE_LOADING', '正在保存数据，请稍等!')
        var data = response.data
        if (data.status === '0') {
          this.currentPage = 1
          this.getTableData('1') // 重加载表格
          this.$message({
            message: '数据保存成功',
            type: 'success'
          })
        } else if (data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('数据保存失败')
      })
    },
    // 清空绑定关系
    clearBindGp () {
      this.$confirm('确定要清空所选版本库的映射关系?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataLoading = true
         this.$axios(
                {
                  url: '/apm/bindGp?gpId=' + this.gpId + '&modelIds=' + this.getModelIds() + '&type=template' + '&id=',
                  method: 'post',
                  headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                  },
                  data: {
                    json: '{}',
                    steps: '{}'
                  }
                }
              ).then(response => {
            this.dataLoading = false
            var data = response.data
            if (data.status === '0') {
              this.currentPage = 1
              this.getTableData('1') // 重加载表格
              this.$message({
                message: data.message,
                type: 'success'
              })
            } else if (data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
            }
          }).catch(res => {
            this.dataLoading = false
          })
      })
    },
    getModelIds () {
      let modelIds = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].tableMapped) {
          if (i === 0) {
            modelIds = this.multipleSelection[i].tableRepository
          } else {
            modelIds += ',' + this.multipleSelection[i].tableRepository
          }
        }
      }
      return modelIds
    },
    // 右侧tab选中事件
    handleClick (tab, event) {
      this.rowRuleShow = false
      this.clearRowRule()
      this.getRules()
    },
    // 获取规则中文翻译
    getTranslate () {
      this.$axios.get('/etl/CandS/AllJson').then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        let data = response.data
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        }
        this.ruleOptionCN = data
        for (var a in data) {
          if (data[a].KEY === 'CONDITION') {
            this.abnormalOptionCN.push(data[a])
          } else if (data[a].KEY === 'SOLUTION') {
            this.cleanRuleOptionCN.push(data[a])
          }
        }
      }).catch(response => {
        // this.$message.error('数据加载失败！')
      })
    },
    // 获取规则数据
    getRules () {
      this.$axios.get('/etl/CandS/ListRole', {params: {GP_ID: this.gpId}}).then(response => {
        let data = response.data
        if (response.data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        }
        // 重新给condition/solution赋值为中文
        var ruleCnList = this.ruleOptionCN
        var ruleList = data
        this.numberTranslateCn(ruleCnList, ruleList)
        this.ruleArr = ruleList
      }).catch(response => {
        this.$message.error('数据加载失败！')
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
    // 提交清洗
    cleanFun () {
      // 若无规则
      if (this.ruleArr.length === 0) {
        this.$notify({
          title: '警告',
          message: '暂无规则，无法清洗！',
          type: 'warning'
        })
      } else {
        this.$store.commit('SHOW_LOADING', '正在清洗，请稍等！')
        this.$axios.get('/etl/CandS/submitClean', {params: {GP_ID: this.gpId}}).then(response => {
          // 回调
          let data = response.data
          if (data.result === 1) {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message({
              message: data.message,
              type: 'success'
            })
          } else if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('数据清洗失败')
        })
      }
    },
    // 规则添加清洗规则change
    solutionAddChange (val) {
      if (val === 4 || val === 5) {
        this.solutionValueText = ''
      }
    },
    // 规则添加行异常情况input转换为大写
    conValAddChange (val) {
      this.conditionValueText = this.conditionValueText.toUpperCase()
    },
    // 校验修改异常情况
    validConChange (rule) {
      var valid = true
      var conVal = rule.condition_value
      if (rule.condition === 0) { // 值类型
        if (!(conVal === 'NUMBER' || conVal === 'STRING')) { // 错误
          this.$notify({
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
    // 校验异常情况input
    validInputValue (val) {
      var valid = true
      var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      if (!val || new RegExp(reg).test(val) === false) { // 非数字
        this.$notify({
          title: '修改数据警告',
          message: '请输入正确的数字',
          type: 'warning'
        })
        valid = false
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
          this.$notify({
            title: '修改数据警告',
            message: '请输入正确的数字',
            type: 'warning'
          })
          valid = false
        }
      }
      return valid
    },
    // 规则list的异常情况inpu值转换为大写
    conValChange (rule) {
      rule.condition_value = rule.condition_value.toUpperCase()
    },
    // 清洗规则类型change
    solutionChange (rule, index) {
      if (rule.solution === 4 || rule.solution === 5) {
        rule.solution_value = ''
      }
    },
    // 被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      if (dropNode.data.TYPE === 'CATALOG') {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      if (draggingNode.data.ID !== dropNode.data.ID) {
      this.$axios.get('/apm/changeGpCatalog', {params: {gpId: draggingNode.data.ID, catalogId: dropNode.data.ID}}).then(response => {
        let data = response.data
        if (data.status === '0') {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error(data.message)
        }
        setTimeout(() => {
          this.checked = draggingNode.data.ID
          this.getTreeRefresh()// 重加载最后的节点
        }, 300)
        // var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, draggingNode.data.ID).parentNode // 查找开始的节点的父节点
        // this.reloadNode(draggingNode.data.ID, parentNode) // 重加载开始的父节点
      }).catch(response => {
        this.refresh()
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('目录切换失败')
      })
      }
      }
    },
    //重加载节点
    reloadNode (parentId, parentNode) {
      this.$axios.get('/apm/getGpTree', {params: {parentId: parentId}}).then(response => {
        var resData = response.data
        if (resData['status']) {
          if (response.data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (resData) {
          parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
          parentNode.CHILDREN = resData.data
          this.expandedKeys = resData.defaultNode
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.engineParameterData.ID) // 选中当前的节点
          })
        }
      }).catch(response => {

      })
    },
    // 点击右侧默认映射的加号跳转到方程式
    gotoEquation () {
        this.$bus.$emit('paramOneAddTab', {enName: 'paramOne_edit_suanfa', zhName: this.engineParameterData.NAME, isClosable: true, parent: 'paramOne_file', count: 0})
    },
    // 点击表格中映射的值跳转到编辑方程式
    gotoEquationEdit (obj) {
      this.editRowClick = true
      this.multipleSelection = []
      this.multipleSelection.push(obj)
      this.$bus.$emit('paramOneAddTab', {enName: 'paramOne_edit_suanfa', zhName: this.engineParameterData.NAME, isClosable: true, parent: 'paramOne_file', count: 0, id: obj.refId})
    },
    // 点击中间默认映射的值跳转到编辑方程式
    gotoEquationEditByMiddle () {
      this.$bus.$emit('paramOneAddTab', {enName: 'paramOne_edit_suanfa', zhName: this.engineParameterData.NAME, isClosable: true, parent: 'paramOne_file', count: 0, id: this.$refs.mapped_id.textContent})
    }
  }
}
</script>
