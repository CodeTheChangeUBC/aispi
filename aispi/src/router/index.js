import Vue from 'vue'
import Router from 'vue-router'
import Http from 'vue-resource'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
import Control from '@/components/Control'
/* import popUp from '@/components/popUp' */
console.log(Router)

Vue.use(Router)
Vue.use(Http)
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
