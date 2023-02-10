<style scoped>
.edit_code {
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 100%;

  width: 100%;
}
</style>

<template>
  <div class="header-tab" v-if="paramOneTabs.length > 0">
    <el-tabs v-model="paramOneTabsValue" style="height:100%" type="card" @tab-remove="removeParamOneTab" @tab-click="clickParamOneTab">
      <el-tab-pane
        v-for="item in paramOneTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'paramOneManager'">
          <ParamOneManager :parentToChild="beforeEditValue" ref="paramOneManagerRef"></ParamOneManager>
        </div>
        <div v-else-if="item.content==='paramOne_oneDimensionalFunction_manager'" >
            <OneDimensionalFunction></OneDimensionalFunction>
        </div>
<!--        <div v-else-if="item.content==='paramOne_oneDimensionalFunction_new'" class="edit_code">-->
<!--            <Equation :dataObj="dataObj" ref="child"></Equation>-->
<!--        </div>-->
        <div v-else-if="item.content === 'paramOne_system_param'">
          <ParamOneFuncation :dataDetail="functionDataDetail"></ParamOneFuncation>
        </div>
        <div v-else-if="item.content === 'paramOne_add_suanfa' || item.content === 'paramOne_edit_suanfa'"> <!--工程算法界面-->
          <ParamOneAlgorithm :gpId="gpId" @closeSuanfaTab="closeSuanfaTab" :selectLibraryList="selectLibraryList" :editStatus="editStatus"></ParamOneAlgorithm>
        </div>
        <div v-else-if="item.content === 'intelligent_matching_select'"> <!--智能匹配选择界面-->
          <IntelligentMatchingSelect></IntelligentMatchingSelect>
        </div>
        <div v-else-if="item.content === 'intelligent_matching_list'"> <!--智能匹配列表-->
          <lntelligentMatchingList ref="lntelligentMatchingListRef" :currentLibraryVersion="currentLibraryVersion" :matchingData="matchingData" :paramOneEditAuthority="paramOneEditAuthority"></lntelligentMatchingList>
        </div>
        <div v-else>{{item.title}}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import Equation from 'components/paramone/OneDimensional/Equation'
const ParamOneManager = () => import('components/paramone/ParamOneManager')
const OneDimensionalFunction = () => import('components/paramone/OneDimensional/OneDimensionalFunction')
const Equation = () => import('components/paramone/OneDimensional/Equation')
const ParamOneFuncation = () => import('components/paramone/ParamOneFuncation')
const ParamOneAlgorithm = () => import('components/paramone/ParamOneAlgorithm')
const lntelligentMatchingList = () => import('components/paramone/IntelligentMatch/lntelligentMatchingList')
const IntelligentMatchingSelect = () => import('components/paramone/IntelligentMatch/IntelligentMatchingSelect')

