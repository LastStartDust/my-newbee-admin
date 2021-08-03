// 导出环境变量对象
/**
 * @description 导出环境变量对象
 * @return {Object} 返回import.meta.env对象，对象内容有 
 * { 
 *   BASE_URL: "/", // 部署应用时的基本 URL。他由base 配置项决定
 *   MODE: "develop", // 当前运行的模式
 *   DEV: true, // 是否运行在开发环境
 *   PROD: false, // 是否运行在生产环境
 *   SSR: false // 是否运行在服务端渲染模式
 *  }
 */
export const env = import.meta.env