import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'

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

export default store
