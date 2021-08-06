import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default ({mode}) => {
  // 导入环境配置，获取环境变量值
  // import.meta.env.VITE_NAME 相当于这里的: env.VITE_NAME
  const env = { ...loadEnv(mode, process.cwd()) }
  const { VITE_APP_BASE_API, VITE_APP_DEV_PROXY_TARGET } = env

  return defineConfig({
    plugins: [
      vue(),
      styleImport({
        libs: [{
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3)
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }]
      })
    ],
    resolve: {
      alias: {
        // 项目根目录
        '~': path.resolve(__dirname, './'),
        // 项目的src目录
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        [`${VITE_APP_BASE_API}`]: {
          // 凡是遇到 /dev-api 路径的请求，都映射到 target 属性
          target: VITE_APP_DEV_PROXY_TARGET,
          changeOrigin: true,
          // 重写 /dev-api 为空, new RegExp(`^${prefix}`)
          rewrite: path => path.replace(new RegExp(`^${VITE_APP_BASE_API}`), '')
        }
      }
    }
  })
}
