//service统一出口
import { BASE_URL, TIME_OUT } from './request/config'
import HhRequest from './request'

//创建请求实例
const hhRequest = new HhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功拦截:', config)
      return config
    },
    responseInterceptor: (res) => {
      console.log('响应成功拦截:', res)
      return res
    }
  }
})

//可以创建多个实例且互不干扰 可以有自己的base_url等配置
// const hhRequest2 = new HhRequest({ })

export default hhRequest
