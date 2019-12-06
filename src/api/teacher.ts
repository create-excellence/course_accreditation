import request from '@/utils/request'
import * as m from '@/api/model'

export const queryTeacher = (queryOptions:any) =>
  request({
    url: '/teacher/list',
    params: queryOptions,
    method: 'GET'
  })

export const createTeacher = (data:m.CreateTeacherForm) =>
  request({
    url: '/teacher',
    method: 'POST',
    data
  })

export const deleteTeacher = (id:number) =>
  request({
    url: '/teacher' + '/' + id,
    method: 'DELETE'
  })

export const putTeacher = (id:number, data:m.CreateTeacherForm) =>
  request({
    url: '/teacher' + '/' + id,
    method: 'PUT',
    data
  })
