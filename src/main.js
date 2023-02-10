import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'assets/css/common.css'
import echarts from 'echarts'
import 'echarts-gl'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import store from 'store/index'
import bus from 'assets/js/bus'
import util from 'assets/js/util'
import './mock' // simulation data
import 'echarts/extension-src/dataTool'
// 让ajax携带cookie
axios.defaults.withCredentials = true
// 请求接口全局默认地址
axios.defaults.baseURL = '/csap'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做某事
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// Vue.http.interceptors.push((request, next) => {
//   request.credentials = true
//   next()
// })

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做些事
//   return response
// }, function (error) {
//   // 请求错误时做些事
//   return Promise.reject(error)
// })

// 引入element-ui
Vue.use(ElementUI)

// 项目上线后不再提示警告
Vue.config.productionTip = false
// 引入echarts
Vue.prototype.$echarts = echarts
// 引入axios处理请求
Vue.prototype.$axios = axios
// 引入事件总线管理
Vue.prototype.$bus = bus
// 引入公共方法
Vue.prototype.$util = util
// json转换
Vue.prototype.$qs = qs
// moment 日期处理类库
Vue.prototype.$moment = moment

// 添加响应拦截器
window.tipLock = false
Vue.prototype.$axios.interceptors.response.use((response) => {
  // 对响应数据做些事
  const data = response.data
  const code = data.status
  // const msg = res.message
  console.log('++++++++++++++axios.interceptors.response+++++++: ' + response.config.url)

  if (code === 'E1001') { // util.isDefine(code) &&
    if (!window.tipLock) {
      window.tipLock = true
      if (util.isNotEmptyObject(data)) {
        // ElementUI.Message.error({message: data.message})
        ElementUI.Message({
          type: 'error',
          message: data.message,
          onClose: function (c) {
            window.tipLock = false
          }
        })
        window.location.href = data.result.data
      } else if (util.isDefine(data)) {
        // ElementUI.Message.error(data)
        ElementUI.Message({
          type: 'error',
          message: data,
          onClose: function (c) {
            window.tipLock = false
          }
        })
        router.push({ path: '/' }) // 跳转登录界面
      } else {
        // ElementUI.Message.error('登录信息异常！')
        ElementUI.Message({
          type: 'error',
          message: '登录信息异常！',
          onClose: function (c) {
            window.tipLock = false
          }
        })
        router.push({ path: '/' }) // 跳转登录界面
      }
    }
    // util.logBackIn(data)
    // return Promise.reject(new Error('error'))
  }

  return response
}, (error) => {
  // 请求错误时做些事
  console.log('====================axios.interceptors.response========: ' + JSON.stringify(error))
  if (!window.tipLock) {
    window.tipLock = true
    // ElementUI.Message.error('接口请求失败!')
    ElementUI.Message({
      type: 'error',
      message: '接口请求失败',
      onClose: function (c) {
        window.tipLock = false
      }
    })
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
