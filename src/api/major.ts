import request from '@/utils/request'
import * as m from '@/api/model'

export const queryMajor = (queryOptions:any) =>
  request({
    url: '/major/list',
    params: queryOptions,
    method: 'GET'
  })

export const createMajor = (data:m.CreateMajorForm) =>
  request({
    url: '/major',
    method: 'POST',
    data
  })

export const deleteMajor = (id:number) =>
  request({
    url: '/major' + '/' + id,
    method: 'DELETE'
  })

export const putMajor = (id:number, data:m.CreateMajorForm) =>
  request({
    url: '/major' + '/' + id,
    method: 'PUT',
    data
  })
