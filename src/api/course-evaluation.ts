import request from '@/utils/request'
import * as m from '@/api/model'

export const queryCourseEvaluation = (queryOptions:any) =>
  request({
    url: '/course-evaluation/list',
    params: queryOptions,
    method: 'GET'
  })

export const createCourseEvaluation = (data:m.CreateCourseEvaluationForm) =>
  request({
    url: '/course-evaluation',
    method: 'POST',
    data
  })
