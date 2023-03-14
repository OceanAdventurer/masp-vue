<style scoped>
</style>

<template>
  <div class="header-tab" v-if="paramTwoTabs !== null && paramTwoTabs!=='' && paramTwoTabs.length > 0">
    <el-tabs v-model="paramTwoTabsValue" type="card" @tab-remove="removeParamTwoTab" @tab-click="clickParamTwoTab">
      <el-tab-pane
        v-for="item in paramTwoTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content==='paramTwoManager_profile'">
          <!--分析参数库-->
          <ParamTwoManager ref="paramtwomanagerref"></ParamTwoManager>
        </div>
        <!--分析参数库点击编辑进入的页面-->
        <div v-else-if="item.content==='paramTwo_file_edit' || item.content==='paramTwo_file_edit_look'">
          <ParamTwoFileEdit :goback="goback" :backnowCatalogData="nowTreeData" :backnoWCatalogNode="nowTreeNode" :paramManagerObj="paramManagerObj" :scriptType1 = "scriptType" :backProfileCatalogId="profileCatalogId" :saveReturnTwoDimensionId1="saveReturnTwoDimensionId" :twoDimensionNamebd="twoDimensionNamebd" :isCurrentUser="isCurrentUser" ref="paramTwoFileEditref"></ParamTwoFileEdit>
        </div>
        <!--        <div v-else-if="item.content === 'paramTwo_paramLibray_param_binding'">-->
        <!--          <ParamTwoBinding ref="paramtwobindingref" :scriptType1bd="scriptTypebd" :saveReturnTwoDimensionId1bd="saveReturnTwoDimensionIdbd" :twoDimensionNamebd="twoDimensionNamebd" :linkParam="isLinkParam" :isCurrentUser="isCurrentUser"></ParamTwoBinding>-->
        <!--        </div>-->
        <!--弹框保存参数成功之后进入算法界面/新建分析参数算法、编辑分析算法 从绑定页面跳转到算法界面-->
        <div v-else-if="item.content==='paramTwo_algorithmsLibrary_new' || item.content==='paramTwo_algorithmsLibrary_new_edit'|| item.content==='param_two_save_complete'">
          <ParamTwoSavedAfter ref="paramTwoSaveAfterRef" :nowTreeData="nowTreeData" :nowTreeNode="nowTreeNode" :showSelectLibraryParam="showSelectLibraryParam" :paramManagerObj="paramManagerObj" :scriptType1="scriptType" :backProfileCatalogId="profileCatalogId" :saveReturnTwoDimensionId1="saveReturnTwoDimensionIdbd" :twoDimensionName1="twoDimensionNamebd" :libraryIds="multipleSelection" :edit="algorithmsLibraryNewEditStatus" :page="sourcePage" :linkParam="isLinkParam" :isCurrentUser1="isCurrentUser" ></ParamTwoSavedAfter>
        </div>
        <!--个人算法库-->
        <div v-else-if="item.content === 'paramTwo_algorithmsLibrary_personal'">
          <ParamTwoAlgorithmsLibraryPersonal></ParamTwoAlgorithmsLibraryPersonal>
        </div>
        <!--分析参数配置-->
        <div v-else-if="item.content === 'paramTwo_paramLibray_config'">
          <ParamTwoSet></ParamTwoSet>
        </div>
        <div v-else-if="item.content === 'paramTwo_system_param'">
          <ParamTwoFuncation :dataDetail="functionDataDetail"></ParamTwoFuncation>
        </div>
        <div v-else-if="item.content === 'paramTwo_calculation_results'">
          <ParamTwoCalculationResults :resultData="resultData"></ParamTwoCalculationResults>
        </div>
        <div v-else>
          {{ item.title }}
          {{ item.content }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  const ParamTwoManager = () => import('components/paramtwo/ParamTwoManager')
  const ParamTwoFileEdit = () => import('components/paramtwo/ParamTwoFileEdit')
  const ParamTwoAlgorithmsLibraryNew = () => import('components/paramtwo/ParamTwoAlgorithmsLibraryNew')
  const paramTwoCreateNewFile = () => import('components/paramtwo/paramTwoCreateNewFile')
  const ParamTwoAlgorithmsLibraryPersonal = () => import('components/paramtwo/ParamTwoAlgorithmsLibraryPersonal')
  const ParamTwoSet = () => import('components/paramtwo/ParamTwoSet')
  const ParamTwoSavedAfter = () => import('components/paramtwo/ParamTwoSavedAfter')
  const ParamTwoBinding = () => import('components/paramtwo/ParamTwoBinding')
  const checkLibraryParam = () => import('components/paramtwo/checkLibraryParam')
  const ParamTwoFuncation = () => import('components/paramtwo/ParamTwoFuncation')
  const ParamTwoCalculationResults = () => import('components/paramtwo/ParamTwoCalculationResults')

  export default {
    data () {
      return {
        activeTabName: '',
        nowTreeData: {},
        nowTreeNode: {},
        showSelectLibraryParam: false,
        functionDataList: [],
        functionDataDetail: {},
        goback: '', // 是否返回界面
        isCurrentUser: true, // 是否当前登录用户
        fileNewTreeArr: [], // 左侧树状数据
        isLinkParam: false, // 左侧树状数据
        isAddTreeNode: false,
        paramManagerObj: {}, // 记录parammanger 页面跳转到paramTwoFileEdit页面的tab
        catalogData: {}, // 添加目录
        catalogNode: {},
        scriptId: '',
        paramTwoTabsValue: '1',
        paramTwoTabs: [],
        TimePointdialogVisible: false, // 是否显示弹框
        tabZhName: '',
        enName: '',
        parent: '',
        parentId: '',
        algorithmsLibraryNewEditStatus: false, // 是否编辑分析算法界面
        createSteps: {},
        mapping: '',
        sourcePage: '', // 来源页面
        profileTwoDimensionId: 0,
        twoDimensionName: '',
        bindingLibrary: [], // 所有版本库
        multipleSelection: [],
        saveReturnTwoDimensionId: 0,
        twoDimensionNamebd: '', // 防止跟上面的值出现重复
        scriptTypebd: '',
        saveReturnTwoDimensionIdbd: 0,
        menueValues: 'paramTwo_file_rename,paramTwo_share,paramTwo_share_cancle,paramTwo_edit_timePoint,paramTwo_paramLibray_add_catalog2,paramTwo_edit_timePoint,paramTwo_edit_timeSlot,paramTwo_edit_filter' +
          'paramTwo_edit_measureValue,paramTwo_edit_logicalValue,paramTwo_edit_event,paramTwo_edit_link,paramTwo_edit_compute,paramTwo_clean,paramEtlTwo_dimension,paramTwo_algorithmsLibrary_new,paramTwo_algorithmsLibrary_new_edit，paramTwo_algorithmsLibrary_new_remove' +
          'paramTwo_paramLibray_add_catalog1,paramTwo_paramLibray_add_param_library,paramTwo_edit,paramTwo_delete,paramTwo_delete_profile,paramTwo_delete_node,paramTwo_del_catalog',
        scriptType: '', // 保存分析参数完成之后用 类型 1，时间点， 2时间段 3测量4 逻辑值
        profileCatalogId: '', // 根目录节点id
        pofileType: '', // 类型 1，时间点， 2时间段 3测量4 逻辑值
        tabIndex: 1,
        resultData: {
          libraryData: '',
          scriptContent: '',
          profileId: '',
          test_data: ''
        },
        menueList: {
          '1': 'paramTwo_edit_timePoint',
          '2': 'paramTwo_edit_timeSlot',
          '3': 'paramTwo_edit_measureValue',
          '4': 'paramTwo_edit_logicalValue'
        }
      }
    },
    components: {
      ParamTwoManager,
      ParamTwoFileEdit,
      paramTwoCreateNewFile,
      ParamTwoAlgorithmsLibraryNew,
      ParamTwoAlgorithmsLibraryPersonal,
      ParamTwoSet,
      ParamTwoSavedAfter,
      ParamTwoBinding,
      checkLibraryParam,
      ParamTwoFuncation,
      ParamTwoCalculationResults
    },
    created () {
      this.addParamTwoTab({enName: 'paramTwoManager_profile', zhName: '分析参数库', isClosable: false, parent: 'paramTwo_paramLibray', count: 0})
    },
    mounted () {
      this.$bus.$off('paramTwoAddTab') // 移除自定义事件监听器。
      this.$bus.$off('paramTwolinkOrCurrentUser') // 移除自定义事件监听器。
      this.$bus.$off('emitDataToParamSaveAfter') // 移除自定义事件监听器。
      this.$bus.$off('param_two_binding_select_librarys') // 移除自定义事件监听器。
      this.$bus.$off('paramTwoParamLibrayAddCatalog1VaueManager') // 移除自定义事件监听器。
      this.$bus.$off('paramTwoParamLibrayAddCatalog1Vaue') // 移除自定义事件监听器。
      this.$bus.$off('param_two_save_complete_after') // 移除自定义事件监听器。
      this.$bus.$off('param_suanfa_back_param_edit') // 移除自定义事件监听器。
      this.$bus.$off('paramTwoAddTabEdit') // 移除自定义事件监听器。
      this.$bus.$off('ParamTwoCalculationResultsData') // 移除自定义事件监听器。
      this.$bus.$off('emitParamTwoTreeData') // 移除自定义事件监听器。
      this.$bus.$on('ParamTwoCalculationResultsData', (obj) => {
        this.resultData.scriptContent = obj.scriptContent
        this.resultData.test_data = obj.test_data
        this.resultData.profileId = obj.profileId
        this.resultData.libraryData = obj.libraryData
      })
      this.$bus.$on('paramTwoMenu', () => {
        this.getMenueByenName(this.activeTabName)
      })
      this.$bus.$on('emitParamTwoTreeData', (obj) => {
        this.nowTreeData = obj.data
        this.nowTreeNode = obj.node
      })
      // 点击子节点时，传值，当点击二级菜单时需要用到值 或 点击右侧 树菜单传值
      this.$bus.$on('paramTwoParamLibrayAddCatalog1VaueManager', (data, node, obj) => {
        this.catalogData = data
        this.catalogNode = node
        this.parentId = data.ID // 点击编辑按钮跳转到分析参数页面需要的值
        this.isAddTreeNode = false // 每次点击节点的时候，说明可以新增节点，将其设置为false
        this.fileNewTreeArr = obj.treeData
      })
      this.$bus.$on('paramTwoParamLibrayAddCatalog1Vaue', (data) => {
        this.paramManagerObj = data
        this.parentId = this.paramManagerObj.ID // 点击编辑按钮跳转到分析参数页面需要的值
        this.isAddTreeNode = false // 每次点击节点的时候，说明可以新增节点，将其设置为false
      })
      this.$bus.$on('paramTwolinkOrCurrentUser', (obj) => {
        this.isLinkParam = obj.isLinkParam
        this.isCurrentUser = obj.isCurrentUser
      })
      // 新增分析参数弹框保存成功之后触发。保存参数之后跳转到绑定界面之前触发
      this.$bus.$on('param_two_save_complete_after', (obj) => {
        this.sourcePage = 'saveAfter' // 保存完成后
        this.paramManagerObj = obj.paramManagerObj
        this.profileCatalogId = obj.profileCatalogId
        this.scriptType = obj.scriptType
        this.saveReturnTwoDimensionIdbd = obj.twoDimensionParamId
        this.twoDimensionNamebd = obj.twoDimensionName
        this.isCurrentUser = obj.currentUser
      })
      // 在新的绑定界面，点选择时传值，最终要传到新建。编辑界面
      this.$bus.$on('param_two_binding_select_librarys', (obj) => {
        this.paramManagerObj = obj.paramManagerObj
        this.scriptType = obj.scriptType
        // 下面的数据跳转到新增编辑界面时需要用到
        this.isCurrentUser = obj.isCurrentUser
        this.profileCatalogId = obj.backProfileCatalogId
        this.saveReturnTwoDimensionId = obj.saveReturnTwoDimensionId
        this.twoDimensionNamebd = obj.twoDimensionNameValue
        this.nowTreeNode = obj.backTreeNode
        this.nowTreeData = obj.backTreeData
      })
      // 新建算法、编辑算法传值到saveafter页面
      this.$bus.$on('emitDataToParamSaveAfter', (obj) => {
        this.sourcePage = 'paramFileditAdd' // 新建或者编辑
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
      this.$bus.$on('param_suanfa_back_param_edit', (obj) => {
        this.isLinkParam = obj.isLinkParam
        this.paramManagerObj = obj.paramManagerObj
        this.scriptType = obj.scriptType
        // 下面的数据跳转到新增编辑界面时需要用到
        this.isCurrentUser = obj.isCurrentUser
        this.profileCatalogId = obj.backProfileCatalogId
        this.saveReturnTwoDimensionId = obj.saveReturnTwoDimensionId
        this.twoDimensionNamebd = obj.twoDimensionNamebd
      })
      this.$bus.$on('paramTwoAddTabEdit', (obj) => {
        this.tabZhName = obj.zhName
      })
      // 添加tab 新开tab页签
      this.$bus.$on('paramTwoAddTab', (obj) => {
        // console.log(obj.enName, obj.zhName, obj.isClosable)
        // profile 用如果 enName === 'paramTwo_file_edit' 表示点击二级菜单 编辑按钮，从全局变量中取 中文名
        if (obj.enName === 'paramTwo_system_param') {
          this.functionDataDetail = obj.detail
        } else if (obj.enName === 'paramTwo_file_edit' || obj.enName === 'paramTwo_file_edit_look') {
          this.goback = obj.goback
          if (!obj.goback) { // 如果不是返回的，根据enName判断是否查看还是编辑权限
            if (obj.enName === 'paramTwo_file_edit_look') {
              this.isCurrentUser = false
            } else {
              this.isCurrentUser = true
            }
          } else {
            if (obj.goback === 'ParamTwoSavedAfter') {
              let paramTwoTabsValue = this.$util.getTabValue('param_two_save_complete', obj.parent, this.paramTwoTabs)
              this.removeParamTwoTab(paramTwoTabsValue)
              let paramTwoTabsValue1 = this.$util.getTabValue('paramTwo_algorithmsLibrary_new', obj.parent, this.paramTwoTabs)
              this.removeParamTwoTab(paramTwoTabsValue1)
              let paramTwoTabsValue2 = this.$util.getTabValue('paramTwo_algorithmsLibrary_new_edit', obj.parent, this.paramTwoTabs)
              this.removeParamTwoTab(paramTwoTabsValue2)
            }
          }
          // 关闭编辑算法的界面
          let zhname = this.paramManagerObj.NAME // 动态获取树状节点的name
          if (zhname !== null && zhname !== '' && zhname.length > 10) {
            zhname = zhname.substring(0, 10) + '...'
          }
          obj.zhName = zhname
          obj.enName = 'paramTwo_file_edit'
          let paramTwoTabsValue = this.$util.getTabValue(obj.enName, obj.parent, this.paramTwoTabs)
          this.removeParamTwoTab(paramTwoTabsValue)
          this.addParamTwoTab(obj) // 新开页签
        }
        if (this.menueValues.indexOf(obj.enName) <= -1) { // enName 在 menueValues 不显示tab 不在里面的显示
          this.$bus.$emit('openHeaderMenuItem', obj.parent, {}, {}) // 新开页签 先清空头部，后在创建新的
          this.addParamTwoTab(obj) // 新开tab
        } else {
          // 不添加tab 触发对应的事件
          if (obj.enName === 'paramTwo_paramLibray_add_catalog1') { // 分析参数库 添加目录
            this.addNodeFun(this.catalogData, this.catalogNode, 'catalog')
          } else if (obj.enName === 'paramTwo_file_rename') { // 重命名 添加目录
            this.$bus.$emit(obj.enName) // 传值过去，然后点击二级菜单，触发对应的事件要用到
          } else if (obj.enName === 'paramTwo_paramLibray_add_param_library') { // 添加分析参数库
            this.addNodeFun(this.catalogData, this.catalogNode, 'node')
          } else if (obj.enName === 'paramTwo_delete_profile') { // 删除目录
            this.$bus.$emit('paramTwoManagerValue', this.catalogData, this.catalogNode, 'catalog') // 传值过去，然后点击二级菜单，触发对应的事件要用到
          } else if (obj.enName === 'paramTwo_delete_node') { // 删除分析参数库
            this.$bus.$emit('paramTwoManagerValue', this.catalogData, this.catalogNode, 'node') // 传值过去，然后点击二级菜单，触发对应的事件要用到
          } else if (obj.enName === 'paramTwo_paramLibray_add_catalog2') { // 分析参数新增目录
            this.$bus.$emit('paramTwoTableFileEditValue', 'catalog') // 传值过去，然后点击二级菜单，触发对应的事件要用到
          } else if (obj.enName === 'paramTwo_algorithmsLibrary_new' || obj.enName === 'paramTwo_algorithmsLibrary_new_edit') { // 新建分析参数算法,编辑算分界面
            if (!this.multipleSelection || this.multipleSelection.length === 0) {
              this.$message.error('至少选择一个版本库!')
            } else {
              // 如果已经打开了编辑或者新增，下次编辑或新增前先删除tab
              if (this.$util.getTabValue('paramTwo_algorithmsLibrary_new', obj.parent, this.paramTwoTabs) > 0) {
                let paramTwoTabsValue = this.$util.getTabValue('paramTwo_algorithmsLibrary_new', obj.parent, this.paramTwoTabs)
                this.removeParamTwoTab(paramTwoTabsValue)
              }
              if (this.$util.getTabValue('paramTwo_algorithmsLibrary_new_edit', obj.parent, this.paramTwoTabs) > 0) {
                let paramTwoTabsValue = this.$util.getTabValue('paramTwo_algorithmsLibrary_new_edit', obj.parent, this.paramTwoTabs)
                this.removeParamTwoTab(paramTwoTabsValue)
              }
              if (obj.enName === 'paramTwo_algorithmsLibrary_new') { // 如果是新增，先判断是否选中，如果没选中则获取所有的版本库
                this.createNewSuanFa(obj)
              } else { // 编辑必须要选中
                this.checkAddOrEditSuanFa(obj)
              }
            }
          } else if (obj.enName === 'paramTwo_algorithmsLibrary_new_remove') { // 清空映射关系
            this.$bus.$emit('paramTwo_algorithmsLibrary_new_remove_emit')
          } else if (obj.enName === 'paramTwo_share' || obj.enName === 'paramTwo_share_cancle') { // 分享
            this.$bus.$emit('share_param_two')
          } else if (obj.enName === 'paramTwo_delete') { // 删除
            this.$bus.$emit(obj.enName)
          } else if (obj.enName === 'paramTwo_edit_compute') { // 开始计算
            this.$bus.$emit(obj.enName)
          } else if (obj.enName === 'paramTwo_clean') { // 清洗
            this.$bus.$emit(obj.enName)
          } else if (obj.name === 'paramEtlTwo_dimension') {
            this.$bus.$emit(obj.enName)
          } else if (obj.enName === 'paramTwo_calculation_results') { // 查看结果界面
          } else { // 新增的分析参数 时间点，筛选方式等等 或者删除等等
            this.$bus.$emit('paramTwoTableFileEditValue', obj.enName) // 传值过去，然后点击二级菜单，触发对应的事件要用到
          }
        }
      })
    },
    methods: {
      // 新建分析算法
      createNewSuanFa (obj) {
        obj.zhName = this.twoDimensionNamebd
        this.sourcePage = 'paramFileditAdd' // 分析参数界面
        this.showSelectLibraryParam = false // 表示新增
        this.algorithmsLibraryNewEditStatus = false // 表示新增
        let hasMapping = false //  是否包含映射的算法
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].mapping) {
            hasMapping = true // 只要数组中包含一个映射的，就得提示用户。
            break
          }
        }
        if (!this.sourcePage && !this.algorithmsLibraryNewEditStatus) {
          this.sourcePage = 'paramFileditAdd'
        }
        if (hasMapping) {
          this.$confirm('新算法会覆盖原有算法，确认是否新建?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { // 这种情况下要用户确认才能新开页签
            this.addParamTwoTab(obj) // 新开tab
            // 有可能是从编辑界面过来的，移出编辑界面
          })
        } else {
          this.addParamTwoTab(obj) // 没有已绑定的算法直接新开tab
          // 有可能是从编辑界面过来的，移出编辑界面
        }
      },
      checkAddOrEditSuanFa (obj) {
        obj.zhName = this.twoDimensionNamebd
        this.showSelectLibraryParam = false
        this.algorithmsLibraryNewEditStatus = false
        if (this.multipleSelection.length === 1) {
          if (this.multipleSelection[0].mapping) {
            // 表示单个编辑
            this.algorithmsLibraryNewEditStatus = true
          }
        } else {
          this.showSelectLibraryParam = true
          // 编辑多个
          this.algorithmsLibraryNewEditStatus = true
        }
        this.addParamTwoTab(obj) // 直接跳转到分析算法编辑界面
      },
      addParamTwoTab (obj) { // 添加tab标签
        // 系统函数不需要关闭打开，直接更新tab即可
        if (obj.enName === 'paramTwo_system_param' && this.$util.getTabValue(obj.enName, obj.parent, this.paramTwoTabs) > 0) { // 如果是系统函数
          this.paramTwoTabsValue = this.$util.getTabValue(obj.enName, obj.parent, this.paramTwoTabs) // 选中当前的tab
          this.updateTabData(obj.zhName, obj.enName, obj.parent, 'title')
          return false
        }
        // 其他存在的tab再次点击的时候，先关闭再打开
        if (this.$util.getTabValue(obj.enName, obj.parent, this.paramTwoTabs) > 0) {
          let paramTwoTabsValue = this.$util.getTabValue(obj.enName, obj.parent, this.paramTwoTabs)
          this.removeParamTwoTab(paramTwoTabsValue)
        }
        // if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.paramTwoTabs)) { // 先判断 当前tab页签是否存在，如果存在，则获取他的index，并且删除
        //     let paramTwoTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.paramTwoTabs)
        //     this.removeParamTwoTab(paramTwoTabsValue)
        // }
        let newTabName = ++this.tabIndex + ''
        this.paramTwoTabs.push({
          title: obj.zhName,
          name: newTabName,
          content: obj.enName,
          isClosable: obj.isClosable,
          enName: obj.enName,
          parent: obj.parent
        })
        this.paramTwoTabsValue = newTabName
        this.activeTabName = obj.enName
      },
      // bindingPage (obj) {
      //   obj.enName = 'paramTwo_paramLibray_param_binding' // 依然是绑定的页面
      //   this.multipleSelection = [] // 进入绑定页面清空选中的版本库
      //   if (obj.profileTwoDimensionIdbd !== null && obj.profileTwoDimensionIdbd !== undefined) { // 点击时传值
      //     this.saveReturnTwoDimensionIdbd = obj.profileTwoDimensionIdbd
      //     this.scriptTypebd = obj.scriptTypebd
      //     this.twoDimensionNamebd = obj.twoDimensionNamebd
      //     if (obj.profileTwoDimensionIdbd === null || obj.profileTwoDimensionIdbd === undefined) {
      //       this.$message.error('请先选中参数!')
      //     }
      //   } else {
      //     // 点击二级菜单时，通过 paramTwoTwoDimensionId 把值传过来，所以znName应该从 传过来的值里面获取
      //     obj.zhName = this.twoDimensionNamebd
      //   }
      //   if (obj.isLinkParam !== null && obj.isLinkParam !== undefined) {
      //     this.isLinkParam = obj.isLinkParam
      //   }
      //   // 进入绑定页面移出 其他页面
      //   this.removeParamTwoAlgorithmsLibraryNew(obj)
      //   paramManagerObj
      // },
      removeParamTwoTab (targetName) { // 关闭tab标签
        let tabs = this.paramTwoTabs
        let activeName = this.paramTwoTabsValue
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
        this.paramTwoTabsValue = activeName
        this.paramTwoTabs = tabs.filter(tab => tab.name !== targetName)
      },
      // // 显示或者隐藏绑定页面的按钮
      // showOrhideBindPageMenue (bool) {
      //   let hideMenuObj = {}
      //   hideMenuObj['paramTwo_algorithmsLibrary_new'] = bool // 隐藏新建算法
      //   hideMenuObj['paramTwo_algorithmsLibrary_new_edit'] = bool // 隐藏编辑算法
      //   hideMenuObj['paramTwo_algorithmsLibrary_new_remove'] = bool // 隐藏清空算法
      //   hideMenuObj['paramTwo_edit'] = bool // 隐藏新建算法
      //   hideMenuObj['paramTwo_edit_compute'] = bool // 显示开始计算
      //   hideMenuObj['paramTwo_delete'] = bool // 隐藏删除按钮
      //   hideMenuObj['paramTwo_share'] = bool // 隐藏删除按钮
      //   hideMenuObj['paramTwo_share_cancle'] = bool // 隐藏删除按钮
      //   this.$bus.$emit('openHeaderMenuItem', 'paramTwo_paramLibray', hideMenuObj, {}) // 修改二级菜单
      // },
      // 增加节点,且是处于编辑中
      addNodeFun (data, node, type) {
        // 如果为false则表示可以新增，true不可以新增
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
              data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, CHILDREN: [], status: 1, nodeType: type, isAdd: true})
            } else {
              data.CHILDREN.push({ID: this.$util.generateUUID(), NAME: null, status: 1, nodeType: type, isAdd: true})
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
      updateTabData (zhName, enName, parent, type) {
        let tabArr = this.paramTwoTabs
        if (tabArr.length > 0) {
          tabArr.forEach(item => {
            if (item.title === zhName && item.content === enName && type === 'parent') { // 针对分析结果修改
              item.parent = parent
            }
            if (item.enName === enName && item.parent === parent && type === 'title') { // 针对编辑分析参数后重新保存
              item.title = zhName
            }
          })
          this.paramTwoTabs = tabArr
        }
      },
      clickParamTwoTab (vc) { // 点击tab标签获取实例
        this.activeTabName = vc.$attrs.id
        this.getMenueByenName(this.activeTabName)
      },
      getMenueByenName (enName) {
        var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
          // 'analysis_file_open': false
        }
        var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
          // 'analysis_file_copy': false
        }
        let parentName = ''
        if (enName === 'paramTwoManager_profile') {
          hideMenuObj = this.$refs.paramtwomanagerref[0].hideMenuObj
          disabledMenuObj = this.$refs.paramtwomanagerref[0].disabledMenuObj
          parentName = 'paramTwo_paramLibray'
        } else if (enName === 'paramTwo_file_edit') {
          hideMenuObj = this.$refs.paramTwoFileEditref[0].hideMenuObj
          disabledMenuObj = this.$refs.paramTwoFileEditref[0].disabledMenuObj
          parentName = 'paramTwo_paramLibray'
        } else if (enName === 'paramTwo_paramLibray_param_binding') {
          hideMenuObj = this.$refs.paramtwobindingref[0].hideMenuObj
          disabledMenuObj = this.$refs.paramtwobindingref[0].disabledMenuObj
          parentName = 'paramTwo_paramLibray'
        } else if (enName === 'paramTwo_algorithmsLibrary_new' || enName === 'paramTwo_algorithmsLibrary_new_edit') {
          hideMenuObj = {}
          disabledMenuObj = {}
          parentName = 'paramTwo_paramLibray'
        } else if (enName === 'paramTwo_algorithmsLibrary_personal') { // 分析算法
          hideMenuObj.paramTwo_algorithmsLibrary_personal = true
          disabledMenuObj = {}
          parentName = 'paramTwo_algorithmsLibrary'
        } else if (enName === 'paramTwo_system_param') { // 系统函数
          hideMenuObj.paramTwo_system_param = true
          disabledMenuObj = {}
          parentName = 'paramTwo_systemFunction'
        } else if (enName === 'paramTwo_calculation_results') { // 计算结果
          hideMenuObj = {}
          disabledMenuObj = {}
          parentName = 'paramTwo_paramLibray'
        } else if (enName === 'param_two_save_complete') { // 计算结果
          hideMenuObj = {}
          disabledMenuObj = {}
          parentName = 'paramTwo_paramLibray'
        }
        this.$bus.$emit('openHeaderMenuItem', parentName, hideMenuObj, disabledMenuObj) // 修改头部显示效果
        // 点击tab 显示对应的菜单
        // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      }
    }
  }
</script>
