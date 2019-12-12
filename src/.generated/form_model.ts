/**
 * 
 * @export
 * @interface CreateCourseForm
 */
export interface CreateCourseForm {
  /**
   * 课程代码
   * @type {string}
   * @memberof CreateCourseForm
   */
  code: string;

  /**
   * 课程对应学分
   * @type {number}
   * @memberof CreateCourseForm
   */
  credit: number;

  /**
   * 课程名称
   * @type {string}
   * @memberof CreateCourseForm
   */
  name : string;
  /**
   * 课程性质
   * @type {string}
   * @memberof CreateCourseForm
   */
  nature: string;

}/**
* 
* @export
* @interface CreateCourseClassForm
*/
export interface CreateCourseClassForm {
  /**
   * 课程Id
   * @type {number}
   * @memberof CreateCourseClassForm
   */
  courseId?: number;

  /**
   * 结课时间
   * @type {number}
   * @memberof CreateCourseClassForm
   */
  endWeek?: number;

  /**
   * 课程序号
   * @type {string}
   * @memberof CreateCourseClassForm
   */
  no?: string;
  /**
   * 学期Id
   * @type {number}
   * @memberof CreateCourseClassForm
   */
  semesterId?: number;
  /**
   * 开课时间
   * @type {number}
   * @memberof CreateCourseClassForm
   */
  startWeek?: number;
  /**
   * 状态码 0-开课 1-未开课
   * @type {number}
   * @memberof CreateCourseClassForm
   */
  status?: number;
  /**
   * 执教老师Id
   * @type {number}
   * @memberof CreateCourseClassForm
   */
  teacherId?: number;

}/**
* 
* @export
* @interface CreateCourseTargetForm
*/
export interface CreateCourseTargetForm {

  /**
   * 描述
   * @type {string}
   * @memberof CreateCourseTargetForm
   */
  describes?: string;

  /**
   * 选项
   * @type {string}
   * @memberof CreateCourseTargetForm
   */
  options?: string;
  /**
   * 选项得分
   * @type {string}
   * @memberof CreateCourseTargetForm
   */
  optionsScore?: string;
  /**
   * 指标点Id
   * @type {number}
   * @memberof CreateCourseTargetForm
   */
  pointId?: number;
  /**
   * 对应的问卷Id
   * @type {number}
   * @memberof CreateCourseTargetForm
   */
  questionnaireId?: number;
  /**
   * 序号
   * @type {number}
   * @memberof CreateCourseTargetForm
   */
  sequence?: number;
  /**
   * 题目
   * @type {string}
   * @memberof CreateCourseTargetForm
   */
  title?: string;
  /**
   * 总分
   * @type {number}
   * @memberof CreateCourseTargetForm
   */
  totalScore?: number;

}
/**
* 
* @export
* @interface CreateGraduationPointForm
*/
export interface CreateGraduationPointForm {
  /**
   * 指标点编号
   * @type {string}
   * @memberof CreateGraduationPointForm
   */
  content?: string;

  /**
   * 毕业要求Id
   * @type {number}
   * @memberof CreateGraduationPointForm
   */
  graduationDemandId?: number;

  /**
   * 指标点编号
   * @type {string}
   * @memberof CreateGraduationPointForm
   */
  no?: string;

}
/**
* 
* @export
* @interface CreateGraduationDemandForm
*/
export interface CreateGraduationDemandForm {
  /**
   * 指标点编号
   * @type {string}
   * @memberof CreateGraduationDemandForm
   */
  content?: string;

  /**
   * 专业id
   * @type {number}
   * @memberof CreateGraduationDemandForm
   */
  majorId?: number;

  /**
   * 指标点编号
   * @type {string}
   * @memberof CreateGraduationDemandForm
   */
  no?: string;

}
/**
* 
* @export
* @interface CreateMajorForm
*/
export interface CreateMajorForm {
  /**
   * 专业代码
   * @type {string}
   * @memberof CreateMajorForm
   */
  code?: string;


  /**
   * 专业名称
   * @type {string}
   * @memberof CreateMajorForm
   */
  name?: string;

}/**
* 
* @export
* @interface CreateQuestionnaireForm
*/
export interface CreateQuestionnaireForm {
  /**
   * 问卷对应班级
   * @type {number}
   * @memberof CreateQuestionnaireForm
   */
  courseClassId?: number;

  /**
   * 问卷描述
   * @type {string}
   * @memberof CreateQuestionnaireForm
   */
  describes?: string;

  /**
   * 问卷名称
   * @type {string}
   * @memberof CreateQuestionnaireForm
   */
  name?: string;
  /**
   * 问卷总分
   * @type {number}
   * @memberof CreateQuestionnaireForm
   */
  totalScore?: number;

}/**
* 
* @export
* @interface CreateSelectCourseForm
*/
export interface CreateSelectCourseForm {
  /**
   * 课程班级Id
   * @type {number}
   * @memberof CreateSelectCourseForm
   */
  courseClassId?: number;


