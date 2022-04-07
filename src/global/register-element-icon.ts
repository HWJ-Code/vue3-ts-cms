import { App } from 'vue'

import {
  UserFilled,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const components = [
  UserFilled,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand
]

//自动全局注册icon
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
