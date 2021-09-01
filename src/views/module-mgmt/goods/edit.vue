<template>
  <AddGoodsDetail :is-edit="true" />
</template>
<script>
import { defineComponent } from 'vue'
import AddGoodsDetail from './components/AddGoodsDetail.vue'
export default defineComponent({
  name: 'EditGoods',
  components: {
    AddGoodsDetail
  }
})
</script>
