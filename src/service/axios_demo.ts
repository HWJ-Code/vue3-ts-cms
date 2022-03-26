import axios from 'axios'
// import { BASE_URL } from './request/config'
//axios的实例对象
//模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log('基本使用', res)
})

//axios配置项
//1、全局axios默认值
// axios.defaults.baseURL = BASE_URL
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.headers.common['Authorization'] = 'token'
axios.defaults.timeout = 50000

//2、每一个请求单独的配置
axios
  .get('/get', {
    params: { name: 'aa' },
    timeout: 20000
  })
  .then((res) => {
    console.log('get请求', res)
  })

// 3.post请求
axios
  .post('/post', {
    data: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log('post请求', res.data)
  })

// Promise本身是可以有类型
new Promise<string>((resolve) => {
  resolve('abc')
}).then((res) => {
  console.log(res.length)
})

// 5.axios.all -> 多个请求, 一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'aa', age: 18 } }),
    axios.post('/post', { data: { name: 'aa', age: 18 } })
  ])
  .then((res) => {
    console.log('测试all', res[0].data)
    console.log('测试all', res[1].data)
  })

//6、axios拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    console.log('请求发送成功拦截：', config)
    return config
  },
  (err) => {
    console.log('请求发送失败拦截：', err)
    return err
  }
)

// fn1: 数据响应成功(服务器正常的返回了数据 20x)
// fn2: 数据响应失败会执行的函数
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
axios
  .get('/home/multidata', {
    baseURL: 'http://123.207.32.32:8000',
    params: { name: 'aa' },
    timeout: 20000
  })
  .then((res) => {
    console.log('测试拦截', res)
  })
