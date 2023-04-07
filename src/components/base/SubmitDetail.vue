<template>
  <el-dialog class="submit_detail" title="提交详情" :visible.sync="dialogVisible" width="1000px;">
    <div class="detail_content">
      <el-form ref="filtersRef" :model= "filtersForm" :rules="filtesRules" label-width="80px">
        <el-row>
          <el-col :span=6>
            <el-form-item label="类型" prop="type">
              <el-select v-model="filtersForm.type">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="审批状态">
              <el-select v-model="filtersForm.type">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=7>
            <el-form-item label="提交日期" prop="submitTime">
            <el-date-picker v-model="filtersForm.submitTime" format='yyyy-MM-dd' type="date"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span=2 :offset="1">
            <el-button type='primary' icon="el-icon-search" @click="queryTableInfo">搜索</el-button>
          </el-col>
        </el-row>
    </el-form>
    <el-table
      :row-style="{height:'38px'}"
      :cell-style="{padding:'0px'}"
      :header-row-style="{height:'38px'}"
      :header-cell-style="{padding:'0px'}"
      :data="submitData"
      height="100%"
      style="width: 100%"
      highlight-current-row
      fit
      border>
      <!-- :header-row-class-name="headerRowClassName"
      :row-class-name="tableRowClassName"> -->
      <el-table-column type='index' label="序号" width="100" align="left"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <div>{{scope.type}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="auditBy" label="审批人"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>{{scope.status}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="submitTime" label="提交时间"></el-table-column>
      <el-table-column prop="auditTime" label="审批时间"></el-table-column>
      <el-table-column prop="currentNode" label="流转节点"></el-table-column>
    </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">关  闭</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'submitDetail',
  data () {
    return {
      dialogVisible: false,
      typeList: [
        {label: '基础风险分析', value: 1},
        {label: '核心风险分析', value: 2},
        {label: '专题分析', value: 3}
      ],
      statusList: [], // 状态列表
      filtersForm: { // 筛选条件集合
        status: '', // 审批状态
        type: '', // 类型
        submitTime: this.$moment().startOf('day') // 提交日期
      },
      filtesRules: { // 必填规则
        // flightDate: [
        //   { required: true, message: '请选择航班日期', trigger: 'blur' }
        // ]
      },
      submitData: []
    }
  },
  mounted () {
    this.$bus.$on('submit_details', () => {
      this.dialogVisible = true
    })
  },
  methods: {

    queryTableInfo (val) { // 查询航班数据
      // this.$refs['filtersRef'].validate(valid => {
      //    if (valid) { // 查询table数据
      //       const {flightDate, flightNo, arrAirport, depAirport, tailNo} = this.filtersForm
      //       this.$store.commit('SHOW_LOADING', '加载中...')
      //       this.$axios({
      //         url: '/flightControl/searchFlight',
      //         method: 'get',
      //         params: {
      //           flightDate: this.$moment(flightDate).format('YYYY-MM-DD'),
      //           flightNo,
      //           arrAirport,
      //           depAirport,
      //           tailNo,
      //           pageNo: val || 1,
      //           pageSize: this.pageSize
      //         }
      //       }).then(res => {
      //         if (res.status === 200) {
      //           const {data: {content, pageSize, pageNo, recordCount}} = res
      //           content.map(item => {
      //             if (item.is_hidden === '1') {
      //               item.is_hidden = true
      //             } else {
      //               item.is_hidden = false
      //             }
      //           })
      //           this.flightTableData = content
      //           this.pageSize = pageSize
      //           this.currentPage = pageNo
      //           this.total = recordCount
      //         }
      //         this.$store.commit('HIDE_LOADING', '加载中！')
      //       }).catch(err => {
      //         console.log(err)
      //         this.$message.error('请求响应失败，请稍后重试！')
      //         this.$store.commit('HIDE_LOADING', '加载中！')
      //       })
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      // })
    }
  }
}
</script>

<style scoped>

</style>

<style>
  .submit_detail .el-dialog {
    width: 80%;
  }
  .submit_detail .el-dialog__body {
    padding: 0 20px
  }
</style>
