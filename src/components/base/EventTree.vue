<template>
  <div class="tree-expand" :title="data.DESCRIPTION ? data.DESCRIPTION : data.NAME">
    <div class="tree-info" v-show="!data.status">
      <div class="tree-img-set tree-folder" v-show="data.CHILDREN"></div>
      <div class="tree-label" >
        <div class="tree-text-line">{{data.NAME}}</div>
      </div>
    </div>
    <div class="tree-btn-group" v-show="showTreeMore" @click.stop.prevent>
      <div class="tree-img-set tree-more"></div>
      <div class="tree-btn">
        <div class="tree-btn-arrow"></div>
        <div v-if="type === 'event'">
          <!-- 暂时不支持编辑节点 -->
<!--          <div v-show="isShowEdit && data.CHILDREN" class="tree-info" @click.stop="editTreeNode(data, node)">-->
<!--            <div class="tree-img-set tree-btn-edit"></div>-->
<!--            <div class="tree-label" title="">重命名</div>-->
<!--          </div>-->
          <!-- 添加目录 -->
          <div v-show="data.CHILDREN" class="tree-info" @click.stop="addTreeNode(data, node, 'catalog')">
            <div class="tree-img-set tree-btn-plus-p"></div>
            <div class="tree-label" title="添加目录">添加目录</div>
          </div>
          <div v-show="data.TYPE === 'USERCHILDNODE' && data.CHILDREN" class="tree-info" @click.stop="delTreeNode(data, node, 'catalog')">
            <div class="tree-img-set tree-btn-delete"></div>
            <div class="tree-label" title="">删除目录</div>
          </div>
          <!-- 添加子节点 -->
          <div v-show="data.CHILDREN" class="tree-info" @click.stop="addTreeNode(data, node, 'node')">
            <div class="tree-img-set tree-btn-plus-c"></div>
            <div class="tree-label" title="添加事库件">添加事件库</div>
          </div>
          <!-- 暂时不支持编辑节点 -->
          <div v-show="!data.CHILDREN && isShowEdit && userInfo.userName === data.CREATE_USER" class="tree-info" @click.stop="lookParam(data, node, 'edit')">
            <div class="tree-img-set tree-btn-edit"></div>
            <div class="tree-label" title="编辑">编辑</div>
          </div>
          <div v-show="!data.CHILDREN && isShowEdit && userInfo.userName !== data.CREATE_USER" class="tree-info" @click.stop="lookParam(data, node, 'look')">
            <div class="tree-img-set tree-btn-edit"></div>
            <div class="tree-label" title="编辑">查看</div>
          </div>
          <div v-show="!data.CHILDREN && isShowEdit && userInfo.userName === data.CREATE_USER" class="tree-info" @click.stop="renameTwoMenu(data, node, 'node')">
            <div class="tree-img-set tree-btn-rnme"></div>
            <div class="tree-label" title="">重命名</div>
          </div>
          <div v-show="isShowDelete && !data.CHILDREN" class="tree-info" @click.stop="delTreeNode(data, node, 'node')">
            <div class="tree-img-set tree-btn-delete"></div>
            <div class="tree-label" title="">删除</div>
          </div>
        </div>
        <div v-else-if="type === 'eventEdit'">
          <div v-show="!data.CHILDREN" class="tree-info" @click.stop="addTreeNode(data, node, 'event')">
            <div class="tree-img-set tree-btn-plus-c"></div>
            <div class="tree-label" title="添加事">添加事件</div>
          </div>
          <div v-show="!data.CHILDREN" class="tree-info" @click.stop="startJisuan(data, node, 'node')">
            <div class="tree-img-set compute-start"></div>
            <div class="tree-label" title="开始计算">开始计算</div>
          </div>
          <div v-show="!data.CHILDREN" class="tree-info" @click.stop="shareNode(data, node, 'node')">
            <div class="tree-img-set tree-btn-share"></div>
            <div class="tree-label" title="分享">分享</div>
          </div>
        </div>
      </div>
    </div>
    <div class="df df-fd-r" v-show="data.status">
      <input
        maxlength="30"
        v-model="data.NAME"
        autofocus
        :ref="'treeInput'+data.ID"
        :placeholder="inputValue"
        class="input_inner-set"
        @keyup.enter="saveTreeNode(data,node)"
        @click="clickSExplan(data, node)"
        @blur="blurNode"
      />
      <el-button size="mini" type="primary" @click.stop="saveTreeNode(data,node)" :disabled="saveStatus">保存</el-button>
      <el-button size="mini" type="default" @click.stop="cancelTreeNode(data,node,'cancel')">取消</el-button>
    </div>
    <div v-if="type==='eptparam' && data.EDITABLE==1 && data.COMMON==1" class="tree-tip">
      <span>已设</span>
    </div>
    <!-- <input v-show="data.status" v-model="data.NAME" autofocus :ref="'treeInput'+data.ID" :placeholder="inputValue" class="input_inner-set" @keyup.enter="saveTreeNode(data,node)" @blur="cancelTreeNode(data,node)"/> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData: this.data,
      userInfo: {},
      statusLock: '', // 编辑锁定状态
      saveStatus: false
    }
  },
  computed: {
    inputValue: function () { // 根据节点类型显示不同的默认值
      var inputStr = '请输入内容'
      if (this.data.nodeType === 'catalog') {
        inputStr = '请输入目录名称'
      } else if (this.data.nodeType === 'node') {
        inputStr = '请输入节点名称'
      }
      return inputStr
    },
    showTreeMore: function () {
      if (this.type === 'event' && this.data.CHILDREN && this.data.TYPE !== 'USERNODE' && this.data.TYPE !== 'USERCHILDNODE') {
        return false
      } else if (!this.data.status && this.isShowMore) { // 节点不处于编辑状态,同时显示按钮标识为true
        if (this.isShowMoreForNode) { // 子节点是否显示更多按钮的标识，true:显示，false: 隐藏
          // if (this.type !== 'paramone' && this.data.TYPE !== 'TREE' && this.data.TYPE !== 'COMMENTTREE') { // TREE COMMENTTREE
          //   return true
          // } else {
          //   return false
          // }

          return true
        } else if (this.isShowMoreForCatalog) { // 目录是否显示更多按钮的标识，true:显示，false: 隐藏
          if (this.data.CHILDREN) { // 目录有子节点显示，没有隐藏
            // if (this.type !== 'paramone' && this.data.TYPE !== 'TREE' && this.data.TYPE !== 'COMMENTTREE') { // TREE COMMENTTREE
            //   return true
            // } else {
            //   return false
            // }

            return true
          } else {
            return false
          }
        } else { // 隐藏更多按钮
          return false
        }
      }
    }
  },
  props: [
    'data',
    'node',
    'type',
    'isShowEdit',
    'isShowDelete',
    'isShowMore',
    'isShowMoreForNode',
    'isShowMoreForCatalog'
  ],
  methods: {
    addTreeNode (data, node, type) { // 新增
      console.log('addTreeNodeHandle', data, node, type)
      this.$emit('addTreeNodeHandle', data, node, type)
    },
    createAnalysis (data, node) {
      this.$store.commit('TEMP_MANAGER_TREE_NODE_ID', data.ID)
      this.$bus.$emit('addTab', 'analysis_file_new', '新建分析', 'analysis_file', 'analysis')
    },
    openTwoMenu (data, node, type) { // 参数TWO 编辑
      console.log('editTreeNodeHandle', data, node)
      this.$emit('openTreeNodeHandle', data, node, type)
    },
    renameTwoMenu (data, node, type) { // 重命名
      console.log('renameTreeNodeHandle', data, node)
      this.$emit('renameTreeNodeHandle', data, node, type)
    },
    editTreeNode (data, node) { // 编辑
      if (this.$store.state.menuEditStatus) {
        console.log('editTreeNodeHandle', data, node)
        this.$emit('editTreeNodeHandle', data, node)

        this.$store.commit('MENU_EDIT_STATUS', false)
      } else {
        this.$message({
          type: 'warning',
          message: '存在正在编辑的节点，请确认后重试!'
        })
      }
    },
    lookParam (data, node, type) { // 编辑
      console.log('lookEventNodeHandle', data, node, type)
      this.$emit('lookEventNodeHandle', data, node, type)
    },
    delTreeNode (data, node, type) { // 删除
      console.log('delTreeNodeHandle', data, node, type)
      this.$emit('delTreeNodeHandle', data, node, type)
    },
    startJisuan (data, node, type) { // 添加事件
      console.log('startJisuanNodeHandle', data, node, type)
      this.$emit('startJisuanNodeHandle', data, node, type)
    },
    shareNode (data, node, type) { // 添加事件
      console.log('shareNodeHandle', data, node, type)
      this.$emit('shareNodeHandle', data, node, type)
    },
    saveTreeNode (data, node) { // 保存编辑中的NODE
      console.log('saveTreeNodeHandle', data, node)
      // this.$emit('saveTreeNodeHandle', data, node)
      // if (data.NAME.indexOf(' ') >= 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '不能包含空格，请重新输入!'
      //   })
      //   this.saveStatus = true // 禁用保存按钮
      //   this.statusLock = ''
      //   this.$store.commit('MENU_EDIT_STATUS', true)
      //   return false
      // } else {
      this.saveStatus = true
      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      if (!reg.test(data.NAME) && this.$util.isDefine(data.NAME)) {
        this.$message({
          message: '只含有汉字、数字、字母，前后不能有空格！',
          type: 'warning'
        })
        this.saveStatus = true // 禁用保存按钮
        return false
      } else if (!reg1.test(data.NAME) && this.$util.isDefine(data.NAME)) {
        this.$message({
          message: '不能有连续的空格！',
          type: 'warning'
        })
        this.saveStatus = true // 禁用保存按钮
        return false
      } else {
        this.saveStatus = false
        this.$store.commit('MENU_EDIT_STATUS', true)
        this.$emit('saveTreeNodeHandle', data, node)
      }
      // }
    },
    cancelTreeNode (data, node, type) { // 取消编辑中的NODE
      console.log('cancelTreeNodeHandle', data, node, type)
      this.$store.commit('MENU_EDIT_STATUS', true)
      this.$emit('cancelTreeNodeHandle', data, node, type)
    },
    clickSExplan (data, node) { // 取消编辑中的NODE
      node.expanded = false // 不展开
    },
    blurNode (data) { // 节点中不能包含空格
      // if (data.currentTarget.value.indexOf(' ') >= 0) {
      //   this.$message({
      //       type: 'warning',
      //       message: '不能包含空格，请重新输入!'
      //     })
      //   this.saveStatus = true // 禁用保存按钮
      // } else {
      //   this.saveStatus = false
      // }
      this.saveStatus = true
      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      if (!reg.test(data.NAME) && this.$util.isDefine(data.NAME)) {
        this.$message({
          message: '只含有汉字、数字、字母，前后不能有空格！',
          type: 'warning'
        })
        this.saveStatus = true // 禁用保存按钮
        return false
      } else if (!reg1.test(data.NAME) && this.$util.isDefine(data.NAME)) {
        this.$message({
          message: '不能有连续的空格！',
          type: 'warning'
        })
        this.saveStatus = true // 禁用保存按钮
        return false
      } else {
        this.saveStatus = false
      }
    }
  },
  mounted () { // 点击其他目录节点时新增，则input重新获取焦点
    this.userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
    var self = this
    this.$nextTick(() => {
      this.$refs['treeInput' + self.data.ID].focus()
    })
  }
}
</script>
<style scoped>
.tree-img-set {
  background-size: cover;
  width: 16px !important;
  height: 15px;
  margin: 5px 0;
}
.tree-expand {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 24px;
}
.tree-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.tree-folder {
  background-image: url(../../assets/images/icon68.png);
  /*margin-right: 10px;*/
  margin-right: 5px;
  width: 16px;
}
.tree-more {
  background-image: url(../../assets/images/icon72.png);
  position: absolute;
  right: 20px;
}
.tree-btn-group, .tree-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  display: none;
}
.tree-tip {
  display: flex;
  font-size: 12px;
  transform: scale(.8);
  border: 1px solid #000;
  margin-right: 14px;
}
.tree-expand:hover .tree-btn-group {
  display: flex;
}
.tree-btn {
  display: block;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 15px;
  border-radius: 2px;
  background: #FFFFFF;
  box-shadow:0px 0px 1px 1px #DDDDDD;
  display: none;
  z-index: 99;
}
.tree-btn-group:hover .tree-btn {
  display: flex;
}
.tree-btn-arrow::after,.tree-btn-arrow::before {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #FFFFFF;
  position: absolute;
  top: -18px;
  content: "";
  right: 6px;
}
.tree-btn-arrow::before {
  border-bottom-color: #DDDDDD;
  right: 6px;
  top: -20px;
}
.compute-start{
  background-image: url(../../assets/images/compute_start.png);
}
.tree-btn-share {
  background-image: url(../../assets/images/share_1.png);
}
.tree-btn-plus-p {
  background-image: url(../../assets/images/icon73.png);
}
.tree-btn-plus-c {
  background-image: url(../../assets/images/icon74.png);
}
.tree-btn-edit {
  background-image: url(../../assets/images/icon70.png);
}
.tree-btn-delete {
  background-image: url(../../assets/images/icon71.png);
}
.tree-btn-rnme {
  background-image: url(../../assets/images/icon6_1.png);
}
.input_inner-set {
  position: relative;
  display: inline-block;
  height: 20px;
  /* width: 120px; */
  width: 100%;
  line-height: 20px;
  border: 1px solid #DDDDDD;
  color: #555555;
  font-size: 12px;
  padding: 0 10px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.tree-text-line {
  line-height: 20px;
}
.tree-expand >>> .el-input__inner {
  position: relative;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  border: 1px solid #DDDDDD;
  color: #555555;
  font-size: 14px;
  padding: 0 10px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.tree-expand >>> .el-button--mini {
  padding: 4px 15px;
  margin-left: 5px;
}

.tree-btn-group .tree-btn .tree-label {
  padding-left: 10px;
}
.tree-btn-group .tree-btn .tree-info {
  text-align: left;
  margin: 0 8px;
  overflow: hidden;
}
</style>
