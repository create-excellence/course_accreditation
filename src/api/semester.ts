import request from '@/utils/request'
import * as m from '@/api/model'

export const querySemester = (queryOptions:any) =>
  request({
    url: '/semester/list',
    params: queryOptions,
    method: 'GET'
  })

export const createSemester = (data:m.CreateSemesterForm) =>
  request({
    url: '/semester',
    method: 'POST',
    data
  })

export const deleteSemester = (id:number) =>
  request({
    url: '/semester' + '/' + id,
    method: 'DELETE'
  })

export const batchDeleteSemester = (ids:number[]) =>
  request({
    url: '/semester/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const putSemester = (id:number, data:m.CreateSemesterForm) =>
  request({
    url: '/semester' + '/' + id,
    method: 'PUT',
    data
  })
