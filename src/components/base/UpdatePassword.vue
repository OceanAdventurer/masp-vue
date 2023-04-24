<template>
  <div class="user_password">
    <el-dialog title="修改密码" :close-on-click-modal="false" :visible.sync="dialogVisible" width="500px">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import JSEncrypt from 'jsencrypt'
export default {
  data () {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('用户名不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }, 1000)
    // }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      // let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/ // 必须包含字母数字字符，长度不少于8位
      // let test1 = /^(?=.*[a-z]|[A-Z])[a-zA-Z\d]{6,}$/ // 大写 或者小写 可以有数字，不能有符号,至少6位
      let test2 = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/ // 字母和数字，可以有非空白字符,至少6位
      // 大写 小写 字母 特殊字符 满足三项即可
      // let allRegex = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W]+$)(?![A-Z\W]+$)(?![0-9\W]+$)[a-zA-Z0-9\W]{6,}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (!test2.test(value)) {
        callback(new Error('密码必须包含数字，字母，且长度不低于6位'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$bus.$on('password_management', () => {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
      this.ruleForm = {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['ruleForm'] && this.$refs['ruleForm'].clearValidate()
      })
    })
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
          // const encrypt = new JSEncrypt()
        // password: encrypt.encrypt(this.userPass),
          const {oldPassword, newPassword} = this.ruleForm
          let timestamp = String(Math.floor(Math.random() * Math.pow(10, 1))) + String((new Date()).getTime())
          const paramStr = {
            oldPassword,
            newPassword,
            timestamp
          }
          this.$axios.post('/user/updatePassword', this.$qs.stringify(paramStr)).then((response) => {
            this.$store.commit('HIDE_LOADING', '拼命加载中！')
            var data = response.data
            if (data.status === '0') {
              this.dialogVisible = false
              this.$message.success(response.data.message)
            } else {
              this.$message.error(data.message)
            }
          }).catch(response => {
            this.$store.commit('HIDE_LOADING', '拼命加载中！')
            this.$message.error(response.data.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    resetPassword () {
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！')
        let userInfo = JSON.parse(window.sessionStorage.getItem('DSAP-userInfo'))
        let para = {
          loginName: userInfo.userName
        }
        this.$axios.post('/user/resettingPassword', this.$qs.stringify(para)).then((response) => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          var data = response.data
          if (data.status !== '0') {
            this.$alert(response.data.message, '提示', {
              confirmButtonText: '确定'
            })
          } else {
            this.$message.error(response.data.message)
          }
          this.dialogVisible = false
        }).catch(response => {
          this.$store.commit('HIDE_LOADING', '拼命加载中！')
          this.$message.error(response.data.message)
        })
      }).catch(() => {
        console.log('取消重置')
      })
    }
  }
}
</script>

<style scoped>
.user_password .reset_password {
  text-align: center;
}
/* .user_password .reset_password a {
  text-align: center;
} */
</style>
<style>
.user_password .el-dialog__body {
  padding: 30px 70px 30px 40px;
}
</style>
