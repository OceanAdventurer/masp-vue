<template>
  <div class="safe_content w100 h100">
    <div class="w100 h100" v-if='tabName === "safetyMonitor_stats"'>
      <DataStatistics></DataStatistics>
    </div>
    <div class="w100 h100" v-else-if="tabName === 'safetyMonitor_userData'">
      <UserData></UserData>
    </div>
    <div class="w100 h100" v-else-if="tabName === 'safetyMonitor_userLog'">
      <UserLog></UserLog>
    </div>
  </div>
</template>
<script>
const DataStatistics = () => import('components/safetyMonitor/DataStatistics')
const UserData = () => import('components/safetyMonitor/UserData')
const UserLog = () => import('components/safetyMonitor/UserLog.vue')

export default {
  data () {
    return {
      tabName: ''
    }
  },
  components: {
    DataStatistics,
    UserData,
    UserLog
  },
  mounted () {
    this.$bus.$on('safetyMonitorMenu', (val) => {
      this.tabName = val
    })
  },
  methods: {}
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
