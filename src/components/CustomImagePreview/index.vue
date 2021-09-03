<template>
  <el-image-viewer
    v-if="showViewer"
    :urlList="urlList"
    @close="closeViewer"
    @switch="switchViewer"
    v-bind="$attrs"
  />
</template>
<script>
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'CustomImagePreview',
  props: {
    // 使用 v-model:show
    show: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'switch'],
  setup(props, { attrs, slots, emit }) {
    const urlList = computed(() => {
      if(props.url) {
        return [props.url]
      }
      return []
    })
    const showViewer = computed(() => props.show)

    const closeViewer = () => {
      emit('update:show', false)
      emit('close')
    }
    const switchViewer = (val) => {
      emit('switch', val)
    }

    return {
      urlList,
      closeViewer,
      switchViewer,
      showViewer
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
