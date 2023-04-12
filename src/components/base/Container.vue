<template>
  <el-container>
    <el-dialog
      title="系统切换"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="systemClose">
      <div>
        <div style="display:inline-block;margin-right:10px">请选择子系统: </div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.SYSTEM_ID"
            :label="item.SYSTEM_NAME"
            :value="item.SYSTEM_URL">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSystem()">取 消</el-button>
        <el-button type="primary" @click="changrSystem()">确 定</el-button>
      </span>
    </el-dialog>
    <Loading v-show="showLoading"></Loading>
    <el-header style="height: 45px;">
      <div class="nav-menu-header" v-show="menuListArr.length > 0">
        <div class="nav-menu-header-left" :style="isCollapsed ? 'width: 181px;' : ''">
          <div class="system_title" v-if='isCollapsed'>
            <p style='font-size:16px; color:#fff;font-weight:700;margin: 7px 0;text-align:center'>中国民航安全数据</p>
            <p style='font-size:16px; color:#fff;font-weight:700; margin: 0;text-align:center'>共享分析平台</p>
          </div>
          <div class="system_title" v-else>
            <h2>DSAP</h2>
          </div>
        </div>
<!--        <div v-show="isCollapsed" class="logo-div"></div>-->
        <div :class="[rotateIcon, headerLogo]"></div>
        <div class="nav-menu-header-right" v-show="headerTwoData[navMenu]">
          <div
            v-for="menu in headerTwoData[navMenu]"
            :class="['nav-menu-header-title', {'nav-menu-header-title-active': menu.parent +'_'+ menu.enName === headerMenu}]"
            :key="menu.enName"
            @click="openHeaderMenuItem(menu.parent +'_'+ menu.enName)"
            v-show="menu.isShow">
              {{ menu.zhName }}
          </div>
        </div>
      </div>
    </el-header>
    <el-container v-show="menuListArr.length > 0" class="main-content">

      <el-menu  class="el-menu-vertical-msap"
        :default-active="activeIndex"
        :collapse="!isCollapsed"
        @open="handleOpen"
        @close="handleClose"
        @select="openNavMenuItem"
        >
        <el-menu-item index="dataTable" v-if="menuListObj.dataTable">
          <i class="el-icon-menu el-icon-data"></i>
          <span slot="title">数据</span>
        </el-menu-item>
        <el-menu-item index="paramOne" v-if="menuListObj.paramOne">
          <i class="el-icon-menu el-icon-paramOne"></i>
          <span slot="title">工程参数</span>
        </el-menu-item>
        <el-menu-item index="paramTwo" v-if="menuListObj.paramTwo">
          <i class="el-icon-menu el-icon-paramTwo"></i>
          <span slot="title">分析参数</span>
        </el-menu-item>
        <el-menu-item index="paramEvent" v-if="menuListObj.event">
          <i class="el-icon-bell"></i>
          <span slot="title">事件</span>
        </el-menu-item>

        <el-submenu index="analysisGroup" class="cm-triangle" v-if="menuListObj.analysis === true || menuListObj.dataMining === true">
          <template slot="title">
            <i class="el-icon-menu el-icon-analysis"></i>
            <span slot="title">分析</span>
          </template>
          <div x-arrow="" class="cm-popper__arrow" style="left: 65px;"></div>
          <el-menu-item index="analysis" v-if="menuListObj.analysis">
            模型实验区
          </el-menu-item>
          <el-menu-item index="modelRuntime" v-if="menuListObj.analysis">
            模型运行区
          </el-menu-item>
          <el-menu-item index="runtimeManage" v-if="menuListObj.analysis">
            运行管理区
          </el-menu-item>
          <el-menu-item index="dataMining" v-if="menuListObj.dataMining">
            数据挖掘
          </el-menu-item>
        </el-submenu>

        <el-submenu index="edgeComputing" v-if="menuListObj.analysis">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span slot="title">外部数据边缘计算</span>
          </template>
          <div x-arrow="" class="cm-popper__arrow" style="left: 65px;"></div>
          <el-menu-item index="weather">
            天气
          </el-menu-item>
          <el-menu-item index="airRoute">
            空管-航路
          </el-menu-item>
        </el-submenu>

