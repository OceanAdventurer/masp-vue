<template>
  <div class="header-tab" v-if="dataMiniTabs.length > 0">
    <el-tabs
      v-model="dataMiniTabsValue"
      type="card"
      @tab-remove="removeDataMiniTab"
      @tab-click="clickDataMiniTab"
    >
      <el-tab-pane
        v-for="item in dataMiniTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'dataMiniMange'">
          <DManage ref="dManage"></DManage>
        </div>
        <div v-else-if="item.content === 'dataMining_file_new'"> <!--新建、编辑挖掘配置界面-->
          <NewDataMining ref="newDataMiningRef" :profileId1="profileId" :dataMining1="dataMining" :editDataMining1 = 'editDataMining'></NewDataMining>
        </div>
        <div v-else-if="item.content === 'analysis_results'"> <!--分析结果-->
          <AnalysisResults ref="analysisResultsRef" :data="dataConfigTableData" :filterData="filterConfigTableData" :flightFilter="flightFilter"></AnalysisResults>
        </div>
        <div v-else-if="item.content === 'dataMining_modeling_linear_result'"> <!--建模 线性回归-->
          <DataMiningModeLinearResult ref="dataMiningModelLineaResultRef" :data="resultData"></DataMiningModeLinearResult>
        </div>
        <div v-else-if="item.content === 'dataMining_modeling_svm_result'"> <!--建模 支持向量-->
          <DataMiningModeSupportVectorResult ref="dataMiningModesvmResultRef" :data="resultData"></DataMiningModeSupportVectorResult>
        </div>
        <div v-else-if="item.content === 'dataMinging_mode_fpgrowth_result'"> <!--建模 fpgrowth-->
          <DataMingingModefpgrowthResult ref="dataMingingModefpgrowthResultRef" :data="resultData"></DataMingingModefpgrowthResult>
        </div>
        <div v-else-if="item.content === 'dataMining_modeling_kmeans_result'"> <!--建模 kmeans-->
          <DataMiningModeKmeansResult ref="dataMiningModelkmeansResultRef" :data="resultData"></DataMiningModeKmeansResult>
        </div>
        <div v-else>
          <!-- 待开发.... -->
          {{ item.title }} <br>
          {{ item.content }}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 按需异步加载组件，打包时减少体积
const DManage = () => import('components/datamining/DataMiniManage')
const AnalysisResults = () => import('components/datamining/AnalysisResults')
const NewDataMining = () => import('components/datamining/NewDataMining')
const DataMiningModeLinearResult = () => import('components/datamining/modeingResult/DataMiningModeLinearResult')
const DataMiningModeKmeansResult = () => import('components/datamining/modeingResult/DataMiningModeKmeansResult')
const DataMiningModeSupportVectorResult = () => import('components/datamining/modeingResult/DataMiningModeSupportVectorResult')
const DataMingingModefpgrowthResult = () => import('components/datamining/modeingResult/DataMingingModefpgrowthResult')

