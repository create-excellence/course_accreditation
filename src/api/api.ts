import * as m from '@/api/model'
export * from '@/api/users'
export * from '@/api/course.ts'

export interface api {
    // User
    getUserInfo():m.ServerResponse,
    login(data: m.LoginForm):m.ServerResponse,
    logout():m.ServerResponse,

    // Course
    getCourseList(queryOptions:any):m.ServerResponse,
    createCourse(data:m.CreateCourseForm):m.ServerResponse
    deleteCourse(id:number):m.ServerResponse
    putCourse(id:number, data:m.CreateCourseForm):m.ServerResponse

  }

class apiIml implements api {
  putCourse(id: number, data: m.CreateCourseForm): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
  deleteCourse(id: number): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
  getUserInfo(): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
  login(data: m.LoginForm): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
  logout(): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
  getCourseList(queryOptions: any): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
  createCourse(data: m.CreateCourseForm): m.ServerResponse {
    throw new Error('Method not implemented.')
  }
}
// export default apiIml  第二种写法
