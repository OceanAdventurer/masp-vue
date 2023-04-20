<template>
  <div class="header-tab" v-if="analysisTabs.length > 0">
    <el-tabs
      v-model="analysisTabsValue"
      type="card"
      @tab-remove="removeAnalysisTab"
      @tab-click="clickAnalysisTab"
    >
      <el-tab-pane
        v-for="item in analysisTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <span slot="label">
          <el-tooltip v-if="item.title.indexOf('结果') > 0" class="item" effect="dark" :content="item.title" placement="bottom-end">
            <span>{{item.title}}</span>
          </el-tooltip>
          <span v-else>{{item.title}}</span>
        </span>
        <div v-if="item.content === 'analysisManager'">
          <Manager ref="manager"></Manager>
        </div>
        <div v-else-if="item.content === 'analysis_file_new' || item.content === 'analysis_event_file_new' || item.content === 'analysis_dhbcsdb'">
          <NewFile ref="childnewfile" :contentType="item.content" :analysisType="item.type" :stateType="stateType"></NewFile>
        </div>
        <!-- <div v-else-if="item.content === 'event_store_result'">
          <EventStoreResult ref="eventStoreResult"></EventStoreResult>
        </div> -->
        <div v-else-if="item.content === 'analysis_result'">
          <AnalysisResult ref="analysisResult" :analysisChartType="analysisChartType" :analysisChartTypeName="analysisChartTypeName" :chartActiveName="activeType" @activeTypeChanged="changeActiveType($event)"></AnalysisResult>
        </div>
        <div v-else-if="item.content === 'analysis_view_template'">
          <EngineParamTemplet ref="engineParamTemplet"></EngineParamTemplet>
        </div>
        <div v-else-if="item.content === 'flight_param_compare'">
          <FlightParamCompare ref="flightParamCompare" :flightObj="flightObj"></FlightParamCompare>
        </div>
        <div v-else-if="item.content === 'fpc_result'">
          <FpcResult ref="fpcResult" :fpcFlightObj="fpcFlightObj"></FpcResult>
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
const NewFile = () => import('components/analysis/file/NewFile')
const Manager = () => import('components/analysis/Manager')
const AnalysisResult = () => import('components/analysis/result/AnalysisResult')
const EngineParamTemplet = () => import('components/analysis/result/EngineParamTemplet')
const FlightParamCompare = () => import('components/analysis/result/FlightParamCompare')
const FpcResult = () => import('components/analysis/result/flightParam/FpcResult')
const EventStoreResult = () => import('components/analysis/result/EventStoreResult')

