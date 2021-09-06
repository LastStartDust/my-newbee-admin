<template>
  <section class="app-main">
    <router-view :key="key" #default="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "AppMain",
  setup() {
    const route = useRoute;
    const store = useStore()
    const key = computed(() => route.path)
    const cachedViews = computed(() => store.state.tagsView.cachedViews)

    return {
      key,
      cachedViews
    };
  }
});
</script>
