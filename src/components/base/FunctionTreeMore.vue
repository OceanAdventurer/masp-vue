<template>
  <div class="tree-expand"  :title="data.METHOD_DESCRIPTION">
    <div class="tree-info">
      <div class="tree-img-set tree-folder" v-show="data.CHILDREN"></div>
      <div class="tree-label">
        <div>{{data.METHOD_NAME}}</div>
      </div>
     </div>
    <div class="tree-btn-group" v-show="showTreeMore">
      <div class="tree-img-set tree-more"></div>
      <div class="tree-btn">
        <div class="tree-btn-arrow"></div>
        <!-- 添加子目录 -->
        <div v-if="data.CHILDREN" class="tree-info" @click.stop="seeFunctionList(data,node)">
          <div class="tree-img-set tree-btn-bd"></div>
          <div class="tree-label" title="查看系统函数列表">查看系统函数列表</div>
        </div>
        <div v-else class="tree-info" @click.stop="seeFunctionDetail(data,node)">
          <div class="tree-img-set tree-btn-bd"></div>
          <div class="tree-label" title="查看函数详情">查看函数详情</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData: this.data
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
      if (!this.data.status && this.isShowMore) { // 如果开启显示更多按钮，在判断是否自己
        if (!this.isCurrentUser) { // 不是自己
          if (this.data.CHILDREN) { // 如果是有子节点，表示自己为父节点，父节点不现实 更多 子节点显示更多
            return false
          } else {
            return true
          }
        } else {
          if (this.isShowMoreForNode) { // 子节点是否显示更多按钮的标识，true:显示，false: 隐藏
            return true
          } else if (this.isShowMoreForCatalog) { // 目录是否显示更多按钮的标识，true:显示，false: 隐藏
            if (this.data.CHILDREN) { // 目录有子节点显示，没有隐藏
              return true
            } else {
              return false
            }
          }
        }
      }
    }
  },
  props: [
    'treeRootName',
    'data',
    'node',
    'moduleType',
    'isShowEdit',
    'isShowDelete',
    'isShowMore',
    'isShowMoreForNode',
    'isShowMoreForCatalog',
    'isCurrentUser'
  ],
  methods: {
    seeFunctionList (data, node) { // 查看列表
      this.$emit('seeListTreeNodeHandle', data, node)
    },
    seeFunctionDetail (data, node) { // 查看详情
      this.$emit('seeDetailTreeNodeHandle', data, node)
    }
  },
  mounted () { // 点击其他目录节点时新增，则input重新获取焦点
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
  .tree-img-set-link {
    background-size: cover;
    width: 16px !important;
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
  .link-folder {
    background-image: url(../../assets/images/link_large_1.png);
  }
  .tree-folder {
    background-image: url(../../assets/images/icon68.png);
    margin-right: 5px;
    width: 16px;
  }
  .tree-more {
    background-image: url(../../assets/images/icon72.png);
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
    display: block;
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
    background-image: url(../../assets/images/icon73.png);
  }
  .tree-btn-plus-c {
    background-image: url(../../assets/images/icon74.png);
  }

  .tree-btn-bd {
    background-image: url(../../assets/images/icon55_1.png);
  }
  .tree-btn-edit {
    background-image: url(../../assets/images/icon70.png);
  }
  .tree-btn-delete {
    background-image: url(../../assets/images/icon71.png);
  }
  .input_inner-set {
    position: relative;
    display: inline-block;
    height: 20px;
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
  .tree-btn-group .tree-btn .tree-label {
    padding-left: 10px;
  }
  .tree-btn-group .tree-btn .tree-info {
    text-align: left;
    margin: 0 8px;
    overflow: hidden;
  }
</style>
