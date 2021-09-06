import Layout from '@/layout/index.vue'

export default {
  path: '/module-mgmt',
  name: 'ModuleMgmt',
  meta: { title: '模块管理', icon: 'el-icon-menu' },
  component: Layout,
  redirect: { name: 'SwiperList' },
  alwaysShow: true,

  children: [
    {
      path: 'category-mgmt-list',
      name: 'CategoryMgmtList',
      component: () => import('@/views/module-mgmt/category-mgmt/index.vue'),
      meta: { title: '分类管理', icon: 'category-mgmt' },
      children: [
        {
          path: 'level2',
          name: 'CategoryLevel2',
          component: () =>
            import('@/views/module-mgmt/category-mgmt/index.vue'),
          meta: { title: '分类二级管理', icon: 'category-mgmt' },
          hidden: true,
        },
        {
          path: 'level3',
          name: 'CategoryLevel3',
          component: () =>
            import('@/views/module-mgmt/category-mgmt/index.vue'),
          meta: { title: '分类三级管理', icon: 'category-mgmt' },
          hidden: true,
        },
      ],
    },
    {
      path: 'goods-list',
      name: 'GoodsList',
      component: () => import('@/views/module-mgmt/goods/index.vue'),
      meta: { title: '商品管理', icon: 'el-icon-goods' },
    },
    {
      path: 'add-goods',
      name: 'AddGoods',
      component: () => import('@/views/module-mgmt/goods/add.vue'),
      meta: { title: '新增商品', noCache: true },
      hidden: true,
    },
    {
      path: 'edit-goods',
      name: 'EditGoods',
      component: () => import('@/views/module-mgmt/goods/edit.vue'),
      meta: { title: '编辑商品', noCache: true },
      hidden: true,
    },
    {
      path: 'order-list',
      name: 'OrderList',
      component: () => import('@/views/module-mgmt/order-mgmt/index.vue'),
      meta: { title: '订单管理', icon: 'el-icon-s-order' },
    },
    {
      path: 'order-detail',
      name: 'OrderDetail',
      component: () => import('@/views/module-mgmt/order-mgmt/detail.vue'),
      meta: { title: '订单详情', noCache: true },
      hidden: true
    }
  ]
}
