<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑 -->
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- 全屏 -->
        <ScreenFull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      
      <!-- 下拉菜单 -->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <!-- 图标 -->
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                <i class="el-icon-s-home"></i>
                <span>Welcome</span>
              </el-dropdown-item>
            </router-link>

            <!-- 退出登陆 -->
            <el-dropdown-item divided @click="logout">
              <i class="el-icon-switch-button"></i>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import logoJpg from '@/assets/logo.jpg'
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import ScreenFull from '@/components/ScreenFull/index.vue';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

// 顶部导航栏
export default defineComponent({
  name: "NavBar",
  components: {
    Breadcrumb,
    Hamburger,
    ScreenFull
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const avatar = logoJpg
    const sidebar = computed(() => store.getters.sidebar)
    const device = computed(() => store.getters.device)

    const toggleSideBar = () => {
      store.dispatch('app/toggleSideBar')
    }
    const logout = async () => {
      await store.dispatch('user/logout')
      router.push('/login')
    }

    return {
      toggleSideBar,
      logout,
      sidebar,
      avatar,
      device
    }
  },
});
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          //position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
