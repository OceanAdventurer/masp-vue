<template>
  <div class="data_verification pos-a w100 h100 df df-fd-c">
    <el-form ref="filtersRef" :model= "filtersForm" :rules="filtersRules" label-width="80px">
        <el-row>
            <el-col :span=6>
                <el-form-item label="版本库" prop="modelId">
                  <el-select v-model="filtersForm.modelId" filterable placeholder="请选择版本库">
                  <el-option
                    v-for="item in versionLibraryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span=6>
                <el-form-item label="参数名称" prop="paramName">
                    <el-input v-model="filtersForm.paramName" placeholder="请输入参数名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span=2>
                <el-button type='primary' icon="el-icon-search" @click="queryTableInfo(1)">搜索</el-button>
            </el-col>
            <el-col :span=2>
                <el-button type='primary' icon="el-icon-thumb" @click="queryTableInfo('add')">追加</el-button>
            </el-col>
        </el-row>
    </el-form>
    <div class="flight_info">
      <div class="flight_no left">
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
          @row-click='checkDetail'
          :header-row-class-name="headerRowClassName"
          :row-class-name="tableRowClassName">
          <el-table-column prop="flight_no" label="航班号"></el-table-column>
        </el-table>
      </div>
      <div class="center">
        center
      </div>
      <div class="right">
        right
        <div class="right_top">
          最大值最小值中位值等信息
        </div>
        <div class="right_bottom">
          <el-form ref="frequencyFilters" class='frequency_query' :model= "frequencyForm" label-width="80px">
              <el-row>
                  <el-col :span=6>
                      <el-form-item label="开始时间" prop="startLine">
                          <el-input type='number' class="numberOnly" v-model.number="filtersForm.startLine" placeholder="请输入开始时间"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span=6>

                            <!-- onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which)))|| event.which === 8" -->
                      <el-form-item label="结束时间" prop="endLine">
                          <el-input
                            type='number'
                            min='1'
                            class="numberOnly"
                            v-model.number="filtersForm.endLine"
                            placeholder="请输入结束时间"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span=2>
                      <el-button type='primary' icon="el-icon-search" @click="queryTableInfo(1)">筛选</el-button>
                  </el-col>
              </el-row>
          </el-form>
          <div class="frequency_table">
            <el-table
              :data="frequencyData"
              style="width: 100%">
              <el-table-column
                prop="time"
                label="时间"
                width="150">
              </el-table-column>
              <el-table-column :label="filtersForm.paramName || 'RALTC'">
                <el-table-column
                  prop="1"
                  label="1"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="2"
                  label="2"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="3"
                  label="3"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="4"
                  label="4"
                  width="120">
                </el-table-column>
              </el-table-column>
              <el-table-column label="ALT">
                <el-table-column
                  prop="1"
                  label="1"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="2"
                  label="2"
                  width="120">
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="df df-jc-fe df-ai-c pos-r w100 h10">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="total">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'DataVerification',
  data () {
    return {
      filtersForm: { // 筛选条件集合
        modelId: '', // 版本库字段
        paramName: '' // 参数名称字段
      },
      versionLibraryList: [], // 版本库列表，后端获取
      filtersRules: { // 必填规则
        modelId: [
          { required: true, message: '请选择版本库', trigger: 'change' }
        ]
        // paramName: [
        //   { required: true, message: '请输入参数名称', trigger: 'blur' }
        // ]
      },
      frequencyForm: { // 频率筛选条件
        startLine: '',
        endLine: ''
      },
      frequencyData: [], // 频率表格数据
      userKeyword: '', // 用户搜索关键字
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示数量
      flightTableData: [], // 用户角色数据
      total: 0 // 总页数
      // fakeData: { 'result': {'data': [{'id': 'djkajgkdjlkgjfl', 'FLIGHT_NO': 'MU8838'}, {'id': 'DSAFDSGDGFA', 'FLIGHT_NO': 'MU8839'}, {'id': 'DSADFDSAF', 'FLIGHT_NO': 'MU8840'}, {'id': 'djkaDSAjgkdjlkgjfl', 'FLIGHT_NO': 'MU8841'}]}, 'status': '0'}
    }
  },
  created () {
    console.log(this.$route, 'route----test')
  },
  mounted () {
    // const {query} = this.$route
    this.filtersForm.modelId = '1619'
    this.filtersForm.paramName = 'RALTC'
    this.queryTableInfo()
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    handleCurrentChange (val) { // 点击页码进行的操作
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.queryTableInfo()
    },
    checkDetail (val) {
      console.log(val, 'checkDetail---test')
    },
    queryTableInfo (val) { // 查询航班数据
      this.$refs['filtersRef'].validate(valid => {
         if (valid) { // 查询table数据
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
              url: '/pm/parameterMatching/getRandomFlights',
              method: 'get',
              params: {
                modelId: this.filtersForm.modelId
              }
            }).then(res => {
              if (res.status === 200) {
                // const {data: {content, pageSize, pageNo, recordCount}} = res
                console.log(res, 'res------test')
                // this.flightTableData = content
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
    }
  }
}
</script>
<style scoped>
.data_verification .el-form {
  margin: 20px 20px 0;
}
.data_verification .el-form .el-row .el-col:nth-last-child(2) {
  margin-left: 20px;
}
.data_verification .flight_info {
  display: flex;
  width: 100%;
  height: 100%;
  border-top: 1px solid #3a6bb9;
  padding: 10px;
}
.data_verification .flight_info .flight_no.left,
.data_verification .flight_info .center {
  width: 200px;
}
.data_verification .flight_info .center {
  border: 1px solid #EBEEF5;
  margin: 0 10px;
}
.data_verification .flight_info .right {
  width: calc(100% - 450px);
  border: 1px solid #EBEEF5;
}
.data_verification .flight_info .right .right_top {
  height: 200px;
}
.numberOnly input[type='number'] {
  -moz-appearance: textfield;
}
</style>
