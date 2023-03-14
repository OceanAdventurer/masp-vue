<template>
  <!-- app分类 -->
  <div class="collect df df-fd-r df-jc-fs">
    <div v-for="(appItem,index) in dataList" :key="index" class="tag" :class="appItem.PICTURE_LOCATION">
      <a :href="appItem.HREF" target="_blank" rel="noopener noreferrer">
        <div class="appName">{{ appItem.NAME }}</div>
        <div class="appTitle">{{ appItem.APP_TITILE }}</div>
      </a>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AppCollect',
  data () {
    return {
      dataList: []
    }
  },
  components: {
  },
  mounted () {
    this.initData()
  },
  methods: {
    // 获取app数据
    initData () {
      this.$store.commit('SHOW_LOADING', '拼命加载中！')
      this.$axios({
        url: '/appClassify/getAppClassifyList',
        method: 'get'
      }).then(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.dataList = res.data || []
      })
        .catch(() => {
          this.$store.commit('HIDE_LOADING', '拼命加载中!')
          this.$message.error('加载数据失败！')
        })
    }
  }
}
</script>
<style scoped>
.appName {
  padding-top:85px;
  padding-bottom:2px
}
.appTitle {
  font-size: 10px;
  color: #FFFFFF;
  opacity: 0.8
}
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
.riskKanban{
  background-image: url(../../assets/images/riskKanban.png);
  border-radius: 8px;
}
.QAREventEvaluation{
  background-image: url(../../assets/images/QAREventEvaluation.png);
  border-radius: 8px;
}
.flightWater{
  background-image: url(../../assets/images/flightWater.png);
  background-size: 244px 140px;
  border-radius: 8px;
}
.qarProject{
  background-image: url(../../assets/images/masp-qarProject.png);
  border-radius: 8px;
}
.operationControl{
  background-image: url(../../assets/images/operationControl.png);
  background-size: 244px 140px;
  border-radius: 8px;
}
</style>
