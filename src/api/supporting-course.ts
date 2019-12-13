import request from '@/utils/request'
import * as m from '@/api/model'

export const querySupportingCourse = (queryOptions:any) =>
  request({
    url: '/supporting-course/list',
    params: queryOptions,
    method: 'GET'
  })

export const createSupportingCourse = (data:m.CreateSupportingCourseForm) =>
  request({
    url: '/supporting-course',
    method: 'POST',
    data
  })

export const batchDeleteSupportingCourse = (ids:number[]) =>
  request({
    url: '/supporting-course/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const deleteSupportingCourse = (id:number) =>
  request({
    url: '/supporting-course' + '/' + id,
    method: 'DELETE'
  })

export const putSupportingCourse = (id:number, data:m.CreateSupportingCourseForm) =>
  request({
    url: '/supporting-course' + '/' + id,
    method: 'PUT',
    data
  })
