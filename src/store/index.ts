import { createStore, useStore as useVuexStore, Store } from 'vuex'
import login from './login/login'

import { IRootState, IStateType } from './types'

//createStore需要设置state的类型 可以自定义
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'hh',
      height: 165
    }
  },
  actions: {},
  getters: {},
  mutations: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
/* 别的地方要使用vuex，调用useStore的时候,没法判断store里面state有哪些具体的数据，使用store.state再后面就不会提示了，容易写错
  这里可以将vuex中定义的根state类型和其他自定义模块的state类型交叉，自定义一个useVuexStore，以后使用useStore的时候其实用的都是自定义的useVuexStore
  import { useStore } from '@/store'
*/

export function useStore(): Store<IStateType> {
  return useVuexStore()
}

export default store
