import Vue from 'vue'
import Router from 'vue-router'
import DataVerification from 'components/dataCombTool/DataVerification'
import Details from 'components/dataCombTool/Details'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  // base: '/csap/',
  routes: [{
      path: '/dataBind',
      name: 'dataBind',
      component: Details
    }, {
      path: '/dataVerify',
      name: 'dataVerify',
      component: DataVerification
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
  // base: '/csap/',
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
