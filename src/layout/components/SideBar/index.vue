<template>
  <el-aside class="aside">
    <Logo></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
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
  </el-aside>
</template>
<script>
import { defineComponent, computed, ref, reactive, toRefs } from "vue";
import Logo from "./Logo.vue";
import SideItem from "./SideItem.vue";
import { constantRoutes } from "@/router/index";

export default defineComponent({
  name: "SideBar",
  components: {
    Logo,
    SideItem,
  },
  setup(props) {
    const activeMenu = computed(() => {
      return "/";
    });

    const routes = computed(() => {
      return constantRoutes;
    });

    return {
      activeMenu,
      routes
    };
  },
});
</script>
