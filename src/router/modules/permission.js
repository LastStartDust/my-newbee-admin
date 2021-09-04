import Layout from '@/layout/index.vue'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'Permission',
    icon: 'lock',
    roles: ['admin', 'editor'], // you can set roles in root nav
  },
  children: [
    {
      path: 'page',
      component: () => import('@/views/permission/page.vue'),
      name: 'PagePermission',
      meta: {
        title: 'Page Permission',
        roles: ['admin'], // or you can only set roles in sub nav
      },
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive.vue'),
      name: 'DirectivePermission',
      meta: {
        title: 'Directive Permission',
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
