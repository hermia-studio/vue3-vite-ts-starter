import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 引入axios实例
import hwRequest from './service'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//返回数据的类型
interface DateType {
  data: any
  code: number
  message: string
}
hwRequest
  .get<DateType>({
    url: '/ip',
    showLoading: false
  })
  .then((res) => {
    console.log(res)
    console.log(res.data)
  })
