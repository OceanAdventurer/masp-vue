<template>
  <div class="securityMonitoring">
    <div class="MonitoringCenter">
      <!-- 时间查询 -->
      <div class="formBox">
        <el-form ref="ruleForm" :inline="true" :rules="rules" :model="ruleForm" label-width="80px" class="demo-form-inline">
          <el-form-item label="时间" prop="dateTime">
            <el-date-picker
              v-model="ruleForm.dateTime"
              type="daterange"
              clearable
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="init('ruleForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="statistics">
        <div class="statisticsTitle">
          <span>用户访问统计</span>
        </div>
        <div>
          <div id="userEcharts"></div>
        </div>
        <div class="statisticsTitle">
          <span>数据行为统计</span>
        </div>
        <div>
          <div id="dataEcharts"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'DataStatistics',
  components: {},
  data () {
    return {
      // 时间
      dateTime: '',
      ruleForm: {
        dateTime: '',
        // 开始
        logTimeStart: '',
        // 结束
        logTimeEnd: ''
      },
      rules: {
        dateTime: [
          { required: true, message: '请选择开始日期和结束日期', trigger: 'change' }
        ]
      },

      // 用户访问统计
      userOption: {
        color: 'rgb(58,107,185)',
        tooltip: {
          trigger: 'axis',
          show: true,
          formatter: '时间：{b}<br/>数量：{c}',
          position: 'top',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          top: '10px',
          left: '120px',
          right: '30px'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            internal: 0,
            width: 10,
            overflow: 'truncate',
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          name: '用户访问数',
          nameLocation: 'middle',
          nameGap: 60,
          nameTextStyle: {
            fontSize: 14
          }
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      },
      // 数据行为统计
      dataOption: {
        color: 'rgb(58,107,185)',
        tooltip: {
          trigger: 'axis',
          show: true,
          formatter: '行为：{b}<br/>数量：{c}',
          position: 'top',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '20px',
          left: '120px',
          right: '30px'
        },
        xAxis: {
          type: 'category',
          data: [],
          triggerEvent: true,
          axisLabel: {
            fontStyle: 'normal',
            internal: 0,
            width: 10,
            overflow: 'truncate',
            rotate: 30,
            formatter: function (value) {
              let res = value
              if (res.length > 6) {
                  res = res.substring(0, 6) + '...'
              }
              return res
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '数据行为数',
          nameLocation: 'middle',
          nameGap: 60,
          nameTextStyle: {
            fontSize: 14
          }
        },
        series: [
          {
            data: [],
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      this.getTimeInterval(30)
      // 用户访问统计
      let userEcharts = document.getElementById('userEcharts')
      let exampleUser = echarts.getInstanceByDom(userEcharts)
      if (!exampleUser) {
        // 代表页面上没有echarts实例 需要创建实例
        let myChart = that.$echarts.init(userEcharts)
        myChart.setOption(that.userOption)
      } else {
        // 代表页面当有当前echarts实例不需要创建，直接引入数据
        exampleUser.setOption(that.userOption)
      }
      // 数据行为统计
      let dataEcharts = document.getElementById('dataEcharts')
      let exampleDate = echarts.getInstanceByDom(dataEcharts)
      if (!exampleDate) {
        // 代表页面上没有echarts实例 需要创建实例
        let myChart = that.$echarts.init(dataEcharts)
        myChart.setOption(that.dataOption)
      } else {
        // 代表页面当有当前echarts实例不需要创建，直接引入数据
        exampleDate.setOption(that.dataOption)
      }
    })
  },
  watch: {},
  methods: {
    init (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.logTimeStart = ''
          this.ruleForm.logTimeEnd = ''
          if (this.ruleForm.dateTime && this.ruleForm.dateTime.length === 2) {
            this.ruleForm.logTimeStart = this.ruleForm.dateTime[0] + ' ' + '00:00:00'
            this.ruleForm.logTimeEnd = this.ruleForm.dateTime[1] + ' ' + '00:00:00'
          }
          this.getDataStat()
        } else {
          return false
        }
      })
    },
    getDataStat () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/safetyMonitor/dataStat',
        method: 'post',
        data: JSON.stringify(this.ruleForm),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
        let data = res.data
        // 用户访问统计
        this.userOption.xAxis.data = data.userStatDate
        this.userOption.series[0].data = data.userStatNumber
        // 数据行为统计
        this.dataOption.xAxis.data = data.dataStatName
        this.dataOption.series[0].data = data.dataStatNumber
        this.userEcharts()
        this.dataEcharts()
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    userEcharts () {
      let that = this
      let chartDom = document.getElementById('userEcharts')
      let example = echarts.getInstanceByDom(chartDom)
      example.setOption(that.userOption)
    },
    dataEcharts () {
      let that = this
      let chartDom = document.getElementById('dataEcharts')
      let example = echarts.getInstanceByDom(chartDom)
      example.setOption(that.dataOption)
    },
    currentTime () {
      var date = new Date()
      var year = date.getFullYear()
      var dateArr = [
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
      ]
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
          if (dateArr[i] >= 1 && dateArr[i] <= 9) {
              dateArr[i] = '0' + dateArr[i]
          }
      }
      var strDate =
          year +
          '-' +
          dateArr[0] +
          '-' +
          dateArr[1] +
          ' ' +
          dateArr[2] +
          ':' +
          dateArr[3] +
          ':' +
          dateArr[4]
          //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
          //this.date = strDate;
      return strDate
    },
    getTimeInterval (time) {
      const date1 = new Date()
      const date2 = new Date(date1)
      date2.setDate(date1.getDate() - time)
      const agoDay = `${date2.getFullYear()}` + '-' + `${date2.getMonth() + 1 < 10 ? `0${date2.getMonth() + 1}` : date2.getMonth() + 1}` + '-' + `${date2.getDate() < 10 ? `0${date2.getDate()}` : date2.getDate()}` + ` ` + `00:00:00`
      const nowDay = `${date1.getFullYear()}` + '-' + `${date1.getMonth() + 1 < 10 ? `0${date1.getMonth() + 1}` : date1.getMonth() + 1}` + '-' + `${date1.getDate() < 10 ? `0${date1.getDate()}` : date1.getDate()}` + ` ` + `00:00:00`
      this.ruleForm.logTimeStart = agoDay
      this.ruleForm.logTimeEnd = nowDay
      this.getDataStat()
    }
  }
}
</script>
<style scoped lang="less">
  .securityMonitoring{
    padding: 30px 20px 0 20px;
    height: 90vh;
    .MonitoringCenter{
      // 时间查询
      .formBox{
        padding: 4px;
        height: 52px;
          /deep/.el-input__inner{
            height: 100% !important;
          }
      }

      .statistics{
        .statisticsTitle{
          text-align: center;
          line-height: 36px;
          font-size: 24px;
          padding-top: 10px;
        }
        #userEcharts, #dataEcharts{
          width: 100%;
          height: 320px;
        }
      }
    }
  }
</style>
