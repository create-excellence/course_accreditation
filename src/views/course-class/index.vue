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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          开课信息
        </el-button>
      </el-form-item>
      <el-button
        type="primary"
        plain
        @click="showCheckbox=!showCheckbox"
      >
        多选
      </el-button>
      <el-button
        v-if="showCheckbox"
        type="danger"
        @click="handleBatchDelete"
      >
        批量删除
      </el-button>
      <el-button
        type="primary"
        plain
        @click="showExcelDialog=true"
      >
        批量导入开课信息
      </el-button>
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
        v-if="showCheckbox"
        type="selection"
        width="55"
      />
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
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            style="marginTop:3px"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >
            删除
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

    <el-dialog
      :title="`${courseClass.id ? '编辑' : '添加'}开课信息`"
      :visible.sync="showDialog"
      @close="showDialog = false"
    >
      <el-form
        v-if="showDialog"
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          prop="no"
          label="课程序号"
        >
          <el-input
            v-model="editForm.no"
            placeholder="请输入课程序号"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          prop="semesterId"
          label="学期"
        >
          <el-select
            v-model="editForm.semesterId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择学期"
            :remote-method="querySemesterList"
            :loading="loading"
          >
            <el-option
              v-for="item in semesterList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="courseId"
          label="课程名称"
        >
          <el-select
            v-model="editForm.courseId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择课程"
            :remote-method="queryCourseList"
            :loading="loading"
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.code+item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="teacherId"
          label="执教老师"
        >
          <el-select
            v-model="editForm.teacherId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择执教老师"
            :remote-method="queryTeacherList"
            :loading="loading"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.jno+item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="startWeek"
          label="开课周次"
        >
          <el-input-number
            v-model="editForm.startWeek"
            :min="1"
            :step="1"
            :max="25"
          />
        </el-form-item>
        <el-form-item
          prop="endWeek"
          label="结课周次"
        >
          <el-input-number
            v-model="editForm.endWeek"
            :min="1"
            :step="1"
            :max="25"
          />
        </el-form-item>
        <el-form-item
          prop="status"
          label="状态"
        >
          <el-select
            v-model="editForm.status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showDialog = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <excel-dialog
      action="/course-class/batchSave"
      :show.sync="showExcelDialog"
      @requestData="requestData"
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
  editForm:m.CreateCourseClassForm={} as any
  showCheckbox = false
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
    const res = await this.api.queryCourseClass(this.queryOptions)
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
      no: '',
      semesterId: undefined,
      teacherId: undefined,
      courseId: undefined,
      startWeek: 3,
      endWeek: 18,
      status: undefined
    }
  }

  handleEdit(courseClass: m.CourseClass) {
    this.courseClass = courseClass
    this.editForm = {
      no: courseClass.no,
      semesterId: courseClass.semesterId,
      teacherId: courseClass.teacherId,
      courseId: courseClass.courseId,
      startWeek: courseClass.startWeek,
      endWeek: courseClass.endWeek,
      status: courseClass.status
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.courseClass.id) {
          const res = await this.api.putCourseClass(this.courseClass.id, this.editForm)
          if (res.code === 0) {
            this.resetForm()
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.requestData()
          }
        } else {
          const res = await this.api.createCourseClass(this.editForm)
          if (res.code === 0) {
            (this.$refs['editForm'] as ElForm).resetFields()
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.requestData()
          }
        }
      } else {
        return false
      }
    })
  }

  handleDelete(courseClass: m.CourseClass) {
    this.$confirm(`确定删除${courseClass.no}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteCourseClass(courseClass.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
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
      console.log(this.teacherList)
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

  handleSelect(select:m.CourseClass[]) {
    this.selectCourseClassId = select.map((item:m.CourseClass) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectCourseClassId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteCourseClass(this.selectCourseClassId)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.requestData()
      }
    })
  }
}
</script>
