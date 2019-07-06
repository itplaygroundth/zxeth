import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './components/Login.vue')
    },
    {
      path: '/Add',
      name: 'Add',
      component: () => import(/* webpackChunkName: "about" */ './components/Add.vue')
    },
    {
      path: '/Users',
      name: 'Users',
      component: () => import(/* webpackChunkName: "about" */ './components/Users.vue')
    },
    {
      path: '/Stat',
      name: 'Stat',
      component: () => import(/* webpackChunkName: "about" */ './components/Stat.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "about" */ './components/Register.vue')
    },
    {
      path: '/Panel/:Panel',
      name: 'Panel',
      component: () => import(/* webpackChunkName: "about" */ './components/Panel.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue')
    },
    {
      path: '/Auto',
      name: 'Auto',
      component: () => import(/* webpackChunkName: "about" */ './components/Auto.vue')
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: () => import(/* webpackChunkName: "about" */ './components/Setting.vue')
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: () => import(/* webpackChunkName: "about" */ './components/Edit.vue')
    }
  ]
})
