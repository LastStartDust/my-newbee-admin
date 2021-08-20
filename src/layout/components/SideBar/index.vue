<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse"></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <SideItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import Logo from './Logo.vue'
import SideItem from './SideItem.vue'
import { constantRoutes } from '@/router/index'
import variablesModule from '@/styles/variables.module.scss'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SideBar',
  components: {
    Logo,
    SideItem,
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    const sidebar = computed(() => store.getters.sidebar)
    const permission_routes = computed(() => store.getters.permission_routes)
    const routes = computed(() => {
      if (permission_routes.value && permission_routes.value.length > 0) {
        return permission_routes
      }
      return constantRoutes
    })
    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const variables = computed(() => variablesModule)
    const isCollapse = computed(() => !sidebar.value.opened)

    return {
      activeMenu,
      routes,
      variables,
      showLogo,
      isCollapse,
    }
  },
})
</script>
