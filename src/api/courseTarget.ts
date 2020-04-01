import request from '@/utils/request'
import * as m from '@/api/model'

export const queryCourseTarget = (queryOptions:any) =>
  request({
    url: '/course-target/list',
    params: queryOptions,
    method: 'GET'
  })

export const getCourseTarget = (id:number) =>
  request({
    url: '/course-target',
    params: { id: id },
    method: 'GET'
  })

export const createCourseTarget = (data:m.CreateCourseTargetForm) =>
  request({
    url: '/course-target',
    method: 'POST',
    data
  })

export const deleteCourseTarget = (id:number) =>
  request({
    url: '/course-target' + '/' + id,
    method: 'DELETE'
  })

export const batchDeleteCourseTarget = (ids:number[]) =>
  request({
    url: '/course-target/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const putCourseTarget = (id:number, data:m.CreateCourseTargetForm) =>
  request({
    url: '/course-target' + '/' + id,
    method: 'PUT',
    data
  })

export const getPoint = (questionnaireId:number) =>
  request({
    url: '/course-target/point',
    params: { questionnaireId: questionnaireId },
    method: 'GET'
  })
