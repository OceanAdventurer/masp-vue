<template>
  <div class="sensitive_flight pos-a w100 h100 df df-fd-c">
    <el-form ref="filtersRef" :model= "filtersForm" :rules="filtesRules" label-width="80px">
        <el-row>
            <el-col :span=6>
                <el-form-item label="航班日期" prop="flightDate">
                    <el-date-picker v-model="filtersForm.flightDate" format='yyyy-MM-dd' type="date"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span=6>
                <el-form-item label="航班号">
                    <el-input v-model="filtersForm.flightNo" placeholder="请输入航班号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span=9 class='airport'>
                <el-form-item label="起降机场">
                  <el-input v-model="filtersForm.depAirport" placeholder="请输入起飞机场"></el-input> -
                  <el-input v-model="filtersForm.arrAirport" placeholder="请输入降落机场"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span=2>
                <el-button type='primary' icon="el-icon-search" @click="queryTableInfo(1)">搜索</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=6>
                <el-form-item label="机尾号"  placeholder="请输入机尾号">
                    <el-input v-model="filtersForm.tailNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="pos-r w100 h80">
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        :data="flightTableData"
        height="100%"
        style="width: 100%"
        highlight-current-row
        fit
        border
        :header-row-class-name="headerRowClassName"
        :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="id" width="100" align="left"></el-table-column>
        <el-table-column prop="flight_date" label="航班日期"></el-table-column>
        <el-table-column prop="flight_number" label="航班号"></el-table-column>
        <el-table-column prop="ac_tail" label="机尾号"></el-table-column>
        <el-table-column prop="depart_port_code3" label="出发机场"></el-table-column>
        <el-table-column prop="arrival_port_code3" label="降落机场"></el-table-column>
        <el-table-column label="是否私密" >
          <template slot-scope="scope">
              <div class="row-icon-group">
                <el-switch
                  active-text="是"
                  inactive-text="否"
                  v-model="scope.row.is_hidden"
                  @change='setSecret(scope.row, $event)'
                >
                </el-switch>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="df df-jc-fe df-ai-c pos-r w100 h10">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SensitiveFlight',
  data () {
    return {
      filtersForm: { // 筛选条件集合
        flightDate: this.$moment().startOf('day'), //航班日期默认为当天
        flightNo: '', // 航班号
        depAirport: '', // 起飞机场
        arrAirport: '', // 降落机场
        tailNo: '' // 机尾号
      },
      filtesRules: { // 必填规则
        flightDate: [
          { required: true, message: '请选择航班日期', trigger: 'blur' }
        ]
      },
      userKeyword: '', // 用户搜索关键字
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示数量
      flightTableData: [], // 用户角色数据
      total: 0 // 总页数
    }
  },
  created () {
  },
  mounted () {
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
    setSecret (row, e) { // 设置是否隐私
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        url: '/flightControl/updateHiddenById',
        method: 'get',
        params: {
          id: row.id,
          isHidden: e ? '1' : '0'
        }}).then(res => {
          if (res.data.status === '0') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            // this.queryTableInfo()
          } else {
            this.$message.error('操作失败，请稍后重试！')
          }
          this.$store.commit('HIDE_LOADING', '加载中！')
        }).catch(err => {
          console.log(err)
          this.$message.error('请求响应失败，请稍后重试！')
          this.$store.commit('HIDE_LOADING', '加载中！')
        })
    },
    queryTableInfo (val) { // 查询航班数据
      this.$refs['filtersRef'].validate(valid => {
         if (valid) { // 查询table数据
            const {flightDate, flightNo, arrAirport, depAirport, tailNo} = this.filtersForm
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
              url: '/flightControl/searchFlight',
              method: 'get',
              params: {
                flightDate: this.$moment(flightDate).format('YYYY-MM-DD'),
                flightNo,
                arrAirport,
                depAirport,
                tailNo,
                pageNo: val || 1,
                pageSize: this.pageSize
              }
            }).then(res => {
              if (res.status === 200) {
                const {data: {content, pageSize, pageNo, recordCount}} = res
                content.map(item => {
                  if (item.is_hidden === '1') {
                    item.is_hidden = true
                  } else {
                    item.is_hidden = false
                  }
                })
                this.flightTableData = content
                this.pageSize = pageSize
                this.currentPage = pageNo
                this.total = recordCount
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
.sensitive_flight .el-form {
  margin: 5px 20px 0;
}
.sensitive_flight .el-form .airport {
  margin-left: 20px;
}
.sensitive_flight .el-form .el-row:first-child .el-col:first-child .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
  width: 100%;
}
.sensitive_flight .el-form .airport .el-form-item div.el-form-item__content .el-input{
  width: 45%;
}
.h10 {
  height: 10%;
}
.h80 {
  height: 82%;
}
.w30 {
  width: 30%;
}
</style>
<style>
.sensitive_flight .el-form .el-form-item {
  margin-bottom: 15px;
}
</style>
