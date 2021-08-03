import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 项目根目录
      '~': path.resolve(__dirname, './'),
      // 项目的src目录
      '@': path.resolve(__dirname, 'src')
    }
  }
})
