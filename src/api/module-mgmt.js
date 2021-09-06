import request from '@/utils/request'

export function fetchCategoryList(query) {
  return request({
    url: '/categories',
    params: query
  })
}

export function createCategory(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/categories',
    method: 'put',
    data
  })
}

export function fetchCategory(id) {
  return request({
    url: `/categories/${id}`,
    method: 'get'
  })
}

export function deleteCategory(ids) {
  return request({
    url: `/categories`,
    data: {
      ids,
    },
    method: 'delete'
  })
}

// 商品管理
export function fetchGoodsList(query) {
  return request({
    url: '/goods/list',
    params: query
  })
}

export function createGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/goods',
    method: 'put',
    data
  })
}

export function updateGoodsStatus({ ids, status }) {
  return request({
    url: `/goods/status/${status}`,
    method: 'put',
    data: {
      ids,
    },
  })
}

export function fetchGoods(id) {
  return request({
    url: `/goods/${id}`,
    method: 'get'
  })
}

export function fetchCategories(params) {
  return request({
    url: `/categories`,
    method: 'get',
    params
  })
}

export function fetchOrderList(query) {
  return request({
    url: '/orders',
    params: query
  })
}

// 出库
export function checkoutOrder(ids) {
  return request({
    url: '/orders/checkOut',
    method: 'put',
    data: {
      ids,
    }
  })
}

// 关闭订单
export function closeOrder(ids) {
  return request({
    url: '/orders/close',
    method: 'put',
    data: {
      ids,
    }
  })
}

// 配货成功
export function checkDoneOrder(ids) {
  return request({
    url: '/orders/checkDone',
    method: 'put',
    data: {
      ids,
    }
  })
}

export function fetchOrder(id) {
  return request({
    url: `/orders/${id}`
  })
}

export function fetchGuestList(query) {
  return request({
    url: '/users',
    params: query
  })
}

// 解除账户禁用
export function solveGuest(ids) {
  return request({
    url: '/users/0',
    method: 'put',
    data: {
      ids,
    }
  })
}

// 禁用账户
export function forbidGuest(ids) {
  return request({
    url: '/users/1',
    method: 'put',
    data: {
      ids
    }
  })
}
