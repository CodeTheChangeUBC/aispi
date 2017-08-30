import Vue from 'vue'
import Router from 'vue-router'
import Http from 'vue-resource'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
import Control from '@/components/Control'

Vue.use(Router)
Vue.use(Http)

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
