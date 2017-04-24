import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Trending from '@/components/Trending/Trending'
import Fitness from '@/components/Fitness'
import Login from '@/components/Login'
import Config from '@/components/Config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/trending',
      name: 'Trending',
      component: Trending
    },
    {
      path: '/fitness',
      name: 'Fitness',
      component: Fitness
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/config',
      name: 'Config',
      component: Config
    }
  ]
})
