<template>
  <div class="flight-weather">
    <div class="flight-weather-container df df-fd-r">
      <div class="flight-weather-table">
        <div class="flight-weather-table-input df df-jc-c df-ai-c">
          <el-form :inline="true" label-width="70px">
            <el-form-item label="数据源:">
              <el-select v-model="form.source" @change="sourceChange" placeholder="数据源" style="width: 100px;">
                <el-option
                  v-for="item in sourceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="起飞时间:">
              <el-date-picker
                v-model="depTime"
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
            <el-form-item label="着陆时间:">
              <el-date-picker
                v-model="arrTime"
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
            <el-form-item label="起飞机场:">
              <el-input v-model.trim="form.depAp" clearable placeholder="起飞机场" style="width: 100px; " />
            </el-form-item>
            <el-form-item label="着陆机场:">
              <el-input v-model.trim="form.arrAp" clearable placeholder="着陆机场" style="width: 100px; " />
            </el-form-item>
            <el-form-item label="机型:">
              <el-select v-model="form.acType" clearable placeholder="机型" filterable style="width: 110px;">
                <el-option
                  v-for="item in acTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="机号:">
              <el-input v-model.trim="form.acTail" clearable placeholder="机号" style="width: 100px;" />
            </el-form-item>
            <el-form-item label="航班号:">
              <el-input v-model.trim="form.flightNo" clearable placeholder="航班号" style="width: 100px;" />
            </el-form-item>
            <el-form-item label="是否匹配:">
              <el-select v-model="form.match" clearable placeholder="是否匹配" style="width: 100px;">
                <el-option
                  v-for="item in matchList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="天气类型:" class="weather-class">
              <el-select
                v-model="form.type"
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
<!--              <el-button type="primary" @click="dataExport">导出</el-button>-->
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
              prop="flightNo"
              label="航班号"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="acType"
              label="机型"
              width="120px">
            </el-table-column>
            <el-table-column
              prop="acTail"
              label="机号"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="airlineCode"
              label="航空公司"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="depAp"
              label="起飞机场"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="depType"
              label="起飞机场天气类型"
              :show-overflow-tooltip="true"
              width="auto"
              min-width="120px">
            </el-table-column>
            <el-table-column
              prop="arrAp"
              label="着陆机场"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="arrType"
              label="着陆机场天气类型"
              :show-overflow-tooltip="true"
              width="auto"
              min-width="120px">
            </el-table-column>
            <el-table-column
              prop="depTime"
              label="起飞时间"
              width="160px">
            </el-table-column>
            <el-table-column
              prop="arrTime"
              label="着陆时间"
              width="160px">
            </el-table-column>
            <el-table-column label="操作" width="101px">
              <template slot-scope="scope">
                <el-button v-if="scope.row.depUuid || scope.row.arrUuid" size="mini" round @click.native="showInfo(scope.row)">天气详情</el-button>
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
      <div class="weather-dialog">
        <div v-if="depApWeather && depApWeather.uuid" class="weather-info">
          <div class="weather-top">
            <div style="color: #033A97;">{{ depApWeather.aptlcaoCode }}</div>
            <div style="color: #FF8A00;">起飞</div>
            <div v-if="depApWeather.weatherType" style="color: #033A97;">{{ depApWeather.weatherType }}</div>
          </div>
          <div class="weather_text">
            <div class="weather_text_top">
              <div>{{ depApWeather.msgTime }}UTC发布{{ depApWeather.aptlcaoCode }}例行天气报告：</div>
            </div>
            <div class="weather_text_bottom">
              <div v-if="depApWeather.windDirection">·风向{{ depApWeather.windDirection }}度</div>
              <div v-if="depApWeather.windSpeed">·风速{{ depApWeather.windSpeed }}米/秒</div>
              <div v-if="depApWeather.gustSpeed">·阵风速{{ depApWeather.gustSpeed }}米/秒</div>
              <div v-if="depApWeather.windDirectionN">·顺时风向{{ depApWeather.windDirectionN }}至{{ depApWeather.windDirectionX }}</div>
              <div v-if="depApWeather.temperature">·温度{{ depApWeather.temperature }}度</div>
              <div v-if="depApWeather.dewPoint">·露点{{ depApWeather.dewPoint }}度</div>
              <div v-if="depApWeather.barometric">·高度表拨正值{{ depApWeather.barometric }}</div>
              <div v-if="depApWeather.weatherTrend">·{{ depApWeather.weatherTrend }}</div>
            </div>
          </div>
        </div>
        <div v-else class="weather-info">
          <div style="text-align: center">暂无数据</div>
        </div>
        <div v-if="arrApWeather && arrApWeather.uuid" class="weather-info">
          <div class="weather-top">
            <div style="color: #033A97;">{{ arrApWeather.aptlcaoCode }}</div>
            <div style="color: #FF8A00;">到达</div>
            <div v-if="arrApWeather.weatherType" style="color: #033A97;">{{ arrApWeather.weatherType }}</div>
          </div>
          <div class="weather_text">
            <div class="weather_text_top">
              <div>{{ arrApWeather.msgTime }}UTC发布{{ arrApWeather.aptlcaoCode }}例行天气报告：</div>
            </div>
            <div class="weather_text_bottom">
              <div v-if="arrApWeather.windDirection">·风向{{ arrApWeather.windDirection }}度</div>
              <div v-if="arrApWeather.windSpeed">·风速{{ arrApWeather.windSpeed }}米/秒</div>
              <div v-if="arrApWeather.gustSpeed">·阵风速{{ arrApWeather.gustSpeed }}米/秒</div>
              <div v-if="arrApWeather.windDirectionN">·顺时风向{{ arrApWeather.windDirectionN }}至{{ arrApWeather.windDirectionX }}</div>
              <div v-if="arrApWeather.temperature">·温度{{ arrApWeather.temperature }}度</div>
              <div v-if="arrApWeather.dewPoint">·露点{{ depApWeather.dewPoint }}度</div>
              <div v-if="arrApWeather.barometric">·高度表拨正值{{ arrApWeather.barometric }}</div>
              <div v-if="arrApWeather.weatherTrend">·{{ arrApWeather.weatherTrend }}</div>
            </div>
          </div>
        </div>
        <div v-else class="weather-info">
          <div style="text-align: center">暂无数据</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'WeatherTab',
  data () {
    return {
      loading: false,
      sourceList: [
        { label: '运控', value: 'fodc' },
        { label: 'AGS', value: 'ags' },
        { label: 'ALPHA', value: 'alpha' }
      ],
      acTypeList: [],
      matchList: [
        { label: '匹配', value: 'Y' },
        { label: '未匹配', value: 'N' }
      ],
      weatherTypeListAll: [],
      weatherTypeListTemp: [],
      weatherTypeList: [],
      depTime: [],
      arrTime: [],
      form: {
        source: 'fodc',
        flightNo: '',
        acType: '',
        acTail: '',
        depAp: '',
        arrAp: '',
        depTimeStart: '',
        depTimeEnd: '',
        arrTimeStart: '',
        arrTimeEnd: '',
        type: [],
        match: ''
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      depApWeather: {},
      arrApWeather: {},
      weatherDialog: false
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.getAcTypeList()
      this.getWeatherTypeList()
      this.initDepTime()
      this.initList()
    })
  },
  watch: {},
  methods: {
    // 机型
    getAcTypeList () {
      this.acTypeList = []
      this.$axios({
        url: '/weather/acType',
        method: 'get'
      }).then(res => {
        let data = res.data
        if (data && data.length > 0) {
          data.forEach(item => {
            this.acTypeList.push({
              label: item,
              value: item
            })
          })
        }
      })
    },
    // 天气类型
    getWeatherTypeList () {
      this.weatherTypeListAll = []
      this.weatherTypeListTemp = []
      this.weatherTypeList = []
      this.$axios({
        url: '/weather/type/' + this.form.source,
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
    // 修改数据源
    sourceChange (value) {
      // 重置天气类型
      this.form.type = []
      this.getWeatherTypeList()
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
    initDepTime () {
      // 初始化起飞时间
      var date = new Date()
      date = new Date(date.getTime() - 24 * 60 * 60 * 1000)
      var day = date.getDate()
      var month = date.getMonth() + 1
      var year = date.getFullYear()
      var dateStr = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
      this.depTime = [dateStr + ' 00:00:00', dateStr + ' 23:59:59']
    },
    initList () {
      this.currentPage = 1
      this.getList()
    },
    dataExport () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let params = {
        ...this.form
      }
      this.$axios({
        url: '/weather/flight/export',
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        responseType: 'blob'
      }).then(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        let contentDispositionStr = decodeURIComponent(res.headers['content-disposition'], 'UTF-8')
        let contentDispositionArr = contentDispositionStr.split('=')
        let fileName = contentDispositionArr[1] // 获取文件名字
        console.log('fileName: ' + fileName)
        let blobType = res.headers['content-type'] // 获取类型
        let blob = new Blob([res.data], {type: blobType})
        if ('download' in document.createElement('a')) { // 非IE下载
          const eLink = document.createElement('a')
          eLink.download = fileName
          eLink.style.display = 'none'
          eLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eLink)
          eLink.click()
          URL.revokeObjectURL(eLink.href) // 释放URL 对象
          document.body.removeChild(eLink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        this.$message({
          message: '数据导出成功！',
          type: 'success'
        })
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    getList () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      // 起飞时间
      this.form.depTimeStart = ''
      this.form.depTimeEnd = ''
      if (this.depTime && this.depTime.length === 2) {
        this.form.depTimeStart = this.depTime[0]
        this.form.depTimeEnd = this.depTime[1]
      }
      // 着陆时间
      this.form.arrTimeStart = ''
      this.form.arrTimeEnd = ''
      if (this.arrTime && this.arrTime.length === 2) {
        this.form.arrTimeStart = this.arrTime[0]
        this.form.arrTimeEnd = this.arrTime[1]
      }
      let params = {
        ...this.form,
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      this.$axios({
        url: '/weather/flight/pageList',
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
    },
    showInfo (row) {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/weather/flight/weatherInfo?depUuid=' + row.depUuid + '&arrUuid=' + row.arrUuid,
        method: 'get'
      }).then(res => {
        let data = res.data
        this.depApWeather = data[row.depUuid]
        this.arrApWeather = data[row.arrUuid]
        this.weatherDialog = true
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(res => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
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
  height: 20%;
  display: flex;
  justify-content: flex-start;
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
  height: 70%;
}

.flight-weather-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}

.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 10px 10px;
}

.weather-dialog {
  display: flex;
  border-top: 2px solid;
  padding: 10px 0;
}
.weather-info {
  padding: 0 20px 0 30px;
  width: 50%;
}
.weather-info:first-child {
  border-right: 1px dashed;
}
.weather-top {
  display: flex;
  flex-wrap: wrap;
}
.weather-top div {
  padding: 0 15px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #D7E7FF;
  border-radius: 4px;
  margin: 0 10px 10px 0;
}
.weather_text_top {
  margin: 10px 0;
}
.weather_text_top div {
  color: red;
}
.weather_text_bottom div {
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
}

</style>
