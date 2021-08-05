import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({mode}) => {
  // 导入环境配置，获取环境变量值
  // import.meta.env.VITE_NAME 相当于这里的: env.VITE_NAME
  const env = { ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [vue()],
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
        '/dev-api': {
          // 凡是遇到 /dev-api 路径的请求，都映射到 target 属性
          target: env.VITE_APP_DEV_PROXY,
          changeOrigin: true,
          // 重写 /dev-api 为空
          rewrite: path => path.replace(/^\/dev-api/, '')
        }
      }
    }
  })
}
