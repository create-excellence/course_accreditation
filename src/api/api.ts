import * as m from '@/api/model'
export * from '@/api/users'
export * from '@/api/course.ts'
export * from '@/api/student.ts'
export * from '@/api/major.ts'
export * from '@/api/teacher.ts'
export * from '@/api/semester.ts'

export interface api {
    // User
    getUserInfo():m.ServerResponse,
    login(data: m.LoginForm):m.ServerResponse,
    logout():m.ServerResponse,

    // Course
    queryCourse(queryOptions:any):m.ServerResponse,
    createCourse(data:m.CreateCourseForm):m.ServerResponse
    deleteCourse(id:number):m.ServerResponse
    putCourse(id:number, data:m.CreateCourseForm):m.ServerResponse
    batchDeleteCourse(ids:number[]):m.ServerResponse

    // Student
    queryStudent(queryOptions:any):m.ServerResponse,
    createStudent(data:m.CreateStudentForm):m.ServerResponse
    deleteStudent(id:number):m.ServerResponse
    putStudent(id:number, data:m.CreateStudentForm):m.ServerResponse
    batchDeleteStudent(ids:number[]):m.ServerResponse

    // Major
    queryMajor(queryOptions:any):m.ServerResponse,
    createMajor(data:m.CreateMajorForm):m.ServerResponse
    deleteMajor(id:number):m.ServerResponse
    putMajor(id:number, data:m.CreateMajorForm):m.ServerResponse
    batchDeleteMajor(ids:number[]):m.ServerResponse

    // Teacher
    queryTeacher(queryOptions:any):m.ServerResponse,
    createTeacher(data:m.CreateTeacherForm):m.ServerResponse
    deleteTeacher(id:number):m.ServerResponse
    putTeacher(id:number, data:m.CreateTeacherForm):m.ServerResponse
    batchDeleteTeacher(ids:number[]):m.ServerResponse

     // Semester
     querySemester(queryOptions:any):m.ServerResponse,
     createSemester(data:m.CreateSemesterForm):m.ServerResponse
     deleteSemester(id:number):m.ServerResponse
     putSemester(id:number, data:m.CreateSemesterForm):m.ServerResponse
     batchDeleteSemester(ids:number[]):m.ServerResponse
 }
