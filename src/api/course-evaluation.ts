import request from '@/utils/request'
import * as m from '@/api/model'

export const queryCourseEvaluation = (queryOptions:any) =>
  request({
    url: '/course-evaluation/list',
    params: queryOptions,
    method: 'GET'
  })

export const deleteEvaluation = (id:number) =>
  request({
    url: '/course-evaluation/' + id,
    method: 'DELETE'
  })

export const getMyCourseEvaluation = (queryOptions:any) =>
  request({
    url: '/course-evaluation/getMyCourseEvaluation',
    params: queryOptions,
    method: 'GET'
  })

export const createCourseEvaluation = (data:m.CreateCourseEvaluationForm) =>
  request({
    url: '/course-evaluation',
    method: 'POST',
    data
  })

export const getCourseEvaluationStudent = (queryOptions:any) =>
  request({
    url: '/course-evaluation/getCourseEvaluationStudent',
    params: queryOptions,
    method: 'GET'
  })

export const startEvaluation = (evaluationId:number) =>
  request({
    url: '/course-evaluation/startEvaluation?courseEvaluationId=' + evaluationId,
    method: 'GET'
  })

export const getQuestions = (evaluationId:number) =>
  request({
    url: '/course-evaluation/getQuestions?courseEvaluationId=' + evaluationId,
    method: 'GET'
  })

export const submit = (data:any) =>
  request({
    url: '/course-evaluation/submit',
    method: 'POST',
    data
  })
