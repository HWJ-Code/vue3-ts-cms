import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '名字',
      placeholder: '请输入名字'
    },
    {
      type: 'input',
      field: 'username',
      label: '账号'
    },
    {
      type: 'password',
      field: 'password',
      label: '密码'
    },
    {
      type: 'input',
      field: 'name2',
      label: '名字2'
    },
    {
      type: 'select',
      field: 'select',
      label: '下拉选择',
      placeholder: '请选择下拉项',
      options: [
        { label: '下拉一', value: 1 },
        { label: '下拉二', value: 2 },
        { label: '下拉三', value: 3 },
        { label: '下拉四', value: 4 }
      ]
    },
    {
      type: 'datepicker',
      field: 'date',
      label: '日期',
      otherOptions: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        rangeSeparator: '至',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      type: 'datepicker',
      field: 'datetime',
      label: '日期时间',
      otherOptions: {
        rangeSeparator: '至',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'datetimerange',
        valueFormat: 'YYYY-MM-DD hh:mm:ss'
      }
    }
  ]
}
