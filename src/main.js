import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index';

// 创建应用实例
const app = createApp(App)
app.use(router)

// 挂载
app.mount('#app')
