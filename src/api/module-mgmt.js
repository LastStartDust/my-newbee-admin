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
