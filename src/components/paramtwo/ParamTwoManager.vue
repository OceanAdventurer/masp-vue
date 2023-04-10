<style scoped>
  .tab_file_new {
    display: flex;
    flex-direction: row;
    position: absolute;
    height: 78vh;
    width: 100%;
  }
  .tab_file_new_left {
    width: 22.5%;
    height: 95%;
    padding-top: 10px;
    border-right: 1px solid #DDDDDD;
    border-bottom: 1px solid #DDDDDD;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    float: left;
  }
  /* .left_tree {
    height: calc(78vh - 40px);
    cursor: pointer;
    overflow: auto;
  } */
   .left_tree {
    height: -webkit-fill-available;;
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
    /* padding: 0px 10px; */
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
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    width: 100%;
  }
  .tab_riglt{
    width: 80%;
    padding: 10px 0px;
    float: left;
  }
  .tab-profile{
    width: 96%;
    margin: 0 auto;
  }
  .el-message-box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    margin-top: 100px;
  }
</style>
<style>
.el-switch__core:after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: all .3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
  .el-message-box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    margin-top: 100px;
  }
</style>
<template>
  <!-- 分析参数库主界面 -->
  <div class="tab_file_new" v-loading="loading">
    <!-- 左侧元素 -->
    <div class="tab_file_new_left cm_tab_file_new_left">
      <!-- 过滤节点 -->
      <div class="left_filter" v-show="searchShow">
        <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small"     @keyup.enter.native="filterTree('treeKey')">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')" style="font-size:20px;height:0px;"></i>
        </el-input>
      </div>
      <div class="left_tree df-f1" v-loading="treeLoading">
        <el-tree
          :default-expanded-keys="expandedKeys"
          :data="fileNewTreeArr" node-key="ID" :props="defaultTreeProps" highlight-current
                 @node-click="handleNodeClick"
                 ref="tree" :filter-node-method="filterNode"
                 :render-content="renderContent" :allow-drop="allowDrop">
        </el-tree>
      </div>
    </div>
    <div class="tab_riglt cm_tab_file_new_main">
        <el-tabs v-model="profileActiveName" v-show="IsShowTab"  class="tab-profile">
          <el-tab-pane :label="tabProfileLabel" name="sencond">
            <el-table
              v-loading="tableLoading"
              :data="profileObj"
              stripe
              style="width: 100%">
              <el-table-column
                align="center"
                prop="note" style="float: left "
                width="400" >
              </el-table-column>
              <el-table-column
                prop="name" align="left"
                >
                <div slot-scope="data">
                  <span v-if="data.row.note === '开启/关闭'">
                    <span v-if="data.row.createUser === data.row.userName">
                            <el-switch
                              v-model="operation" @change="changeOperAtion"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                    </el-switch>
                    </span>
                    <span v-else>
                            <el-switch disabled="disabled"
                              v-model="operation" @change="changeOperAtion"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                    </el-switch>
                    </span>
                    <i class="el-icon-question" style="cursor:pointer" @click="tipsClick()"></i>
                    <span style="font-size: 6px;" v-show="showTitp">（提示：红色表示关闭，绿色表示开启）</span>
                  </span>
                  <span v-else-if="data.row.note === '备注'">
                    <el-input
                      size="small"
                      style="width:400px"
                      :disabled="data.row.createUser === data.row.userName? false : true"
                      placeholder="请输入内容"
                      type="textarea"
                      autosize
                      @input="getData()"
                      @blur="canleFocue(data.row.id)"
                      v-model="profileDescription"
                      @keyup.native.enter="undateProfileDescription(data.row.id)"
                      clearable>
                    </el-input>
                    <el-button
                      icon="el-icon-check"
                      v-if="isSoow"
                      @click="undateProfileDescription(data.row.id)"
                      style="height:32px;width:32px;padding:0;border-radius:50%"
                      ></el-button>
                    <!-- <el-button
                      v-if="isSoow"
                      size="small"
                      style="width:40px"
                      @click="undateProfileDescription(data.row.id)"
                      :readonly="data.row.createUser === data.row.userName? false : true"
                      :disabled="data.row.createUser === data.row.userName? false : true">
                      <i class="el-icon-check"></i></el-button> -->
                  </span>
                  <span v-else>
                    {{data.row.name}}
                  </span>
                </div>
              </el-table-column>
            </el-table>
          </el-tab-pane>
         </el-tabs>
    </div>
  </div>
