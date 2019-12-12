import request from '@/utils/request'
import * as m from '@/api/model'

export const queryGraduationDemand = (queryOptions:any) =>
  request({
    url: '/graduation-demand/list',
    params: queryOptions,
    method: 'GET'
  })

export const createGraduationDemand = (data:m.CreateGraduationDemandForm) =>
  request({
    url: '/graduation-demand',
    method: 'POST',
    data
  })

export const deleteGraduationDemand = (id:number) =>
  request({
    url: '/graduation-demand' + '/' + id,
    method: 'DELETE'
  })

export const batchDeleteGraduationDemand = (ids:number[]) =>
  request({
    url: '/graduation-demand/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const putGraduationDemand = (id:number, data:m.CreateGraduationDemandForm) =>
  request({
    url: '/graduation-demand' + '/' + id,
    method: 'PUT',
    data
  })
