export interface IAccountData {
  //登录接口参数
  name: string
  password: string
}

//登录返回数据类型
export interface IResultType<T = any> {
  code: number
  data: T
}

//登录返回数据的data的类型
export interface ILoginResultData {
  id: number
  name: string
  token: string
}
