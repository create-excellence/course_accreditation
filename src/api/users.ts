import request from '@/utils/request'
import * as m from '@/api/model'
export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const login = (data: m.LoginForm) =>
  request({
    url: '/system/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })
