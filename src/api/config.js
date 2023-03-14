/**
 * axios封装
 * 请求拦截，相应拦截，错误统一处理，请求设置
 */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

let cancel
let promiseObj = {}
let CancelToken = axios.CancelToken

// 设置接口请求公共地址
if (process.env.NODE_ENV === 'development') { // 测试
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') { // 生产
  axios.defaults.baseURL = ''
}

// 设置请求超时时间
axios.defaults.timeout = 30 * 1000 // 30s超时

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;chartset=UTF-8'

// 设置请求拦截器
axios.interceptors.request.use(function (config) {
  // 1.添加token
  // 2.处理重复请求;发送请求时，取消掉当前正在操作的相同请求;为防止发起请求时，当前正在进行的相同请求，在请求拦截器中加入了hash判断，将相同请求url拦截
  if (promiseObj[config.url]) {
    promiseObj[config.url]('请求取消')
    promiseObj[config.url] = cancel
  } else {
    promiseObj[config.url] = cancel
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 设置响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  if (error.response && error.response.status) { // 统一的错误处理
    // allError(error)
  }
  return Promise.reject(error)
})

/**
 * allError 统一错误处理
 * @param {Object} error [错误信息对象]
 */
export function allError (error) {
  switch (error.response.status) {
    case 400: // 未知错误
      Message.error('未知错误')
      break
    /**
     * 未登录
     * 1.未登录则跳转登录界面，并携带当前页面的路径
     * 2. 在登录成功后返回当前页面，这一步需要在登录页操作
     *  router.replace({
     *      path: '/login',
     *     query: { redirect: router.currentRoute.fullPath }
     *  });
     */
    case 401:
      Message.error('未登录')
      break
    /**
     * token登录过期
     * 1.登录过期对用户进行提示
     *    Message.error('token登录过期')
     * 2.清除本地token和清空vuex中token对象
     *    localStorage.removeItem('token');
     *    store.commit('loginSuccess', null);
     * 3.跳转登录界面
     * setTimeout(() => {
     *  router.replace({
     *    path: '/login',
     *    query: {
     *      redirect: router.currentRoute.fullPath
     *    }
     *  });
     * }, 1000);
     */
    case 404:
      Message.error('请求不存在')
      break
    default: // 其他错误直接抛出错误提示
      Message.error('其他错误')
  }
}

/**
 * get 处理get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时传入的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      cancelToken: new CancelToken(c => {
        cancel = c
      }),
      params: params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * post 处理POST请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时传入的参数]
 * @param {Boolean} isFrom [设置header是否是form表单]
 */
export function post (url, params, isForm) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      cancelToken: new CancelToken(c => {
        cancel = c
      }),
      headers: {
        'Content-type': isForm ? 'application/x-www-form-urlencoded;chartset=UTF-8' : 'application/json;charset=UTF-8'
      },
      params: qs.stringify(params)
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
