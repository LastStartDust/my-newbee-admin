import { createApp } from 'vue'
import App from './App.vue'
import { useElementPlus } from '@/plugins/element-plus';
import router from '@/router/index';
import '@/styles/index.scss';
import svgIcon from '@/components/svgIcon/index.vue'
// 目前版本不支持主题色修改，待element-plus迁移scss到css完成
// import '@/styles/element-variables.module.scss'

// 创建应用实例
const app = createApp(App)
app.use(useElementPlus)
app.use(router)
app.component('svg-icon', svgIcon)

// 挂载
app.mount('#app')
