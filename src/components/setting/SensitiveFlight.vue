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
        :data="roleTableData"
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
        flighDate: this.$moment().startOf('day'), //航班日期默认为当天
        flightNo: '',
        depAirport: '',
        arrAirport: '',
        tailNo: ''
      },
      filtesRules: {
        flightDate: [
          { required: true, message: '请选择航班日期', trigger: 'blur' }
        ]
      },
      starts: [],
      lands: [], //落地机场
      userKeyword: '', // 用户搜索关键字
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示数量
      roleTableData: [], // 用户角色数据
      visibleRoleDialog: false, // 是否显示dialog
      dialogTitle: '权限', // dialog的标题
      dialogFlag: '', // dialog的操作标识
      roleInputValue: '', // 角色名字默认值
      checkAll: false, // 是否全选权限标识
      checkRolesData: [], // 权限复选框所有数据
      checkedRoles: [], // 默认选中权限的数据
      isIndeterminate: true, // checkbox不确定状态，负责控制样式
      roleSelectValue: '', // 角色下拉框的默认数据
      roleChooseData: [], // 角色对应权限的默认数据
      roleLabelToValueObj: {}, // 角色列表中名称和值对应的对象
      currentUserId: '', // 表格中选中的用户编号
      total: 0
    }
  },
  created () {
      this.filtersForm.flighDate = new Date() //航班日期默认为当天
      this.$refs.filtersRef.resetField('filtersForm.flightDate', '2023-02-22')
    // console.log(this.$store.getters.userInfo.isAdmin, 'admin---test') //是否管理员
  },
  // watch: {
  //   userKeyword: function (val) {
  //     this.$axios.get('userRight/getUserRoleList').then(response => {
  //       let resultData = response.data.result.data
  //       if (resultData.length > 0) {
  //         resultData.map((item, index) => {
  //           item.id = index + 1
  //           if (item['ROLE_NAME'] === '') {
  //             item['ROLE_NAME'] = '无数据'
  //           }
  //         })
  //       }
  //       this.roleTableData = resultData.filter(s => s.LOGIN_NAME.toLowerCase().indexOf(val.toLowerCase()) >= 0)
  //     })
  //   }
  // },
  mounted () {
    // this.filtersForm.flighDate = this.$moment().startOf('day').format('YYYY-MM-DD') //航班日期默认为当天
    this.setDefaultDate()
    this.queryTableInfo()
  },
  methods: {
    headerRowClassName ({row, rowIndex}) { // 表格头部样式
      return 'header-row-class-name'
    },
    tableRowClassName ({row, rowIndex}) { // 表格行样式
      return 'table-row-class-name'
    },
    setDefaultDate (val) {
      // this.filtersForm.flighDate = val //航班日期默认为当天
      // this.$set(this.filtersForm, 'flighDate', this.$moment().startOf('day').format('YYYY-MM-DD'))
      // this.queryTableInfo()
      // console.log(this.filtersForm.flighDate, 'this.filtersForm.flighDate--test')
    },
    handleCurrentChange (val) { // 点击页码进行的操作
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.queryTableInfo()
    },
    setSecret (row, e) {
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
            this.queryTableInfo()
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
    queryTableInfo (val) {
      this.$refs['filtersRef'].validate(valid => {
         if (valid) { // 查询table数据
            const {flightDate, flightNo, arrAirport, depAirport, tailNo} = this.filtersForm
            this.$store.commit('SHOW_LOADING', '加载中...')
            this.$axios({
              url: '/flightControl/searchFlight',
              method: 'get',
              params: {
                flightDate,
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
                this.roleTableData = content
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
    },
    showRoleDialog (type, value) { // 页面不同位置打开dialog的按钮；type:类型，value：值
      console.log('showRoleDialog@@@@@:', type, value)
      let typeDataObj = { // 打开dialog不同类型的对象
        'addRole': '增加角色权限',
        'updateRole': '修改角色权限',
        'updateUserRole': '修改用户角色权限'
      }
      if (type === 'updateUserRole') {
        this.currentUserId = value['TO_ID'] // 赋值当前选中的用户编号，修改角色权限时使用
      }
      if (this.currentUserId === '' && type === 'updateUserRole') {
        this.$message({
          message: '用户编号为空，无法修改！',
          type: 'warning'
        })
        return false
      }
      this.roleSelectValue = value.TR_ID
      this.dialogTitle = typeDataObj[type] // 设置dialog标题
      this.dialogFlag = type // 设置dialog的标识
      this.visibleRoleDialog = true // 显示dialog
    }
  }
}
</script>
<style scoped>
.sensitive_flight .el-form {
  margin: 20px 20px 0;
}
.sensitive_flight .el-form .airport {
  margin-left: 20px;

}
.sensitive_flight .el-form .airport .el-form-item div.el-form-item__content .el-input{
  /* display: flex; */
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
.role-permissions-input i {
  position: relative;
  left: -40px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.role-dialog >>> .el-dialog__header {
  border-bottom: 1px solid #DDDDDD;
}
.no-role-data {
  margin-top: 10;
}
</style>
