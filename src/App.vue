<template>
  <!-- 布局 -->
  <div class="layout">
    <!-- 布局容器 -->
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside class="aside" width="200px">
        <!-- 左上角logo+简易说明 -->
        <div class="head">
          <a href="" class="logo">
            <img :src="logo" alt="网站logo图片" class="logo-img" />
          </a>
          <span class="title">my-newbee-admin</span>
        </div>
        <!-- 菜单 -->
        <el-menu
          :default-active="menuConfig.active"
          class="menu"
          :collapse="menuConfig.isCollapse"
          :background-color="menuConfig.backgroundColor"
          :text-color="menuConfig.textColor"
          :active-text-color="menuConfig.activeTextColor"
        >
          <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template #title>我的工作台</template>
              <el-menu-item index="2-1">选项2-1</el-menu-item>
              <el-submenu index="2-2">
                <template #title>选项2-2</template>
                <el-menu-item index="2-2-1">选项2-2-1</el-menu-item>
                <el-menu-item index="2-2-2">选项2-2-2</el-menu-item>
                <el-menu-item index="2-2-3">选项2-2-3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="right-container">
        <el-header>Header</el-header>
        <el-main
          >Main
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";
import logo from "@/assets/logo.jpg";

export default defineComponent({
  name: "App",
  setup() {
    const menuConfig = reactive({
      active: "1", // 当前激活的菜单
      isCollapse: false, // 是否折叠菜单
      backgroundColor: '#9780e7', // 菜单的背景色（仅支持 hex 格式）
      textColor: '#303133', //	菜单的文字颜色（仅支持 hex 格式）
      activeTextColor: '#ffa500' //	当前激活菜单的文字颜色（仅支持 hex 格式）
    });

    return {
      logo,
      menuConfig,
    };
  },
});
</script>
<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;

  $asideWidth: 200px;
  $asideColor: #9780e7;
  .aside {
    height: 100vh;
    min-height: 100vh;
    width: $asideWidth;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: $asideColor;

    .head {
      $logoSize: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding-top: 20px;

      .logo {
        display: block;
        width: $logoSize;
        height: $logoSize;

        .logo-img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .menu {
      width: $asideWidth;
      min-height: 400px;

    }
  }

  .right-container {
    margin-left: $asideWidth;
  }
}
</style>
