<template>
  <el-dialog :model-value="visible" @close="handleClose">
    <img class="img" :src="imgUrl" alt="" />
  </el-dialog>
</template>
<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'ImagePreview',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
  setup(props, { attrs, slots, emit }) {
    const handleClose = () => {
      emit('close', false)
    }
    return {
      handleClose
    }
  },
})
</script>
<style lang="scss" scoped>
.img {
  max-height: 80vh;
  max-width: 80vw;
  margin: auto;
  display: block;
}
</style>
