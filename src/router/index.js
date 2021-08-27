import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

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
  {
    path: '/nested',
    component: Layout,
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    redirect: { name: 'Menu1' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        redirect: { name: 'Menu1-1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu-2',
        component: () => import('@/views/nested/menu2/index.vue'),
        meta: { title: 'menu2' }
      }
    ]
  }
];

// 异步路由
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      // {
      //   path: 'role',
      //   component: () => import('@/views/permission/role.vue'),
      //   name: 'RolePermission',
      //   meta: {
      //     title: 'Role Permission',
      //     roles: ['admin']
      //   }
      // }
    ]
  },
  {
    path: "/goods",
    name: "Goods",
    meta: { title: "Goods", icon: "el-icon-s-shop" },
    component: Layout,
    redirect: { name: "GoodsList" },

    children: [
      {
        path: "list",
        name: "GoodsList",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "GoodsList", icon: "el-icon-s-order" },
      },
      {
        path: "add",
        name: "AddGoods",
        component: () => import("@/views/goods/add.vue"),
        meta: { title: "AddGoods", icon: "el-icon-circle-plus-outline", noCache: true },
      }
    ]
  },
  {
    path: "/home-page-config",
    name: "HomePageConfig",
    meta: { title: "首页配置", icon: "el-icon-set-up" },
    component: Layout,
    redirect: { name: "SwiperList" },
    alwaysShow: true,

    children: [
      {
        path: "swiper-list",
        name: "SwiperList",
        component: () => import("@/views/home-page-config/swiper/list.vue"),
        meta: { title: "轮播图配置", icon: "swiper" },
      },
      {
        path: "index-config",
        name: "IndexConfig",
        component: () => import("@/views/home-page-config/index-config/index.vue"),
        meta: { title: "首页栏目配置", icon: "el-icon-setting" },
      }
    ]
  },
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
