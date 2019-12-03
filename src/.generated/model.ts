
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
 * 
 * @export
 * @interface Course
 */
export interface Course {
  /**
   * 课程代码
   * @type {string}
   * @memberof Course
   */
  code: string;
  /**
   * 创建时间
   * @type {Date}
   * @memberof Course
   */
  createTime?: Date;
  /**
   * 课程对应学分
   * @type {number}
   * @memberof Course
   */
  credit: number;
  /**
   * id
   * @type {number}
   * @memberof Course
   */
  id : number;
  /**
   * 课程名称
   * @type {string}
   * @memberof Course
   */
  name : string;
  /**
   * 课程性质
   * @type {string}
   * @memberof Course
   */
  nature: string;
  /**
   * 更新时间
   * @type {Date}
   * @memberof Course
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface CourseClass
*/
export interface CourseClass {
  /**
   * 课程Id
   * @type {number}
   * @memberof CourseClass
   */
  courseId?: number;
  /**
   * 创建时间
   * @type {Date}
   * @memberof CourseClass
   */
  createTime?: Date;
  /**
   * 结课时间
   * @type {number}
   * @memberof CourseClass
   */
  endWeek?: number;
  /**
   * id
   * @type {number}
   * @memberof CourseClass
   */
  id?: number;
  /**
   * 课程序号
   * @type {string}
   * @memberof CourseClass
   */
  no?: string;
  /**
   * 学期Id
   * @type {number}
   * @memberof CourseClass
   */
  semesterId?: number;
  /**
   * 开课时间
   * @type {number}
   * @memberof CourseClass
   */
  startWeek?: number;
  /**
   * 状态码 0-开课 1-未开课
   * @type {number}
   * @memberof CourseClass
   */
  status?: number;
  /**
   * 执教老师Id
   * @type {number}
   * @memberof CourseClass
   */
  teacherId?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof CourseClass
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface CourseTarget
*/
export interface CourseTarget {
  /**
   * 创建时间
   * @type {Date}
   * @memberof CourseTarget
   */
  createTime?: Date;
  /**
   * 描述
   * @type {string}
   * @memberof CourseTarget
   */
  describes?: string;
  /**
   * id
   * @type {number}
   * @memberof CourseTarget
   */
  id?: number;
  /**
   * 选项
   * @type {string}
   * @memberof CourseTarget
   */
  options?: string;
  /**
   * 选项得分
   * @type {string}
   * @memberof CourseTarget
   */
  optionsScore?: string;
  /**
   * 指标点Id
   * @type {number}
   * @memberof CourseTarget
   */
  pointId?: number;
  /**
   * 对应的问卷Id
   * @type {number}
   * @memberof CourseTarget
   */
  questionnaireId?: number;
  /**
   * 序号
   * @type {number}
   * @memberof CourseTarget
   */
  sequence?: number;
  /**
   * 题目
   * @type {string}
   * @memberof CourseTarget
   */
  title?: string;
  /**
   * 总分
   * @type {number}
   * @memberof CourseTarget
   */
  totalScore?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof CourseTarget
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface GraduationPoint
*/
export interface GraduationPoint {
  /**
   * 指标点编号
   * @type {string}
   * @memberof GraduationPoint
   */
  content?: string;
  /**
   * 创建时间
   * @type {Date}
   * @memberof GraduationPoint
   */
  createTime?: Date;
  /**
   * 毕业要求Id
   * @type {number}
   * @memberof GraduationPoint
   */
  graduationDemandId?: number;
  /**
   * id
   * @type {number}
   * @memberof GraduationPoint
   */
  id?: number;
  /**
   * 指标点编号
   * @type {string}
   * @memberof GraduationPoint
   */
  no?: string;
  /**
   * 更新时间
   * @type {Date}
   * @memberof GraduationPoint
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface LoginForm
*/
export interface LoginForm {
  /**
   * 工号/学号
   * @type {string}
   * @memberof LoginForm
   */
  code?: string;
  /**
   * 密码
   * @type {string}
   * @memberof LoginForm
   */
  password?: string;
}

/**
* 
* @export
* @interface Major
*/
export interface Major {
  /**
   * 专业代码
   * @type {string}
   * @memberof Major
   */
  code?: string;
  /**
   * 创建时间
   * @type {Date}
   * @memberof Major
   */
  createTime?: Date;
  /**
   * id
   * @type {number}
   * @memberof Major
   */
  id?: number;
  /**
   * 专业名称
   * @type {string}
   * @memberof Major
   */
  name?: string;
  /**
   * 更新时间
   * @type {Date}
   * @memberof Major
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface Questionnaire
*/
export interface Questionnaire {
  /**
   * 问卷对应班级
   * @type {number}
   * @memberof Questionnaire
   */
  courseClassId?: number;
  /**
   * 创建时间
   * @type {Date}
   * @memberof Questionnaire
   */
  createTime?: Date;
  /**
   * 问卷描述
   * @type {string}
   * @memberof Questionnaire
   */
  describes?: string;
  /**
   * id
   * @type {number}
   * @memberof Questionnaire
   */
  id?: number;
  /**
   * 问卷名称
   * @type {string}
   * @memberof Questionnaire
   */
  name?: string;
  /**
   * 问卷总分
   * @type {number}
   * @memberof Questionnaire
   */
  totalScore?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof Questionnaire
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface SelectCourse
*/
export interface SelectCourse {
  /**
   * 课程班级Id
   * @type {number}
   * @memberof SelectCourse
   */
  courseClassId?: number;
  /**
   * 创建时间
   * @type {Date}
   * @memberof SelectCourse
   */
  createTime?: Date;
  /**
   * id
   * @type {number}
   * @memberof SelectCourse
   */
  id?: number;
  /**
   * 学生Id
   * @type {number}
   * @memberof SelectCourse
   */
  studentId?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof SelectCourse
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface SelfEvaluation
*/
export interface SelfEvaluation {
  /**
   * 评价档次
   * @type {string}
   * @memberof SelfEvaluation
   */
  answer?: string;
  /**
   * 专业名称
   * @type {number}
   * @memberof SelfEvaluation
   */
  courseTargetId?: number;
  /**
   * 创建时间
   * @type {Date}
   * @memberof SelfEvaluation
   */
  createTime?: Date;
  /**
   * id
   * @type {number}
   * @memberof SelfEvaluation
   */
  id?: number;
  /**
   * 得分
   * @type {number}
   * @memberof SelfEvaluation
   */
  score?: number;
  /**
   * 学生Id
   * @type {number}
   * @memberof SelfEvaluation
   */
  studentId?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof SelfEvaluation
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface Semester
*/
export interface Semester {
  /**
   * 创建时间
   * @type {Date}
   * @memberof Semester
   */
  createTime?: Date;
  /**
   * id
   * @type {number}
   * @memberof Semester
   */
  id?: number;
  /**
   * 学期名称
   * @type {string}
   * @memberof Semester
   */
  name?: string;
  /**
   * 学期开始时间
   * @type {string}
   * @memberof Semester
   */
  startTime?: string;
  /**
   * 更新时间
   * @type {Date}
   * @memberof Semester
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface ServerResponse
*/
export interface ServerResponse {
  /**
   * 
   * @type {any}
   * @memberof ServerResponse
   */
  data: any;
  /**
   * 
   * @type {string}
   * @memberof ServerResponse
   */
  msg: string;
  /**
   * 
   * @type {number}
   * @memberof ServerResponse
   */
  status: number;
  /**
   * 
   * @type {boolean}
   * @memberof ServerResponse
   */
  success: boolean;
}

/**
* 
* @export
* @interface Student
*/
export interface Student {
  /**
   * 创建时间
   * @type {Date}
   * @memberof Student
   */
  createTime?: Date;
  /**
   * 年级
   * @type {string}
   * @memberof Student
   */
  grade?: string;
  /**
   * id
   * @type {number}
   * @memberof Student
   */
  id?: number;
   /**
   * 头像
   * @type {string}
   * @memberof Student
   */
  avatar?: string;
  /**
   * 上此登录数据
   * @type {Date}
   * @memberof Student
   */
  loginTime?: Date;
  /**
   * 专业Id
   * @type {number}
   * @memberof Student
   */
  majorId?: number;
  /**
   * 姓名
   * @type {string}
   * @memberof Student
   */
  name?: string;
  /**
   * 密码
   * @type {string}
   * @memberof Student
   */
  password?: string;
  /**
   * 性别
   * @type {string}
   * @memberof Student
   */
  sex?: string;
  /**
   * 学号
   * @type {string}
   * @memberof Student
   */
  sno?: string;
  /**
   * 状态 正常-0
   * @type {number}
   * @memberof Student
   */
  status?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof Student
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface SupportingCourse
*/
export interface SupportingCourse {
  /**
   * 课程Id
   * @type {number}
   * @memberof SupportingCourse
   */
  courseId?: number;
  /**
   * 创建时间
   * @type {Date}
   * @memberof SupportingCourse
   */
  createTime?: Date;
  /**
   * 毕业要求指标点
   * @type {number}
   * @memberof SupportingCourse
   */
  graduationPointId?: number;
  /**
   * id
   * @type {number}
   * @memberof SupportingCourse
   */
  id?: number;
  /**
   * 更新时间
   * @type {Date}
   * @memberof SupportingCourse
   */
  updateTime?: Date;
}

/**
* 
* @export
* @interface Teacher
*/
export interface Teacher {
  /**
   * 出生日期
   * @type {string}
   * @memberof Teacher
   */
  birth?: string;
  /**
   * 创建时间
   * @type {Date}
   * @memberof Teacher
   */
  createTime?: Date;
  /**
   * 毕业转移
   * @type {string}
   * @memberof Teacher
   */
  graduateMajor?: string;
  /**
   * 毕业学校
   * @type {string}
   * @memberof Teacher
   */
  graduateSchool?: string;
  /**
   * id
   * @type {number}
   * @memberof Teacher
   */
  id?: number;
  /**
   * 工号
   * @type {string}
   * @memberof Teacher
   */
  jno?: string;

