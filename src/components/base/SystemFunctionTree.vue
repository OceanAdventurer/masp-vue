<style scoped>
  .left_filter {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: 0px solid #ebeef5;
    height: 50px;
    padding: 0px 12px;
  }

  .left_tree {
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
.tree-content {
  width: auto;
  height: auto;
}
</style>
<style>
</style>
<template>
  <div class="tree-content">
    <!-- 系统函数 -->
    <div class="left_filter" v-show="searchShow">
      <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small" @keyup.enter.native="filterTree1('treeKey')" v-if ="!disabledStatus">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree1('treeKey')"></i>
      </el-input>
      <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small" @keyup.enter.native="filterTree1('treeKey')" v-else disabled="disabled">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree1('treeKey')"></i>
      </el-input>
    </div>
    <!-- 树 -->
    <div class="left_tree" v-loading="treeLoading" :style="{height: bindHeight}">
      <el-tree :data="systemFunctionData"  node-key="ID" :props="systemProps" highlight-current
               :default-expanded-keys="expandedKeys"
               @node-click="handleNodeClicks" :render-content="renderContent1"
               ref="tree" :filter-node-method="filterNode1">
      </el-tree>
    </div>
  </div>
</template>
<script>
  import functionTree from 'components/base/FunctionTreeMore'

  export default {
    data () {
      return {
        gpId: '',
        treeLoading: false,
        explainShow: false,
        systemFunctionData: [],
        expandedKeys: [],
        iconShow: true, // 树节点过滤图标
        searchShow: true, // 树节点搜索框
        disabledStatus: false,
        status: 'paramone',
        systemProps: {
          label: 'METHOD_NAME',
          children: 'CHILDREN'
        },
        filterText: '',
        attrRight: 'attrFirst'
      }
    },
    watch: {
      filterText (val) {
        // 搜索框为空
        if (!this.$util.isDefine(val)) {
          this.getTree()
        }
      }
    },
    props: ['searchDisabled1', 'styleHeight', 'systemStatus'],
    created () {
      this.disabledStatus = this.searchDisabled1
    },
    mounted () {
      this.status = this.systemStatus
      this.getSystemFunctionTree()
    },
    computed: {
      bindHeight: function () {
        return this.styleHeight //自定义高度需求
      }
    },
    methods: {
      // 节点点击事件
      handleNodeClicks (data, node, nodeCommpent) {
        this.$emit('systemfunctionTreeData', data)
        if (!data['CHILDREN']) {
          this.gpId = data.ID
        } else {
          this.$emit('listenToChildStepEvent', 'hide')
        }
      },
      // 点击搜索
      filterTree1 () {
        this.getSystemFunctionTree()
      },
      filterNode1 (value, data) {
        if (!value) return true
        return data.METHOD_NAME.indexOf(value) !== -1
      },
      // 自定义子节点内容
      renderContent1 (h, {node, data, store}) {
        var that = this // 指向vue
        return h(functionTree, {
          props: {
            data: data, // 当前节点的数据
            node: node, // 当前节点的Node对象
            isShowMore: true, // 是否显示更多按钮
            isCurrentUser: true,
            isShowMoreForNode: true, // 子节点是否显示更多按钮
            isShowMoreForCatalog: true // 目录是否显示更多按钮
          },
          on: { // 绑定方法 data node store
            seeListTreeNodeHandle: ((data, node) => that.seeListTree(data, node)),
            seeDetailTreeNodeHandle: ((data, node) => that.seeDetailTree(data, node))
          }
        })
      },
      // 系统函数树
      getSystemFunctionTree () {
        this.treeLoading = true
        this.systemFunctionData = []
        let url = ''
        if (this.status === 'paramone') { // 工程参数的系统函数
          url = '/apm/searchOneDimensionMethods'
        } else if (this.status === 'paramtwo') { // 分析参数的系统函数
          url = '/apm/searchTwoDimensionMethods'
        } else if (this.status === 'event') { // 事件
          url = '/apm/searchTwoDimensionMethods'
        }
        this.$axios.get(url, {params: {searchContent: this.filterText}}).then(response => {
          var data = response.data
          if (data.length > 0) {
            let obj = {}
            obj.ID = 0
            obj.METHOD_NAME = '系统函数'
            obj.CHILDREN = data
            this.systemFunctionData.push(obj)
            this.treeLoading = false
            if (data.defaultNode) {
              this.expandedKeys = data.defaultNode
            }
          } else if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          } else {
            this.treeLoading = false
          }
        }).catch(response => {
          this.treeLoading = false
          this.$message.error('数据加载失败!')
        })
      },
      setSearchExpandKeys (data) {
        this.expandedKeys = []
        if (data[0].TYPE !== 'CATALOG') {
          this.expandedKeys.push(data[0].ID)
        } else {
          this.setSearchExpandKeys(data[0].CHILDREN)
        }
      },
      // 禁止节点拖拽
      allowDrop (draggingNode, dropNode, type) {
        return false
      },
      // 刷新事件
      refresh () {
        this.getTree()
      },
      // 查看列表 跟二维参数不是一个菜单
      seeListTree () {
        if (this.status === 'paramone') {
          this.$bus.$emit('paramOneAddTab', {enName: 'paramOne_system_param', zhName: '系统函数', isClosable: true, parent: 'paramOne_systemFunction', count: 0})
        } else if (this.status === 'paramtwo') {
          this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_system_param', zhName: '系统函数', isClosable: true, parent: 'paramTwo_systemFunction', count: 0})
        } else if (this.status === 'event') {
          this.$bus.$emit('paramEventAddTab', {enName: 'event_system_param', zhName: '系统函数', isClosable: true, parent: 'paramEvent_eventLibrary', count: 0})
        }
      },
      // 查看详情
      seeDetailTree (data, node) {
        if (this.status === 'paramone') {
          this.$bus.$emit('paramOneAddTab', {enName: 'paramOne_system_param', zhName: '系统函数', isClosable: true, parent: 'paramOne_systemFunction', count: 0, list: this.systemFunctionData, detail: data.METHOD_NAME})
        } else if (this.status === 'paramtwo') {
          this.$bus.$emit('paramTwoAddTab', {enName: 'paramTwo_system_param', zhName: '系统函数', isClosable: true, parent: 'paramTwo_systemFunction', count: 0, list: this.systemFunctionData, detail: data.METHOD_NAME})
        } else if (this.status === 'event') {
          this.$bus.$emit('paramEventAddTab', {enName: 'event_system_param', zhName: '系统函数', isClosable: true, parent: 'paramEvent_eventLibrary', count: 0, list: this.systemFunctionData, detail: data.METHOD_NAME})
        }
      }
    }
  }
</script>
