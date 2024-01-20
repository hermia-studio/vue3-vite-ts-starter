import type { AxiosRequestConfig } from 'axios'

export interface HWRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface HWRequestConfig extends AxiosRequestConfig {
  interceptors?: HWRequestInterceptors
  showLoading?: boolean
}
