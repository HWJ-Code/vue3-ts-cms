//axios封装
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HhRequestInterceptor, HhRequestConfig } from './type'
// 以服务的方式调用ElLoading，样式没有自动导入 需要手动去导入
// 自动导入解决方法：可以用unplugin-element-plus插件 vue.config.js配置ElementPlus()
import { ElLoading, ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-loading.css' //手动导入样式

// 导入ElLoading.service返回的实例类型
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true //如果不传showloading的值，默认showLoading=true
class HhRequest {
  instance: AxiosInstance //axios实例,每次都创建一个新的实例
  interceptors?: HhRequestInterceptor //拦截器
  showLoading?: boolean //是否显示loading
  loadingInstance?: LoadingInstance //保存loading实例
  //config--axios配置项
  constructor(config: HhRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有实例的请求拦截（需要返回） 比如添加请求loading
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例的请求拦截成功', config)
        // console.log('所有实例的请求添加loading', this.showLoading)
        //如果showLoading=true 添加loading
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '正在请求数据...'
            // background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config //拦截之后需要返回
      },
      (err) => {
        console.log('所有实例的请求拦截失败', err)
        return err
      }
    )
    //添加所有实例的响应拦截（需要返回）
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例的响应拦截成功', res)
        //关闭loading(settimeout查看效果)
        this.loadingInstance?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          //服务器定义的成功失败状态码
          console.log('请求失败~, 错误信息')
        } else {
          return data //拦截之后需要返回响应内容
        }
      },
      (err) => {
        console.log('所有实例的响应拦截失败', err.response)
        //关闭loading
        this.loadingInstance?.close()

        //判断不同的HttpErrorCode显示不同的错误信息 如：
        if (err.response.status === 404) {
          console.log('404的错误~')
        } else if (err.response.status == 400) {
          if (err.response.data) {
            ElMessage({
              message: err.response.data,
              type: 'error'
            })
          }
        }
        return err
      }
    )
  }
  request<T>(config: HhRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求对请求config的处理
      // console.log('单个请求添加loading', this.showLoading)
      config.headers = config.headers ? config.headers : {}
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          console.log('请求失败', err)
          reject(err)
          return err
        })
    })
  }
  get<T>(config: HhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HhRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HhRequest
