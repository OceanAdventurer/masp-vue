<template>
  <div class="tree-expand">
    <div class="tree-info" v-show="!data.status">
      <div class="tree-img-set tree-folder" v-show="data.CHILDREN"></div>
      <div class="tree-label" :title="data.DESCRIPTION ? data.DESCRIPTION : data.NAME">
        <div class="tree-text-line">{{data.NAME}}</div>
      </div>
    </div>
    <div class="tree-btn-group" v-show="showTreeMore" @click.stop.prevent>
      <div class="tree-img-set tree-more"></div>
      <div class="tree-btn">
        <div class="tree-btn-arrow"></div>
        <div >
          <!-- 添加目录 -->
          <div v-show="data.ID === '2'" class="tree-info" @click.stop="addTreeNode(data, node, 'catalog')">
            <div class="tree-img-set tree-btn-plus-p"></div>
            <div class="tree-label" title="创建目录">创建目录</div>
          </div>
          <!-- 添加节点 -->
          <div v-show="data.ID !== '2'" class="tree-info" @click.stop="addTreeNode(data, node, 'node')">
            <div class="tree-img-set tree-btn-plus-c"></div>
            <div class="tree-label" title="创建下级目录">创建下级目录</div>
          </div>
          <!-- 暂时不支持编辑节点 v-show="!data.CHILDREN && isShowEdit" -->
          <div  v-show="data.ID !== '2'" class="tree-info" @click.stop="editTreeNode(data, node,'edit_category')">
            <div class="tree-img-set tree-btn-edit"></div>
            <div class="tree-label" title="重命名">重命名</div>
          </div>
          <!-- 树根不允许删除，暂时也不支持删除节点 v-show="node.level !== 1 && isShowDelete" -->
          <div v-show="data.ID !== '2'" class="tree-info" @click.stop="delTreeNode(data, node)">
            <div class="tree-img-set tree-btn-delete"></div>
            <div class="tree-label" title="删除">删除</div>
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
        @blur="blurNode"
      />
      <el-button size="mini" type="primary" @click.stop="saveTreeNode(data,node)" :disabled="saveStatus">保存</el-button>
      <el-button size="mini" type="default" @click.stop="cancelTreeNode(data,node,'cancel')">取消</el-button>
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
      if (this.data.ID === 1 || this.data.ID === '1') {
        return false
      } else if (!this.data.status && this.isShowMore) { // 节点不处于编辑状态,同时显示按钮标识为true
        if (this.isShowMoreForNode) { // 子节点是否显示更多按钮的标识，true:显示，false: 隐藏
          return true
        } else if (this.isShowMoreForCatalog) { // 目录是否显示更多按钮的标识，true:显示，false: 隐藏
          if (this.data.CHILDREN) { // 目录有子节点显示，没有隐藏
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
    editTreeNode (data, node, type) { // 编辑
      console.log('editTreeNodeHandle', data, node, type)
      this.$emit('editTreeNodeHandle', data, node, type)
    },
    lookParam (data, node) { // 编辑
      console.log('lookParamNodeHandle', data, node)
      this.$emit('lookParamNodeHandle', data, node)
    },
    delTreeNode (data, node, type) { // 删除
      console.log('delTreeNodeHandle', data, node, type)
      this.$emit('delTreeNodeHandle', data, node, type)
    },
    saveTreeNode (data, node) { // 保存编辑中的NODE
      console.log('saveTreeNodeHandle', data, node)
      // this.$emit('saveTreeNodeHandle', data, node)
     if (!data.NAME) {
       this.$message({
         type: 'warning',
         message: '节点名称不能为空!'
       })
       return false
     } else if (data.NAME.indexOf(' ') >= 0) {
        this.$message({
            type: 'warning',
            message: '不能包含空格，请重新输入!'
          })
        return false
      } else {
        this.saveStatus = false
        this.$emit('saveTreeNodeHandle', data, node)
      }
    },
    cancelTreeNode (data, node, type) { // 取消编辑中的NODE
      console.log('cancelTreeNodeHandle', data, node, type)
      this.$emit('cancelTreeNodeHandle', data, node, type)
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

      let reg = new RegExp('^(?! )[_a-zA-Z0-9\u4e00-\u9fa5 -]+(?<! )$') // 验证字符串前后不能有空格，中间不能有连续的空格
      let reg1 = new RegExp('^((?! {2,}).)+$')
      if (!reg.test(data.currentTarget.value) && this.$util.isDefine(data.currentTarget.value)) {
        this.$message({
          message: '只含有汉字、数字、字母，前后不能有空格！',
          type: 'warning'
        })
        this.saveStatus = true // 禁用保存按钮
        return false
      } else if (!reg1.test(data.currentTarget.value) && this.$util.isDefine(data.currentTarget.value)) {
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
    width: 16px;
    height: 16px;
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
    background-image: url(../../../assets/images/icon68.png);
    margin-right: 10px;
  }
  .tree-more {
    background-image: url(../../../assets/images/icon72.png);
    position: absolute;
    right: 20px;
  }
  .tree-btn-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    display: none;
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

  .tree-btn-plus-p {
    background-image: url(../../../assets/images/icon73.png);
  }
  .tree-btn-plus-c {
    background-image: url(../../../assets/images/icon74.png);
  }
  .tree-btn-edit {
    background-image: url(../../../assets/images/icon70.png);
  }
  .tree-btn-delete {
    background-image: url(../../../assets/images/icon71.png);
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
    padding: 4px 6px;
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
