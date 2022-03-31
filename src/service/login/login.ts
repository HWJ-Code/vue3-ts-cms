import hhRequest from '../index'
import { IAccountData, IResultType, ILoginResultData } from './types'

enum LoginAPI {
  Login = '/login',
  LoginUserInfo = '/users/', //获取某个用户信息(1为用户id) 用法: /users/1
  UserMenus = '/role/' //获取某个用户菜单(1为用户id) 用法: role/1/menu
}

//请求登录接口
export function accounLoginRequst(accountData: IAccountData) {
  return hhRequest.post<IResultType<ILoginResultData>>({
    url: LoginAPI.Login,
    data: accountData
  })
}

//获取用户信息
export function loginUserInfoRequest(id: number) {
  return hhRequest.get<IResultType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

//获取用户菜单
export function loginUserMenusRequest(id: number) {
  return hhRequest.get<IResultType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
