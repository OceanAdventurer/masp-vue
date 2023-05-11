<template>
  <el-container class='user_manage'>
      <el-dialog
        title="系统切换"
        :visible.sync="systemSwitching"
        width="30%"
        :before-close="handleClose">
        <div>
          <div style="display:inline-block;margin-right:10px">请选择子系统: </div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.SYSTEM_ID"
              :label="item.SYSTEM_NAME"
              :value="item.SYSTEM_URL">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSystem()">取 消</el-button>
          <el-button type="primary" @click="changrSystem()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="系统用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelUser()">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改系统权限"
        :visible.sync="isShowPrivilege"
        width="30%"
        :before-close="userClose">
        <el-form :model="userForm" ref="userForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="userForm.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="系统权限:">
            <el-checkbox-group v-model="userForm.type">
            <el-checkbox label="多租户管理平台" name="type"></el-checkbox>
            <el-checkbox label="DSAP" name="type"></el-checkbox>
<!--            <el-checkbox label="东航飞行MSAP" name="type"></el-checkbox>-->
<!--            <el-checkbox label="东航机务MSAP" name="type"></el-checkbox>-->
<!--            <el-checkbox label="东航运控MSAP" name="type"></el-checkbox>-->
            </el-checkbox-group>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShowPrivilege = false">取 消</el-button>
            <el-button type="primary" @click="editPrivilege()">确 定</el-button>
        </span>
      </el-dialog>
    <el-header style="height: 45px;">
      <div class="nav-menu-header">
        <div class="nav-menu-header-left">
          <img src="../../assets/images/logo_bg.png" alt="" :class="[logoIs]">
        </div>
        <div v-show="isCollapsed" class="logo-div"></div>
        <div :class="[rotateIcon, headerLogo]" @click="changeSlidebar()"></div>
        <div class="nav-menu-header-right">
          <div
          class="nav-menu-header-title nav-menu-header-title-active"
          >
            权限管理
          </div>
        </div>
      </div>
    </el-header>
    <el-container class="main-content userManage-main">
      <el-menu  class="el-menu-vertical-msap"
        :collapse="!isCollapsed"
        >
        <el-menu-item index="paramOne">
          <i class="el-icon-menu el-icon-paramOne"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
      <el-main style="height:100%">
          <div style="height:54px;">
              <div style="width:50px;margin-left:30px;text-align: center;padding-top: 9px;cursor:pointer" @click="dialogVisible = true">
                <i style="font-size: 30px;display:block">
                  <img src="../../assets/images/user-add.png" alt="新增用户">
                </i>
                <span>新增用户</span>
              </div>
          </div>
          <div>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="用户管理" name="first"></el-tab-pane>
              </el-tabs>
          </div>
          <div style="padding:10px">
              <!-- <el-button size='small' type="primary" plain  @click="dialogVisible = true">新增用户</el-button> -->
              <el-input placeholder="请输入用户名关键字搜索" @keyup.enter.native="userSearch()" size="small" v-model="input3" style="width:190px;float:right">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="userSearch()" style="font-size:20px;position:relative;top:0;cursor:pointer;"></i>
              </el-input>
              <!-- <el-input
                @keyup.enter.native="userSearch()"
                style="float:right;width:192px"
                size="small"
                placeholder="请输入用户名关键字搜索"
                suffix-icon="el-icon-search"
                v-model="input3">
              </el-input> -->
              <div style="clear: both"></div>
          </div>
          <div style="height:calc(100% - 184px);padding:0 10px">
              <el-table
                :data="referenceData"
                :row-style="{height:'38px'}"
                :header-row-style="{height:'38px'}"
                :header-cell-style="{padding:'0px'}"
                :cell-style="{padding:'0px'}"
                height="100%"
                border
                >
                <el-table-column type="index + pageSize" width="50" label="序号">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 + (currentPage - 1)*pagesize }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="USER_LOGIN_NAME" label="用户名"></el-table-column>
                <el-table-column prop="SYSTEMNAME" label="系统权限"></el-table-column>
                <el-table-column label="操作" width="200" prop="ENABLE">
                  <template slot-scope="scope">
                    <div class="opt_col">
                      <span @click="getUserSystem(scope.row)">编辑</span>
                      <!-- <span v-show="scope.row.status === '0'" @click="getUserSystem(scope.row)">删除</span>
                      <span v-show="scope.row.status === '0'" @click="getUserSystem(scope.row)">禁用</span> -->
                    </div>
                  </template>
                </el-table-column>
            </el-table>
          </div>
          <div style="float:right;margin:8px 0px">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 20, 30, 50]"
            :page-size="pagesize"
            layout="sizes, prev, pager, next, total"
            :total="totalCount">
            </el-pagination>
          </div>
      </el-main>
    </el-container>
    <div>
      <img style="position:fixed;top:15px;right:156px" src="../../assets/images/btn_exchange.png" alt="">
      <el-dropdown style="position:fixed;top:15px;right:55px;color:#fff" @command="handleCommand">
      <span  class="el-dropdown-link">{{ sysName }}</span>
      <el-dropdown-menu slot="dropdown" v-if="isDropdown">
        <el-dropdown-item v-for="item in options" :key="item.SYSTEM_ID" :command="composeValue(item.SYSTEM_URL, item.SYSTEM_NAME)" >{{ item.SYSTEM_NAME }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    <div class="logout" @click="logoutFun()" title="退出">
      <img src="../../assets/images/icon114.png" alt="退出">
    </div>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      sysName: '',
      isDropdown: true,
      activeName: 'first',
      systemSwitching: false,
      dialogVisible: false,
      isShowPrivilege: false,
      headerLogo: 'headerLogo', // 定义logo的样式
      isCollapsed: true,
      input3: '',
      referenceData: [ ],
      pagesize: 15,
      currentPage: 1,
      totalCount: 0,
      ruleForm: {
          name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
      userForm: {
          name: '',
          type: []
      },
      allSystems: {},
      USER_ID: {},
      options: {},
      value: ''
    }
  },
  computed: {
    logoIs () { // 改变logo显示效果
      return [this.isCollapsed ? 'logo-sy' : 'logo-bg']
    },
    rotateIcon () { // 改变logo显示效果
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    }
  },
  // watch: {
  //   copyAnalysisID (newVal, oldVal) {

  //   }
  // },
  created () {
    // this.getUserInfo()
  },
  mounted () { // 处理dom加载完后的事情
    this.getUserPermission()
    this.getAllSystems()
    this.getUserInfo()
  },
  destroyed () { // 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    // this.$bus.$off('openHeaderMenu') // 移除自定义事件监听器。
    // this.$bus.$off('openHeaderMenuItem') // 移除自定义事件监听器。
    // this.$bus.$off('setCurrentName')
  },
  methods: {
    cancelSystem () {
      this.value = ''
      this.systemSwitching = false
    },
    logoutFun () { // 退出登录
      this.$confirm('是否确定要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在退出，请稍等！')
        this.$axios({
          url: 'user/logout'
        }).then(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          console.log('logout~~~:', response)
          this.$store.commit('USER_INFO', {}) // 临时存放用户信息
          window.sessionStorage.removeItem('DSAP-userInfo') // 删除浏览器用户信息
          window.sessionStorage.removeItem('DSAP-sublineAllData') // 删除浏览器辅助线信息
          /**
           * 地址会有两种：
              1、/DSAP/index.html
              2、http://testohs1.ceair.com:7777/oam/server/logout?end_url=http://172.20.42.143:7777/DSAP
          */
          // window.location.href = 'http://testohs1.ceair.com:7777/oam/server/logout?end_url=http://172.20.42.143:7777/DSAP'
          if (this.$util.isDefine(response.data.status)) {
            if (response.data.status === '0') {
              let resUrl = response.data.result.data
              let tempUrl = ''
              if (resUrl.indexOf('7777') > -1) {
                tempUrl = resUrl
              } else {
                tempUrl = window.location.origin + resUrl
              }
              window.location.href = tempUrl
            } else if (response.data.status === 'E1001') { // 没有登录
              this.$util.logBackIn(response.data)
            } else {
              this.$message.error('退出登录失败！')
            }
          } else {
            let tempUrl = ''
            if (response.data.indexOf('7777') > -1) {
              tempUrl = response.data
            } else {
              tempUrl = window.location.origin + response.data
            }
            window.location.href = tempUrl
          }
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
          this.$message.error('退出登录失败! ')
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消退出操作！'
        // })
      })
    },
    composeValue (val, name) {
      return {val, name}
    },
    handleCommand (data) {
      let val = data.val
      let name = data.name
      localStorage.setItem('currentSystem', name)
      if (val.slice(0, 4) === 'http') {
        window.location.href = val
      } else {
        if (val.search(':') !== -1) {
          let data = window.location.protocol + '//' + val
          window.location.href = this.getHttps(data)
        } else {
          if (window.location.host.search(':') !== -1) {
            let end = window.location.host.search(':')
            console.log(window.location.protocol + '//' + window.location.host.slice(0, end) + ':' + val)
            let data = window.location.protocol + '//' + window.location.host.slice(0, end) + ':' + val
            window.location.href = this.getHttps(data)
          } else {
            console.log(window.location.protocol + '//' + window.location.host + ':' + val)
            let data = window.location.protocol + '//' + window.location.host + ':' + val
            window.location.href = this.getHttps(data)
          }
        }
      }
    },
    getHttps (val) {
      if (val.slice(0, 5) === 'https') {
        var myReg = /.+:(\d{1,5})/
        var myResult = val.match(myReg)
        const begin = val.substr(0, val.lastIndexOf(':'))
        const end = val.substr(val.lastIndexOf(':') + 1 + myResult[1].length)
        console.log(begin + end)
        return begin + end
      } else {
        return val
      }
    },
    changeSystems (url) {
      console.log(url, 1234)
      this.getUserInfo()
      if (this.options.length === 1) {
        this.systemSwitching = false
      } else {
        window.open(url, '_selfs')
      }
    },
    changrSystem () {
      window.open(this.value, '_selfs')
      this.systemSwitching = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.ruleForm.name = ''
          this.dialogVisible = false
          this.value = ''
          this.systemSwitching = false
          done()
        })
        .catch(_ => {})
    },
    userClose (done) {
        this.$confirm('确认关闭？')
        .then(_ => {
        done()
        })
        .catch(_ => {})
    },
    handleSizeChange (size) {
      this.pagesize = size
      this.getUserPermission()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.getUserPermission()
    },
    getUserPermission () {
        this.$axios.get('/saas/getUsers', { params: {
                loginName: '',
                pageNo: this.currentPage,
                pageSize: this.pagesize
            } }
        ).then(response => {
            if (response.status === 200) {
                this.referenceData = response.data.content
                this.totalCount = response.data.recordCount
            }
        })
    },
    changeSlidebar () {
    if (this.isCollapsed === true) {
        this.isCollapsed = false
    } else {
        this.isCollapsed = true
    }
    },
    cancelUser () {
      this.ruleForm.name = ''
      this.dialogVisible = false
    },
    addUser () {
        this.$axios.get('/saas/addUser', { params: {
            loginName: this.ruleForm.name
        } }).then(res => {
            if (res.data.status === '0') {
                this.$message({
                    message: '成功',
                    type: 'success'
                })
                this.dialogVisible = false
                this.ruleForm.name = ''
                this.userSearch()
            } else {
                this.$message({
                    message: '失败，' + res.data.message,
                    type: 'warning'
                })
            }
        })
    },
    getUserSystem (row) {
        this.USER_ID = row.USER_ID
        this.$axios.get('/saas/getSystemsByUserLoginName', { params: {
            userLoginName: row.USER_LOGIN_NAME
        }}).then(res => {
            this.userForm.name = row.USER_LOGIN_NAME
            if (res.status === 200) {
                if (res.data.length > 0) {
                     let data = []
                     res.data.forEach(element => {
                         data.push(element.SYSTEM_NAME)
                    })
                    this.userForm.type = data
                } else {
                    this.userForm.type = []
                }
            }
        })
        this.isShowPrivilege = true
    },
    getAllSystems () {
        this.$axios('/saas/getAllSystems').then(res => {
            if (res.status === 200) {
                res.data.forEach(item => {
                  this.allSystems[item.SYSTEM_NAME] = item.SYSTEM_ID
                })
            }
        })
    },
    editPrivilege () {
        console.log(this.userForm.type)
        console.log(this.allSystems)
        let ids = ''
        this.userForm.type.forEach(item => {
            ids = this.allSystems[item] + ',' + ids
        })
        this.$axios.get('/saas/modifyUserSystemRelation', { params: {
            userId: this.USER_ID,
            systemIds: ids.slice(0, -1)
        } }).then(res => {
          if (res.data.status === '0') {
            this.getUserInfo()
            this.$message({
                message: '成功',
                type: 'success'
            })
            this.isShowPrivilege = false
            this.userSearch()
          } else {
            this.$message({
                message: '失败，' + res.data.message,
                type: 'warning'
            })
          }
         })
    },
    userSearch () {
      this.$axios.get('/saas/getUsers', { params: {
                loginName: this.input3,
                pageNo: this.currentPage,
                pageSize: this.pagesize
            } }
        ).then(response => {
            if (response.status === 200) {
                this.referenceData = response.data.content
                this.totalCount = response.data.recordCount
            }
        })
    },
    getUserInfo () { // 获取用户信息和权限菜单信息
      this.$axios({
        url: 'userRight/getUser'
      }).then(response => {
         if (response.data.status === '0') {
           this.$axios.get('/saas/getSystemsByUserLoginName', { params: {
              userLoginName: response.data.result.data.userName
            }}).then(res => {
              if (res.status === 200) {
               this.options = res.data
               this.sysName = localStorage.getItem('currentSystem')
              //  res.data.forEach(item => {
              //    console.log(item)
              //    if (window.location.href === item.SYSTEM_URL) {
              //      this.sysName = item.SYSTEM_NAME
              //    }
              //  })
               if (this.options.length === 1) {
                 this.isDropdown = false
               } else {
                 this.isDropdown = true
               }
            }
            })
         } else if (response.data.status === 'E1001') { // 没有登录
              this.$util.logBackIn(response.data)
            } else {
              this.$message.error('暂无用户信息数据！')
            }
      })
  }
}
}
</script>
<style>
.el-dropdown-link{
  cursor: pointer;
}
.userManage-main .el-main{
  padding: 0px !important;
}
.userManage-main .el-tabs--card > .el-tabs__content{
  width: auto;
}
.el-menu--popup{
  padding: 0px !important;
  border-radius: 4px !important;
}
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    min-width: 60px !important;
}

