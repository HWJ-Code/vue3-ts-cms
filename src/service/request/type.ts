import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//拦截器类型 - 响应成功返回值T
export interface HhRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}
//自定义请求config 可以自定义添加参数
export interface HhRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HhRequestInterceptor<T>
  showLoading?: boolean
}
