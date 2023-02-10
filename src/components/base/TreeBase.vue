<template>
  <div class="tree-expand" :title="data.DESCRIPTION ? data.DESCRIPTION : data.NAME">
    <div class="tree-info" v-show="!data.status">
      <div class="tree-img-set tree-folder" v-show="data.CHILDREN"></div>
      <div class="tree-label" >
        <div class="tree-text-line">{{data.NAME}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentData: this.data,
      userInfo: {},
      statusLock: '', // 编辑锁定状态
      saveStatus: false
    }
  },
  computed: {
  },
  props: [
    'data',
    'node'
  ],
  methods: {
  },
  mounted () { // 点击其他目录节点时新增，则input重新获取焦点
  }
}
</script>
<style scoped>
.tree-img-set {
  background-size: cover;
  width: 16px !important;
  height: 15px;
  margin: 5px 0;
}
.tree-expand {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 24px;
}
.tree-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.tree-folder {
  background-image: url(../../assets/images/icon68.png);
  /*margin-right: 10px;*/
  margin-right: 5px;
  width: 16px;
}
.tree-more {
  background-image: url(../../assets/images/icon72.png);
  position: absolute;
  right: 20px;
}
.tree-btn-group, .tree-tip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  display: none;
}
.tree-tip {
  display: flex;
  font-size: 12px;
  transform: scale(.8);
  border: 1px solid #000;
  margin-right: 14px;
}
.tree-expand:hover .tree-btn-group {
  display: flex;
}
.tree-btn {
  display: block;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 15px;
  border-radius: 2px;
  background: #FFFFFF;
  box-shadow:0px 0px 1px 1px #DDDDDD;
  display: none;
  z-index: 99;
}
.tree-btn-group:hover .tree-btn {
  display: flex;
}
.tree-btn-arrow::after,.tree-btn-arrow::before {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #FFFFFF;
  position: absolute;
  top: -18px;
  content: "";
  right: 6px;
}
.tree-btn-arrow::before {
  border-bottom-color: #DDDDDD;
  right: 6px;
  top: -20px;
}

.tree-btn-plus-p {
  background-image: url(../../assets/images/icon73.png);
}
.tree-btn-plus-c {
  background-image: url(../../assets/images/icon74.png);
}
.tree-btn-edit {
  background-image: url(../../assets/images/icon70.png);
}
.tree-btn-delete {
  background-image: url(../../assets/images/icon71.png);
}
.tree-btn-rnme {
  background-image: url(../../assets/images/icon6_1.png);
}
.input_inner-set {
  position: relative;
  display: inline-block;
  height: 20px;
  /* width: 120px; */
  width: 100%;
  line-height: 20px;
  border: 1px solid #DDDDDD;
  color: #555555;
  font-size: 12px;
  padding: 0 10px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.tree-text-line {
  line-height: 20px;
}
.tree-expand >>> .el-input__inner {
  position: relative;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  border: 1px solid #DDDDDD;
  color: #555555;
  font-size: 12px;
  padding: 0 10px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.tree-expand >>> .el-button--mini {
  padding: 4px 15px;
  margin-left: 5px;
}

.tree-btn-group .tree-btn .tree-label {
  padding-left: 10px;
}
.tree-btn-group .tree-btn .tree-info {
  text-align: left;
  margin: 0 8px;
  overflow: hidden;
}
</style>
