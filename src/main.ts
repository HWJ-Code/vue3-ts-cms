import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
//全局引入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'

//局部引入element-plus
//但是会发现没有对应的样式 两种方法：1全局引入(如上) 2.局部引入(配置webpack自动引入)
// import { ElButton } from 'element-plus/lib/components'
// app.component(ElButton.name, ElButton)

const app = createApp(App)
//注册element-plus/其他
app.use(globalRegister)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')
