// 登陆页面

<style scoped>
  .login_body{
    width:960px;
    margin:0px auto;
  }
  .login_header{
    width:1000px;
    height:101px;
    margin-top: 40px;
  }
  .login_header .img{
    float: left;
    width: 258px;
    height: 44px;
    margin: 28px 0 0 0;
  }
  .login_header .tit{
    float: left;
    height: 101px;
    font-size: 36px;
    color: rgb(52,68,102);
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  .login_header .tit p{
    text-align: center;
    /*margin-left: 140px;*/
  }
  .login_footer{
    text-align:center;
    padding-top:26px;
    color:#999999;
  }
  .login_footer a{ color:#999; text-decoration:none; padding:0 5px;}
  .login_footer a:hover{ color:#999; text-decoration:underline;}
  .login_content{
    position:relative;
    height:340px;
    z-index:15;
  }
  .login_show{
    width:100%;
    height:60%;
    position:absolute;
    left:0;
    top:160px;
    z-index:10;
    background-size: 100% 100%;
    background-color: #fff;
  }
  .login_box{
    position:absolute;
    width:346px;
    height:350px;
    z-index:20;
    margin-left:65%;
    margin-top:68px;
  }
  .login_lang{
    height:55px;
  }

  .login_news{
    height:111px;
    margin-top:25px;
  }
  .login_lang_name{
    float: left;
    width: 200px;
    height: 100%;
    color: #000;
    font-size: 24px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    line-height: 64px;
  }
  .login_lang_name span:first-child{
    float: left;
    margin-left: 15px;
  }
  .login_lang_name span:last-child{
    float: left;
    color: red;
    margin-left: 6px;
  }
  .login_lang_in{
    width: 127px;
    float: left;
    text-align:right;
    padding-top:30px;
    padding-right:15px;
  }
  .login_lang_in a{ color:#333; text-decoration:underline;}
  .login_lang_in select{
    border:1px solid #cdcdcd;
  }
  .nameTab{
    width: 346px;
    height: 40px;
    margin-top: -5px;
  }
  .nameTab input{
    float: left;
    width: 169px;
    height: 40px;
    border: none;
    outline: none;
    font-size: 14px;
    color: #666;
    background-color: #fff;
  }
  #lhbgzh{
    margin-left: 4px;
  }
  .nameTab .liClick{
    background-color: #e1e1e1;
    border: 1px solid #ccc;
    border-top: none;
  }
  .login_input{
    width: 252px;
    margin: 0px auto;
    margin-top: 30px;
  }
  .login_name{
    padding-top:34px;
  }
  .login_psw{
    padding-top:20px;
  }
  .login_notice{
    height:30px;
    line-height:30px;
    text-align:center;
    color:#d22c2c;
  }
  .clear{
    clear:both;
    font-size:0px;
    overflow:hidden;
    height:0px;
  }
  .login_pic{
    border:1px solid #cccccc;
    padding:1px;
    float:left;
    margin-left:18px;
  }
  .login_w{
    float:left;
    color:#333;
    font-size:14px;
    width:174px;
    margin-left:10px;
    line-height:20px;
  }
  .login_w a{
    color:#333;
    text-decoration:none;
  }
  .login_w a:hover{
    color:#333;
    text-decoration:underline;
  }
  .login_inputt{
    height:42px;
    line-height:42px;
    font-size:14px;
    width:197px;
    float:right;
    text-indent:15px;
    color:#999999;
    border:0px;
    margin-right:3px;
  }
  .login_news{
    padding-left:14px;
  }
  .login_new{
    margin-top:20px;
  }
  .login_news_pic{
    float:left;
    border:1px #cccccc solid;
  }
  .login_news_info{
    float:left;
    margin-left:10px;
    color:#373737;
    font-size:14px;
    width:168px;
    line-height:1.5em;
    padding-top:2px;
    text-indent:2em;
  }
  .login_news_info a{
    color:#373737;
    text-decoration:none;
  }
  .login_news_info a:hover{
    color:#373737;
    text-decoration:underline;
  }
  .login_news_pic img{
    padding:1px;
  }

  /*新增*/
  .user,.password{
    width: 254px;
    height: 48px;
  }
  .verification{
    width: 254px;
    height: 48px;
    margin-top: 15px;
  }
  .code{
    width: 140px;
    height: 48px;
    float: left;
  }
  .number{
    width: 100px;
    height: 48px;
    float: left;
    background-color: #b7b7b7;
    color: #fff;
    font-size: 35px;
    line-height: 48px;
    text-align: center;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    margin-left: 10px;
  }
  .user{
    margin-top: 10px;
  }
  .password{
    margin-top: 15px;
  }
  .captcha {
    margin-top: 15px;
    display: flex;
    align-items: center;
  }
  .captcha-input {
    width:162px;
    height:46px
  }
  .captcha-img {
    width:80px;
    margin-left:10px;
    height:46px;
  }
  .code .codeInput{ width:120px; height:32px; padding-left:15px; line-height:35px; font-size:14px; margin-left:37px; float:left; border:none; background:none; color:#3b3b3b;}
  .code .codeImg{ float:right;}
  .user input,.password input{
    width: 204px;
    float: right;
    margin-right: 2px;
    margin-top: 4px;
    height: 42px;
    line-height: 32px;
    text-indent: 15px;
    border: none;
    color: #000;
    font-size: 14px;
    border: none;
    background: none;
  }
  .code input{
    width: 90px;
    float: right;
    margin-right: 2px;
    margin-top: 1px;
    height: 42px;
    line-height: 32px;
    text-indent: 15px;
    border: none;
    color: #000;
    font-size: 14px;
    border: none;
    background: none;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
  }
  .yzma{
    width:252px;
    height:36px;
    margin-top:15px;}
  .yzma input{
    width:158px;
    border:none;
    height:34px;
    margin-left:2px;
    line-height:34px;
    text-indent:15px;
    font-size:14px;
    color:#bebebe;
    float:left;
  }
  .yzma img{
    border:none;
    width:77px;
    height:38px;
    float:left;
    margin-left:15px;}
  .login_btn{
    width: 252px;
    height: 46px;
    text-align: center;
    display: block;
    margin-top: 15px;
    font-size: 18px;
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  .error{
    color:#F00;
    font-size:12px;
    text-align:center;
    height:15px;
    margin-top:3px;
  }

  .login >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 46px;
    line-height: 46px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    float: right;
    margin-top: 1px;
  }
</style>

<template>
  <div class="login" v-loading="loading">
    <Loading v-show="showLoading"></Loading>
    <div v-show="isShowLoginBtn">
      <div class="login_show login_show_img"> </div>
      <div class="login_body">
<!--      <div class="login_header login_header_img">-->
<!--        <div class="img"><img src="../../assets/images/login_logo.png"></div>-->
        <div class="login_header">
        <div class="img"></div>
        <div class="tit"><p>CSAP系统-BI分析模块</p></div>
      </div>
      <div class="login_content">
        <div class="login_box login_box_img">
          <div class="login_lang">
            <div class="login_lang_name">
              <span>用户登录</span>
              <span>LOGIN</span>
            </div>
          </div>
          <div id="loginTab">
            <div class="login_input">
              <div class="user user_img">
                <el-input type="text" placeholder="请输入办公账号" v-model="userName" @keyup.enter.native="login()" style="width: 81%;float: right"></el-input>
              </div>
              <div class="password password_img">
                <el-input type="password" placeholder="请输入密码 " v-model="userPass" @keyup.enter.native="login()" style="width: 81%;float: right"></el-input>
              </div>
              <div class="captcha">
                <el-input v-model="verificationCode" placeholder="请输入验证码" class="captcha-input"></el-input>
                <img :src="verificationCodeImg" class="captcha-img" @click="getCode()">
              </div>
              <el-button type="primary" @click="login"  class="login_btn" @keyup.enter.native="login()">登 录</el-button>
            </div>
          </div>
          <div class="clear">&nbsp;</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
const Loading = () => import('components/base/Loading')
export default {
  name: 'Login',
  computed: {
    ...mapState(['showLoading'])
  },
  components: {
    Loading
  },
  data () {
    return {
      verificationCode: '',
      userName: '',
      userPass: '',
      loading: true,
      isShowLoginBtn: false,
      verificationCodeImg: '',
      timestamp: ''
    }
  },
  created () {
    this.checkIsLogin()
  },
  methods: {
    getCode () {
      // this.timestamp = String(Math.floor(Math.random() * Math.pow(10, 4))) + String((new Date()).getTime())
      this.timestamp = String(Math.floor(Math.random() * Math.pow(10, 1))) + String((new Date()).getTime())
      this.$axios.get('user/image', {
        responseType: 'arraybuffer',
        params: {
          timestamp: this.timestamp
          }
        }).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          let scr = 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
        this.verificationCodeImg = scr
        }
      })
    },
    checkIsLogin () {
      // 显示登录页面
      this.isShowLoginBtn = true
      this.loading = false
    },
    getSystems (name) {
      if (name) {
        this.$axios.get('/saas/getSystemsByUserLoginName', { params: {
            userLoginName: name
          } }).then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$router.push({path: '/loginChose'}) //  跳转到首页
              // if (response.data.length === 1) {
              //   console.log(response.data[0]['SYSTEM_URL'])
              //   window.open(response.data[0]['SYSTEM_URL'], '_self')
              // } else {
              //   this.$router.push({path: '/loginChose'}) //  跳转到首页
              // }
            }
          })
      } else {
        this.$router.push({path: '/'})
      }
    },
    login () {
      if (this.userName === '') {
        this.$message({
          message: '请输入联合办公账号',
          type: 'warning'
        })
        return
      } else if (this.userPass === '') {
        this.$message({
          message: '请输入账号密码',
          type: 'warning'
        })
        return
      } else if (this.verificationCode === '') {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
        return
      }
      this.$store.commit('SHOW_LOADING', '正在加载数据，请稍等！') // 打开加载提示框
      this.$axios.get('/user/login', {params: {
        loginName: this.userName,
        password: this.userPass,
        timestamp: this.timestamp,
        captcha: this.verificationCode
      }}).then(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        console.log('login', response)
        var data = response.data
        if (data.status === '0') {
          this.getSystems(this.userName)
        } else {
          this.$message.error(data.message)
          // if (data.status === 'E1000') {
          //   this.getCode()
          // }
          this.getCode()
        }
      }).catch(response => {
        this.$store.commit('HIDE_LOADING', '拼命加载中！') // 隐藏加载框
        this.$message.error('登录失败!请联系管理员 ')
      })
    }
  },
  mounted () {
    this.getCode()
  }
}
</script>
<style scoped>
  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .loading {
    top: 50%;
  }

</style>
