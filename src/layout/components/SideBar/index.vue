<template>
  <div :class="{'has-logo':showLogo}">
    <Logo></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
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
import { defineComponent, computed, ref, reactive, toRefs } from "vue";
import Logo from "./Logo.vue";
import SideItem from "./SideItem.vue";
import { constantRoutes } from "@/router/index";
import variablesModule from '@/styles/variables.module.scss'
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SideBar",
  components: {
    Logo,
    SideItem,
  },
  setup(props) {
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    });

    const routes = computed(() => {
      return constantRoutes;
    });

    const variables = computed(() => variablesModule)
    const showLogo = computed(() => true)

    return {
      activeMenu,
      routes,
      variables,
      showLogo
    };
  },
});
</script>
