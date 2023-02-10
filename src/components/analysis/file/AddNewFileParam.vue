<template>
  <div class="file-new-container df df-fd-r df-jc-fs df-f1">
    <div class="file-new-left cm_tab_file_new_left">
      <div class="file-new-left-tree">
        <el-tree
          ref="fileNewTreeRef"
          node-key="ID"
          :data="fileNewTreeData"
          :props="defaultFileNewTreeProps"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="fileNewNodeClick">
        </el-tree>
      </div>
      <div class="tree-footer-icon df df-fd-r df-jc-fe df-ai-c">
        <el-input placeholder="请输入..." v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
    </div>
    <div class="file-new-middle cm_tab_file_new_main df df-fd-c">
      <div class="flex-new-top basic-tab df df-fd-r df-f1 w100">
        <div class="file-new-content cm_main_content df df-fd-c">
          <div class="filter-config-table">
            <el-table
              :row-style="{height:'38px'}"
              :cell-style="{padding:'0px'}"
              :header-row-style="{height:'38px'}"
              :header-cell-style="{padding:'0px'}"
              :data="filterConfigTableData"
              style="width: 100%;"
              height="100%"
              highlight-current-row
              @row-click="filterConfigTableRowHandle"
              :header-row-class-name="headerRowClassName"
              :row-class-name="tableRowClassName">
              <el-table-column prop="name" label="参数" width="400"></el-table-column>
              <el-table-column prop="filter" label="过滤条件" width="auto"></el-table-column>
              <el-table-column label="" width="50" align="center">
                <template slot-scope="scope">
                  <div class="icon-delete tab-icon-set row-icon-group" @click.stop="filterRowDelete(scope.$index, filterConfigTableData)"></div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="file-new-right cm_main_attr df df-fd-c">
          <!-- 筛选配置属性中第二种类型 -->
          <div class="m20 df df-fd-c" v-show="currentFilterConfigRowAttr === 2">
            <div class="df df-fd-r df-jc-fs df-ai-c">
              <span class="df-f1">{{inputTypeName}}：</span>
              <div class="df-f3">
                <el-input placeholder="请输入内容" v-model="inputTypeNameValue" size="small" @change="changeInputTypeNameValue"></el-input>
              </div>
            </div>
            <div class="df df-fd-r df-jc-sa df-ai-c df-f1 mt20">
              <el-radio v-model="inputTypeNameQueryType" @change="changeInputTypeNameQueryType" label="1">模糊查询</el-radio>
              <el-radio v-model="inputTypeNameQueryType" @change="changeInputTypeNameQueryType" label="2">精确查询</el-radio>
            </div>
          </div>
          <!-- 筛选配置属性中第三种类型 -->
          <div class="m20 df df-fd-c df-jc-fs df-ai-fs" v-show="currentFilterConfigRowAttr === 3">
            <el-radio v-model="attrOneRadio" label="1" class="mb10" @change="changeAttrOneRadio">标准</el-radio>
            <div class="standardRadio" v-show="attrOneRadio === '1'">
              <el-select v-model="standardSelectValue" placeholder="请选择过滤条件" @change="changeStandardSelectValue">
                <el-option v-for="item in standardSelectData" class="filter-attr-input" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-input
                v-model="standardMinValue"
                v-show="parseInt(standardSelectValue) > 0"
                @change="changeStandardMinValue"
                @blur="blurStandardMinValue"
                autofocus
                placeholder="请输入内容"
                class="filter-attr-input mt10">
              </el-input>
              <el-input
                v-model="standardMaxValue"
                v-show="parseInt(standardSelectValue) > 6"
                @change="changeStandardMaxValue"
                @blur="blurStandardMaxValue"
                placeholder="请输入内容"
                class="filter-attr-input mt10">
              </el-input>
            </div>
          </div>
          <!-- 筛选配置属性中第六种类型 -->
          <div class="m20 df df-fd-c df-jc-fs df-ai-fs" v-show="currentFilterConfigRowAttr === 6">
            <el-radio v-model="attrSixRadio" @change="changeAttrSixRadio" label="3" class="mb10 mt10">按时间段查询</el-radio>
            <div class="df df-fd-c df-jc-fs df-ai-fs w100" v-show="attrSixRadio === '3'">
              <div class="df df-fd-r df-jc-c df-ai-c">
                <span class="file-name">开始</span>
                <el-date-picker
                  v-model="accordDayStartDate"
                  @change="changeAccordDayStartDate"
                  @blur="blurAccordDayStartDate"
                  type="datetime"
                  placeholder="选择开始日期"
                  default-time="00:00:00"
                  class="df-f1 mt10 mb10">
                </el-date-picker>
              </div>
              <div class="df df-fd-r df-jc-c df-ai-c">
                <span class="file-name">结束</span>
                <el-date-picker
                  v-model="accordDayEndDate"
                  @change="changeAccordDayEndDate"
                  @blur="blurAccordDayEndDate"
                  type="datetime"
                  placeholder="选择开始日期"
                  default-time="00:00:00"
                  class="df-f1">
                </el-date-picker>
              </div>
            </div>
          </div>
          <!-- 筛选配置属性中第七种类型 非搜索类型-->
          <div class="m20 df df-fd-r df-jc-fs df-ai-c" v-show="currentFilterConfigRowAttr === 7">
            <span class="df-f1">{{notHotWordsSearchName}}：</span>
            <div class="df-f3 hot-words">
              <el-select
                v-model="notHotWordsSearchValue"
                placeholder="请选择"
                @change="changeNotHotWordsSearchValue">
                <el-option
                  v-for="item in notHotWordsSearchData"
                  :key="item.columnname"
                  :label="item.columnname"
                  :value="item.columnname">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 筛选配置属性中第八种类型 搜索类型-->
          <div class="m20 df df-fd-r df-jc-fs df-ai-c" v-show="currentFilterConfigRowAttr === 8">
            <span class="df-f1">{{hotWordsSearchName}}：</span>
            <div class="df-f3 hot-words">
              <el-select
                v-model="hotWordsSearchValue"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="hotWordsSearchMethod"
                :loading="hotWordsSearchLoading"
                @change="changeHotWordsSearchValue">
                <el-option
                  v-for="item in hotWordsSearchListData"
                  :key="item.columnname"
                  :label="item.columnname"
                  :value="item.columnname">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 筛选配置属性中错误提示语-->
          <div class="alert-info m20" v-show="!isSubmit && alertTitle !== ''">
            <el-alert
              :title="alertTitle"
              type="error"
              :closable="false"
              show-icon>
            </el-alert>
          </div>
        </div>
      </div>
      <div class="file-new-bottom">
        <el-button @click="addNewFileParams" v-show="pageMenuType === 'Drilldown'">保存</el-button>
        <el-button @click="addNewFileParams" v-show="pageMenuType === 'AddSubline'">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'

