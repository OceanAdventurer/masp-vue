<template>
  <el-dialog
    title="忘记密码"
    v-dialogDrag
    :visible.sync="isShow"
    width="600px"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="fotget-ruleForm"
    >
      <el-form-item
        label="密码"
        prop="pass"
        v-if="isShowPass"
        style="width:100%"
      >
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
        <div class="bottom-line"></div>
      </el-form-item>
      <el-form-item label="新密码" prop="checkPass" style="position: relative;">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="ruleForm.checkPass"
          :type="passwordType"
          placeholder="密码"
          name="password"
          auto-complete="on"
        /> -->
        <span style="position: absolute;" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
        <el-input
          ref="password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
        <span
          class="show-pwd"
          @click="showPwd"
          style="position: absolute;right: 10px"
        >
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="checkPass" class="form-password" label="新密码">
        <div class="item-inline">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="ruleForm.checkPass"
            :type="passwordType"
            placeholder="密码"
            name="password"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import Login from '@/api/login'
import JSEncrypt from 'jsencrypt'
export default {
  name: 'forgetPassWord',
  props: {
    isForgetShow: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    showPass: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    userId: {
      default: () => {
        return ''
      }
    },
    userType: {
      default: () => {
        return ''
      }
    }
  },
  watch: {
    isForgetShow(now) {
      this.isShow = now
    }
  },
  created() {
    if (sessionStorage.userType == 'SYSTEM_ADMIN') {
      this.isShowPass = false
    } else {
      this.isShowPass = true
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (sessionStorage.userType == 'SYSTEM_ADMIN') {
        callback()
      } else {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
    }
    var validatePass2 = (rule, value, callback) => {
      let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
      console.log(value)
      console.log(regex.test(value))
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (!regex.test(value)) {
        callback(new Error('密码必须包含数字，字母，特殊字符,且长度不低于8位'))
      } else if (value == this.ruleForm.pass) {
        callback(new Error('两次输入密码一致!'))
      } else {
        callback()
      }
    }
    return {
      isShowPass: this.showPass,
      passwordType: 'password',
      isShow: this.isForgetShow,
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          const PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSUmOXyQmYYSnZacp0btvAZCOvCNPtzixAp7eJmzmAG4mgy/VgrY/s1BDLh9qTNHIRWXepUtwMrf1kYul/A45qE/2oxIbeeq4238YDWQ7ModOVXR9ytEHsT0jpCFvoYfYXYZnnoWRrLIBylQeXzqxbLDxxBxGCs4AjoRKh5S7nNQIDAQAB`

          const encrypt = new JSEncrypt()
          encrypt.setPublicKey(PUBLIC_KEY)
          console.log(this.ruleForm.pass)
          console.log(encrypt.encrypt(this.ruleForm.pass))
          let params = {
            userId: this.userId,
            oldPassword: encrypt.encrypt(this.ruleForm.pass),
            newPassword: encrypt.encrypt(this.ruleForm.checkPass)
          }
          Login.modifyPassword(params)
            .then(res => {
              this.handleClose()
              if (res.success) {
                this.$message.success('修改成功')
              } else {
                this.$message.success(res.msg || '修改失败')
              }
            })
            .catch(() => {
              this.$message.success('修改失败')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose() {
      this.$emit('closeForget')
    }
  },
  mounted() {}
}
</script>
<style lang="scss">
.fotget-ruleForm .el-form-item__content {
  width: 70%;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.demo-ruleForm .el-form-item {
  display: inline-block;
}
.text_h {
  font-size: 15px;
  text-align: center;
  background: #f9f9f9;
  margin-bottom: 0;
  border: 1px solid #e8e8e8;
  border-bottom: none;
}
.flex-container .flex-item {
  width: 32%;
}
</style>
