import request from '@/utils/request'
import * as m from '@/api/model'

export const queryStudent = (queryOptions:any) =>
  request({
    url: '/student/list',
    params: queryOptions,
    method: 'GET'
  })

export const createStudent = (data:m.CreateStudentForm) =>
  request({
    url: '/student',
    method: 'POST',
    data
  })

export const deleteStudent = (id:number) =>
  request({
    url: '/student' + '/' + id,
    method: 'DELETE'
  })

export const batchDeleteStudent = (ids:number[]) =>
  request({
    url: '/student/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const putStudent = (id:number, data:m.CreateStudentForm) =>
  request({
    url: '/student' + '/' + id,
    method: 'PUT',
    data
  })
