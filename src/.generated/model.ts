
export interface CommonResp {
  /**
   * 响应码
   *
   * @serverType integer
   */
  code: number;
  /**
   * 响应消息
   *
   * @serverType string
   */
  message: string;
}
/**
 * 登录表单
 */
export interface LoginForm {
  /**
   * 学号或工号
   */
  code: string;
  /**
   * 密码
   */
  password: string;
}
/**
 * 课程
 */
export interface Course {

  id: string;

  code: string;

  name: string;

  credit: number;

  nature: string;
}
/**
 * 课程
 */
export interface CourseForm {

  code: string;

  name: string;

  credit: number;

  nature: string;
}
/**
 * 课程Resp
 */
export interface CourseListResp {
  /**
   * 响应码
   *
   * @serverType integer
   */
  code: number;
  /**
   *
   *
   * @serverType array
   */
  data: Course[];
  /**
   * 响应消息
   *
   * @serverType string
   */
  message: string;
  /**
   * 当前页
   *
   * @serverType integer
   */
  page: number;
  /**
   * 每页记录数
   *
   * @serverType integer
   */
  pageSize: number;
  /**
   * 记录总数
   *
   * @serverType integer
   */
  total: number;
}

export interface CourseResp {
  /**
   * 响应码
   *
   * @serverType integer
   */
  code: number;
  /**
   *
   *
   * @serverType object
   */
  data: Course;
  /**
   * 响应消息
   *
   * @serverType string
   */
  message: string;
}

