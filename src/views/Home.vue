<template>
    <div>
        {{ msg }}
    </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'Home',
    setup() {
        const state = reactive({
            msg: 'this is Home page!'
        })

        return {
            // 使用toRefs把reactive中的所有属性转换为ref属性
            ...toRefs(state)
        }
    }
})
</script>