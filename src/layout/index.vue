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
import AppMain from './components/AppMain/index.vue';

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
@mixin clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

$sideBarWidth: 200px;
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100vw;
  height: 100vh;

  .sidebar-container {
    width: $sideBarWidth;
  }

  .main-container {
    margin-left: $sideBarWidth;
  }
}

</style>
