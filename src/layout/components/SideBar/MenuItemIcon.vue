<template>
  <template v-if="icon">
    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon" />
    <svg-icon v-else :name="icon" class="sub-el-icon" />
  </template>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuItemIcon',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
