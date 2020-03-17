<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="semester"
      >
        <el-input
          v-model="queryOptions.semester"
          placeholder="学期"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        prop="teacher"
      >
        <el-input
          v-model="queryOptions.teacher"
          placeholder="执教老师姓名"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        prop="course"
      >
        <el-input
          v-model="queryOptions.course"
          placeholder="课程名称"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          @click="handleFilter"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelect"
    >
      <el-table-column
        align="center"
        label="课程序号"
        prop="no"
      />
      <el-table-column
        prop="semester"
        align="center"
        label="学期"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.semester"
          >
            {{ scope.row.semester }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="course"
        align="center"
        label="课程名称"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.course"
          >
            {{ scope.row.course }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="jno"
        align="center"
        label="执教老师工号"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.jno"
          >
            {{ scope.row.jno }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="teacher"
        align="center"
        label="执教老师姓名"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.teacher"
          >
            {{ scope.row.teacher }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="startWeek"
        label="开课周次"
      />
      <el-table-column
        align="center"
        prop="endWeek"
        label="结课周次"
      />
      <el-table-column
        align="center"
        label="状态"
        prop="status"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status===0"
            prop="status"
            type="success"
            size="mini"
            plain
          >
            正常
          </el-button>
          <el-button
            v-else-if="scope.row.status===1"
            type="danger"
            size="mini"
            plain
          >
            异常
          </el-button>
          <el-button
            v-else
            type="warning"
            size="mini"
            plain
          >
            未知
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleSelect(scope.row)"
          >
            选课
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryOptions.page"
      :limit.sync="queryOptions.pageSize"
      @pagination="requestData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class CourseClass extends Vue {
  data:m.CourseClass[] = []
  total = 0
  loading = true
  courseClass: m.CourseClass = {} as any
  semesterList:m.Semester[] = []
  teacherList:m.Teacher[] = []
  courseList:m.Course[] = []
  showDialog = false
  editForm:m.CreateSelectCourseForm={} as any
  selectCourseClassId:number[] = []

  showExcelDialog=false

  statusOption = [{
    value: 0,
    label: '正常'
  }, {
    value: 1,
    label: '异常'
  }, {
    value: 2,
    label: '未知'
  }]

  queryOptions = {
    semester: '',
    teacher: '',
    course: '',
    page: 1,
    pageSize: 20
  }

  rules={
    no: [{ required: true, message: '课程序号不能为空', trigger: 'blur' }],
    semesterId: [{ required: true, message: '学期不能为空', trigger: 'blur' }],
    teacherId: [{ required: true, message: '执教老师不能为空', trigger: 'blur' }],
    courseId: [{ required: true, message: '课程名称不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.querySemesterList('')
    this.queryTeacherList('')
    this.queryCourseList('')
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryCourseByStudent(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.courseClass = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      courseClassId: undefined,
      studentId: undefined
    }
  }

  handleSelect(courseClass: m.CourseClass) {
    this.$confirm(`确定选择课号为${courseClass.no}的课程吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      this.editForm.courseClassId = courseClass.id
      const res = await this.api.createSelectCourse(this.editForm)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '选课成功!'
        })
        this.data = this.data.filter((e: m.CourseClass) => e.id !== courseClass.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }
  async querySemesterList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.querySemester(option)
    if (res.code === 0 && res.data.list.length > 0) {
      this.semesterList = res.data.list
    }
  }
  async queryTeacherList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryTeacher(option)
    if (res.code === 0 && res.data.list.length > 0) {
      this.teacherList = res.data.list
    }
  }
  async queryCourseList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryCourse(option)
    if (res.code === 0 && res.data.list.length > 0) {
      this.courseList = res.data.list
    }
  }
  async queryCourseClassList(query: string, callback: any) {
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryCourseClass(option)
    let list = [{}]
    if (res.code === 0 && res.data.list.length > 0) {
      list = res.data.list
      list.forEach((element:any) => {
        element.value = element.no
      })
    }
    callback(list)
  }
}
</script>
