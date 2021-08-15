<template>
  <!-- 左上角logo+简易说明 -->
  <div class="logo-container">
    <router-link class="logo-link" to="/" >
      <img :src="logo" alt="网站logo图片" class="logo-img" />
      <h1 class="title">{{ title }} </h1>
    </router-link>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import logo from "@/assets/logo.jpg";

export default defineComponent({
  name: "Logo",
  setup() {
    const title = ref("my-newbee-admin");
    return {
      logo,
      title,
    };
  },
});
</script>
<style lang="scss" scoped>

.logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .logo-link {
    height: 100%;
    width: 100%;

    & .logo-img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
