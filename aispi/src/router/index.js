import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
/* import popUp from '@/components/popUp' */

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    /* {
      path: '/',
      name: 'popUp',
      component: popUp
    } */
  ]
})
