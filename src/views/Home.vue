<template>
    <div>
        {{ msg }}
        <el-button type="primary" @click="handleClick">发送请求</el-button>
    </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { getHomeInfo } from '@/api/home';

export default defineComponent({
    name: 'Home',
    setup() {
        const state = reactive({
            msg: 'this is Home page!'
        })
        const handleClick = () => {
            getHomeInfo()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }

        return {
            // 使用toRefs把reactive中的所有属性转换为ref属性
            ...toRefs(state),
            handleClick
        }
    }
})
</script>