</template>
<script>
import CustomTree from 'components/base/CustomTree'

export default {
  data () {
    return {
      isSoow: false,
      profileDescription: '',
      userInfo: {}, // 当前用户信息
      showTitp: false,
      id: '',
      operation: false,
      loading: false,
      treeLoading: false,
      fileNewTreeArr: [], // 左侧树状数据
      expandedKeys: [], // 需要展开的数组
      isAddTreeNode: false, // 当前节点编辑状态
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      parentId: '0', // 默认父节点id
      iconMoreShow: false, // 自定义节点图标
      iconOtherShow: false, // 自定义节点图标
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '', // 子节点id
      tabProfileName: '', // tab的name
      tabProfileLabel: '', // tab 的label
      profileActiveName: 'sencond', // 选中tab的name
      IsShowTab: false,
      tableLoading: false,
      profileObj: [],
      addNodeStatus: false,
      hideMenuObj: {}, // 隐藏的
      disabledMenuObj: {}, // 禁用的按钮
      btnFlag: '' // 保存事件标识默认值
    }
  },
  components: {
  },
  watch: {
    // profileDescription (old, val) {
    //   if (val === '') {
    //     this.isSoow = false
    //   } else {
    //     this.isSoow = true
    //   }
    // },
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
    // 点击二级菜单，需要回调子组件的方法
    this.$bus.$on('paramTwoManagerValue', (data, node, type) => {
      this.delNodeFun(data, node, type)
    })
    this.$bus.$on('paramTwo_file_rename', () => {
      this.renameNodeFun(this.treeData, null, 'node')
    })
    this.$nextTick(() => {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
      console.log('分析参数当前用户userInfo{}', this.userInfo)
      if (this.userInfo) {
        this.getTree()
      } else {
        setTimeout(() => {
          this.getTree()
        }, 500)
      }
    })
  },
  methods: {
    getData () {
      console.log(this.profileDescription)
      this.isSoow = true
    },
    canleFocue (id) {
      console.log(id)
      this.undateProfileDescription(id)
      this.isSoow = false
    },
    //修改备注
    undateProfileDescription (id) {
      this.$axios.post('/apm/updateProfileDescription?id=' + id + '&profileDescription=' + this.profileDescription).then(res => {
        if (res.data.status === '0') {
          this.isSoow = false
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('修改失败')
      })
    },
    tipsClick () {
      if (this.showTitp) {
        this.showTitp = false
      } else {
        this.showTitp = true
      }
      },
    // 初始化树
    getTree () {
        this.loading = true
        this.treeLoading = true
        this.$axios.get('/apm/getProfileTree', {params: {parentId: this.parentId, searchContent: this.filterText}}).then(response => {
          this.treeLoading = false
          this.fileNewTreeArr = []
          this.loading = false
          var data = response.data
          this.fileNewTreeArr = data.data
          if (data.defaultNode) {
            this.expandedKeys = data.defaultNode
          }
          //
          // if (data.length > 0) {
          //   if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          //     this.$bus.$emit('logBackInHandle', response.data)
          //   } else {
          //
          //   }
          // } else {
          //   this.$message.error(data.message)
          // }
        }).catch(response => {
          // this.$message.error('数据加载失败!')
          this.loading = false
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
           type: 'paramtwo', // 分析参数
          isShowMore: true, // 是否显示更多按钮
          isShowMoreForNode: true, // 子节点是否显示更多按钮
          isShowEdit: true,
          isShowMoreForCatalog: true // 目录是否显示更多按钮
        },
        on: { // 绑定方法 data node store type是当前节点信息
          addTreeNodeHandle: ((data, node, type) => that.addNodeFun(data, node, type)),
          renameTreeNodeHandle: ((data, node, type) => that.renameNodeFun(data, node, type)),
          saveTreeNodeHandle: ((data, node) => that.saveNodeFun(data, node)),
          cancelTreeNodeHandle: ((data, node) => that.cancelNodeFun(data, node)),
          delTreeNodeHandle: ((data, node, type) => that.delNodeFun(data, node, type)),
          editTreeNodeHandle: ((data, node) => that.editNodeFun(data, node)),
          lookParamNodeHandle: ((data, node) => that.lookParam(data, node))
        }
      })
    },
    // 增加节点,且是处于编辑中
    addNodeFun (data, node, type) {
      // 如果为false则表示可以新增，true不可以新增
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
            data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, CHILDREN: [], status: 1, nodeType: type, isAdd: true})
          } else {
            data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, status: 1, nodeType: type, isAdd: true})
          }
        }
      }
    },
    // 重命名,且是处于编辑中
    renameNodeFun (data, node, type) {
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
    // 编辑节点
    editTreeData (data) {
      var url = '/apm/renameProfile'
      var paramStr = {
        name: data.NAME,
        id: data.ID
      }
      paramStr = this.$qs.stringify(paramStr)
      // 保存节点到数据库
      this.$axios.post(url, paramStr).then((response) => {
        var dataRes = response.data
        if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
          this.getTree()
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
      })
    },
    // 保存新增节点
    addTreeData (data, parentNode) {
      var url = ''
      var paramStr = {}
      if (data.nodeType === 'catalog') {
        url = '/apm/addProfileTree'
        paramStr = {parentId: parentNode.ID, name: data.NAME}
      } else {
        url = '/apm/addProfile'
        paramStr = {profileName: data.NAME, treeId: parentNode.ID}
      }
      paramStr = this.$qs.stringify(paramStr)
      // 保存节点到数据库
      this.$axios.post(url, paramStr).then((response) => {
        var dataRes = response.data
        if (dataRes.status !== null && dataRes.status !== '' && dataRes.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (dataRes.status === '0') {
          this.$message({
            message: dataRes.message,
            type: 'success'
          })
          this.getTree()
          // 保存节点到页面
          // var childData = parentNode.CHILDREN
          // for (var i = 0; i < childData.length; i++) {
          //   if (childData[i].ID === data.ID) {
          //     data.status = 0
          //     parentNode.CHILDREN.splice(i, 1, data)
          //   }
          // }
          // // 加载新增节点的id
          // this.$axios.get('/apm/getProfileTree', {params: {parentId: parentNode.ID}}).then(response => {
          //   var resData = response.data
          //   if (resData.length > 0) {
          //     if (resData.status !== null && resData.status !== '' && resData.status === 'E1001') {
          //       this.$bus.$emit('logBackInHandle', response.data)
          //     } else {
          //       parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // 清空数组
          //       parentNode.CHILDREN = resData
          //     }
          //   }
          // }).catch(response => {
          //   // this.$message.error('数据加载失败!')
          // })
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
        this.$message.error('保存失败!')
      })
    },
    // 取消处于编辑中的新增节点
    cancelNodeFun (data, node) {
      if (data.isAdd) { // 新增
        var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
        parentNode.CHILDREN.forEach((v, i) => {
          if (v.ID === data.ID) {
            parentNode.CHILDREN.splice(i, 1)
          }
        })
      } else { // 编辑
        this.$set(data, 'status', 0)
      }
      this.isAddTreeNode = false
    },
    delNodeFun (data, node, type) {
      this.$confirm('您确定要删除吗?', '*', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 'catalog') { // 删除目录
          this.$axios.get('/apm/deleteProfileTree', {params: {id: data.ID}}).then(response => {
            let respData = response.data
            if (respData.status === '0') { // 成功
              this.$message({
                type: 'success',
                message: respData.message
              })
              this.IsShowTab = false
              let parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
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
           // this.$message.error('数据加载失败!')
            this.tableLoading = false
          })
         } else { // 删除分析参数库
          this.$axios.get('/apm/deleteProfile', {params: {profileId: data.ID}}).then(response => {
            let respData = response.data
            if (respData.status === '0') { // 成功
              this.$message({
                type: 'success',
                message: respData.message
              })
              this.IsShowTab = false
              let parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
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
            // this.$message.error('数据加载失败!')
            this.tableLoading = false
          })
         }
      }).catch(() => {
        this.operation = false
      })
    },
    // 树节点过滤图标
    filterTree (flag) {
      this.getTree()
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
    // 子节点击事件 加载中间及右侧数据
    handleNodeClick (data, node, nodeCommpent) {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
      }
      let disabledMenuObj = {}
      if (!data['CHILDREN'] && data.NAME !== null) {
        // 子节点
        this.IsShowTab = true
        this.tabProfileLabel = node.label
        this.id = data.ID
        this.getDetail(data.ID)
        if (data.CREATE_USER && this.userInfo.userName.toUpperCase() === data.CREATE_USER.toUpperCase()) {
          // hideMenuObj.paramTwo_file_edit_look = false // 关闭查看
          hideMenuObj.paramTwo_file_edit = true // 开启编辑按钮
          hideMenuObj.paramTwo_file_rename = true // 开启重命名按钮
          hideMenuObj.paramTwo_delete_node = true // 开启删除
        } else {
          hideMenuObj.paramTwo_file_edit_look = true // 开启查看
          // hideMenuObj.paramTwo_file_edit = false // 关闭编辑按钮
          // hideMenuObj.paramTwo_delete_node = false // 关闭删除
        }
        // this.$bus.$emit('paramTwoAddTabInnerTree', {parentId: data.ID})
        this.treeData = data
      } else { // 父节点
        this.IsShowTab = false
        this.profileObj = [] // 清空数据
        //默认都显示
        hideMenuObj.paramTwo_paramLibray_add_catalog1 = true
        hideMenuObj.paramTwo_paramLibray_add_param_library = true
        hideMenuObj.paramTwo_delete_profile = true
        if (data.TYPE === 'USERNODE') { // 只能创建不能删除 禁用删除
          // disabledMenuObj.paramTwo_paramLibray_add_catalog1 = false
          // disabledMenuObj.paramTwo_paramLibray_add_param_library = false
          disabledMenuObj.paramTwo_delete_profile = true
          } else if (data.TYPE === 'USERCHILDNODE') { // 可以创建可以删除 （取消禁用， 默认都是不禁用的所以不用赋值）
          } else { // TREE COMMENTTREE 都不可以操作 全部禁用
          disabledMenuObj.paramTwo_paramLibray_add_catalog1 = true
          disabledMenuObj.paramTwo_paramLibray_add_param_library = true
          disabledMenuObj.paramTwo_delete_profile = true
         }
        // // 传值
        // this.middleShow = true
        // this.mainShow = false
      }
      this.hideMenuObj = hideMenuObj // 保存变量
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('paramTwoParamLibrayAddCatalog1Vaue', data) // 传值过去，然后点击二级菜单，触发对应的事件要用到
      this.$bus.$emit('paramTwoParamLibrayAddCatalog1VaueManager', data, node, {treeData: this.fileNewTreeArr}) // 传值过去，然后点击二级菜单，触发对应的事件要用到
      this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, disabledMenuObj) // 修改二级菜单
    },
    // 禁止节点拖拽
    allowDrop (draggingNode, dropNode, type) {
      return false
    },
    // 获取右边列表中的详情数据ad
    getDetail (val) {
      this.tableLoading = true
      this.$axios.get('/apm/getProfileDetail', {params: {id: val}}).then(response => {
        this.tableLoading = false
        this.profileObj = []
        let data = response.data
        if (data.status) {
          this.$store.commit('PARAM_TWO_STATUS', data.status)
          // console.log(this.$store)
        }
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else {
          // this.profileObj.push({ note: '描述', name: data.profileName })
          this.profileObj.push({ note: '当前版本', name: data.version })
          let typeName = ''
          if (data.type === '0') {
            typeName = '用户库'
          } else if (data.type === '1') {
            typeName = '标准库'
          }
          if (data.status === '0') {
            this.operation = false
          } else {
            this.operation = true
          }
          this.profileObj.push({ note: '类型', name: typeName })
          this.profileObj.push({ note: '创建日期', name: data.createTime })
          this.profileObj.push({ note: '创建人', name: data.createUser })
          this.profileObj.push({ note: '开启/关闭', name: data.status, userName: this.userInfo.userName, createUser: data.createUser })
          this.profileObj.push({ note: '备注', name: data.profileDescription, userName: this.userInfo.userName, createUser: data.createUser, id: data.id })
          this.profileDescription = data.profileDescription
        }
      }).catch(response => {
        this.tableLoading = false
      })
    },
    // 保存节点属性
    onSubmit () {
      var type = ''
      type = this.radioType === '0' ? '0' : '1'
      var paramStr = this.$qs.stringify({
        id: this.gpId,
        gpName: this.attrName,
        type: type,
        unit: this.attrUnit,
        description: this.attrExplain,
        defaultOneDimensionId: this.defaultMappedId
      })
      this.$axios.post('/apm/', paramStr, {
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        var data = response.data
        if (data.status !== null && data.status !== '' && data.status === 'E1001') {
          this.$bus.$emit('logBackInHandle', response.data)
        } else if (data.status === '0') {
          this.$notify({
            title: '成功',
            type: 'success',
            message: data.message
          })
          // 重加载中间默认映射
          if (this.defaultMappedVal !== this.defaultMappedCon) {
          }
        }
      }).catch(response => {
        this.$notify.error({
          title: '错误',
          duration: 0,
          message: '数据保存失败！'
        })
      })
    },
    // 加载框
    showLoading () {
      this.$loading({
        lock: true,
        text: 'Loading',
        target: document.querySelector('.tab_file_new_left')
        // spinner: 'el-icon-loading'
        // background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    // 点击编辑按钮触发事件，显示内层树
    editNodeFun (data, node, nodecomment) {
      if (!data['CHILDREN'] && data.NAME !== null) {
        this.$bus.$emit('paramTwoParamLibrayAddCatalog1Vaue', data) // 传值过去，然后点击二级菜单，触发对应的事件要用到
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_file_edit', zhName: node.label, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
      }
    },
    lookParam (data, node, nodecomment) {
      if (!data['CHILDREN'] && data.NAME !== null) {
        this.$bus.$emit('paramTwoParamLibrayAddCatalog1Vaue', data) // 传值过去，然后点击二级菜单，触发对应的事件要用到
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_file_edit_look', zhName: node.label, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
      }
    },
    changeOperAtion () {
      if (this.operation) {
        this.operation = false // 滑块点击前原本的值
        this.$confirm('您确定要开启吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operation = true
          this.$axios.get('/apm/activeProfile', {params: {id: this.id}}).then(response => {
            var data = response.data
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else if (data.status === '0') {
              this.$message({
                type: 'success',
                message: '开启成功'
              })
            } else {
              this.$message.error(data.message)
              this.operation = false
            }
          })
        }).catch(() => {
          this.operation = false
        })
      } else {
        this.operation = true
        this.$confirm('关闭将清空该profile所有计算结果，是否关闭？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operation = false
          this.$axios.get('/apm/inActiveProfile', {params: {id: this.id}}).then(response => {
            var data = response.data
            if (data.status !== null && data.status !== '' && data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else if (data.status === '0') {
              this.$message({
                type: 'success',
                message: '关闭成功'
              })
            } else {
              this.$message.error(data.message)
              this.operation = true
            }
          })
        }).catch(() => {
          this.operation = true
        })
      }
    }
  }
}
</script>
