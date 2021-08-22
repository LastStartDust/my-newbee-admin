import { onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue';
import store from '@/store'
import { useRoute } from 'vue-router';

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export function useResizeHandlerHook(device, sidebar) {
  const route = useRoute()
  watch(route.path, () => {
    if (device.value === 'mobile' && sidebar.value.opened) {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  })

  const $_isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    }
  }

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })
  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  })
}