.el-menu--popup-right-start{
    margin-left: 12px !important;
  }
.user_manage .el-menu-vertical-msap:not(.el-menu--collapse) {
  width: 180px;
  /* height: calc(100% - 15px); */
  height: 100%;
  min-height: 300px;
  margin-bottom: 0;
  overflow: hidden;
  background-color: #2a436f;
  color: #fff;
  padding-top: 0;
}

.el-dropdown-menu__item--divided:before,
.el-menu,
.el-tooltip__popper.is-dark,
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background: #2a436f;
  color: #fff;
}

.el-tooltip__popper[x-placement^=right] .popper__arrow:after {
  border-right-color:  #2a436f;
}

.el-menu-item,
.el-submenu__title,
.el-submenu__title i,
.el-menu-item i,
.el-menu-item.is-active {
  color: #fff;
}

.el-menu-item.is-active,
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background: rgba(255,255,255,0.10);
}
.el-menu-item,
.el-submenu__title {
  height: 44px;
  line-height: 44px;
}

.todo-list-li {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-icon-menu:before {
  content: "";
  display: block;
  /*居中*/
  margin: 0 auto;
  /*自适应大小*/
  width: 1em;
  height: 1em;
  background-size: 100%!important;
}
/* 数据 */
.el-icon-data:before {
  background: url(../../assets/images/icon60.png) no-repeat center center;
}
/* 工程参数 */
.el-icon-paramOne:before {
  background: url(../../assets/images/icon61.png) no-repeat center center;
}
/* 分析参数 */
.el-icon-paramTwo:before {
  background: url(../../assets/images/icon62.png) no-repeat center center;
}
/* 事件 */
.el-icon-paramEvent:before {
  background: url(../../assets/images/icon62.png) no-repeat center center;
}
/* 分析 */
.el-icon-analysis:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
}
/* 数据挖掘 */
.el-icon-dataMining:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
}
/* APP */
.el-icon-app:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
}
/* 设置 */
/* .el-icon-setting:before {
  background: url(../../assets/images/icon63.png) no-repeat center center;
} */