export default {
  data () {
    return {
      activeTabName: '',
      matchingData: [],
      gpId: '', // 工程参数节点ID
      editStatus: false,
      selectLibraryList: [],
      paramOneTabsValue: '1',
      functionDataDetail: {},
      isAddTreeNode: false,
      fileNewTreeArr: [], // 左侧树状数据
      paramOneTabs: [],
      tabIndex: 1,
      dataObj: {},
      menueValues: 'intelligent_param_matching_init,paramOne_add_catalog,paramOne_file_new,paramOne_file_edit,paramOne_file_remove,intelligent_param_matching,paramOne_intelligentMatching_clear,intelligent_matching_save',
      beforeEditValue: '',
      paramOneEditAuthority: false,
      currentLibraryVersion: '' // 当前版本号
    }
  },
  created () {
    this.addParamOneTab({enName: 'paramOneManager', zhName: '工程参数', isClosable: false, parent: 'paramOne_file', count: 0})
  },
  components: {
    ParamOneManager,
    OneDimensionalFunction,
    Equation,
    ParamOneFuncation,
    ParamOneAlgorithm,
    IntelligentMatchingSelect,
    lntelligentMatchingList
  },
  mounted () {
    this.$bus.$off('paramOneAddTab') // 移除自定义事件监听器。
    this.$bus.$off('closeThisTab') // 移除自定义事件监听器。
    this.$bus.$off('paramOneMenu') // 移除自定义事件监听器。
    // 点击子节点时，传值，当点击二级菜单时需要用到值 或 点击右侧 树菜单传值
    this.$bus.$on('paramOneAddCatalog', (data, node) => {
      this.catalogData = data
      this.catalogNode = node
      this.parentId = data.ID // 点击编辑按钮跳转到分析参数页面需要的值
    })
    this.$bus.$on('paramOneMenu', () => {
      this.getMenueByenName(this.activeTabName)
    })
    // 初始化完成，关闭页签
    this.$bus.$on('closeThisTab', (v) => {
      if (this.$util.getTabValue(v, 'paramOne_intelligentMatching', this.paramOneTabs) > 0) {
        let paramTwoTabsValue = this.$util.getTabValue(v, 'paramOne_intelligentMatching', this.paramOneTabs)
        this.closeTab(paramTwoTabsValue)
      }
    })
    this.$bus.$on('getTreeData', (obj) => {
      this.fileNewTreeArr = obj
    })
    this.$bus.$on('isAddTreeNode', (obj) => {
      this.isAddTreeNode = obj
    })
    // 工程参数 新增tab
    this.$bus.$on('paramOneAddTab', (obj) => {
      if (this.menueValues.indexOf(obj.enName) <= -1) { // 打开tab
        if (obj.enName === 'intelligent_matching_list') {
          this.matchingData = obj.data
        }
        this.addParamOneTab(obj)
      } else { // 二级目录操作
        // 不添加tab 触发对应的事件
        if (obj.enName === 'paramOne_file_remove') {
          this.$refs.paramOneManagerRef[0].deleteGp(this.catalogData)
        } else if (obj.enName === 'paramOne_add_catalog') { // 添加目录
          this.$refs.paramOneManagerRef[0].addNodeFun(this.catalogData, this.catalogNode, 'catalog')
        } else if (obj.enName === 'paramOne_file_new') { // 添加工程参数
          this.$refs.paramOneManagerRef[0].addNodeFun(this.catalogData, this.catalogNode, 'node')
        } else if (obj.enName === 'paramOne_file_edit') { // 编辑
          this.$refs.paramOneManagerRef[0].editNodeFun(this.catalogData, this.catalogNode)
        } else { // 点击菜单，发送事件在对应的页面接收
          this.$bus.$emit(obj.enName)
        }
      }
    })
  },
  methods: {
    closeSuanfaTab () {
      if (this.$util.getTabValue('paramOne_add_suanfa', 'paramOne_file', this.paramOneTabs)) { // 判断新建算法界面是否存在，如果存在，则是返回过来的。则删除界面
        let tabIndex = this.$util.getTabValue('paramOne_add_suanfa', 'paramOne_file', this.paramOneTabs)
        this.closeTab(tabIndex)
      }
      if (this.$util.getTabValue('paramOne_edit_suanfa', 'paramOne_file', this.paramOneTabs)) { // 判断新建算法界面是否存在，如果存在，则是返回过来的。则删除界面
        let tabIndex = this.$util.getTabValue('paramOne_edit_suanfa', 'paramOne_file', this.paramOneTabs)
        this.closeTab(tabIndex)
      }
    },
    addParamOneTab (obj) { // 添加tab标签
      var equationTitle = ''
      if (obj.enName === 'paramOneManager') {
        equationTitle = '工程参数'
        if (this.$util.getTabNameValue(equationTitle, obj.enName, this.paramOneTabs)) {
          this.paramOneTabsValue = this.$util.getTabNameValue(equationTitle, obj.enName, this.paramOneTabs) // 激活已存在tab标签
          return false // 已经存在tab标签，再次点击时不再添加
        }
        this.openTab(obj)
      } else if (obj.enName === 'paramOne_oneDimensionalFunction_manager') { // 工程算法
        // tab页是否存在
        if (this.$util.getTabNameValue(equationTitle, obj.enName, this.paramOneTabs)) {
          this.paramOneTabsValue = this.$util.getTabNameValue(equationTitle, obj.enName, this.paramOneTabs) // 激活已存在tab标签
          return false // 已经存在tab标签，再次点击时不再添加
        }
        this.openTab(obj)
      } else if (obj.enName === 'paramOne_system_param') { // 系统函数
        this.functionDataDetail = obj.detail
        this.openTab(obj)
      } else if (obj.enName === 'paramOne_add_suanfa' || obj.enName === 'paramOne_edit_suanfa') { // 新增算法
        if (obj.libraryList) { // 工程算法列表页面过来
          this.editStatus = true
          this.gpId = obj.libraryList[0].ID
          this.selectLibraryList = obj.libraryList
          this.openTab(obj)
        } else { // manager页面过来的
          this.selectLibraryList = this.$refs.paramOneManagerRef[0].multipleSelection // 选中的
          if (this.selectLibraryList === [] || this.selectLibraryList.length === 0) {
            this.$message.error('至少选择一个版本库!')
          } else {
            obj.zhName = this.$refs.paramOneManagerRef[0].engineParameterData.NAME
            this.gpId = this.$refs.paramOneManagerRef[0].engineParameterData.ID
            if (obj.enName === 'paramOne_edit_suanfa') {
              this.editStatus = true
            } else {
              this.editStatus = false
            }
            obj.enName = 'paramOne_add_suanfa' // 新增编辑用一个页面
            this.openTab(obj)
          }
        }
      } else if (obj.enName === 'paramOne_clear_suanfa') { // 清空算法
        this.$refs.paramOneManagerRef[0].clearBindGp()
      } else if (obj.enName === 'intelligent_matching_list') {
        this.currentLibraryVersion = obj.zhName
        this.paramOneEditAuthority = obj.paramOneEditAuthority
        this.openTab(obj)
      } else {
        if (!obj.zhName) {
          obj.zhName = '工程参数'
        }
        this.openTab(obj)
      }
    },
    // 打开tab
    openTab (obj) {
      // 每次点击重新打开页签，重新加载 mounted 否则会导致数据不对
      if (obj.enName === 'paramOne_system_param' && this.$util.getTabValue(obj.enName, obj.parent, this.paramOneTabs)) { // 系统函数关闭重新打开会清空数据所以不需要关闭
        this.paramOneTabsValue = this.$util.getTabValue(obj.enName, obj.parent, this.paramOneTabs)
        this.updateTabData(obj.zhName, obj.enName, obj.parent, 'parent') // 更新数据，针对分析结果
        return false
      }
      // if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.paramOneTabs)) { // enName 和zhName 想
      //   let paramOneTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.paramOneTabs)
      //   this.closeTab(paramOneTabsValue)
      // }
      if (this.$util.getTabValue(obj.enName, obj.parent, this.paramOneTabs) > 0) {
        let paramTwoTabsValue = this.$util.getTabValue(obj.enName, obj.parent, this.paramOneTabs)
        this.closeTab(paramTwoTabsValue)
      }
      let newTabName = ++this.tabIndex + ''
      this.paramOneTabs.push({
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      })
      this.paramOneTabsValue = newTabName
      this.activeTabName = obj.enName
    },
    removeParamOneTab (targetName) { // 关闭tab标签
      this.closeTab(targetName)
    },
    // 关闭tab
    closeTab (targetName) {
      let tabs = this.paramOneTabs
      let activeName = this.paramOneTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.activeTabName = nextTab.enName
              this.getMenueByenName(this.activeTabName)
            }
          }
        })
      }
      this.paramOneTabsValue = activeName
      this.paramOneTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickParamOneTab (vc) { // 点击tab标签获取实例
      var attrObj = vc.$attrs
      this.activeTabName = attrObj.id
      this.getMenueByenName(this.activeTabName)
      // console.log(attrObj.parent, hideMenuObj, disabledMenuObj)
    },
    getMenueByenName (enName) {
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
        // 'analysis_file_open': false
      }
      var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
        // 'analysis_file_copy': false
      }
      let parentName = ''
      if (enName === 'paramOneManager') {
        hideMenuObj = this.$refs.paramOneManagerRef[0].hideMenuObj
        disabledMenuObj = this.$refs.paramOneManagerRef[0].disabledMenuObj
        parentName = 'paramOne_file'
      } else if (enName === 'paramOne_add_suanfa') {
        parentName = 'paramOne_file'
      } else if (enName === 'paramOne_oneDimensionalFunction_manager') { // 工程算法
        hideMenuObj.paramOne_oneDimensionalFunction_manager = true
        parentName = 'paramOne_oneDimensionalFunction'
      } else if (enName === 'paramOne_system_param') { // 系统函数
        hideMenuObj.paramOne_system_param = true
        parentName = 'paramOne_systemFunction'
      } else if (enName === 'intelligent_matching_select') { // 智能匹配选择页面
        hideMenuObj.intelligent_matching_select = true
        parentName = 'paramOne_intelligentMatching'
       } else if (enName === 'intelligent_matching_list') { // 智能匹配-详情页面
        hideMenuObj = this.$refs.lntelligentMatchingListRef[0].hideMenuObj
        disabledMenuObj = this.$refs.lntelligentMatchingListRef[0].disabledMenuObj
        parentName = 'paramOne_intelligentMatching'
      }
      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', parentName, hideMenuObj, disabledMenuObj) // 修改头部显示效果
    },
    // 增加节点,且是处于编辑中
    addNodeFun (data, node, type) {
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
            setTimeout(() => {
              data.CHILDREN.push({
                ID: this.$util.generateUUID(),
                NAME: null,
                CHILDREN: [],
                status: 1,
                nodeType: type,
                isAdd: true
              })
            }, 300)
          } else {
            setTimeout(() => {
              data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, status: 1, nodeType: type, isAdd: true})
            }, 300)
          }
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
    // 编辑节点
    editNodeFun (data, node) { // 编辑节点
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
       // console.log('editNodeFun', data, node)
      }
    }
  }
}
</script>
