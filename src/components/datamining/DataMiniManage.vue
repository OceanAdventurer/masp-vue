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
          :data="mtreeData"
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
          <el-table-column prop="DATA_MINING_NAME" label="名称" align="left" ></el-table-column>
          <el-table-column prop="DATA_MINING_CREATE_TIME" label="修改日期" align="left" width="200"></el-table-column>
          <el-table-column prop="STATUS" label="状态" align="left" width="200" ></el-table-column>
          <el-table-column label="操作" width="100" align="left">
            <template slot-scope="scope">
              <div class="row-icon-group">
                <div class="icon-edit tab-icon-set mr10" title="编辑分析" @click="managerRowEdit(scope.row)"></div>
                <div class="icon-look tab-icon-set mr10" title="查看结果" @click="lookResult(scope.row)"></div>
                <div class="icon-delete tab-icon-set mr10" title="删除分析" @click="managerRowDelete(scope.$index, scope.row)"></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

          <div class="df df-fd-r df-jc-fs df-ai-c w100">
            <span class="file-name">事件库名  </span>
            <div class="df-f1" style="min-width: 0;">
              <el-input
                placeholder="请选择事件库名"
                v-model="eventName"
                size="small"
                readonly
                clearable>
              </el-input>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closeEventDialog()">取  消</el-button>
          <el-button type="primary" size="mini" @click="assemblyEventParams()">确  定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DataMiniTree from 'components/base/DataMiniTree'