<!--
        <el-menu-item index="analysis" v-if="menuListObj.analysis">
          <i class="el-icon-menu el-icon-analysis"></i>
          <span slot="title">BI分析</span>
        </el-menu-item>
        <el-menu-item index="dataMining" v-if="menuListObj.dataMining">
          <i class="el-icon-menu el-icon-dataMining"></i>
          <span slot="title">数据挖掘</span>
        </el-menu-item> -->

<!--        <el-menu-item index="app" v-if="menuListObj.app">-->
<!--          <i class="el-icon-mobile-phone"></i>-->
<!--          <span slot="title">APP</span>-->
<!--        </el-menu-item>-->

        <el-menu-item index="safetyMonitor" v-if="menuListObj.safetyMonitor">
          <i class="el-icon-monitor"></i>
          <span slot="title">安全监控</span>
        </el-menu-item>

        <el-menu-item index="setting" v-if="menuListObj.setting">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>

        <el-menu-item index="todoList" class="todo-list-li">
          <i class="el-icon-menu el-icon-todoList"></i>
          <span slot="title">问题反馈</span>
        </el-menu-item>
      </el-menu>

      <el-main v-show="headerTwoData[navMenu]" :class="[elMainContent]" id="elMain">
        <div style="cursor:pointer">
          <img style="position:fixed;top:15px;right:185px" src="../../assets/images/btn_exchange.png" alt="">
          <el-dropdown style="position:fixed;top:15px;right:80px;color:#fff" @command="handleCommand">
            <span class="el-dropdown-link">{{ sysName }}</span>
            <el-dropdown-menu slot="dropdown" v-if="isDropdown">
              <el-dropdown-item v-for="item in options" :key="item.SYSTEM_ID" :command="composeValue(item.SYSTEM_URL, item.SYSTEM_NAME)" >{{ item.SYSTEM_NAME }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown :class="isShowTips ? 'task_bar tips_red' : 'task_bar'" style="position:fixed;top:15px;right:50px;color:#fff" @command="openDia" placement='top-end'>
            <img src="../../assets/images/btnGroups.png" alt="newTips">
            <el-dropdown-menu slot="dropdown" v-if="true" :class="isShowTips ? 'task_bar_menu tips_red' : 'task_bar_menu'">
              <el-dropdown-item v-for="item in iconGroups" :key="item.title" :command="handleVlaue(item.value, item.title)" >
                <img :src="item.src" :title="item.title">
                <span :class="item.value === 'audit_list' ? 'tips_red' : ''">
                  {{item.title}}
                  <span v-if='isShowTips'>{{approve+handle}}</span>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <HeaderTwo
          :header-two-value="headerTwoValue"
          :nav-menu-value="navMenu"
          :hide-header-two-obj="hideHeaderTwoObj"
          :disabled-header-two-obj="disabledHeaderTwoObj">
        </HeaderTwo>
        <DialogPage></DialogPage>
        <ChangeLogDialog></ChangeLogDialog>
        <HelpDialog></HelpDialog>
        <SubmitDetail></SubmitDetail>
        <div class="logout" @click="logoutFun" title="退出">
          <img src="../../assets/images/icon114.png" alt="退出">
        </div>
      </el-main>
    </el-container>
    <el-container v-show="menuListArr.length === 0">
      <div class="no-menu">{{ noMenuData }}</div>
      <div class="logout" @click="logoutFun" title="退出">
        <img src="../../assets/images/icon114.png" alt="退出">
      </div>
    </el-container>
  </el-container>
</template>

<script>
import { removeWatermark, setWaterMark } from '../../assets/js/waterMark.js'
import * as menu from 'assets/js/menuData'
import { mapState } from 'vuex'
import image0 from '@/assets/images/task_list.png'
import image1 from '@/assets/images/change_data.png'
import image2 from '@/assets/images/audit_list.png'
import image3 from '@/assets/images/submit_details.png'
import image4 from '@/assets/images/helps.png'
const Loading = () => import('components/base/Loading')
const HeaderTwo = () => import('components/base/HeaderTwo')
const DialogPage = () => import('components/base/DialogModal')
const ChangeLogDialog = () => import('components/base/ChangeLogDialog')
const HelpDialog = () => import('components/base/HelpDialog')
const SubmitDetail = () => import('components/base/SubmitDetail')

export default {
  data () {
    return {
      sysName: '',
      isDropdown: true,
      headerMenu: '', // 头部导航菜单默认为空，根据左侧导航的值而显示
      navMenu: '', // 左侧导航菜单默认显示‘分析’
      isCollapsed: true, // 默认左侧显示出来
      activeIndex: 'analysis',
      headerLogo: 'headerLogo', // 定义logo的样式
      currentName: '',
      headerTwoValue: '', // 二级头部导航菜单默认空值，根据一级头部导航菜单的值而显示
      hideHeaderTwoObj: {}, // 二级头部导航菜单是否隐藏
      disabledHeaderTwoObj: {}, // 二级头部导航菜单是否禁用
      headerTwoData: menu.menuData.headerTwoData,
      showSettingCategoryDefault: true,
      showDataTableMenu: false,
      copyAnalysisID: this.$store.state.copyAnalysisParamsId,
      menuListObj: {
        dataTable: true,
        safetyMonitor: true, // 安全监控
        paramOne: true,
        paramTwo: true,
        event: true,
        analysis: true,
        dataMining: true,
        setting: true,
        todoList: true,
        app: true
      },
      publicParmas: {},
      menuListArr: [],
      noMenuData: '',
      dialogVisible: false,
      options: [],
      value: 'http://172.20.42.144:8080/DSAP/index.html#/home',
      iconGroups: [],
      isShowTips: false,
      // newTips: true,
      approve: 0,
      handle: 0
    }
  },
  computed: {
    logoIs () { // 改变logo显示效果
      return [this.isCollapsed ? 'logo-sy' : 'logo-bg']
    },
    rotateIcon () { // 改变logo显示效果
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    elMainContent () { // 改变二级菜单显示效果
      return ['el-main-default', this.isCollapsed ? '' : 'el-main-content']
    },
    ...mapState(['showLoading'])
  },
  // watch: {
  //   copyAnalysisID (newVal, oldVal) {

  //   }
  // },
  components: {
    HeaderTwo,
    DialogPage,
    Loading,
    ChangeLogDialog,
    HelpDialog,
    SubmitDetail
  },
  created () {
    this.getUserInfo()
  },
  mounted () { // 处理dom加载完后的事情
    const that = this
    this.$bus.$on('showSettingCategoryDefault', (status) => { // 接收点击左侧导航显示头部一级菜单效果
      this.showSettingCategoryDefault = status
    })
    this.$bus.$on('openHeaderMenu', (name) => { // 接收点击左侧导航显示头部一级菜单效果
      that.openNavMenuItem(name)
    })
    this.$bus.$on('openHeaderMenuItem', (name, hideDataObj, disabledDataObj) => { // 接收点击头部一级菜单显示二级菜单的效果
      that.openHeaderMenuItem(name, hideDataObj, disabledDataObj)
    })
    this.$bus.$on('setCurrentName', (eName) => { // 接收点击头部一级菜单显示二级菜单的效果
      that.setCurrentName(eName)
    })
    this.$bus.$on('sendingInfo', obj => {
      that.openNavMenuItem('analysis', obj)
    })
    document.getElementById('app').addEventListener('click',
      function (e) {
        if (that.$util.isDefine(that.$store.getters.userInfo.menuList) && that.$store.getters.userInfo.menuList.length <= 0) {
          return false
        }
        let currentClassName = e.target.className
        if (currentClassName.indexOf('headerLogo') > -1) {
          if (that.isCollapsed) {
            that.isCollapsed = false
          } else {
            that.isCollapsed = true
          }
        } else {
          // that.isCollapsed = false
        }
        that.$bus.$emit('resetManagerTableWidth') // 重置分析管理表格的大小
      }
    )
    this.getIconGroups()
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('openHeaderMenu') // 移除自定义事件监听器。
    this.$bus.$off('openHeaderMenuItem') // 移除自定义事件监听器。
    this.$bus.$off('setCurrentName')
    this.iconGroups.forEach(item => {
      this.$bus.$off(item.value)
    })
    removeWatermark()
  },
  methods: {
    cancelSystem () {
      this.dialogVisible = false
      this.value = 'http://172.20.42.144:8080/DSAP/index.html#/home'
    },
    changrSystem () {
      window.open(this.value, '_self')
      this.dialogVisible = false
    },
    getIconGroups () {
      this.iconGroups = [
        {src: image0, title: '任务详情', value: 'task_list'},
        {src: image1, title: '变更日志', value: 'change_data'},
        {src: image2, title: '待办列表', value: 'audit_list'},
        {src: image3, title: '提交详情', value: 'submit_details'},
        {src: image4, title: '帮助', value: 'help_manual'}
      ]
    },
    getUserSystem (name) {
        this.$axios.get('/saas/getSystemsByUserLoginName', { params: {
            userLoginName: name
        }}).then(res => {
            if (res.status === 200) {
               this.options = res.data
               this.sysName = localStorage.getItem('currentSystem')
              //  res.data.forEach(item => {
              //    console.log(item)
              //    if (window.location.href === item.SYSTEM_URL) {
              //      this.sysName = item.SYSTEM_NAME
              //    }
              //  })
               if (this.options.length === 1) {
                 this.isDropdown = false
               } else {
                 this.isDropdown = true
               }
            }
        })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    openNavMenuItem (name, publicParmas) { // 头部一级菜单显示效果
      this.activeIndex = name
      this.navMenu = name // 激活左边导航菜单
      this.headerMenu = this.headerTwoData[this.navMenu][0].parent + '_' + this.headerTwoData[this.navMenu][0].enName // 激活头部一级导航菜单
      this.headerTwoValue = this.getHeaderTwoValue() // 点击头部一级菜单时赋值二级菜单值
      if (this.navMenu === 'setting') { // 如果点击的是设置，显目录配置的默认菜单
        this.showSettingCategoryDefault = true // 目录配置显示默认菜单
      } else if (this.navMenu === 'dataTable') {
        this.$bus.$emit('datatableMenu')
      } else if (this.navMenu === 'dataMining') {
        this.$bus.$emit('dataMiningMenu')
      } else if (this.navMenu === 'paramTwo') {
        this.$bus.$emit('paramTwoMenu')
      } else if (this.navMenu === 'paramOne') {
        this.$bus.$emit('paramOneMenu')
      } else if (this.navMenu === 'paramEvent') {
        this.$bus.$emit('eventMenu')
      } else if (this.navMenu === 'analysis') {
        this.showSettingCategoryDefault = false
        let obj = publicParmas || {}
        this.$bus.$emit('analysisMenu')
        obj.modelState = '已上线'
        this.$bus.$emit('sendToManager', obj)
      } else if (this.navMenu === 'weather') { // 天气，默认打开航班天气页面
        this.$bus.$emit('weatherAddTab', {enName: 'flight_weather', zhName: '航班天气', isClosable: false, parent: name})
      } else if (this.navMenu === 'safetyMonitor') { // 安全监控
        this.$bus.$emit('safetyMonitorMenu', 'safetyMonitor_stats')
        this.$bus.$emit('safetyMonitor_stats') // 默认打开
      } else if (this.navMenu === 'modelRuntime') { // 模型运行区
        this.$bus.$emit('modelRuntimeMenu', 'modelRuntime_approve')
      } else if (this.navMenu === 'runtimeManage') { // 模型运行管理区
        this.isShowTips = false
        this.$bus.$emit('runtimeManageMenu', 'runtimeManage_approve')
      } else { // 点击的是其他菜单则隐藏，否则会导致二级菜单不出来
        this.showSettingCategoryDefault = false // 隐藏
      }
    },
    openHeaderMenuItem (name, hideDataObj, disabledDataObj) { // 头部二级菜单显示效果
      console.log('openHeaderMenuItem:~~~', name, hideDataObj, disabledDataObj)
      this.headerMenu = name // 激活头部一级导航菜单

      if (name.indexOf('analysis_') > -1) {
        this.headerMenu = 'analysis_file'
      }

      this.headerTwoValue = name // 保存选择一级导航菜单的值
      if (hideDataObj) { // 二级菜单是否隐藏
        this.hideHeaderTwoObj = hideDataObj
      }
      if (disabledDataObj) { // 二级菜单是否禁用
        this.disabledHeaderTwoObj = disabledDataObj
      }
      // 目录配置状态为true需要显示默认菜单（获取一级菜单时设置为true）其他清空根据点击的具体菜单显示
      if (this.showSettingCategoryDefault) {
        let hideMenuObj = {}
        hideMenuObj['setting_analysis_parameter_category'] = true
        hideMenuObj['setting_create_next_catalog'] = false
        hideMenuObj['setting_edit_catalog'] = false
        hideMenuObj['setting_remove_catalog'] = false
        hideMenuObj['setting_create_catalog'] = false
        this.hideHeaderTwoObj = hideMenuObj
      }
      // 以下是默认打开tab标签的设置
      // 当提交分析参数后点击分析中图表、表格、视图默认打开‘分析结果’tab标签
      if (name === 'analysis_chart' || name === 'analysis_grid' || name === 'analysis_view' || name === 'analysis_table') {
        if (this.$util.isNotEmptyObject(this.$store.state.analysisResultAllData.submitAnalysisParams)) {
          // this.$bus.$emit('analysisAddTab', {enName: 'analysis_result', zhName: '分析结果', isClosable: true, parent: name})

          let fileResultName = '分析结果'
          if (this.$util.isDefine(this.$store.state.analysisResultAllData.submitAnalysisParams.fileNewName)) {
            fileResultName = this.$store.state.analysisResultAllData.submitAnalysisParams.fileNewName + ' - 分析结果'
          }
          this.$bus.$emit('analysisAddTab', {enName: 'analysis_result', zhName: fileResultName, isClosable: true, parent: name})
        }
      } else if (name === 'weather_flight') {
        this.$bus.$emit('weatherAddTab', {enName: 'flight_weather', zhName: '航班天气', isClosable: false, parent: name})
      } else if (name === 'weather_airport') {
        this.$bus.$emit('weatherAddTab', {enName: 'airport_weather', zhName: '机场天气', isClosable: false, parent: name})
      } else if (name === 'safetyMonitor_stats') {
        this.$bus.$emit('safetyMonitorMenu', 'safetyMonitor_stats')
        this.$bus.$emit('safetyMonitor_stats')
      } else if (name === 'safetyMonitor_userLog') {
        this.$bus.$emit('safetyMonitorMenu', 'safetyMonitor_userLog')
        this.$bus.$emit('safetyMonitor_userLog')
      } else if (name === 'safetyMonitor_userData') {
        this.$bus.$emit('safetyMonitorMenu', 'safetyMonitor_userData')
        this.$bus.$emit('safetyMonitor_userData')
      } else if (name === 'runtimeManage_approve') {
        this.$bus.$emit('runtimeManageMenu', 'runtimeManage_approve')
        this.$bus.$emit('runtimeManage_approve')
      } else if (name === 'runtimeManage_onlineOffline') {
        this.$bus.$emit('runtimeManageMenu', 'runtimeManage_onlineOffline')
        this.$bus.$emit('runtimeManage_onlineOffline')
      } else if (name === 'runtimeManage_handle') {
        this.$bus.$emit('runtimeManageMenu', 'runtimeManage_handle')
        this.$bus.$emit('runtimeManage_handle')
      }

      // if (name === 'event_store_result') {
      //   this.$bus.$emit('analysisAddTab', {enName: 'event_store_result', zhName: '事件库分析结果', isClosable: true, parent: name})
      // }
    },
    setCurrentName (eName) {
      console.log('setCurrentName:  ' + eName)
      this.currentName = eName
      this.$bus.$emit('setCurrentNameHandle', eName)
    },
    getHeaderTwoValue () { // 获取二级菜单的数据键值
      const tempObj = this.headerTwoData[this.navMenu]
      if (tempObj.length === 0) {
        return false
      } else {
        return tempObj[0].parent + '_' + tempObj[0].enName
      }
    },
    getDefaultNavMenu (mlist) { // 获取默认的左侧菜单
      let tempListObj = {}
      mlist.map((item) => {
        tempListObj[item.URL] = item
      })

      if (this.$util.isNotEmptyObject(tempListObj)) {
        let tempMenuList = this.menuListObj
        for (let t in tempMenuList) { // 修改data中menuList的默认数据
          if (tempListObj[t]) {
            this.menuListObj[t] = true
          } else {
            this.menuListObj[t] = false
          }
        }

        if (tempListObj.analysis) { // 显示默认的菜单
          this.navMenu = 'analysis'
        } else {
          this.navMenu = mlist[0]['URL']
        }
        this.headerTwoValue = this.getHeaderTwoValue() // 获取二级菜单的值
        this.openNavMenuItem(this.navMenu) // 初始化默认显示分析模块一级菜单效果
      }
    },
    isStringObject (obj) {
      if (obj) {
        return obj === obj + ''
      } else {
        return false
      }
    },
    composeValue (val, name) {
      return {val, name}
    },
    handleVlaue (val, name) {
      return {val, name}
    },
    openDia (menu) {
      this.$bus.$emit(menu.val)
      if (menu.val === 'audit_list') { // 跳转到审批列表页面
        this.openNavMenuItem('runtimeManage')
        this.isShowTips = false
      }
    },
    handleCommand (data) {
      data.name = 'DSAP'
      let val = data.val
      // let name = data.name
      localStorage.setItem('currentSystem', 'DSAP')
      if (val.slice(0, 4) === 'http') {
        window.location.href = val
      } else {
        if (val.search(':') !== -1) {
          let data = window.location.protocol + '//' + val
          window.location.href = this.getHttps(data)
        } else {
          if (window.location.host.search(':') !== -1) {
            let end = window.location.host.search(':')
            console.log(window.location.protocol + '//' + window.location.host.slice(0, end) + ':' + val)
            let data = window.location.protocol + '//' + window.location.host.slice(0, end) + ':' + val
            window.location.href = this.getHttps(data)
          } else {
            console.log(window.location.protocol + '//' + window.location.host + ':' + val)
            let data = window.location.protocol + '//' + window.location.host + ':' + val
            window.location.href = this.getHttps(data)
          }
        }
      }
    },
    getHttps (val) {
      if (val.slice(0, 5) === 'https') {
        var myReg = /.+:(\d{1,5})/
        var myResult = val.match(myReg)
        const begin = val.substr(0, val.lastIndexOf(':'))
        const end = val.substr(val.lastIndexOf(':') + 1 + myResult[1].length)
        console.log(begin + end)
        return begin + end
      } else {
        return val
      }
    },
    getUserInfo () { // 获取用户信息和权限菜单信息
      this.$axios({
        url: 'userRight/getUser'
      }).then(response => {
        console.log('getUser~~~:', response)
        if (response.data.status === '0') {
          this.getUserSystem(response.data.result.data.userName)
          if (this.isStringObject(response.data.result.data)) {
            let resUrl = response.data.result.data
            // let tempUrl = ''
            // if (resUrl.indexOf('7777') > -1) {
            //   tempUrl = resUrl
            // } else {
            //   tempUrl = window.location.origin + resUrl
            // }
            window.location.href = resUrl
            return false
          }
          let resultData = response.data.result.data

          const { userName } = resultData || {}
          this.$store.commit('USER_INFO', resultData) // 临时存放用户信息
          setWaterMark('DSAP', userName)
          this.$util.UserData = resultData
          this.getData(resultData)
          this.getAuditTips()
        } else if (response.data.status === 'E1001') { // 没有登录
          this.$util.logBackIn(response.data)
        } else {
          this.$message.error('暂无用户信息数据！')
        }
      }).catch(response => {
        // this.$message.error('用户信息获取失败! ')
      })
    },
    getAuditTips () {
      this.$axios({
        url: 'modelMotion/getApproveAndHandle'
      }).then(res => {
        const {APPROVE = 0, HANDLE = 0} = res.data
        this.approve = APPROVE
        this.handle = HANDLE
        if ((this.approve + this.handle) > 0) {
          this.isShowTips = true
        } else {
          this.isShowTips = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取菜单
    getData (resultData) {
      if (resultData.menuList.length > 0) {
        this.menuListArr = resultData.menuList
        this.getDefaultNavMenu(resultData.menuList) // 获取左侧的默认菜单
      } else {
        this.noMenuData = '您没有任何菜单权限，请联系各自的管理员开通！'
      }
      this.$bus.$emit('updateDialogModalBtn') // 更细任务详情的状态
    },
    logoutFun () { // 退出登录
      this.$confirm('是否确定要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在退出，请稍等！')
        this.$axios({
          url: 'user/logout'
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          console.log('logout~~~:', response)
          this.$store.commit('USER_INFO', {}) // 临时存放用户信息
          window.sessionStorage.removeItem('DSAP-userInfo') // 删除浏览器用户信息
          window.sessionStorage.removeItem('DSAP-sublineAllData') // 删除浏览器辅助线信息
          /**
           * 地址会有两种：
              1、/dsap/index.html
              2、http://testohs1.ceair.com:7777/oam/server/logout?end_url=http://172.20.42.143:7777/DSAP
          */
          // window.location.href = 'http://testohs1.ceair.com:7777/oam/server/logout?end_url=http://172.20.42.143:7777/DSAP'
          if (this.$util.isDefine(response.data.status)) {
            if (response.data.status === '0') {
              let resUrl = response.data.result.data
              // let tempUrl = ''
              // if (resUrl.indexOf('7777') > -1) {
              //   tempUrl = resUrl
              // } else {
              //   tempUrl = window.location.origin + resUrl
              // }
              window.location.href = resUrl
            } else if (response.data.status === 'E1001') { // 没有登录
              this.$util.logBackIn(response.data)
            } else {
              this.$message.error('退出登录失败！')
            }
          } else {
            // let tempUrl = ''
            // if (response.data.indexOf('7777') > -1) {
            //   tempUrl = response.data
            // } else {
            //   tempUrl = window.location.origin + response.data
            // }
            window.location.href = response.data
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          this.$message.error('退出登录失败! ')
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消退出操作！'
        // })
      })
    },
    systemClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible = false
            this.value = 'http://172.20.42.144:8080/DSAP/index.html#/home'
            done()
          })
          .catch(_ => {})
      }
  }
}
</script>

<style>
.el-menu--popup{
  padding: 0px !important;
  border-radius: 4px !important;
}
.main-content #elMain .task_bar {
  display: flex;
}
.main-content #elMain .task_bar.tips_red::after,
.el-dropdown-menu.task_bar_menu .el-dropdown-menu__item img.tips_red::after {
  content: '';
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 5px;
  position: absolute;
  top: -1px;
  right: -5px;
}
.el-dropdown-menu.task_bar_menu .el-dropdown-menu__item span span {
  display: none;
}
.el-dropdown-menu.task_bar_menu .el-dropdown-menu__item span.tips_red span {
  display: inline-block;
  color: #fff;
  font-weight: bold;
  width: 26px;
  height: 20px;
  border-radius: 13px;
  font-size: 12px;
  line-height: 20px;
  background-color: red;
  transform: scale(0.8);
  text-align: center;
}
.el-dropdown-menu.task_bar_menu .el-dropdown-menu__item {
  text-align: left;
  padding: 0 10px;
  width: 80px;
  font-size: 12px;
}
.el-dropdown-menu.task_bar_menu.tips_red .el-dropdown-menu__item {
  width: 100px;
}
.el-dropdown-menu.task_bar_menu .el-dropdown-menu__item img {
  vertical-align: middle;
}
/* .el-dropdown-menu.task_bar_menu .el-dropdown-menu__item:first-child {
  padding-left: 10px;
} */
.el-dropdown-menu.task_bar_menu img {
  width: 16px;
  height: 16px;
}
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    min-width: 60px !important;
}

.el-menu--popup-right-start{
    margin-left: 12px !important;
  }
.el-menu-vertical-msap:not(.el-menu--collapse) {
  width: 180px;
  padding-top: 15px;
  height: calc(100% - 15px);
  min-height: 300px;
  margin-bottom: 0;
  overflow: hidden;
  background-color: #2a436f;
  color: #fff;
}

.el-dropdown-menu__item--divided:before,
.el-menu,
.el-tooltip__popper.is-dark,
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background: #2a436f;
  color: #fff;
}

.el-tooltip__popper[x-placement^=right] .popper__arrow:after {
  border-right-color:  #2a436f;
}

.el-menu-item,
.el-submenu__title,
.el-submenu__title i,
.el-menu-item i,
.el-menu-item.is-active {
  color: #fff;
}

.el-menu-item.is-active,
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background: rgba(255,255,255,0.10);
}
.el-menu-item,
.el-submenu__title {
  height: 44px;
  line-height: 44px;
}

.todo-list-li {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-icon-menu:before {
  content: "";
  display: block;
  /*居中*/
  margin: 0 auto;
  /*自适应大小*/
  width: 1em;
  height: 1em;
  background-size: 100%!important;
}
/* 数据 */
.el-icon-data:before {
  background: url(../../assets/images/icon60.png) no-repeat center center;
}
/* 工程参数 */
.el-icon-paramOne:before {
  background: url(../../assets/images/icon61.png) no-repeat center center;
}
/* 分析参数 */
.el-icon-paramTwo:before {
  background: url(../../assets/images/icon62.png) no-repeat center center;
}
/* 事件 */
.el-icon-paramEvent:before {
  background: url(../../assets/images/icon62.png) no-repeat center center;
}
/* 分析 */
.el-icon-analysis:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
}
/* 数据挖掘 */
.el-icon-dataMining:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
}
/* APP */
.el-icon-app:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
}
/* 设置 */
/* .el-icon-setting:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
} */