export default {
  name: 'NewFile',
  props: { // 属性定义
    pageMenuType: { // 菜单类型
      type: String
    }
  },
  data () {
    return { // 以下是此组件的默认值
      fileNewTreeData: [], // 树数据
      defaultFileNewTreeProps: { // 树数据属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      defaultExpandedKeys: [], // 默认展开的节点的 key 的数组
      treeNodeToMenuItem: { // 树的一级节点对应数据源二级菜单
        'CEAIR_PROFILE': 'analysis_dataSource_profile',
        '航班信息': 'analysis_dataSource_flight'
      },
      menuItemToTreeNode: { // 数据源二级菜单对应树的一级节点
        'analysis_dataSource_allDataSource': '', // 总数据源
        'analysis_dataSource_profile': 'CEAIR_PROFILE', // profile
        'analysis_dataSource_download': '', // 下载
        'analysis_dataSource_downloadReview': '', // 下载审查
        'analysis_dataSource_flight': '航班信息', // 航班
        'analysis_dataSource_flightReview': '', // 航班审查
        'analysis_dataSource_airport': '', // 机场
        'analysis_dataSource_data': '', // 数据
        'analysis_dataSource_navigation': '', // 导航
        'analysis_dataSource_operation': '', // 操作
        'analysis_dataSource_weather': '' // 天气
      },
      treeKeyword: '', // 关键字搜索树数据
      isShowAttr: true, // 默认true，显示筛选配置的属性，false则显示可视化配置的属性
      filterConfigTableData: [], // 筛选配置表格
      filterConfigTableDataObj: {}, // 临时存储选中的筛选配置表格数据，在最后提交时使用
      currentFilterConfigRowId: '', // 当前选中筛选配置表格中的某行编号
      currentFilterConfigRowName: '', // 当前选中筛选配置表格中的某行名字
      currentFilterConfigRowAttr: '', // 筛选配置属性的显示
      inputTypeName: '文本框', // 筛选配置第二类文本框的名字
      inputTypeNameValue: '', // 筛选配置第二类文本框的值
      inputTypeNameQueryType: '1', // 筛选配置第二类文本框的查询类型
      attrOneRadio: '', // 筛选配置第三类属性radio值
      standardSelectValue: '', // 筛选配置第三类属性中下拉框选中的值
      standardSelectData: [ // 筛选配置第三类属性中下拉框数据
        { value: '1', label: '等于' },
        { value: '2', label: '不等于' },
        { value: '3', label: '小于' },
        { value: '4', label: '小于等于' },
        { value: '5', label: '大于' },
        { value: '6', label: '大于等于' },
        { value: '7', label: '参数1<=x<=参数2' },
        { value: '8', label: '参数1<=x<参数2' },
        { value: '9', label: 'x<=参数1或x>=参数2' },
        { value: '10', label: 'x<参数1或x>参数2' }
      ],
      standardSelectArray: [ // 筛选配置第三类属性中下拉框数据
        '等于', '不等于', '小于', '小于等于', '大于', '大于等于'
      ],
      standardMinValue: '', // 筛选配置第三类属性中输入框最小值
      standardMaxValue: '', // 筛选配置第三类属性中输入框最大值
      attrSixRadio: '', // 筛选配置第六类属性radio值
      accordDayStartDate: '', // 筛选配置第六类属性中按天范围开始日期
      accordDayEndDate: '', // 筛选配置第六类属性中按天范围结束日期
      notHotWordsSearchName: '', // 筛选配置第七类属性中文本值
      notHotWordsSearchValue: '', // 筛选配置第七类属性中下拉框选中值
      notHotWordsSearchData: [], // 筛选配置第七类属性中下拉框数据集合
      hotWordsSearchName: '', // 筛选配置第八类属性中文本值
      hotWordsSearchValue: '', // 筛选配置第八类属性中下拉框选中值
      hotWordsSearchData: [], // 筛选配置第八类属性中下拉框数据
      hotWordsSearchListData: [], // 筛选配置第八类属性中下拉框数据集合
      hotWordsSearchLoading: false, //
      expressionData: { // 默认条件表达式值
        'attrOneRadio': {
          '1': {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10'
          }
        },
        'attrTwoRadio': '11',
        'attrSixRadio': {
          '3': '37'
        },
        'attrSevenRadio': '12',
        'attrEightRadio': '13'
      },
      changeFilterParamsFilp: '',
      isSubmit: true, // 是否允许提交
      alertTitle: ''
    }
  },
  watch: {
    // treeKeyword (val) { // 树节点关键字
    //   this.$refs.fileNewTreeRef.filter(val)
    // }
  },
  mounted () {
    this.$nextTick(() => {
      this.getTree() // dom渲染完毕加载树数据
    })
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },
    getTree () { // 获取左侧树状数据
      this.fileNewTreeData = []
      this.$store.commit('SHOW_LOADING', '拼命加载中')
      this.$axios({
        url: '/buildTree/getTree',
        method: 'get',
        params: {
          likeContent: this.treeKeyword
        }
      }).then(response => {
        console.log('gettree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
        if (response.data.status === '0') {
          if (this.isStringObject(response.data.result.data)) {
            let resUrl = response.data.result.data
            let tempUrl = ''
            if (resUrl.indexOf('7777') > -1) {
              tempUrl = resUrl
            } else {
              tempUrl = window.location.origin + resUrl
            }
            window.location.href = tempUrl
            return false
          }
          let data = response.data.result
          if (this.$util.isNotEmptyObject(data)) {
            let tempTreeData = []
            for (let i in data) {
              for (let j = 0; j < data[i].length; j++) {
                tempTreeData.push(data[i][j])
              }
            }
            this.fileNewTreeData = tempTreeData
          } else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: false, // 是否显示编辑节点按钮
          isShowDelete: false, // 是否显示删除节点按钮
          isShowMore: false, // 是否显示更多按钮
          isShowMoreForNode: false, // 子节点是否显示更多按钮
          isShowMoreForCatalog: false // 目录是否显示更多按钮
        },
        on: { // 绑定方法
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    searchTreeData (flag) { // 关键字搜索树节点
      // if (flag === 'treeKey' && this.treeKeyword === '') { // 目前输入关键字是基于组件自带的搜索功能，没有调用接口；如果没有输入关键字，直接点击搜索按钮，则是刷新整个树
      //   this.getTree() // 加载树数据
      // }
      this.getTree()
    },
    filterFileNewNode (value, data) { // 树节点过滤
      if (!value) return true
      try {
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    fileNewNodeClick (data) { // 右侧树状节点点击后显示到中间tab中
      console.log('AddNewFileParam@fileNewNodeClick:', data)
      // 在筛选配置的tab中，点击左侧树节点时把数据显示到中间表格中，并存储
      if (!data.CHILDREN || data.CHILDREN.length === 0) {
        if (this.filterConfigTableDataObj[data.ID]) {
          this.$message({
            message: '筛选配置中已经存在！',
            type: 'warning'
          })
          return false
        } else {
          const tempNodeObj = {
            id: data.ID,
            name: data.NAME,
            type: data.TYPE,
            parentId: data.PARENTID ? data.PARENTID : '',
            columnName: data.COLUMNNAME ? data.COLUMNNAME : '',
            columnType: data.COLUMNTYPE ? data.COLUMNTYPE : '',
            dataSourceName: data.DATASOURCE_NAME ? data.DATASOURCE_NAME : '',
            resultColumnIndex: data.RESULT_COLUMN_INDEX ? data.RESULT_COLUMN_INDEX : '',
            resultTableIndex: data.RESULT_TABLE_INDEX ? data.RESULT_TABLE_INDEX : '',
            filter: data.TYPE === '5' ? '事件' : '',
            filterConditions: {}
          }
          if (data.COLUMNNAME && (data.TYPE === '7' || data.TYPE === '8' || data.TYPE === '9')) { // 当type为7,8时需要从后端获取对应属性中下拉框的值
            this.getHotWordsSearchData(data.TYPE, data.COLUMNNAME)
          }
          this.filterConfigTableData.push(tempNodeObj)
          this.filterConfigTableDataObj[data.ID] = tempNodeObj
        }
      }
    },
    getHotWordsSearchData (type, columnName) { // 获取热词搜索的数据且放到数据仓库中，防止同样参数重复调用接口
      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj || {}// 获取临时放到数据仓库中热词搜索的数据
      if (!hotWordsSearchObj[type + '-' + columnName]) { // 数据仓库中不存在当前点击节点的数据则从后台获取
        this.$store.commit('SHOW_LOADING', '正在加载热词数据...')
        this.$axios({
          url: '/buildTree/getCheckboxData',
          method: 'get',
          params: {
            type: type,
            name: columnName
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          console.log('getCheckboxData~~~:', response)
          if (response.data.status === '0') {
            let dataObj = response.data.result
            if (this.$util.isNotEmptyObject(dataObj)) {
              let dataArr = dataObj.data
              if (dataArr.length > 0) {
                hotWordsSearchObj[type + '-' + columnName] = dataArr
                this.$store.commit('HOT_WORDS_SEARCH_OBJ', hotWordsSearchObj) // 更新数据仓库中的热词搜索数据
              }
            }
          } else if (response.data.status === 'E1001') { // 没有登录
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            hotWordsSearchObj[type + '-' + columnName] = {} // 没有数据赋值为空
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中') // 隐藏加载框
          hotWordsSearchObj[type + '-' + columnName] = {} // 异常赋值为空
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }
    },
    hotWordsSearchMethod (query) { // 筛选配置中根据关键字获取热词搜索的数据
      if (query !== '') {
        this.hotWordsSearchLoading = true
        setTimeout(() => {
          this.hotWordsSearchLoading = false
          if (this.hotWordsSearchData.length > 0) {
            this.hotWordsSearchListData = this.hotWordsSearchData.filter(item => {
              if (item.columnname && item.columnname !== '') {
                return item.columnname.toLowerCase().indexOf(query.toLowerCase()) > -1
              }
            })
          }
        }, 200)
      } else {
        this.hotWordsSearchListData = []
      }
    },
    filterRowDelete (index, rows) { // 筛选配置中表格删除行
      delete this.filterConfigTableDataObj[rows[index].id] // 删除临时表格数据对象的数据
      rows.splice(index, 1)
      if (this.filterConfigTableData.length === 0) { // 表格中没有数据时右侧属性默认显示第一个类型
        this.currentFilterConfigRowAttr = 1
        this.filterConfigTableDataObj = {} // 清空临时存储的表格数据
        this.alertTitle = '' // 没有数据时清空错误提示信息
      }
    },
    filterConfigTableRowHandle (value) { // 1.设置筛选配置表格中选择当前行的信息；2.临时存储当前行信息，替换表格选中节点的数据；3.重置右侧属性的以前选中的值
      this.alertTitle = '' // 清空错误提示信息
      this.hotWordsSearchValue = '' // 清空已经存在的热词搜索数据
      this.hotWordsSearchData = [] // 清空已经存在的热词搜索数据集合
      this.notHotWordsSearchValue = '' // 清空已经存在的非热词搜索数据
      this.notHotWordsSearchData = [] // 清空已经存在的非热词搜索数据集合
      this.isSubmit = true // 恢复提交按钮的状态
      this.currentFilterConfigRowAttr = parseInt(value.type) // 显示某个类型的属性
      this.currentFilterConfigRowId = value.id // 设置选中某行的编号
      this.currentFilterConfigRowName = value.name // 设置选中某行的名字
      let hotWordsSearchObj = this.$store.getters.hotWordsSearchObj // 获取热词搜索中的数据
      if (this.$util.isNotEmptyObject(this.filterConfigTableDataObj[value.id])) {
        // 替换点击节点时存储到表格的默认数据
        let tempRowDataObj = this.filterConfigTableDataObj[value.id]
        let tempFilterStr = '' // 临时存储显示表格中的过滤参数值
        let tempTableObj = {}
        if (this.$util.isNotEmptyObject(tempRowDataObj.filterConditions)) { // 多次点击当前行
          tempTableObj = tempRowDataObj.filterConditions
        } else { // 第一次点击当前行
          let tempColumnName = value.columnName
          if (this.filterConfigTableDataObj[value.id]['type'] === '2' &&
            this.filterConfigTableDataObj[value.id]['columnType'] === 'NUMBER') { // 文本类型节点，且值类型是数值类型
            tempColumnName = 'cast(' + value.columnName + ' as varchar)'
          }
          tempTableObj = {
            condition: '',
            paramId: value.id,
            paramName: value.name,
            paramType: value.type,
            attrRadioFlag: '',
            attrRadioValue: '',
            operatordId: '',
            selectValueOne: '',
            selectValueTwo: '',
            selectValueThree: '',
            paramValueOne: '',
            paramValueTwo: '',
            paramValueThree: '',
            resultColumnIndex: value.resultColumnIndex,
            resultTableIndex: value.resultTableIndex,
            columnName: tempColumnName,
            dataSourceNameValue: value.dataSourceName
          }
        }
        if (this.filterConfigTableDataObj[value.id]['type'] === '5') { // 事件类型
          tempFilterStr = '事件'
          if (this.$util.isNotEmptyObject(tempTableObj)) {
            if (!this.$util.isDefine(tempTableObj.resultColumnIndex) && !this.$util.isDefine(tempTableObj.resultTableIndex) && !this.$util.isDefine(tempTableObj.dataSourceNameValue)) {
              tempTableObj.dataSourceNameValue = 'hive_qar_event_list'
            }
          }
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '2') { // 文本类型
          this.inputTypeName = value.name
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '7') { // 不是热词搜索类型
          this.notHotWordsSearchName = value.name
          this.notHotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
        } else if (this.filterConfigTableDataObj[value.id]['type'] === '8' || this.filterConfigTableDataObj[value.id]['type'] === '9') { // 热词搜索类型
          this.hotWordsSearchName = value.name
          if (this.$util.isNotEmptyObject(hotWordsSearchObj) && this.$util.isDefine(hotWordsSearchObj[value.type + '-' + value.columnName])) {
            this.hotWordsSearchData = hotWordsSearchObj[value.type + '-' + value.columnName]
          } else {
            this.hotWordsSearchData = []
          }
        }
        this.resetFilterTableConditionsData(value.id, tempTableObj, tempFilterStr, false) // 替换显示过滤参数值
        this.resetDefaultData() // 重置属性中默认值
      }
    },
    resetDefaultData () { // 重置默认数据
      this.resetAttrOneDefaultData(true, true) // 筛选配置第三类属性
      this.resetAttrSixDefaultData(true) // 筛选配置第六类
      this.resetAttrTwoDefaultData(true) // 筛选配置第二类
    },
    resetAttrOneDefaultData (flag, selectFlag) { // 重置筛选配置第三类属性的值
      if (flag) {
        this.attrOneRadio = '' // 筛选配置第三类属性radio值
      }
      if (selectFlag) {
        this.standardSelectValue = '' // 筛选配置第三类属性中下拉框选中的值
      }
      this.standardMinValue = '' // 筛选配置第三类属性中输入框最小值
      this.standardMaxValue = '' // 筛选配置第三类属性中输入框最大值
    },
    resetAttrSixDefaultData (flag) { // 重置筛选配置第六类属性的值
      if (flag) {
        this.attrSixRadio = '' // 筛选配置第六类属性radio值
      }
      this.accordDayStartDate = '' // 筛选配置第六类属性中按天范围开始日期
      this.accordDayEndDate = '' // 筛选配置第六类属性中按天范围结束日期
    },
    resetAttrTwoDefaultData (flag) { // 重置筛选配置第二类属性的值
      if (flag) {
        this.inputTypeNameValue = ''
        this.inputTypeNameQueryType = '1'
      }
    },
    resetFilterTableConditionsData (rowId, obj, filterStr, flag) { // 重置筛选配置表格中的数据
      let tempTableData = []
      this.filterConfigTableData.forEach((item, index) => {
        if (item.id === rowId) {
          if (flag) {
            item.filter = filterStr
          }
          item.filterConditions = obj
          this.filterConfigTableDataObj[rowId] = item // 重置数据
        }
        tempTableData.push(item) // 替换后的数据存储在临时数组中
      })
      this.filterConfigTableData = tempTableData // 临时数组重新复制给表格数据
    },
    changeInputTypeNameValue (value) { // 筛选配置→属性二→文本输入值
      let tempSqlStr = ''
      if (this.inputTypeNameQueryType === '1') {
        tempSqlStr = 'like \'%' + value + '%\'' // 模糊查询
      } else if (this.inputTypeNameQueryType === '2') {
        tempSqlStr = ' = \'' + value + '\'' // 精确查询
      }
      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameValue = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], value, true)
    },
    changeInputTypeNameQueryType (value) { // 筛选配置→属性二→文本输入值的查询类型
      let tempSqlStr = ''
      if (value === '1') {
        tempSqlStr = 'like \'%' + this.inputTypeNameValue + '%\'' // 模糊查询
      } else if (value === '2') {
        tempSqlStr = '= \'' + this.inputTypeNameValue + '\'' // 精确查询
      }

      let expressionId = this.expressionData['attrTwoRadio']
      this.resetAttrTwoDefaultData(false)
      this.inputTypeNameQueryType = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.inputTypeNameValue
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = this.inputTypeNameValue
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], this.inputTypeNameValue, true)
    },
    changeAttrOneRadio (value) { // 筛选配置→属性二
      let expressionId = this.expressionData['attrOneRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrOneRadio = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    changeStandardSelectValue (value) { // 筛选配置→属性二→标准→下拉框
      let expressionId = this.expressionData['attrOneRadio'][this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag']][value]
      this.resetAttrOneDefaultData(false, false)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    blurStandardMinValue (event) { // 筛选配置→属性三→标准→文本框最小值→失去焦点
      if (parseFloat(this.standardMinValue).toString() === 'NaN') {
        this.alertTitle = '参数1不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
    },
    changeStandardMinValue (value) { // 筛选配置→属性二→标准→文本框最小值
      const minStrArr = ['等于', '不等于', '小于', '小于等于', '大于', '大于等于']
      const minSymbolArr = ['=', '!=', '<', '<=', '>', '>=']
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
      if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
        tempSqlType = columnName
      } else {
        tempSqlType = 'g' + columnIndex
      }
      if (parseInt(this.standardSelectValue) < 7) {
        if (value !== '') { // 每次选择下拉框时都会触发最大值和最小值的改变，在这里判断最小值不为空时显示条件值
          tempStr = minStrArr[parseInt(this.standardSelectValue) - 1] + ' ' + this.$util.dealInputNumValue(value) // 拼接过滤条件值
          tempSqlStr = 'cast(' + tempSqlType + ' as double) ' + minSymbolArr[parseInt(this.standardSelectValue) - 1] + ' ' + this.$util.dealInputNumValue(value)
        }
      } else if (this.standardMaxValue !== '') {
        if (this.standardSelectValue === '7') {
          tempStr = this.$util.dealInputNumValue(value) + '<=x<=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '8') {
          tempStr = this.$util.dealInputNumValue(value) + '<=x<' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = this.$util.dealInputNumValue(value) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '9') {
          tempStr = 'x<=' + this.$util.dealInputNumValue(value) + '或x>=' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(this.standardMaxValue)
        } else if (this.standardSelectValue === '10') {
          tempStr = 'x<' + this.$util.dealInputNumValue(value) + '或x>' + this.$util.dealInputNumValue(this.standardMaxValue)
          tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(this.standardMaxValue)
        }
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.$util.dealInputNumValue(value)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurStandardMaxValue (event) { // 筛选配置→属性三→标准→文本框最大值→失去焦点
      if (!this.$util.isDefine(this.standardMinValue)) {
        this.alertTitle = '请输入参数1'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (parseFloat(this.standardMaxValue).toString() === 'NaN') {
        this.alertTitle = '参数2不是有效数值'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (this.standardSelectValue === '7' || this.standardSelectValue === '8') {
        if (this.$util.dealInputNumValue(this.standardMinValue) === this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能等于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }

        if (this.$util.dealInputNumValue(this.standardMinValue) > this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能小于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
      if (this.standardSelectValue === '9' || this.standardSelectValue === '10') {
        if (this.$util.dealInputNumValue(this.standardMinValue) === this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数2不能等于参数1'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }

        if (this.$util.dealInputNumValue(this.standardMinValue) < this.$util.dealInputNumValue(this.standardMaxValue)) {
          this.alertTitle = '参数1不能小于参数2'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
    },
    changeStandardMaxValue (value) { // 筛选配置→属性二→标准→文本框最大值
      let tempStr = ''
      let tempSqlStr = ''
      let tempSqlType = ''
      let columnIndex = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['resultColumnIndex']
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let dataSourceName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['dataSourceName']
      if (this.$util.isDefine(columnName) && this.$util.isDefine(dataSourceName) && dataSourceName === 'kudu_weather') {
        tempSqlType = columnName
      } else {
        tempSqlType = 'g' + columnIndex
      }
      if (this.standardSelectValue === '7') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<=x<=' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '8') {
        tempStr = this.$util.dealInputNumValue(this.standardMinValue) + '<=x<' + this.$util.dealInputNumValue(value)
        tempSqlStr = this.$util.dealInputNumValue(this.standardMinValue) + ' <= cast(' + tempSqlType + ' as double) and  cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '9') {
        tempStr = 'x<=' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>=' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) <= ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) >= ' + this.$util.dealInputNumValue(value)
      } else if (this.standardSelectValue === '10') {
        tempStr = 'x<' + this.$util.dealInputNumValue(this.standardMinValue) + '或x>' + this.$util.dealInputNumValue(value)
        tempSqlStr = 'cast(' + tempSqlType + ' as double) < ' + this.$util.dealInputNumValue(this.standardMinValue) + ' or  cast(' + tempSqlType + ' as double) > ' + this.$util.dealInputNumValue(value)
      }
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = this.$util.dealInputNumValue(value)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeAttrSixRadio (value) { // 筛选配置→属性六
      let expressionId = this.expressionData['attrSixRadio'][value]
      this.isSubmit = false // 设置禁止提交状态
      this.attrSixRadio = value
      this.resetAttrSixDefaultData(false)
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = expressionId
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioValue'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['attrRadioFlag'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], '', true)
    },
    blurAccordDayStartDate (event) {
      if (!this.$util.isDefine(this.accordDayStartDate)) { // 点击开始日期后没有选择值
        this.alertTitle = '请选择开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }

      if (this.accordDayEndDate) { // 存在结束日期
        if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime()) {
          this.alertTitle = '开始日期不能等于结束日期'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
        if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
          this.alertTitle = '结束日期不能早于开始日期'
          this.isSubmit = false
          return false
        } else {
          this.isSubmit = true
          this.alertTitle = ''
        }
      }
    },
    changeAccordDayStartDate (value) { // 筛选配置→属性六→按天→开始日期
      let tempStr = ''
      if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
        tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
      }
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss.S') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss.S') + '\''
      this.accordDayStartDate = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueOne'] = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss.S')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    blurAccordDayEndDate (event) {
      if (!this.$util.isDefine(this.accordDayStartDate)) { // 直接设置结束日期没有设置开始日期
        this.alertTitle = '请选择开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (!this.$util.isDefine(this.accordDayEndDate)) { // 点击开始日期但是没有选择值
        this.alertTitle = '请选择结束日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (new Date(this.accordDayStartDate).getTime() === new Date(this.accordDayEndDate).getTime()) {
        this.alertTitle = '开始日期不能等于结束日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
      if (new Date(this.accordDayStartDate).getTime() > new Date(this.accordDayEndDate).getTime()) {
        this.alertTitle = '结束日期不能早于开始日期'
        this.isSubmit = false
        return false
      } else {
        this.isSubmit = true
        this.alertTitle = ''
      }
    },
    changeAccordDayEndDate (value) { // 筛选配置→属性六→按天→结束日期
      let tempStr = ''
      if (this.$util.isDefine(this.accordDayStartDate) && this.$util.isDefine(this.accordDayEndDate)) {
        tempStr = this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss') + '~' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss')
      }
      let columnName = this.filterConfigTableDataObj[this.currentFilterConfigRowId]['columnName']
      let tempSqlStr = columnName + ' >= \'' + this.$moment(this.accordDayStartDate).format('YYYY-MM-DD HH:mm:ss.S') + '\' and ' + columnName + ' < \'' + this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss.S') + '\''
      this.accordDayEndDate = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['paramValueTwo'] = this.$moment(this.accordDayEndDate).format('YYYY-MM-DD HH:mm:ss.S')
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = tempSqlStr
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = tempStr
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], tempStr, true)
    },
    changeNotHotWordsSearchValue (value) { // 筛选配置→属性七→下拉框
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrSevenRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], value, true)
    },
    changeHotWordsSearchValue (value) { // 筛选配置→属性八→下拉框
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['operatordId'] = this.expressionData['attrEightRadio']
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['selectValueOne'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['condition'] = value
      this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions']['filterName'] = value
      this.resetFilterTableConditionsData(this.currentFilterConfigRowId, this.filterConfigTableDataObj[this.currentFilterConfigRowId]['filterConditions'], value, true)
    },
    addNewFileParams () { // 组装提交新建需要的参数
      let filterParamsObj = {}
      let filterArr = []
      let notNullArr = []
      let tableIndexArr = []
      let dataSourceNameArr = []
      if (this.filterConfigTableData.length > 0) {
        this.filterConfigTableData.forEach((item, index) => { // 处理提交参数
          if (item.type !== '4' && this.$util.isNotEmptyObject(item.filterConditions)) {
            filterArr.push(item.filterConditions)

            if (this.$util.isDefine(item.dataSourceName)) {
              dataSourceNameArr.push(item.dataSourceName)
            }

            if (this.$util.isDefine(item.resultColumnIndex) && this.$util.isDefine(item.resultTableIndex)) { // 分析参数
              notNullArr.push('g' + item.resultColumnIndex)
              tableIndexArr.push(item.resultTableIndex)
            }

            if (this.$util.isDefine(item.columnName)) {
              // 如果节点的dataSourceName的值不为'hive_vw_snapshot_flight_info_parquet'，notNull的参数就是dataSourceName.columnName
              if (item.dataSourceName !== 'hive_vw_snapshot_flight_info_parquet' && this.$util.isDefine(item.dataSourceName)) {
                notNullArr.push(item.dataSourceName + '.' + item.columnName)
              } else {
                notNullArr.push(item.columnName)
              }
            }

            if (!this.$util.isDefine(item.filter)) {
              this.isSubmit = false // 只要参数条件有一个为空，则不能提交
            }
          } else {
            if (!this.$util.isDefine(item.filter) || !this.$util.isNotEmptyObject(item.filterConditions)) {
              this.isSubmit = false // 只要参数条件有一个为空，则不能提交
            }
          }
        })
        notNullArr = notNullArr.join(',')
        tableIndexArr = tableIndexArr.join(',')
        dataSourceNameArr = this.$util.distinctArray(dataSourceNameArr).join(',')
        filterParamsObj = {filterArr: filterArr, notNullArr: notNullArr, tableIndexArr: tableIndexArr, dataSourceNameArr: dataSourceNameArr}
        console.log('addNewFileParams~~filterParamsObj:', JSON.stringify(filterParamsObj))
      } else {
        this.$message({
          message: '请选择筛选条件！',
          type: 'warning'
        })
        return false
      }

      if (this.pageMenuType === 'Drilldown') { // 钻取
        if (this.isSubmit) {
          this.$bus.$emit('editFilterParamsHandle') // 切换效果关闭当前页面显示钻取页面
          this.$bus.$emit('addNewFileParamsHandle', filterParamsObj) // 将选择的条件显示到钻取页面
        } else {
          this.$message({
            message: '筛选条件输入有误！',
            type: 'warning'
          })
          return false
        }
      } else if (this.pageMenuType === 'AddSubline') { // 辅助线
        if (this.isSubmit) {
          this.resubmitAnalysisParams(filterParamsObj)
        } else {
          this.$message({
            message: '筛选条件输入有误！',
            type: 'warning'
          })
          return false
        }
      }
    },
    resubmitAnalysisParams (paramsObj) { // 重新提交分析参数
      let isAddGuide = false // 是否是数值类型的添加辅助线
      let submitAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.submitAnalysisParams))

      if (this.$util.isNotEmptyObject(submitAnalysisParams)) {
        let newFilterArr = paramsObj.filterArr
        let tempNotNullStr = paramsObj.notNullArr
        let tempTableIndexStr = paramsObj.tableIndexArr
        let dataSourceNameStr = paramsObj.dataSourceNameArr
        let axisOneColumnType = submitAnalysisParams.axisOneColumnType // 轴的值类型
        let axisOneTreeType = submitAnalysisParams.axisOneTreeType // 轴类型

        if (this.$util.isDefine(axisOneTreeType) && (axisOneTreeType === '3' || axisOneTreeType === '4' || (axisOneTreeType === '7' && axisOneColumnType === 'NUMBER') || (axisOneTreeType === '8' && axisOneColumnType === 'NUMBER'))) {
          let tempSublineAnalysisParams = this.$store.state.analysisResultAllData.sublineAnalysisParams
          let tempArr = []
          if (this.$util.isNotEmptyObject(tempSublineAnalysisParams)) { // 数值类型的辅助线第二次添加
            let sublineAnalysisParams = JSON.parse(JSON.stringify(this.$store.state.analysisResultAllData.sublineAnalysisParams))
            tempArr = sublineAnalysisParams.filterList
          } else { // 数值类型的辅助线第一次添加
            tempArr.push(submitAnalysisParams.filter)
          }
          if (newFilterArr.length > 0) { // 把刚刚临时存储过滤条件参数的数组，临时存储的notNull的值，临时存储的tableIndex的值，重新赋值给已经提交过得分析参数，然后再次提交数据
            tempArr.push(newFilterArr)
          }
          submitAnalysisParams.filterList = tempArr
          isAddGuide = true // 数值类型的添加辅助线
          delete submitAnalysisParams.filter
        } else {
          if (newFilterArr.length > 0) { // 把刚刚临时存储过滤条件参数的数组，临时存储的notNull的值，临时存储的tableIndex的值，重新赋值给已经提交过得分析参数，然后再次提交数据
            submitAnalysisParams.filter = newFilterArr
          } else {
            submitAnalysisParams.filter = []
          }
        }

        if (this.$util.isDefine(tempNotNullStr)) {
          submitAnalysisParams.notNull = tempNotNullStr + ',' + submitAnalysisParams.notNull
        } else {
          submitAnalysisParams.notNull = submitAnalysisParams.notNull
        }

        if (this.$util.isDefine(tempTableIndexStr)) {
          submitAnalysisParams.tableIndex = tempTableIndexStr + ',' + submitAnalysisParams.tableIndex
        } else {
          submitAnalysisParams.tableIndex = submitAnalysisParams.tableIndex
        }

        if (this.$util.isDefine(dataSourceNameStr)) {
          let tempStr = dataSourceNameStr + ',' + submitAnalysisParams.dataSourceName
          let tempStrArr = tempStr.split(',')
          submitAnalysisParams.dataSourceName = this.$util.distinctArray(tempStrArr).join(',')
        } else {
          submitAnalysisParams.dataSourceName = submitAnalysisParams.dataSourceName
        }

        submitAnalysisParams.isGuide = '1' // 1表示添加辅助线
        console.log('addSublineComponent@submitAnalysisParams:', JSON.stringify(submitAnalysisParams))
        this.dialogSublineVisible = false
        this.$bus.$emit('submitNewFileDataHandle', submitAnalysisParams, 'addSublineComponent', isAddGuide) // 调用提交新建方法，此方法在Manager.vue中, 第三个参数表示从哪个功能提交的
      }
    }
  }
}
</script>
<style scoped>
.file-new-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.file-new-left {
  position: relative;
  width: 20%;
  height: 100%;
  border-right: 1px solid #DDDDDD;
}
.file-new-left-tree {
  overflow: auto;
  height: 90%;
}
.file-new-left-tree::-webkit-scrollbar{
   width: 8px;
  height: 8px;
}
.file-new-left-tree::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cccccc;
}
.file-new-middle {
  position: relative;
  width: 80%;
  height: 100%;
}
.flex-new-top {
  border-bottom: 1px solid #DDDDDD;
}
.file-new-content {
  position: relative;
  border-right: 1px solid #DDDDDD;
  width: 70%;
  height: 100%;
}
.file-new-content .el-tabs.el-tabs--top {
  display: flex;
  flex-direction: column;
  flex: 1;
}
/* .file-new-content >>> .el-tabs__header.is-top {
  height: 50px;
} */
.file-new-content >>> .el-tabs__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.file-new-content >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
}
.filter-config-table {
  display: flex;
  flex: 1;
}
.filter-config-pagination{
  padding: 24px 10px 24px 0;
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.file-new-right{
  position: relative;
  width: 30%;
  height: 100%;
  overflow: auto;
}
.file-new-bottom {
  position: relative;
  width: 100%;
  height: 70px;
}

.file-new-bottom  button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  color: #FFFFFF;
  background: #437ACF;
  border-radius: 4px;
  line-height: 22px;
  width: 126px;
  height: 34px;
}
.row-icon-group{
  display: none;
}
.standardRadio {
  width: 240px;
}
.standardRadio > .el-select {
  display: block;
}
.file-name {
  width: 50px;
}
</style>
