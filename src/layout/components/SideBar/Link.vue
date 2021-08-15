<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script>
// 自定义link，实现点击侧边栏，改变路由=》改变内容
import { defineComponent, computed, reactive } from "vue";
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: "Link",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const link = props.to
    const linkIsExternal = computed(() => isExternal(link))

    const type = computed(() => {
      // 判断是否是外部链接，需要使用a标签
      if(linkIsExternal.value) {
        return 'a'
      }
      return "router-link";
    })

    const linkProps = computed(() => {
      if(linkIsExternal.value) {
        return {
          href: link,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: link
      }
    })

    return {
      type,
      linkProps
    }
  }
})
</script>
<style lang="scss" scoped>
a {
  display: inline-block;
  width: 100%;
  overflow: hidden;
}
</style>
