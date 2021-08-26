import request from '@/utils/request'

export function fetchCarouselList(query) {
  return request({
    url: '/carousels',
    params: query
  })
}

export function createCarousel(data) {
  return request({
    url: '/carousels',
    method: 'post',
    data
  })
}

export function updateCarousel(data) {
  return request({
    url: '/carousels',
    method: 'put',
    data
  })
}

export function fetchCarousel(id) {
  return request({
    url: `/carousels/${id}`,
    method: 'get'
  })
}
