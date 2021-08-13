import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

// 定义路由
export const constantRoutes = [
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
        meta: { title: "home" },
      },
    ],
  },
  {
    path: "/goods",
    name: "Goods",
    meta: { title: "Goods", icon: "table" },
    component: Layout,
    redirect: { name: "GoodsList" },

    children: [
      {
        path: "list",
        name: "GoodsList",
        component: () => import("@/views/goods/index.vue"),
        meta: { title: "GoodsList", icon: "list" },
      },
      {
        path: "add",
        name: "AddGoods",
        component: () => import("@/views/goods/add.vue"),
        meta: { title: "AddGoods", icon: "add", noCache: true },
      }
    ]
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
        component: () => import('@/views/nested/menu2/index.vue'),
        meta: { title: 'menu2' }
      }
    ]
  }
];

// 创建路由
const router = createRouter({
  // hash模式
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
