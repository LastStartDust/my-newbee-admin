<template>
  <span v-if="!isCollapse && title">{{ title }}</span>
</template>
<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  name: 'MenuItemTitle',
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  setup() {
    // 是否处于折叠状态
    const isCollapse = inject('isCollapse')
    return { 
      isCollapse
    }
  }
})
</script>
