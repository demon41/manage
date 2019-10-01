import Vue from 'vue'
import Router from 'vue-router'
import Index from '../src/views/index.vue'
import notFound from '../src/views/404.vue'
import register from '../src/views/Register.vue'
import login from '../src/views/login.vue'
import home from "../src/views/home.vue"
import Info from "./components/Info.vue"
import moneyUse from "./components/moneyUse.vue";

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    {
      path: '/index',
      component:Index,
      children:[
        {path:"",component:home},
        {path:"/home",component: home},
        {path:"/Info", component:Info},
        {path:"/moneyUse",component:moneyUse}
      ]
    },
    {
      path:'*',
      component:notFound
    },
    {
      path:'/register',
      component:register
    },
    {
      path:'/login',
      component:login
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

//路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.eleToken ? true : false
  // 登录和注册页面可以正常访问
  if(to.path == "/login" || to.path == "/register"){
    next();
  }else{
    isLogin ? next() : next("/login")
  }
})

export default router;
