<template>
<div class="changeLog-dialog">
    <div class="changeLog" @click="changeLogDialogVisible = true" title="变更日志">
      <img src="../../assets/images/icon125.png" alt="变更日志">
    </div>
    <el-dialog
      title="帮助"
      :visible.sync="changeLogDialogVisible"
    >
      <div slot="title" class="dialog-title">
        <span style="font-size: 18px; font-weight: bold;">变更日志</span>
      </div>
      <div class="changeLog-container">
        <ChangeLogGrid></ChangeLogGrid>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入 ChangeLogGrid 组件
const ChangeLogGrid = () => import('components/changeLogList/ChangeLogGrid')

export default {
  name: 'ChangeLogDialog',
  components: { // 注册子组件
    ChangeLogGrid
  },
  data () {
    return {
      changeLogDialogVisible: false
    }
  },
  created () { // 在实例创建完成后被立即调用

  },
  methods: {

  }
}
</script>

<style scoped>
.changeLog {
  position: fixed;
  right: 100px;
  cursor: pointer;
}
.changeLog img {
  width: 16px;
  height: 16px;
}
/* 窗口高度大于800px */
@media screen and (min-height: 800px) {
  .changeLog {
    top: 15px;
  }
}
/* 窗口高度小于800px */
@media screen and (max-height: 800px) {
  .changeLog {
    top: 15px;
  }
}
.changeLog-dialog >>> .el-dialog {
  width: 80%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.changeLog-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex: 1;
  min-height: 0;
}
.changeLog-dialog >>> .el-dialog__header {
  border-bottom: 1px solid #DDDDDD;
}
.changeLog-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.changeLog-tab {
  position: relative;
  width: 100%;
  height: 80px;
}
.changeLog-tab-br {
  border-right: 1px solid #DDDDDD;
}
.changeLog-content {
  position: relative;
  overflow-y: auto;
  width: 100%;
  height: 80%;
  margin-top: 20px;
}
.changeLog-content .changeLog-img-content {
  position: relative;
  width: 94%;
}
.changeLog-content .changeLog-img-content > img {
  border-style: none;
  width: auto\9;
  height: auto;
  max-width: 100%;
  vertical-align: top;
  -ms-interpolation-mode: bicubic;
}
</style>
