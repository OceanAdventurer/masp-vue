<style scoped>

</style>
<template>
  <!-- 测量值之工程参数在时间段的聚合值 -->
  <div style="width: 100%;height: 100%;">
    <el-form ref="form" :model="formData" label-width="20%" size="mini" style="margin-top: 50px;padding-left: 10px;">
      <el-form-item label="选择时间点1：">
        <el-input v-model="formData.timePointOne" @click.native="checkTimePoint" readonly="readonly" style="width: 60%;float: left"></el-input>
        <el-button type="primary" size="mini" @click="checkTimePoint" style="float: left;margin-left: 10px;" v-show="isCurrentUser && !isLinkParam">时间节点</el-button>
      </el-form-item>
      <el-form-item label="选择时间点2：">
        <el-input v-model="formData.timePointTwo"  @click.native="checkTimePoint2" readonly="readonly" style="width: 60%;float: left"></el-input>
        <el-button type="primary" size="mini" @click="checkTimePoint2" style="float: left;margin-left: 10px;" v-show="isCurrentUser && !isLinkParam">时间节点</el-button>
      </el-form-item>
      <el-form-item label="选择工程参数：">
        <el-input v-model="formData.columnName"  @click.native="checkColumnName" readonly="readonly" style="width: 60%;float: left"></el-input>
        <el-button type="primary" size="mini" @click="checkColumnName" style="float: left;margin-left: 10px;" v-show="isCurrentUser && !isLinkParam">工程参数</el-button>
      </el-form-item>
      <el-form-item label="选择聚合参数：">
        <el-select v-model="formData.aggregate" placeholder="请选择" style="width: 60%;float: left"  :disabled="!isCurrentUser || isLinkParam">
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
      zhongshuList: [
      ],
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
  mounted () {
  },
  methods: {
    // 点击时间点输入框
    checkTimePoint () {
      if (this.isCurrentUser && !this.isLinkParam) {
        this.$emit('treeType', 'timePoint1')
      }
    },
    // 第二个时间点
    checkTimePoint2 () {
      if (this.isCurrentUser && !this.isLinkParam) {
        this.$emit('treeType', 'timePoint2')
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
