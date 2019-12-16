/* eslint-disable no-async-promise-executor */
import { UserModule } from '@/store/modules/user'
import axios, { AxiosRequestConfig } from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'

interface ApiRequestOptions extends AxiosRequestConfig {
  reqName?: string;
  // headers?: { [key: string]: any };
  // data?: any;
}

const defaultAxiosOptions: AxiosRequestConfig = {
  timeout: 20000, // ms
  withCredentials: false,
  headers: {
    'Authentication': 'Admin'
  }
}

const apiAxios = axios.create(defaultAxiosOptions)
apiAxios.interceptors.request.use(
  config => {
    if (UserModule.token) {
      config.headers.Authorization = UserModule.token
    }
    return config
  },
  error => {
    // Handle request error here
    // Promise.reject(error);
    console.log('apiRequest error: ', error)
  }
)

// respone 拦截器
apiAxios.interceptors.response.use(
  response => {
    const { data } = response
    const msg = `code=${data.code}, ${data.message}`
    if (data.code === 401) {
      UserModule.LogOut()
    }
    if (data.code !== 0) {
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      throw new Error(msg)
    }

    return response
  },
  error => {
    if (error.response) {
      console.log('API ERROR error.response:', error.response)
      switch (error.response.code) {
        case 400:
          Message({
            message: error.response.data.code + ':' + error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 401:
          UserModule.LogOut()
          break
        case 403:
          MessageBox.alert(`code=403: ${error.response.data.message}`, '警告')
          break
        case 500:
          MessageBox.alert(`服务器错误: ${error.response.data.message}`, '警告')
          break
        default:
          MessageBox.alert(`错误:code=${error.response.code},response=${error.response.data.message}`, '错误')
      }
    } else {
      console.log('API ERROR:', error)
      MessageBox.alert(`错误:response=${error}`, '错误')
    }
    return Promise.reject(error)
  }
)

async function request<R>(opts: AxiosRequestConfig): Promise<R> {
  const options = Object.assign(defaultAxiosOptions, opts)
  const promise = new Promise(async(resolve, reject) => {
    try {
      const res = await apiAxios(options)
      resolve(res.data as R)
    } catch (error) {
      reject(error)
    }
  })
  return promise as Promise<R>
}
export default request
export { request, ApiRequestOptions }
