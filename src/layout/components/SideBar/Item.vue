<template>
  <template v-if="icon">
    <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
    <svg-icon v-else :icon-class="icon" />
  </template>
  <template v-if="title">
    <span name="title">{{ title }}</span>
  </template>
</template>

<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

</style>
