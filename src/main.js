import { createApp } from 'vue'
import App from './App.vue'
import { ElButton } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from '@/router/index';

// 创建应用实例
const app = createApp(App)
app.use(ElButton)
app.use(router)

// 挂载
app.mount('#app')
