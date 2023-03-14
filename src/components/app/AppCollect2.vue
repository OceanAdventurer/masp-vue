<!--
 * @Author: wanghaoxin
 * @Date: 2021-11-05 14:16:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-01 09:22:49
 * @Description: file content
 * @FilePath: /msap-bi2/MASP-VUE/src/components/app/AppCollect.vue
-->
<template>
  <div class="collect df df-fd-r df-jc-fs">
    <div class="tag risk">
      <a href="http://172.28.26.58:9092/index.html" target="_blank" rel="noopener noreferrer">
        <div style="padding-top:85px;padding-bottom:2px">飞行运行风险看板</div>
        <div style="font-size: 10px;color: #FFFFFF;opacity: 0.8;">出品方：研发中心 </div>
      </a>
    </div>

    <div class="tag  qarEvent">
      <a href="http://msap-eval.ceair.com:7779/index.html" target="_blank" rel="noopener noreferrer">
        <div style="padding-top:85px;padding-bottom:2px">QAR事件讲评</div>
        <div style="font-size: 10px;color: #FFFFFF;opacity: 0.8;">出品方：上航 </div>
      </a>
    </div>
    <div class="tag  qarEvent">
      <a :href="airWater" target="_blank" rel="noopener noreferrer">
        <div style="padding-top:85px;padding-bottom:2px">航班水量管理平台</div>
        <div style="font-size: 10px;color: #FFFFFF;opacity: 0.8;">出品方：运控中心 </div>
      </a>
    </div>
    <div class="tag  qarProject">
      <a href="http://10.18.6.43:8091/index.html#/home" target="_blank" rel="noopener noreferrer">
        <div style="padding-top:85px;padding-bottom:2px">QAR综合查询系统</div>
        <div style="font-size: 10px;color: #FFFFFF;opacity: 0.8;">出品方：飞管部 </div>
      </a>
    </div>
    <div class="tag  qarProject">
      <a href="http://10.18.6.43:8092/index.html#/Login" target="_blank" rel="noopener noreferrer">
        <div style="padding-top:85px;padding-bottom:2px">运控航线监测</div>
        <div style="font-size: 10px;color: #FFFFFF;opacity: 0.8;">出品方：运控中心 </div>
      </a>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AppCollect',
  data () {
    return {
      airWater: process.env.NODE_ENV === 'production' ? '' : 'http://10.18.21.122:8090/index.html#/login'
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
.collect {
  position: absolute;
  height: 100%;
  width: 100%;
}
.tag{
  width: 244px;
  height: 140px;
  /* line-height: 180px; */
  margin: 20px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  color: #f2f6fc;
}

.tag a {
  position: relative;
  display: block;
  color: #f2f6fc;
  text-decoration: none;
}
.tag a:link, /* 未访问链接 */
.tag a:hover, /* 鼠标移到链接上 */
.tag a:active, /* 激活时 */
.tag a:visited { /* 已访问链接 */
  color: #faf6fc;
}
.risk{
  background-image: url(../../assets/images/riskKanban.png);
}
.qarEvent{
  background-image: url(../../assets/images/QAREventEvaluation.png);
}
.qarProject{
  background-image: url(../../assets/images/masp-qarProject.png);
  border-radius: 8px;
}
</style>
