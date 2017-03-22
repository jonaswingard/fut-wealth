import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Rising from '@/components/Rising'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/rising',
      name: 'Rising',
      component: Rising
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
