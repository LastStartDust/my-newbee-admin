<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span 
          v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" 
          class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import { defineComponent, isRef, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 面包屑
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    let levelList = ref([])
    const route = useRoute()
    const router = useRouter()

    // 判断是不是首页
    const isDashboard = (route) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Welcome'.toLocaleLowerCase()
    }
    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      // 不是首页，添加首页的信息到开头
      if (!isDashboard(first)) {
        matched = [{ path: '/welcome', meta: { title: 'Welcome' }}].concat(matched)
      }

      levelList.value = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    watch(
      () => route.path, 
      (newPath) => {
        // if you go to the redirect page, do not update the breadcrumbs
        if(newPath.startsWith('/redirect/')) {
          return
        }
        getBreadcrumb()
      }
    )

    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(path)
    }

    getBreadcrumb()
    return {
      levelList,
      handleLink
    }
  }
})
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
