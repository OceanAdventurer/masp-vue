<style scoped>

</style>
<template>
  <!-- 测量值之工程参数在时间段的聚合值 -->
  <div style="width: 100%;height: 100%;">
      <el-form ref="form" :model="formData" label-width="20%" size="mini" style="margin-top: 15px;padding-left: 10px;">
        <el-form-item label="选择时间段：">
          <el-input v-model="formData.interval"  @click.native="checkTimeSlot" readonly="readonly" style="width: 60%;float: left"></el-input>
          <el-button type="primary" size="mini" @click="checkTimeSlot" style="float: left;margin-left: 10px;" v-show="isCurrentUser && !isLinkParam">时间段</el-button>
        </el-form-item>
        <el-form-item label="选择工程参数：">
          <el-input v-model="formData.intervalColumnName"  @click.native="checkColumnName" readonly="readonly" style="width: 60%;float: left"></el-input>
          <el-button type="primary" size="mini" @click="checkColumnName" style="float: left;margin-left: 10px;" v-show="isCurrentUser && !isLinkParam">工程参数</el-button>
        </el-form-item>
        <el-form-item label="选择聚合参数：">
          <el-select v-model="formData.intervalAggregate" placeholder="请选择" style="width: 60%;float: left" v-if="isCurrentUser && !isLinkParam">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="formData.intervalAggregate" placeholder="请选择" style="width: 60%;float: left"  v-else disabled="disabled">
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
          label: '最大值', value: 'max'
        },
        {
          label: '最大绝对值', value: 'maxAbs'
        },
        {
          label: '最小值', value: 'min'
        },
        {
          label: '最小绝对值', value: 'minAbs'
        },
        {
          label: '求和', value: 'sum'
        },
        {
          label: '平均值', value: 'avg'
        },
        {
          label: '众数最大值', value: 'maxValueOfMostTimes'
        }, {
          label: '众数最小值', value: 'minValueOfMostTimes'
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
    // 时间段
    checkTimeSlot () {
      if (this.isCurrentUser && !this.isLinkParam) {
        this.$emit('treeType', 'checkTimeSlot')
      }
    },
    // 点击工程参数输入框
    checkColumnName () {
      if (this.isCurrentUser && !this.isLinkParam) {
        this.$emit('treeType', 'gcparam')
      }
    }
  }
}
</script>