  /**
   * 学生Id
   * @type {number}
   * @memberof CreateSelectCourseForm
   */
  studentId?: number;

}/**
* 
* @export
* @interface CreateSelfEvaluationForm
*/
export interface CreateSelfEvaluationForm {
  /**
   * 评价档次
   * @type {string}
   * @memberof CreateSelfEvaluationForm
   */
  answer?: string;
  /**
   * 专业名称
   * @type {number}
   * @memberof CreateSelfEvaluationForm
   */
  courseTargetId?: number;


  /**
   * 得分
   * @type {number}
   * @memberof CreateSelfEvaluationForm
   */
  score?: number;
  /**
   * 学生Id
   * @type {number}
   * @memberof CreateSelfEvaluationForm
   */
  studentId?: number;

}/**
* 
* @export
* @interface CreateSemesterForm
*/
export interface CreateSemesterForm {


  /**
   * 学期名称
   * @type {string}
   * @memberof CreateSemesterForm
   */
  name?: string;
  /**
   * 学期开始时间
   * @type {string}
   * @memberof CreateSemesterForm
   */
  startTime?: string;

}/**
* 
* @export
* @interface CreateServerResponseForm
*/
export interface CreateServerResponseForm {
  /**
   * 
   * @type {any}
   * @memberof CreateServerResponseForm
   */
  data?: any;
  /**
   * 
   * @type {string}
   * @memberof CreateServerResponseForm
   */
  msg?: string;
  /**
   * 
   * @type {number}
   * @memberof CreateServerResponseForm
   */
  status?: number;
  /**
   * 
   * @type {boolean}
   * @memberof CreateServerResponseForm
   */
  success?: boolean;
}/**
* 
* @export
* @interface CreateStudentForm
*/
export interface CreateStudentForm {

  /**
   * 年级
   * @type {string}
   * @memberof CreateStudentForm
   */
  grade?: string;

   /**
   * 头像
   * @type {string}
   * @memberof CreateStudentForm
   */
  avatar?: string;
  /**
   * 上此登录数据
   * @type {Date}
   * @memberof CreateStudentForm
   */
  loginTime?: Date;
  /**
   * 专业Id
   * @type {number}
   * @memberof CreateStudentForm
   */
  majorId?: number;
  /**
   * 姓名
   * @type {string}
   * @memberof CreateStudentForm
   */
  name?: string;
  /**
   * 密码
   * @type {string}
   * @memberof CreateStudentForm
   */
  password?: string;
  /**
   * 性别
   * @type {string}
   * @memberof CreateStudentForm
   */
  sex?: string;
  /**
   * 学号
   * @type {string}
   * @memberof CreateStudentForm
   */
  sno?: string;
  /**
   * 状态 正常-0
   * @type {number}
   * @memberof CreateStudentForm
   */
  status?: number;

}/**
* 
* @export
* @interface CreateSupportingCourseForm
*/
export interface CreateSupportingCourseForm {
  /**
   * 课程Id
   * @type {number}
   * @memberof CreateSupportingCourseForm
   */
  courseId?: number;

  /**
   * 毕业要求指标点
   * @type {number}
   * @memberof CreateSupportingCourseForm
   */
  graduationPointId?: number;


}/**
* 
* @export
* @interface CreateTeacherForm
*/
export interface CreateTeacherForm {
  /**
   * 出生日期
   * @type {string}
   * @memberof CreateTeacherForm
   */
  birth?: string;

  /**
   * 毕业转移
   * @type {string}
   * @memberof CreateTeacherForm
   */
  graduateMajor?: string;
  /**
   * 毕业学校
   * @type {string}
   * @memberof CreateTeacherForm
   */
  graduateSchool?: string;

  /**
   * 工号
   * @type {string}
   * @memberof CreateTeacherForm
   */
  jno?: string;

   /**
   * 头像
   * @type {string}
   * @memberof CreateTeacherForm
   */
  avatar?: string;
  /**
   * 上传登录时间
   * @type {Date}
   * @memberof CreateTeacherForm
   */
  loginTime?: Date;
  /**
   * 姓名
   * @type {string}
   * @memberof CreateTeacherForm
   */
  name?: string;
  /**
   * 密码
   * @type {string}
   * @memberof CreateTeacherForm
   */
  password?: string;
  /**
   * 角色
   * @type {string}
   * @memberof CreateTeacherForm
   */
  role?: string;
  /**
   * 性别
   * @type {string}
   * @memberof CreateTeacherForm
   */
  sex?: string;
  /**
   * 职称
   * @type {string}
   * @memberof CreateTeacherForm
   */
  title?: string;

}