<template>
  <div class="header-tab" v-if="datatableTabs.length > 0">
    <el-tabs v-model="datatableTabsValue" type="card" @tab-remove="removeDataTableTab" @tab-click="clickdataTableTab">
      <el-tab-pane
        v-for="item in datatableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      >
        <div v-if="item.content === 'dataTable_version_list'">
          <VersionList ref="dataTable_version_list"></VersionList>
        </div>
        <div v-else-if="item.content === 'dataTable_dataClean_list'">
          <DataClean ref="dataTable_dataClean_list"></DataClean>
        </div>
        <div v-else-if="item.content === 'dataTable_version_detail'">
          <VersionDetails ref="dataTable_version_detail" v-bind:modelID="modelID"></VersionDetails>
        </div>
        <div v-else-if="item.content === 'dataTable_data_statics'">
          <DataStatics ref="dataTable_data_statics"></DataStatics>
        </div>
        <div v-else-if="item.content === 'dataTable_unmatchedFlights_menu'"> <!--未匹配航班-->
          <UnmatchedFlights ref="unmatchedFlightsRef" :errorDate="errorDate"></UnmatchedFlights>
        </div>
        <div v-else-if="item.content === 'dataTable_unmatchedCSV_menu'"> <!--未匹配航班-->
          <UnmatchedCSV ref="unmatchedFlightsRef"></UnmatchedCSV>
        </div>
        <div v-else>
          {{ item }} 待开发 (◎_◎;)
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 按需异步加载组件，打包时减少体积
const VersionList = () => import('components/datatable/version/versionlist/VersionList')
const VersionDetails = () => import('components/datatable/version/versiondetails/VersionDetails')
const DataClean = () => import('components/datatable/dataclean/DataClean')
const DataStatics = () => import('components/datatable/DataStatics')
const UnmatchedFlights = () => import('components/datatable/UnmatchedFlights')
const UnmatchedCSV = () => import('components/datatable/UnmatchedCSV')

export default {
  data () {
    return {
      errorDate: [],
      lastMenuEnName: 'dataTable_version_list',
      userInfo: {},
      datatableTabsValue: '1',
      datatableTabs: [],
      modelID: '',
      tabIndex: 1
    }
  },
  components: {
    DataClean,
    VersionList,
    VersionDetails,
    DataStatics,
    UnmatchedFlights,
    UnmatchedCSV
  },
  mounted () {
    this.addTab({enName: 'dataTable_version_list', zhName: '版本列表', isClosable: false, parent: 'dataTable_repository'})
    this.$nextTick(() => {
    })
    this.$bus.$on('datatableMenu', (obj) => { // 点击左侧级菜单时就触发查询权限
      this.getMenueOrData()
    })
    this.$bus.$on('dataTableAddTab', (obj) => {
      console.log(obj.enName, obj.zhName, obj.isClosable)
      this.addTab(obj)
    })
  },
  props: [
    'menuListObj'
  ],
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  },
  methods: {
    getMenueOrData () {
      this.$util.dataTableEditAuthority = false
      this.userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
      if (this.userInfo) {
        for (let i = 0; i < this.userInfo.menuList.length; i++) {
          if (this.userInfo.menuList[i]['ID'] === '7002' || this.userInfo.menuList[i]['ID'] === 7002) {
            this.$util.dataTableEditAuthority = true // 数据权限
            break
          }
        }
      }
      if (this.lastMenuEnName === 'dataTable_version_list') {
        this.$refs.dataTable_version_list[0].changeStatus('全部')
      }
      this.getMenueByenName(this.lastMenuEnName)
      this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
    },
    addTab (obj) {
      if (obj.enName === 'dataTable_version_list_Import') {
      this.$bus.$emit('import_showDialog')
    } else if (obj.enName === 'dataTable_version_detail_Add') {
      this.$bus.$emit('add_showDialog')
    } else if (obj.enName === 'dataTable_version_detail_synchronousUpdate') {
      this.$bus.$emit('syncModel')
    } else if (obj.enName === 'dataTable_version_detail_Delete') {
      this.$bus.$emit('deleteZiduan')
    } else if (obj.enName === 'dataTable_version_detail') {
        this.modelID = obj.modelID
        this.openTab(obj)
      } else {
        this.openTab(obj)
    }
    },

    // 打开tab
    openTab (obj) {
      // this.$bus.$emit('openHeaderMenuItem', obj.parent, {}, {}) // 新开页签 先清空头部，后在创建新的
      // if (this.$util.getTabNameValue(obj.zhName, obj.enName, this.EventTabs)) { // enName 和zhName 想
      //   let EventTabsValue = this.$util.getTabNameValue(obj.zhName, obj.enName, this.EventTabs)
      //   this.closeTab(EventTabsValue)
      // }
      if (this.$util.getTabValue(obj.enName, obj.parent, this.datatableTabs) > 0) {
        let value = this.$util.getTabValue(obj.enName, obj.parent, this.datatableTabs)
        this.removeDataTableTab(value)
      }

      let newTabName = ++this.tabIndex + ''
      console.log(obj)
      if (obj.errorDate) {
        this.errorDate = obj.errorDate
      }
      this.datatableTabs.push({
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      })
      this.datatableTabsValue = newTabName
      this.lastMenuEnName = obj.enName
    },
    removeDataTableTab (targetName) { // 关闭tab标签
      let tabs = this.datatableTabs
      let activeName = this.datatableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name

              this.lastMenuEnName = nextTab.enName

              this.getMenueByenName(this.lastMenuEnName)
            }
          }
        })
      }
      this.datatableTabsValue = activeName
      this.datatableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickdataTableTab (vc) { // 点击tab标签获取实例
      // var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
      //   // 'analysis_file_open': false
      // }
      // var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
      //   // 'analysis_file_copy': false
      // }
      var attrObj = vc.$attrs
      this.lastMenuEnName = attrObj.id

      this.getMenueByenName(attrObj.id)
    },
    // 根据enName获取对应不同的菜单
    getMenueByenName (enName) {
      if (enName === 'dataTable_version_list') {
        this.$refs.dataTable_version_list[0].setMenue()
      } else if (enName === 'dataTable_version_detail') {
        this.$refs.dataTable_version_detail[0].setMenue()
      } else if (enName === 'dataTable_dataClean_list') {
        this.$refs.dataTable_dataClean_list[0].setMenue()
      } else if (enName === 'dataTable_data_statics') {
        this.$refs.dataTable_data_statics[0].setMenue()
      } else if (enName === 'dataTable_unmatchedFlights_menu') {
        this.$refs.unmatchedFlightsRef[0].setMenue()
      }
    }
  }
}
</script>
