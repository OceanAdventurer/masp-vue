<template>
  <div class="subline-dialog">
    <el-dialog title="添加辅助线" :visible.sync="dialogSublineVisible" @close="closeSublineDialog">
      <div class="df df-f1 pos-r w100">
        <!-- <AddNewFileParam :pageMenuType="pageMenuType"></AddNewFileParam> -->
        <SublineParam :pageMenuType="pageMenuType"></SublineParam>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// const AddNewFileParam = () => import('components/analysis/file/AddNewFileParam')
const SublineParam = () => import('components/analysis/file/SublineParam')

export default {
  name: 'AddSubline',
  components: {
    // AddNewFileParam
    SublineParam
  },
  data () {
    return {
      dialogSublineVisible: false, // 是否显示添加辅助线dialog
      pageMenuType: 'AddSubline' // 添加辅助线菜单打开的页面
    }
  },
  mounted () {
    const that = this
    this.$bus.$on('sublineDialogHandler', (parentName, selfName, type) => { // 点击分析结果页面中表格tab对应的二级菜单中的钻取按钮
      that.dialogSublineVisible = true
    })
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$bus.$off('sublineDialogHandler') // 移除自定义事件监听器。
  },
  methods: {
    closeSublineDialog () { // 关闭dialog时内部状态赋值默认值
      this.dialogSublineVisible = false
    }
  }
}
</script>
<style scoped>
.subline-dialog >>> .el-dialog {
  margin: 5vh auto !important;
  width: 95%;
  height: 90vh;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.subline-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 90%;
}
.subline-dialog >>> .el-dialog__header {
  border-bottom: 1px solid #DDDDDD;
}
</style>
