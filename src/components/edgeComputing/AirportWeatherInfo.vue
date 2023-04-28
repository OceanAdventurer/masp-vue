<template>
  <div class="airport-weather">
    <div class="airport-weather-container df df-fd-r">
      <div class="airport-weather-table">
        <div class="airport-weather-table-input df df-jc-c df-ai-c">
          <el-form :inline="true" label-width="70px">
            <el-form-item label="机场:">
              <el-input v-model.trim="form.aptlcaoCode" disabled clearable placeholder="全部" style="width: 100px; " />
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
        <div class="airport-weather-table-info">
          <el-table
            highlight-current-row
            :data="tableData"
            height="100%"
            width="100%"
            border
            fit>
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
              width="auto"
              min-width="200px">
            </el-table-column>
            <el-table-column
              prop="msgTimeBeijing"
              label="天气时间"
              width="160px">
            </el-table-column>
          </el-table>
        </div>
        <div class="airport-weather-table-pagination df df-jc-fe df-ai-c">
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
  </div>
</template>
<script>

export default {
  name: 'WeatherTab',
  props: [
    'weatherDialog',
    'msgType',
    'msgTimeArr',
    'weatherType',
    'aptlcaoCode',
    'weatherTypeListAllArr'
  ],
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
        type: 'info'
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: []
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.initParams()
      this.getWeatherTypeList()
      this.initList()
    })
  },
  watch: {
    weatherDialog (newVal, oldVal) {
      if (newVal) {
        this.initParams()
        this.getWeatherTypeList()
        this.initList()
      }
    }
  },
  methods: {
    // 参数初始化
    initParams () {
      this.getWeatherTypeList()
      this.form.aptlcaoCode = this.aptlcaoCode
      this.form.msgType = this.msgType
      this.form.weatherType = this.weatherType
      this.msgTime = this.msgTimeArr
      if (this.msgTime && this.msgTime.length === 2) {
        this.form.msgTimeStart = this.msgTime[0]
        this.form.msgTimeEnd = this.msgTime[1]
      }
    },
    // 天气类型
    getWeatherTypeList () {
      this.weatherTypeListAll = this.weatherTypeListAllArr
      this.weatherTypeListTemp = this.weatherTypeListAll.slice(0)
      this.weatherTypeList = []
      this.loadMore()
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
        let data = res.data
        this.tableData = data.content
        this.currentPage = Number(data.pageNo)
        this.pageSize = Number(data.pageSize)
        this.total = Number(data.recordCount)
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    }
  }
}
</script>
<style scoped>
.airport-weather {
  /* position: absolute; */
  width: 100%;
  height: 100%;
}
.airport-weather .el-dialog__wrapper >>> .el-dialog {
  min-height: 520px;
}
.airport-weather .el-dialog__wrapper >>> .el-dialog .el-dialog__body {
  width: 100%;
  height: 100%;
  padding: 0;
}
.airport-weather-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.airport-weather-table {
  position: relative;
  width: 100%;
  height:100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.airport-weather .airport-weather-table-input {
  position: relative;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: flex-start;
}

.airport-weather-table-input .el-form--inline .el-form-item {
  margin-bottom: unset;
  /*margin-right: unset;*/
}

.airport-weather-table-input .el-range-editor.el-input__inner {
  padding: 0 10px;
}

.airport-weather-table-input /deep/.weather-class .el-input__inner {
  height: 32px !important;
}

.airport-weather-table-input .el-button{
  padding: 9px 20px !important;
}

.airport-weather-table-info {
  position: relative;
  width: 100%;
  height: calc(100% - 132px);
}
.airport-weather .el-dialog__wrapper >>> .el-dialog__body {
  padding: 0 20px;
}
.airport-weather .airport-weather-table-pagination {
  position: relative;
  width: 100%;
  margin-top: 10px;
  height: 32px;
}
</style>
<style>
.el-tooltip__popper {
  max-width: 500px;
  line-height: 1.5;
}
</style>
