import { Module } from 'vuex'

import {
  accounLoginRequst,
  loginUserInfoRequest,
  loginUserMenusRequest
} from '@/service/login/login'
import localCache from '@/utils/cache'

import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'

import { IRootState } from '../types'
import { ILoginState } from './types'
import { IAccountData } from '@/service/login/types'

//Module需要两个类型<S,R>：S--当前模块中state的类型，R--根state的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true, //设置命名空间，使用时可以例如 login/accountLoginAction
  state: {
    token: '',
    userInfo: {}, //登录返回用户信息
    userMenus: [] //菜单
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus

      //注册动态路由(main->children)
      // console.log('注册动态路由~')
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    //实现登录逻辑
    async accountLoginAction({ commit }, payload: IAccountData) {
      //1.请求登录接口
      const loginResult = await accounLoginRequst(payload)
      if (!loginResult.data) return
      const { id, token } = loginResult.data
      //提交mutation修改state
      commit('changeToken', token)
      localCache.setCache('token', token)

      //2.获取用户信息
      const userInfoResult = await loginUserInfoRequest(id)
      commit('changeUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)

      //3.获取用户菜单
      const userMenusResult = await loginUserMenusRequest(id)
      commit('changeUserMenus', userMenusResult.data)
      localCache.setCache('userMenus', userMenusResult.data)

      //4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      //重新将localstorage中的数据放进vuex中
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
