<style scoped>

</style>
<template>
  <!-- 测量值之工程参数在时间段的聚合值 -->
  <div style="width: 100%;height: 100%;">
      <el-form ref="form" :model="formData" label-width="20%" size="mini" style="margin-top: 15px;padding-left: 10px;">
        <el-form-item label="选择筛选方式：">
          <el-input v-model="formData.screeningType" readonly="readonly" style="width: 80%;float: left"></el-input>
        </el-form-item>
        <el-form-item label="选择统计方式：">
          <el-select v-model="formData.statistical" placeholder="请选择" style="width: 80%;float: left" :disabled="!isCurrentUser || isLinkParam">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      urlFlag: '', // 1 时间节点1 2 时间节点2  3 工程参数
      type: '3',
      options: [
        {
          label: '统计次数', value: 'TWO_DIMENSION_NAME'
        }
      ],
      showFormulaName: false,
      activeName: 'setTimePoint',
      rightTabActive: 'rightShuxing',
      gpId: '', // 子节点id
      parentId: '-1', // 默认父节点id
      tabProfileName: '', // tab的name
      tabProfileLabel: '', // tab 的label
      tableLoading: false,
      profileObj: [],
      btnFlag: '', // 保存事件标识默认值
      treeType: ''
    }
  },
  watch: {
  },
  props: ['formData', 'isLinkParam', 'isCurrentUser'],
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
