import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HWRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface HWRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HWRequestInterceptors<T>
  showLoading?: boolean
}
