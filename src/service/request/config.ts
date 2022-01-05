//区分不同的环境--根据process.env.NODE_ENV区分
// 开发环境：development
// 生产环境：priduction
// 测试环境：test

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://aaa.org/dev'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://aaa.org/prod'
} else {
  BASE_URL = 'http://aaa.org/test'
}

export { BASE_URL }
