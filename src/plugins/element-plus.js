import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElTag,
  ElDialog,
  ElAside,
  ElHeader,
  ElMain,
  ElFooter,
  ElContainer,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElScrollbar,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElAlert
} from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'

// 组件列表
const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElTag,
  ElDialog,
  ElAside,
  ElHeader,
  ElMain,
  ElFooter,
  ElContainer,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElScrollbar,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElAlert
]

// 插件列表
const plugins = [ElLoading, ElMessage, ElMessageBox]

// 设置语言为中文
import { locale } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
// 设置 Day.js 国际化
import 'dayjs/locale/zh-cn'
// https://github.com/anncwb/vite-plugin-style-import/issues/16
// 解决elementplus locale在不同模式下导出不同
if (typeof locale === 'function') {
  // 开发环境
  locale(lang)
} else {
  // 生产环境
  locale.use(lang)
}

// 暴露出useElementPlus方法，给vue实例调用
export function useElementPlus(app) {
  components.forEach((component) => {
    app.component(component.name, component)
  })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
