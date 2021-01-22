import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

const instance = axios.create({
  //对所有的请求带上这个头，后台接口根据此值判定是否是一个Ajax请求
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  //指定超时，单位ms
  timeout: 2000
})

instance.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      console.debug('GET:' + config.url)
    }
    return config
  },
  error => {
    Message({
      message: '请求出错，请稍后重试！',
      type: 'error'
    })
    console.error('请求错误！' + error)
  }
)

instance.interceptors.response.use(
  resp => {
    console.log(resp)
    if (resp.data && resp.data.data) {
      if (resp.data.data.code === 500) {
        Message({
          message: '请求出错，请稍后重试！',
          type: 'error'
        })
      }
    }
    return resp
  },
  error => {
    if (error.response) {
      if (error.response.status === 403) {
        Message({
          message: '请先登录哦！',
          type: 'warning'
        })
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      } else {
        Message({
          message: '请求失败了，请稍后重试哦！',
          type: 'error'
        })
      }
    } else {
      Message({
        message: '请求失败了，请稍后重试哦！',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export default instance
