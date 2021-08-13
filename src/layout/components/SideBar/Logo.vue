<template>
  <!-- 左上角logo+简易说明 -->
  <div class="head">
    <a href="" class="logo">
      <img :src="logo" alt="网站logo图片" class="logo-img" />
    </a>
    <span class="title">my-newbee-admin</span>
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
