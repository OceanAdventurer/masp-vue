<template>
  <div class="flight-weather">
    <div class="flight-weather-container df df-fd-r">
      <div class="flight-weather-table">
        <div class="flight-weather-table-input df df-jc-c df-ai-c">
          <el-form :inline="true" label-width="70px">
            <el-form-item label="机场:">
              <el-input v-model.trim="form.aptlcaoCode" clearable placeholder="机场" style="width: 100px; " />
            </el-form-item>
            <el-form-item label="数据类型:">
              <el-select v-model="form.msgType" clearable placeholder="数据类型" style="width: 100px;">
                <el-option
                  v-for="item in msgTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="天气时间:">
              <el-date-picker
                v-model="msgTime"
                style=" width: 360px; "
                range-separator="~"
                class="date-range-item"
                end-placeholder="结束时间"
                start-placeholder="开始时间"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              />
            </el-form-item>
            <el-form-item label="天气类型:" class="weather-class">
              <el-select
                v-model="form.weatherType"
                v-load-more="loadMore"
                :reserve-keyword="true"
                placeholder="最多可以选择20个天气类型"
                filterable
                clearable
                multiple
                :multiple-limit="20"
                :collapse-tags="true"
                remote
                :remote-method="remoteMethod"
                :loading="loading"
                style="width: 500px;"
                @visible-change="visibleChange"
              >
                <el-option
                  v-for="item in weatherTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="initList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="flight-weather-table-info">
          <el-table
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            highlight-current-row
            :data="tableData"
            height="100%"
            border
            style="width: 100%">
            <el-table-column
              prop="msgType"
              label="天气类型"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="aptlcaoCode"
              label="机场"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="windDirection"
              label="风向(度)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="windSpeed"
              label="风速(米/秒)"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="gustSpeed"
              label="阵风风速(米/秒)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="windDirectionN"
              label="顺时风向N(度)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="windDirectionX"
              label="顺时风向X(度)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="visibility"
              label="能见度(米)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="temperature"
              label="温度(度)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="dewPoint"
              label="露点(度)"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="barometric"
              label="高度表拨正值"
              :show-overflow-tooltip="true"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="weatherTrend"
              label="天气趋势"
              :show-overflow-tooltip="true"
              width="150px">
            </el-table-column>
            <el-table-column
              prop="weatherType"
              label="天气类型"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="weatherDesc"
              label="天气描述"
              :show-overflow-tooltip="true"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="msgTimeBeijing"
              label="天气时间"
              width="160px">
            </el-table-column>
            <el-table-column label="操作" width="101px">
              <template slot-scope="scope">
                <el-button size="mini" round @click.native="showInfo(scope.row)">天气详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="flight-weather-table-pagination df df-jc-fe df-ai-c">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, total"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="机场气象信息" :visible.sync="weatherDialog" @close='closeDialog'>
      <AirportWeatherInfo
        :weatherDialog="weatherDialog"
        :msgType="form.msgType"
        :msgTimeArr="msgTime"
        :weatherType="form.weatherType"
        :aptlcaoCode="aptlcaoCode"
        :weatherTypeListAllArr="weatherTypeListAll"
      >
      </AirportWeatherInfo>
    </el-dialog>
  </div>
</template>
<script>

const AirportWeatherInfo = () => import('components/edgeComputing/AirportWeatherInfo')

