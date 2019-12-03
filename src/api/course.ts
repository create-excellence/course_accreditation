import request from '@/utils/request'
import * as m from '@/api/model'

export const getCourseList = (queryOptions:any) =>
  request({
    url: '/course/list',
    params: queryOptions,
    method: 'GET'
  })

export const createCourse = (data:m.CreateCourseForm) =>
  request({
    url: '/course',
    method: 'POST',
    data
  })

export const deleteCourse = (id:number) =>
  request({
    url: '/course' + '/' + id,
    method: 'DELETE'
  })

export const putCourse = (id:number, data:m.CreateCourseForm) =>
  request({
    url: '/course' + '/' + id,
    method: 'PUT',
    data
  })
