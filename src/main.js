import { createApp } from 'vue'
import App from './App.vue'
import { useElementPlus } from '@/plugins/element-plus';
import router from '@/router/index';
import '@/styles/index.scss'
// 引入svg注册脚本
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import store from '@/store';
// 目前版本不支持主题色修改，待element-plus迁移scss到css完成
// import '@/styles/element-variables.module.scss'
import '@/permission'
// import { usePermissionDirective } from '@/directive/permission/index'
import permission from '@/directive/permission/index'
import Pagination from '@/components/Pagination/index.vue';

// 创建应用实例
const app = createApp(App)
app.use(permission)
app.use(useElementPlus)
app.use(router)
app.use(store)
app.component('svg-icon', SvgIcon)
app.component('pagination', Pagination)

// 挂载
app.mount('#app')
