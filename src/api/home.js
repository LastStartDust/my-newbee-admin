import request from '@/utils/request'

// 获取信息
export function getHomeInfo(params) {
  return request({
    url: '/api/home/info',
    method: 'get',
    params
  })
}