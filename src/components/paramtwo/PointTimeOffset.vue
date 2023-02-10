<style scoped>
</style>
<template>
  <div style="width: 100%;height: 100%;">
    <el-form ref="form" :model="formData"  size="mini" style="margin-top: 50px; margin-left: 10%;">
      <el-form-item label="选择时间点：">
        <el-input v-model="formData.timePoint" style="width: 40%;float: left;margin-right: 5px;"  readonly="readonly" ></el-input>
        <el-input-number size="mini"  v-model="formData.number" style="width: 22%;float: left"  v-if="!isLinkParam && isCurrentUser"></el-input-number>
        <el-input-number size="mini"  v-model="formData.number" style="width: 22%;float: left;" v-else  disabled="disabled"  ></el-input-number>
        <div style="line-height: 30px;float: left;margin-left: 5px">秒</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    watch: {
    },
    props: ['formData', 'isLinkParam', 'isCurrentUser'],
    mounted () {
    },
    methods: { // 根据
    }
  }
</script>