export default {
  name: 'DataMiniTab',
  data () {
    return {
      lastMenuEnName: '',
      resultData: {},
      editDataMining: {},
      dataMining: {},
      dataConfigTableData: [],
      filterConfigTableData: [],
      flightFilter: [],
      profileId: '',
      dataMiniTabsValue: '1', // 标签的默认值
      dataMiniTabsName: '', // 标签的默认name
      dataMiniTabs: [], // 存储标签数组
      tabIndex: 1, // 标签索引
      activeTabName: '',
      menuList: 'dataMining_catalog_new,dataMining_children_new,dataMining_catalog_del,dataMining_file_rename,dataMining_file_delete',
      tt: ''
    }
  },
  components: {
    DManage,
    NewDataMining,
    AnalysisResults,
    DataMiningModeLinearResult,
    DataMiningModeKmeansResult,
    DataMiningModeSupportVectorResult,
    DataMingingModefpgrowthResult
  },
  created () {
    if (!this.$route.query.type) {
      this.addTable({enName: 'dataMiniMange', zhName: '数据挖掘管理', isClosable: false, parent: 'dataMining_mining'})
    }
    this.$bus.$on('dataMiningMenu', () => {
      this.getMenueByenName(this.activeTabName, 'dataMining_mining')
    })
    this.$bus.$on('dataMiningAddTab', (obj) => { // 接收添加标签的事件
      console.log(obj.enName, obj.zhName, obj.isClosable)
      this.addDataMiniTab(obj)
    })
  },
  mounted () {
    this.$bus.$on('emitDataMiningToTab', (v) => {
      this.profileId = v
    })
    this.$bus.$on('changeTabData', (obj) => {
     this.updateTabData(obj.zhName, obj.enName, obj.parent)
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('dataMiningAddTab')
    this.$bus.$off('dataMiningMenu')
  },
  watch: {

  },
  methods: {
    addDataMiniTab (obj) { // 添加tab标签
      console.log(obj.enName, obj.zhName, obj.isClosable, obj.parent, obj.count)
      if (this.menuList.indexOf(obj.enName) > -1) { // 不新增页签的
        this.$bus.$emit(obj.enName) // 增删改查
      } else if (obj.enName === 'dataMining_file_new') {
        this.dataMining = {}
        this.editDataMining = {}
        if (obj.dataMining) {
          this.dataMining = obj.dataMining
        }
        if (obj.editData) {
          this.editDataMining = obj.editData
        }
        // console.log('xvcxcvxcvvxcvcxxc', this.editDataMining)
        this.addTable(obj)
      } else if (obj.enName === 'dataMining_modeling_linear_result' || obj.enName === 'dataMining_modeling_kmeans_result' || obj.enName === 'dataMining_modeling_svm_result' || obj.enName === 'dataMinging_mode_fpgrowth_result') { // 建模结果页面----线性回归，支持向量
        this.resultData = {}
        if (obj.resultData) {
          this.resultData = obj.resultData
        }
        let tbs = this.$util.getTabValue('dataMining_modeling_linear_result', obj.parent, this.dataMiniTabs)
        this.removeDataMiniTab(tbs)
        let tbs1 = this.$util.getTabValue('dataMining_modeling_kmeans_result', obj.parent, this.dataMiniTabs)
        this.removeDataMiniTab(tbs1)
        let tbs2 = this.$util.getTabValue('dataMining_modeling_svm_result', obj.parent, this.dataMiniTabs)
        this.removeDataMiniTab(tbs2)
        let tbs3 = this.$util.getTabValue('dataMinging_mode_fpgrowth_result', obj.parent, this.dataMiniTabs)
        this.removeDataMiniTab(tbs3)
        this.addTable(obj)
      } else if (obj.enName === 'analysis_results') { // 分析结果页面
        this.dataConfigTableData = []
        this.filterConfigTableData = []
        if (obj.dataConfigTableData) {
          this.dataConfigTableData = obj.dataConfigTableData
        }
        if (obj.filterConfigTableData) {
          this.filterConfigTableData = obj.filterConfigTableData
        }
        if (obj.flightFilter) {
          this.flightFilter = obj.flightFilter
        }
        this.addTable(obj)
      } else { // 需要新增页签的
        this.addTable(obj)
      }
    },
    addTable (obj) {
      this.setdefaultMenu()
      // if (this.$util.getTabValue(obj.enName, obj.parent, this.dataMiniTabs)) {
      //   this.dataMiniTabsValue = this.dataMiniTabs.filter(s => s.title === obj.zhName)[0].name
      //   return false // 已经存在tab标签，再次点击时不再添加
      // }
      if (this.$util.getTabValue(obj.enName, obj.parent, this.dataMiniTabs) > 0) {
        let tbs = this.$util.getTabValue(obj.enName, obj.parent, this.dataMiniTabs)
        this.removeDataMiniTab(tbs)
      }

      // 执行添加标签
      let newTabName = ++this.tabIndex + ''
      this.dataMiniTabs.push({
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      })
      this.dataMiniTabsValue = newTabName
      this.activeTabName = obj.enName
    },
    updateTabData (zhName, enName, parent) {
      let tabArr = this.dataMiniTabs
      if (tabArr.length > 0) {
        tabArr.forEach(item => {
          if (item.enName === enName && item.parent === parent) { // 如果ename相等，parent相等，则修改标题
            item.title = zhName
          }
        })
        this.dataMiniTabs = tabArr
      }
    },
    setdefaultMenu () {
      let hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
      }
      let disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
      }
      hideMenuObj['dataMining_file_new'] = false
      hideMenuObj['dataMining_file_rename'] = false
      hideMenuObj['dataMining_file_delete'] = false
      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', 'dataMining_mining', hideMenuObj, disabledMenuObj) // 修改头部显示效果
    },
    removeDataMiniTab (targetName) { // 关闭tab标签
      let tabs = this.dataMiniTabs
      let activeName = this.dataMiniTabsValue
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
      this.dataMiniTabsValue = activeName
      this.dataMiniTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickDataMiniTab (vc) { // 点击tab标签获取实例
      let attrObj = vc.$attrs
      if (this.activeTabName === attrObj.id) {
        return
      }
      this.activeTabName = attrObj.id
      this.getMenueByenName(attrObj.id, attrObj.parent)
    },
    getMenueByenName (enName, parent) {
      let hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
      }
      let disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
      }
      if (enName === 'dataMiniMange') {
        hideMenuObj = this.$refs.dManage[0].hideMenuObj
        disabledMenuObj = this.$refs.dManage[0].disabledMenuObj
        parent = 'dataMining_mining'
      } else if (enName === 'dataMining_file_new' || enName === 'dataMining_modeling_linear_result' || enName === 'dataMining_modeling_kmeans_result' || enName === 'dataMining_modeling_svm_result' || enName === 'dataMinging_mode_fpgrowth_result') {
        hideMenuObj['dataMining_catalog_new'] = false
        hideMenuObj['dataMining_children_new'] = false
        hideMenuObj['dataMining_catalog_del'] = false
        hideMenuObj['dataMining_file_new'] = false
        hideMenuObj['dataMining_file_rename'] = false
        hideMenuObj['dataMining_file_delete'] = false
        parent = 'dataMining_mining'
      }
      console.log('clickDataMiniTab@@@@@@:', enName, parent, hideMenuObj, disabledMenuObj)
      // 发送修改二级菜单的事件，参数解释： 事件名称， 一级菜单名称，隐藏二级菜单数据, 禁用二级菜单数据
      this.$bus.$emit('openHeaderMenuItem', parent, hideMenuObj, disabledMenuObj) // 修改头部显示效果
    },
    addNodeFun (data, node, type) { // 增加节点,且是处于编辑中
      console.log('addNodeFun:', data, node, type)
      this.isAddTreeNode = false // 先清空是否允许添加节点的标识
      let tempFlag = this.traverseTreeNode(this.managerTreeData)
      if (tempFlag) {
        this.$message({
          message: '有节点处于编辑中，请编辑完再添加!',
          type: 'warning'
        })
        return
      }

      // status(1：编辑状态)(0：显示状态)(-1不可编辑状态)
      if (!node.expanded) {
        node.expanded = true // 展开节点显示添加的节点信息
      }

      if (!data.CHILDREN) { // 如果当前节点没有存在children属性，则新增此属性，值默认为空数组
        this.$set(data, 'CHILDREN', []) // 设置数据需要用到$set，才能修改到原始数据
      }

      if (type === 'catalog') { // 目录
        setTimeout(() => {
          data.CHILDREN.push({ ID: this.$util.generateUUID(), NAME: '', CHILDREN: [], nodeType: type, TYPE: '0', status: 1, isAdd: true }) // 向原始数据中添加新增加的节点数据
        }, 300)
      } else { // 节点
        setTimeout(() => {
          data.CHILDREN.push({ ID: this.$util.generateUUID(), NAME: '', nodeType: type, TYPE: '1', status: 1, isAdd: true }) // 向原始数据中添加新增加的节点数据
        }, 300)
      }
    },
    editNodeFun (data, node) { // 编辑节点
      console.log('editNodeFun', data, node)
      if (!this.$store.getters.userInfo.isAdmin && data.ISCOMMON === '1') { // 非管理员不能编辑公共节点
        this.$message({
          type: 'warning',
          message: '没有权限，暂无法操作！'
        })
        return false
      }
      this.currentEditNodeName = data.NAME // 取消编辑时用
      this.$set(data, 'status', 1)
      this.$set(data, 'isAdd', false)
    },
    deleteNodeFun (data, node) { // 删除节点,此时的store,data,node都是当前节点信息，而不是整个树的信息
      if (!this.$store.getters.userInfo.isAdmin && data.ISCOMMON === '1') { // 非管理员不能删除公共节点
        this.$message({
          type: 'warning',
          message: '没有权限，暂无法操作！'
        })
        return false
      }
      this.deleteTreeData(data)
    }
  }
}
</script>
