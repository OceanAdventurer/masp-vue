
<template>
  <div class="data_verification w100 h100">
    <Loading v-show="showLoading"></Loading>
    <div class="flight_info w100 h100">
      <div class="left">
        <el-form ref="filtersRef" :model= "filtersForm" :rules="filtersRules" label-width="80px">
          <el-row>
            <el-col :span=14>
              <el-form-item label="版本库" prop="modelId">
                <el-select v-model="filtersForm.modelId" @change='queryTableInfo' filterable placeholder="请选择版本库">
                  <el-option
                    v-for="item in versionLibraryList"
                    :key="item.ID"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="flight_no">
          <div class="flight_table">
            <el-table
              :row-style="{height:'38px'}"
              :cell-style="{padding:'0px'}"
              :header-row-style="{height:'38px'}"
              :header-cell-style="{padding:'0px'}"
              :data="flightTableData"
              height="100%"
              highlight-current-row
              fit
              border
              :header-row-class-name="headerRowClassName"
              :row-class-name="tableRowClassName">
              <el-table-column prop="AC_TYPE" label="rowKey">
                <template slot-scope="scope">
                  <div class="row-icon-group">
                    <div
                      v-html="scope.row.ROWKEY+'<br/>'+'飞行总时长：'+scope.row.timeLength+'秒'"
                      @click="checkDetail(scope.row)"></div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        <div class="detail">
          <div>
            <p>{{frequencyForm.paramName[0]}}详情</p>
            <p>最大值：{{max}}</p>
            <p>最小值：{{min}}</p>
            <p>中位值：{{mid}}</p>
            <p>平均值：{{avg}}</p>
          </div>
            <h6>众数信息：</h6>
            <el-table :data="multyList" border class="nums_list">
              <el-table-column label="值" prop='label'></el-table-column>
              <el-table-column label="次数" prop='value' width="50">
              </el-table-column>
            </el-table>
        </div>
        </div>
      </div>
      <div class="right h100">
        <el-form ref="frequencyFilters" class='frequency_query' :model= "frequencyForm" :rules="frequencyRules" label-width="80px">
          <el-row>
              <el-col :span=13>
                  <el-form-item label="参数名称" prop="paramName">
                    <el-select
                      v-model="frequencyForm.paramName"
                      filterable
                      multiple
                      remote
                      reserve-keyword
                      placeholder="请输入关键词"
                      @change="changeParams"
                      :remote-method="remoteMethod">
                      <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span=4>
                <el-form-item label="开始时间" prop="startLine" label-width="70px">
                  <el-input
                    type='number'
                    class="numberOnly"
                    @mousewheel.native.prevent
                    v-model.number="frequencyForm.startLine"
                    placeholder="请输入开始时间"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span=4>
                <!-- onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which)))|| event.which === 8" -->
                <el-form-item label="结束时间" prop="endLine" label-width="70px">
                  <el-input
                    type='number'
                    min='1'
                    class="numberOnly"
                    @mousewheel.native.prevent
                    v-model.number="frequencyForm.endLine"
                    placeholder="请输入结束时间"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span=2 style="margin-left: 10px">
                <el-button type='primary' icon="el-icon-search" @click="checkDetail()">筛选</el-button>
              </el-col>
          </el-row>
        </el-form>
          <!-- height='620' -->
        <div class="frequency_table" v-show="frequencyData.length > 0">
          <!-- @header-click="removeCol" -->
          <el-table
            :data="frequencyData"
            :key='toggleIndex'
            :row-class-name="tableRowClass"
            :max-height="tableHeight">
            <el-table-column
              label="时间"
              width="150">
                <template slot-scope="scope">
                  <div class="row-icon-group">
                    <div>
                      {{startRowIndex+scope.$index}}
                      </div>
                  </div>
                </template>
            </el-table-column>
            <el-table-column
              v-for="(col,index) in tableHeader"
              :key="index"
              :label="col.label"
            >
              <el-table-column
                v-for="(column,idx) in col.propName"
                :key="idx"
                :label="idx+1+''"
                >
                <template slot-scope="scope">
                  <div class="row-icon-group">
                    <div>
                      {{scope.row[dp[index]+idx]}}
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
const Loading = () => import('components/base/Loading')
export default {
  name: 'DataVerification',
  data () {
    return {
      filtersForm: { // 筛选条件集合
        modelId: this.$route.query.modelId || '' // 版本库字段
      },
      options: [],
      versionLibraryList: [], // 版本库列表，后端获取
      filtersRules: { // 必填规则
        modelId: [
          { required: true, message: '请选择版本库', trigger: 'change' }
        ]
      },
      frequencyForm: { // 频率筛选条件
        startLine: 500,
        endLine: 1000,
        paramName: this.$route.query.paramName ? [this.$route.query.paramName] : []
      },
      frequencyRules: { // 必填规则
        paramName: [
          { required: true, message: '请输入参数名称', trigger: 'change' }
        ]
      },
      tableHeader: [], // 表头-参数名
      avg: null, // 平均值
      max: null, // 最大值
      mid: null, // 中位值
      min: null, // 最小值
      multyList: [], // 众数信息
      frequencyData: [], // 频率表格数据
      flightTableData: [], // 航班数据
      rowKey: '',
      toggleIndex: 0,
      tableHeight: 600,
      dp:[]
    }
  },
  computed: {
    ...mapState(['showLoading'])
  },
  components: {
    Loading
  },
  created () {},
  async mounted () {
    const {query} = this.$route
    // this.filtersForm.modelId = 10357
    this.queryLibraryList()
    if (query.modelId) {
      this.queryTableInfo()
    } else {
      this.renderHistory()
    }
    this.$nextTick(()=> {
      let height = window.innerHeight - 58
      this.tableHeight = height
    })
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    tableRowClass ({row, rowIndex}) { // 表格行样式
      row.index = rowIndex
      return 'table-row-class'
    },
    renderHistory () {
      let storageQuery = JSON.parse(Cookies.get('storageQuery')) // 查询条件参数记录
      const {startRowIndex, endRowIndex, parameterName} = storageQuery
      let storageLibVal = Cookies.get('storageLibVal') // 版本库参数记录
      this.filtersForm.modelId = storageLibVal
      this.frequencyForm.startLine = startRowIndex
      this.frequencyForm.endLine = endRowIndex
      this.frequencyForm.paramName = parameterName.split() || []
      this.queryTableInfo()
    },
    async remoteMethod (query) {
      if (this.filtersForm.modelId) {
        if (query !== '') {
          let params = {
              modelId: this.filtersForm.modelId,
              pattern: query
            }
          try {
            let res = await this.unitAxiosFun('searchParams', params)
            if (res.status === 200) {
              const {data = []} = res
              this.options = data
            }
          } catch (error) {
            this.$store.commit('HIDE_LOADING', '加载中！')
          }
        } else {
          this.options = []
        }
      } else {
        this.$message({
          message: '请先选择版本库',
          type: 'warning'
        })
      }
    },
    changeParams (a) {
      if (a.label || this.frequencyForm.paramName.length > 0) {
        this.checkDetail()
      } else {
        this.frequencyData = []
      }
    },
    removeCol (val) { // 点击表格头部删除列
      let numList = ['1', '2', '3', '4', '时间']
      let flag = numList.some(item => {
        return item === val.label
      })
      if (flag) {
        numList = null
        return
      }
      const list = this.frequencyForm.paramName
      if (list.length > 1) {
        this.frequencyForm.paramName = (list.length > 0) && list.filter(item => item !== val.label) || []
        this.checkDetail()
      } else {
        this.$message.warning('至少选择一个参数')
      }
    },
    resetParams () {
      this.avg = null
      this.max = null
      this.mid = null
      this.min = null
      this.multyList = []
      this.tableHeader = []
      this.frequencyData = []
    },
    async checkDetail (row) { // 查询数据
      if (row) {
        this.rowKey = row.ROWKEY
      }
      if (!this.rowKey) {
        this.$message.warning('请先查询航班信息')
        return
      }
      if (this.frequencyForm.paramName.length > 0) {
        let para = this.frequencyForm.paramName.join(',')
        let params = {
          rowkey: row ? row.ROWKEY : this.rowKey,
          startRowIndex: this.frequencyForm.startLine,
          endRowIndex: this.frequencyForm.endLine,
          parameterName: para.replace(/\s*/g, '')
        }
        try {
          let res = await this.unitAxiosFun('getParameterAggregatInfo', params)
          if (res.status === 200) {
            Cookies.set('storageQuery', JSON.stringify(params), {expires: 7})
            this.toggleIndex++
            const {data = {}} = res
            if (data.message == "参数不存在") {
              this.$message.error(data.message)
              this.resetParams()
              return
            }
            const {avg = 0, max = 0, mid = 0, min = 0, thickestValue1 = '',
            thickestValue2 = '', thickestValue3 = '', thickestValue4 = '',
            thickestValue5 = ''} = data
            this.avg = avg
            this.max = max
            this.mid = mid
            this.min = min
            let dataList = [thickestValue1, thickestValue2, thickestValue3, thickestValue4, thickestValue5]
            let multyList = []
            dataList.forEach((item, index) => {
              multyList.push({
                label: this.getLabel(item, ':'),
                value: this.getValue(item, ':')
              })
            })
            this.multyList = multyList
            this.startRowIndex = this.frequencyForm.startLine
            this.endRowIndex = this.frequencyForm.endLine
            let arr = data && data.data || []
            const list = this.getCopyData(arr) 
            if (list.length > 0) {
              this.frequencyData = list.splice(2) // list1去除title的数组列表 list[0]则是title list[1]是桢数
              let map = new Map()
              list[0].forEach((item, index) => {
                if (map.has(item)) {
                  map.get(item).push(list[1][index]);
                } else {
                  let subTitle = [];
                  subTitle.push(list[1][index]);
                  map.set(item,subTitle);
                }
              })
              // 清空数组
              this.tableHeader = [];
              let jump = [0];
              map.forEach((val,key) => {
                let obj = {}
                obj.label = key
                obj.propName = map.get(key)
                this.tableHeader.push(obj)
              })
              // 记录每个子标题的长度
              // 总共有dp.length个title
              // 每个表头下的子表头对应dp[i]
              for (let i = 1; i < this.tableHeader.length; i++) {
                jump[i] = jump[i-1] + this.tableHeader[i-1].propName.length
              }
              this.dp = jump
            }
          } else {
            this.resetParams()
            this.$message.error(res.message)
          }
        } catch (error) {
          this.resetParams()
          this.$store.commit('HIDE_LOADING', '加载中！')
        }
      } else {
          this.$message.warning('至少选择一个参数')
        }
    },
    getLabel (a, b) {
      return a.substring(0, a.indexOf(b))
    },
    getValue (a, b) {
      return a.substring(a.indexOf(b)+1)
    },
    async queryLibraryList () { // 查询版本库列表
      let res = await this.unitAxiosFun('getModels', )
      if (res.status === 200) {
        const {data = []} = res
        this.versionLibraryList = data
      }
    },
    unitAxiosFun (url, params, method ) {
      this.$store.commit('SHOW_LOADING', '加载中...')
      return new Promise((resolve, reject) => {
        this.$axios({
          baseURL: '/pm/parameterMatching',
          method: method || 'get',
          url: url,
          params: params
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '加载中！')
          resolve(response)
        }).catch(error => {
          this.$store.commit('HIDE_LOADING', '加载中！')
          reject(error)
        })
      })
    },
    queryTableInfo (val) { // 查询航班数据
      this.$refs['filtersRef'].validate(async (valid) => {
         if (valid) { // 查询table数据
            let params = { modelId: this.filtersForm.modelId }
            try {
              let res = await this.unitAxiosFun('getRandomFlights', params)
              const {data = []} = res
              Cookies.set('storageLibVal', this.filtersForm.modelId, {expires: 7})
              if (res.status === 200 && data.length > 0) {
                this.flightTableData = data
                this.rowKey = data[0].ROWKEY
                if (this.$route.query.modelId || this.frequencyForm.paramName.length > 0) {
                  this.checkDetail()
                }
              } else if (data.length === 0){
                this.$message.info('航班数据为空')
                this.resetParams()
                this.flightTableData = []
              }
            } catch (error) {
              this.resetParams()
              this.flightTableData = []
              this.$store.commit('HIDE_LOADING', '加载中！')
            }
          } else {
            console.log('error submit!!')
            return false
          }
      })
    },
    getCopyData (obj) {
      let newObj = Array.isArray(obj) ? [] : {}
        for (var i in obj) {
            if (typeof obj[i] === 'object') { // 判断是不是对象（数组或对象）
               newObj[i] = this.getCopyData(obj[i]) // 递归解决多层拷贝
            } else {
                newObj[i] = obj[i]
            }
        }
        return newObj
    }
  },
  destroyed () {}
}
</script>
<style scoped>
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
.data_verification .flight_info {
  display: flex;
}
.data_verification .flight_info .left {
  padding-left: 4px;
}
.data_verification .flight_info .right {
  width: calc(100% - 378px); /* .left 宽度340，留4像素做右边padding */
  padding-left: 4px;
  border-left: 1px solid rgb(211, 211, 211);
}
.data_verification .el-form {
  padding-top: 4px;
}
.data_verification .flight_info .flight_no {
  padding-top: 20px;
  display: flex;
}
.data_verification .flight_info .detail {
  width: 180px;
  height: 420px;
  padding: 0 4px;
}
.data_verification .flight_info .detail div p:first-child {
  margin-top: 0;
}
.data_verification .flight_info .detail h6 {
  margin-top: 48px;
  margin-bottom: 10px;
}
.data_verification .flight_info .detail .style span {
  display: inline-block;
  width: 65%;
}
.data_verification .flight_info .detail .style span + span {
  width: 35%;
}
.data_verification .flight_info .detail p:first-child {
  font-weight: 700;
}
.data_verification .flight_info .flight_table {
  width: 180px;
  height: 420px;
}
.data_verification .flight_info .flight_table .table-row-class-name td div{
  cursor: pointer;
}
.data_verification .el-form.frequency_query .el-select {
  width: 100%;
}
.data_verification .el-form.frequency_query input.el-input__inner {
  width: auto;
}
.data_verification .right .frequency_table {
  height: calc(100% - 58px);
}
.data_verification .right .frequency_table .el-table {
  height: 100%!important;
}
.data_verification .el-table .el-ble__body-wrapper {
  height: calc(100% - 76px)!important;
}
.data_verification .el-table .el-table__body {
  height: 100%!important;
}
.data_verification .el-form .el-row .el-form-item {
  margin-bottom: 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
.data_verification .el-button--primary.is-active, .el-button--primary:active,
.data_verification .el-button--primary:focus {
  background-color: #2A436F;
  border-color: #2A436F;
  background: #2A436F;
}
</style>
<style>
.data_verification .nums_list.el-table .cell,
.el-table--border td .cell,
.el-table--border th .cell {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
