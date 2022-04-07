import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'assets/css/index.scss'
// import './service/axios_demo'
//注册element-icon/其他
import { globalRegister } from './global'
import { setupStore } from './store'
//全局引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

//局部引入element-plus
//但是会发现没有对应的样式 两种方法：1全局引入(如上) 2.局部引入(可配置webpack自动引入)
// import { ElButton } from 'element-plus/lib/components'
// app.component(ElButton.name, ElButton)

// import { BASE_URL } from './service/request/config'
// import hhRequest from './service'
const app = createApp(App)
app.use(store)

//注册其他
app.use(globalRegister)
// app.use(ElementPlus) -- 全局

//每次运行(页面刷新等)重新将localstorage中的数据保存到vuex中
setupStore()

//刷新not-found问题：先处理好store再添加路由
app.use(router)
app.mount('#app')

/*
 //根据不同生产环境读取不同配置文件
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

//单独请求的配置
hhRequest.request({
  url: '/home/multidata',
  method: 'GET',
  headers: {},
  // showLoading: false,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求成功拦截:', config)
      config.headers = { token: 'aaaa' }
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独请求响应成功拦截:', res)
      return res
    }
  }
})

//定义响应数据类型
interface responseDataType {
  data: any
  returnCode: string
  success: boolean
}
hhRequest
  .get<responseDataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log('==============数据响应成功===============')
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

*/
