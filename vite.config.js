import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
import { svgBuilder } from './src/plugins/svg-builder'
import { viteMockServe } from 'vite-plugin-mock'
import settings from './src/settings'

// https://vitejs.dev/config/
export default ({mode}) => {
  // 导入环境配置，获取环境变量值
  // import.meta.env.VITE_NAME 相当于这里的: env.VITE_NAME
  const env = { ...loadEnv(mode, process.cwd()) }
  const { VITE_APP_BASE_API, VITE_APP_DEV_PROXY_TARGET, VITE_DEV_PORT } = env

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
      }),
      svgBuilder('./src/icons/svg/'),
      viteMockServe({
        mockPath: 'mock/api',
        // close support .ts file
        supportTs: false,
        // default
        // 是否启用本地mock
        localEnabled: settings.isUseMock,
        // 生产环境是否启用mock
        prodEnabled: settings.isUseMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
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
      port: VITE_DEV_PORT,
      proxy: {
        [`${VITE_APP_BASE_API}`]: {
          // 凡是遇到 /dev-api 路径的请求，都映射到 target 属性
          // target: VITE_APP_DEV_PROXY_TARGET,
          target: 
            settings.isUseMock
              ? `http://localhost:${VITE_DEV_PORT}` // 开发目标服务器
              : VITE_APP_DEV_PROXY_TARGET,
          changeOrigin: true,
          // 重写 /dev-api 为空, new RegExp(`^${prefix}`)
          rewrite: path => path.replace(new RegExp(`^${VITE_APP_BASE_API}`), '')
        }
      }
    }
  })
}
