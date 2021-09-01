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
    url: '/goods/list',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/goods/list',
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
    url: `/goods/list/${id}`,
    method: 'get'
  })
}
