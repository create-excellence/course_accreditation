import * as m from "./model";
import { encodeQuery } from "@/utils/index";
import { request, ApiRequestOptions } from "@/api/request";

const defaultPageSize = 20;
const protocol = "http";
export const apiHost = "localhost:8888"
const basePath = "/v1";
export const baseUrl = `${protocol}://${apiHost}${basePath}`;

/**
 * 新建课程
 * @param courseId string string 校区id
 * @param body m.CourseForm  表单
 */
export function postCourse(options: {
  courseId: string;
  body: m.CourseForm;
}): Promise<m.CourseResp> {
  const url = `/course/${options.courseId}/Course`;
  const reqOptions: ApiRequestOptions = {
    url,
    method: "POST",
    reqName: "postCourse"
  };
  reqOptions.data = options.body;
  return request<m.CourseResp>(reqOptions);
}

/**
 * 删除课程
 * @param id string string 课程id
 */
export function deleteCourse(options: { id: string }): Promise<m.CommonResp> {
  const url = `/course/${options.id}`;
  const reqOptions: ApiRequestOptions = {
    url,
    method: "DELETE",
    reqName: "deleteCourse"
  };
  return request<m.CommonResp>(reqOptions);
}

/**
 * 更新课程
 * @param id string string 课程id
 * @param body m.CourseForm  表单
 */
export function putCourse(options: {
  id: string;
  body: m.CourseForm;
}): Promise<m.CourseResp> {
  const url = `/course/${options.id}`;
  const reqOptions: ApiRequestOptions = {
    url,
    method: "PUT",
    reqName: "putCourse"
  };
  reqOptions.data = options.body;
  return request<m.CourseResp>(reqOptions);
}

/**
 * 校区列表
 * @param name string string 校区名称
 * @param code string string 校区编号
 * @param page number integer 页码
 * @param pageSize number integer 每页记录数
 */
export function queryCourse(options: {
  name?: string;
  code?: string;
  page?: number;
  pageSize?: number;
}){
  options.pageSize = options.pageSize || defaultPageSize;
  const queryItems: any = {};
  if (options.name) {
    queryItems.name = options.name;
  }
  if (options.code) {
    queryItems.code = options.code;
  }
  if (options.page !== undefined) {
    queryItems.page = options.page;
  }
  if (options.pageSize !== undefined) {
    queryItems.pageSize = options.pageSize;
  }
  const query = encodeQuery(queryItems);
  const url = `/v1/course?${query}`;
  const reqOptions: ApiRequestOptions = {
    url,
    method: "GET",
    reqName: "queryCourse"
  };
  return request(reqOptions);
}