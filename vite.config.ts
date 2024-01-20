import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env.VITE_APP_TITLE, env.VITE_APP_BASE_API, env.VITE_USER_NODE_ENV)
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        [env.VITE_BASE_API]: {
          target: 'http://xxx/', // 代理目标地址：环境变量
          changeOrigin: true, // 允许跨域
          ws: true, // 允许websocket代理
          // http://localhost/dev/users -> http://xxx/users
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_BASE_API), '')
        }
      }
    }
  }
})
