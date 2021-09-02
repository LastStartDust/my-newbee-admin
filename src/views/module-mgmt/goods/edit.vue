<template>
  <GoodsDetail :is-edit="true" />
</template>
<script>
import { defineComponent } from 'vue'
import GoodsDetail from './components/GoodsDetail.vue'
export default defineComponent({
  name: 'EditGoods',
  components: {
    GoodsDetail
  }
})
</script>
