<template>
  <span v-if="title">{{ title }}</span>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuItemTitle',
  props: {
    title: {
      type: String,
      default: '',
    }
  }
})
</script>
