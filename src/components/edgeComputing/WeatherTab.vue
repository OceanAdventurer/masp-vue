<template>

<!--  // 天气三级菜单-->
<!--  <div class="header-tab" v-if="weatherTabs.length > 0">-->
<!--    <el-tabs v-model="weatherTabsValue" type="card">-->
<!--      <el-tab-pane-->
<!--        v-for="item in weatherTabs"-->
<!--        :key="item.name"-->
<!--        :label="item.title"-->
<!--        :name="item.name"-->
<!--        :closable="item.isClosable"-->
<!--        :id="item.enName"-->
<!--        :parent="item.parent"-->
<!--      >-->
<!--        <div v-if="item.content === 'flight_weather'">-->
<!--          <FlightWeather></FlightWeather>-->
<!--        </div>-->
<!--        <div v-else-if="item.content === 'airport_weather'">-->
<!--          <AirportWeather></AirportWeather>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--          {{ item.title }}-->
<!--          {{ item.content }}-->
<!--        </div>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
<!--  </div>-->
  <div v-if="showType === 'flight_weather'">
    <FlightWeather></FlightWeather>
  </div>
  <div v-else-if="showType === 'airport_weather'">
    <AirportWeather></AirportWeather>
  </div>
  <div v-else></div>
</template>
<script>
const FlightWeather = () => import('components/edgeComputing/FlightWeather')
const AirportWeather = () => import('components/edgeComputing/AirportWeather')

export default {
  data () {
    return {
      showType: 'flight_weather',
      weatherTabsValue: '1',
      weatherTabs: [],
      tabIndex: 1
    }
  },
  components: {
    FlightWeather,
    AirportWeather
  },
  mounted () {
    this.$bus.$on('weatherAddTab', (obj) => {
      this.addSettingTab(obj)
    })
    this.addSettingTab({enName: 'flight_weather', zhName: '航班天气', isClosable: false, parent: 'weather_flight'})
  },
  props: [
    'menuListObj'
  ],
  methods: {
    addSettingTab (obj) { // 添加tab标签
      this.showType = obj.enName
      let newTabName = ++this.tabIndex + ''
      this.weatherTabs = [{
        title: obj.zhName,
        name: newTabName,
        content: obj.enName,
        isClosable: obj.isClosable,
        enName: obj.enName,
        parent: obj.parent
      }]
      this.weatherTabsValue = newTabName
    }
  }
}
</script>
