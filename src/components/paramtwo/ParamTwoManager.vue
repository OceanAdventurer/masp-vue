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
  <!-- ???????????????????????? -->
  <div class="tab_file_new" v-loading="loading">
    <!-- ???????????? -->
    <div class="tab_file_new_left cm_tab_file_new_left">
      <!-- ???????????? -->
      <div class="left_filter" v-show="searchShow">
        <el-input placeholder="????????????????????????" v-model="filterText" size="small"     @keyup.enter.native="filterTree('treeKey')">
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
                  <span v-if="data.row.note === '??????/??????'">
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
                    <span style="font-size: 6px;" v-show="showTitp">??????????????????????????????????????????????????????</span>
                  </span>
                  <span v-else-if="data.row.note === '??????'">
                    <el-input
                      size="small"
                      style="width:400px"
                      :disabled="data.row.createUser === data.row.userName? false : true"
                      placeholder="???????????????"
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
      userInfo: {}, // ??????????????????
      showTitp: false,
      id: '',
      operation: false,
      loading: false,
      treeLoading: false,
      fileNewTreeArr: [], // ??????????????????
      expandedKeys: [], // ?????????????????????
      isAddTreeNode: false, // ????????????????????????
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      parentId: '0', // ???????????????id
      iconMoreShow: false, // ?????????????????????
      iconOtherShow: false, // ?????????????????????
      iconShow: true, // ?????????????????????
      searchShow: true, // ??????????????????
      filterText: '',
      gpId: '', // ?????????id
      tabProfileName: '', // tab???name
      tabProfileLabel: '', // tab ???label
      profileActiveName: 'sencond', // ??????tab???name
      IsShowTab: false,
      tableLoading: false,
      profileObj: [],
      addNodeStatus: false,
      hideMenuObj: {}, // ?????????
      disabledMenuObj: {}, // ???????????????
      btnFlag: '' // ???????????????????????????
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
    // ???????????????????????????????????????????????????
    this.$bus.$on('paramTwoManagerValue', (data, node, type) => {
      this.delNodeFun(data, node, type)
    })
    this.$bus.$on('paramTwo_file_rename', () => {
      this.renameNodeFun(this.treeData, null, 'node')
    })
    this.$nextTick(() => {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('MSAP-userInfo'))
      console.log('????????????????????????userInfo{}', this.userInfo)
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
    //????????????
    undateProfileDescription (id) {
      this.$axios.post('/apm/updateProfileDescription?id=' + id + '&profileDescription=' + this.profileDescription).then(res => {
        if (res.data.status === '0') {
          this.isSoow = false
          this.$message.success('????????????')
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('????????????')
      })
    },
    tipsClick () {
      if (this.showTitp) {
        this.showTitp = false
      } else {
        this.showTitp = true
      }
      },
    // ????????????
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
          // this.$message.error('??????????????????!')
          this.loading = false
          this.treeLoading = false
        })
    },
    // ????????????????????????
    renderContent (h, {node, data, store}) {
      var that = this // ??????vue
      return h(CustomTree, {
        props: {
          data: data, // ?????????????????????
          node: node, // ???????????????Node??????
           type: 'paramtwo', // ????????????
          isShowMore: true, // ????????????????????????
          isShowMoreForNode: true, // ?????????????????????????????????
          isShowEdit: true,
          isShowMoreForCatalog: true // ??????????????????????????????
        },
        on: { // ???????????? data node store type?????????????????????
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
    // ????????????,?????????????????????
    addNodeFun (data, node, type) {
      // ?????????false????????????????????????true???????????????
      let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
      if (tempFlag) {
        this.$message({
          message: '????????????????????????????????????????????????!',
          type: 'warning'
        })
      } else {
        node.expanded = true // ???????????????????????????????????????
        if (data.NAME) {
          // status(1???????????????)(0???????????????)(-1??????????????????)
          if (type === 'catalog') { // ????????????
            data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, CHILDREN: [], status: 1, nodeType: type, isAdd: true})
          } else {
            data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, status: 1, nodeType: type, isAdd: true})
          }
        }
      }
    },
    // ?????????,?????????????????????
    renameNodeFun (data, node, type) {
      let tempFlag = this.traverseTreeNode(this.fileNewTreeArr)
      if (tempFlag) {
        this.$message({
          message: '????????????????????????????????????????????????!',
          type: 'warning'
        })
      } else {
        this.beforeEditValue = data.NAME
        this.$set(data, 'status', 1)
        this.$set(data, 'isAdd', false)
        console.log('editNodeFun', data, node)
      }
    },
    // ??????????????????????????????????????????
    saveNodeFun (data, node) {
      // alert(data)
      // let reg = /\s/
      // if (reg.test(data.NAME)) {
      //   this.$message({
      //     message: '????????????????????????????????????',
      //     type: 'warning'
      //   })
      // } else {
        var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode // ?????????????????????
        if (data.isAdd) { // ????????????
          this.addTreeData(data, parentNode)
        } else { // ????????????
          // ???????????????????????????else????????????
          this.editTreeData(data)
        }
        this.isAddTreeNode = false
      // }
     },
    traverseTreeNode (node) { // ?????????????????????
      for (var i = 0; i < node.length; i++) {
        if (this.node) { // ??????????????????????????????
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
    // ????????????
    editTreeData (data) {
      var url = '/apm/renameProfile'
      var paramStr = {
        name: data.NAME,
        id: data.ID
      }
      paramStr = this.$qs.stringify(paramStr)
      // ????????????????????????
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
    // ??????????????????
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
      // ????????????????????????
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
          // ?????????????????????
          // var childData = parentNode.CHILDREN
          // for (var i = 0; i < childData.length; i++) {
          //   if (childData[i].ID === data.ID) {
          //     data.status = 0
          //     parentNode.CHILDREN.splice(i, 1, data)
          //   }
          // }
          // // ?????????????????????id
          // this.$axios.get('/apm/getProfileTree', {params: {parentId: parentNode.ID}}).then(response => {
          //   var resData = response.data
          //   if (resData.length > 0) {
          //     if (resData.status !== null && resData.status !== '' && resData.status === 'E1001') {
          //       this.$bus.$emit('logBackInHandle', response.data)
          //     } else {
          //       parentNode.CHILDREN.splice(0, parentNode.CHILDREN.length) // ????????????
          //       parentNode.CHILDREN = resData
          //     }
          //   }
          // }).catch(response => {
          //   // this.$message.error('??????????????????!')
          // })
        } else {
          this.$message.error(dataRes.message)
        }
      }).catch(response => {
        this.$message.error('????????????!')
      })
    },
    // ????????????????????????????????????
    cancelNodeFun (data, node) {
      if (data.isAdd) { // ??????
        var parentNode = this.$util.getTreeNode(this.fileNewTreeArr, data.ID).parentNode
        parentNode.CHILDREN.forEach((v, i) => {
          if (v.ID === data.ID) {
            parentNode.CHILDREN.splice(i, 1)
          }
        })
      } else { // ??????
        this.$set(data, 'status', 0)
      }
      this.isAddTreeNode = false
    },
    delNodeFun (data, node, type) {
      this.$confirm('??????????????????????', '*', {
        confirmButtonText: '??????',
        cancelButtonText: '??????',
        type: 'warning'
      }).then(() => {
        if (type === 'catalog') { // ????????????
          this.$axios.get('/apm/deleteProfileTree', {params: {id: data.ID}}).then(response => {
            let respData = response.data
            if (respData.status === '0') { // ??????
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
           // this.$message.error('??????????????????!')
            this.tableLoading = false
          })
         } else { // ?????????????????????
          this.$axios.get('/apm/deleteProfile', {params: {profileId: data.ID}}).then(response => {
            let respData = response.data
            if (respData.status === '0') { // ??????
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
            // this.$message.error('??????????????????!')
            this.tableLoading = false
          })
         }
      }).catch(() => {
        this.operation = false
      })
    },
    // ?????????????????????
    filterTree (flag) {
      this.getTree()
    },
    // ????????????
    refresh () {
      this.treeLoading = true
      this.getTree()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.NAME.indexOf(value) !== -1
    },
    // ?????????????????? ???????????????????????????
    handleNodeClick (data, node, nodeCommpent) {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('MSAP-userInfo'))
      var hideMenuObj = { // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????false??????????????????????????????????????????????????????????????????{}
      }
      let disabledMenuObj = {}
      if (!data['CHILDREN'] && data.NAME !== null) {
        // ?????????
        this.IsShowTab = true
        this.tabProfileLabel = node.label
        this.id = data.ID
        this.getDetail(data.ID)
        if (data.CREATE_USER && this.userInfo.userName.toUpperCase() === data.CREATE_USER.toUpperCase()) {
          // hideMenuObj.paramTwo_file_edit_look = false // ????????????
          hideMenuObj.paramTwo_file_edit = true // ??????????????????
          hideMenuObj.paramTwo_file_rename = true // ?????????????????????
          hideMenuObj.paramTwo_delete_node = true // ????????????
        } else {
          hideMenuObj.paramTwo_file_edit_look = true // ????????????
          // hideMenuObj.paramTwo_file_edit = false // ??????????????????
          // hideMenuObj.paramTwo_delete_node = false // ????????????
        }
        // this.$bus.$emit('paramTwoAddTabInnerTree', {parentId: data.ID})
        this.treeData = data
      } else { // ?????????
        this.IsShowTab = false
        this.profileObj = [] // ????????????
        //???????????????
        hideMenuObj.paramTwo_paramLibray_add_catalog1 = true
        hideMenuObj.paramTwo_paramLibray_add_param_library = true
        hideMenuObj.paramTwo_delete_profile = true
        if (data.TYPE === 'USERNODE') { // ???????????????????????? ????????????
          // disabledMenuObj.paramTwo_paramLibray_add_catalog1 = false
          // disabledMenuObj.paramTwo_paramLibray_add_param_library = false
          disabledMenuObj.paramTwo_delete_profile = true
          } else if (data.TYPE === 'USERCHILDNODE') { // ???????????????????????? ?????????????????? ?????????????????????????????????????????????
          } else { // TREE COMMENTTREE ?????????????????? ????????????
          disabledMenuObj.paramTwo_paramLibray_add_catalog1 = true
          disabledMenuObj.paramTwo_paramLibray_add_param_library = true
          disabledMenuObj.paramTwo_delete_profile = true
         }
        // // ??????
        // this.middleShow = true
        // this.mainShow = false
      }
      this.hideMenuObj = hideMenuObj // ????????????
      this.disabledMenuObj = disabledMenuObj
      this.$bus.$emit('paramTwoParamLibrayAddCatalog1Vaue', data) // ????????????????????????????????????????????????????????????????????????
      this.$bus.$emit('paramTwoParamLibrayAddCatalog1VaueManager', data, node, {treeData: this.fileNewTreeArr}) // ????????????????????????????????????????????????????????????????????????
      this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, disabledMenuObj) // ??????????????????
    },
    // ??????????????????
    allowDrop (draggingNode, dropNode, type) {
      return false
    },
    // ????????????????????????????????????ad
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
          // this.profileObj.push({ note: '??????', name: data.profileName })
          this.profileObj.push({ note: '????????????', name: data.version })
          let typeName = ''
          if (data.type === '0') {
            typeName = '?????????'
          } else if (data.type === '1') {
            typeName = '?????????'
          }
          if (data.status === '0') {
            this.operation = false
          } else {
            this.operation = true
          }
          this.profileObj.push({ note: '??????', name: typeName })
          this.profileObj.push({ note: '????????????', name: data.createTime })
          this.profileObj.push({ note: '?????????', name: data.createUser })
          this.profileObj.push({ note: '??????/??????', name: data.status, userName: this.userInfo.userName, createUser: data.createUser })
          this.profileObj.push({ note: '??????', name: data.profileDescription, userName: this.userInfo.userName, createUser: data.createUser, id: data.id })
          this.profileDescription = data.profileDescription
        }
      }).catch(response => {
        this.tableLoading = false
      })
    },
    // ??????????????????
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
            title: '??????',
            type: 'success',
            message: data.message
          })
          // ???????????????????????????
          if (this.defaultMappedVal !== this.defaultMappedCon) {
          }
        }
      }).catch(response => {
        this.$notify.error({
          title: '??????',
          duration: 0,
          message: '?????????????????????'
        })
      })
    },
    // ?????????
    showLoading () {
      this.$loading({
        lock: true,
        text: 'Loading',
        target: document.querySelector('.tab_file_new_left')
        // spinner: 'el-icon-loading'
        // background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    // ????????????????????????????????????????????????
    editNodeFun (data, node, nodecomment) {
      if (!data['CHILDREN'] && data.NAME !== null) {
        this.$bus.$emit('paramTwoParamLibrayAddCatalog1Vaue', data) // ????????????????????????????????????????????????????????????????????????
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_file_edit', zhName: node.label, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
      }
    },
    lookParam (data, node, nodecomment) {
      if (!data['CHILDREN'] && data.NAME !== null) {
        this.$bus.$emit('paramTwoParamLibrayAddCatalog1Vaue', data) // ????????????????????????????????????????????????????????????????????????
        this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_file_edit_look', zhName: node.label, isClosable: true, parent: 'paramTwo_paramLibray', count: 0})
      }
    },
    changeOperAtion () {
      if (this.operation) {
        this.operation = false // ???????????????????????????
        this.$confirm('??????????????????????', '??????', {
          confirmButtonText: '??????',
          cancelButtonText: '??????',
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
                message: '????????????'
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
        this.$confirm('??????????????????profile????????????????????????????????????', '??????', {
          confirmButtonText: '??????',
          cancelButtonText: '??????',
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
                message: '????????????'
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
