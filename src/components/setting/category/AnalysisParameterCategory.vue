<style scoped>
  .category {
    display: flex;
    flex-direction: row;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  /* 左侧 */
  .category_left {
    width: 20%;
    height: 100%;
    border-right: 1px solid #DDDDDD;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .left_tree {
    height: -webkit-fill-available;
    cursor: pointer;
    overflow: scroll;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
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
    /* border: 1px solid #ebeef5; */
    height: 39px;
    /* margin-bottom: 10px; */
  }

  .left_filter_search {
    background-image: url(../../../assets/images/icon66_1.png);
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .left_filter_refresh {
    background-image: url(../../../assets/images/icon67.png);
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .category_middle {
    width: calc(100% - 335px);
  }

  .category_main {
    width: calc(100% - 335px);
    height: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid #ebeef5;
  }

  /* 中间 */
  .main_content {
    width: 60%;
    height: 100%;
    padding: 0px 2px;
    font-size: 14px;
    color: #606266;
  }

  .content_tab_pane {
    width: 95%;
    font-size: 14px;
    color: #606266;
    margin: 0px auto;
  }

  .content_mapped_value {
    color: #df5593;
  }

  .content_condition {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .input_condition {
    width: 40%;
  }

  .content_list {
    margin-top: 10px;
  }

  .content_page {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
  }

  /* 右侧 */
  .main_attr {
    width: 40%;
    height: 100%;
    padding-left: 2px;
    border-left: 1px solid #ebeef5;
  }

  .content_tab_attr {
    margin: 0 auto;
    width: calc(70% + 20px);
    font-size: 12px;
    color: #606266;
  }

  .main_attr_detail {
    margin-top: 10px;
    display: grid;
    grid-row-gap: 20px;
  }

  .input_text {
    width: 75%;
  }

  .equation_img {
    background-image: url(../../../assets/images/icon91.png);
    background-size: cover;
    width: 25px;
    height: 17px;
  }

  .detail_mapped_text {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 75%;
    margin-left: 48px;
  }

  .input_text_mapped {
    margin-right: 10px;
  }

  .tab_attr_mapped {
    font-size: 14px;
    color: #606266;
  }

  .detail_explain {
    display: flex;
    flex-direction: row;
    width: 90%;
  }

  .detail_explain_text {
    width: 58px;
  }

  .main_attr_save {
    position: relative;
    left: 66%;
    bottom: 10px;
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
    /* width: calc(70% + 20px); */
    width: 90%;
    font-size: 14px;
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
    background-image: url(../../../assets/images/icon66_1.png);
    background-size: cover;
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }

  .clean_rules_devare {
    background-image: url(../../../assets/images/icon75.png);
    background-size: cover;
    width: 18px;
    height: 18px;
  }

  .clean_rules_abnormal {
    /* width: 245px; */
    height: 200px;
    margin-top: 10px;
    border: 1px solid #ebeef5;
    padding-left: 10px;
  }

  .el-row {
    /* width: 255px; */
    padding: 5px 0px;
    border-bottom: 1px solid #ebeef5;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    line-height: 35px;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    min-height: 36px;
  }

  .row-bg {
    background-color: #f9fafc;
  }

  .icon_more {
    background-color: red;
  }

  .category_right {
    width: 80%;
  }

  .tab-profile {
    width: 100%;
  }

  .content-main {
    padding: 10px 0px;
  }
  .el-tabs__nav is-top{
    margin-left: 10px;
  }

  .el-tabs__nav is-top{
    margin-left: 10px;
  }
  .el-tabs--card .el-tabs__item {
    color: #3A6BB9;
    margin-left: 10PX;
  }
  .el-tabs__active-bar {
    background-color: #3A6BB9;
    margin-left: 10px;
  }
</style>

<template>
  <!-- 编辑分析参数库 -->
  <div class="category">
    <!-- 左侧元素 -->
    <div class="category_left cm_tab_file_new_left">
      <!-- 过滤节点 -->
      <div class="left_filter" v-show="searchShow">
        <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')" size="small"></i>
        </el-input>
      </div>
      <div class="left_tree" v-loading="treeLoading">
        <el-tree
          class="filter-tree" :data="fileNewTreeArr" :props="defaultTreeProps" :filter-node-method="filterNode"  ref="tree" draggable
          highlight-current @node-click="handleNodeClick" :render-content="renderContent"
          @node-drag-end="handleDragEnd">
        </el-tree>
      </div>
    </div>
    <div class="category_right cm_tab_file_new_main">
      <div style="height: 90%">
        <el-tabs v-model="profileActiveName" class="tab-profile">
          <el-tab-pane label="指派管理员" name="AssignAdmin">
            <div class="content-main">
              <CateGoryTable  v-loading="tableLoading" :userData="userData" :checkedUserIds="checkedUserIds" :keywords="keywords" @searchKeyWords="getKeyWords" @checkedUserIds="getCheckedUserIds"></CateGoryTable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="分配用户" name="AssignUsers">
            <div class="content-main">
              <CateGoryTable  v-loading="tableLoading" :userData="userData" :checkedUserIds="checkedUserIds" :keywords="keywords"  @searchKeyWords="getKeyWords" @checkedUserIds="getCheckedUserIds"></CateGoryTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="height:10%;border-top: solid 1px #dddddd;padding: 10px 1.5% 10px 10px">
        <el-button type="primary" style="float: left;margin-left: 10px;float: right" @click="saveData" size="mini">保存
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import CategoryTree from 'components/setting/category/CategoryTree'
  import CateGoryTable from 'components/setting/category/CateGoryTable'

  export default {
    data () {
      return {
        filterText: '',
        defaultTreeProps: {
          label: 'NAME',
          children: 'CHILDREN'
        },
        checkedUserIds: [], // 用户id集合
        keywords: '',
        parentTreeNodeId: '',
        treeRootName: '',
        linkDescription: '',
        checkBoxValue: false, // true 表示跳转到复制页面  false 表示跳转到新建界面
        id: '',
        profileCatalogId: '',
        treeLoading: false,
        loadingText: '加载中...',
        fileNewTreeArr: [], // 左侧树状数据
        isAddTreeNode: false, // 当前节点编辑状态
        searchShow: true, // 树节点搜索框
        tabProfileName: '', // tab的name
        tabProfileLabel: '', // tab 的label
        profileActiveName: 'AssignAdmin', // 选中tab的name
        activeName: 'category',
        tableLoading: false,
        parentId: '2',
        computeShow: false,
        computeDate: '',
        detailId: '',
        userData: [], // 符合表格的数据
        userIdsMap: {},
        hideMenuObj: {},
        currentEditNodeName: '' // 当前正在编辑的节点名字
      }
    },
    props: [],
    components: {
      CateGoryTable
    },
    watch: {
      // 点击选项卡触发事件
      profileActiveName () {
        this.checkedUserIds = [] // 清空选中的数据
        if (this.detailId) {
          // 如果detailId不能为空，则先查询详情在查询用户默认选中
          this.getDetail(this.detailId)
        }
      },
      EditNodeName () {
        this.currentEditNodeName = this.EditNodeName
      },
      filterText (val) {
        this.$refs.tree.filter(val)
      },
      seniorRadio (val) {
        if (val) {
          this.mappedText = ''
        }
      },
      currentPage (val) {
        this.currentChangeClick(val)
      }
    },
    mounted () {
      this.getTree(this.parentId)
    },
    methods: {
      // 接收 输入搜索字段 的值，并筛选
      getKeyWords (val) {
        this.keywords = val
        this.getUserRoleList()
      },
      // 初始化树
      getTree (parentId) {
        this.treeLoading = true
        this.$axios.get('/commonTree/getTree', {
          params: {
            parentId: parentId
          }
        }).then(response => {
          this.fileNewTreeArr = []
          this.treeLoading = false
          var data = response.data
          if (data.length > 0) {
            let arr = []
            let obj = {}
            obj.NAME = '公共树'
            obj.ID = '2'
            obj.CHILDREN = data
            arr.push(obj)
            this.fileNewTreeArr = arr
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
          this.treeLoading = false
        })
      },
      // 自定义子节点内容
      renderContent (h, {node, data, store}) {
        var that = this // 指向vue
        return h(CategoryTree, {
          props: {
            treeRootName: this.treeRootName,
            data: data, // 当前节点的数据
            node: node, // 当前节点的Node对象
            isShowMore: true, // 是否显示更多按钮
            isCurrentUser: true,
            isShowMoreForNode: true, // 子节点是否显示更多按钮
            isShowMoreForCatalog: true // 目录是否显示更多按钮
          },
          on: { //  data node store
            addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
            cancelTreeNodeHandle: ((data, node, type) => that.cancelNodeFun(data, node, type)),
            editTreeNodeHandle: ((data, node, type) => that.editTreeNode(data, node, type)),
            delTreeNodeHandle: ((data, node, type) => that.delTreeNode(data, node, type)),
            saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node))
          }
        })
      },
      delTreeNode (data, node, type) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('/commonTree/deleteTreeNode', {params: {nodeId: data.ID}}).then(response => {
            var retData = response.data
            if (retData.status !== null && retData.status !== '' && retData.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', retData)
            } else if (retData.status === '0') {
              this.$message({
                message: retData.message,
                type: 'success'
              })
              let parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
              parentNode.CHILDREN.forEach((v, i) => {
                if (v.ID === data.ID) {
                  parentNode.CHILDREN.splice(i, 1)
                }
              })
            } else {
              this.$message.error(retData.message)
            }
          }).catch(response => {
            console.log('x')
          })
        }).catch(() => {
          console.log('x')
        })
      },
      // 重命名
      editTreeNode (data, node, type) {
        // 如果为false则表示可以新增，true不可以新增
        let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
        if (tempFlag) {
          this.$message({
            message: '有节点处于编辑中，请编辑完再添加!',
            type: 'warning'
          })
        } else {
          if (data.NAME !== null) { // 编辑目录
            if (type === 'edit_category') {
              this.currentEditNodeName = data.NAME // 取消编辑时用
              this.$set(data, 'status', 1)
              this.$set(data, 'isAdd', false)
              console.log('editNodeFun', data, node)
            } else {
              console.log('nothing')
            }
          }
        }
      },
      // 创建下级目录
      addNodeFun (data, node, type) {
        // 如果为false则表示可以新增，true不可以新增
        let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
        if (tempFlag) {
          this.$message({
            message: '有节点处于编辑中，请编辑完再添加!',
            type: 'warning'
          })
        } else {
          this.parentTreeNodeId = data.ID
          node.expanded = true // 展开节点显示添加的节点信息
          if (data.NAME) {
            // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
            if (type === 'catalog') { // 新增目录
              data.CHILDREN.push({
                ID: this.$util.generateUUID(),
                parentId: data.ID,
                NAME: null,
                CHILDREN: [],
                status: 1,
                nodeType: type,
                isAdd: true
              })
            } else { // 创建下级节点
              data.CHILDREN.push({ID: this.$util.generateUUID(), parentId: data.ID, NAME: null, status: 1, nodeType: type, isAdd: true})
            }
          }
        }
      },
      // 保存节点内容，且是处于编辑中
      saveNodeFun (data, node) {
        let reg = /\s/
        if (reg.test(data.NAME)) {
          this.$message({
            message: '不能包含空格，请重新输入',
            type: 'warning'
          })
        } else {
          var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode // 递归查找父节点
          if (data.isAdd) { // 新增节点
            this.addTreeData(data, parentNode)
          } else { // 编辑节点
            // 请输入节点内容，此else不能删除
            this.editTwodimensional(data, node)
          }
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
      // 保存新增节点
      addTreeData (data, parentNode) {
        var url = ''
        var paramStr = {}
        // 新增目录
        url = '/commonTree/addTreeNode'
        paramStr = {parentId: parentNode.ID, nodeName: data.NAME}
        this.$axios.get(url, {params: paramStr}).then(response => {
          var resData = response.data
          if (resData.status === '0' || resData.status === 0) {
            this.$message({
              message: resData.message,
              type: 'success'
            })
            this.keywords = ''
            this.userData = []
            this.detailId = ''
            // 保存节点到页面
            var childData = parentNode.CHILDREN
            for (var i = 0; i < childData.length; i++) {
              if (childData[i].ID === data.ID) {
                data.status = 0
                parentNode.CHILDREN.splice(i, 1, data)
              }
            }
            // 加载新增节点的id
            this.$axios.get('/commonTree/getTree', {params: {parentId: parentNode.ID}}).then(response => {
              var resData = response.data
              if (resData.length > 0) {
                if (resData.status !== null && resData.status !== '' && resData.status === 'E1001') {
                  this.$bus.$emit('logBackInHandle', response.data)
                } else {
                  parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
                  parentNode.CHILDREN = resData
                }
              }
            }).catch(response => {
              // this.$message.error('数据加载失败!')
            })
            this.isAddTreeNode = false
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.$message.error(resData.message)
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
        })
      },
      editTwodimensional (data, parentNode) {
        this.$axios.get('/commonTree/renameTreeNode', {
          params: {
            nodeId: data.ID,
            nodeName: data.NAME
          }
        }).then(response => {
          var resPdata = response.data
          if (resPdata.status !== null && resPdata.status !== '' && resPdata.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else if (resPdata.status === '0') {
            this.$message({
              type: 'success',
              message: resPdata.message
            })
            // 修改页面中tree数据
            this.$set(data, 'status', 0)
            this.$set(data, 'isAdd', false)
            this.isAddTreeNode = false
            //this.getTree()
          } else {
            this.$message.error({
              message: resPdata.message
            })
          }
        }).catch(response => {
          this.$message.error({message: '保存失败，服务器异常'})
        })
      },
      // 取消处于编辑中的新增节点
      cancelNodeFun (data, node, type) {
        if (data.isAdd) { // 新增
          var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
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
        this.isAddTreeNode = false
      },
      // 树节点过滤图标
      filterTree (flag) {
      },
      // 根据条件获取用户
      getUserRoleList () {
        this.tableLoading = true
        this.userIdsMap = {}
        var str = encodeURIComponent(this.keywords)
        let url = '/user/getAllUsers?searchContent=' + str //
        this.$axios.get(url).then(response => {
          this.tableLoading = false
          console.log('getUserRoleList~~~:', response)
          let data = response.data
          if (data !== null && data.length > 0) {
            for (let i = 0; i < this.checkedUserIds.length; i++) {
              this.userIdsMap[this.checkedUserIds[i]] = this.checkedUserIds[i]
            }
            let arr1 = []
            let arr2 = []
            for (let i = 0; i < data.length; i++) {
              if (this.userIdsMap[data[i].ID]) {
                arr1.push(data[i])
              } else {
                arr2.push(data[i])
              }
            }
            this.userData = []
            arr1.push.apply(arr1, arr2)
            this.userData = arr1
          } else {
            this.userData = []
            this.tableLoading = false
            this.$message.error(data.message)
          }
        })
      },
      // 刷新事件
      refresh (parentNode) {
        this.treeLoading = true
        // 加载新增节点的id
        this.$axios.get('/commonTree/getTree', {params: {parentId: parentNode.ID}}).then(response => {
          this.treeLoading = false
          var resData = response.data
          if (resData.length > 0) {
            if (resData.status !== null && resData.status !== '' && resData.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
              parentNode.CHILDREN = resData
            }
          }
        }).catch(response => {
          // this.$message.error('数据加载失败!')
        })
      },
      filterNode (value, data) {
        if (!value) return true
        return data.NAME.toUpperCase().indexOf(value.toUpperCase()) !== -1
      },
      // 点击子节点击事件 加载中间及右侧数据
      handleNodeClick (data, node, nodeCommpent) {
        let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
        if (!tempFlag) {
          this.$bus.$emit('showSettingCategoryDefault', false) // 是否默认显示二级菜单
          this.parentTreeNodeId = data.ID
          var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
          }
          if (data.NAME !== null) {
            if (data['CHILDREN']) { // 点击父节点
            } else {
            }
          }
          if (data.ID === '2') {
            // 根据权限显示header菜单 注意tree的菜单也同步根据权限显示
            hideMenuObj['setting_analysis_parameter_category'] = false
            hideMenuObj['setting_create_next_catalog'] = false
            hideMenuObj['setting_edit_catalog'] = false
            hideMenuObj['setting_remove_catalog'] = false
            hideMenuObj['setting_create_catalog'] = true
          } else {
            // 根据权限显示header菜单 注意tree的菜单也同步根据权限显示
            hideMenuObj['setting_analysis_parameter_category'] = false
            hideMenuObj['setting_create_catalog'] = false
            hideMenuObj['setting_create_next_catalog'] = true
            hideMenuObj['setting_edit_catalog'] = true
            hideMenuObj['setting_remove_catalog'] = true
          }
          this.detailId = data.ID
          this.keywords = ''
          this.userData = []
          // 子节点点击获取详情
          this.getDetail(data.ID)
          this.hideMenuObj = hideMenuObj
          this.$bus.$emit('openHeaderMenuItem', 'setting_category', hideMenuObj, {}) // 修改二级菜单
          this.$bus.$emit('getAnlysiParamCategoryTreeData', data, node, this.fileNewTreeArr) // 传值到SettingTab  父組件
        }
      },
      //得到公共树节点详细信息
      getDetail (id) {
        this.$axios.get('/commonTree/getNodeDetail', {
          params: {
            nodeId: id
          }
        }).then(response => {
          let data = response.data
          if (data !== null) {
            if (this.profileActiveName === 'AssignAdmin') { // 指派管理员
              this.checkedUserIds = data.MANAGER_ID
            } else { //分配用户
              this.checkedUserIds = data.OWNER_ID
            }
            // 查询用户
            this.getUserRoleList()
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('获取详情失败')
        })
      },
      getCheckedUserIds (v) {
        this.checkedUserIds = v
      },
      saveData () {
        if (!this.detailId || !this.checkedUserIds) {
          this.$message.error('请先选中')
          return false
        }
        var url = ''
        var paramStr = {}
        if (this.profileActiveName === 'AssignAdmin') {
          url = '/commonTree/setManagers'
          paramStr = {nodeId: this.detailId, managerIds: this.checkedUserIds.join(',')}
        } else {
          url = '/commonTree/setOwners'
          paramStr = {nodeId: this.detailId, ownerIds: this.checkedUserIds.join(',')}
        }
        this.$axios.get(url, {
          params: paramStr
        }).then(response => {
          let data = response.data
          if (data.status === '0') {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message({
              message: data.message,
              type: 'success'
            })
          } else {
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('保存失败')
        })
      },
      // 加载框
      showLoading () {
        this.$loading({
          lock: true,
          text: 'Loading',
          target: document.querySelector('.category_left')
          // spinner: 'el-icon-loading'
          // background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      // 被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event
      handleDragEnd (draggingNode, dropNode, dropType, ev) {
        if (draggingNode.data.ID !== dropNode.data.ID) {
          var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, dropNode.data.ID).parentNode // 递归查找父节点
          console.log('tree drag end: ', draggingNode && dropNode.NAME, dropType)
          this.$axios.get('/commonTree/moveTreeNode', {
            params: {
              sourceNodeId: draggingNode.data.ID,
              targetParentNodeId: dropNode.data.ID
            }
          }).then(response => {
            let data = response.data
            if (data.status === '0') {
              this.$store.commit('HIDE_LOADING', '拼命加载中!')
              this.$message({
                message: data.message,
                type: 'success'
              })
              this.refresh(parentNode)
            } else {
              this.$store.commit('HIDE_LOADING', '拼命加载中!')
              this.$message.error(data.message)
            }
          }).catch(response => {
            this.refresh(parentNode)
            this.$store.commit('HIDE_LOADING', '拼命加载中!')
            this.$message.error('目录切换失败')
          })
        }
      },
      //重加载节点
      reloadNode (parentId, parentNode) {
        this.$axios.get('/apm/getGpTree', {params: {parentId: parentId}}).then(response => {
          var resData = response.data
          if (resData['status']) {
            if (resData.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            }
          }
          if (resData.length > 0) {
            parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
            parentNode.CHILDREN = resData
          }
        }).catch(response => {
          this.$message.error('数据加载失败!')
        })
      }
    }
  }
</script>
