<template>
  <div class="app-wrapper">
    
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <!-- 主体内容 -->
      <app-main />
    </div>

  </div>
</template>
<script>
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/SideBar/index.vue';
import AppMain from './components/AppMain.vue';

export default defineComponent({
    name: 'Layout',
    components: {
      Sidebar,
      AppMain
    },
    setup() {
      const route = useRoute
      const key = computed(() => {
          return route.path
      })

      return {
          key
      }
    }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

@mixin clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}

</style>
