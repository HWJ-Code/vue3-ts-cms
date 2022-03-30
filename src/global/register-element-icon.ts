import { App } from 'vue'

import { UserFilled, Iphone } from '@element-plus/icons-vue'

const components = [UserFilled, Iphone]

//自动全局注册icon
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
