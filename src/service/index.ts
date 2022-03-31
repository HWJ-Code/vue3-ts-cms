//service统一出口
import { BASE_URL, TIME_OUT } from './request/config'
import HhRequest from './request'

import localCache from '@/utils/cache'
//创建请求实例
const hhRequest = new HhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('请求成功拦截:', config)
      config.headers = {}
      //携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    responseInterceptor: (res) => {
      // console.log('响应成功拦截:', res)
      return res
    }
  }
})

export default hhRequest
