import request from '@/utils/request'
import * as m from '@/api/model'

export const queryGraduationPoint = (queryOptions:any) =>
  request({
    url: '/graduation-point/list',
    params: queryOptions,
    method: 'GET'
  })

export const getGraduationPoint = (id:number) =>
  request({
    url: '/graduation-point',
    params: { id: id },
    method: 'GET'
  })

export const createGraduationPoint = (data:m.CreateGraduationPointForm) =>
  request({
    url: '/graduation-point',
    method: 'POST',
    data
  })

export const batchDeleteGraduationPoint = (ids:number[]) =>
  request({
    url: '/graduation-point/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const deleteGraduationPoint = (id:number) =>
  request({
    url: '/graduation-point' + '/' + id,
    method: 'DELETE'
  })

export const putGraduationPoint = (id:number, data:m.CreateGraduationPointForm) =>
  request({
    url: '/graduation-point' + '/' + id,
    method: 'PUT',
    data
  })
