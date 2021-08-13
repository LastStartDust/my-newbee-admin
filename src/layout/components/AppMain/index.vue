<template>
    <section class="app-main">
        <router-view :key="key" #default="{ Component }">
        <transition appear name="fade-transform" mode="out-in">
            <keep-alive>
            <component :is="Component" />
            </keep-alive>
        </transition>
        </router-view>
    </section>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'AppMain',
    setup() {
        const route = useRoute
        const key = computed(() => {
            return route.path
        })

        return {
            key
        }
    }
})
</script>
