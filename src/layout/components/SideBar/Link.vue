<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script>
// 自定义link，实现点击侧边栏，改变路由=》改变内容
import { defineComponent, computed, reactive } from "vue";

export default defineComponent({
  name: "Link",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const targetLink = props.to
    const type = computed(() => {
      // TODO 判断是否是外部链接，需要使用a标签
      return "router-link";
    });

    const linkProps = reactive({
      to: targetLink,
    })

    return {
      type,
      linkProps
    };
  },
});
</script>

