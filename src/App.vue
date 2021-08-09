<template>
  <!-- 布局 -->
  <div class="layout">
    <!-- 布局容器 -->
    <el-container class="container">
      <!-- 侧边栏 -->
      <SideBar/>
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
import { defineComponent, reactive, ref, toRefs } from "vue";
import SideBar from '@/components/SideBar/index.vue';

export default defineComponent({
  name: "App",
  components: {
    SideBar
  },
  setup() {
    return {
    };
  },
});
</script>
<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;

  .right-container {
    // 对应SideBar的aside元素宽度
    margin-left: 200px;
  }
}
</style>
