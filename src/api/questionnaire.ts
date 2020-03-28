import request from '@/utils/request'
import * as m from '@/api/model'

export const queryQuestionnaire = (queryOptions:any) =>
  request({
    url: '/questionnaire/list',
    params: queryOptions,
    method: 'GET'
  })

export const getQuestionnaire = (id:number) =>
  request({
    url: '/questionnaire',
    params: { id: id },
    method: 'GET'
  })

export const getMyQuestionnaire = (queryOptions:any) =>
  request({
    url: '/questionnaire/getMyQuestionnaire',
    params: queryOptions,
    method: 'GET'
  })

export const createQuestionnaire = (data:m.CreateQuestionnaireForm) =>
  request({
    url: '/questionnaire',
    method: 'POST',
    data
  })

export const deleteQuestionnaire = (id:number) =>
  request({
    url: '/questionnaire' + '/' + id,
    method: 'DELETE'
  })

export const batchDeleteQuestionnaire = (ids:number[]) =>
  request({
    url: '/questionnaire/deleteByIds',
    data: ids,
    method: 'DELETE'
  })

export const putQuestionnaire = (id:number, data:m.CreateQuestionnaireForm) =>
  request({
    url: '/questionnaire' + '/' + id,
    method: 'PUT',
    data
  })
