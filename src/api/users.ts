import request from '@/utils/request'
import * as m from '@/api/model'
export const getUserInfo = () =>
  request({
    url: '/system/getUserInfo',
    method: 'get'
  })

export const login = (data: m.LoginForm) =>
  request({
    url: '/system/login',
    method: 'post',
    data
  })

export const changePassword = (data: m.ChangePasswordForm) =>
  request({
    url: '/system/changePassword',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const updateUserInfo = (data:m.CreateTeacherForm) =>
  request({
    url: '/system/updateUserInfo',
    method: 'put',
    data
  })
