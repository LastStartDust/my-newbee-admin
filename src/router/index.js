import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

// 动态导入路由信息
const modules = import.meta.globEager('./modules/*.js')
const modulesRoutes = Object.keys(modules).map(key => {
  return modules[key].default
})

// 定义路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: "/",
    name: 'Home',
    component: Layout,
    redirect: { name: "Welcome" },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        // 路由使用动态导入方式
        component: () => import('@/views/home/index.vue'),
        meta: { title: "Welcome", icon: 'el-icon-s-home', affix: true },
      },
    ],
  },
];

// 异步路由
export const asyncRoutes = [
  ...modulesRoutes,
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)', redirect: { name: '404' }, hidden: true }
]

const createRouterIns = () => createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

// 创建路由
const router = createRouterIns()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouterIns()
  router.matcher = newRouter.matcher // reset router
}

export default router;
