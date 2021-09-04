import Layout from '@/layout/index.vue'

export default {
  path: '/home-page-config',
  name: 'HomePageConfig',
  meta: { title: '首页配置', icon: 'el-icon-set-up' },
  component: Layout,
  redirect: { name: 'SwiperList' },
  alwaysShow: true,

  children: [
    {
      path: 'swiper-list',
      name: 'SwiperList',
      component: () => import('@/views/home-page-config/swiper/list.vue'),
      meta: { title: '轮播图配置', icon: 'swiper' },
    },
    {
      path: 'index-config',
      name: 'IndexConfig',
      component: () => import('@/views/home-page-config/index-config/index.vue'),
      meta: { title: '首页栏目配置', icon: 'el-icon-setting' },
    }
  ]
}