export default {
  name: 'Manager',
  data () {
    return {
      pageNo: 1,
      pageSize: 999,
      treeData: [],
      treeNode: [],
      profileId: '', // 子节点ID
      disabledMenuObj: '',
      hideMenuObj: '',
      parentId: 0,
      mtreeData: [], // 树状数据
      treeKeyword: '',
      defaultProps: { // 树节点默认的属性
        children: 'CHILDREN',
        label: 'NAME'
      },
      managerTableData: [], // 表格数据
      currentTreeId: '', // 当前节点编号
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
      eventStoreObj: {}
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
    })

    this.$bus.$on('saveDataMinIngEmit', () => { // 新建目录
     this.getDataMinins(this.treeData.ID)
    })
    this.$bus.$on('dataMining_catalog_new', () => { // 新建目录
      this.addNodeFun(this.treeData, this.treeNode, 'catalog')
    })
    this.$bus.$on('dataMining_children_new', () => { // 添加节点
      this.addNodeFun(this.treeData, this.treeNode, 'node')
    })
    this.$bus.$on('dataMining_catalog_del', () => { // 删除目录
      this.deleteNodeFun(this.treeData, this.treeNode, 'catalog')
    })
    this.$bus.$on('dataMining_file_rename', () => { // 重命名子节点
      this.editNodeFun(this.treeData, this.treeNode)
    })
    this.$bus.$on('dataMining_file_delete', () => { // 删除子节点
      this.deleteNodeFun(this.treeData, this.treeNode, 'node')
    })
  },
  destroyed () {

  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    setManagerTableWidth () {
      // setTimeout(() => {
      //   if (document.getElementById('analysisManager') && document.getElementById('analysisManager').style.display !== 'none') {
      //     let elMainWidth = document.getElementById('elMain').clientWidth
      //     this.managerTableWidth = elMainWidth - elMainWidth * 0.2
      //
      //     this.$refs.managerTableCon.doLayout()
      //     console.log('elMainWidth----@@@@@:' + elMainWidth, 'managerTableWidth@@@@@:' + this.managerTableWidth)
      //   }
      // }, 50)
    },
    managerRowEdit (row) { // 重新编辑新建分析参数
      this.$axios.get('/dm/getDataMiningDetail', {params: {id: row.ID}}).then(response => {
        let data = response.data
        //打开配置界面，并且打开建模结果页面
        this.$bus.$emit('dataMiningAddTab', {enName: 'dataMining_file_new', zhName: row.DATA_MINING_NAME, isClosable: true, parent: 'dataMining_mining', count: 0, dataMining: row, editData: data})
      }).catch(response => {
      })
    },
    // 查看结果
    lookResult (row) { // 重新编辑新建分析参数
      if (row.STATUS === '未运行' || row.STATUS === '运行中' || row.STATUS === '运行失败') {
        this.$message.error('暂无建模结果')
        return false
      }
      this.$axios.get('/dm/getDataMiningDetail', {params: {id: row.ID}}).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        let data = response.data
        //打开配置界面，并且打开建模结果页面
        // this.$bus.$emit('dataMiningAddTab', {enName: 'dataMining_file_new', zhName: row.DATA_MINING_NAME, isClosable: true, parent: 'dataMining_mining', count: 0, dataMining: row, editData: data})
          switch (data.dataMiningType) {
            case 'linear': // 线性回归
              this.$bus.$emit('dataMiningAddTab', {enName: 'dataMining_modeling_linear_result', zhName: '建模结果-线性回归', isClosable: true, parent: 'dataMining_mining', count: 0, resultData: data})
           break
            case 'svm': // 支持向量
              this.$bus.$emit('dataMiningAddTab', {enName: 'dataMining_modeling_svm_result', zhName: '建模结果-支持向量', isClosable: true, parent: 'dataMining_mining', count: 0, resultData: data})
            break
            case 'kmeans': // kmeans
              this.$bus.$emit('dataMiningAddTab', {enName: 'dataMining_modeling_kmeans_result', zhName: '建模结果-kmeans', isClosable: true, parent: 'dataMining_mining', count: 0, resultData: data})
              break
            case 'fpgrowth': // fpgrowth
              this.$bus.$emit('dataMiningAddTab', {enName: 'dataMinging_mode_fpgrowth_result', zhName: '建模结果-fpgrowth', isClosable: true, parent: 'dataMining_mining', count: 0, resultData: data})
            break
          }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      })
    },
    managerRowDelete (index, rows) { // 删除行
      this.deleteDataMining(index, rows)
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
      this.treeData = data
      this.treeNode = node
      let hideMenuObj = {}
      let disabledMenuObj = {}

      if (!data.CHILDREN && !data.isAdd && !data.status) { // 如果不是目录,且节点不在编辑中，则点击节点时候获取分析子集数据
        this.getDataMinins(data.ID)
        this.profileId = data.ID
        this.$bus.$emit('emitDataMiningToTab', this.profileId)
        hideMenuObj.dataMining_file_new = true // 新建分析
        // hideMenuObj.analysis_event_file_new = true
        hideMenuObj.dataMining_file_rename = true // 重命名
        hideMenuObj.dataMining_file_delete = true // 删除
        // if (data.TYPE === 'USERNODE') { // 只能创建不能删除
        //   disabledMenuObj.dataMining_file_new = false // 新建分析
        //   // disabledMenuObj.dataMining_file_rename = false
        //   disabledMenuObj.dataMining_file_rename = true // 重命名
        //   disabledMenuObj.dataMining_file_delete = true // 删除
        // } else if (data.TYPE === 'USERCHILDNODE') { // 可以创建可以删除
        //   disabledMenuObj.dataMining_file_new = false // 新建分析
        //   // disabledMenuObj.analysis_event_file_new = false
        //   disabledMenuObj.dataMining_file_rename = false // 重命名
        //   disabledMenuObj.dataMining_file_delete = false // 删除
        // } else { // TREE COMMENTTREE 都不可以操作
        //   disabledMenuObj.dataMining_file_new = true // 新建分析
        //   // disabledMenuObj.analysis_event_file_new = false
        //   disabledMenuObj.dataMining_file_rename = true // 重命名
        //   disabledMenuObj.dataMining_file_delete = true // 删除
        // }

        if (this.$util.isDefine(this.$store.state.copyAnalysisParamsId)) {
          hideMenuObj.tree_node_paste = true
          disabledMenuObj.tree_node_paste = false
        }
      } else { // 点击目录时清空分析表格
        this.managerTableData = []
        this.totalCount = 0
        this.currentTreeId = ''

        hideMenuObj.dataMining_catalog_new = true // 添加分析目录
        hideMenuObj.dataMining_children_new = true // 添加分析节点
        // hideMenuObj.tree_node_edit = true // 重命名
        if (node.level !== 1) {
          hideMenuObj.dataMining_catalog_del = true
        }

        // tree, commontree, usernode, userchildnode : 前两种都没有按钮  后两种有所有按钮  usernode没有删除、重命名
        if (data.TYPE === 'USERNODE') { // 只能创建不能删除
          disabledMenuObj.dataMining_catalog_new = false // 添加分析目录
          disabledMenuObj.dataMining_children_new = false // 添加分析节点
          disabledMenuObj.dataMining_catalog_del = true
        } else if (data.TYPE === 'USERCHILDNODE') { // 可以创建可以删除
          disabledMenuObj.dataMining_catalog_new = false // 添加分析目录
          disabledMenuObj.dataMining_children_new = false // 添加分析节点
          disabledMenuObj.dataMining_catalog_del = false
        } else { // TREE COMMENTTREE 都不可以操作
          disabledMenuObj.dataMining_catalog_new = true // 添加分析目录
          disabledMenuObj.dataMining_children_new = true // 添加分析节点
          disabledMenuObj.dataMining_catalog_del = true
        }
      }
      this.hideMenuObj = hideMenuObj
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('openHeaderMenuItem', 'dataMining_mining', hideMenuObj, disabledMenuObj) // 修改二级菜单是否显示
      this.$bus.$emit('analysisAddCatalog', data, node)
    },
    renderContent (h, {node, data, store}) { // tree自定义方法
      const that = this // 指向vue
      return h(DataMiniTree, {
        props: {
          data: data, // 当前节点的数据
          node: node, // 当前节点的Node对象
          isShowEdit: data.TYPE === 'USERNODE' || data.TYPE === 'USERCHILDNODE', // 是否显示编辑节点按钮
          isShowDelete: data.TYPE === 'USERCHILDNODE' || data.TYPE === 'PROFILE', // 是否显示删除节点按钮
          isShowMore: data.TYPE === 'USERNODE' || data.TYPE === 'USERCHILDNODE' || data.TYPE === 'PROFILE', // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowMoreForCatalog: data.TYPE === 'USERNODE' || data.TYPE === 'USERCHILDNODE'// 目录是否显示更多按钮
        },
        on: { // 绑定方法
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          pasteTreeNodeHandle: ((data, node) => that.pasteNodeFun(data, node)),
          delTreeNodeHandle: ((data, node, type) => that.deleteNodeFun(data, node, type)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node))
        }
      })
    },
    addNodeFun (data, node, type) { // 增加节点,且是处于编辑中
      console.log('addNodeFun:', data, node, type)
      this.isAddTreeNode = false // 先清空是否允许添加节点的标识
      let tempFlag = this.traverseTreeNode(this.mtreeData)
      if (tempFlag === true) {
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
        console.log('deleteDataMiningCategoryu~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        if (response.data.status === '0') {
          this.$message({ // 数据提交成功提示
            type: 'success',
            message: '数据复制成功！'
          })
          this.getDataMinins(data.ID)
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
    deleteNodeFun (data, node, type) { // 删除节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
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
      let parentNode = this.$util.getTreeNode(this.mtreeData, data.ID).parentNode
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
        let parentNode = this.$util.getTreeNode(this.mtreeData, data.ID).parentNode
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
      this.mtreeData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/dm/getProfileTree',
        method: 'get',
        params: {
          parentId: this.parentId,
          searchContent: this.treeKeyword
        }
      }).then(response => {
        console.log('getProfileTree~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.mtreeData = response.data.data
        this.defaultExpandedKeys = response.data.defaultNode
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        // this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    addTreeData (pid, name, type, id, treeData) { // 新增树节点数据  id:父节点的编号，name: 需要增加的节点名字, type:节点类型，1：节点 0：目录
      this.$store.commit('SHOW_LOADING', '正在保存数据，请稍等!') // 打开加载提示框

      var url = ''
      var paramStr = {}
      if (type === '0') {
        url = '/dm/addProfileTree'
        paramStr = {parentId: pid, name: name}
      } else {
        url = '/dm/addProfile'
        paramStr = {profileName: name, treeId: pid}
      }
      paramStr = this.$qs.stringify(paramStr)
      // 保存节点到数据库
      this.$axios.post(url, paramStr).then((response) => {
        this.$store.commit('HIDE_LOADING', '正在保存数据，请稍等!') // 打开加载提示框
        var dataRes = response.data
        if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
          this.getTreeData()
          // 保存节点到页面
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
      })
    },
    deleteTreeData (data) { // 删除树节点数据 TODO: 有子数据不能删除
      if (data['CHILDREN']) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
          this.$axios.get('/dm/deleteProfileTree', {params: {id: data.ID}}).then(response => {
            this.$store.commit('HIDE_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
            let respData = response.data
            if (respData.status === '0') { // 成功
              this.$message({
                type: 'success',
                message: respData.message
              })
              let parentNode = this.$util.getTreeNode(this.mtreeData, data.ID).parentNode
              parentNode.CHILDREN.forEach((v, i) => {
                if (v.ID === data.ID) {
                  parentNode.CHILDREN.splice(i, 1)
                }
              })
            } else if (respData.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              this.$message.error(respData.message)
            }
          }).catch(response => {
            this.$store.commit('HIDE_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
      } else {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
        this.$axios.get('/dm/deleteProfile', {params: {profileId: data.ID}}).then(response => {
          this.$store.commit('HIDE_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
          let respData = response.data
          if (respData.status === '0') { // 成功
            this.$message({
              type: 'success',
              message: respData.message
            })
            let parentNode = this.$util.getTreeNode(this.mtreeData, data.ID).parentNode
            parentNode.CHILDREN.forEach((v, i) => {
              if (v.ID === data.ID) {
                parentNode.CHILDREN.splice(i, 1)
              }
            })
          } else if (respData.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(respData.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '正在删除数据，请稍等！') // 打开加载提示框
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
          url: '/dm/renameProfile',
          method: 'post',
          params: {
            name: name,
            id: id
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
      })
    },
    getDataMinins (id) { // 获取分析子集详细信息
      this.managerTableData = []
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等!')
      this.$axios({
        url: '/dm/getDataMinins',
        method: 'get',
        params: {
          profileId: id,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(response => {
        console.log('getDataMinins~~~:', response)
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框
        let data = response.data
        this.managerTableData = data.content
        this.pageSize = data.pageSize
        this.pageNo = data.pageNo
        this.totalCount = data.recordCount
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!') // 隐藏加载框
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    deleteDataMining (index, rows) { // 删除分析子集的数据
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在删除数据，请稍等!')
        this.$axios({
          url: '/dm/deleteDataMining',
          method: 'post',
          params: {
            id: rows.ID
          }
        }).then(response => {
          console.log('getProfileTree~~~:', response)
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          let data = response.data
          if (data.status === '0') {
            this.$message({
              type: 'success',
              message: '成功'
            })
            this.getDataMinins(this.profileId)
          } else {
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
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
          this.getDataMinins(this.currentTreeId) // 重新查询子集数据
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
    reloadGetAnalysisRecord () { // 新建分析界面点击保存后，重新查询分析子集数据
      if (this.$store.state.managerTreeNodeId) {
        this.getDataMinins(this.$store.state.managerTreeNodeId)
      }
    },
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
      return h(DataMiniTree, {
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

.analysis-tab-left {
  position: relative;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
  padding-top: 15px;
  border-right: 1px solid #DDDDDD;
  border-bottom: 1px solid #DDDDDD;
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
</style>
