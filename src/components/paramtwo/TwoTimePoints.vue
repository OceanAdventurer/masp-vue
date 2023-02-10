<style scoped>
  .label_time {
    width:100%;
    height:28px;
    line-height:28px;
    display:flex;
    flex-direction:row;
  }

  .time_btn {
    width:80px;
    height:28px;
    line-height:28px;
    background-color:#2A436F;
    font-size:12px;
    color:#fff;
    border-radius:3px;
    margin-left:5px;
    text-align:center;
  }

  .time_btn:hover {
    background-color: #66b1ff;
    cursor: pointer;
  }
</style>
<template>
  <div style="width: 100%;height: 100%;">
    <el-form ref="form" :model="formData" label-width="20%" size="mini" style="margin-top: 50px;">
      <el-form-item label="选择时间点1：">
        <div class="label_time">
          <el-input v-model="formData.timePointOne" style="width: 60%" readonly="readonly" ></el-input>
          <!-- <el-button type="primary" size="mini" @click="checkTimePoint">时间节点</el-button> -->
          <div class="time_btn" @click="checkTimePoint" v-show="isCurrentUser && !isLinkParam">时间节点</div>
        </div>
      </el-form-item>
      <el-form-item label="选择时间点2：">
        <div class="label_time">
          <el-input v-model="formData.timePointTwo" style="width: 60%"  readonly="readonly" ></el-input>
          <!-- <el-button type="primary" size="mini" @click="checkTimePoint2">时间节点</el-button> -->
          <div class="time_btn" @click="checkTimePoint2"  v-show="isCurrentUser && !isLinkParam">时间节点</div>
        </div>
      </el-form-item>
      <!--<el-form-item label="选择工程参数：">
        <el-input v-model="formData.columnName" style="width: 60%"></el-input>
        <el-button type="primary" size="mini" @click="checkColumnName">工程参数</el-button>
      </el-form-item>
      <el-form-item label="选择聚合参数：">
        <el-select v-model="formData.aggregate" placeholder="请选择" style="width: 60%" @change="selectOptions">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type: '2',
      showFormulaName: false,
      activeName: 'setTimePoint',
      rightTabActive: 'rightShuxing',
      params: {},
      parentId: '-1', // 默认父节点id
      btnFlag: '' // 保存事件标识默认值
    }
  },
  watch: {
  },
  props: ['formData', 'isLinkParam', 'isCurrentUser'],
  mounted () {
  },
  methods: {
    // 点击时间点1输入框
    checkTimePoint () {
      this.$emit('treeType', 'shijiandian1')
    },
    // 第二个时间点
    checkTimePoint2 () {
      this.$emit('treeType', 'shijiandian2')
    }
  }
}
</script>
