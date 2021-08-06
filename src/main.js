import { createApp } from 'vue'
import App from './App.vue'
import { useElementPlus } from '@/plugins/element-plus';
import router from '@/router/index';
import '~/theme/element-plus-theme/index.css'
import '@/styles/index.scss';

// 创建应用实例
const app = createApp(App)
app.use(useElementPlus)
app.use(router)

// 挂载
app.mount('#app')
