<template>
  <div class="pos-a w100 h100 df df-fd-c">
    <div class="df df-jc-sb df-ai-c pos-r w100 h10" v-show="true">
      <div class="role-permissions-input df df-jc-c df-ai-c w30 ml20">
        <el-input
          placeholder="请输入内容"
          v-model="userKeyword">
        </el-input>
        <i class="el-icon-search" @click="getUserForKeyword"></i>
      </div>
      <!-- <div class="mr20">
        <el-button type="primary" @click="showRoleDialog('addRole')">增加</el-button>
        <el-button type="primary" @click="showRoleDialog('updateRole')">修改</el-button>
      </div> -->
    </div>
    <div class="pos-r w100 h80">
      <el-table
        :row-style="{height:'38px'}"
        :cell-style="{padding:'0px'}"
        :header-row-style="{height:'38px'}"
        :header-cell-style="{padding:'0px'}"
        :data="roleTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        height="100%"
        style="width: 100%"
        highlight-current-row
        fit
        border
        :header-row-class-name="headerRowClassName"
        :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="序号" width="60" align="left"></el-table-column>
        <el-table-column prop="LOGIN_NAME" label="用户名" width="300" align="left"></el-table-column>
        <el-table-column prop="ROLE_NAME" label="角色" width="auto" align="left"></el-table-column>
        <el-table-column label="操作" width="100" align="left">
          <template slot-scope="scope">
              <div class="row-icon-group">
                <div class="icon-edit tab-icon-set mr10" title="修改用户角色" @click="showRoleDialog('updateUserRole', scope.row)"></div>
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
        :total="roleTableData.length">
      </el-pagination>
    </div>
    <div class="role-dialog">
      <el-dialog :title="dialogTitle" :visible.sync="visibleRoleDialog" @close="closeRoleDialog">
        <div class="df df-fd-c">
          <div class="df df-fd-r df-jc-fs df-ai-c" v-show="dialogFlag === 'addRole'">
            <div>角色名字：</div>
            <div>
              <el-input v-model="roleInputValue" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="df df-fd-r df-jc-fs df-ai-c" v-show="dialogFlag !== 'addRole'">
            <div>选择角色：</div>
            <div>
              <el-select v-model="roleSelectValue" placeholder="请选择">
                <el-option
                  v-for="item in roleChooseData"
                  :key="item.TR_ID"
                  :label="item.ROLE_NAME"
                  :value="item.TR_ID">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="mt10" v-show="false">
            <div>选择权限：</div>
            <div class="mt10" v-show="checkRolesData.length > 0">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange" class="mt10">
                <el-checkbox v-for="role in checkRolesData" :label="role" :key="role">{{role}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="no-role-data" v-show="checkRolesData.length <= 0">暂无数据</div>
          </div>
          <div class="df df-jc-fe df-ai-c mt10 mr20">
            <el-button type="primary"  style="width:90px;height:34px" @click="saveRolePermissions">保存</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RolePermissions',
  data () {
    return {
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
      currentUserId: '' // 表格中选中的用户编号
    }
  },
  created () {

  },
  watch: {
    userKeyword: function (val) {
      this.$axios.get('userRight/getUserRoleList').then(response => {
        let resultData = response.data.result.data
        if (resultData.length > 0) {
          resultData.map((item, index) => {
            item.id = index + 1
            if (item['ROLE_NAME'] === '') {
              item['ROLE_NAME'] = '无数据'
            }
          })
        }
        this.roleTableData = resultData.filter(s => s.LOGIN_NAME.toLowerCase().indexOf(val.toLowerCase()) >= 0)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUserRoleAndRoleList() // 获取用户角色列表
    })
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
    },
    getUserRoleAndRoleList () { // 同步获取用户角色和权限列表
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      let that = this
      this.$axios.all([this.$axios.get('userRight/getUserRoleList'),
        this.$axios.get('userRight/getRoleList')])
      .then(this.$axios.spread(function (getUserRoleList, getRoleList) {
        // 所有请求现在都执行完成
        that.getUserRoleListHandle(getUserRoleList)
        that.getRoleListHandle(getRoleList)
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      })).catch(response => {
        // 请求失败
        that.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        that.$message.error('请求响应失败，请稍后重试！')
      })
    },
    getUserRoleListHandle (response) { // 获取用户权限列表
      console.log('getUserRoleList~~~:', response)
      let data = response.data
      if (data.status === '0') {
        let resultData = data.result.data
        if (resultData.length > 0) {
          resultData.map((item, index) => {
            item.id = index + 1
            if (item['ROLE_NAME'] === '') {
              item['ROLE_NAME'] = '无数据'
            }
          })
          this.roleTableData = resultData
        } else {
          this.roleTableData = []
        }
      } else {
        this.$message.error(data.message)
      }
    },
    getRoleListHandle (response) { // 获取角色列表
      console.log('getRoleList~~~:', response)
      let data = response.data
      if (data.status === '0') {
        let resultData = data.result.data
        if (resultData.length > 0) {
          this.roleChooseData = resultData
          let that = this
          resultData.map((item) => {
            that.roleLabelToValueObj[item['TR_ID']] = item
          })
        } else {
          this.roleChooseData = []
        }
      } else {
        this.$message.error(data.message)
      }
    },
    saveRolePermissions () { // 权限修改保存操作
      if (this.dialogFlag === 'updateUserRole') { // 修改用户角色权限
        this.updateUserRole() // 执行修改用户角色权限
      }
    },
    updateUserRole () { // 修改用户角色权限
      this.$store.commit('SHOW_LOADING', '正在修改数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: 'userRight/updateUserRole',
        params: {
          to_id: this.currentUserId,
          role_id: this.roleSelectValue
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        console.log('updateUserRole~~~:', response)
        let data = response.data
        if (data.status === '0') {
          let resultData = data.result.data
          if (resultData) {
            this.$message({
              message: '数据修改成功！',
              type: 'success'
            })
            let tempUserRoleList = this.roleTableData
            let that = this
            tempUserRoleList.map((item) => {
              if (item['TO_ID'] === that.currentUserId) {
                item['TR_ID'] = that.roleSelectValue
                item['ROLE_NAME'] = that.roleLabelToValueObj[that.roleSelectValue]['ROLE_NAME']
              }
            })
            this.roleTableData = tempUserRoleList
            this.roleSelectValue = '' // 清除选择的下拉框数据
            this.currentUserId = '' // 清除已经选择用户数据
            this.visibleRoleDialog = false // 关闭dialog
          } else {
            this.$message.error('数据修改失败！')
          }
        } else {
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('角色列表数据加载失败! ')
      })
    },
    addRolePermissions () { // 添加角色权限
      // 待开发
    },
    updateRolePermissions () { // 修改角色权限
      // 待开发
    },
    getUserForKeyword () { // 关键字查询用户
      // 待开发
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
    },
    closeRoleDialog () { // 关闭dialog的方法处理
      this.visibleRoleDialog = false // 隐藏dialog
    },
    handleCheckAllChange (val) { // 复选框全选操作
      this.checkedRoles = val ? this.checkRolesData : []
      this.isIndeterminate = false
    },
    handleCheckedRolesChange (value) { // 复选框单选操作
      let checkedCount = value.length
      this.checkAll = checkedCount === this.checkRolesData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkRolesData.length
    }
  }
}
</script>
<style scoped>
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
