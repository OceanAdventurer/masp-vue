<style scoped>
.div_equation_left {
  /* width: 335px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.left_tree {
  overflow: auto;
  height: 91%;
  border: 1px solid #ebeef5;
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
  border: 0px solid #ebeef5;
  height: 45px;
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

</style>

<template>
  <!-- 新建分析参数算法之脚本编辑 -->
  <div class="div_equation_left">
    <!-- 过滤节点 -->
    <div class="left_filter" v-show="searchShow">
      <el-input placeholder="请输入关键字搜索" v-model="filterText" size="small" @keyup.enter.native="filterTree('treeKey')">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="filterTree('treeKey')"></i>
      </el-input>
    </div>
    <!-- 树 -->
    <div class="left_tree df-f1" v-loading="treeLoading">
      <el-tree :data="fileNewTreeArr" node-key="ID" :props="defaultTreeProps" highlight-current
               :default-expanded-keys="expandedKeys"
               @node-click="handleNodeClick" :render-content="renderContent"
        ref="tree" :filter-node-method="filterNode">
      </el-tree>
    </div>
    <!-- <div class="left_description" style="padding:20px 0px 20px 20px;">
      <span>说明：</span>
      <span class="descri" ref="descri_text"></span>
    </div> -->
  </div>
</template>
<script>

export default {
  data () {
    return {
      treeLoading: false,
      fileNewTreeArr: [],
      expandedKeys: [],
      defaultTreeProps: {
        label: 'NAME',
        children: 'CHILDREN'
      },
      parentId: '-1',
      iconShow: true, // 树节点过滤图标
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '' // 子节点id
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
  mounted () {
    this.$nextTick(() => {
      this.getTree()
    })
  },
  methods: {
    // 初始化树
    getTree () {
      this.treeLoading = true
      this.fileNewTreeArr = []
      this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId}}).then(response => {
        var data = response.data
        if (data.length > 0) {
          this.fileNewTreeArr = data
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
    // 节点悬浮描述信息
    renderContent (h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span title={data.DESCRIPTION ? data.DESCRIPTION : data.NAME}>{node.label}</span>
        </span>
      )
    },
    // 节点点击事件
    handleNodeClick (data, node, nodeCommpent) {
      if (!data['CHILDREN']) {
        this.gpId = data.ID
        var obj = {}
        obj.ID = data.ID
        obj.NAME = 'left_' + data.NAME
        this.$emit('listenToChildEvent', obj)
        // this.getDetail()
      } else {
        this.$emit('listenToChildEvent', 'hide')
      }
    },
    // 加载工程参数子节点-说明
    // getDetail () {
    //   var param = { gpId: this.gpId }
    //   this.$axios.get('/apm/getGpDetail', { params: param }).then(response => {
    //     var data = response.data
    //     if (data['status']) {
    //       if (response.data.status === 'E1001') {
    //         this.$bus.$emit('logBackInHandle', response.data)
    //       }
    //     }
    //     this.$refs.descri_text.textContent = data.DESCRIPTION
    //     this.$store.commit('HIDE_LOADING', '拼命加载中!')
    //   }).catch(response => {
    //     this.$store.commit('HIDE_LOADING', '拼命加载中!')
    //     this.$message.error('数据加载失败!')
    //   })
    // },
    filterNode (value, data) {
      if (!value) return true
      return data.NAME.indexOf(value) !== -1
    },
    // 树节点过滤图标
    filterTree (flag) {
      this.$emit('listenToChildEvent', 'hide')
      this.treeLoading = true
      this.fileNewTreeArr = []
      this.$axios.get('/apm/getGpTree', {params: {parentId: this.parentId, content: this.filterText}}).then(response => {
        var data = response.data
        if (data['status']) {
          if (data.status === 'E1001') {
            this.$bus.$emit('logBackInHandle', response.data)
          }
        }
        if (data.length > 0) {
          this.fileNewTreeArr = data
          this.treeLoading = false
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