/* 问题反馈 */
.el-icon-todoList:before {
  background: url(../../assets/images/icon_todo.png) no-repeat center center;
}
</style>
<style scoped>
.logout {
  position: fixed;
  right: 20px;
  cursor: pointer;
}
.lg-p{
  position: relative;
}
.lg-s{
  position: absolute;
  bottom: 62px;
  left: 20px;
}
.chose-title{
  font-size: 42px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 59px;
  color: #2A436F;
  opacity: 1;
  margin-top: 8%;
  margin-bottom: 5%;
}
.chose-name{
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 45px;
  color: #FFFFFF;
  -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
  opacity: 1;
}
.chose-enter{
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #FFFFFF;
  -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
  opacity: 1;
}
</style>
<style scoped>
.cm-popper__arrow{
  top: -6px;
  left: -12px;
  margin-right: 3px;
  border-top-width: 0;
  border-right-color: #2A436F;
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
  position: absolute;
  /* border-color: transparent; */
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-style: solid;
}
.cm-popper__arrow::after{
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-right-color: #2A436F;
  content: " ";
  border-width: 6px;
  position: absolute;
  display: block;
  border-color: transparent;
  border-style: solid;
}
.el-menu--popup-right-start{
  margin-left: 12px !important;
}
.logo-sy{
  margin-left: 20px;
}
.logo-bg{
  display: none;
}
/*头部*/
.el-header {
  position: absolute;
  width: 100%;
  top: 0;
  background-color: #2A436F;
  color: #FFFFFF;
  padding: 0 !important;
}
/*中间*/
.main-content {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.logo-div {
  width: 117px;
  height: 35px;
}
/*中间左侧部分*/
.el-aside {
  height: 100%;
  float:left;
  margin-bottom: 0;
  overflow: auto;
  background-color: #2A436F;
  color: #FFFFFF;
  position: relative;
}

/*中间右侧部分*/
.el-main-default {
  height: 100%;
  padding: 0;
}

.el-main-content {
  height: 100%;
  margin-left: 0px;
}

/*左侧菜单*/
.nav-menu-left {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
}
.todo-list {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 44px;
}

.nav-menu-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  cursor: pointer;
}