export default {
  name: 'WeatherTab',
  components: {
    AirportWeatherInfo
  },
  data () {
    return {
      loading: false,
      msgTypeList: [
        { label: 'METAR', value: 'METAR' },
        { label: 'SPECI', value: 'SPECI' }
      ],
      weatherTypeListAll: [],
      weatherTypeListTemp: [],
      weatherTypeList: [],
      msgTime: [],
      form: {
        msgType: '',
        aptlcaoCode: '',
        msgTimeStart: '',
        msgTimeEnd: '',
        weatherType: [],
        type: 'group'
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      weatherDialog: false,
      aptlcaoCode: ''
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.getWeatherTypeList()
      this.initMsgTime()
      this.initList()
    })
  },
  watch: {},
  methods: {
    // 天气类型
    getWeatherTypeList () {
      this.weatherTypeListAll = []
      this.weatherTypeListTemp = []
      this.weatherTypeList = []
      this.$axios({
        url: '/weather/type/0',
        method: 'get'
      }).then(res => {
        let data = res.data
        if (data && data.length > 0) {
          data.forEach(item => {
            this.weatherTypeListAll.push({
              label: item,
              value: item
            })
          })
        }
        this.weatherTypeListTemp = this.weatherTypeListAll.slice(0)
        this.loadMore()
      })
    },
    loadMore () {
      if (this.weatherTypeList.length >= this.weatherTypeListTemp.length) {
        return
      }
      let list = []
      if (this.weatherTypeList.length + 50 > this.weatherTypeListTemp.length) {
        list = this.weatherTypeListTemp.slice(this.weatherTypeList.length)
      } else {
        list = this.weatherTypeListTemp.slice(this.weatherTypeList.length, this.weatherTypeList.length + 50)
      }
      list.forEach(item => {
        this.weatherTypeList.push(item)
      })
    },
    remoteMethod (query) {
      // 查询天气类型
      this.weatherTypeListTemp = []
      this.weatherTypeList = []
      if (query) {
        this.weatherTypeListAll.forEach(item => {
          if (item.label.indexOf(query) >= 0) {
            this.weatherTypeListTemp.push(item)
          }
        })
      } else {
        this.weatherTypeListTemp = this.weatherTypeListAll.slice(0)
      }
      this.loadMore()
    },
    visibleChange (value) {
      if (value) {
        // 下拉框打开时触发一次
        this.remoteMethod()
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getList()
    },
    // 初始化起飞时间
    initMsgTime () {
      // 初始化起飞时间
      var date = new Date()
      date = new Date(date.getTime() - 24 * 60 * 60 * 1000)
      var day = date.getDate()
      var month = date.getMonth() + 1
      var year = date.getFullYear()
      var dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
      this.msgTime = [dateStr + ' 00:00:00', dateStr + ' 23:59:59']
    },
    initList () {
      this.currentPage = 1
      this.getList()
    },
    getList () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      // 起飞时间
      this.form.msgTimeStart = ''
      this.form.msgTimeEnd = ''
      if (this.msgTime && this.msgTime.length === 2) {
        this.form.msgTimeStart = this.msgTime[0]
        this.form.msgTimeEnd = this.msgTime[1]
      }
      let params = {
        ...this.form,
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      this.$axios({
        url: '/weather/airport/pageList',
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
        console.log(res)
        let data = res.data
        this.tableData = data.content
        this.currentPage = Number(data.pageNo)
        this.pageSize = Number(data.pageSize)
        this.total = Number(data.recordCount)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        this.$message.error('查询失败! ')
      })
    },
    showInfo (row) {
      this.aptlcaoCode = row.aptlcaoCode
      this.weatherDialog = true
    },
    closeDialog () {
      this.weatherDialog = false
      this.depApWeather = {}
      this.arrApWeather = {}
    }
  }
}
</script>
<style scoped>
.flight-weather {
  position: absolute;
  width: 100%;
  height: 100%;
}
.flight-weather-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.flight-weather-table {
  position: relative;
  width: calc(100vw - 204px);
  height:100%;
  margin-left: 12px;
}
.flight-weather-table-input {
  position: relative;
  width: 100%;
  height: 15%;
}

.flight-weather-table-input .el-form--inline .el-form-item {
  margin-bottom: unset;
  /*margin-right: unset;*/
}

.flight-weather-table-input .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.flight-weather-table-input /deep/.weather-class .el-input__inner {
  height: 32px !important;
}

.flight-weather-table-input .el-button{
  padding: 9px 20px !important;
}

.flight-weather-table-info {
  position: relative;
  width: 100%;
  height: 75%;
}

.flight-weather-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}

.el-dialog__wrapper /deep/ .el-dialog {
  margin-top: 10vh !important;
  height: 60%;
  min-height: 600px;
  width: 80%;
  min-width: 800px;
}
.el-dialog__wrapper /deep/ .el-dialog__header {
  padding: 20px 20px 0 20px;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 20px 20px;
}
.el-dialog__wrapper /deep/ .flight-weather {
  margin: 0 10px;
  width: calc(100% - 60px);
  height: calc(100% - 80px);
}
.el-dialog__wrapper /deep/ .flight-weather .flight-weather-table {
  width: 100%;
  height: 100%;
}
</style>
<style>
.el-tooltip__popper {
  max-width: 500px;
  line-height: 1.5;
}
</style>
