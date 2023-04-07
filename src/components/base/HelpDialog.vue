<template>
  <div class="help-dialog">
    <!-- <div class="help" @click="helpDialogVisible = true" title="帮助">
      <img src="../../assets/images/icon109.png" alt="帮助">
    </div> -->
    <el-dialog
      title="帮助"
      :visible.sync="helpDialogVisible"
    >
      <div slot="title" class="dialog-title">
        <span style="font-size: 18px; font-weight: bold;">帮助</span>
        <span style="margin-left: 10px; font-size: 14px; color: #333;font-weight: 700">项目中实际时间为GMT时间（格林威治时间 +0），非北京时间（东八区）</span>
      </div>
      <div class="help-container">
        <div class="help-tab df df-fr df-jc-sb df-ai-c">
          <div class="df df-jc-c df-ai-c df-f1 cp help-tab-br" title="数据模块" @click="changeTabImg('dataSourceModule')">
            <img src="../../assets/images/s1_s.png" alt="数据模块" v-show="currentModule === 'dataSourceModule'">
            <img src="../../assets/images/s1_u.png" alt="数据模块" v-show="currentModule !== 'dataSourceModule'">
          </div>
          <div class="df df-jc-c df-ai-c df-f1 cp help-tab-br" title="工程参数模块" @click="changeTabImg('paramOneModule')">
            <img src="../../assets/images/s2_s.png" alt="工程参数模块" v-show="currentModule === 'paramOneModule'">
            <img src="../../assets/images/s2_u.png" alt="工程参数模块" v-show="currentModule !== 'paramOneModule'">
          </div>
          <div class="df df-jc-c df-ai-c df-f1 cp help-tab-br" title="分析参数模块" @click="changeTabImg('paramTwoModule')">
            <img src="../../assets/images/s3_s.png" alt="分析参数模块" v-show="currentModule === 'paramTwoModule'">
            <img src="../../assets/images/s3_u.png" alt="分析参数模块" v-show="currentModule !== 'paramTwoModule'">
          </div>
          <div class="df df-jc-c df-ai-c df-f1 cp" title="分析模块" @click="changeTabImg('analysisModule')">
            <img src="../../assets/images/s4_s.png" alt="分析模块" v-show="currentModule === 'analysisModule'">
            <img src="../../assets/images/s4_u.png" alt="分析模块" v-show="currentModule !== 'analysisModule'">
          </div>
        </div>
        <div class="help-content" ref="helpContent">
          <div class="help-img-content">
            <img src="../../assets/images/s1_c.png" alt="数据模块" v-show="currentModule === 'dataSourceModule'">
            <img src="../../assets/images/s2_c.png" alt="工程参数模块" v-show="currentModule === 'paramOneModule'">
            <img src="../../assets/images/s3_c.png" alt="分析参数模块" v-show="currentModule === 'paramTwoModule'">
            <img src="../../assets/images/s4_c.png" alt="分析模块" v-show="currentModule === 'analysisModule'">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'HelpDialog',
  data () {
    return {
      helpDialogVisible: false,
      currentModule: 'dataSourceModule' // 当前点击的模块
    }
  },
  mounted () {
    this.$bus.$on('help_manual', () => {
      this.helpDialogVisible = true
    })
  },
  methods: {
    changeTabImg (tabType) {
      this.currentModule = tabType
      this.$refs.helpContent.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.help {
  position: fixed;
  right: 60px;
  cursor: pointer;
}
/* .help img {
  transform: scale(1.2);
} */
/* 窗口高度大于800px */
@media screen and (min-height: 800px) {
  .help {
    top: 14px;
  }
}
/* 窗口高度小于800px */
@media screen and (max-height: 800px) {
  .help {
    top: 14px;
  }
}
.help-dialog >>> .el-dialog {
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.help-dialog >>> .el-dialog__body {
  padding: 0;
  display: flex;
  flex: 1;
  min-height: 0;
}
.help-dialog >>> .el-dialog__header {
  border-bottom: 1px solid #DDDDDD;
}
.help-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.help-container >>> img {
  filter: brightness(0.8)
}
.help-tab {
  position: relative;
  width: 100%;
  height: 80px;
}
.help-tab-br {
  border-right: 1px solid #DDDDDD;
}
.help-content {
  position: relative;
  overflow-y: auto;
  width: 100%;
  height: 80%;
  margin-top: 20px;
}
.help-content .help-img-content {
  position: relative;
  width: 94%;
}
.help-content .help-img-content > img {
  border-style: none;
  width: auto\9;
  height: auto;
  max-width: 100%;
  vertical-align: top;
  -ms-interpolation-mode: bicubic;
}
</style>
