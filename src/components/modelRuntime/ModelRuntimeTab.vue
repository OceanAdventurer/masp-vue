<template>
  <div class="safe_content w100 h100">
    <div class="w100 h100" v-if='tabName === "modelRuntime_approve"'>
      <ModelApprove></ModelApprove>
    </div>
  </div>
</template>
<script>
const ModelApprove = () => import('components/modelRuntime/ModelApprove')

export default {
  data () {
    return {
      tabName: ''
    }
  },
  components: {
    ModelApprove
  },
  mounted () {
    this.$bus.$on('modelRuntimeMenu', (val) => {
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