export default {
  name: 'AnalysisTab',
  data () {
    return {
      analysisTabsValue: '1', // 标签的默认值
      analysisTabsName: '', // 标签的默认name
      analysisTabs: [], // 存储标签数组
      tabIndex: 1, // 标签索引
      analysisChartType: 'bar', // 默认图表类型
      analysisChartTypeName: '柱状图',
      activeTabName: '',
      stateType: '', // 页面状态，是否可编辑
      activeType: 'flightRecordView', // 分析结果默认激活的tab标签类型
      subActiveType: '',
      analysisHeaderToActiveName: { // 分析中点击图表、表格、视图对应分析结果中tab
        'analysis_chart': '2dChart',
        'analysis_grid': 'dataGrid',
        'analysis_view': 'flightRecordView',
        'analysis_table': 'tableDetail'
      },
      activeNameToParent: { // tab标签对应自己的父组件名字
        'flightRecordView': 'analysis_view',
        '2dChart': 'analysis_chart',
        'dataGrid': 'analysis_grid',
        'tableDetail': 'analysis_table'
      },

      flightObj: {},
      fpcFlightObj: {}
    }
  },
  components: {
    Manager,
    NewFile,
    AnalysisResult,
    EngineParamTemplet,
    FlightParamCompare,
    FpcResult,
    EventStoreResult
  },
  created () {
    this.addAnalysisTab({enName: 'analysisManager', zhName: '分析管理', isClosable: false, parent: 'analysis_file', count: 0}) // 默认显示分析管理tab标签
    const that = this

    this.$bus.$off('analysisAddCatalog')
    this.$bus.$off('analysisAddTab')
    this.$bus.$on('analysisAddCatalog', (data, node) => {
      console.log('analysisAddCatalog++++: ', data, node)
      this.catalogData = data
      this.catalogNode = node
      this.parentId = data.ID // 点击编辑按钮跳转到分析参数页面需要的值
    })

    this.$bus.$on('analysisAddTab', (obj, type = '') => { // 接收添加标签的事件
      console.log('analysisAddTab--------: ', obj.enName, obj.zhName, obj.isClosable, obj.type)
      this.stateType = type
      if (obj.enName === 'tree_catalog_add') { // 添加目录
        // that.addNodeFun(this.catalogData, this.catalogNode, 'catalog')
        that.$refs.manager[0].addNodeFun(this.catalogData, this.catalogNode, 'catalog')
      } else if (obj.enName === 'tree_node_add') {
        // that.addNodeFun(this.catalogData, this.catalogNode, 'node')
        that.$refs.manager[0].addNodeFun(this.catalogData, this.catalogNode, 'node')
      } else if (obj.enName === 'tree_node_edit') { // 编辑
        // that.editNodeFun(this.catalogData, this.catalogNode)
        that.$refs.manager[0].editNodeFun(this.catalogData, this.catalogNode)
      } else if (obj.enName === 'tree_node_paste') { // 粘贴
        that.$refs.manager[0].pasteNodeFun(this.catalogData, this.catalogNode)
      } else if (obj.enName === 'tree_node_delete') { // 删除
        // that.deleteNodeFun(this.catalogData, this.catalogNode)
        that.$refs.manager[0].deleteNodeFun(this.catalogData, this.catalogNode)
      } else if (obj.enName === 'analysis_view_template_remove') {
        // this.$bus.$emit('removeEptTempletHandle')
        that.$refs.engineParamTemplet[0].deleteNodeFun(this.catalogData, this.catalogNode)
      } else if (obj.enName === 'analysis_event_file_new') {
        if (that.$util.isNotEmptyObject(that.$store.state.analysisParams) && obj.zhName !== '新建事件分析') {
          that.addAnalysisTab(obj)
        } else {
          that.$refs.manager[0].openEventDialog(this.catalogData, this.catalogNode)
        }
      } else {
        that.addAnalysisTab(obj)
      }
    })

    // this.$bus.$on('analysisAddTab', (obj) => { // 接收添加标签的事件
    //   that.addAnalysisTab(obj)
    // })

    this.$bus.$on('flightsHandle', (obj) => { // 接收添加标签的事件
      this.flightObj = obj
    })

    this.$bus.$on('fpcFlightObjHandle', (obj) => { // 接收添加标签的事件
      this.fpcFlightObj = obj
    })

    this.$bus.$on('closeAnalysisTabFun', () => { // 接收关闭分析结果标签的事件
      that.closeAnalysisTab()
    })

    this.$bus.$on('closeDhbcsdbTabFun', () => { // 接收关闭分析结果标签的事件
      that.closeDhbcsdbTab()
    })

    this.$bus.$on('closeEventTabFun', () => { // 接收关闭分析结果标签的事件
      that.closeEventTab()
    })

    this.$bus.$on('setDefaultChartType', (type) => { // 接收设置默认显示图标类型事件
      that.analysisChartType = type || 'bar'
    })

    this.$bus.$on('updateAnalysisTabDataFun', (zhName, enName, parent, type) => { // 接收设置默认显示图标类型事件
      that.updateAnalysisTabData(zhName, enName, parent, type)
    })
  },
  mounted () {
    this.$bus.$on('analysisMenu', () => {
      this.getAnalysisMenu(this.analysisTabsName)
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('analysisAddCatalog')
    this.$bus.$off('analysisAddTab') // 移除自定义事件监听器。
    this.$bus.$off('closeAnalysisTabFun') // 移除自定义事件监听器。
    this.$bus.$off('closeEventTabFun') // 移除自定义事件监听器。
    this.$bus.$off('setDefaultChartType') // 移除自定义事件监听器。
    this.$bus.$off('updateAnalysisTabDataFun')
    this.$bus.$off('flightsHandle')
    this.$bus.$off('fpcFlightObjHandle')
    this.$bus.$off('analysisMenu')
    this.stateType = ''
  },
  watch: {
    analysisTabsValue (newVal, oldVal) {
      if (this.$util.isDefine(newVal)) {
        this.analysisTabs.map((item) => {
          if (item.name === newVal) {
            this.analysisTabsName = item.enName
            this.$bus.$emit('updateAnalysisActiveTabNameHandle', item.enName)
          }
        })
      }
    }
  },
  methods: {
    changeActiveType (subActiveType) {
      console.log('@@@@@~: ' + subActiveType)
      this.subActiveType = subActiveType
      if (subActiveType === '2dChart') {
        setTimeout(() => {
          this.$bus.$emit('drawChartHandle')
        }, 200)
      }
    },
    addAnalysisTab (obj) { // 添加tab标签
      console.log(obj.enName, obj.zhName, obj.isClosable, obj.parent, obj.count, obj.type)
      // 头部导航是图表、表格、视图，则点击二级导航时不增加tab标签，这三个导航集中要显示的页面集中在分析结果页面
      this.activeType = this.analysisHeaderToActiveName[obj.parent]

      if (this.$util.isDefine(this.$store.state.submitNewFileTabActive)) {
        this.activeType = this.analysisHeaderToActiveName[this.$store.state.submitNewFileTabActive]
      }

      let tempEnNameArr = obj.enName.split('_')
      let tempType = ''
      if (obj.parent === 'analysis_chart' && obj.enName !== 'analysis_result') {
        this.activeType = '2dChart'
        if (obj.enName === 'analysis_chart_subline') {
          // 添加辅助线
          if (this.analysisChartType === 'bar' || this.analysisChartType === 'line') {
            tempType = tempEnNameArr[2] || ''
            this.$bus.$emit('sublineDialogHandler', tempType) // 显示分析结果页面中图表tab中的添加辅助线dialog
          } else {
            this.$message({
              message: '只有柱状图和折线图支持添加辅助线！',
              type: 'warning'
            })
          }
        } else if (obj.enName === 'analysis_chart_drillDown') {
          // 钻取
          tempType = tempEnNameArr[2] || ''
          this.$bus.$emit('resumitAnalysisByDrilldownHandle', tempType) // 显示分析结果页面中图表tab中的添加辅助线dialog
        } else if (obj.enName === 'analysis_chart_export') {
          // 导出
          tempType = tempEnNameArr[2] || ''
          this.$bus.$emit('downloadImgByChartHandle', tempType) // 显示分析结果页面中图表tab中的添加辅助线dialog
        } else {
          // 其他图表类型
          tempType = tempEnNameArr[2] || 'bar'
          this.analysisChartType = this.$util.CHART_TYPE_OBJ[tempType]
          this.analysisChartTypeName = obj.zhName
        }
      } else if (obj.parent === 'analysis_grid' && obj.enName !== 'analysis_result') {
        this.$bus.$emit('exportGridTableDataHandle')
      } else if (obj.parent === 'analysis_table' && obj.enName !== 'analysis_result') {
        if (obj.enName === 'flight_param_compare') {
          // 多航班工程参数对比
          console.log('**** == flight_param_compare == ****')

          if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs)) {
            this.analysisTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs) // 激活已经存在的tab
            return false
          }

          // 其他存在的tab再次点击的时候，先关闭再打开
          if (this.$util.getTabValue(obj.enName, obj.parent, this.analysisTabs)) {
            let tempAnalysisValue = this.$util.getTabValue(obj.enName, obj.parent, this.analysisTabs)
            this.removeAnalysisTab(tempAnalysisValue)
          }

          // 执行添加标签
          let newTabName1 = ++this.tabIndex + ''
          this.analysisTabs.push({
            title: obj.zhName,
            name: newTabName1,
            content: obj.enName,
            isClosable: obj.isClosable,
            enName: obj.enName,
            parent: obj.parent
          })
          this.analysisTabsValue = newTabName1

          this.$bus.$emit('openHeaderMenuItem', 'flight_param_compare', {}, {})
        } else if (obj.enName === 'analysis_table_allParamExport') {
          // 全参导出
          console.log('**** == analysis_table_allParamExport == ****')
          this.$bus.$emit('exportAllParamHandle')
        } else {
          this.$bus.$emit('openExportDialogHandle')
        }
      } else if (obj.parent === 'analysis_view' && obj.enName !== 'analysis_result') {
        if (obj.enName === 'analysis_view_export') {
          this.$bus.$emit('allParamsExport')
        } else if (obj.enName === 'analysis_view_template') {
          console.log('公共模板！')

          if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs)) {
            this.analysisTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs) // 激活已经存在的tab
            return false
          }
          // 执行添加标签
          let newTabName2 = ++this.tabIndex + ''
          this.analysisTabs.push({
            title: obj.zhName,
            name: newTabName2,
            content: obj.enName,
            isClosable: obj.isClosable,
            enName: obj.enName,
            parent: obj.parent
          })
          this.analysisTabsValue = newTabName2

          this.$bus.$emit('openHeaderMenuItem', 'analysis_view_template', {}, {})
        } else if (obj.enName === 'analysis_view_clean') {
          this.$confirm('此操作将进行数据清洗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
          this.$axios.post({
            url: '',
            data: {}
          }).then(res => {
            this.$store.commit('HIDE_LOADING', '加载完毕')
            console.log(res)
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }).catch(err => {
            this.$store.commit('HIDE_LOADING', '加载完毕')
            console.log(err)
          })
        }).catch(() => {
          console.log('cancel')
        })
        } else {
          if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.flightInfoData) &&
            this.$util.isDefine(this.$store.state.analysisResultAllData.flightInfoData.flightid)) { // 有航班id时才可以打开fdv
            this.activeType = 'flightRecordView'
            this.$bus.$emit('showAnalysisViewDialog') // 显示分析结果页面中飞行记录视图FDV显示
          } else {
            this.$message({
              message: '没有航班号，暂时无法查询数据！!',
              type: 'warning'
            })
          }
        }
      } else if (obj.parent === 'fpc_result_flinfo' && obj.enName !== 'fpc_result') {
        if (obj.enName === 'fpc_result_flinfo_dhbgcsdb') {
          // 多航班工程参数对比
          console.log('**** == fpc_result_flinfo_dhbgcsdb == ****')
          obj = {
            enName: 'flight_param_compare',
            zhName: '多航班工程参数对比',
            isClosable: true,
            parent: 'analysis_table',
            count: 0
          }

          if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs)) {
            this.analysisTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs) // 激活已经存在的tab
            return false
          }

          // 其他存在的tab再次点击的时候，先关闭再打开
          if (this.$util.getTabValue(obj.enName, obj.parent, this.analysisTabs)) {
            let tempAnalysisValue = this.$util.getTabValue(obj.enName, obj.parent, this.analysisTabs)
            this.removeAnalysisTab(tempAnalysisValue)
          }

          // 执行添加标签
          let newTabName3 = ++this.tabIndex + ''
          this.analysisTabs.push({
            title: obj.zhName,
            name: newTabName3,
            content: obj.enName,
            isClosable: obj.isClosable,
            enName: obj.enName,
            parent: obj.parent
          })
          this.analysisTabsValue = newTabName3

          this.$bus.$emit('openHeaderMenuItem', 'flight_param_compare', {}, {})
        } else if (obj.enName === 'fpc_result_flinfo_allParamExport') {
          // 全参导出
          console.log('**** == fpc_result_flinfo_allParamExport == ****')
          this.$bus.$emit('exportFpcAllParamHandle')
        } else {
          this.$bus.$emit('openDhbExportDialogHandle')
        }
      } else if (obj.parent === 'fpc_result_grid' && obj.enName !== 'fpc_result') {
        if (obj.enName === 'fpc_result_grid_export') {
          this.$bus.$emit('exportFpcGridHandle')
        }
      } else if (obj.parent === 'analysis_view_template') {
        if (obj.enName === 'analysis_view_template_edit') {
          console.log('**** == analysis_view_template_edit == ****')
          this.$bus.$emit('openEptDialogHandle', 'edit')
        } else if (obj.enName === 'analysis_view_template_rename') {
          console.log('**** == analysis_view_template_rename == ****')
        } else if (obj.enName === 'analysis_view_template_remove') {
          console.log('**** == analysis_view_template_remove == ****')
          this.$bus.$emit('removeEptTempletHandle')
        } else if (obj.enName === 'analysis_view_template_create') {
          console.log('**** == analysis_view_template_create == ****')
          this.$bus.$emit('openEptDialogHandle', 'create')
        } else if (obj.enName === 'analysis_view_template_common') {
          console.log('**** == analysis_view_template_common == ****')
          this.$bus.$emit('setUpTempletStatusHandle', true, this.catalogData, this.catalogNode)
        } else if (obj.enName === 'analysis_view_template_uncommon') {
          console.log('**** == analysis_view_template_uncommon == ****')
          this.$bus.$emit('setUpTempletStatusHandle', false, this.catalogData, this.catalogNode)
        }
      } else if (obj.parent === 'analysis_dataSource') { // 如果是数据源的子菜单不增加tab，则会改变新建分析页面树节点展开和折叠状态
        if (this.$util.getTabNameValue('新建分析', 'analysis_file_new', this.analysisTabs)) { // 新建分析tab存在，才可以点击数据源的子菜单
          this.$bus.$emit('changeFileNewExpandedStatus', obj.enName, obj.zhName)
        } else {
          this.$message({
            message: '请打开新建分析后点击此按钮操作!',
            type: 'warning'
          })
        }
      } else if (obj.parent === 'analysis_file' && (obj.enName === 'analysis_file_new' || obj.enName === 'analysis_dhbcsdb') && this.$store.state.managerTreeNodeId === '') {
        this.$message({
          message: '请先选择分析管理界面中的树节点后才可以点击此按钮操作!',
          type: 'warning'
        })
      } else {
        console.log('编辑分析')
        // 已经存在分析结果tab标签，再次点击时不再添加；点击分析结果的tab时，此时分析结果的parent会改变
        if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs) && obj.enName === 'analysis_result') {
          this.analysisTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.analysisTabs) // 激活已经存在的tab
          this.updateAnalysisTabData(obj.zhName, obj.enName, obj.parent, 'parent') // 更新数据，针对分析结果
          return false
        }

        // 其他存在的tab再次点击的时候，先关闭再打开
        if (this.$util.getTabValue(obj.enName, obj.parent, this.analysisTabs)) {
          let tempAnalysisValue = this.$util.getTabValue(obj.enName, obj.parent, this.analysisTabs)
          this.removeAnalysisTab(tempAnalysisValue)
        }
        // if (obj.parent === 'analysis_result' || obj.enName === 'fpc_result') {
        //   this.closeAnalysisTab()

        //   let tempAnalysisValue = this.$util.getTabValue('fpc_result', 'fpc_result_chart', this.analysisTabs)
        //   this.removeAnalysisTab(tempAnalysisValue)
        // }

        if (obj.enName === 'analysis_file_new' || obj.enName === 'analysis_dhbcsdb' || obj.enName === 'analysis_event_file_new') {
          let tempAnalysisValue = this.$util.getTabValue('analysis_file_new', obj.parent, this.analysisTabs)
          this.removeAnalysisTab(tempAnalysisValue)
          tempAnalysisValue = this.$util.getTabValue('analysis_dhbcsdb', obj.parent, this.analysisTabs)
          this.removeAnalysisTab(tempAnalysisValue)
          tempAnalysisValue = this.$util.getTabValue('analysis_event_file_new', obj.parent, this.analysisTabs)
          this.removeAnalysisTab(tempAnalysisValue)
        }
        // 执行添加标签
        let newTabName = ++this.tabIndex + ''
        this.analysisTabs.push({
          title: obj.zhName,
          name: newTabName,
          content: obj.enName,
          isClosable: obj.isClosable,
          enName: obj.enName,
          parent: obj.parent,
          type: obj.type
        })
        console.log(this.analysisTabs)
        this.analysisTabsValue = newTabName
      }
    },
    removeAnalysisTab (targetName) { // 关闭tab标签
      let tabs = this.analysisTabs
      let activeName = this.analysisTabsValue
      let parentName = this.analysisTabsName
      let enName = this.activeTabName
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              parentName = nextTab.parent
              enName = nextTab.enName
            }
          }
        })
        if (enName === 'analysis_file_new' || enName === 'analysis_dhbcsdb') {
          this.$bus.$emit('openHeaderMenuItem', 'analysis_dataSource', null, null) // 修改头部显示效果
        } else {
          if (enName === 'flight_param_compare') {
            this.$bus.$emit('openHeaderMenuItem', 'flight_param_compare', {}, {})
          } else {
            this.$bus.$emit('openHeaderMenuItem', parentName, null, null) // 修改头部显示效果
          }
        }
      }
      console.log('removeAnalysisTab@@@@@:', activeName, parentName, enName)

      this.analysisTabsValue = activeName
      this.analysisTabs = tabs.filter(tab => tab.name !== targetName)
      // this.$bus.$emit('openHeaderMenuItem', parentName, null, null) // 修改头部显示效果
      this.$bus.$emit('resetManagerTableWidth') // 重置分析管理表格的大小
    },

    getAnalysisMenu (enName) {
      const hideMenuObj = {}
      const disabledMenuObj = {}
      if (enName === 'analysis_file_new') {
        this.$bus.$emit('openHeaderMenuItem', 'analysis_dataSource', null, null) // 修改头部显示效果
      } else if (enName === 'analysisManager') {
        this.$bus.$emit('openHeaderMenuItem', 'analysis_file', this.$store.state.managerHideMenu, this.$store.state.managerDisabledMenu)
      } else {
        if (this.subActiveType && enName === 'analysis_result') {
          this.$refs.analysisResult[0].changedActiveName(this.subActiveType)
          this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.subActiveType], {}, this.$store.state.isDisabledMenu)
        } else if (enName === 'analysisManager') {
          this.$bus.$emit('openHeaderMenuItem', 'analysis_file', this.$store.state.managerHideMenu, this.$store.state.managerDisabledMenu) // 修改头部显示效果
        } else if (enName === 'analysis_view_template') {
          this.$bus.$emit('openHeaderMenuItem', enName, this.$store.state.anaVTHidedMenu, this.$store.state.anaVTDisabledMenu)
        } else if (enName === 'flight_param_compare') {
          this.$bus.$emit('openHeaderMenuItem', enName, hideMenuObj, disabledMenuObj) // 修改头部显示效果
        } else if (enName === 'fpc_result') {
          this.$bus.$emit('resetFpcResultMenuHandle')
        } else {
          this.$bus.$emit('openHeaderMenuItem', parent, null, null) // 修改头部显示效果
        }
      }
    },

    clickAnalysisTab (vc) { // 点击tab标签获取实例
      let attrObj = vc.$attrs
      // if (this.activeTabName === attrObj.id) {
      //   return
      // }
      const hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
      }
      const disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
      }
      console.log('clickAnalysisTab@@@@@@:', attrObj.id, attrObj.parent, hideMenuObj, disabledMenuObj)
      if (attrObj.id === 'analysis_file_new') {
        this.$bus.$emit('openHeaderMenuItem', 'analysis_dataSource', null, null) // 修改头部显示效果
      } else if (attrObj.id === 'analysisManager') {
        this.$bus.$emit('openHeaderMenuItem', 'analysis_file', this.$store.state.managerHideMenu, this.$store.state.managerDisabledMenu)
      } else {
        // this.$bus.$emit('openHeaderMenuItem', attrObj.parent, null, null) // 修改头部显示效果
        if (this.subActiveType && attrObj.id === 'analysis_result') {
          this.$refs.analysisResult[0].changedActiveName(this.subActiveType)
          this.$bus.$emit('openHeaderMenuItem', this.activeNameToParent[this.subActiveType], {}, this.$store.state.isDisabledMenu)
        } else if (attrObj.id === 'analysisManager') {
          // this.$bus.$emit('openHeaderMenuItem', attrObj.parent, this.$store.state.managerHideMenu, null) // 修改头部显示效果
          this.$bus.$emit('openHeaderMenuItem', attrObj.parent, this.$store.state.managerHideMenu, this.$store.state.managerDisabledMenu) // 修改头部显示效果
        } else if (attrObj.id === 'analysis_view_template') {
          this.$bus.$emit('openHeaderMenuItem', attrObj.id, this.$store.state.anaVTHidedMenu, this.$store.state.anaVTDisabledMenu)
        } else if (attrObj.id === 'flight_param_compare') {
          this.$bus.$emit('openHeaderMenuItem', 'flight_param_compare', null, null) // 修改头部显示效果
        } else if (attrObj.id === 'fpc_result') {
          // 航班参数对比结果
          this.$bus.$emit('resetFpcResultMenuHandle')
        } else {
          this.$bus.$emit('openHeaderMenuItem', attrObj.parent, null, null) // 修改头部显示效果
        }
      }
      // this.getAnalysisMenu(attrObj.id) // , attrObj.parent
      this.$bus.$emit('resetManagerTableWidth') // 重置分析管理表格的大小
      this.activeTabName = attrObj.id
    },
    closeAnalysisTab () { // 关闭分析结果tab标签
      // let analysisValue = this.$util.getTabNameValue('分析结果', 'analysis_result', this.analysisTabs)
      let analysisValue = this.$util.getTabNameValue(this.getFileResultName(), 'analysis_result', this.analysisTabs)
      this.removeAnalysisTab(analysisValue)
    },

    closeDhbcsdbTab () {
      let tempAnalysisValue = this.$util.getTabValue('fpc_result', 'fpc_result_chart', this.analysisTabs)
      this.removeAnalysisTab(tempAnalysisValue)
    },

    closeEventTab () { // 关闭分析结果tab标签
      // let eventValue = this.$util.getTabNameValue('分析结果', 'event_store_result', this.analysisTabs)
      // this.removeAnalysisTab(eventValue)
    },

    updateAnalysisTabData (zhName, enName, parent, type) {
      let tabArr = this.analysisTabs
      if (tabArr.length > 0) {
        tabArr.forEach(item => {
          if (item.title === zhName && item.content === enName && type === 'parent') { // 针对分析结果修改
            item.parent = parent
            return false
          }
          if (item.enName === enName && item.parent === parent && type === 'title') { // 针对编辑分析参数后重新保存
            item.title = zhName
            return false
          }
        })
        this.analysisTabs = tabArr
      }
    },
    getFileResultName () {
      let tabArr = this.analysisTabs
      let fileResultName = '分析结果'
      if (tabArr.length > 0) {
        tabArr.forEach(item => {
          if (item.title.indexOf('分析结果') > 0) {
            fileResultName = item.title
          }
        })
      }
      return fileResultName
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
