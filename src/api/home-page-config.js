import request from '@/utils/request'

export function fetchCarouselList(query) {
  return request({
    url: '/carousels',
    params: query
  })
}
