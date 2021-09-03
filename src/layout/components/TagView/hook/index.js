import store from '@/store'
import router from '@/router'

export function useCloseCurrentPage(currentRoute, to = '') {
  return store.dispatch('tagsView/delCurrentView', {
    view: currentRoute,
    $router: router,
    to,
  })
}
