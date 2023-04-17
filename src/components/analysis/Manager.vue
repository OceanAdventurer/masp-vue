<template>
  <div class="manager df df-fd-r df-jc-fs">
    <div class="analysis-tab-left cm_tab_file_new_left df df-fd-c df-jc-sb">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="analysis-tab-tree df df-fd-r df-f1">
        <el-tree
          node-key="ID"
          :highlight-current="true"
          ref="managerTreeRef"
          :props="defaultProps"
          :data="managerTreeData"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="managerTreeNodeHandleClick">
        </el-tree>
      </div>
    </div>
    <div class="analysis-tab-content cm_tab_file_new_main df df-fd-c">
      <div class="manager-table df df-fd-r" id="managerTableRef">
        <el-table
          ref="managerTableCon"
          :data="managerTableData"
          height="100%"
          width="100%"
          highlight-current-row
          fit
          :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName">
          <el-table-column prop="NAME" label="名称" width="auto" align="left"></el-table-column>
          <el-table-column prop="TYPE" label="分析类型" width="90" align="left"></el-table-column>
          <el-table-column prop="modelState" label="模型状态" width="90" align="left">
            <template slot-scope="scope">
              <div>
                {{scope.row.modelState || '待提交'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CREATETIME" label="修改日期" align="left" width="160"></el-table-column>
          <el-table-column label="操作" width="180" align="left">
            <template slot-scope="scope">
              <div class="row-icon-group">
                <div class="icon-edit tab-icon-set mr10" title="编辑分析" v-show="scope.row.modelState == '' || scope.row.modelState == '待审批'" @click="managerRowEdit(scope.row)"></div>
                <div class="icon-view tab-icon-set mr10" title="查看分析" @click="managerRowView(scope.row)"></div>
                <div class="icon-copy tab-icon-set mr10" title="复制分析" @click="managerRowCopy(scope.row)"></div>
                <div class="el-icon-upload tab-icon-set mr10" title="发布分析" v-show="scope.row.modelState == ''" @click="managerRowPublish(scope.row)"></div>
                <div class="el-icon-view tab-icon-set mr10" title="审批详情" v-show="scope.row.modelState !== '' && scope.row.modelState !== '待提交'" @click="managerRowDetail(scope.row)"></div>
                <div class="icon-delete tab-icon-set mr10" title="删除分析" v-show="scope.row.modelState == '' || scope.row.modelState == '待提交'" @click="managerRowDelete(scope.$index, managerTableData)"></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="pagination df df-fd-r df-jc-fe">
        <el-pagination
          background
          :page-size="this.pageSize"
          :pager-count="this.pagerCount"
          :total="this.totalCount"
          layout="prev, pager, next, total">
        </el-pagination>
      </div> -->
    </div>

    <div class="event-dialog">
      <el-dialog :close-on-click-modal="false" title="新建事件分析" :visible.sync="dialogEventVisible" @open="openEventDialog">
        <div class="event-dialog-content">
          <div class="search-box">
            <el-input placeholder="请输入..." size="small" v-model="eventTreeKeyword" @keyup.enter.native="getEventTreeData">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getEventTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
            </el-input>
          </div>

          <div class="tree-content">
            <el-tree
              node-key="ID"
              :highlight-current="true"
              ref="eventTreeRef"
              :props="defaultProps"
              :data="eventTreeData"
              :default-expanded-keys="eventDefaultExpandedKeys"
              :default-expand-all="false"
              :render-content="renderEventContent"
              @node-click="eventTreeNodeHandleClick">
            </el-tree>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeEventDialog()">取  消</el-button>
          <el-button type="primary" size="mini" @click="assemblyEventParams()">确  定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="publish_dia">
      <el-dialog :close-on-click-modal="false" title="发布信息" :visible.sync="publishDiaShow">
        <div class="publish_dialog_content" style="max-height: 350px;overflow: auto">
          <el-form ref="publishDiaRef" :model= "publishInfoForm" :rules="publishInfoRules" label-width="80px" label-position='right'>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="分析名称" prop="modelName" width='350'>
                  <el-input v-model="publishInfoForm.modelName" disabled  v-if="publishInfoForm.modelState === '待提交'"></el-input>
                  <span v-else>{{publishInfoForm.modelName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='12'>
                <el-form-item label="模型分类" prop="categoryType">
                  <el-select v-model="publishInfoForm.categoryType" v-if="publishInfoForm.modelState === '待提交'">
                    <el-option
                      v-for="item in typeList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                  <span v-else>{{typeList.find(item => item.code === publishInfoForm.categoryType) && typeList.find(item => item.code === publishInfoForm.categoryType).name || ''}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注" prop="explain" v-show="publishInfoForm.modelState ==='待提交' || optTypeLabel === '驳回'">
              <el-input type="textarea"
                :rows="3"
                v-model.trim="publishInfoForm.explain"
                clearable
                placeholder="请输入发布原因，有效期等信息"/>
            </el-form-item>
            <el-row style='padding-top: 15px' v-if="workFlow.length > 0">
              <el-card
                style='margin-bottom: 5px'
                v-for="(activity, index) in workFlow"
                :key="index"
              >
                <h4>操作类型：{{activity.optTypeLabel}}</h4>
                <p>{{activity.optTypeLabel === '提交' ? '备注：' : '意见：' }}{{activity.explain}}</p>
                <p>处理人：{{activity.optUser}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 处理时间：{{activity.optTime}}</p>
              </el-card>
            </el-row>
            <el-form-item label="提交人" prop="submitBy" v-show="publishInfoForm.modelState === '待提交' || optTypeLabel === '驳回'">
              <span>{{publishInfoForm.submitBy}}</span>
            </el-form-item>
            <el-form-item label="提交时间" prop="submitTime" v-show="publishInfoForm.modelState === '待提交' || optTypeLabel === '驳回'">
              <span>{{publishInfoForm.submitTime}}</span>
              <!-- <el-date-picker v-model="publishInfoForm.subTime" format='yyyy-MM-dd' type="date" disabled></el-date-picker> -->
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="managerRowPublish('publishDiaRef')">取  消</el-button>
          <el-button type="primary" size="mini" v-if="publishInfoForm.modelState === '待提交'" @click="handlerPublish('publishDiaRef', 'close')">发布</el-button>
          <el-button type="primary" size="mini" v-else @click="publishDiaShow=false">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'

export default {
  name: 'Manager',
  data () {
    return {
      // modelState: '待提交' // 模型的审批状态 待提交、待审批、待办理、已审批、已上线、已下线
      managerTreeData: [], // 树状数据
      treeKeyword: '',
      defaultProps: { // 树节点默认的属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      managerTableData: [], // 表格数据
      currentTreeId: '', // 当前节点编号
      pageSize: 10, // 每页显示条目数
      pagerCount: 11, // 页码按钮的数量
      totalCount: 0, // 总条目数
      createTimeWidth: 'auto',
      managerTableWidth: 0,
      isAddTreeNode: false,
      defaultExpandedKeys: [],
      currentEditNodeName: '', // 当前正在编辑的节点名字
      dialogEventVisible: false,
      eventTreeData: [],
      eventTreeKeyword: '',
      eventDefaultExpandedKeys: [],
      eventName: '',
      eventStoreObj: {},
      typeList: [],
      publishInfoForm: {
        modelName: '', // 模型名称
        categoryType: '', // 类型
        explain: '', // 备注备注
        submitTime: '', // 提交日期
        submitBy: '',
        modelId: '',
        modelState: '待提交'
      },
      publicParmas: {}, // 审批列表跳过来的参数
      publishDiaShow: false,
      publishInfoRules: {
        categoryType: [
          { required: true, message: '请选择模型分类', trigger: 'blur' }
        ],
        explain: [
          { required: true, message: '请填写备注栏', trigger: 'blur' }
        ]
      },
      auditInfo: [], // 审批流程
      treeNode: '',
      treeType: '',
      treeName: '',
      workFlow: [],
      optTypeLabel: '待提交'
    }
  },
  watch: {
    // treeKeyword (val) { // 树节点关键字
    //   console.log('treeKeyword:', val)
    //   this.$refs.managerTreeRef.filter(val)
    // },

    // treeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTreeData()
    //   }
    // },
    managerTableData () { // 在新建分析中增加分析时，分析管理页面数据增加时修改表格的宽度
      let elMainWidth = document.getElementById('elMain').clientWidth
      let ctWidth = parseInt(elMainWidth - (elMainWidth * 0.2) - 450).toString()
      this.createTimeWidth = ctWidth
    },
    managerTableWidth (newVal, oldVal) { // 在分析管理页面监控表格的宽度的变化
      console.log(newVal, oldVal)
      if (this.$util.isDefine(newVal) && this.$util.isDefine(oldVal) && newVal !== oldVal) {
        let ctWidth = parseInt(newVal - 450).toString()
        this.createTimeWidth = ctWidth
      }
    }
  },
  mounted () {
    this.$nextTick(() => { // 整个视图渲染完毕后加载数据
      this.getTreeData() // dom渲染完毕后加载数据
      this.setManagerTableWidth() // 设置表格的宽度
      this.getTypeList()
    })
    const that = this
    this.$bus.$on('reloadGetAnalysisRecord', () => {
      that.reloadGetAnalysisRecord()
    })
    this.$bus.$on('resetManagerTableWidth', () => {
      that.setManagerTableWidth()
    })
    this.$bus.$on('submitNewFileDataHandle', (params, type) => { // 从其他地方调用提交新建分析数据的方法;
      that.submitNewFileDataPublicMethods(params, type)
    })
    this.$bus.$on('logBackInHandle', (data) => {
      that.logBackIn(data)
    })
    this.$bus.$on('openEventDialogHandle', (pdata, cdata) => {
      that.openEventDialog(pdata, cdata)
    })
    this.$bus.$on('sendToManager', obj => {
      if (obj.treeName) {
        this.currentTreeId = obj.treeNode
        let nodeObj = {
          ID: obj.treeNode,
          TREETYPE: obj.treeType,
          NAME: obj.treeName,
          modelName: obj.name,
          type: obj.type
        }
        this.managerTreeNodeHandleClick(nodeObj)
        this.publicParmas = nodeObj
      }
    })
    // document.getElementById('managerTableRef').addEventListener('click', // 点击表格时重新设置表格的宽度
    //   function (e) {
    //     setTimeout(() => {
    //       that.managerTableWidth = document.getElementById('managerTableRef').clientWidth
    //     }, 50)
    //   }
    // )

    // document.getElementById('app').addEventListener('click', // 点击logo时重新设置表格的宽度
    //   function (e) {
    //     let currentClassName = e.target.className
    //     if (currentClassName.indexOf('headerLogo') > -1) {
    //       setTimeout(() => {
    //         that.managerTableWidth = document.getElementById('managerTableRef').clientWidth
    //       }, 50)
    //     }
    //   }
    // )
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('reloadGetAnalysisRecord') // 移除自定义事件监听器。
    this.$bus.$off('resetManagerTableWidth') // 移除自定义事件监听器。
    this.$bus.$off('submitNewFileDataHandle') // 移除自定义事件监听器。
    this.$bus.$off('openEventDialogHandle') // 移除自定义事件监听器。
    this.$bus.$off('logBackInHandle') // 移除自定义事件监听器。
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    managerRowView (row) { // 重新提交新建分析参数
      if (this.$util.isDefine(row.CONTENT) && this.$util.isNotEmptyObject(row.CONTENT)) {
        let flag = false
        if (row.CONTENT.filter.length > 0) {
          let filters = row.CONTENT.filter
          filters.forEach((item, index) => {
            // if (this.$util.isDefine(item.operatordId)) {
            //   if (this.$util.isNotEmptyObject(item.operatordId) && !this.$util.isDefine(item.condition)) {
            //     flag = true
            //   }
            // } else {
            //   flag = true
            // }
            if (!this.$util.isDefine(item.condition)) {
              flag = true
            }
          })
        }
        if (flag) {
          this.$message.error('参数信息有误，数据提交失败！')
        } else {
          this.$store.commit('ANALYSIS_PARAMS_ID', row.ID) // 保存生成的编号，fdv图表显示查询使用

          if (this.$util.isDefine(row.CONTENT.event_profile) && this.$util.isNotEmptyObject(row.CONTENT.event_profile)) {
            this.$store.commit('EVENT_STORE_DATA', row.CONTENT.event_profile)
          } else {
            this.$store.commit('EVENT_STORE_DATA', {})
          }

          if (this.$util.isDefine(row.CONTENT.dhbParamObj) && this.$util.isNotEmptyObject(row.CONTENT.dhbParamObj) && this.$util.isDefine(row.CONTENT.dhbParamObj.gpID)) {
            this.submitNewFileDataPublicMethods(row.CONTENT, 'newFileDhbComponent')
          } else {
            this.submitNewFileDataPublicMethods(row.CONTENT, 'newFileComponent')
          }
        }
      } else {
        this.$message.error('参数信息有误，数据提交失败！')
      }
    },
    setManagerTableWidth () {
      // setTimeout(() => {
      //   if (document.getElementById('analysisManager') && document.getElementById('analysisManager').style.display !== 'none') {
      //     let elMainWidth = document.getElementById('elMain').clientWidth
      //     this.managerTableWidth = elMainWidth - elMainWidth * 0.2

      //     this.$refs.managerTableCon.doLayout()
      //     console.log('elMainWidth----@@@@@:' + elMainWidth, 'managerTableWidth@@@@@:' + this.managerTableWidth)
      //   }
      // }, 50)
    },
    managerRowEdit (row, type) { // 重新编辑新建分析参数
      console.log('edit', row)
      if (this.$util.isDefine(row.CONTENT) && this.$util.isNotEmptyObject(row.CONTENT)) {
        this.$store.commit('ANALYSIS_PARAMS_ID', row.ID) // 保存生成的编号，fdv图表显示查询使用

        if (this.$util.isDefine(row.CONTENT.event_profile) && this.$util.isNotEmptyObject(row.CONTENT.event_profile)) {
          this.$store.commit('EVENT_STORE_DATA', row.CONTENT.event_profile)
        } else {
          this.$store.commit('EVENT_STORE_DATA', {})
        }
      }
      row.CONTENT.fileNewName = row.NAME
      this.$store.commit('ANALYSIS_PARAMS', row) // 子集配置参数存放到store中，newFile.vue初始化需要

      if (this.$util.isDefine(row.CONTENT.event_profile) && this.$util.isNotEmptyObject(row.CONTENT.event_profile)) {
        this.$bus.$emit('analysisAddTab', {enName: 'analysis_event_file_new', zhName: row.CONTENT.fileNewName, isClosable: true, parent: 'analysis_file', count: 0})
      } else if (this.$util.isDefine(row.CONTENT.dhbParamObj) && this.$util.isNotEmptyObject(row.CONTENT.dhbParamObj)) {
        this.$bus.$emit('analysisAddTab', {enName: 'analysis_dhbcsdb', zhName: row.CONTENT.fileNewName, isClosable: true, parent: 'analysis_file', count: 0})
      } else {
        this.$bus.$emit('analysisAddTab', {enName: 'analysis_file_new', zhName: row.CONTENT.fileNewName, isClosable: true, parent: 'analysis_file', count: 0, type: row.TYPE}, type)
      }
      this.publicParmas = {}
    },
    auditingInfo (id) {
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        url: '/modelMotion/showModelApproveDetail',
        method: 'get',
        params: {
          modelId: id
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            // const {optUser, optTime} = res.data[0]
            // this.publishInfoForm = res.data[0] || []
            this.optTypeLabel = res.data[0].optTypeLabel
            this.publishInfoForm.explain = res.data.find(item => item.optTypeLabel === '提交').explain
            this.publishInfoForm.submitBy = res.data[0].optUser
            this.publishInfoForm.submitTime = res.data[0].optTime
            this.publishInfoForm.categoryType = res.data[0].categoryType
            this.publishInfoForm.categoryName = res.data[0].categoryName
            this.publishInfoForm.modelName = res.data[0].modelName
            this.publishInfoForm.modelId = res.data[0].modelId
            this.workFlow = res.data
          } else {
            this.workFlow = []
          }
        }
        this.$store.commit('HIDE_LOADING', '加载中！')
      }).catch(err => {
        this.$store.commit('HIDE_LOADING', '加载中！')
        console.log(err)
      })
    },
    handlerPublish (refName) { // 提交发布
      this.$refs['publishDiaRef'].validate(valid => {
        if (valid) { // 查询table数据
          this.$store.commit('SHOW_LOADING', '加载中...')
          let obj = this.publishInfoForm
          obj.treeNode = this.treeNode
          obj.treeType = this.treeType
          obj.treeName = this.treeName
          this.$axios({
            url: '/modelMotion/submit',
            method: 'post',
            data: obj
          }).then(res => {
            if (res.status === 200 && res.data.result) {
              if (res.data.massage === '模型提交错误，当前状态：待审批') {
                this.$message.error(res.data.message)
              } else {
                this.publishDiaShow = false
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$refs[refName].resetFields()
                this.getAnalysisRecord(this.currentTreeId) // 重新查询子集数据
                this.publishInfoForm = {}
                this.treeNode = ''
                this.treeType = ''
                this.treeName = ''
                this.optTypeLabel = ''
              }
            } else {
              this.$message.error(res.data.message)
            }
            if (this.$refs['publishDiaRef']) this.$store.commit('HIDE_LOADING', '加载中！')
          }).catch(err => {
            this.$store.commit('HIDE_LOADING', '加载中！')
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    managerRowPublish (row) { // 发布模型分析弹窗
      this.publishInfoForm = {}
      this.workFlow = []
      if (this.$refs['publishDiaRef']) this.$refs['publishDiaRef'].resetFields()
      if (row) {
        this.publishInfoForm.modelName = row.NAME
        this.publishInfoForm.modelId = row.ID
        this.publishInfoForm.modelState = row.modelState || '待提交'
      }

      let userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo')) || {}
      this.publishInfoForm.submitBy = userInfo.userName
      const year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      this.publishInfoForm.submitTime = year + '-' + month + '-' + date // 提交日期
      this.publishDiaShow = !this.publishDiaShow
    },
    managerRowDetail (row) {
      this.auditingInfo(row.ID)
      this.publishInfoForm.modelState = row.modelState
      this.publishDiaShow = true
    },
    getTypeList () {
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        url: '/modelMotion/getModelCategory',
        method: 'get'
        }).then(res => {
        if (res.status === 200) {
          let list = res.data || []
          this.typeList = list
        } else {
          this.$message.error('操作失败，请稍后重试！')
        }
        this.$store.commit('HIDE_LOADING', '加载中！')
      }).catch(err => {
        console.log(err)
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    managerRowCopy (row) {
      console.log('copy', row)
       if (this.$util.isDefine(row.CONTENT) && this.$util.isNotEmptyObject(row.CONTENT)) {
        this.$store.commit('COPY_ANALYSIS_PARAMS_ID', row.ID)

        let hideMenuObj = JSON.parse(JSON.stringify(this.$store.state.managerHideMenu))
        // hideMenuObj['tree_node_paste'] = true
        hideMenuObj.tree_node_paste = true

        let disabledMenuObj = JSON.parse(JSON.stringify(this.$store.state.managerDisabledMenu))
        // disabledMenuObj['tree_node_paste'] = false
        disabledMenuObj.tree_node_paste = false

        this.$bus.$emit('openHeaderMenuItem', 'analysis_file', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
      }
    },
    managerRowDelete (index, rows) { // 删除行
      this.deleteAnalysisRecord(index, rows)
    },
    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.getTreeData()
      }
    },
    searchTreeData (flag) { // 搜索树
      // if (flag === 'treeKey' && this.treeKeyword === '') { // 目前输入关键字是基于组件自带的搜索功能，没有调用接口；如果没有输入关键字，直接点击搜索按钮，则是刷新整个树
      //   this.getTreeData() // 加载树数据
      // }
      this.getTreeData()
    },
    filterManagerTreeNode (value, data) { // 树节点过滤
      console.log('filterManagerTreeNode:', value, data)
      if (!value) return true
      try {
        let tempName = data.NAME + ',' + data.LIKENAME
        return tempName.indexOf(value) !== -1
      } catch (e) {
        return false
      }
    },
    managerTreeNodeHandleClick (data, node, nodeCommpent) { // 树节点点击事件
      this.$store.commit('TEMP_MANAGER_TREE_NODE_ID', '')
      let hideMenuObj = {}
      let disabledMenuObj = {}
      if (!data.CHILDREN && !data.isAdd && !data.status) { // 如果不是目录,且节点不在编辑中，则点击节点时候获取分析子集数据
        this.getAnalysisRecord(data.ID)
        this.$store.commit('MANAGER_TREE_NODE_ID', data.ID) // 存放树节点编号，提交分析参数时使用
        this.treeNode = data.ID // id保存，提交发布传到后端，审批人通过id打开新建分析页面
        this.treeType = data.TREETYPE
        this.treeName = data.NAME
        hideMenuObj.analysis_file_new = true // 新建分析
        hideMenuObj.analysis_event_file_new = true // 新建事件分析
        hideMenuObj.analysis_dhbcsdb = true // 新建多航班参数对比
        hideMenuObj.tree_node_edit = true // 重命名
        hideMenuObj.tree_node_delete = true // 删除

        if (data.TREETYPE === 'USERNODE') { // 只能创建不能删除
          disabledMenuObj.analysis_file_new = false // 新建分析
          disabledMenuObj.analysis_event_file_new = false
          disabledMenuObj.analysis_dhbcsdb = false
          disabledMenuObj.tree_node_edit = true // 重命名
          disabledMenuObj.tree_node_delete = true // 删除
        } else if (data.TREETYPE === 'USERCHILDNODE') { // 可以创建可以删除
          disabledMenuObj.analysis_file_new = false // 新建分析
          disabledMenuObj.analysis_event_file_new = false
          disabledMenuObj.analysis_dhbcsdb = false
          disabledMenuObj.tree_node_edit = false // 重命名
          disabledMenuObj.tree_node_delete = false // 删除
        } else { // TREE COMMENTTREE 都不可以操作
          disabledMenuObj.analysis_file_new = true // 新建分析
          disabledMenuObj.analysis_event_file_new = true
          disabledMenuObj.analysis_dhbcsdb = true
          disabledMenuObj.tree_node_edit = true // 重命名
          disabledMenuObj.tree_node_delete = true // 删除
        }

        if (this.$util.isDefine(this.$store.state.copyAnalysisParamsId)) {
          hideMenuObj.tree_node_paste = true
          disabledMenuObj.tree_node_paste = false
        }
      } else { // 点击目录时清空分析表格
        this.managerTableData = []
        this.totalCount = 0
        this.currentTreeId = ''
        this.$store.commit('MANAGER_TREE_NODE_ID', '')

        hideMenuObj.tree_catalog_add = true // 添加分析目录
        hideMenuObj.tree_node_add = true // 添加分析节点
        // hideMenuObj.tree_node_edit = true // 重命名
        if (node.level !== 1) {
          hideMenuObj.tree_node_delete = true
        }

        // tree, commontree, usernode, userchildnode : 前两种都没有按钮  后两种有所有按钮  usernode没有删除、重命名
        if (data.TREETYPE === 'USERNODE') { // 只能创建不能删除
          disabledMenuObj.tree_catalog_add = false // 添加分析目录
          disabledMenuObj.tree_node_add = false // 添加分析节点
          disabledMenuObj.tree_node_delete = true
        } else if (data.TREETYPE === 'USERCHILDNODE') { // 可以创建可以删除
          disabledMenuObj.tree_catalog_add = false // 添加分析目录
          disabledMenuObj.tree_node_add = false // 添加分析节点
          disabledMenuObj.tree_node_delete = false
        } else { // TREE COMMENTTREE 都不可以操作
          disabledMenuObj.tree_catalog_add = true // 添加分析目录
          disabledMenuObj.tree_node_add = true // 添加分析节点
          disabledMenuObj.tree_node_delete = true
        }
      }

      this.$store.commit('MANAGER_HIDE_MENU', hideMenuObj) // 暂时存储需要修改二级菜单的值
      this.$store.commit('MANAGER_DISABLED_MENU', disabledMenuObj) // 暂时存储需要修改二级菜单的值
      this.$bus.$emit('openHeaderMenuItem', 'analysis_file', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
      this.$bus.$emit('analysisAddCatalog', data, node)
    },
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: true, // 是否显示编辑节点按钮
          isShowDelete: true, // 是否显示删除节点按钮
          isShowMore: true, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: true // 目录是否显示更多按钮
        },
        on: { // 绑定方法
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          pasteTreeNodeHandle: ((data, node) => that.pasteNodeFun(data, node)),
          delTreeNodeHandle: ((data, node) => that.deleteNodeFun(data, node)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    addNodeFun (data, node, type) { // 增加节点,且是处于编辑中
      console.log('addNodeFun:', data, node, type)
      this.isAddTreeNode = false // 先清空是否允许添加节点的标识
      let tempFlag = this.traverseTreeNode(this.managerTreeData)
      if (tempFlag) {
        this.$message({
          message: '有节点处于编辑中，请编辑完再添加!',
          type: 'warning'
        })
        return
      }

      // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
      if (!node.expanded) {
        node.expanded = true // 展开节点显示添加的节点信息
      }

      if (!data.CHILDREN) { // 如果当前节点没有存在children属性，则新增此属性，值默认为空数组
        this.$set(data, 'CHILDREN', []) // 设置数据需要用到$set，才能修改到原始数据
      }

      if (type === 'catalog') { // 目录
        setTimeout(() => {
          data.CHILDREN.push({ ID: this.$util.generateUUID(), NAME: '', CHILDREN: [], nodeType: type, TYPE: '0', TREETYPE: 'USERCHILDNODE', status: 1, isAdd: true }) // 向原始数据中添加新增加的节点数据
        }, 300)
      } else { // 节点
        setTimeout(() => {
          data.CHILDREN.push({ ID: this.$util.generateUUID(), NAME: '', nodeType: type, TYPE: '1', TREETYPE: 'USERCHILDNODE', status: 1, isAdd: true }) // 向原始数据中添加新增加的节点数据
        }, 300)
      }
    },
    editNodeFun (data, node) { // 编辑节点
      console.log('editNodeFun', data, node)
      if (!this.$store.getters.userInfo.isAdmin && data.ISCOMMON === '1') { // 非管理员不能编辑公共节点
        this.$message({
          type: 'warning',
          message: '没有权限，暂无法操作！'
        })
        return false
      }
      this.currentEditNodeName = data.NAME // 取消编辑时用
      this.$set(data, 'status', 1)
      this.$set(data, 'isAdd', false)
    },
    pasteNodeFun (data, node) {
      // /analysisRecord/copyAnalysis?sourceID=&destID=?
      console.log('pasteNodeFun@@@@:', data)

      // data.ID
      // this.$store.state.copyAnalysisParamsId

      this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
      this.$axios(
        {
          url: '/analysisRecord/copyAnalysis',
          method: 'post',
          params: {
            sourceID: this.$store.state.copyAnalysisParamsId,
            destID: data.ID
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }
      ).then(response => {
        console.log('deleteAnalysisRecordCategoryu~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: '数据复制成功！'
          })
          this.getAnalysisRecord(data.ID)
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    deleteNodeFun (data, node) { // 删除节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      if (!this.$store.getters.userInfo.isAdmin && data.ISCOMMON === '1') { // 非管理员不能删除公共节点
        this.$message({
          type: 'warning',
          message: '没有权限，暂无法操作！'
        })
        return false
      }
      this.deleteTreeData(data)
    },
    saveNodeFun (data, node) { // 保存处于编辑中的新增节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      let parentNode = this.$util.getTreeNode(this.managerTreeData, data.ID).parentNode
      // 新增数据到数据库
      if (data.isAdd) {
        if (data.nodeType === 'catalog') {
          this.addTreeData(parentNode.ID, data.NAME, '0', data.ID, data) // 执行增加节点的方法
        } else {
          this.addTreeData(parentNode.ID, data.NAME, '1', data.ID, data) // 执行增加节点的方法
        }
      } else {
        this.editTreeData(parentNode.ID, data.NAME, data.ID, data.TYPE, data)
      }
    },
    cancelNodeFun (data, node) { // 取消处于编辑中的新增节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      if (data.isAdd) { // 新增
        let parentNode = this.$util.getTreeNode(this.managerTreeData, data.ID).parentNode
        parentNode.CHILDREN.forEach((v, i) => {
          if (v.ID === data.ID) {
            parentNode.CHILDREN.splice(i, 1)
          }
        })
      } else { // 编辑
        data.NAME = this.currentEditNodeName
        this.$set(data, 'status', 0)
        this.currentEditNodeName = '' // 清空旧数据
      }
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
    getTreeData (exID) { // 获取树节点数据
      this.managerTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/analysisRecordCategory/queryAnalysisRecordCategory',
        method: 'get',
        params: {
          likeContent: this.treeKeyword
        }
      }).then(response => {
        console.log('QueryAnalysisRecordCategory~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
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
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            this.managerTreeData = resultData
          }/* else {
            this.$message({
              message: '暂无相关数据!',
              type: 'warning'
            })
          }*/

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.defaultExpandedKeys.push(expandedKey)
          } else {
            this.defaultExpandedKeys = []
          }

          if (exID) {
            this.$refs.managerTreeRef.store.nodesMap[exID].expanded = true
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        // this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    addTreeData (pid, name, type, id, treeData) { // 新增树节点数据  id:父节点的编号，name: 需要增加的节点名字, type:节点类型，1：节点 0：目录
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等!') // 打开加载提示框
      this.$axios(
        {
          url: '/analysisRecordCategory/addAnalysisRecordCategory',
          method: 'post',
          data: {
            name: name,
            parentId: pid,
            type: type,
            userId: this.$store.getters.userInfo.userId || 'DSAP' // 暂时是默认值
          },
          headers: {
            //'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            'Content-type': 'application/json;charset=UTF-8'
          }
        }
      ).then(response => {
        console.log('addAnalysisRecordCategory~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框
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
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: '数据保存成功！'
          })
          // 修改页面中tree数据
          this.$set(treeData, 'status', 0)
          this.$set(treeData, 'isAdd', false)
          // this.$set(treeData, 'TREETYPE', 'USERCHILDNODE')
          let data = response.data.result
          let parentNode = this.$util.getTreeNode(this.managerTreeData, id).parentNode
          parentNode.CHILDREN.forEach((v, i) => {
            if (v.ID === id) {
              parentNode.CHILDREN[i].ID = data.ID
            }
          })

          // this.getTreeData(data.ID)
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else { // 数据保存失败，弹出提示，更新tree数据
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    deleteTreeData (data) { // 删除树节点数据 TODO: 有子数据不能删除
      if (data.CHILDREN && data.CHILDREN.length > 0) {
        this.$message.warning('请先删除该分析目录下的分析节点！！')
      } else {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
        this.$axios(
          {
            url: '/analysisRecordCategory/deleteAnalysisRecordCategory',
            method: 'post',
            params: {
              id: data.ID,
              userId: this.$store.getters.userInfo.userId
            },
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }
        ).then(response => {
          console.log('deleteAnalysisRecordCategoryu~~~:', response)
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          if (response.data.status === '0') {
            let parentNode = this.$util.getTreeNode(this.managerTreeData, data.ID).parentNode
            parentNode.CHILDREN.forEach((v, i) => {
              if (v.ID === data.ID) {
                parentNode.CHILDREN.splice(i, 1)
              }
            })
            if (this.currentTreeId === data.ID) { // 点击后保存的节点编号和删除的节点一样时，删除保存的节点编号
              this.currentTreeId = ''
              this.$store.commit('MANAGER_TREE_NODE_ID', '') // 存放树节点编号，提交分析参数时使用
            }
            this.managerTableData = [] // 清空当前节点查询出来的数据
            this.$message({ // 数据提交成功提示
              type: 'success',
              message: '数据删除成功！'
            })
          } else if (response.data.status === 'E1001') { // 没有登录
            this.logBackIn(response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
      }
    },
    editTreeData (pid, name, id, type, data) { // 编辑树节点
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等!') // 打开加载提示框
      this.$axios(
        {
          url: '/analysisRecordCategory/editAnalysisRecordCategory',
          method: 'post',
          params: {
            name: name,
            parentId: pid,
            type: type,
            id: id,
            userId: this.$store.getters.userInfo.userName || 'DSAP' // 暂时是默认值
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }
      ).then(response => {
        console.log('editAnalysisRecordCategory~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框
        if (response.data.status === '0') {
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: '数据保存成功！'
          })
          // 修改页面中tree数据
          this.$set(data, 'status', 0)
          this.$set(data, 'isAdd', false)

          // this.getTreeData()
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getAnalysisRecord (id) { // 获取分析子集详细信息
      this.managerTableData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等!')
      this.$axios({
        url: '/analysisRecord/queryAnalysisRecord',
        method: 'get',
        params: {
          id: id,
          likeContent: this.treeKeyword
        }
      }).then(response => {
        console.log('QueryAnalysisRecord~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (resultData.length > 0) {
            resultData.forEach(item => {
              if (item.CONTENT && item.CONTENT.filter.length > 0) {
                item.CONTENT.filter.forEach(para => {
                  if (para.attrRadioFlag === '11' && para.dynamicType) { // 动态时间拼接
                    const {tempStr, tempSqlStr} = this.getTypeTime(para.dynamicType, para.dynamicTime, para.columnName)
                    para.condition = tempSqlStr
                    para.filterName = tempStr
                    para.paramValueOne = tempStr.split('~')[0]
                    para.paramValueTwo = tempStr.split('~')[1]
                  }
                })
              }
            })
            resultData.forEach(item => {
              if (item.CONTENT && item.CONTENT.filter.length > 0) {
                item.CONTENT.filter.forEach(para => {
                  if (para.attrRadioFlag === '11' && para.dynamicType) {
                    para.filterList = para.filter
                  }
                })
              }
            })
            this.managerTableData = resultData
            this.totalCount = resultData.length // 显示表格数据总条数
            this.currentTreeId = id // 存储当前点击节点的编号，修改子集时使用
            if (this.publicParmas.modelName) {
              let row = resultData.filter(item => {
                return item.NAME === this.publicParmas.modelName
              })
              if (this.publicParmas.type === 'view') {
                this.managerRowView(row[0])
              } else {
                this.managerRowEdit(row[0], 'view')
              }
            }
          } else {
            this.$message('暂无数据！')
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getTypeTime (type, time, columnName) {
      let tempStr = ''
      let tempSqlStr = ''
      let formatters = columnName === 'FLIGHT_DATE' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
      if (type === 'day') { // 以天为单位
        if (time < 0) { // 过去时间
          time = Math.abs(time)
          tempStr = this.$moment().subtract(time, 'days').format(formatters) + '~' + this.$moment().add(0, 'days').format(formatters)
          tempSqlStr = columnName + ' >= \'' + this.$moment().subtract(time, 'days').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(1, 'days').format(formatters)
        } else if (this.dynamicTime > 0) { // 未来
          tempStr = this.$moment().add(0, 'days').format(formatters) + '~' + this.$moment().add(time, 'days').format(formatters)
          tempSqlStr = columnName + ' >= \'' + this.$moment().add(0, 'days').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(time + 1, 'days').format(formatters)
        } else { // 当天
          tempStr = this.$moment().subtract(0, 'days').format(formatters)
          tempSqlStr = columnName + ' = \'' + this.$moment().subtract(0, 'days').format(formatters)
        }
      } else if (type === 'month') { // 月份
        if (time < 0) { // 前数月
          time = Math.abs(time)
          tempStr = this.$moment().subtract(time, 'months').startOf('month').format(formatters) + '~' + this.$moment().subtract(time, 'months').endOf('month').format(formatters)
          tempSqlStr = columnName + this.$moment().subtract(time, 'months').startOf('month').format(formatters) + '-' + this.$moment().subtract(time, 'months').endOf('month').format(formatters)
        } else if (time > 0) { // 未来数月
          tempStr = this.$moment().add(time, 'months').startOf('month').format(formatters) + '~' + this.$moment().add(time, 'months').endOf('month').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().add(time - 1, 'months').endOf('month').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(time + 1, 'months').startOf('month').format(formatters)
        } else { // 本月
          tempStr = this.$moment().subtract(0, 'months').startOf('month').format(formatters) + '~' + this.$moment().add(0, 'months').endOf('month').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(1, 'months').endOf('month').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(1, 'months').startOf('month').format(formatters)
        }
      } else if (type === 'year') { // 年份
        if (time < 0) { // 前数月
          time = Math.abs(time)
          tempStr = this.$moment().subtract(time, 'years').startOf('year').format(formatters) + '~' + this.$moment().subtract(time, 'years').endOf('year').format(formatters)
          // tempSqlStr = columnName + this.$moment().subtract(time, 'year').startOf('year').format(formatters) + '-' + this.$moment().subtract(time, 'year').endOf('year').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(time + 1, 'year').endOf('year').format(formatters) + '\' and ' + ' < \'' + this.$moment().subtract(time - 1, 'year').startOf('year').format(formatters)
        } else if (time > 0) { // 未来数月
          tempStr = this.$moment().add(time, 'years').startOf('year').format(formatters) + '~' + this.$moment().add(time, 'years').endOf('year').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().add(time - 1, 'year').endOf('year').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(time + 1, 'years').startOf('year').format(formatters)
        } else { // 本月
          tempStr = this.$moment().subtract(0, 'years').startOf('year').format(formatters) + '~' + this.$moment().add(0, 'years').endOf('year').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(1, 'years').endOf('year').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(1, 'years').startOf('year').format(formatters)
        }
      } else if (type === 'week') { // 周度
        if (time < 0) {
          time = Math.abs(time)
          tempStr = this.$moment().subtract(time, 'weeks').startOf('week').format(formatters) + '~' + this.$moment().subtract(time, 'weeks').endOf('week').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(time + 1, 'week').endOf('week').format(formatters) + '\' and ' + ' < \'' + this.$moment().subtract(time - 1, 'week').startOf('week').format(formatters)
        } else if (time > 0) { // 未来数周
          tempStr = this.$moment().add(time, 'weeks').startOf('week').format(formatters) + '~' + this.$moment().add(time, 'weeks').endOf('week').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().add(time - 1, 'week').endOf('week').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(time + 1, 'weeks').startOf('week').format(formatters)
        } else { // 本周
          tempStr = this.$moment().subtract(0, 'weeks').startOf('week').format(formatters) + '~' + this.$moment().add(0, 'weeks').endOf('week').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(1, 'weeks').endOf('week').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(1, 'weeks').startOf('week').format(formatters)
        }
      } else { // 季度
        if (time < 0) {
          time = Math.abs(time)
          tempStr = this.$moment().subtract(time, 'quarters').startOf('quarter').format(formatters) + '~' + this.$moment().subtract(time, 'quarters').endOf('quarter').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(time + 1, 'quarter').endOf('quarter').format(formatters) + '\' and ' + ' < \'' + this.$moment().subtract(time - 1, 'quarter').startOf('quarter').format(formatters)
        } else if (time > 0) { // 未来数周
          tempStr = this.$moment().add(time, 'quarters').startOf('quarter').format(formatters) + '~' + this.$moment().add(time, 'quarters').endOf('quarter').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().add(time - 1, 'quarter').endOf('quarter').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(time + 1, 'quarters').startOf('quarter').format(formatters)
        } else { // 本周
          tempStr = this.$moment().subtract(0, 'quarters').startOf('quarter').format(formatters) + '~' + this.$moment().add(0, 'quarters').endOf('quarter').format(formatters)
          tempSqlStr = columnName + ' > \'' + this.$moment().subtract(1, 'quarters').endOf('quarter').format(formatters) + '\' and ' + ' < \'' + this.$moment().add(1, 'quarters').startOf('quarter').format(formatters)
        }
      }
      return {tempStr, tempSqlStr}
    },
    deleteAnalysisRecord (index, rows) { // 删除分析子集的数据
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等!')
        this.$axios({
          url: '/analysisRecord/deleteAnalysisRecord',
          method: 'post',
          params: {
            id: rows[index].ID
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).then(response => {
          console.log('DeleteAnalysisRecord~~~:', response)
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          if (response.data.status === '0') {
            rows.splice(index, 1)
            this.managerTableData = rows
            this.totalCount = rows.length
            this.$message({
              type: 'success',
              message: '删除数据成功!'
            })
          } else if (response.data.status === 'E1001') { // 没有登录
            this.logBackIn(response.data)
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中')
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    addAnalysisRecord (name, treeId, content) { // 添加分析子集数据
      this.$store.commit('SHOW_LOADING', '正在提交数据，请稍等！')
      this.$axios({
        url: '/analysisRecord/addAnalysisRecord',
        method: 'post',
        data: {
          name: name,
          analysisRecordCategoryId: treeId,
          event_profile: this.$store.state.eventStoreData,
          content: content
        },
        headers: {
          //'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('AddAnalysisRecord~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        if (response.data.status === '0') {
          this.$message({
            type: 'success',
            message: '提交数据成功!'
          })
          this.getAnalysisRecord(this.currentTreeId) // 重新查询子集数据
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    editAnalysisRecord (name, treeId, content, id) { // 编辑分析子集数据
      this.$store.commit('SHOW_LOADING', '正在提交数据，请稍等！')
      this.$axios({
        url: '/analysisRecord/editAnalysisRecord',
        method: 'post',
        data: {
          name: name,
          analysisRecordCategoryId: treeId,
          content: content,
          id: id
        },
        headers: {
          // 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('EditAnalysisRecord~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        if (response.data.status === '0') {
          this.$message({
            type: 'success',
            message: '提交数据成功!'
          })
          this.getAnalysisRecord(this.currentTreeId) // 重新查询子集数据
        } else if (response.data.status === 'E1001') { // 没有登录
          this.logBackIn(response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },
    submitNewFileDataPublicMethods (params, funType) { // 提交新建分析中的数据
      console.log(123)
      this.$store.commit('SHOW_LOADING', '正在查询数据，请稍等！') // 打开加载提示框
      console.log('submitNewFileDataPublicMethods~~~:', JSON.stringify(params))
      let tempUrl = '/submit/submitAnalysis'
      if (funType === 'addSublineComponent') {
        tempUrl = '/submit/addGuide' // 添加辅助线
      }
      this.$axios({
        url: tempUrl,
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(response => {
        console.log('submitAnalysis~~~:', response)
        // if (this.$util.isNotEmptyObject(this.$store.state.eventStoreData)) {
        //   // this.$bus.$emit('addTab', 'event_store_result', '新建事件分析', 'event_store_result', 'event')
        //   this.$bus.$emit('closeEventTabFun')
        //   this.$bus.$emit('openHeaderMenuItem', 'event_store_result', {}, {})
        //   return false
        // }

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

          // 处理返回的结构，显示分析结果相关数据
          let flightInfoData = response.data.result.data.flightInfo // 航班信息数据
          let flightPageCount = response.data.result.data.pageSize // 航班分页总数
          let submitAnalysisParams = response.data.result.data.submitAnalysis // 分析参数

          let summaryData = response.data.result.data.summary // 图表数据汇总
          let tableData = response.data.result.data.tableData // 表格详情数据

          let groupPlot = response.data.result.data.groupPlot // 基本图表：柱状，折线，饼图 一轴，两轴，三轴
          let scatteredPlot = response.data.result.data.scatteredPlot // 散点图 三轴，两轴
          let candlePlot = response.data.result.data.candlePlot // 蜡烛图 只有两轴
          let barThreeAxis = response.data.result.data.bar3D // 3d柱状图
          let barStack = response.data.result.data.barStack // 堆叠图 只有三轴

          let disabledMenuObj = {} // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
          let sumAnalysis = 0 // 分析数量默认值
          let tempAnalysisResultAllDataObj = {} // 临时存储返回的数据

          // 基于事件库分析结果 解析图表数据
          if (this.$util.isNotEmptyObject(this.$store.state.eventStoreData) // &&
              // (submitAnalysisParams.axisOneTreeType === 'event' ||
              //  submitAnalysisParams.axisTwoTreeType === 'event'
              // )
          ) {
            if (this.$util.isDefine(groupPlot) &&
                groupPlot.length > 0) {
                  // if (this.$util.isDefine(submitAnalysisParams.axisThreeTreeType )&& submitAnalysisParams.axisTwoTreeType !== '3')
              if (this.$util.isNotEmptyObject(groupPlot[0].data)) {
                let tempXAsixData = groupPlot[0].data.xAsixData
                let tempSeriesData = groupPlot[0].data.seriesData

                let tempPieData = []

                if (tempXAsixData.length > 0) {
                  tempXAsixData.forEach((item, index) => {
                    tempPieData.push({'name': item, 'value': tempSeriesData[index]})
                  })
                }

                groupPlot[0].data['pieData'] = tempPieData
              }
            }

            // 3轴
            if (this.$util.isDefine(barThreeAxis) &&
                this.$util.isNotEmptyObject(barThreeAxis)) {
                  // this.$util.isDefine(submitAnalysisParams.axisThreeTreeType) && && submitAnalysisParams.axisThreeTreeType !== '3'
              console.log('axisThreeTreeType...')
              let tempData = barThreeAxis.data

              barThreeAxis['data'] = tempData.data
              barThreeAxis['zName'] = ''
              barThreeAxis['dimensions'] = [
                barThreeAxis.xName, barThreeAxis.yName, '' // 事件数量
              ]

              let bar3Data = barThreeAxis.data
              let legendData = tempData.legendData
              let xAsixData = tempData.xAsixData
              let seriesData = []

              legendData.forEach((item, index) => {
                let legend = item

                let tempData = []
                xAsixData.forEach((item, index) => {
                  let o = item
                  let v = 0
                  bar3Data.forEach((item, index) => {
                    let t = item
                    if (t[0] === o && t[1] === legend) {
                      v = t[2]
                    }
                  })
                  tempData.push(v)
                })
                seriesData.push(tempData)
              })

              barStack = {
                xId: barThreeAxis.xId,
                yId: barThreeAxis.yId,
                zId: '',
                xName: barThreeAxis.xName,
                yName: barThreeAxis.yName,
                zName: '',
                xAsixData: tempData.xAsixData,
                legendData: tempData.legendData,
                seriesData: seriesData
              }
            }
          }
          // 基于事件库分析结果 解析图表数据 END

          // 组装堆叠图数据
          let allBarThreeAxis = {}
          if (this.$util.isDefine(barThreeAxis) && this.$util.isNotEmptyObject(barThreeAxis) && this.$util.isDefine(barStack) && this.$util.isNotEmptyObject(barStack)) {
            allBarThreeAxis = JSON.parse(JSON.stringify(barThreeAxis))
            let bar3Data = barThreeAxis.data

            let legendData = barStack.legendData
            let xAsixData = barStack.xAsixData
            let seriesData = []

            legendData.forEach((item, index) => {
              let legend = item

              let tempData = []
              xAsixData.forEach((item, index) => {
                let o = item
                let v = 0
                bar3Data.forEach((item, index) => {
                  let t = item
                  if (t[0] === o && t[1] === legend) {
                    v = t[2]
                  }
                })
                tempData.push(v)
              })
              seriesData.push(tempData)
            })

            if (seriesData !== barStack.seriesData) {
              barStack.seriesData = seriesData
            }
            console.log(seriesData)
          }

          if (this.$util.isDefine(barStack) && this.$util.isNotEmptyObject(barStack)) {
            let legendData = barStack.legendData
            let seriesData = barStack.seriesData
            let xAsixData = barStack.xAsixData
            let tempData = []

            xAsixData.forEach((item, i) => {
              let xAsix = item
              legendData.forEach((item, j) => {
                let legend = item
                let series = seriesData[j]
                tempData.push([xAsix, legend, series[i]])
              })
            })
            allBarThreeAxis.data = tempData
            console.log(tempData)
          }
          // 组装堆叠图数据 END

          // --------------------------  辅助线相关判断    ----------------------------------
          if (funType === 'addSublineComponent') { // 添加辅助线
            tempAnalysisResultAllDataObj = this.$store.state.analysisResultAllData // 获取已经存在分析结果数据
            let tempSeriesDataArr = [] // 临时存放y轴数据
            let tempXAsixDataList = [] // 临时存放x轴的数据
            submitAnalysisParams.isGuide = '1' // 设置辅助线标识

            tempAnalysisResultAllDataObj.submitAnalysisParams = submitAnalysisParams // 设置数值辅助线的分析参数
            if (this.$util.isDefine(groupPlot) && groupPlot.length > 0) { // 处理刚刚提交返回的数据
              let tempGroupPlot = groupPlot[0] // 只取第一个数据
              let xyData = tempGroupPlot.data // 轴1和轴2，或轴1，轴2数据
              if (this.$util.isNotEmptyObject(xyData)) {
                if (xyData.xAsixData && xyData.seriesData && xyData.xAsixData.length > 0 && xyData.seriesData.length > 0) {
                  tempXAsixDataList = xyData.xAsixData
                  tempSeriesDataArr = xyData.seriesData
                }
              }
            }
            // 更新折线和柱状图的数据
            tempAnalysisResultAllDataObj.barLinePieData.xAxisData = tempXAsixDataList
            tempAnalysisResultAllDataObj.barLinePieData.seriesData = tempSeriesDataArr
          } else {
            if (this.$util.isDefine(flightInfoData) && this.$util.isNotEmptyObject(flightInfoData)) { // 航班编号信息
              tempAnalysisResultAllDataObj.flightInfoData = flightInfoData
            } else {
              tempAnalysisResultAllDataObj.flightInfoData = {}
            }

            if (this.$util.isDefine(flightPageCount)) { // 航班编号分页总数
              tempAnalysisResultAllDataObj.flightPageCount = flightPageCount
            } else {
              tempAnalysisResultAllDataObj.flightPageCount = 0
            }

            if (this.$util.isDefine(submitAnalysisParams) && this.$util.isNotEmptyObject(submitAnalysisParams)) { // 提交的分析参数
              tempAnalysisResultAllDataObj.sublineAnalysisParams = submitAnalysisParams // 添加辅助线时表格和表格详情导出使用
              tempAnalysisResultAllDataObj.submitAnalysisParams = submitAnalysisParams
            } else {
              tempAnalysisResultAllDataObj.sublineAnalysisParams = {}
              tempAnalysisResultAllDataObj.submitAnalysisParams = {}
            }

            if (this.$util.isDefine(summaryData) && this.$util.isNotEmptyObject(summaryData)) { // 分析结果中的数据汇总
              tempAnalysisResultAllDataObj.summaryData = summaryData
            } else {
              tempAnalysisResultAllDataObj.summaryData = {}
            }

            if (this.$util.isDefine(tableData) && this.$util.isNotEmptyObject(tableData)) { // 分析结果中的表格详情数据
              tempAnalysisResultAllDataObj.tableData = tableData
            } else {
              tempAnalysisResultAllDataObj.tableData = {}
            }

            // 默认使用第一根轴数据总数算百分比
            if (this.$util.isNotEmptyObject(summaryData) && this.$util.isNotEmptyObject(summaryData.axisOneKey) && this.$util.isDefine(summaryData.axisOneKey.sumAnalysis)) {
              sumAnalysis = parseInt(summaryData.axisOneKey.sumAnalysis) // 赋值真实的分析数据数量，百分比使用
            }

            if (this.$util.isDefine(groupPlot) && groupPlot.length > 0) { // 基础类型图表数据存在，且有数值
              let tempBarLinePieDataObj = {} // 临时存储基础图表数据
              let tempGroupPlot = groupPlot[0] // 只取第一个数据
              let type = tempGroupPlot.type // 轴类型，表示有几个轴
              let xName = tempGroupPlot.xName ? tempGroupPlot.xName : '' // 轴1名字
              let xId = tempGroupPlot.xId ? tempGroupPlot.xId : '' // 轴1编号
              let yName = tempGroupPlot.yName ? tempGroupPlot.yName : '' // 轴2名字
              let yId = tempGroupPlot.yId ? tempGroupPlot.yId : '' // 轴2编号
              let zName = tempGroupPlot.zName ? tempGroupPlot.zName : '' // 轴3名字
              let zId = tempGroupPlot.zId ? tempGroupPlot.zId : '' // 轴3编号
              let xyData = tempGroupPlot.data // 轴1和轴2，或轴1，轴2数据
              if (this.$util.isNotEmptyObject(xyData)) {
                let tempSeriesPercentData = [] // 临时存储柱状和折线类型图表的叠加百分比数据
                let tempPiePercentData = [] // 临时存储饼状类型图表的叠加百分比数据
                if (xyData.xAsixData && xyData.seriesData && xyData.pieData && xyData.xAsixData.length > 0 && xyData.seriesData.length > 0 && xyData.pieData.length > 0) {
                  for (let i = 0; i < xyData.seriesData.length; i++) {
                    tempSeriesPercentData.push(parseFloat(xyData.seriesData[i] / sumAnalysis * 100).toFixed(2))
                    tempPiePercentData.push({name: xyData.pieData[i].name, value: parseFloat(xyData.pieData[i].value / sumAnalysis * 100).toFixed(2)})
                  }

                  tempBarLinePieDataObj = { // 组装原始数据的对象
                    xAxisName: xName,
                    xAxisId: xId,
                    yAxisName: yName,
                    yAxisId: yId,
                    zAxisName: zName,
                    zAxisId: zId,
                    axisType: type,
                    xAxisData: xyData.xAsixData,
                    seriesData: [xyData.seriesData],
                    pieChartData: xyData.pieData,
                    seriesPercentData: [tempSeriesPercentData],
                    piePercentData: tempPiePercentData
                  }
                }
              }

              tempAnalysisResultAllDataObj.sublineBarLinePieData = tempBarLinePieDataObj // 添加辅助线时表格显示使用
              tempAnalysisResultAllDataObj.barLinePieData = tempBarLinePieDataObj
            } else { // 基础类型的图表数据不存在，则清空原有的数据
              tempAnalysisResultAllDataObj.sublineBarLinePieData = {} // 添加辅助线时表格显示使用
              tempAnalysisResultAllDataObj.barLinePieData = {}
            }

            if (this.$util.isDefine(scatteredPlot) && scatteredPlot.length > 0) { // 散点类型图表数据存在
              let tempScatterDataObj = {}
              let tempScatterPlot = scatteredPlot[0] // 只取第一个数据
              let id = tempScatterPlot.id ? tempScatterPlot.id : ''
              let name = tempScatterPlot.name ? tempScatterPlot.name : ''
              let type = tempScatterPlot.type
              let dimensions = tempScatterPlot.dimensions
              let seriesData = tempScatterPlot.data
              if (this.$util.isDefine(seriesData) && seriesData.length > 0) {
                tempScatterDataObj = {
                  axisType: type,
                  xAxisName: name,
                  axisId: id,
                  seriesData: seriesData,
                  dimensions: dimensions
                }
              }
              tempAnalysisResultAllDataObj.scatterData = tempScatterDataObj
            } else {
              tempAnalysisResultAllDataObj.scatterData = {}
            }

            if (this.$util.isDefine(candlePlot) && candlePlot.length > 0) { // 蜡烛类型图表数据存在
              let tempCandleDataObj = {}
              let tempCandlePlot = candlePlot[0]
              let id = tempCandlePlot.id
              let name = tempCandlePlot.name
              let axisNameValue = tempCandlePlot.axisNameValue
              let seriesData = tempCandlePlot.data
              if (this.$util.isDefine(seriesData) && seriesData.length > 0) {
                tempCandleDataObj = {
                  axisType: '2',
                  axisId: id,
                  xAxisName: name,
                  xAxisNameValue: axisNameValue,
                  seriesData: seriesData
                }
              }
              tempAnalysisResultAllDataObj.candleData = tempCandleDataObj
            } else {
              tempAnalysisResultAllDataObj.candleData = {}
            }

            if (this.$util.isDefine(barThreeAxis) && this.$util.isNotEmptyObject(barThreeAxis)) { // 3D柱状类型图表数据存在
              let tempBarThreeDataObj = {}
              let xId = barThreeAxis.xId
              let xName = barThreeAxis.xName
              let yId = barThreeAxis.yId
              let yName = barThreeAxis.yName
              let zId = barThreeAxis.zId
              let zName = barThreeAxis.zName
              let type = barThreeAxis.type
              let dimensions = barThreeAxis.dimensions
              let seriesData = barThreeAxis.data
              if (this.$util.isDefine(seriesData) && seriesData.length > 0) {
                tempBarThreeDataObj = {
                  axisType: type,
                  xAxisId: xId,
                  xAxisName: xName,
                  yAxisId: yId,
                  yAxisName: yName,
                  zAxisId: zId,
                  zAxisName: zName,
                  dimensions: dimensions,
                  seriesData: seriesData
                }
              }
              tempAnalysisResultAllDataObj.barThreeData = tempBarThreeDataObj

              let allTempBarThreeDataObj = {}
              let allseriesData = allBarThreeAxis.data
              if (this.$util.isDefine(allseriesData) && allseriesData.length > 0) {
                allTempBarThreeDataObj = {
                  axisType: type,
                  xAxisId: xId,
                  xAxisName: xName,
                  yAxisId: yId,
                  yAxisName: yName,
                  zAxisId: zId,
                  zAxisName: zName,
                  dimensions: dimensions,
                  seriesData: allseriesData
                }
              }
              tempAnalysisResultAllDataObj['allBarThreeData'] = allTempBarThreeDataObj

              tempAnalysisResultAllDataObj.sublineBarThreeData = tempBarThreeDataObj // 添加辅助线时表格显示使用
            } else {
              tempAnalysisResultAllDataObj.barThreeData = {}
              tempAnalysisResultAllDataObj['allBarThreeData'] = {}
              tempAnalysisResultAllDataObj.sublineBarThreeData = {} // 添加辅助线时表格显示使用
            }

            if (this.$util.isDefine(barStack) && this.$util.isNotEmptyObject(barStack)) { // 堆叠类型图表数据存在
              let tempBarStackData = {}
              let xId = barStack.xId
              let xName = barStack.xName
              let yId = barStack.yId
              let yName = barStack.yName
              let zId = barStack.zId
              let zName = barStack.zName
              let type = barStack.type
              let legendData = barStack.legendData
              let xAsixData = barStack.xAsixData
              let seriesData = barStack.seriesData
              let tempSerierData = seriesData.filter((item) => { return item.length > 0 })
              if (this.$util.isDefine(seriesData) && seriesData.length > 0) {
                tempBarStackData = {
                  axisType: type,
                  xAxisId: xId,
                  xAxisName: xName,
                  yAxisId: yId,
                  yAxisName: yName,
                  zAxisId: zId,
                  zAxisName: zName,
                  legendData: legendData,
                  xAsixData: xAsixData,
                  seriesData: tempSerierData
                }
              }
              tempAnalysisResultAllDataObj.barStackData = tempBarStackData
            } else {
              tempAnalysisResultAllDataObj.barStackData = {}
            }
          }
          // -------------------------- 辅助线相关判断 END ----------------------------------

          // 分析结果2D图表 二级菜单按钮显示禁用控制
          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.barLinePieData) && tempAnalysisResultAllDataObj.barLinePieData.seriesData.length > 0) { // 柱状和折线类型图表数据存在
            disabledMenuObj['analysis_chart_bar'] = false // 显示柱状图菜单
            disabledMenuObj['analysis_chart_line'] = false // 显示折线图菜单
          } else {
            disabledMenuObj['analysis_chart_bar'] = true // 隐藏柱状图菜单
            disabledMenuObj['analysis_chart_line'] = true // 隐藏折线图菜单
          }

          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.barLinePieData) && tempAnalysisResultAllDataObj.barLinePieData.pieChartData.length > 0 && !tempAnalysisResultAllDataObj.submitAnalysisParams.isSort) { // 饼状类型图表数据存在
            disabledMenuObj['analysis_chart_pie'] = false // 显示饼图菜单
          } else {
            disabledMenuObj['analysis_chart_pie'] = true // 隐藏饼图菜单
          }

          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.barStackData) && tempAnalysisResultAllDataObj.barStackData.seriesData.length > 0) { // 堆叠类型图表数据存在
            disabledMenuObj['analysis_chart_barStack'] = false // 显示堆叠图菜单
            disabledMenuObj['analysis_chart_bar'] = false // 显示柱状图菜单
          } else {
            disabledMenuObj['analysis_chart_barStack'] = true // 隐藏堆叠图菜单
            if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.barLinePieData) && tempAnalysisResultAllDataObj.barLinePieData.seriesData.length > 0) {
              disabledMenuObj['analysis_chart_bar'] = false // 显示柱状图菜单
            } else {
              disabledMenuObj['analysis_chart_bar'] = true // 隐藏柱状图菜单
            }
          }

          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.scatterData) && tempAnalysisResultAllDataObj.scatterData.seriesData.length > 0 && !tempAnalysisResultAllDataObj.submitAnalysisParams.isSort) {
            if (tempAnalysisResultAllDataObj.scatterData.axisType === '3') {
              if (this.$util.isDefine(tempAnalysisResultAllDataObj.submitAnalysisParams.axisThreeName)) {
                disabledMenuObj['analysis_chart_scatter3D'] = false // 显示3D散点图菜单
                disabledMenuObj['analysis_chart_scatter'] = false
              } else {
                disabledMenuObj['analysis_chart_scatter3D'] = true // 隐藏3D散点图菜单
              }
            } else {
              disabledMenuObj['analysis_chart_scatter'] = false // 显示散点图菜单
            }
          } else {
            disabledMenuObj['analysis_chart_scatter3D'] = true // 隐藏3D散点图菜单
            disabledMenuObj['analysis_chart_scatter'] = true // 隐藏散点图菜单
          }

          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.candleData) && tempAnalysisResultAllDataObj.candleData.seriesData.length > 0 && !tempAnalysisResultAllDataObj.submitAnalysisParams.isSort) { // 蜡烛图
            disabledMenuObj['analysis_chart_boxplot'] = false // 显示蜡烛图菜单
          } else {
            disabledMenuObj['analysis_chart_boxplot'] = true // 隐藏蜡烛图菜单
          }

          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.barThreeData) && tempAnalysisResultAllDataObj.barThreeData.seriesData.length > 0 && !tempAnalysisResultAllDataObj.submitAnalysisParams.isSort) { // 饼状类型图表数据存在
            disabledMenuObj['analysis_chart_bar3D'] = false // 显示3d柱状菜单
          } else {
            disabledMenuObj['analysis_chart_bar3D'] = true // 隐藏3d柱状菜单
          }

          if (this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.barLinePieData) && !tempAnalysisResultAllDataObj.submitAnalysisParams.isSort) { // 只有柱状图和折线图才可以添加辅助线   TODO: 选择测量排序不显示添加辅助线
            disabledMenuObj['analysis_chart_subline'] = false // 显示添加辅助线菜单
          } else {
            disabledMenuObj['analysis_chart_subline'] = true // 隐藏添加辅助线菜单
          }
          // 分析结果2D图表 二级菜单按钮显示禁用控制 END

          let tempMenuArr = []
          for (let m in disabledMenuObj) {
            if (!disabledMenuObj[m] && m !== 'analysis_grid_export' && m !== 'analysis_table_export') {
              tempMenuArr.push(m.split('_')[2])
            }
          }
          if (tempMenuArr.length > 0) {
            disabledMenuObj['analysis_chart_export'] = false
            disabledMenuObj['analysis_grid_export'] = false
          } else {
            disabledMenuObj['analysis_chart_export'] = true
            disabledMenuObj['analysis_grid_export'] = true
          }

          if (this.$util.isDefine(tempAnalysisResultAllDataObj.tableData) && this.$util.isNotEmptyObject(tempAnalysisResultAllDataObj.tableData)) { // 分析结果中的表格详情数据
            disabledMenuObj['analysis_table_export'] = false
          } else {
            disabledMenuObj['analysis_table_export'] = true
          }

          console.log('！！！！！！！！*ANALYSIS_RESULT_ALL_DATA*！！！！！！！！！：', tempAnalysisResultAllDataObj)
          this.$store.commit('ANALYSIS_RESULT_ALL_DATA', tempAnalysisResultAllDataObj) // 更新vuex中的分析返回的数据
          if (funType === 'newFileDhbComponent') {
            let dhbParams = submitAnalysisParams.dhbParamObj

            let tables = []
            let flights = []
            // let tempCols = []

            if (this.$util.isDefine(tableData) && this.$util.isNotEmptyObject(tableData)) { // 表格详情数据存在且不为空
              let colsData = tableData.colsData
              let rowsData = tableData.rowsData
              let colsZhData = tableData.colsZhData

              if (this.$util.isDefine(colsData) && this.$util.isDefine(colsZhData) && this.$util.isDefine(rowsData)) {
                let colsDataArr = colsData.split(',')
                let colsZhDataArr = colsZhData.split(',')
                if (colsDataArr.length > 0 && colsZhDataArr.length > 0 && colsDataArr.length === colsZhDataArr.length && rowsData.length > 0) {
                  // colsDataArr.forEach((item, index) => {
                  //   tempCols.push({enName: item.toLowerCase(), zhName: colsZhDataArr[index]})
                  // })
                  let tempRows = []
                  rowsData.forEach((item, index) => {
                    let tempObj = item
                    for (let key in tempObj) {
                      if (!this.$util.isDefine(tempObj[key])) {
                        tempObj[key] = '-'

                        if (key === 'vwid') {
                          flights.push(tempObj[key])
                        }
                      }
                    }
                    tempRows.push(tempObj)
                  })
                  tables = tempRows
                }
              }
            }

            let tempObj = {}
            tempObj['flights'] = flights
            tempObj['tables'] = tables
            tempObj['disabledMenuObj'] = {}
            tempObj['fpcParam'] = {
              flightIds: flights.join(','),
              gpID: dhbParams.gpID,
              timePointID: dhbParams.timePointID,
              offsetStart: dhbParams.offsetStart,
              offsetEnd: dhbParams.offsetEnd,
              frequency: dhbParams.frequency,
              avg: dhbParams.avg,
              tantile25: dhbParams.tantile25,
              tantile50: dhbParams.tantile50,
              tantile75: dhbParams.tantile75
            }
            tempObj['fpcParamText'] = {
              enginParamText: dhbParams.enginParamText,
              timePointText: dhbParams.timePointText
            }
            tempObj['fpcParamResult'] = response.data.result.data.data

            this.$bus.$emit('closeAnalysisTabFun')

            this.$bus.$emit('openHeaderMenuItem', 'fpc_result_chart', null, null) // 修改头部显示效果
            this.$bus.$emit('fpcFlightObjHandle', tempObj)
            this.$bus.$emit('analysisAddTab', {enName: 'fpc_result', zhName: '多航班参数对比结果', isClosable: true, parent: 'fpc_result_chart'})
          } else {
            this.$bus.$emit('closeDhbcsdbTabFun')

            this.$bus.$emit('closeAnalysisTabFun') // 关闭分析结果tab,数据切换时重新打开
            this.$bus.$emit('setDefaultChartType', tempMenuArr[0]) // 设置默认的显示的图表类型
            this.$store.commit('IS_DISABLED_MENU', disabledMenuObj) // 暂时存储需要修改二级菜单的值
            this.$bus.$emit('setCurrentName', 'analysis_chart_' + tempMenuArr[0])
            // 控制二级菜单
            if (this.$store.state.submitNewFileTabActive === 'analysis_chart') {
              this.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, disabledMenuObj) // 修改头部显示效果
            } else if (this.$store.state.submitNewFileTabActive === 'analysis_table') {
              this.$bus.$emit('openHeaderMenuItem', 'analysis_table', {}, disabledMenuObj) // 修改头部显示效果
            } else if (this.$store.state.submitNewFileTabActive === 'analysis_view') {
              this.$bus.$emit('openHeaderMenuItem', 'analysis_view', {}, {}) // 修改头部显示效果
            } else {
              this.$bus.$emit('openHeaderMenuItem', 'analysis_chart', {}, disabledMenuObj) // 修改头部显示效果
            }
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$store.commit('HIDE_LOADING', '拼命加载中！')

          this.logBackIn(response.data)
        } else {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          this.$message.error(response.data.message)
        }
        // this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }, response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    reloadGetAnalysisRecord () { // 新建分析界面点击保存后，重新查询分析子集数据
      if (this.$store.state.managerTreeNodeId) {
        this.getAnalysisRecord(this.$store.state.managerTreeNodeId)
      }
    },
    // {"message":"请先登录","status":"E1001","result":{"data":"http://id.ceair.com:7777/oam/server/logout?end_url=http://DSAP-bi.ceair.com"}}
    logBackIn (data) {
      const that = this
      // if (!window.tipLock) {
        if (this.isNotEmptyObject(data)) {
          window.location.href = data.result.data
        } else if (this.isDefine(data)) {
          that.$router.push({ path: '/' }) // 跳转登录界面
        } else {
          that.$router.push({ path: '/' }) // 跳转登录界面
        }
      // } else {
      //   if (this.$util.isNotEmptyObject(data)) {
      //     this.$message({
      //       type: 'error',
      //       message: data.message,
      //       onClose: function (c) {
      //         // that.$router.push({ path: '/' }) // 跳转登录界面
      //         // that.$router.push({ path: data.result.data })
      //         window.location.href = data.result.data
      //       }
      //     })
      //   } else if (this.$util.isDefine(data)) {
      //     this.$message({
      //       type: 'error',
      //       message: data,
      //       onClose: function (c) {
      //         that.$router.push({ path: '/' }) // 跳转登录界面
      //       }
      //     })
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '登录信息异常！',
      //       onClose: function (c) {
      //         that.$router.push({ path: '/' }) // 跳转登录界面
      //       }
      //     })
      //   }
      //   // this.$message({
      //   //   type: 'error',
      //   //   message: data.message,
      //   //   onClose: function (c) {
      //   //     that.$router.push({ path: '/' }) // 跳转登录界面
      //   //   }
      //   // })
      // }
    },

    getEventTreeData () {
      this.eventTreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/apm/getEventProfileTree',
        method: 'get',
        params: {
          parentId: 0,
          searchContent: this.eventTreeKeyword
        }
      }).then(response => {
        console.log('getEventTreeData~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框

        let resultData = response.data.data
        if (resultData.length > 0) {
          this.eventTreeData = resultData
        }

        let expandedKey = response.data['defaultNode']
        if (this.$util.isDefine(expandedKey)) {
          this.eventDefaultExpandedKeys.push(expandedKey)
        } else {
          this.eventDefaultExpandedKeys = []
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    openEventDialog (parentNode, childNode) {
      this.dialogEventVisible = true

      this.resetEventDialog()

      this.getEventTreeData()
    },

    closeEventDialog () {
      this.dialogEventVisible = false

      this.resetEventDialog()
    },

    resetEventDialog () {
      this.eventName = ''
      this.eventStoreObj = {}
      this.eventTreeKeyword = ''
    },

    renderEventContent (h, {node, data, store}) {
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
        }
      })
    },

    eventTreeNodeHandleClick (data) {
      if (!data.CHILDREN) {
        this.eventName = data.NAME
        this.eventStoreObj = data

        this.$store.commit('EVENT_STORE_DATA', data)
        // this.$store.state.eventStoreData
      }
    },

    assemblyEventParams (params) {
      if (this.$util.isDefine(this.eventName)) {
        this.dialogEventVisible = false

        this.$bus.$emit('addTab', 'analysis_file_new', '新建事件分析', 'analysis_file', 'analysis')
      } else {
        this.$message({
          message: '请选择事件库！',
          type: 'warning'
        })
        return false
      }
    }
  }
}
</script>
<style scoped>
.manager {
  position: absolute;
  height: 100%;
  width: 100%;
}

.publish_dia .el-dialog .el-dialog__body {
  /* max-height: 500px; */
  height: 400px;
  overflow-y: auto;
}
/* .manager .publish_dia .dialog-footer {
  text-align: center;
} */
.manager .publish_dia .el-form-item .el-select {
  width: 100%;
  margin-bottom: 6px;
}
.manager .publish_dia .el-form-item {
  margin-bottom: 0;
}
.manager .publish_dia .el-form-item .el-form-item__content span {
  font-size: 12px;
}
.analysis-tab-left {
  position: relative;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  padding-top: 15px;
  border-right: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
}
.publish_dia .el-dialog {
  /* max-height: 500px; */
  height: 300px;
  overflow: auto;
}
.tree-head-icon {
  margin: -5px 10px 10px;
}
.analysis-tab-tree {
  overflow: auto;
  height: 90%;
}
.analysis-tab-tree >>> .el-tree {
  width: 100%;
}

.analysis-tab-content {
  position: relative;
  width: 80%;
  height: 100%;
}
.analysis-tab-content .el-icon-thumb,
.analysis-tab-content .el-icon-upload,
.analysis-tab-content .el-icon-view {
  transform: scale(1.3);
  padding-top: 1px;
  color: #637394;
}
.analysis-tab-content .tab-icon-set {
  width: 16px;
}
.analysis-tab-content .el-icon-view {
  padding-top: 3px;
}
.manager-table {
  position: relative;
  width: 100%;
  height: 100%;
}
.pagination {
  padding: 53px 20px 30px 0;
  height: 28px;
}
.table-row-class-name {
  height: 40px;
  background: #DDDDDD;
}
.row-icon-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
/*
.analysis-tab-tree >>> .el-tree-node:focus > .el-tree-node__content,
.analysis-tab-tree >>> .el-tree-node__content:hover {
  background:#ffffff;
  color:#66b1ff;
} */
/*
.analysis-tab-tree >>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #f5f7fa;
    color: #3A6BB9;
    font-weight: 500;
} */

.tree-content {
  position: relative;
  margin: 15px auto;
  border: 0px solid red;
  height: 280px;
  overflow: auto;
}
.file-name {
  width: 75px;
}
.dialog-footer .el-button--mini{
  padding: 10px 26px;
}
.publish_dia .el-form-item__label-wrap {
  margin-left: 0 !important;
}
</style>
<style>
.publish_dia .publish_dialog_content .el-card .el-card__body {
  padding: 0 20px;
}
</style>
