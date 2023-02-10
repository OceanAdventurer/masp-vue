<style scoped>
.version-list-pagination {
  position: relative;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}
td .el-input__inner {
  border: 1px solid #FFF;
}
 </style>
<template>
  <!-- 工程参数主界面 -->
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <div class="pos-a w100 h100 df df-fd-c">
      <div class="mt10 mb10"  style="padding:0px 10px">
          <el-form-item label="航班日期:" style="margin-bottom: 0px">
            <div class="block">
            <el-date-picker
            style="width:300px"
              v-model="form.flightDate"
              :clearable=false
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              size="small"
              end-placeholder="结束日期">
            </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="航班号:" style="margin-bottom: 0px">
            <el-select v-model="form.flightNo" remote  :remote-method="remoteMethod"
                       :loading="loading" clearable  filterable placeholder="请输入" style="width:100px">
              <el-option
                v-for="item in flightNoList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机尾号" style="margin-bottom: 0px">
            <el-select v-model="form.acTail" clearable  filterable placeholder="请选择" style="width:100px">
              <el-option
                v-for="item in acTailList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机型:" style="margin-bottom: 0px">
            <el-select v-model="form.model" clearable  filterable placeholder="请选择" style="width:100px">
              <el-option
                v-for="item in modelList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号" style="margin-bottom: 0px">
            <el-select v-model="form.version" clearable  filterable placeholder="请选择" style="width:100px">
              <el-option
                v-for="item in versionList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起飞机场" style="margin-bottom: 0px">
            <el-select v-model="form.departure" clearable  filterable placeholder="请选择" style="width:100px">
              <el-option
                v-for="item in departureList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="降落机场" style="margin-bottom: 0px">
            <el-select v-model="form.arrival" clearable  filterable placeholder="请选择" style="width:100px">
              <el-option
                v-for="item in arrivalList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px">
            <el-button type="primary" @click="readCompletionInfo(1)" size="small">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px">
            <el-button type="primary" @click="flightExport()" size="small">导出</el-button>
          </el-form-item>
      </div>
      <div class="df df-f1" style="padding:0px 10px">
        <el-table
          border
          :data="tableData" highlight-current-row
          :header-row-style="headerRowStyle" :header-cell-style="{height:'38px'}" :row-style="{height:'38px'}" height="100%" width="100%;">
          <el-table-column prop="FLIGHT_DATE" label="航班日期" width="200"></el-table-column>
          <el-table-column prop="FLIGHT_NO" label="航班号"></el-table-column>
          <el-table-column prop="AC_TAIL" label="机尾号"></el-table-column>
          <el-table-column prop="AC_TYPE_CODE" label="机型"></el-table-column>
          <el-table-column prop="VERSION_NO" label="版本号"></el-table-column>
          <el-table-column prop="DEPARTURE_AIRPORT" label="起飞机场"></el-table-column>
          <el-table-column prop="ARRIVAL_AIRPORT" label="降落机场"></el-table-column>
          <!-- <el-table-column prop="" label="是否有飞行排班" >
            <div slot-scope="scope">
              <span v-if="scope.row.BOOL_FLIGHT === 0"><el-tag type="danger" size="mini">否</el-tag></span>
              <span v-else> <el-tag type="success" size="mini">是</el-tag></span>
            </div>
          </el-table-column>
          <el-table-column prop="bindingScale" label="是否WGL传输">
            <div slot-scope="scope">
              <span v-if="scope.row.BOOL_WGL === 0"><el-tag type="danger" size="mini">否</el-tag></span>
              <span v-else> <el-tag type="success" size="mini">是</el-tag></span>
            </div>
          </el-table-column>
          <el-table-column prop="bindingScale" label="是否有AGS报告" >
            <div slot-scope="scope">
              <span v-if="scope.row.BOOL_AGS === 0"><el-tag type="danger" size="mini">否</el-tag></span>
              <span v-else> <el-tag type="success" size="mini">是</el-tag></span>
            </div>
          </el-table-column>
          <el-table-column prop="bindingScale" label="是否有CSV文件">
            <div slot-scope="scope">
              <span v-if="scope.row.BOOL_CSV === 0"><el-tag type="danger" size="mini">否</el-tag></span>
              <span v-else> <el-tag type="success" size="mini">是</el-tag></span>
            </div>
          </el-table-column>
          <el-table-column prop="bindingScale" label="MSAP是否入库">
            <div slot-scope="scope">
              <span v-if="scope.row.BOOL_MSAP === 0"><el-tag type="danger" size="mini">否</el-tag></span>
              <span v-else> <el-tag type="success" size="mini">是</el-tag></span>
            </div>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="version-list-pagination">
        <el-pagination
          background
          @size-change="changePageSize"
          @current-change="readCompletionInfo"
          :current-page="pageNo"
          :page-sizes="[30, 50,100, 150,200]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next, total"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </el-form>
  </template>