/* 问题反馈 */
.el-icon-todoList:before {
  background: url(../../assets/images/icon_todo.png) no-repeat center center;
}
</style>

<style scoped>
.cm-popper__arrow{
  top: -6px;
  left: -12px;
  margin-right: 3px;
  border-top-width: 0;
  border-right-color: #2A436F;
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
  position: absolute;
  /* border-color: transparent; */
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-style: solid;
}
p.system_title {
  font-size: 14px!important;
  color: #fff!important;
}
.main-content #elMain .el-dropdown-link.el-dropdown-selfdefine {
  /* width: 101px; */
  display: inline-block;
  text-align: left
}
.cm-popper__arrow::after{
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-right-color: #2A436F;
  content: " ";
  border-width: 6px;
  position: absolute;
  display: block;
  border-color: transparent;
  border-style: solid;
}
.el-menu--popup-right-start{
  margin-left: 12px !important;
}
.logo-sy{
  margin-left: 20px;
}
.logo-bg{
  display: none;
}
/*头部*/
.el-header {
  position: absolute;
  width: 100%;
  top: 0;
  background-color: #2A436F;
  color: #FFFFFF;
  padding: 0 !important;
}
/*中间*/
.main-content {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.logo-div {
  width: 117px;
  height: 35px;
}
/*中间左侧部分*/
.el-aside {
  height: 100%;
  float:left;
  margin-bottom: 0;
  overflow: auto;
  background-color: #2A436F;
  color: #FFFFFF;
  position: relative;
}

/*中间右侧部分*/
.el-main-default {
  height: 100%;
  padding: 0;
}

.el-main-content {
  height: 100%;
  margin-left: 0px;
}

/*左侧菜单*/
.nav-menu-left {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
}
.todo-list {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 44px;
}

.nav-menu-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  cursor: pointer;
}

