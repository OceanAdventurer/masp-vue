<template>
  <el-dialog class="submit_detail" :close-on-click-modal="false" title="提交详情" :visible.sync="dialogVisible" width="1000px;">
    <div class="detail_content">
      <el-form ref="filtersRef" :model= "filtersForm" :rules="filtesRules" label-width="80px">
        <el-row>
          <el-col :span=6>
            <el-form-item label="模型类别" prop="categoryType">
              <el-select v-model="filtersForm.categoryType" clearable>
                <el-option
                  v-for="item in typeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="模型状态">
              <el-select v-model="filtersForm.modelState" clearable>
                <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=7>
            <el-form-item label="提交日期" prop="createTime">
            <el-date-picker v-model="filtersForm.createTime" format='yyyy-MM-dd' type="date" value-format="yyyy-MM-dd"></el-date-picker>
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
      :height="tableHeight"
      style="width: 100%"
      highlight-current-row
      border>
      <!-- :header-row-class-name="headerRowClassName"
      :row-class-name="tableRowClassName"> -->
      <el-table-column type='index' label="序号" width="50" align="left"></el-table-column>
      <el-table-column prop="modelName" label="名称"></el-table-column>
      <el-table-column prop="categoryType" label="模型类别">
        <template slot-scope="scope">
          <div>{{renderCol(typeList, scope.row.categoryType)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="optUser" label="审批人"></el-table-column>
      <el-table-column prop="modelState" label="模型状态">
        <template slot-scope="scope">
          <div>{{renderCol(statusList, scope.row.modelState)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="提交时间"></el-table-column>
      <el-table-column prop="optTime" label="处理时间"></el-table-column>
      <!-- <el-table-column prop="currentNode" label="当前节点"></el-table-column> -->
      <!-- <el-table-column prop="transferUser" label="当前处理人"></el-table-column> -->
    </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog" size="mini">关  闭</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'submitDetail',
  data () {
    return {
      dialogVisible: false,
      typeList: [],
      tableHeight: 'calc(100% - 62px)',
      statusList: [
        // 10：已创建｜待提交｜已驳回 /20：已提交｜已办理｜待审批 /30：已转办｜待办理 /40：已办理｜待审批 /50：已审批 /60：已驳回/70已上线｜审批通过/80：已下线
        {code: '10', name: '待提交'},
        {code: '20', name: '待审批'},
        {code: '30', name: '待办理'},
        {code: '50', name: '已审批'},
        {code: '70', name: '已上线'},
        {code: '80', name: '已下线'}
      ], // 状态列表
      filtersForm: { // 筛选条件集合
        modelState: '', // 审批状态
        categoryType: '', // 类型
        createTime: '' // 提交日期
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
    // this.$nextTick(() => {
    // })
    this.$bus.$on('submit_details', () => {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.filtersRef && this.$refs.filtersRef.resetFields()
        this.queryTableInfo()
        this.getTypeList()
      })
    })
  },
  methods: {
    queryTableInfo (val) { // 查询审批详情
      // this.$refs['filtersRef'].validate(valid => {
      //    if (valid) { // 查询table数据
            const {modelState, categoryType, createTime} = this.filtersForm
            let obj = {
              modelState,
              categoryType,
              createTime
            }
            // encodeURIComponent(modelState)
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
            url: '/modelMotion/showModelApproveNode',
            method: 'post',
            data: obj
          }).then(res => {
              if (res.status === 200) {
                this.submitData = res.data || []
              } else {
                this.submitData = []
              }
              this.$store.commit('HIDE_LOADING', '加载中！')
            }).catch(err => {
              console.log(err)
              this.$store.commit('HIDE_LOADING', '加载中！')
            })
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      // })
    },
    getTypeList () {
      this.$store.commit('SHOW_LOADING', '加载中...')
      this.$axios({
        url: '/modelMotion/getModelCategory',
        method: 'get'
        }).then(res => {
        if (res.status === 200) {
          let list = res.data || []
          this.typeList = list
        } else {
          this.$message.error('操作失败，请稍后重试！')
        }
        this.$store.commit('HIDE_LOADING', '加载中！')
      }).catch(err => {
        console.log(err)
        this.$store.commit('HIDE_LOADING', '加载中！')
      })
    },
    closeDialog () {
      this.dialogVisible = false
      this.filtersForm = {}
      this.submitData = []
    },
    renderCol (list, value) {
      return (list.find(item => item.code === value) && list.find(item => item.code === value).name) || '-'
    }
  },
  destroyed () {}
}
</script>

<style scoped>

</style>

<style>
  .submit_detail .el-dialog {
    width: 80%;
  }
  .submit_detail .el-dialog .el-dialog__body {
    /* max-height: 80%; */
    height: 400px;
  }
  .submit_detail .el-dialog .detail_content {
    height: 100%;
  }
  .submit_detail .el-dialog .detail_content .el-row {
    height: 56px;
    padding-top: 10px;
  }
  .submit_detail .el-dialog .detail_content .el-table {
    height: calc(100% - 85px)!important;
  }
  .submit_detail .el-dialog__body {
    padding: 0 20px
  }
</style>
