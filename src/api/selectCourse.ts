import request from '@/utils/request'
import * as m from '@/api/model'

export const queryStudentSelectCourse = (queryOptions:any) =>
  request({
    url: '/select-course/list-student',
    params: queryOptions,
    method: 'GET'
  })

export const queryCourseByStudent = (queryOptions:any) =>
  request({
    url: '/select-course/select',
    params: queryOptions,
    method: 'GET'
  })

export const querySelectCourse = (queryOptions:any) =>
  request({
    url: '/select-course/list',
    params: queryOptions,
    method: 'GET'
  })

export const createSelectCourse = (data:m.CreateSelectCourseForm) =>
  request({
    url: '/select-course',
    method: 'POST',
    data
  })

export const deleteSelectCourse = (id:number) =>
  request({
    url: '/select-course' + '/' + id,
    method: 'DELETE'
  })

export const batchDeleteSelectCourse = (ids:number[]) =>
  request({
    url: '/select-course/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const putSelectCourse = (id:number, data:m.CreateSelectCourseForm) =>
  request({
    url: '/select-course' + '/' + id,
    method: 'PUT',
    data
  })
