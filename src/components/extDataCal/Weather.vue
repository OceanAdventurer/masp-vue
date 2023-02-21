// 外部数据边缘计算-天气
<template>
  <div class="weather_header_tab w100 h100" v-if="Tabs.length > 0">
    <!-- <el-tabs v-model="tabValue" style="height:100%" type="card">
      <el-tab-pane
        v-for="item in Tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.isClosable"
        :id="item.enName"
        :parent="item.parent"
      > -->
        <!-- <div class='weatherContainer w100 h100'> -->
          <!-- test -->
          <iframe src="/csap/user/ssoDMS?type=2" class="weatherContent w100 h100" scrolling='no'></iframe>
        <!-- </div> -->
      <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
  </div>
</template>
<script>
// 按需异步加载组件，打包时减少体积

export default {
  name: 'WeatherTab',
  data () {
    return {
      tabValue: '1',
      Tabs: [
        {
        title: '天气',
        name: '天气',
        content: 'weather',
        isClosable: false,
        enName: 'index',
        parent: 'weather'
      }]
    }
  },
  components: {
    // Weather
  },
  created () {
  },
  mounted () {
    this.addTable({enName: 'index', zhName: '天气', isClosable: false, parent: 'weather'})
    this.$bus.$on('weatherMenu', () => {
      this.getMenueByenName(this.activeName)
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('weatherMenu')
  },
  watch: {},
  methods: {
    getMenueByenName (enName) {
      var hideMenuObj = { // 不显示二级菜单的数据；如果需要不显示某些二级菜单，在这里请把二级菜单的键值设置false；如果都显示，则下面的方法直接传空对象即为：{}
        // 'analysis_file_open': false
      }
      var disabledMenuObj = { // 禁用二级菜单的数据；如果需要禁用某些二级菜单，在这里请把二级菜单的键值设置false；如果都不禁用，则下面的方法直接传空对象即为：{}
        // 'analysis_file_copy': false
      }
      console.log(enName, 'enName----test')
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
    }
  }
}
</script>
<style scoped>
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
</style>
