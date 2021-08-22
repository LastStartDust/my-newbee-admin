<template>
  <div></div>
</template>
<script>
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Redirect',
  render() {
    return h()
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    const { path, params, query } = from
    next((vm) => {
      // 通过 `vm` 访问组件实例
      vm.$router.replace({
        path: path,
        params,
        query,
      })
    })
  },
})
</script>
