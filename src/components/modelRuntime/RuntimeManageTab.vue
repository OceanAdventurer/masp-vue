<template>
  <div class="safe_content w100 h100">
    <div class="w100 h100" v-if='tabName === "runtimeManage_approve"'>
      <ModelApprove></ModelApprove>
    </div>
    <div class="w100 h100" v-if='tabName === "runtimeManage_handle"'>
      <ModelHandle></ModelHandle>
    </div>
    <div class="w100 h100" v-if='tabName === "runtimeManage_onlineOffline"'>
      <ModelOnlineOffline></ModelOnlineOffline>
    </div>
  </div>
</template>
<script>
const ModelApprove = () => import('components/modelRuntime/ModelApprove')
const ModelHandle = () => import('components/modelRuntime/ModelHandle')
const ModelOnlineOffline = () => import('components/modelRuntime/ModelOnlineOffline')

export default {
  data () {
    return {
      tabName: ''
    }
  },
  components: {
    ModelApprove,
    ModelHandle,
    ModelOnlineOffline
  },
  mounted () {
    this.$bus.$on('runtimeManageMenu', (val) => {
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
