import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
import Control from '@/components/Control'
/* import popUp from '@/components/popUp' */

Vue.use(Router)
console.log(Calendar)
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
    },
    {
      path: '/admin',
      name: 'Control',
      component: Control
    }
    /* {
      path: '/',
      name: 'popUp',
      component: popUp
    } */
  ]
})
