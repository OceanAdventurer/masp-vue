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
  <div class="header-tab" v-if="EventTabs.length > 0">
    <el-tabs v-model="EventTabsValue" style="height:100%" type="card" @tab-remove="removeParamOneTab"
             @tab-click="clickParamOneTab">
      <el-tab-pane
        v-for="item in EventTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'EventManager'">
          <EventManager ref="EventManagerRef"></EventManager>
        </div>
        <div v-else-if="item.content==='event_profile_look' || item.content==='event_profile_edit'">
          <EventProfileEdit :goback="goback"  :paramManagerObj="paramManagerObj" :scriptType1 = "scriptType" :backnowCatalogData="nowCatalogData" :backnoWCatalogNode="noWCatalogNode" :backProfileCatalogId="profileCatalogId" :saveReturnTwoDimensionId1="saveReturnTwoDimensionId" :twoDimensionNamebd="twoDimensionNamebd" :isCurrentUser="isCurrentUser" ref="eventFileEditref"></EventProfileEdit>
        </div>
        <div v-else-if="item.content==='profile_event_definition' || item.content==='profile_event_definition_saveAfter'">
          <CreateEvent ref="EventCreateSaveAfterRef" :nowCatalogData1="nowCatalogData" :noWCatalogNode1="noWCatalogNode" :showSelectLibraryParam="showSelectLibraryParam" :paramManagerObj="paramManagerObj" :scriptType1="scriptType" :backProfileCatalogId="profileCatalogId" :saveReturnTwoDimensionId1="saveReturnTwoDimensionIdbd" :twoDimensionName1="twoDimensionNamebd" :libraryIds="multipleSelection" :edit="algorithmsLibraryNewEditStatus" :page="sourcePage" :linkParam="isLinkParam" :isCurrentUser1="isCurrentUser" ></CreateEvent>
        </div>
        <div v-else-if="item.content === 'event_system_param'">
          <EventFuncation :dataDetail="functionDataDetail"></EventFuncation>
        </div>
        <div v-else>{{ item.title }}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import Equation from 'components/paramone/OneDimensional/Equation'
const EventManager = () => import('components/event/EventManager')
const EventProfileEdit = () => import('components/event/EventProfileEdit')
const CreateEvent = () => import('components/event/CreateEvent')
const EventFuncation = () => import('components/event/EventFuncation')

