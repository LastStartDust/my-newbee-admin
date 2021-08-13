<template>
  <div>
    <AddGoodsDetail :is-edit="false" />
  </div>
</template>
<script>
import AddGoodsDetail from './components/AddGoodsDetail.vue'
export default {
  name: 'AddGoods',
  components: {
    AddGoodsDetail
  }
}
</script>
