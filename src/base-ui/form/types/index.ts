type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  type: IFormType //表单组件类型
  placeholder?: string
  field: string //v-model绑定字段
  label: string //标签显示名
  options?: any[] //select下拉项,
  otherOptions?: any //组件的其他props（根据对应组件传） datepicker类型、 开始时间描述等
}

export interface IForm {
  formItems: IFormItem[]
  itemStyle?: any //单独样式
  labelWidth?: string //标签宽度
  formLayout?: any
}