export default {
  data () {
    return {
      activeName: '',
      nowCatalogData: {},
      noWCatalogNode: {},
      algorithmsLibraryNewEditStatus: false, // 是否编辑
      showSelectLibraryParam: false,
      profileCatalogId: '',
      saveReturnTwoDimensionId: '',
      twoDimensionNamebd: '',
      scriptType: 5, // 事件只有5
      goback: '', // 是否返回界面
      isCurrentUser: false,
      isLinkParam: '',
      saveReturnTwoDimensionIdbd: '',
      parentId: '',
      paramManagerObj: {},
      treeData: [],
      multipleSelection: [],
      bindingLibrary: [],
      sourcePage: '',
      editStatus: false,
      selectLibraryList: [],
      EventTabsValue: '1',
      functionDataDetail: {},
      isAddTreeNode: false,
      fileNewTreeArr: [], // 左侧树状数据
      EventTabs: [],
      tabIndex: 1,
      dataObj: {},
      manageMenus: 'event_profile_rename,event_add_catalog,event_library_add,event_delete_catalog,eventLibrary_rname,event_delete_profile',
      editMenus: 'profile_event_add,eventLibrary_jisuan_event,eventLibrary_share_event,eventLibrary_share_event_cancle,event_delete_event,event_definition_level',
      beforeEditValue: ''
    }
  },
  created () {
    this.openTab({
      enName: 'EventManager',
      zhName: '事件库',
      isClosable: false,
      parent: 'paramEvent_eventLibrary',
      count: 0
    })
  },
  components: {
    EventManager,
    EventProfileEdit,
    CreateEvent,
    EventFuncation
  },
  mounted () {
    this.$bus.$off('paramEventAddTab') // 移除自定义事件监听器。
    this.$bus.$off('eventTreeData') // 移除自定义事件监听器。
    this.$bus.$off('eventParamLibrayAddCatalog1Vaue') // 移除自定义事件监听器。
    this.$bus.$off('emitTreeData') // 移除自定义事件监听器。
    this.$bus.$off('clearMultipleSelection') // 移除自定义事件监听器。
    this.$bus.$off('eventMenu') // 移除自定义事件监听器。
    // 点击查看编辑传值
    this.$bus.$on('clearMultipleSelection', () => {
      this.multipleSelection = []
    })
    this.$bus.$on('eventMenu', () => {
      this.getMenueByenName(this.activeName)
    })
    this.$bus.$on('eventParamLibrayAddCatalog1Vaue', (data) => {
      this.paramManagerObj = data
      this.parentId = this.paramManagerObj.ID // 点击编辑按钮跳转到分析参数页面需要的值
      this.isAddTreeNode = false // 每次点击节点的时候，说明可以新增节点，将其设置为false
    })
    // 点击查看编辑传值
    this.$bus.$on('emitTreeData', (data) => {
      this.noWCatalogNode = data.noWCatalogNode
      this.nowCatalogData = data.nowCatalogData
     })

    // 新建算法、编辑算法传值到saveafter页面
    this.$bus.$on('emitDataToEventSaveAfter', (obj) => {
      this.sourcePage = obj.sourcePage // saveafter 表示新建直接进入定义界面 其他表示定义事件
      this.bindingLibrary = obj.bindingLibrary
      this.multipleSelection = obj.multipleSelection
      this.paramManagerObj = obj.paramManagerObj
      this.profileCatalogId = obj.profileCatalogId
      this.scriptType = obj.scriptType
      this.saveReturnTwoDimensionIdbd = obj.twoDimensionParamId
      this.twoDimensionNamebd = obj.twoDimensionName
      this.isCurrentUser = obj.currentUser
      this.isLinkParam = obj.isLinkParam
    })
    // 在新的绑定界面，点选择时传值，最终要传到新建。编辑界面
    this.$bus.$on('event_binding_select_librarys', (obj) => {
      console.log(123456789)
      console.log(obj)
      this.paramManagerObj = obj.paramManagerObj
      this.scriptType = obj.scriptType
      // 下面的数据跳转到新增编辑界面时需要用到
      this.isCurrentUser = obj.isCurrentUser
      this.profileCatalogId = obj.backProfileCatalogId
      this.saveReturnTwoDimensionId = obj.saveReturnTwoDimensionId
      this.twoDimensionNamebd = obj.twoDimensionNameValue
      this.noWCatalogNode = obj.backnoWCatalogNode
      this.nowCatalogData = obj.backnowCatalogData
    })
    this.$bus.$on('eventTreeData', (val) => {
      this.treeData = val
    })
    // 事件 新增tab
    this.$bus.$on('paramEventAddTab', (obj) => {
      if (this.manageMenus.indexOf(obj.enName) > -1) { // manageMenus 中存在的，不新开tab
        this.$bus.$emit('EventManagerEmit', obj.enName)
      } else if (this.editMenus.indexOf(obj.enName) > -1) { // EventEdit 页面的菜单在editMenus中存在不新开tab
        this.$bus.$emit('EventEditEmit', obj.enName)
      } else if (obj.enName === 'event_clear_suanfa') { // 清空关系映射
        this.$bus.$emit(obj.enName)
      } else { // 需要新开tab的
        switch (obj.enName) {
          case 'event_profile_edit_return': // 保存返回，
            obj.enName = 'event_profile_edit'
            this.isCurrentUser = true
            this.goback = true
            this.toEventEditPage(obj)
            break
          case 'event_profile_edit': // 编辑
            this.goback = false
            this.isCurrentUser = true
            this.toEventEditPage(obj)
            break
          case 'event_profile_look': // ，查看
            this.goback = false
            this.isCurrentUser = false
            this.toEventEditPage(obj)
            break
          case 'profile_event_definition':
            this.definingEvents(obj)
            break
          case 'profile_event_definition_saveAfter':
            this.openTab(obj)
            break
          case 'event_system_param':
            this.functionDataDetail = obj.detail
            this.openTab(obj)
            break
        }
       }
    })
  },
  methods: {
    definingEvents (obj) {
      if (this.multipleSelection === null || this.multipleSelection.length === 0) {
        this.$message.error('至少选择一个版本库!')
        return false
      }
      obj.zhName = this.twoDimensionNamebd
      this.showSelectLibraryParam = false // 默认不是编辑，不是多个选择界面
      this.algorithmsLibraryNewEditStatus = false
      if (this.multipleSelection.length === 1 && this.multipleSelection[0].mapping) { // 是单个，并且是编辑
          this.algorithmsLibraryNewEditStatus = true
      } else { // 多个
        let count = 0
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].mapping) {
            count++
          }
        }
        if (count > 0) {
          this.algorithmsLibraryNewEditStatus = true
          this.showSelectLibraryParam = true
        }
      }
      this.openTab(obj)
    },
    // 打开tab
    openTab (obj) {
      this.$bus.$emit('openHeaderMenuItem', obj.parent, {}, {}) // 新开页签 先清空头部，后在创建新的
      // if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.EventTabs)) { // enName 和zhName 想
      //   let EventTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.EventTabs)
      //   this.closeTab(EventTabsValue)
      // }
      if (this.$util.getTabValue(obj.enName, obj.parent, this.EventTabs) > 0) {
        let paramTwoTabsValue = this.$util.getTabValue(obj.enName, obj.parent, this.EventTabs)
        this.removeParamOneTab(paramTwoTabsValue)
      }
      let newTabName = ++this.tabIndex + ''
      this.EventTabs.push({
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      })
      this.EventTabsValue = newTabName
      this.activeName = obj.enName
    },
    removeParamOneTab (targetName) { // 关闭tab标签
      this.closeTab(targetName)
    },
    // 关闭tab
    closeTab (targetName) {
      let tabs = this.EventTabs
      let activeName = this.EventTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.activeName = nextTab.enName
              this.getMenueByenName(this.activeName)
            }
          }
        })
      }
      this.EventTabsValue = activeName
      this.EventTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickParamOneTab (vc) { // 点击tab标签获取实例
      var attrObj = vc.$attrs
      this.activeName = attrObj.id
      this.getMenueByenName(this.activeName)
    },
    getMenueByenName (enName) {
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
        // 'analysis_file_open': false
      }
      var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
        // 'analysis_file_copy': false
      }
      let parentName = ''
      if (enName === 'EventManager') { // 默认页面
        hideMenuObj = this.$refs.EventManagerRef[0].hideMenuObj
        disabledMenuObj = this.$refs.EventManagerRef[0].disabledMenuObj
        parentName = 'paramEvent_eventLibrary'
      } else if (enName === 'event_profile_look' || enName === 'event_profile_edit') { // 查看编辑
        hideMenuObj = this.$refs.eventFileEditref[0].hideMenuObj
        disabledMenuObj = this.$refs.eventFileEditref[0].disabledMenuObj
        parentName = 'paramEvent_eventLibrary'
      } else if (enName === 'profile_event_definition') {
        parentName = 'paramEvent_eventLibrary'
      } else if (enName === 'profile_event_definition_saveAfter') {
        parentName = 'paramEvent_eventLibrary'
      }
      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', parentName, hideMenuObj, disabledMenuObj) // 修改头部显示效果
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
    toEventEditPage (obj) {
      this.goback = obj.goback
      obj.zhName = this.paramManagerObj.NAME
        if (obj.goback === 'createEventPage') {
          let paramTwoTabsValue = this.$util.getTabValue('profile_event_definition', obj.parent, this.EventTabs)
          let paramTwoTabsValue1 = this.$util.getTabValue('profile_event_definition_saveAfter', obj.parent, this.EventTabs)
          this.closeTab(paramTwoTabsValue)
          this.closeTab(paramTwoTabsValue1)
        }
      obj.enName = 'event_profile_look'
      this.openTab(obj)
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
