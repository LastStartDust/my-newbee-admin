<template>
  <span v-if="title" class="menu-item-title">{{ title }}</span>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuItemTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.el-popper.is-dark {
  & > .menu-item-title {
    display: inline-block;
    position: relative;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    color: $menuText;
    background: $menuBg;
    &:hover {
      background: $menuHover;
    }

    &::before {
      display: block;
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 10px;
      height: 10px;
      z-index: -1;
      background-color: $menuBg;
    }
  }
}
</style>
