import Layout from '@/layout/index.vue'

export default {
  path: '/system-mgmt',
  component: Layout,
  redirect: { name: 'update-user' },
  alwaysShow: true, // will always show the root menu
  name: 'SystemMgmt',
  meta: {
    title: '系统管理',
    icon: 'el-icon-setting',
    roles: ['admin']
  },
  children: [
    {
      path: 'update-user',
      component: () => import('@/views/system-mgmt/update-user/index.vue'),
      name: '更新账户信息',
      meta: {
        title: '更新账户信息',
        icon: 'el-icon-s-custom'
      }
    }
  ]
}