.nav-menu-item-active {
  background: rgba(255,255,255,0.10);
}

.nav-menu-item > img {
  margin: 12px 18px;
  width: 20px;
  height: 20px;
}

.nav-menu-header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height:44px;
}

.nav-menu-header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/*头部左侧logo*/
.headerLogo {
  background-image:url(../../assets/images/icon1.png);
  background-size:cover;
  width: 35px;
  margin-right: 11px;
  cursor: pointer;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-360deg);
}

/*头部菜单*/
.nav-menu-header-right {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.nav-menu-header-title {
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.nav-menu-header-title-active {
  background: #F9F9F9;
  color: #3A6BB9;
}
.no-menu {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 36px;
}
.logout {
  position: fixed;
  right: 20px;
  cursor: pointer;
}

/* 窗口高度大于800px */
@media screen and (min-height: 800px) {
  .el-header {
    height: 44px !important;
  }
  .nav-menu-header-left {
    width: 64px;
    height: 45px;
  }
  .logo-div {
    width: 116px;
  }
  .headerLogo {
    height: 45px;
    width: 35px;
  }
  .nav-menu-header-right {
    height: 40px;
  }
  .nav-menu-header-title {
    padding: 6px 20px;
    line-height: 22px;
    height: 22px;
  }
  .main-content {
    top: 44px;
  }
  .logout {
    top: 14px;
  }
}
/* 窗口高度小于800px */
@media screen and (max-height: 800px) {
  .el-header {
    height: 44px !important;
  }
  .nav-menu-header-left {
    width: 64px;
    height: 35px;
  }
  .headerLogo {
    height: 44px;
    width: 25px;
  }
  .nav-menu-header-right {
    height: 34px;
  }
  .nav-menu-header-title {
    padding: 6px 20px;
    line-height: 22px;
    height: 22px;
  }
  .main-content {
    top: 44px;
  }
  .logout {
    top: 14px;
  }
}

</style>
