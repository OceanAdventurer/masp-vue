<template>
  <div class="permissions">
    <div class="permissions-container df df-fd-r">
      <div class="permissions-table" v-show="this.$store.getters.userInfo.isAdmin">
        <div class="permissions-table-input df df-jc-c df-ai-c">
          <el-input
            placeholder="请输入内容"
            v-model="userKeyword">
          </el-input>
          <i class="el-icon-search" @click="getUserForKeyword"></i>
        </div>
        <div class="permissions-table-info">
          <el-table
            :data="userTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            height="100%"
            border
            style="width: 100%"
            @row-click="userTableRowHandle">
            <el-table-column
              prop="LOGIN_NAME"
              label="用户名字"
              width="auto">
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
            :total="userTableData.length">
          </el-pagination>
        </div>
      </div>
      <div class="permissions-tree" :style="{'width': !this.$store.getters.userInfo.isAdmin && permissionsTreeData.length === 0 ? '100%' : '60%'}">
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
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="permissions-update" v-show="permissionsTreeData.length > 0">
        <el-button type="primary" @click="updatePermissions">修改权限</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GropPermissions',
  data () {
    return {
      defaultProps: {
        label: 'lable',
        children: 'children',
        isLeaf: 'leaf'
      },
      userKeyword: '',
      currentPage: 1,
      pageSize: 20,
      userTableData: [],
      permissionsTreeData: [],
      currentUserName: '', // 当前用户名称
      defaultCheckKeys: []
    }
  },
  created () {
    if (this.$store.getters.userInfo.isAdmin) { // 如果是管理员则现在加载用户列表
      this.getUserList()
    } else {
      this.getUserRightTree(this.$store.getters.userInfo.userName)
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods: {
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick (data) {
      console.log(data)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    userTableRowHandle (value) {
      console.log('userTableRowHandle:', value)
      this.getUserRightTree(value.LOGIN_NAME)
    },
    getUserRightTree (userName) {
      if (this.$util.isDefine(userName)) {
        this.currentUserName = userName // 赋值当前用户编号
        this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
        this.$axios({
          url: 'userRight/getUserRightTree',
          params: {
            userId: userName
          }
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          console.log('getUserRightTree~~~:', response)
          let data = response.data
          if (data.status === '0') {
            let userRightTree = data.result.data.tree
            let userRight = data.result.data.userRight
            this.permissionsTreeData = userRightTree // 显示权限树数据
            this.defaultCheckKeys = userRight // 设置默认的权限
          } else {
            this.permissionsTreeData = []
            this.defaultCheckKeys = []
            this.$message.error(data.message)
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          this.$message.error('用户权限获取失败! ')
        })
      }
    },
    getUserList (userName) { // 获取用户列表，只有登录用户是管理员时才可以获取用户列表
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: 'userRight/getUserList',
        params: {
          userId: userName
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        console.log('getUserList~~~:', response)
        let data = response.data
        if (data.status === '0') {
          let resultData = data.result.data
          if (resultData.length > 0) {
            this.userTableData = resultData
          } else {
            this.userTableData = []
          }
        } else {
          this.$message.error(data.message)
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('用户列表数据加载失败! ')
      })
    },
    getUserForKeyword () { // 关键字查询用户
      console.log(this.userKeyword)
      this.getUserList(this.userKeyword)
    },
    updatePermissions () { // 更新权限
      console.log(this.$refs.permissionsTree.getCheckedKeys())
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios({
        url: 'userRight/updateUserRight',
        params: {
          userId: this.currentUserName,
          rights: this.$refs.permissionsTree.getCheckedKeys().join(',')
        }
      }).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        console.log('updateUserRight~~~:', response)
        let data = response.data
        if (data.status === '0') {
          let resultData = data.result.data
          if (resultData.updateStatus) {
            this.$message({
              type: 'success',
              message: '权限修改成功！!'
            })
          } else {
            this.$message.error('权限修改失败！')
          }
        } else {
          this.$message.error(data.message)
        }
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
</style>
