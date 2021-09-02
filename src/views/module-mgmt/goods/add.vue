<template>
  <GoodsDetail :is-edit="false" />
</template>
<script>
import { defineComponent } from 'vue'
import GoodsDetail from './components/GoodsDetail.vue'
export default defineComponent({
  name: 'AddGoods',
  components: {
    GoodsDetail
  }
})
</script>
