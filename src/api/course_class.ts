import request from '@/utils/request'
import * as m from '@/api/model'

export const queryCourseClass = (queryOptions:any) =>
  request({
    url: '/course-class/list',
    params: queryOptions,
    method: 'GET'
  })

export const createCourseClass = (data:m.CreateCourseClassForm) =>
  request({
    url: '/course-class',
    method: 'POST',
    data
  })

export const batchDeleteCourseClass = (ids:number[]) =>
  request({
    url: '/course-class/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const deleteCourseClass = (id:number) =>
  request({
    url: '/course-class' + '/' + id,
    method: 'DELETE'
  })

export const putCourseClass = (id:number, data:m.CreateCourseClassForm) =>
  request({
    url: '/course-class' + '/' + id,
    method: 'PUT',
    data
  })