.nav-menu-item-active {
  background: rgba(255,255,255,0.10);
}

.nav-menu-item > img {
  margin: 12px 18px;
  width: 20px;
  height: 20px;
}

.nav-menu-header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height:44px;
}

.nav-menu-header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #d4d2d5;
}

/*头部左侧logo*/
.headerLogo {
  background-image:url(../../assets/images/icon1.png);
  background-size:cover;
  width: 35px;
  margin-right: 11px;
  cursor: pointer;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-360deg);
}

/*头部菜单*/
.nav-menu-header-right {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.nav-menu-header-title {
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.nav-menu-header-title-active {
  background: #F9F9F9;
  color: #3A6BB9;
}
.no-menu {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 36px;
}
.logout {
  position: fixed;
  right: 20px;
  cursor: pointer;
}

/* 窗口高度大于800px */
@media screen and (min-height: 800px) {
  .el-header {
    height: 44px !important;
  }
  .nav-menu-header-left {
    width: 64px;
    /* height: 45px; */
  }
  .logo-div {
    width: 116px;
  }
  .headerLogo {
    height: 45px;
    width: 35px;
  }
  .nav-menu-header-right {
    height: 40px;
  }
  .nav-menu-header-title {
    padding: 6px 20px;
    line-height: 22px;
    height: 22px;
  }
  .main-content {
    top: 44px;
  }
  .logout {
    top: 14px;
  }
}
/* 窗口高度小于800px */
@media screen and (max-height: 800px) {
  .el-header {
    height: 44px !important;
  }
  .nav-menu-header-left {
    width: 64px;
    /* height: 35px; */
  }
  .headerLogo {
    height: 44px;
    width: 25px;
  }
  .nav-menu-header-right {
    height: 34px;
  }
  .nav-menu-header-title {
    padding: 6px 20px;
    line-height: 22px;
    height: 22px;
  }
  .main-content {
    top: 44px;
  }
  .logout {
    top: 14px;
  }
}

</style>
