import { createRouter, createWebHashHistory } from 'vue-router'
// 路由使用动态导入方式
const Home = () => import('@/views/Home.vue')

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]

// 创建路由
const  router = createRouter({
    // hash模式
    history: createWebHashHistory(),
    routes
})

export default router