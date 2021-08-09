<template>
  <el-aside class="aside">
    <Logo></Logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        mode="vertical"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
      >
        <SideItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :active-bg-color="activeBgColor"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import { defineComponent, computed, ref, reactive, toRefs } from "vue";
import Logo from "./Logo.vue";
import SideItem from "./SideItem.vue";

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
    const isCollapse = ref(false);
    const routes = ref([
      { path: "/", title: "首页" },
      {
        path: "/my-workbench",
        title: "我的工作台",
        children: [
          {
            path: "option-2-1",
            title: "选项2-1",
          },
          {
            path: "option-2-2",
            title: "选项2-2",
            children: [
              {
                path: "option-2-2-1",
                title: "选项2-2-1",
              },
              {
                path: "option-2-2-2",
                title: "选项2-2-2",
              },
              {
                path: "option-2-2-3",
                title: "选项2-2-3",
              },
            ],
          },
        ],
      },
      { path: "/message-center", title: "消息中心" },
    ]);

    // 侧边栏背景颜色
    const asideBgColor = ref('#9780e7')
    const menuColorConfig = reactive({
      backgroundColor: asideBgColor, // 菜单的背景色（仅支持 hex 格式）
      textColor: "#303133", //	菜单的文字颜色（仅支持 hex 格式）
      activeTextColor: "#ffa500", // 当前激活菜单的文字颜色（仅支持 hex 格式）
      activeBgColor: "#7966b9", // 当前激活菜单的背景色
    });

    return {
      activeMenu,
      isCollapse,
      routes,
      ...toRefs(menuColorConfig),
      asideBgColor
    };
  },
});
</script>
<style lang="scss" scoped>

.scrollbar-wrapper {
  overflow-x: hidden !important;
}

.aside {
  height: 100vh;
  min-height: 100vh;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: v-bind("asideBgColor");

  .el-menu {
    width: 100%;
    margin-top: 10px;

    :deep(.el-menu-item.is-active) {
      // 导入js中定义的变量 参考https://github.com/vuejs/rfcs/blob/master/active-rfcs/0043-sfc-style-variables.md
      background-color: v-bind("activeBgColor") !important;
    }
    :deep(.el-submenu
        .el-submenu__title
        i.el-submenu__icon-arrow.el-icon-arrow-down) {
      color: v-bind("textColor");
    }
  }
}

</style>