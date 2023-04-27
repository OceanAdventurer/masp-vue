<template>
  <div class="header-two">
    <div class="header-two-title" v-show="headerTwoValue !== 'modelRuntime_approve' && headerTwoValue !== 'weather_flight' && headerData[headerTwoValue]">
      <div
        v-for="item in headerData[headerTwoValue]"
        :key="item.enName"
        v-show="isShowHeaderTwoMenu(item.enName, item.isShow)"
        :style="{ pointerEvents: isDisabledHeaderTwoMenu(item.enName, item.isDisabled) ? 'none' : 'auto' }"
        :class="{'active':item.enName===current}"
        :title="item.zhName">
        <div class="header-two-item" @click="addTab(item.enName, item.zhName, item.parent, navMenuValue)">
          <img class="activeImg" :src="isDisabledHeaderTwoMenu(item.enName, item.isDisabled) ? item.disabledImgUrl : item.activeImgUrl">
          <img class="showImg" :src="isDisabledHeaderTwoMenu(item.enName, item.isDisabled) ? item.disabledImgUrl : item.showImgUrl">

          <el-dropdown v-show="item.isDropdown" placement="bottom-start" @command="newParamOneCommand" :style="{marginBottom: '18px'}">
            <span class="el-dropdown-link">
              {{ item.zhName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div v-for="dropitem in item.dropdownItem" :key="dropitem.name">
                <el-dropdown-item :command="dropitem.name">{{dropitem.name}}</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <span :style="{ color: isDisabledHeaderTwoMenu(item.enName, item.isDisabled) ? '#9B9B9B' : '#555555'}"  v-show="!item.isDropdown">{{ item.zhName }}</span>
        </div>
      </div>
    </div>
    <div :class="[headerData[headerTwoValue] ? 'header-two-content' : 'header-two-content-max']">
      <DataTableTab v-show="navMenuValue === 'dataTable'" id="dataTableContent"></DataTableTab>
      <AnalysisTab v-show="navMenuValue === 'analysis'" id="analysisContent"></AnalysisTab>
      <DataMiniTab v-show="navMenuValue === 'dataMining'" id="dataMiningContent"></DataMiniTab>
      <WeatherTab v-show="navMenuValue === 'weather'" id="weatherContent"></WeatherTab>
      <AirRouteTab v-show="navMenuValue === 'airRoute'" id="airRouteContent"></AirRouteTab>
      <ParamOneTab v-show="navMenuValue === 'paramOne'" id="paramOneContent"></ParamOneTab>
      <ParamTwoTab v-show="navMenuValue === 'paramTwo'" id="paramTwoContent"></ParamTwoTab>
      <EventTab v-show="navMenuValue === 'paramEvent'" id="eventContent"></EventTab>
      <SettingTab v-show="navMenuValue === 'setting'" id="settingContent"></SettingTab>
      <!-- <ChangeLogTab v-show="navMenuValue === 'changeLog'" id="changeLogContent"></ChangeLogTab> -->
      <TodoListTab v-show="navMenuValue === 'todoList'" id="todoListContent"></TodoListTab>
      <AppTab v-show="navMenuValue === 'app'" id="appContent"></AppTab>
      <SafetyMonitorTab v-show="navMenuValue === 'safetyMonitor'" id="SafetyMonitorTabContent"> </SafetyMonitorTab>
      <ModelRuntimeTab v-show="navMenuValue === 'modelRuntime'" id="ModelRuntimeTabContent"> </ModelRuntimeTab>
      <RuntimeManageTab v-show="navMenuValue === 'runtimeManage'" id="RuntimeManageTabContent"> </RuntimeManageTab>
    </div>
  </div>
</template>
<script>
  import * as menu from 'assets/js/menuData'

  // 按需异步加载组件，打包时减少体积
  const AnalysisTab = () => import('components/analysis/AnalysisTab')
  const DataMiniTab = () => import('components/datamining/DataMiniTab')
  const WeatherTab = () => import('components/edgeComputing/WeatherTab')
  const AirRouteTab = () => import('components/edgeComputing/AirRouteTab')
  const DataTableTab = () => import('components/datatable/DataTableTab')
  const ParamOneTab = () => import('components/paramone/ParamOneTab')
  const ParamTwoTab = () => import('components/paramtwo/ParamTwoTab')
  const EventTab = () => import('components/event/EventTab')
  const SettingTab = () => import('components/setting/SettingTab')
  // const ChangeLogTab = () => import('components/changeLogList/ChangeLogTab')
  const TodoListTab = () => import('components/todolist/TodoListTab')
  const AppTab = () => import('components/app/AppTab')
  const SafetyMonitorTab = () => import('components/safetyMonitor/SafetyMonitorTab') // 安全监控
  const ModelRuntimeTab = () => import('components/modelRuntime/ModelRuntimeTab') // 模型运行
  const RuntimeManageTab = () => import('components/modelRuntime/RuntimeManageTab') // 模型运行管理区

  export default {
    data () {
      return {
        headerData: menu.menuData.headerData,

        current: '',
        analysisActiveTabName: 'analysisManager' // 分析模块默认激活的tab标签
      }
    },
    props: [
      'headerTwoValue',
      'navMenuValue',
      'hideHeaderTwoObj',
      'disabledHeaderTwoObj'
    ],
    components: {
      DataTableTab,
      ParamOneTab,
      ParamTwoTab,
      AnalysisTab,
      DataMiniTab,
      WeatherTab,
      AirRouteTab,
      SettingTab,
      EventTab,
      // ChangeLogTab,
      TodoListTab,
      AppTab,
      SafetyMonitorTab,
      ModelRuntimeTab,
      RuntimeManageTab
    },
    created () {},
    computed: {
    },
    mounted () {
      const that = this
      this.$bus.$on('updateAnalysisActiveTabNameHandle', (name) => { // 接收显示表格右侧dom事件
        that.updateAnalysisActiveTabName(name)
      })
      this.$bus.$on('setCurrentNameHandle', (eName) => { // 接收显示表格右侧dom事件
        that.setCurrentName(eName)
      })
      this.$bus.$on('addTab', (en, zh, parent, menuType) => { // 接收显示表格右侧dom事件
        that.addTab(en, zh, parent, menuType)
      })
    },
    watch: {
      navMenuValue (newVal, oldVal) {
        console.log('navMenuValue', newVal, oldVal)
        if (this.$util.isDefine(newVal) && newVal === 'analysis') {
          if (this.analysisActiveTabName === 'analysis_file_new' || this.analysisActiveTabName === 'analysis_dhbcsdb') { // 新建分析
            this.$bus.$emit('openHeaderMenuItem', 'analysis_dataSource', {}, {})
          } else if (this.analysisActiveTabName === 'analysis_result') { // 分析结果
            this.$bus.$emit('resetAnalysisResultMenuHandle')
          } else if (this.analysisActiveTabName === 'fpc_result') {
            this.$bus.$emit('resetFpcResultMenuHandle')
          }
        }
      },
      currentName (newVal, oldVal) {
        this.current = newVal
      }
    },
    methods: {
      // :class="{'active' : item.activeIndex === item.enName}"
      // @click="setActive(item, item.enName)"
      // setActive (item, num) {
      //   this.$set(item, 'activeIndex', num) // item里没有activeIndex，动态添加属性要用$set
      // },
      // @click="addClass(item.enName)"
      addClass (index) {
        this.current = index
      },
      newParamOneCommand (command) {
        this.addTab('paramOne_oneDimensionalFunction_new', '新建' + command, 'paramOne_oneDimensionalFunction', 'paramOne') // 点击新建工程函数，工程参数,父菜单为 工程函数
      },
      addTab (en, zh, parent, menuType) { // 点击二级菜单打开tab标签页
        console.log('addTab@@@@@@@@:', en, zh, parent, menuType)
        // if (parent === '添加筛选方式') {}
        if (parent === 'analysis_chart') {
          console.log(123)
          if (en !== 'analysis_chart_export' && en !== 'analysis_chart_drillDown' && en !== 'analysis_chart_subline') {
            this.current = en
          }
        } else {
          console.log(this.$store.state.paramTwoStatus)
          this.current = ''
          if (this.$store.state.paramTwoStatus === '1' && (zh === '添加筛选方式' || zh === '添加时间点' || zh === '添加时间段' || zh === '添加测量值' || zh === '添加逻辑值' || zh === '添加事件')) {
            this.$message({
              message: '在分析参数库激活状态下不可进行改操作',
              type: 'warning'
            })
            return
          }
        }

        if ((en === 'analysis_file_new' || en === 'analysis_dhbcsdb') && parent === 'analysis_file' && menuType === 'analysis') { // 在二级菜单中点击新建分析，则清空vuex中的分析参数
          this.$store.commit('ANALYSIS_PARAMS_ID', '')
          this.$store.commit('ANALYSIS_PARAMS', {}) // 清空store中存放的配置参数信息

          if (zh === '新建分析' || zh === '新建多航班参数对比') {
            this.$store.commit('EVENT_STORE_DATA', {})
          }
        }
        console.log(menuType + 'AddTab')
        console.log({enName: en, zhName: zh, isClosable: true, parent: parent, count: 0})
        if (zh === '新建分析') {
          this.$bus.$emit(menuType + 'AddTab', {enName: en, zhName: zh, isClosable: true, parent: parent, count: 0, errorDate: [], type: '航班分析'})
        } else {
          this.$bus.$emit(menuType + 'AddTab', {enName: en, zhName: zh, isClosable: true, parent: parent, count: 0, errorDate: []})
        }
      },
      isShowHeaderTwoMenu (name, flag) { // 设置是否显示二级菜单
        // 初始化加载的数据，hideHeaderTwoObj不存在要操作的菜单项，此时菜单项的是否显示的默认值是：true
        if (this.hideHeaderTwoObj[name] === undefined) {
          return flag
        } else if (!this.hideHeaderTwoObj[name]) { // 此时hideHeaderTwoObj存在要操作的菜单项，且菜单项设置为不显示即为：false
          return false
        } else if (this.hideHeaderTwoObj[name]) { // 此时hideHeaderTwoObj存在要操作的菜单项，且菜单项在此操作前设置过为不显示，而现在又修改为显示即为：true
          return true
        }
      },
      isDisabledHeaderTwoMenu (name, flag) { // 设置是否禁用二级菜单
        if (this.disabledHeaderTwoObj[name] === undefined) { // 初始化加载数据，此时disabledHeaderTwoObj不存在要操作的菜单项，则利用菜单项的默认值来判断是否禁用此菜单
          return flag
        } else if (!this.disabledHeaderTwoObj[name]) { // 此时disabledHeaderTwoObj存在要操作的菜单项，且设置为不禁用
          return false
        } else if (this.disabledHeaderTwoObj[name]) { // 此时disabledHeaderTwoObj存在要操作的菜单项，且设置为禁用
          return true
        }
      },
      updateAnalysisActiveTabName (name) {
        this.analysisActiveTabName = name
      },
      setCurrentName (eName) {
        this.current = eName
      }
    }
  }
</script>
<style scoped>
  .header-two {
    color: #555555;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header-two-title {
    padding-left: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .header-two-content {
    position: relative;
    width: 100%;
    /* height: 90%; */
    height: calc(100% - 54px);
  }

  .header-two-content-max {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .header-two-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
  }

  .header-two-item span {
    margin: 0;
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .activeImg {
    display: none;
  }
  .active .activeImg {
    display: block;
  }
  .active .showImg {
    display: none;
  }
  .active .header-two-item span {
    color: #3A6BBA !important;
    font-weight: bold;
  }

  .active1 .header-two-item span {
    color: red !important;
  }
  /* -------------- THE button -------------- */
  .button,
  .active1 .header-two-item img {
    /* text */
    text-decoration: none;
    font-weight: bold;
    text-shadow: rgba(255,255,255,.5) 0 1px 0;
    user-select: none;

    /* layout */
    position: relative;

    border-radius: 4px;

    /* effects */
    border-top: 1px solid rgba(255,255,255,0.8);
    border-bottom: 1px solid rgba(0,0,0,0.1);

    background-image: gradient(radial, 50% 0, 100, 50% 0, 0, from( rgba(255,255,255,0) ), to( rgba(255,255,255,0.7) ));

    transition: background .2s ease-in-out;

    /* color */
    color: hsl(0, 0%, 40%) !important;
    background-color: hsl(0, 0%, 75%);

    box-shadow: inset rgba(255,254,255,0.6) 0 0.3em .3em,
    inset rgba(0,0,0,0.15) 0 -0.1em .3em,
    hsl(0, 0%, 60%) 0 .1em 3px, hsl(0, 0%, 45%) 0 .3em 1px,
    rgba(0,0,0,0.2) 0 .5em 5px;
  }
  /* -------------- button (tag) -------------- */

  .header-tab {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .header-tab >>> .el-tabs__item {
    font-size: 12px;
  }

  /* -------------- media -------------- */
  /* 窗口高度大于800px */
  @media screen and (min-height: 800px) {
    .header-two-title {
      height: 54px;
      /* max-height: 54px; */
    }
    .header-two-item img {
      width: 22px;
      height: 22px;
      margin: 5px 21px 4px;
    }
  }
  /* 窗口高度小于800px */
  @media screen and (max-height: 800px) {
    .header-two-title {
      height: 54px;
      /* max-height: 54px; */
    }
    .header-two-item img {
      width: 22px;
      height: 22px;
      margin: 5px 21px 4px;
    }
  }
</style>
