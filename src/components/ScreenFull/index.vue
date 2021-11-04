<template>
  <div class="screen-full">
    <svg-icon
      :name="iconName"
      @click="toggle"
    />
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useFullscreen } from "@vueuse/core";

export default defineComponent({
  name: "ScreenFull",
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    const iconName = computed(() => {
      return isFullscreen.value ? 'exit-fullscreen' : 'full-screen'
    })

    return {
      isFullscreen,
      toggle,
      iconName
    };
  },
});
</script>

<style lang="scss" scoped>
.screen-full {
  width: 40px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  &:hover {
    cursor: pointer;
    background: #f0f0f0;
    color: #17222e !important;
  }
}
</style>
