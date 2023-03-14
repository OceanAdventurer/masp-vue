<template>
  <div
    class="margin-top-10 IN_manage"
    v-loading="downLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div class="fleet-dialog">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="机场1" prop="airport1">
            <el-input
              v-model="ruleForm.airport1"
              @keyup.native="
                ruleForm.airport1 = ruleForm.airport1
                  .replace(/[^a-zA-Z]/g, '')
                  .toUpperCase()
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="机场2" prop="airport2">
            <el-input
              v-model="ruleForm.airport2"
              @keyup.native="
                ruleForm.airport2 = ruleForm.airport2
                  .replace(/[^a-zA-Z]/g, '')
                  .toUpperCase()
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="机场3" prop="airport3">
            <el-input
              v-model="ruleForm.airport3"
              @keyup.native="
                ruleForm.airport3 = ruleForm.airport3
                  .replace(/[^a-zA-Z]/g, '')
                  .toUpperCase()
              "
            ></el-input>
          </el-form-item>
          <el-form-item
            label="注销日期"
            prop="logoutDate"
            class="executionRate-endTime"
          >
            <el-date-picker
              v-model="ruleForm.logoutDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="受限期" prop="restrictedPeriod">
            <el-input
              v-model="ruleForm.restrictedPeriod"
              @keyup.native="
                ruleForm.restrictedPeriod = ruleForm.restrictedPeriod.replace(
                  /[^\d]/g,
                  ''
                )
              "
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    
    <!-- 数据展示 -->
    <el-card class="margin-top-10">
      <app-table
        :list-query-params.sync="listQueryParams"
        v-bind="defaultTableAttrs"
        v-on="defaultTableEvent"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Aircraft',
  data() {
    return {
      airport: '',
      downLoading: false,
      title: '',
      logoutDate: '',
      ruleFormData: {
        airport1: '',
        airport2: '',
        airport3: '',
        logoutDate: '',
        restrictedPeriod: ''
      },
      ruleForm: {
        airport1: '',
        airport2: '',
        airport3: '',
        logoutDate: '',
        restrictedPeriod: ''
      },
      rules: {
        airport1: [
          { required: true, message: '请输入三字码', trigger: 'blur' },
          { min: 3, max: 3, message: '长度为3个字符', trigger: 'blur' }
        ],
        airport2: [
          { required: true, message: '请输入三字码', trigger: 'blur' },
          { min: 3, max: 3, message: '长度为3个字符', trigger: 'blur' }
        ],
        airport3: [
          { required: false, message: '请输入三字码', trigger: 'blur' },
          { min: 3, max: 3, message: '长度为3个字符', trigger: 'blur' }
        ],
        logoutDate: [
          { required: true, message: '请输入注销日期', trigger: 'blur' }
        ],
        restrictedPeriod: [
          { required: true, message: '请输入数字', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      // 操作栏宽度
      optionWidth: 150,
      // 是否显示序号
      isShowNumber: false,
      // 操作栏按钮
      buttonsName: {
        normal: ['编辑', '删除'],
        icon: ['edit', 'trash']
      },
      isHasButtons: false,
      isHasButtonIcon: true,
      tableConfig: [
        {
          label: '航线',
          prop: 'route'
        },
        {
          label: '注销日期',
          prop: 'logoutDate'
        },
        {
          label: '受限期',
          prop: 'restrictedPeriod'
        },
        {
          label: '操作人',
          prop: 'modifierName'
        },
        {
          label: '操作时间',
          prop: 'modifiedAt'
        }
      ]
      // params: {
      //   ...defaultSearch
      //   // ...DefaultPageInfo
      // }
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    async getList() {
      this.loadingStatus = true
      // console.log(DefaultPageInfo)
      const params = {
        airport: this.airport,
        pageSize: this.listQueryParams.limit,
        pageNum: this.listQueryParams.page
      }
      await TrafficRights.landingLogoutPage(params)
        .then(res => {
          if (res.success) {
            this.loadingStatus = false
            this.listQueryParams.total = res.data.total
            this.tableData = res.data.list
            this.tableData.map((item, index) => {
              if (item.logoutDate) {
                this.tableData[index].logoutDate = this.getDatas(
                  item.logoutDate
                )
              }
              if (item.modifiedAt) {
                this.tableData[index].modifiedAt = this.getData(item.modifiedAt)
              }
            })
          } else {
            this.loadingStatus = false
            this.$message.error(res.msg)
          }
        })
        .catch(() => {
          this.loadingStatus = false
          this.$message.error('数据加载失败')
        })
    },
    //将时间戳转成日期
    getData(timesTamp) {
      var date = new Date(timesTamp)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D =
        (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      let h =
        date.getHours() < 10
          ? '0' + date.getHours() + ':'
          : date.getHours() + ':'
      let m =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      // let s = date.getSeconds()
      // let s = date.getSeconds()
      return Y + M + D + h + m
    },
    //将时间戳转成日期
    getDatas(timesTamp) {
      var date = new Date(timesTamp)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()
      // let s = date.getSeconds()
      // let s = date.getSeconds()
      return Y + M + D
    },
    // handleRefreshList(dataInfo) {
    //   console.log(dataInfo)
    //   console.log(this.listQueryParams)
    // },
    // 表格操作功能
    handleTableOption(index, row, option) {
      console.log(index, row)
      if (option === '编辑') {
        this.title = '管理编辑'
        this.dialogVisible = true
        if (row.route) {
          let flightData = row.route.split('-')
          console.log(flightData)
          this.ruleForm.airport1 = flightData[0]
          this.ruleForm.airport2 = flightData[1]
          this.ruleForm.airport3 = flightData[2]
          this.ruleForm.logoutDate = row.logoutDate
          this.ruleForm.restrictedPeriod = row.restrictedPeriod
          this.ruleForm.id = row.id
        }

        // DataBase.updateAirport(this.ruleForm)
        // this.$message.warning(option)
      } else if (option === '删除') {
        TrafficRights.landingLogoutDelete(row.id)
          .then(res => {
            if (res.success) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      }
    },
    // 检索
    handleSearch() {
      this.listQueryParams.page = 1
      // this.params.account = this.search.account
      // this.params.queryBeginTime = this.search.time[0]
      // this.params.queryEndTime = this.search.time[1]
      this.getList()
    },
    // 清除检索
    handleClear() {
      this.listQueryParams.page = 1
      this.listQueryParams.limit = 10
      this.logoutDate = ''
      this.getList()
    },
    // 下载
    handleVersion() {
      this.downLoading = true
      MilitaryAirport.airportMixExport()
        .then(res => {
          let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = '军民合用机场管理.xlsx'
          a.click()
          // 释放这个临时的对象objectUrl
          URL.revokeObjectURL(url)
          this.downLoading = false
        })
        .catch(() => {
          this.$message.error('下载失败')
          this.downLoading = false
        })
    },
    // 新增
    handleAdd() {
      this.title = '管理新增'
      this.dialogVisible = true
    },
    //关闭新增
    handleClose() {
      this.ruleForm = this.ruleFormData
      this.dialogVisible = false
    },
    //新增/编辑机场
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.title === '管理新增') {
            console.log(this.ruleForm)
            TrafficRights.landingLogoutCreate(this.ruleForm)
              .then(res => {
                if (res.success) {
                  this.$refs[formName].resetFields()
                  this.dialogVisible = false
                  this.getList()
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  message: '新增失败',
                  type: 'error'
                })
              })
          } else if (this.title === '管理编辑') {
            TrafficRights.landingLogoutUpdate(this.ruleForm)
              .then(res => {
                if (res.success) {
                  this.$refs[formName].resetFields()
                  this.dialogVisible = false
                  this.getList()
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  message: '编辑失败',
                  type: 'error'
                })
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
.IN_manage {
  .executionRate-endTime .el-input--small .el-input__inner {
    padding-left: 30px !important;
  }
}
.demo-ruleForm .el-form-item {
  display: inline-block;
}
.demo-ruleForm .time {
  margin-bottom: 0;
}
</style>
