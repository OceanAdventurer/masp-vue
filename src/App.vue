<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Heiti SC", "Helvetica Neue", Helvetica, Arial, "WenQuanYi Micro Hei", sans-serif;
  font-size: 12px;
  color: #555555;
  letter-spacing: 0.29px;
  line-height: 14px;
  -webkit-font-smoothing: antialiased; /*字体抗锯齿渲染*/
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.el-dialog__wrapper .el-dialog__header {
  border-bottom: 1px solid #f1f1f1;
}
.el-dialog__wrapper .el-dialog__footer {
  border-top: 1px solid #f1f1f1;
}
</style>
