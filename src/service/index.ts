// service的统一出口
import HWRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
console.log(BASE_URL)

const hwRequest = new HWRequest({
  // baseURL: BASE_URL,
  baseURL:
    'https://www.fastmock.site/mock/b7eabdc70b21d19726d2d7ee7f372da9/item',
  timeout: TIME_OUT,
  interceptors: {
    // 携带token的拦截
    requestInterceptor: (config) => {
      const token = ''
      if (token && config.headers) {
        config.headers.Authorization = `Bearer${token}`
      }
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default hwRequest
