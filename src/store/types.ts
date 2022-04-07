import { ILoginState } from './login/types'

//根state的类型
export interface IRootState {
  name: string
  height: number
}

//这里是自定义module的state类型
export interface IStateWithModule {
  login: ILoginState
}
//useVuexStore返回的state的类型
export type IStateType = IRootState & IStateWithModule
