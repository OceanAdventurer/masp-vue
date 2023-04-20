import Vue from 'vue'
import Router from 'vue-router'
import Container from 'components/base/Container'
import Login from 'components/base/Login'
import Map from 'components/TempMap'
import DM from 'components/datamining/Data_mining'
import result from 'components/datamining/modeingResult/baseresult.vue'
import LoginChose from 'components/base/LoginChose'
import UserManage from 'components/UserManagement/UserManage'
import NoAuthority from 'components/base/NoAuthority'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  // base: '/DSAP/',
  routes: [
    {
      path: '/home',
      name: 'Container',
      component: Container
    }, {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/map',
      name: 'TempMap',
      component: Map
    }, {
      path: '/dm',
      name: 'DM',
      component: DM
    }, {
      path: '/result',
      name: 'result',
      component: result
    }, {
      path: '/loginChose',
      name: 'LoginChose',
      component: LoginChose
    }, {
      path: '/userManage',
      name: 'UserManage',
      component: UserManage
    }, {
      path: '/noAuthority',
      name: 'NoAuthority',
      component: NoAuthority
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  next()
})

export default router

/* export default new Router({
  // mode: 'history',
  // base: '/DSAP/',
  routes: [
    {
      path: '/home',
      name: 'Container',
      component: Container
    }, {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
}) */
