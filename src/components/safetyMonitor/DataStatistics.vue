<template>
  <div class="data-statistics">
    请前往新的标签页查看【数据统计】报表，如果跳转失败，请点击【
    <el-link type="primary" @click="init">数据统计</el-link>
    】查看。
  </div>
</template>
<script>

export default {
  name: 'DataStatistics',
  components: {},
  data () {
    return {
      url: '/dsap/safetyMonitor/tableauView'
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  watch: {},
  methods: {
    init () {
      window.open(this.url, '_blank')
    }
  }
}
</script>
<style scoped>
.data-statistics {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
