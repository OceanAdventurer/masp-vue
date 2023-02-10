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
    <!-- 过滤节点 -->
    <div class="left_filter" v-show="searchShow">
      <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small" @keyup.enter.native="filterTree('treeKey')" v-if ="!disabledStatus">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
      </el-input>
      <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small" @keyup.enter.native="filterTree('treeKey')" v-else disabled="disabled">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
      </el-input>
    </div>
    <!-- 树 -->
    <div class="left_tree" v-loading="treeLoading" :style="{height: bindHeight}">
      <el-tree :data="fileNewTreeArr"  node-key="ID" :props="defaultTreeProps" highlight-current
               :default-expanded-keys="expandedKeys"
               @node-click="handleNodeClick" :render-content="renderContent"
               ref="tree" :filter-node-method="filterNode">
      </el-tree>
    </div>
  </div>
</template>
<script>
import TreeBase from 'components/base/TreeBase'

  export default {
    data () {
      return {
        gpId: '',
        treeLoading: false,
        explainShow: false,
        fileNewTreeArr: [],
        expandedKeys: [], // 默认展开的keys数组
        defaultTreeProps: {
          label: 'NAME',
          children: 'CHILDREN'
        },
        parentId: '-1',
        iconShow: true, // 树节点过滤图标
        searchShow: true, // 树节点搜索框
        disabledStatus: false,
        filterText: '',
        attrRight: 'attrFirst'
      }
    },
    watch: {
      // filterText (val) {
      //   // 搜索框为空
      //   if (!this.$util.isDefine(val)) {
      //     this.getTree()
      //   }
      // }
    },
    props: ['searchDisabled1', 'styleHeight'],
    created () {
      this.disabledStatus = this.searchDisabled1
    },
    mounted () {
      this.$nextTick(() => {
        this.getTree()
      })
    },
    computed: {
      bindHeight: function () {
        return this.styleHeight //自定义高度需求
      }
    },
    methods: {
      handleClick () {
        this.filterText = ''
          this.getTree()
      },
      // 初始化树
      getTree () {
        this.treeLoading = true
        this.fileNewTreeArr = []
        this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId}}).then(response => {
          var data = response.data
          if (data) {
            this.fileNewTreeArr = data.data
            if (data.defaultNode) {
              this.expandedKeys = data.defaultNode
            }
            this.treeLoading = false
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
      // 节点悬浮描述信息
      // 自定义子节点内容
      renderContent (h, {node, data, store}) {
        return h(TreeBase, {
          props: {
            data: data, // 当前节点的数据
            node: node // 当前节点的Node对象
          },
          on: {
          }
        })
      },
      // 节点点击事件
      handleNodeClick (data, node, nodeCommpent) {
        this.$emit('gcparamObj', data)
        if (!data['CHILDREN']) {
          this.gpId = data.ID
          this.getDetail()
        } else {
          this.explainShow = false
        }
      },
      // 禁止节点拖拽
      allowDrop (draggingNode, dropNode, type) {
        return false
      },
      // 加载工程参数子节点-说明
      getDetail () {
        var param = { gpId: this.gpId }
        this.$axios.get('/apm/getGpDetail', { params: param }).then(response => {
          var data = response.data
          if (data['status']) {
            if (response.data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            }
          }
          // this.attrExplain = data.DESCRIPTION
          if (!this.$util.isDefine(data.DESCRIPTION)) {
            this.explainShow = false
          } else {
            this.explainShow = true
          }
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('数据加载失败!')
        })
      },
      filterNode (value, data) {
        if (!value) return true
        return data.NAME.indexOf(value) !== -1
      },
      // 树节点过滤图标
      filterTree (flag) {
        this.explainShow = false
        this.treeLoading = true
        this.fileNewTreeArr = []
        this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId, content: this.filterText}}).then(response => {
          var data = response.data
          if (data['status']) {
            if (response.data.status === 'E1001') {
              this.$bus.$emit('logBackInHandle', response.data)
            } else {
              this.$message.error(response.data.message)
            }
          }
          if (data) {
            this.fileNewTreeArr = data.data
            this.treeLoading = false
            if (data.defaultNode) {
              this.expandedKeys = data.defaultNode
            }
          } else {
            this.treeLoading = false
          }
        }).catch(response => {
          this.treeLoading = false
          this.$message.error('数据加载失败!')
        })
      },
      // 刷新事件
      refresh () {
        this.getTree()
      }
    }
  }
</script>
