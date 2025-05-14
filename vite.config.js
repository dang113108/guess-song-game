import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/guess-song-game/', // 如果是 GitHub Pages，請替換成你的 repo 名稱
  build: {
    outDir: 'dist',  // 輸出的資料夾
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 這裡設定 @ 代表 src 目錄
    }
  }
})