   /**
   * 头像
   * @type {string}
   * @memberof Teacher
   */
  avatar?: string;
  /**
   * 上传登录时间
   * @type {Date}
   * @memberof Teacher
   */
  loginTime?: Date;
  /**
   * 姓名
   * @type {string}
   * @memberof Teacher
   */
  name?: string;
  /**
   * 密码
   * @type {string}
   * @memberof Teacher
   */
  password?: string;
  /**
   * 角色
   * @type {string}
   * @memberof Teacher
   */
  role?: string;
  /**
   * 性别
   * @type {string}
   * @memberof Teacher
   */
  sex?: string;
  /**
   * 职称
   * @type {string}
   * @memberof Teacher
   */
  title?: string;
  /**
   * 更新时间
   * @type {Date}
   * @memberof Teacher
   */
  updateTime?: Date;
}
// /**
//  * 课程
//  */
// export interface Course {

//   id: number;

//   code: string;

//   name: string;

//   credit: number;

//   nature: string;
// }
// /**
//  * 课程
//  */
// export interface CourseForm {

//   code: string;

//   name: string;

//   credit: number;

//   nature: string;
// }
// /**
//  * 课程Resp
//  */
// export interface CourseListResp {
//   /**
//    * 响应码
//    *
//    * @serverType integer
//    */
//   code: number;
//   /**
//    *
//    *
//    * @serverType array
//    */
//   data: Course[];
//   /**
//    * 响应消息
//    *
//    * @serverType string
//    */
//   message: string;
//   /**
//    * 当前页
//    *
//    * @serverType integer
//    */
//   page: number;
//   /**
//    * 每页记录数
//    *
//    * @serverType integer
//    */
//   pageSize: number;
//   /**
//    * 记录总数
//    *
//    * @serverType integer
//    */
//   total: number;
// }

// export interface CourseResp {
//   /**
//    * 响应码
//    *
//    * @serverType integer
//    */
//   code: number;
//   /**
//    *
//    *
//    * @serverType object
//    */
//   data: Course;
//   /**
//    * 响应消息
//    *
//    * @serverType string
//    */
//   message: string;
// }

