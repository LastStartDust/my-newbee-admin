<template>
  <AddGoodsDetail :is-edit="false" />
</template>
<script>
import { defineComponent } from 'vue'
import AddGoodsDetail from './components/AddGoodsDetail.vue'
export default defineComponent({
  name: 'AddGoods',
  components: {
    AddGoodsDetail
  }
})
</script>
