//区分不同的环境--根据process.env.NODE_ENV区分
// 开发环境：development
// 生产环境：priduction
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 5000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://aaa.org/prod'
} else {
  BASE_URL = 'http://aaa.org/test'
}

export { BASE_URL, TIME_OUT }
