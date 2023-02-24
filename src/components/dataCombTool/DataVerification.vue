
<template>
  <div class="data_verification pos-a w100 h100 df df-fd-c">
    <div class="flight_info">
      <div class="left">
        <el-form ref="filtersRef" :model= "filtersForm" :rules="filtersRules" label-width="80px">
            <el-row>
                <el-col :span=14>
                    <el-form-item label="版本库" prop="modelId">
                      <el-select v-model="filtersForm.modelId" filterable placeholder="请选择版本库">
                      <el-option
                        v-for="item in versionLibraryList"
                        :key="item.ID"
                        :value="item.ID">
                      </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span=2 :offset="1">
                    <el-button type='primary' icon="el-icon-search" @click="queryTableInfo">搜索</el-button>
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
          <!-- <div v-show="frequencyData.length>0"> -->
            <p>最大值：{{max}}</p>
            <p>最小值：{{min}}</p>
            <p>中位值：{{mid}}</p>
            <p>平均值：{{avg}}</p>
          </div>
        </div>
        </div>
      </div>
      <div class="right">
        <el-form ref="frequencyFilters" class='frequency_query' :model= "frequencyForm" :rules="frequencyRules" label-width="80px">
          <el-row>
              <el-col :span=4>
                  <el-form-item label="开始时间" prop="startLine">
                      <el-input type='number' class="numberOnly" v-model.number="frequencyForm.startLine" placeholder="请输入开始时间"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span=4>
                        <!-- onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which)))|| event.which === 8" -->
                  <el-form-item label="结束时间" prop="endLine">
                      <el-input
                        type='number'
                        min='1'
                        class="numberOnly"
                        v-model.number="frequencyForm.endLine"
                        placeholder="请输入结束时间"></el-input>
                  </el-form-item>
              </el-col>
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
              <el-col :span=2 style="margin-left: 10px">
                  <el-button type='primary' icon="el-icon-search" @click="checkDetail()">筛选</el-button>
              </el-col>
          </el-row>
        </el-form>
            <!-- :height="tableHeight" -->
        <div class="frequency_table" v-show="frequencyData.length > 0">
          <el-table
            :data="frequencyData"
            :key='toggleIndex'
            :row-class-name="tableRowClass"
            height='620'
            @header-click="removeCol">
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
              <template slot-scope="scope">
                <i>{{scope.row.label}}</i>
              </template>
              <el-table-column
                v-for="(column,idx) in col.propName"
                :key="idx"
                :label="idx+1+''"
                >
                  <template slot-scope="scope">
                    <div class="row-icon-group">
                      <div>
                        {{scope.row[idx]}}
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
export default {
  name: 'DataVerification',
  data () {
    return {
      filtersForm: { // 筛选条件集合
        modelId: '' // 版本库字段
      },
      options: [],
      versionLibraryList: [], // 版本库列表，后端获取
      paramNameList: [], // 某版本库下的参数名称列表
      filtersRules: { // 必填规则
        modelId: [
          { required: true, message: '请选择版本库', trigger: 'change' }
        ]
      },
      frequencyForm: { // 频率筛选条件
        startLine: 500,
        endLine: 1000,
        paramName: []
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
      frequencyData: [], // 频率表格数据
      flightTableData: [], // 航班数据
      rowKey: '',
      toggleIndex: 0,
      tableHeight: `calc(100% - 54px)`
    }
  },
  created () {
    // console.log(this.$route, 'route----test')
  },
  mounted () {
    // const {query} = this.$route
    // this.filtersForm.modelId = 10357
    this.queryLibraryList()
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
    remoteMethod (query) {
      if (this.filtersForm.modelId) {
        if (query !== '') {
          this.$store.commit('SHOW_LOADING', '加载中...')
          this.$axios({
            baseURL: '/pm',
            url: '/parameterMatching/searchParams',
            method: 'get',
            params: {
              modelId: this.filtersForm.modelId,
              pattern: query
            }
          }).then(res => {
            this.$store.commit('HIDE_LOADING', '加载中！')
            if (res.status === 200) {
              const {data = []} = res
              this.options = data
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('请求响应失败，请稍后重试！')
            this.$store.commit('HIDE_LOADING', '加载中！')
          })
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
      const list = this.frequencyForm.paramName
      if (list.length > 1) {
        this.frequencyForm.paramName = (list.length > 0) && list.filter(item => item !== val.label) || []
        this.checkDetail()
      } else {
        this.$message.warning('至少选择一个参数')
      }
    },
    checkDetail (row, type) { // 查询数据
      if (row) {
        this.rowKey = row.ROWKEY
      }
      if (!this.rowKey) {
        this.$message.warning('请先查询航班信息')
        return
      }
      if (this.frequencyForm.paramName.length > 0) {
        let para = this.frequencyForm.paramName.join(',')
        this.$store.commit('SHOW_LOADING', '加载中...')
        this.$axios({
          baseURL: '/pm',
          url: '/parameterMatching/getParameterAggregatInfo',
          method: 'get',
          params: {
            rowkey: row ? row.ROWKEY : this.rowKey,
            startRowIndex: this.frequencyForm.startLine,
            endRowIndex: this.frequencyForm.endLine,
            parameterName: para.replace(/\s*/g, '')
          }
        }).then(res => {
          this.$store.commit('HIDE_LOADING', '加载中！')
          if (res.status === 200) {
            this.toggleIndex++
            const {data = {}} = res
            const {avg = 0, max = 0, mid = 0, min = 0} = data
            this.avg = avg
            this.max = max
            this.mid = mid
            this.min = min
            this.startRowIndex = this.frequencyForm.startLine
            this.endRowIndex = this.frequencyForm.endLine
            const arr = [data && data.data || []]
            const list = this.getCopyData(arr[0])
            if (list.length > 0) {
              let contentList = list.splice(2) // list1去除title的数组列表 list[0]则是title list[1]是桢数
              this.frequencyData = contentList
              let arr2 = []
              let obj = {}
              list[0].forEach((item, index) => {
                let val = list[0][index]
                if (arr2.indexOf(list[0][index]) === -1) {
                  arr2.push(list[0][index])
                }
                if (!obj[val]) {
                  obj[val] = 1
                } else {
                  obj[val]++
                }
              })
              let titleArr = []
              arr2.forEach((item, index) => {
                titleArr.push({
                  'label': item,
                  'propName': new Array(obj[item])
                })
              })
              this.tableHeader = titleArr
              arr2 = null
            }
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('请求响应失败，请稍后重试！')
          this.$store.commit('HIDE_LOADING', '加载中！')
        })
      } else {
        this.$message.warning('至少选择一个参数')
      }
    },
    queryLibraryList () { // 查询版本库列表
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        baseURL: '/pm',
        url: '/parameterMatching/getModels',
        method: 'get'
      }).then(res => {
        this.$store.commit('HIDE_LOADING', '加载中！')
        if (res.status === 200) {
          const {data = []} = res
          this.versionLibraryList = data
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求响应失败，请稍后重试！')
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    getAxiosData (url, method, params) {
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        baseURL: '/pm',
        url,
        method: method || 'get',
        params: params || undefined
      }).then(res => {
        this.$store.commit('HIDE_LOADING', '加载中！')
        return res
      }).catch(err => {
        console.log(err)
        this.$message.error('请求响应失败，请稍后重试！')
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    queryTableInfo (val) { // 查询航班数据
      this.$refs['filtersRef'].validate(valid => {
         if (valid) { // 查询table数据
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
              baseURL: '/pm',
              url: '/parameterMatching/getRandomFlights',
              method: 'get',
              params: {
                modelId: this.filtersForm.modelId
              }
            }).then(res => {
              if (res.status === 200) {
                const {data = []} = res
                this.flightTableData = data
                this.rowKey = data[0].ROWKEY
              }
              this.$store.commit('HIDE_LOADING', '加载中！')
            }).catch(err => {
              console.log(err)
              this.$message.error('请求响应失败，请稍后重试！')
              this.$store.commit('HIDE_LOADING', '加载中！')
            })
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
  }
}
</script>
<style scoped>
.data_verification .flight_info {
  display: flex;
  width: 100%;
  height: 100%;
  /* border-top: 1px solid #3a6bb9; */
}
.data_verification .flight_info .left {
  padding-left: 4px;
  border-right: 1px solid rgb(211, 211, 211);
}
.data_verification .flight_info .right {
  width: calc(100% - 344px); /* .left 宽度340，留4像素做右边padding */
  height: 100%;
  padding-left: 4px;
  /* border: 1px solid #EBEEF5; */
}
.data_verification .el-form {
  padding-top: 4px;
}
.data_verification .flight_info .flight_no {
  display: flex;
}
.data_verification .flight_info .detail {
  width: 130px;
  height: 420px;
  padding-left: 10px;
}
.data_verification .flight_info .flight_table {
  width: 180px;
  height: 420px;
}
.data_verification .el-form.frequency_query .el-select {
  width: 100%;
}
.data_verification .el-form.frequency_query input.el-input__inner {
  width: auto;
}
.data_verification .right .frequency_table .el-table {
  height: 100%;
}
.data_verification .el-table.el-table--fit.el-table--border.el-table--group.el-table--scrollable-y.el-table--enable-row-hover .el-table__body-wrapper  {
  height: 100%;
}
.data_verification .el-form .el-row .el-form-item {
  margin-bottom: 10px;
}
.data_verification .flight_info .center {
  /* border: 1px solid #EBEEF5;
  margin: 0 10px; */
}
.numberOnly input[type='number'] {
  -moz-appearance: textfield;
}
</style>
