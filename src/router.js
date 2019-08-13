import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active', // active class for *exact* links.
  routes: [
    {
      path: '/',
      // name: 'Users'
      component: () => import(/* webpackChunkName: "about" */ './components/Users.vue')
    },
    { path: '/Login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './components/Login.vue')
    },
    {
      path: '/Add',
      name: 'Add',
      component: () => import(/* webpackChunkName: "about" */ './components/Add.vue'),
      meta: {
        active: false
      }
    },
    {
      path: '/Stat',
      name: 'Stat',
      component: () => import(/* webpackChunkName: "about" */ './components/Stat.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "about" */ './components/Register.vue'),
      meta: {
        active: false
      }
    },
    {
      path: '/Panel/:Panel',
      name: 'Panel',
      component: () => import(/* webpackChunkName: "about" */ './components/Panel.vue')
    },
    {
      path: '/Users',
      name: 'Users',
      component: () => import(/* webpackChunkName: "about" */ './components/Users.vue'),
      meta: {
        active: false
      }
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
