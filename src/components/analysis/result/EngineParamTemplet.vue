<template>
  <div class="ept df df-fd-r df-jc-fs">
    <div class="ept-wrapper-left df df-fd-c df-jc-sb">
      <div class="tree-head-icon df df-fd-r">
        <el-input placeholder="请输入..." size="small" v-model="treeKeyword" @keyup.enter.native="searchTreeData">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchTreeData" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
        </el-input>
      </div>
      <div class="ept-wrapper-tree df df-fd-r df-f1">
        <el-tree
          ref="eptTreeRef"
          node-key="ID"
          :highlight-current="true"
          :check-on-click-node="true"
          :expand-on-click-node="true"
          :props="defaultProps"
          :data="eptTreeData"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :render-content="renderContent"
          @node-click="eptTreeNodeHandleClick">
        </el-tree>
      </div>
    </div>
    <div class="ept-wrapper-content df df-fd-c df-f1">
      <div class="ept-main df df-fd-r df-f1">
        <div class="ept-table df df-fd-r df-f1" id="eptTableRef">
          <el-table
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            ref="eptTableCon"
            :data="eptTableData"
            height="100%"
            width="100%"
            highlight-current-row
            fit
            :header-row-class-name="headerRowClassName"
            :row-class-name="tableRowClassName">
            <el-table-column prop="GP_NAME" label="参数名称" width="200" align="left"></el-table-column>
            <el-table-column prop="DESCRIPTION" label="描述" align="left" width="auto" ></el-table-column>
            <el-table-column label="操作" width="150" align="left">
              <template slot-scope="scope">
                <div class="row-icon-group" v-if="currentEptAttr!=='公用'">
                  <div class="icon-moveUp tab-icon-set mr10" title="上移" @click="moveUpRow(scope.$index, scope.row)"></div>
                  <div class="icon-moveDown tab-icon-set mr10" title="下移" @click="moveDownRow(scope.$index, scope.row)"></div>
                  <div class="icon-topping tab-icon-set mr10" title="置顶" @click="setTopping(scope.$index, scope.row)"></div>
                  <div class="icon-move tab-icon-set mr10" title="移动"></div>
                  <div class="icon-remove tab-icon-set mr10" title="删除" @click="eptRowDelete(scope.$index, eptTableData)"></div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="ept-wrapper-right df df-fd-c">
          <div class="header">
            模板详情
          </div>

          <div class="ept-wrapper-right-attr-box df-f1">
            <div class="input-box df df-fd-r df-jc-sb df-ai-c">
              模版名称：
              <el-input
                class="df-f1"
                size="small"
                :disabled="currentEptAttr==='公用' ? true : false"
                placeholder="请输入模版名称"
                v-model="currentEptName">
              </el-input>
            </div>

            <div class="input-box df df-fd-r df-jc-sb">
              模版描述：
              <el-input
                type="textarea"
                :rows="10"
                class="df-f1"
                size="small"
                :disabled="currentEptAttr==='公用' ? true : false"
                placeholder="请输入模版描述"
                v-model="currentEptDesc">
              </el-input>
            </div>

            <div v-if="currentEptAttr==='公用'" class="input-box df df-fd-r df-jc-sb df-ai-c">
              模版属性：
              <el-input
                class="df-f1"
                size="small"
                :disabled="true"
                placeholder="请输入模版属性"
                v-model="currentEptAttr">
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="ept-btns">
        <el-button :disabled="currentEptAttr==='公用' || !(this.$util.isDefine(currentTreeId)) ? true : false" type="primary" size="mini" @click="saveTableRow">保存</el-button>
      </div>
    </div>

    <div class="grid-dialog">
      <el-dialog :close-on-click-modal="false"
        :visible.sync="dialogEptVisible"
        @close="closeEptDialog"
        >

        <div slot="title" class="dialog-title df df-fd-r df-jc-sb df-ai-c w100">
          <div class="header">{{ eptDialogTitle }}</div>
        </div>

        <div v-show="eptDialogTitle === '创建模板' ? true : false" class="input-box df df-fd-r df-jc-sb df-ai-c">
          模版名称：
          <el-input
            class="df-f1"
            size="small"
            placeholder="请输入名称"
            v-model="eptDialogName">
          </el-input>
        </div>
        <div v-show="eptDialogTitle === '创建模板' ? true : false" class="input-box df df-fd-r df-jc-sb df-ai-c">
          模板描述：
          <el-input
            class="df-f1"
            size="small"
            placeholder="请输入描述"
            v-model="eptDialogDesc">
          </el-input>
        </div>

        <div class="ept-wrapper df df-fd-r df-f1">
          <div class="ept-params-content df df-fd-c">
            <div class="header">工程参数</div>

            <div class="result-params df df-fd-c df-f1">
              <div class="tree-head-icon df df-fd-r">
                <el-input placeholder="请输入..." size="small" v-model="eptTreeKeyword" @keyup.enter.native="eptSearchTreeData">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="eptSearchTreeData" style="font-size:20px;position:relative;top: 0;cursor:pointer;"></i>
                </el-input>
              </div>
              <div class="ept-dialog-tree df-f1">
                <el-tree
                  node-key="ID"
                  ref="eptDialogTree"
                  highlight-current
                  :data="eptDialogTreeData"
                  :props="defaultEptProps"
                  :default-expanded-keys="eptDefaultExpandedKeys"
                  :default-expand-all="false"
                  :render-content="renderContent"
                  @node-click="eptHandleNodeClick">
                </el-tree>
              </div>
              <div class="tree-desc">
                <div class="view-table-btn-info">
                  <span v-show="eptTreeNodeDesc">说明：</span>
                  <span v-show="eptTreeNodeDesc">{{eptTreeNodeDesc}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="ept-params-btns df-f1"></div>

          <div class="ept-params-content df df-fd-c">
            <div class="header">已选工程参数 {{ checkedEptParams.length }}</div>

            <div class="select-params df-f1">
                <div class="params-item" v-for="(item, index) in EptParams"
                  :key="'YX' + item.NAME">

                  {{ item.NAME }}
                  <i class="el-icon-close" @click="removeEptParam(item, index)"></i>
                </div>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeEptDialog()">取 消</el-button>

          <el-button v-if="eptDialogTitle === '创建模板'" size="mini" type="primary" @click="saveEptParam()">确 定</el-button>
          <el-button v-else size="mini" type="primary" @click="saveEptParam(currentTreeId)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'
import Sortable from 'sortablejs'

export default {
  name: 'EngineParamTemplet',
  data () {
    return {
      eptTreeData: [], // 树状数据
      treeKeyword: '',
      defaultProps: { // 树节点默认的属性
        children: 'CHILDREN',
        label: 'NAME'
      },

      eptTableData: [], // 表格数据
      currentTreeData: {},
      currentTreeNode: {},
      currentEptId: '',
      currentEptName: '',
      currentEptDesc: '',
      currentEptAttr: '',

      pageSize: 10, // 每页显示条目数
      pagerCount: 11, // 页码按钮的数量
      totalCount: 0, // 总条目数

      createTimeWidth: 'auto',
      eptTableWidth: 0,

      currentTreeId: '', // 当前节点编号
      isAddTreeNode: false,
      defaultExpandedKeys: [],
      currentEditNodeName: '', // 当前正在编辑的节点名字

      dialogEptVisible: false,
      eptDialogTitle: '创建模版',
      eptDialogName: '',
      eptDialogDesc: '',
      eptTreeKeyword: '',
      eptTreeNodeDesc: '',
      eptDialogTreeData: [],
      defaultEptProps: {
        children: 'CHILDREN',
        label: 'NAME'
      },
      eptDefaultExpandedKeys: [],

      checkAll: false,
      isIndeterminate: false,
      checkedEptParams: [],
      EptParams: []
    }
  },
  watch: {
    // treeKeyword (newVal, oldVal) {
    //   if (!this.$util.isDefine(newVal) && newVal !== oldVal) {
    //     this.refreshTreeData()
    //   }
    // },
    eptTableData () { // 在新建分析中增加分析时，分析管理页面数据增加时修改表格的宽度
      let elMainWidth = document.getElementById('elMain').clientWidth
      let ctWidth = parseInt(elMainWidth - (elMainWidth * 0.2) - 450).toString()
      this.createTimeWidth = ctWidth
    },
    eptTableWidth (newVal, oldVal) { // 在分析管理页面监控表格的宽度的变化
      if (this.$util.isDefine(newVal) && this.$util.isDefine(oldVal) && newVal !== oldVal) {
        let ctWidth = parseInt(newVal - 450).toString()
        this.createTimeWidth = ctWidth
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 整个视图渲染完毕后加载数据
      this.getTreeData() // dom渲染完毕后加载数据
      this.setManagerTableWidth() // 设置表格的宽度

      // this.openEptDialog()
      this.rowDropSort()
    })

    const that = this
    this.$bus.$on('reloadGetAnalysisRecord', () => {
      that.reloadGetAnalysisRecord()
    })
    this.$bus.$on('resetManagerTableWidth', () => {
      that.setManagerTableWidth()
    })

    this.$bus.$on('openEptDialogHandle', (param) => { // 接收显示表格右侧dom事件
      that.openEptDialog(param)
    })

    this.$bus.$on('removeEptTempletHandle', () => { // 接收显示表格右侧dom事件
      that.removeEptTemplet()
    })

    this.$bus.$on('setUpTempletStatusHandle', (flag, data, node) => { // 接收显示表格右侧dom事件
      that.setUpTempletStatus(flag, data, node)
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('reloadGetAnalysisRecord') // 移除自定义事件监听器。
    this.$bus.$off('resetManagerTableWidth') // 移除自定义事件监听器。
    this.$bus.$off('openEptDialogHandle') // 移除自定义事件监听器。
    this.$bus.$off('removeEptTempletHandle') // 移除自定义事件监听器。
    this.$bus.$off('setUpTempletStatusHandle') // 移除自定义事件监听器。
  },
  methods: {
    rowDropSort () { // 行拖拽排序
      const $tbody = document.querySelector('.ept-table .el-table__body-wrapper tbody') // el-table__body-wrapper
      const _this = this
      Sortable.create($tbody, {
        handle: '.icon-move',
        animation: 150, // 动画参数
        // 指定父元素下可被拖拽的子元素
        // draggable: '.icon-move',
        onStart () {
        },
        // onEnd ({ newIndex, oldIndex }) {
        onEnd: evt => {
          let newIndex = evt.newIndex
          let oldIndex = evt.oldIndex
          let $tr = $tbody.children[newIndex]
          let $oldTr = $tbody.children[oldIndex]

          if (!_this.$util.isDefine(newIndex) || !_this.$util.isDefine(newIndex) || newIndex === oldIndex) {
            return false
          }

          // 先删除移动的节点
          $tbody.removeChild($tr)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
              $tbody.insertBefore($tr, $oldTr)
          } else {
              $tbody.insertBefore($tr, $oldTr.nextSibling)
          }
          const currRow = _this.eptTableData.splice(oldIndex, 1)[0]
          _this.eptTableData.splice(newIndex, 0, currRow)

          _this.refreshTableEptParam()

          _this.$forceUpdate()
        }
      })
    },
    moveUpRow (index, row) { // 上移行
      let that = this
      console.log('上移###：', index, row)
      console.log(that.eptTableData[index])
      if (index > 0) {
        // let upDate = that.eptTableData[index - 1]
        // that.eptTableData.splice(index - 1, 1)
        // that.eptTableData.splice(index, 0, upDate)

        const len = this.eptTableData[index - 1]
        this.$set(this.eptTableData, index - 1, this.eptTableData[index])
        this.$set(this.eptTableData, index, len)

        this.refreshTableEptParam()
        that.$forceUpdate()
      } else {
        this.$message({
          message: '已经是第一条，不可上移!',
          type: 'warning'
        })
      }
    },
    moveDownRow (index, row) { // 下移行
      let that = this
      console.log('下移###：', index, row)
      if ((index + 1) === that.eptTableData.length) {
        this.$message({
          message: '已经是最后一条，不可下移！',
          type: 'warning'
        })
      } else {
        console.log(index)
        // let downDate = that.eptTableData[index + 1]
        // that.eptTableData.splice(index + 1, 1)
        // that.eptTableData.splice(index, 0, downDate)

        const len = this.eptTableData[index + 1]
        this.$set(this.eptTableData, index + 1, this.eptTableData[index])
        this.$set(this.eptTableData, index, len)

        this.refreshTableEptParam()
        that.$forceUpdate()
      }
    },
    setTopping (index, row) {
      // let tempRow = this.eptTableData[index]
      this.eptTableData.splice(index, 1)

      this.eptTableData.splice(0, 0, row)

      this.refreshTableEptParam()
      this.$forceUpdate()
    },
    eptRowDelete (index, rows) { // 删除行
      this.eptTableData.splice(index, 1)

      this.refreshTableEptParam()
    },

    refreshTableEptParam () {
      let _this = this

      _this.EptParams = []
      _this.checkedEptParams = []

      for (let item of _this.eptTableData) {
        _this.EptParams.push({ID: item.ID, NAME: item.GP_NAME})
        _this.checkedEptParams.push(item.ID)
      }
    },

    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    setManagerTableWidth () {
      setTimeout(() => {
        if (document.getElementById('analysisManager') && document.getElementById('analysisManager').style.display !== 'none') {
          let elMainWidth = document.getElementById('elMain').clientWidth
          this.eptTableWidth = elMainWidth - elMainWidth * 0.2

          this.$refs.eptTableCon.doLayout()
          console.log('elMainWidth----@@@@@:' + elMainWidth, 'eptTableWidth@@@@@:' + this.eptTableWidth)
        }
      }, 50)
    },

    refreshTreeData () {
      if (!this.$util.isDefine(this.treeKeyword)) {
        this.getTreeData()
      }
    },
    searchTreeData (flag) { // 搜索树
      this.getTreeData()
    },

    getEptDetail (id) {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let that = this
      that.eptTableData = []
      that.EptParams = []
      that.checkedEptParams = []

      this.$axios(
        {
          url: '/paramtemplate/detail',
          method: 'get',
          params: {
            ID: id
          },
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        }
      ).then(response => {
        console.log('detail~~~:', response)
        that.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框

        let resultData = response.data

        if (that.$util.isDefine(resultData.PARAM_DETAIL)) {
          that.eptTableData = JSON.parse(resultData.PARAM_DETAIL)
          for (let item of that.eptTableData) {
            that.EptParams.push({ID: item.ID, NAME: item.GP_NAME})
            that.checkedEptParams.push(item.ID)
          }
        } else {
          that.eptTableData = []

          that.EptParams = []
          that.checkedEptParams = []
        }

        that.currentEptId = resultData.ID
        that.currentEptName = resultData.NAME
        that.currentEptDesc = resultData.DESCRIPTION
        // this.currentEptAttr = ''
      }).catch(response => {
        that.eptTableData = []
        that.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    eptTreeNodeHandleClick (data, node, nodeCommpent) { // 树节点点击事件
      this.currentTreeData = data
      this.currentTreeNode = node

      let hideMenuObj = {}
      let disabledMenuObj = {}
      let that = this

      if (!data.CHILDREN) {
        // if (data.ID === this.currentTreeId) {
        //   return false
        // }

        this.getEptDetail(data.ID)

        that.currentTreeId = data.ID
        that.$bus.$emit('analysisAddCatalog', data, node)
      } else {
        that.eptTableData = []

        that.currentEptName = ''
        that.currentEptDesc = ''

        that.currentTreeId = ''
        that.currentEditNodeName = ''
      }

      // COMMON: 0、私有  1、公有
      // EDITABLE: 0、其他用户 1、本人有操作权限
      // this.$store.getters.userInfo.isAdmin 管理员
      console.log(node.parent.data)

      if (data.CHILDREN && data.ID === '2') {
        this.currentEptAttr = '私有'

        hideMenuObj['analysis_view_template_create'] = true
      }

      if (data.CHILDREN && data.ID === '1') {
        this.currentEptAttr = '公用'

        hideMenuObj['analysis_view_template_create'] = true
        disabledMenuObj['analysis_view_template_create'] = true
      }

      if (!data.CHILDREN && data.COMMON === 0) {
        this.currentEptAttr = '私有'

        hideMenuObj['analysis_view_template_edit'] = true
        hideMenuObj['analysis_view_template_remove'] = true
        hideMenuObj['analysis_view_template_common'] = true

        if (this.$store.getters.userInfo.isAdmin) {
          disabledMenuObj['analysis_view_template_common'] = false
        } else {
          disabledMenuObj['analysis_view_template_common'] = true
        }
      }

      if (!data.CHILDREN && data.COMMON === 1) {
        this.currentEptAttr = '公用'

        hideMenuObj['analysis_view_template_uncommon'] = true
        if (this.$store.getters.userInfo.isAdmin && data.EDITABLE === 1) {
          disabledMenuObj['analysis_view_template_uncommon'] = false
        } else {
          disabledMenuObj['analysis_view_template_uncommon'] = true
        }
      }

      this.$store.commit('ANAVT_HIDE_MENU', hideMenuObj)
      this.$store.commit('ANAVT_DISABLED_MENU', disabledMenuObj)
      this.$bus.$emit('openHeaderMenuItem', 'analysis_view_template', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
    },
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
      return h(CustomTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          type: 'eptparam',
          isShowEdit: true, // 是否显示编辑节点按钮
          isShowDelete: true, // 是否显示删除节点按钮
          isShowMore: true, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: true // 目录是否显示更多按钮
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
    addNodeFun (data, node, type) { // 增加节点,且是处于编辑中
      console.log('addNodeFun:', data, node, type)
      this.isAddTreeNode = false // 先清空是否允许添加节点的标识
      let tempFlag = this.traverseTreeNode(this.eptTreeData)
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

    deleteNodeFun (data, node) { // 删除节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
        this.$axios(
          {
            url: '/paramtemplate/delete',
            method: 'post',
            params: {
              ID: data.ID
            },
            headers: {
              'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }
        ).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: '数据删除成功！'
          })
          this.getTreeData()

          this.eptTableData = []
          this.currentEptName = ''
          this.currentEptDesc = ''
          this.currentTreeId = ''
          this.currentEditNodeName = ''

          this.$bus.$emit('openHeaderMenuItem', 'analysis_view_template', {}, {}) // 修改二级菜单是否显示
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          this.$message.error('请求响应失败，请稍后重试！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    saveNodeFun (data, node) { // 保存处于编辑中的新增节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      // let parentNode = this.$util.getTreeNode(this.eptTreeData, data.ID).parentNode
      // 新增数据到数据库
      if (data.isAdd) {
        if (data.nodeType === 'catalog') {
        } else {
        }
      } else {
      }
    },
    cancelNodeFun (data, node) { // 取消处于编辑中的新增节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      if (data.isAdd) { // 新增
        let parentNode = this.$util.getTreeNode(this.eptTreeData, data.ID).parentNode
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
      this.eptTreeData = []
      this.eptTableData = []
      let that = this

      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/paramtemplate/tree',
        method: 'get',
        params: {
          likeContent: this.treeKeyword
        }
      }).then(response => {
        console.log('QueryAnalysisRecordCategory~~~:', response)
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框

        let resultData = response.data
        if (resultData.length > 0) {
          that.eptTreeData = resultData
        }

        if (exID) {
          that.defaultExpandedKeys = [exID]

          that.$nextTick(() => {
            that.$refs.eptTreeRef.setCurrentKey(exID)

            let node = this.$refs.eptTreeRef.getNode(exID)
            this.eptTreeNodeHandleClick(node.data, node)
          })
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    getFdvTreeData () { // FDV获取树节点数据
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/buildTree/getFdvTree',
        method: 'get',
        params: {
          likeContent: this.eptTreeKeyword
        }
      }).then(response => {
        console.log('getFdvTree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          let resultData = response.data.result.data
          if (this.$util.isNotEmptyObject(resultData)) {
            this.eptDialogTreeData = resultData.filter(item => {
              if (item.ID !== '1' && item.ID !== '2') {
                return item
              }
            })
          } else {
            this.eptDialogTreeData = []
          }

          let expandedKey = response.data.result['expanded-key']
          if (this.$util.isDefine(expandedKey)) {
            this.eptDefaultExpandedKeys.push(expandedKey)
          } else {
            this.eptDefaultExpandedKeys = []
          }
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
      })
    },

    cleanEptParam () {
      console.log('=== cleanEptParam')

      // this.eptDialogTreeData = []
      this.checkAll = false
      this.isIndeterminate = false

      // this.eptDialogName = ''
      // this.eptDialogDesc = ''
    },

    closeEptDialog () {
      this.dialogEptVisible = false
      this.cleanEptParam()
    },
    openEptDialog (param) {
      if (!this.$util.isDefine(this.currentTreeId) && param !== 'create') {
        this.$message({
          message: '请选择节点!',
          type: 'warning'
        })
        return
      }

      if (param === 'create') {
        this.eptDialogTitle = '创建模板'
        this.eptDialogName = ''
        this.eptDialogDesc = ''

        this.EptParams = []
        this.checkedEptParams = []
      } else {
        this.eptDialogTitle = '修改模板'

        this.eptDialogName = this.currentEptName
        this.eptDialogDesc = this.currentEptDesc
      }

      this.dialogEptVisible = true

      this.eptTreeNodeDesc = ''
      this.eptTreeKeyword = ''
      this.getFdvTreeData()
    },

    eptSearchTreeData () {
      this.eptTreeNodeDesc = ''
      this.getFdvTreeData()
    },

    eptHandleNodeClick (data, node, nodeCommpent) { // FDV 节点点击事件
      console.log(data)

      this.eptTreeNodeDesc = ''

      if (!data.CHILDREN) {
        if (this.checkedEptParams.includes(data.ID)) {
          this.$message({
            message: '该参数已经选择!',
            type: 'warning'
          })
          return true
        }
        this.EptParams.push(data)
        this.checkedEptParams.push(data.ID)

        let desc = data.DESCRIPTION
        if (this.$util.isDefine(desc)) {
          this.eptTreeNodeDesc = desc
        }

        this.handleCheckedEptParamsChange(this.checkedEptParams)
      }
    },

    handleCheckedEptParamsChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.EptParams.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.EptParams.length
    },
    handleCheckAllChange (val) {
      // this.checkedEptParams = val ? this.EptParams : []
      // this.isIndeterminate = false

      if (val) {
        this.checkedEptParams = this.EptParams.map((item) => {
          return item.ID
        })
        this.isIndeterminate = false
      } else {
        this.checkedEptParams = []
        this.isIndeterminate = ''
      }
    },

    removeEptParam (obj, i) {
      this.checkedEptParams.splice(i, 1)
      this.EptParams.splice(i, 1)
    },

    // checkAll (data) {
    //   this.checkedEptParams = this.EptParams.map((item) => {
    //     return item.id
    //   })

    //   // data.checkAll ? data.Params.forEach(item => {
    //   //   if (!data.value.includes(item.name)) {
    //   //     data.value.push(item.name)
    //   //   }
    //   // }) : data.value.splice(0)

    //   // data.isIndeterminate = false
    // },

    saveTableRow () {
      if (this.$util.isDefine(this.currentTreeId)) {
        this.eptDialogName = this.currentEptName
        this.eptDialogDesc = this.currentEptDesc

        this.saveEptParam(this.currentTreeId)
      }
    },

    saveEptParam (id) {
      // this.closeEptDialog()
      if (this.checkedEptParams.length < 1) {
        this.$message({ // 数据提交成功提示
          type: 'warning',
          message: '模板参数不能为空！'
        })
        return false
      }

      if (!this.$util.isDefine(this.eptDialogName)) {
        this.$message({ // 数据提交成功提示
          type: 'warning',
          message: '模板名称不能为空！'
        })
        return false
      }

      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 ]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      let str = this.eptDialogName
      if (!reg.test(str)) {
        this.$message({ // 数据提交成功提示
          type: 'warning',
          message: '模板的名字只含有汉字、数字、字母，前后不能有空格！'
        })
        return false
      } else if (!reg1.test(str)) {
        this.$message({ // 数据提交成功提示
          type: 'warning',
          message: '模板的名字不能有连续的空格！'
        })
        return false
      }

      this.$axios(
        {
          url: '/paramtemplate/add',
          method: 'post',
          params: {
            ID: id,
            NAME: this.eptDialogName,
            DESC: this.eptDialogDesc,
            PARAM: this.checkedEptParams.join(',')
          },
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        }
      ).then(response => {
        console.log('saveEptParam~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框

        this.$message({ // 数据提交成功提示
          type: 'success',
          message: '数据保存成功！'
        })

        this.defaultExpandedKeys = []
        if (this.$util.isDefine(id)) {
          this.getEptDetail(id)

          // this.getTreeData(id)
          let node = this.$refs.eptTreeRef.getNode(id)
          if (node != null) {
            this.$set(node.data, 'NAME', this.eptDialogName)
          }
        } else {
          this.getTreeData()
          this.defaultExpandedKeys.push('2')

          // this.$refs.tree.store.nodesMap[data.id].expanded = true
        }

        this.closeEptDialog()

        this.currentEptName = ''
        this.currentEptDesc = ''
        this.currentEptAttr = ''
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },

    setUpTempletStatus (flag, data, node) {
      if (!this.$util.isDefine(this.currentTreeId)) {
        this.$message({
          message: '请选择节点!',
          type: 'warning'
        })
        return
      }

      if (flag) {
        this.$confirm(`是否将 ${data.NAME} 设为公用模板?`, '设为公用', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('SHOW_LOADING', '正在设置公用模板，请稍等！') // 打开加载提示框
          this.$axios(
            {
              url: '/paramtemplate/common',
              method: 'post',
              params: {
                ID: data.ID
              },
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            }
          ).then(response => {
            this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
            this.$message({ // 数据提交成功提示
              type: 'success',
              message: '设置公用模板成功！'
            })
            this.getTreeData(data.ID)

            this.getEptDetail(data.ID)
          }).catch(response => {
            this.$store.commit('HIDE_LOADING', '拼命加载中！')
            this.$message.error('请求响应失败，请稍后重试！')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设为公用模板！'
          })
        })
      } else {
        this.$confirm(`是否取消 ${data.NAME} 为公用模版?`, '取消公用', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('SHOW_LOADING', '正在取消公用模板，请稍等！') // 打开加载提示框
          this.$axios(
            {
              url: '/paramtemplate/uncommon',
              method: 'post',
              params: {
                ID: data.ID
              },
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            }
          ).then(response => {
            this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
            this.$message({ // 数据提交成功提示
              type: 'success',
              message: '取消公用模板成功！'
            })
            this.getTreeData(data.ID)

            this.getEptDetail(data.ID)
          }).catch(response => {
            this.$store.commit('HIDE_LOADING', '拼命加载中！')
            this.$message.error('请求响应失败，请稍后重试！')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设为公用模板！'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消为公用模板！'
          })
        })
      }
    },

    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.ept {
  position: absolute;
  height: 100%;
  width: 100%;
}

.ept-wrapper-left {
  position: relative;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  padding-top: 15px;
  border-right: 1px solid #DDDDDD;
}
.tree-head-icon {
  margin: -5px 10px 10px;
}
.ept-wrapper-tree {
  overflow: auto;
  height: 90%;
}

.ept-wrapper-tree::-webkit-scrollbar{
   width: 8px;
  height: 8px;
}
.ept-wrapper-tree::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cccccc;
}
.ept-wrapper-tree >>> .el-tree {
  width: 100%;
}

.ept-wrapper-content {
  position: relative;
  width: 80%;
  height: 100%;

  box-sizing: border-box;
}

.ept-wrapper-content .ept-main {
  border-bottom: 1px solid #DDDDDD;
}

.ept-wrapper-content .ept-btns {
  height: 70px;
}
.ept-btns button {
  padding: 0;
  margin: 20px;
  float: right;
  font-size: 12px;
  border-radius: 4px;
  line-height: 22px;
  width: 90px;
  height: 34px;
}

.ept-table {
  position: relative;
  width: 70%;
  height: 100%;
}

/* .ept-table >>> .el-table tr > td:nth-child(-n+2) {
  user-select: none;
}
*/

.ept-table .icon-move {
  cursor: move;
}

.ept-table >>> .el-table::before {
  height: 0;
}

.ept-table .el-table .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
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

.ept-wrapper-right {
  position: relative;
  width: 30%;

  box-sizing: border-box;
  border-left: 1px solid #DDDDDD;
}

.ept-wrapper-right .header {
  box-sizing: border-box;
  padding: 0 10px;
  height: 44px;
  line-height: 44px;
  color: rgba(36, 93, 161, 1);
  border-bottom: 1px solid #DDDDDD;
}
.ept-wrapper-right-attr-box .input-box {
  box-sizing: border-box;
  margin: 8px 10px;
}

.ept-wrapper-right-attr-box >>> .el-textarea__inner {
  resize: none;
  height: 120px;
}

.grid-dialog >>> .el-dialog {
  margin: 5vh auto 0 !important;
  width: 790px;
  height: 90vh;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
}
.grid-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex-direction: column;

  /* height: 90%; */
  min-height: 200px;

  flex: 1;
  border-bottom: 1px solid #DDDDDD;
}

.grid-dialog >>> .el-dialog__headerbtn {
  top: 10px !important;
}
.grid-dialog >>> .el-dialog__header {
  padding: 5px 20px !important;
  border-bottom: 1px solid #DDDDDD;

  height: 46px;
}
.grid-dialog >>> .el-dialog__footer {
  padding: 14px 20px !important;
  border-bottom: 1px solid #DDDDDD;

  height: 62px;
}

.dialog-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  width: 95%;

  box-sizing: border-box;
  height: 35px;
  font-size: 12px;
  color: #9B9B9B;
}
.dialog-title .header {
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #555555;
  margin-right: 20px;
}
.dialog-title .header-info span {
  padding-right: 15px;
}

.grid-dialog .input-box {
  margin: 10px 20px 0;

  box-sizing: border-box;
}

.grid-dialog .ept-wrapper {
  margin: 10px 20px;
  box-sizing: border-box;
}

.ept-wrapper .ept-params-content {
  width: 340px;
  box-sizing: border-box;
  border: 1px solid #DDDDDD;
}

.ept-params-content > .header {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #DDDDDD;
}

.ept-params-content .tree-head-icon {
  margin-top: 8px;
}

.ept-params-content .ept-dialog-tree,
.ept-params-content .select-params {
  overflow-y: auto;
  box-sizing: border-box;
}

.ept-params-content .select-params {
  padding: 8px 10px;
}

.select-params >>> .el-checkbox-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  box-sizing: border-box;
  height: 35px;
  font-size: 12px;
  color: #9B9B9B;
}

.select-params >>> .el-checkbox+.el-checkbox {
  margin-left: 0;
}

.params-item {
  position: relative;
  margin: 4px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
}

.params-item i {
  position: absolute;
  top: 5px;
  right: 6px;
  display: none;
}
.params-item:hover {
  background: #87CEFA;
}
.params-item:hover i {
  display: block;
}

.tree-desc {
  width: 100%;
  height: 60px;
  word-break: break-word;
  border-top: 1px solid #DDDDDD;
  box-sizing: border-box;
}
.tree-desc .content {
  margin: 8px 0 0 8px;
  height: 50px;
  overflow: auto;
  box-sizing: border-box;
}
.tree-desc .view-table-btn-info {
  margin: 8px 0 0 8px;
  height: 50px;
  overflow: auto;
  box-sizing: border-box;
}
.tree-desc .view-table-btn-info span:first-child {
  color: #666666;
  font-size: 12px;
  line-height: 14px;
}
.tree-desc .view-table-btn-info span:last-child {
  color: #333333;
  font-size: 12px;
  line-height: 16px;
}
</style>
