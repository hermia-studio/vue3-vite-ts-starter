import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  console.log(env.VITE_APP_TITLE, env.VITE_BASE_URL,env.VITE_USER_NODE_ENV)
  return {
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      server:{
        proxy:{
          '/api':{
            target: env.VITE_BASE_URL, // 代理目标地址：环境变量
            changeOrigin: true, // 允许跨域
            ws: true, // 允许websocket代理
            rewrite: (path) => path.replace('/api/', '')
          }
      }
    }
}
})
