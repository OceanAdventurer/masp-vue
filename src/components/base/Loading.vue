<style scoped>
.el-loading-mask {
  position: absolute;
  z-index: 999999;
  background-color: hsla(0,0%,100%,.4);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity .3s;
}

.el-loading-spinner {
  top: 50%;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
.el-loading-spinner .circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
.el-loading-spinner .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
.el-loading-spinner .el-loading-text {
  color: #409eff;
  margin: 3px 0;
  font-size: 12px;
}
</style>

<template>
  <div class="el-loading-mask">
    <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <p class="el-loading-text">{{ this.$store.state.loadingText }}</p>
    </div>
  </div>
</template>
