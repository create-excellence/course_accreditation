import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import * as m from '@/api/model'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      // config.headers['X-Access-Token'] = UserModule.token
      config.headers['Authentication'] = UserModule.token
    }
    // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.code !== 0) {
      const res = response.data

      switch (res.code) {
        case 400:
          Message({
            message: res.code + ':' + res.message,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 401:
          UserModule.LogOut()
          break
        case 403:
          Message({
            message: `code=403: ${res.message}`,
            type: 'warning',
            duration: 5 * 1000
          })
          // MessageBox.alert(`code=403: ${res.message}`, '警告')
          break
        case 406:
          Message({
            message: `操作失败: ${res.message}`,
            type: 'error',
            duration: 5 * 1000
          })
          // MessageBox.alert(`操作失败: ${res.message}`, '错误')
          break
        case 409:
          Message({
            message: `冲突错误: ${res.message}`,
            type: 'warning',
            duration: 5 * 1000
          })
          // MessageBox.alert(`冲突错误: ${res.message}`, '警告')
          break
        case 417:
          MessageBox.alert(`操作失败: 违反SQL完整性约束`, '错误')
          break
        case 500:
          Message({
            message: `服务器错误: ${res.message}`,
            type: 'warning',
            duration: 5 * 1000
          })
          // MessageBox.alert(`服务器错误: ${res.message}`, '警告')
          break
        default:
          Message({
            message: `错误:code=${res.code},response=${res.message}`,
            type: 'error',
            duration: 5 * 1000
          })
          // MessageBox.alert(`错误:code=${res.code},response=${res.message}`, '错误')
      }
      return Promise.reject(new Error(res.message || 'Error'))

      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // if (
      //   res.code === 50008 ||
      //   res.code === 50012 ||
      //   res.code === 50014
      // ) {
      //   MessageBox.confirm(
      //     'You have been logged out, try to login again.',
      //     'Log out',
      //     {
      //       confirmButtonText: 'Relogin',
      //       cancelButtonText: 'Cancel',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     UserModule.ResetToken()
      //     location.reload() // To prevent bugs from vue-router
      //   })
      // }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
