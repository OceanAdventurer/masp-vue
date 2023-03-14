<template>
  <div class="weui-div" @click="toggle">
    <span class="weui-switch" :class="{'weui-switch-on' : me_checked}" :value="value" ></span>
    <div v-if='value' class="weui-div-2"></div>
    <div v-if='!value' class="weui-div-1"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      me_checked: this.value
    }
  },
  props: ['value'],
  watch: {
    value () {
      alert(this.value)
      this.me_checked = this.value
    }
  },
  methods: {
    toggle () {
      // 是否可点击
        this.$emit('changeSwitch', this.me_checked)
    }
  }
}
</script>
<style>
.weui-div{
  position:relative;
  font-weight: bold;
  cursor:pointer;
  width: 60px;
  height: 22px;
}
.weui-div-1{
  position:absolute;
  left:10px;
  top:0;
  line-height:22px;
  font-size:12px;
  color:#333333;
}
.weui-div-2{
  position:absolute;
  right:11px;
  top:0;
  line-height:22px;
  font-size:12px;
  color: rgb(19, 206, 102);
}
.weui-switch {
  display: block;
  position: relative;
  width: 60px;
  height: 22px;
  border: 1px solid #DFDFDF;
  outline: 0;
  border-radius: 11px;
  box-sizing: border-box;
  background-color: #DFDFDF;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.weui-switch:before {
  content: " ";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 58px;
  height: 20px;
  border-radius: 10px;
  background-color: #E6E6E6;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
  content: " ";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 17px;
  height: 17px;
  border-radius: 8.5px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-on {
  border-color:  rgb(19, 206, 102);
  background-color:  rgb(19, 206, 102);
}
.weui-switch-on:before {
  border-color:  rgb(19, 206, 102);
  background-color:  rgb(19, 206, 102);
}
.weui-switch-on:after {
  transform: translateX(40px);
}
</style>
