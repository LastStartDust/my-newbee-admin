<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true"  v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'
import { defineComponent, computed, toRefs } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  },
  setup(props) {
    // 要解构 prop，可以通过使用 setup 函数中的 toRefs 来安全地完成此操作
    const { iconClass, className } = toRefs(props)
    
    const isExternal = computed(() => isExternal(iconClass.value))
    const iconName = computed(() => `#icon-${iconClass.value}`)
    const svgClass = computed(() => {
      if (className.value) {
        return `svg-icon ${className.value}`
      } else {
        return 'svg-icon'
      }
    })
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${iconClass.value}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`
      }
    })

    return {
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
