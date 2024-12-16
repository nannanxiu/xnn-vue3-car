import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../views/Layout.vue"
import HomeView from '../views/HomeView/index.vue'
import LoginInfo from "../views/LoginInfo/index.vue"
import { useLoginStore } from "../stores/loginStore.js"
import { useMenuStore } from "../stores/menuStore.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      meta:{
        requiresAuth:true
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta:{
            requiresAuth:true,
            key:"首页"
          }
        },
        {
          path:"/project",
          name:"project",
          component:() =>import("../views/ProjectInfo/index.vue"),
          meta:{
            requiresAuth:true,
            key:"项目基础信息"
          }
        },
        {
          path:"/tunnel",
          name:"tunnel",
          component:() =>import("../views/TunnelInfo/index.vue"),
          meta:{
            requiresAuth:true,
            key:"隧道设计信息"
          }
        },
        {
          path:"/build",
          name:"build",
          component:() =>import("../views/BuildManage/index.vue"),
          meta:{
            requiresAuth:true,
            key:"施工监控检测"
          }
        },
        {
          path:"/geological",
          name:"geological",
          component:() =>import("../views/GeologicalInfo/index.vue"),
          meta:{
            requiresAuth:true,
            key:"超前地质预报"
          }
        },
        {
          path:"/system",
          name:"system",
          component:() =>import("../views/SystemManage/index.vue"),
          meta:{
            requiresAuth:true,
            key:"系统信息管理"
          }
        },
        {
          path:"/ucenter",
          name:"ucenter",
          component:() =>import("../views/UserCenter/index.vue"),
          meta:{
            requiresAuth:true,
            key:"个人中心"
          }
        },
        {
          path:"/plan",
          name:"检测计划",
          component:() =>import("../views/BuildManage/PlanTest/index.vue"),
          meta:{
            requiresAuth:true,
            key:"检测计划"
          }
        },
        {
          path:"/section",
          name:"切面检测",
          component:() =>import("../views/BuildManage/SectionTest/index.vue"),
          meta:{
            requiresAuth:true,
            key:"切面检测"
          }
        }
      ]
    },
    {
      path:"/login",
      name:"login",
      component:LoginInfo
    },
    {
      path:"/pdf/:id",
      name:"pdf",
      component:() => import("../views/TunnelInfo/PDFViewer/index.vue")
    },
    {
      // 404 路径匹配规则  没有找到对应的路径地址
      path:"/:pathMatch(.*)*",
      name:"notfound",
      component:() => import("../views/NotFound/index.vue")
    }
  ]
})

/**
 * 路由权限
 */
router.beforeEach((to,from,next) =>{
  if(to.meta.requiresAuth){
    // 需要验证登录
    const loginStore = useLoginStore()
    if(!loginStore.token){
      next({
        path:"/login"
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

router.afterEach((to,from)=>{
  // 存储路由路径
  localStorage.setItem("active",to.path)
  if(to.meta.key){
    // 存储key信息
    const menuStore = useMenuStore()
    menuStore.breadcrumb = to.meta.key
  }
})


export default router
