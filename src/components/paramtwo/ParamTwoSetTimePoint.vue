<style scoped>

</style>
<template>
  <div style="width: 100%;height: 100%;">
    <el-form ref="form" :model="formData" label-width="20%" size="mini" style="margin-top: 50px;">
      <el-form-item label="选择时间点：">
        <el-input v-model="formData.timePoint"   readonly="readonly"  style="width: 60%;float: left;"></el-input>
        <el-button type="primary" size="mini" @click="checkTimePoint" style="float: left;margin-left: 20px;" v-show="isCurrentUser && !isLinkParam">时间节点树</el-button>
      </el-form-item>
      <el-form-item label="选择工程参数：">
        <el-input v-model="formData.columnName1"   readonly="readonly"  style="width: 60%;float: left;" ></el-input>
        <el-button type="primary" size="mini" @click="checkColumnName" style="float: left;margin-left: 20px" v-show="isCurrentUser && !isLinkParam">工程参数树</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: '',
      params: {},
      urlFlag: '',
      searchShow: true, // 树节点搜索框
      filterText: '',
      gpId: '', // 子节点id
      parentId: '-1', // 默认父节点id
      treeType: ''
    }
  },
  props: ['formData', 'isLinkParam', 'isCurrentUser'],
  watch: {
  },
  mounted () {
  },
  methods: {
    // 点击时间点输入框
    checkTimePoint () {
      this.$emit('treeType', 'timePoint')
    },
    // 点击工程参数输入框
    checkColumnName () {
      this.$emit('treeType', 'paramone')
    }
  }
}
</script>
