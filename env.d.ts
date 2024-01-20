/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string

  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string

  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 解决找不到模块“./App.vue”或其相应的类型声明
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
