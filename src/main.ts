import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
// import { globalRegister } from './global'
//全局引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

//局部引入element-plus
//但是会发现没有对应的样式 两种方法：1全局引入(如上) 2.局部引入(可配置webpack自动引入)
// import { ElButton } from 'element-plus/lib/components'
// app.component(ElButton.name, ElButton)

// import { BASE_URL } from './service/request/config'
const app = createApp(App)
app.use(router)
app.use(store)

//注册其他
// app.use(globalRegister)
// app.use(ElementPlus) -- 全局

app.mount('#app')

//根据不同生产环境读取不同配置文件
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)
