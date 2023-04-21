<template>
  <div class="permissions">

    <el-dialog title="字段信息" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.NAME" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="form.DESCRIPTION" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="clickAddRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="菜单权限" :visible.sync="dialogRole_show">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedRight" @change="handleCheckedRightsChange">
        <el-checkbox v-for="role in menuRoles" :label="role" :key="role">{{role}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRole_show = false">取 消</el-button>
        <el-button type="primary" @click="saveMenuRight">确 定</el-button>
      </div>
    </el-dialog>

    <div class="permissions-container df df-fd-r">
      <div class="permissions-table"> <!-- v-show="this.$store.getters.userInfo.isAdmin"-->
        <div class="permissions-table-input df df-jc-c df-ai-c">
          <el-input
            placeholder="请输入内容"
            v-model="roleKeyword">
          </el-input>
          <el-button type="primary" style="margin-left: 20px;" @click="showDialog">添加角色</el-button>
        </div>
        <div class="permissions-table-info">
          <el-table
            :row-style="{height:'38px'}"
            :cell-style="{padding:'0px'}"
            :header-row-style="{height:'38px'}"
            :header-cell-style="{padding:'0px'}"
            highlight-current-row
            :data="roleTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            height="100%"
            border
            style="width: 100%"
            @row-click="roleTableRowHandle">
            <el-table-column
              prop="ROLE_NAME"
              label="角色名称"
              width="auto">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="opt_col">
                  <span @click="deleteRole(scope.row.ROLE_NAME)">角色删除</span>&nbsp;&nbsp;
                  <span @click="openMenuRole(scope.row.ROLE_NAME)">菜单权限</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="permissions-table-pagination df df-jc-fe df-ai-c">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, total"
            :total="roleTableData.length">
          </el-pagination>
        </div>
      </div>
      <div class="permissions-tree" style="width: 60%" ><!--:style="{'width': !this.$store.getters.userInfo.isAdmin && permissionsTreeData.length === 0 ? '100%' : '60%'}"-->
        <el-tree
          show-checkbox
          node-key="id"
          accordion
          ref="permissionsTree"
          highlight-current
          :default-expanded-keys="['1855']"
          :default-checked-keys="defaultCheckKeys"
          :data="permissionsTreeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @check-change="rightButtonEnable = false">
        </el-tree>
      </div>
      <div class="permissions-update" v-show="permissionsTreeData.length > 0">
        <el-button type="primary" @click="updatePermissions" :disabled="rightButtonEnable">修改权限</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GropPermissions',
  data () {
    return {
      timer: null,
      defaultProps: {
        label: 'lable',
        children: 'children',
        isLeaf: 'leaf'
      },
      roleKeyword: '',
      currentPage: 1,
      pageSize: 20,
      roleTableData: [],
      permissionsTreeData: [],
      currentUserName: '', // 当前用户名称
      defaultCheckKeys: [],
      currentRoleName: '',
      form: {
        NAME: '',
        DESCRIPTION: ''
      },
      rightButtonEnable: true,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      checkAll: false,
      checkedRight: [],
      menuRoles: [],
      isIndeterminate: false,
      dialogRole_show: false
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.getRoleList()
    })
  },
  watch: {
    roleKeyword: function (val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getRoleList()
      }, 300)
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedRight = val ? this.menuRoles : []
      this.isIndeterminate = false
    },
    handleCheckedRightsChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.menuRoles.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.menuRoles.length
    },
    showDialog () {
      this.dialogFormVisible = true
    },
    closeDialog () {
      this.dialogFormVisible = false
      this.initForm()
    },
    openMenuRole (name) {
      this.dialogRole_show = true
      var that = this
      that.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      that.$axios({
        url: 'access/readMenuRole',
        params: {
          name: name
        }
      }).then(response => {
        that.menuRoles = response.data.menu.map(m => m.RIGHT_NAME)
        that.checkedRight = response.data.checked.map(m => m.RIGHT_NAME)
        // if (that.menuRoles.length === that.checkedRight.length) {
        //   that.checkAll = true
        // }
        that.handleCheckedRightsChange(that.checkedRight)
        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(response => {
        that.$store.commit('HIDE_LOADING', '拼命加载中！')
        that.$message.error('操作失败! ')
      })
    },
    saveMenuRight (name) {
      this.dialogRole_show = false
      var that = this
      that.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      that.$axios({
        url: 'access/saveMenuRight',
        params: {
          name: this.currentRoleName,
          rights: that.checkedRight.join(',')
        }
      }).then(response => {
        if (response.data.message) {
          that.$message.error(response.data.message)
        } else {
          that.$message.success('操作成功! ')
        }
        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      }).catch(response => {
        that.$message.error('操作失败! ')
        that.$store.commit('HIDE_LOADING', '拼命加载中！')
      })
    },
    deleteRole (name) {
      var that = this
      that.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        that.$axios({
          url: 'access/delRole',
          params: {
            name: this.currentRoleName
          }
        }).then(response => {
          if (response.data.message) {
            that.$message.error(response.data.message)
          } else {
            that.$message.success('操作成功！')
          }
          that.$store.commit('HIDE_LOADING', '拼命加载中！')
          that.getRoleList()
        }).catch(response => {
          that.$message.error('操作失败! ')
          that.$store.commit('HIDE_LOADING', '拼命加载中！')
        })
      })
    },
    initForm () {
      this.form = {
        NAME: '',
        DESCRIPTION: ''
      }
    },
    clickAddRole () {
      var that = this
      if (that.form.NAME.length === 0) {
        that.$message('请输入名称')
        return false
      }
      // if (that.form.DESCRIPTION.length === 0) {
      //   that.$message('请输入描述')
      //   return false
      // }
      that.$axios({
        url: 'access/addRole',
        params: {
          name: that.form.NAME,
          desc: that.form.DESCRIPTION
        }
      }).then(response => {
        if (response.data.message) {
          that.$message.error(response.data.message)
        } else {
          that.$message.success('操作成功！')
        }
        this.getRoleList()
      }).catch(response => {
        that.$message.error('操作失败! ')
      })
      this.dialogFormVisible = false
    },
    handleCheckChange (data, checked, indeterminate) {
      // console.log(data, checked, indeterminate)
    },
    handleNodeClick (data) {
      // console.log(data)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    roleTableRowHandle (row, event, column) {
      this.currentRoleName = row.ROLE_NAME
      if (column.label === '操作') {
        return false
      }
      this.getTreeByRole(row.ROLE_NAME)
    },
    getTreeByRole (name) {
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: 'access/selectTreeByRole',
        params: {
          name: name
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        let data = response.data
        // console.log(data)
        let tree = data.tree
        let roleRight = data.roleRight
        this.permissionsTreeData = tree // 显示权限树数据
        this.defaultCheckKeys = roleRight // 设置默认的权限
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('用户权限获取失败! ')
      })
    },
    getRoleList () {
      let that = this
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
      this.$axios({
        url: 'access/getRoleList'
      }).then(response => {
        this.permissionsTreeData = []
        this.$store.commit('HIDE_LOADING', '拼命加载中！')
        let data = response.data
        if (that.roleKeyword) {
          data = data.filter(d => d.ROLE_NAME.toLowerCase().indexOf(that.roleKeyword.toLowerCase()) > -1)
        }
        this.roleTableData = data
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      })
      this.currentPage = 1
    },
    updatePermissions () { // 更新权限
      // console.log(this.$refs.permissionsTree.getCheckedKeys())
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: 'access/updateDataRight',
        params: {
          name: this.currentRoleName,
          rights: this.$refs.permissionsTree.getCheckedKeys().join(',')
        }
      }).then(response => {
        if (response.data.message) {
          this.$message.error(response.data.message)
        } else {
          this.$message.success('修改成功！')
          this.permissionsTreeData = []
          this.getRoleList()
        }
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('权限修改失败! ')
      })
    }
  }
}
</script>
<style scoped>
.permissions {
  position: absolute;
  width: 100%;
  height: 100%;
}
.permissions-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.permissions-table {
  position: relative;
  width: 40%;
  height:100%;
}
.permissions-table-input {
  position: relative;
  width: 100%;
  height: 10%;
}
.permissions-table-input i {
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.permissions-table-info {
  position: relative;
  width: 100%;
  height: 80%;
}
.permissions-table-pagination {
  position: relative;
  width: 100%;
  height: 10%;
}
.permissions-tree {
  position: relative;
  width: 60%;
  height:100%;
  overflow: auto;
}
.permissions-tree >>> .el-tree__empty-block {
  margin-top: 20%;
}
.permissions-update {
  position: absolute;
  right: 50px;
  bottom: 20px;
}
.permissions-tabs {
  position: relative;
  width: 60%;
  height: 100%;
}
.permissions-tabs >>> .el-tab-pane{
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 90%;
}
.permissions-table-input .el-button{
  padding: 9px 20px !important;
}
</style>
