import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 默认配置
const defaultConfig = {
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
}

export const useNProgress = (config = {}) => {
  const _config = Object.assign(defaultConfig, config)
  return NProgress.configure(_config)
}
