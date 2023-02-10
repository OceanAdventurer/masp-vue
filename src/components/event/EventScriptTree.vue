<style scoped>
  .div_equation_left {
    /* width: 335px; */
    height: calc(80vh - 121px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #ebeef5;
  }

  .left_tree {
    overflow: auto;
    height: calc(80vh - 204px);
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
    margin-bottom: 5px;
  }
  .el-icon-search {
    font-size: 20px;
  }
</style>
<style>
</style>
<template>
  <div>
    <!-- 分析参数脚本编辑左侧的树 -->
    <div class="div_equation_left">
      <el-tabs  v-model="activeName" @tab-click="tabHandleClick" style="padding-left:5px;">
        <el-tab-pane label="工程参数" name="first">
          <GongChengParamTree :searchDisabled1="searchDisabled" @gcparamObj="getGongChengParamObj" :styleHeight="treeHight"></GongChengParamTree>
        </el-tab-pane>
        <el-tab-pane label="系统函数" name="second">
          <SystemFunctionTree :systemStatus="systemStatus" :styleHeight="treeHight" :searchDisabled1="searchDisabled" @systemfunctionTreeData="getSystemFunctionObj"></SystemFunctionTree>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="left_description" style="padding:20px 0px 20px 20px;width: 1000px;" v-show="showDescription">
      <span>说明：</span>
      <span class="descri" ref="descri_text"></span>
    </div>
  </div>
</template>
<script>
  import GongChengParamTree from 'components/base/GongChengParamTree'
  import SystemFunctionTree from 'components/base/SystemFunctionTree'

  export default {
    data () {
      return {
        treeHight: 'calc(80vh - 210px)',
        systemStatus: 'event',
        searchDisabled: false, //搜索框是否禁用
        treeLoading: false,
        defaultTreeProps: {
          label: 'NAME',
          children: 'CHILDREN'
        },
        systemProps: {
          label: 'METHOD_NAME',
          children: 'CHILDREN'
        },
        parentId: '-1',
        iconShow: true, // 树节点过滤图标
        searchShow: true, // 树节点搜索框
        activeName: 'first',
        gpId: '' // 子节点id
      }
    },
    props: ['showDescription', 'isLinkParam', 'isCurrentUser', 'isLoadScript'],
    watch: {
      showDescription (newData, oldData) {
        console.log(newData)
        console.log(oldData)
      },
      isLoadScript () {
        this.getTree()
      },
      filterText (val) {
        if (val === '') {
          this.getTree() //当清空值时查询
        }
      }
    },
    components: {
      GongChengParamTree,
      SystemFunctionTree
    },
    mounted () {
      if (this.isCurrentUser && !this.isLinkParam) {
        this.searchDisabled = false
      } else { // 表示 没搜索或操作权限
        this.searchDisabled = true
      }
    },
    methods: {
      // 点击节点获取工程参数点击事件的值
      getGongChengParamObj (v) {
        if (!this.searchDisabled) {
          this.showDescription = false
          if (!v['CHILDREN']) { // 如果是子节点则 赋值显示说明
            // 有说明则显示说明
            if (v['DESCRIPTION']) {
              this.showDescription = true
              this.$refs.descri_text.textContent = v['DESCRIPTION']
            }
            // 赋值
            this.gpId = v.ID
            // 在传到他的父组件去处理
            this.$emit('listenToChildStepEvent', v)
          }
        }
      },
      // 单击系统函数获取到data
      getSystemFunctionObj (data) {
        if (!this.searchDisabled) {
          this.showDescription = false
          if (!data['CHILDREN']) { // 如果是子节点则 赋值、显示说明
            if (data.METHOD_DESCRIPTION) { // 有说明显示说明
              this.showDescription = true
              this.$refs.descri_text.textContent = data.METHOD_DESCRIPTION
            }
            // 赋值
            this.gpId = data.ID
            this.$emit('listenToChildStepEvent1', data) // 在传到他的父组件显示
          }
        }
      },
      tabHandleClick () {
        this.showDescription = false
      }
    }
  }
</script>
