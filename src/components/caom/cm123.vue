<template>
  <div>
    <el-card style="margin-top: 10px">
      <!-- 查询 -->
      <el-form ref="form" :model="form" inline>
        <el-form-item label="线路" size="small">
          <el-select v-model="form.lineId" filterable clearable placeholder="请选择线路">
            <el-option v-for="item in lineList" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            <!-- <el-option v-for="item in lineList" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期" size="small">
          <el-date-picker
            v-model="form.queryweek"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="small" @click="search" :disabled="this.form.lineId == '' || this.form.queryweek == null || this.form.queryweek.length == 0">
          <i class="el-icon-search"></i>
          查询
        </el-button>
      </el-form>
      <div>
        <div>
          <PassengerFlow @showEchartsFn="showEchartsFn" :dataList="dataList"></PassengerFlow>
        </div>
        <div v-if="echartShow">
          <ShowEcharts :echartShowTitle="echartShowTitle" :dayList="dayList"></ShowEcharts>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import PassengerFlow from './PassengerFlow'
import ShowEcharts from './ShowEcharts'
import { WeekStatisticInfoAll } from '@/api/IntelligentAnalysis/passengerSeason'
import { acyclicLineAll } from '@/api/publicRequest'
import moment from 'moment'
export default {
  components: { PassengerFlow, ShowEcharts },
  created() {
    // 获取全部的公司信息
    // this.companyDataAll()
    // 获取全部的线路信息
    // this.lineDataAll()
  },
  data() {
    return {
      choseTitle: '',
      // 控制显示
      showTrue: false,
      form: {
        lineId: '',
        queryweek: '',
      },
      queryForm: {
        lineId: '',
        startTime: '',
        endTime: '',
      },
      dataList: [],
      dayList: [],
      // 公司
      corporationList: [],
      // 路线
      // 路线
      lineList: [
        { id: '010082', lineName: '82路' },
        { id: '010992', lineName: '992路' },
        { id: '013950', lineName: '1109路' },
        { id: '011109', lineName: '浦东24路' },
      ],
      // 点击
      disabledClick: true,
      loading: true,
      // 显示每日客流量的数据
      echartShow: false,
      // 显示每日客流量的表头
      echartShowTitle: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  methods: {
    // 获取公司
    // companyDataAll() {
    //   companyData()
    //     .then(res => {
    //       const { data, msg, success } = res.data
    //       if (success === true) {
    //         this.corporationList = data
    //       } else {
    //         this.$message.error(msg)
    //       }
    //     })
    //     .catch(() => {
    //       this.$message.error('获取公司信息失败！')
    //     })
    // },
    // 获取线路
    // lineDataAll() {
    //   acyclicLineAll()
    //     .then(res => {
    //       const { data, msg, success } = res.data
    //       console.log(data, '数据')
    //       if (success === true) {
    //         this.lineList = data
    //         console.log(data, '线路集调')
    //       } else {
    //         this.$message.error(msg)
    //       }
    //     })
    //     .catch(() => {
    //       this.$message.error('获取线路信息失败！')
    //     })
    // },
    // 获取集调系统的线路
    // lineDataAll() {
    //   acyclicLineAll()
    //     .then(res => {
    //       const { data, msg, success } = res.data
    //       console.log(data, '数据')
    //       if (success === true) {
    //         this.lineList = data
    //         console.log(data, '线路集调')
    //       } else {
    //         this.$message.error(msg)
    //       }
    //     })
    //     .catch(() => {
    //       this.$message.error('获取线路信息失败！')
    //     })
    // },
    // 点击查询
    search() {
      let d1 = moment(this.form.queryweek[0]).format('yyyy-MM-DD')
      let d2 = moment(this.form.queryweek[1]).format('yyyy-MM-DD')
      let d3 = moment(this.choseTitle).format('yyyy-MM-DD')
      if (new Date(d1) <= new Date(d3) && new Date(d3) <= new Date(d2)) {
        this.echartShow = true
      } else {
        this.echartShow = false
      }
      // this.form.startTime = this.form.queryTime[0]
      // this.form.endTime = this.form.queryTime[1]
      // delete this.form.queryTime
      this.queryForm.startTime = moment(this.form.queryweek[0]).format('yyyyMMDD')
      this.queryForm.endTime = moment(this.form.queryweek[1]).format('yyyyMMDD')
      this.queryForm.lineId = this.form.lineId
      console.log(parseInt(this.queryForm.endTime), '数据11111111')
      console.log(parseInt(this.queryForm.startTime), '数据2222222')
      if (parseInt(this.queryForm.endTime) - parseInt(this.queryForm.startTime) > 6) {
        this.$message.error('日期跨度最大选七天')
        return
      }
      console.log(parseInt(this.queryForm.endTime), parseInt(this.queryForm.startTime), '去去去去去去去去去去去去')
      console.log(this.form, '点击查询按钮')
      console.log(this.queryForm, '点击查询按钮')
      WeekStatisticInfoAll(this.queryForm)
        .then(res => {
          console.log(res, '查询数据')
          const { msg, data, success } = res.data
          if (success === true) {
            this.showTrue = false
            this.dataList = []
            this.dataList = data
            console.log(data, '周数据')
            this.$message.success(msg)
          } else {
            this.$message.success(msg)
          }
        })
        .catch(() => {
          this.$message.error('查询信息失败！')
        })
    },
    // 点击日期 发送请求  线上单日的客流量数据
    showEchartsFn(title) {
      this.choseTitle = title
      this.echartShow = false
      console.log(moment(title).format('yyyyMMDD'))
      var dayTime = moment(title).format('yyyyMMDD')
      var dayList = this.dataList.filter(item => item.currentDataStr === dayTime)
      console.log(dayList, '一天的数据')
      this.dayList = dayList[0].icSpecificInfoVOS
      console.log(this.dayList, '传递一天的数据')

      this.echartShowTitle = moment(title).format('yyyy-MM-DD')

      this.echartShow = true
    },
    compareDate(d1, d2) {
      console.log(d1)
      console.log(new Date(d1))
      console.log(new Date(d2))
      return new Date(d1) >= new Date(d2)
    },
  },
}
</script>

<style lang="scss" scoped>
.boxEchart {
  display: flex;
  width: 100%;
  .table {
    margin-top: 100px;
    height: 100%;
    width: 30%;
  }
  .EchartStyle {
    width: 70%;
  }
}
</style>
