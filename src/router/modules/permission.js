import Layout from '@/layout/index.vue'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  hidden: true,
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: '权限管理',
    icon: 'lock',
    roles: ['admin', 'editor'], // you can set roles in root nav
  },
  children: [
    {
      path: 'page',
      component: () => import('@/views/permission/page.vue'),
      name: 'PagePermission',
      meta: {
        title: '页面权限',
      },
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive.vue'),
      name: 'DirectivePermission',
      meta: {
        title: '指令权限',
        // if do not set roles, means: this page does not require permission
      },
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
  ],
}