<script>

export default {
  data () {
    return {
      loading: false,
      flightNoList: [],
      flightNoListAll: [],
      modelList: [],
      versionList: [],
      acTailList: [],
      departureList: [],
      arrivalList: [],
      flightNo: '',
      form: {
        flightDate: '',
        flightNo: '',
        model: '',
        version: '',
        acTail: '',
        departure: '',
        arrival: ''
      },
      isExcute: false,
      userInfo: {},
      paramOneEditAuthority: false,
      headerRowStyle: {
        'color': '#2A436F',
        'font-size': '10px;',
        'line-height': '16px',
        'height': '30px',
        'background': '#F9F9F9'
      },
      pageSize: 30,
      pageNo: 1,
      totalCount: 0,
      tableData: []
    }
  },
  watch: {
  },
  props: [
    'errorDate'
  ],
  mounted () {
    //获得当前年月日
    var nowDate = new Date()
    var year = nowDate.getFullYear()
    var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1
    var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
      .getDate()
    var dateStr = year + '-' + month + '-' + day
    this.form.flightDate = [year + '-01-01', dateStr]
    if (this.errorDate.length !== 0) {
      this.form.flightDate = this.errorDate
    }
    this.$nextTick(() => {
      this.setMenue()
      this.readCompletionDropDown()
      this.readCompletionInfo(1)
    })
  },
  methods: {
    remoteMethod (v) {
      console.log(v)
      if (v) {
        this.$axios.get('/etl/readCompletionDropDown', {params: {key: 'FLIGHT_NO', search: v}}).then(response => {
        let data = response.data
        this.flightNoList = data.FLIGHT_NO.filter(data => data.indexOf(v) > -1)
        }).catch(response => {
        })
      } else {
        this.flightNoList = []
      }
    },
    setMenue () {
      let hideMenuObj = {}
      let disabledMenuObj = {}
      hideMenuObj.dataTable_unmatchedFlights_menu = true
      this.$bus.$emit('openHeaderMenuItem', 'dataTable_unmatchedFlights', hideMenuObj, disabledMenuObj) // 修改头部显示效果
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.readCompletionInfo(1)
    },
    flightExport () {
      let params = {
        dateStart: this.form.flightDate[0],
        dateEnd: this.form.flightDate[1],
        flightNO: this.form.flightNo,
        acType: this.form.model,
        versionNO: this.form.version,
        acTail: this.form.acTail,
        departure: this.form.departure,
        arrival: this.form.arrival
      }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: '/etl/unCompletionFlightDownload',
        method: 'post',
        data: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        responseType: 'blob'
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        console.log(response)
         let contentDispositionStr = response.headers['content-disposition']
        let contentDispositionArr = contentDispositionStr.split('=')
        let fileName = contentDispositionArr[1] // 获取文件名字
        let blobType = response.headers['content-type'] // 获取类型
        let blob = new Blob([response.data], {type: blobType})
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        this.$message({
          message: '数据导出成功！',
          type: 'success'
        })
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中!')
        this.$message.error('请求响应失败，请稍后重试！')
      })
    },
    readCompletionInfo (pageNo) {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      console.log(this.form.flightDate)
      let params = {
          dateStart: this.form.flightDate[0],
          dateEnd: this.form.flightDate[1],
          flightNO: this.form.flightNo,
          acType: this.form.model,
          versionNO: this.form.version,
          acTail: this.form.acTail,
          departure: this.form.departure,
          arrival: this.form.arrival,
          pageSize: this.pageSize,
          pageNo: pageNo
        }
        this.$axios({
          url: '/etl/unCompletionFlightDetail',
          method: 'post',
          data: JSON.stringify(params),
          headers: {
           'Content-type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
        console.log(res)
        let data = res.data
        this.tableData = data.data
        this.pageSize = data.pageSize
        this.pageNo = data.pageNo
        this.totalCount = data.count
      }).catch(() => {
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      })
    },
     readCompletionDropDown () {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios.get('/etl/readCompletionDropDown', {params: {key: '', search: ''}}).then(response => {
        let data = response.data
        this.modelList = data.AC_TYPE_CODE
        this.versionList = data.VERSION_NO
        this.flightNoListAll = data.FLIGHT_NO
        this.acTailList = data.AC_TAIL
        this.departureList = data.DEPARTURE_AIRPORT
        this.arrivalList = data.ARRIVAL_AIRPORT
        this.$store.commit('HIDE_LOADING', '正在加载数据，请稍等！')
      }).catch(response => {
      })
    },
    lookDetail (inde, row) {
      this.$bus.$emit('paramOneAddTab', {enName: 'intelligent_matching_list', zhName: row.modelId, isClosable: true, parent: 'paramOne_intelligentMatching', count: 0, data: row})
    }
  }
}
</script>
