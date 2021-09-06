import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminUser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/adminUser/profile',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'delete'
  })
}

export function updateUserName(data) {
  return request({
    url: '/adminUser/name',
    method: 'put',
    data
  })
}

export function updateUserPassword(data) {
  return request({
    url: '/adminUser/password',
    method: 'put',
    data
  })
}
