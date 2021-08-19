<template>
  <div :class="classObj" class="app-wrapper">
    
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView : needTagsView }" class="main-container">
      <!-- 顶部导航区域 -->
      <div :class="{ 'fixed-header' : fixedHeader }">
        <!-- 顶部导航栏 -->
        <NavBar />
        <!-- tabs标签页 -->
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <!-- 主体内容 -->
      <app-main />
    </div>

  </div>
</template>
<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/SideBar/index.vue';
import AppMain from './components/AppMain.vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
    name: 'Layout',
    components: {
      Sidebar,
      AppMain,
      NavBar
    },
    setup() {
      const route = useRoute
      const key = computed(() => {
        return route.path
      })

      // TODO
      const sidebar = reactive({
        opened: true,
        withoutAnimation: ''
      })

      // TODO
      const setting = reactive({
        device: computed(() => 'desktop'),
        showSettings: computed(() => false),
        needTagsView: computed(() => false),
        fixedHeader: computed(() => false)
      })

      // TODO
      const classObj = reactive({
        openSidebar: sidebar.opened,
        hideSidebar: !sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: setting.device === 'mobile'
      })

      const handleClickOutside = () => {
        // TODO
        // this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }

      return {
        key,
        ...toRefs(setting),
        ...toRefs(sidebar),
        classObj,
        handleClickOutside
      }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import '@/styles/variables.module.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

</style>
