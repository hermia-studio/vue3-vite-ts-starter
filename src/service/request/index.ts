// 创建axiso实例写入请求拦截响应拦截
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HWRequestInterceptors, HWRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

const DEFAULT_LOADING = true
class HWRequest {
  instance: AxiosInstance
  interceptors?: HWRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance //保存LoadingService返回的 Loading 实例

  constructor(config: HWRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 从config中取出来的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 添加每个实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('每个实例都有的拦截器，请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('每个实例都有的拦截器,响应成功拦截')
        // 将loading 移除
        this.loading?.close()
        const data = res.data
        // 根据业务状态码 显示不同的错误信息
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('每个实例都有的拦截器，响应失败拦截')
        // 将loading 移除
        this.loading?.close()
        // 根据不同的http响应状态码显示不同的错误信息
        switch (err.response.status) {
          case 400:
            err.message = '错误请求'
            break
          case 401:
            err.message = '未授权，请重新登录'
            //  返回登录页
            break
          case 403:
            err.message = '拒绝访问'
            break
          case 404:
            err.message = '请求错误,未找到该资源'
            // window.location.href = "/NotFound"
            break
          case 405:
            err.message = '请求方法未允许'
            break
          case 408:
            err.message = '请求超时'
            break
          case 500:
            err.message = '服务器端出错'
            break
          case 501:
            err.message = '网络未实现'
            break
          case 502:
            err.message = '网络错误'
            break
          case 503:
            err.message = '服务不可用'
            break
          case 504:
            err.message = '网络超时'
            break
          case 505:
            err.message = 'http版本不支持该请求'
            break
          default:
            err.message = `连接错误${err.response.status}`
        }
        return err
      }
    )
  }

  // request函数
  request<T>(config: HWRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求进行拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示loading , 这个值为false 的时候在执行这里面的函数,
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对单个请求进行拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          //每次请求完成之后设置回初始值,这样就不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          //每次请求完成之后设置回初始值,这样就不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: HWRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HWRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HWRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HWRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HWRequest
