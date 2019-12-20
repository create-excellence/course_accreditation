<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="course"
      >
        <el-input
          v-model="queryOptions.course"
          placeholder="请输入课程名称"
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
          添加选课
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
        @click="showExcelDialog=true"
      >
        批量导入选课
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
        label="学生编号"
        prop="sno"
      />
      <el-table-column
        align="center"
        label="学生姓名"
        prop="student"
      />
      <el-table-column
        align="center"
        label="课程序号"
        prop="no"
      />
      <el-table-column
        align="center"
        label="课程名称"
        prop="course"
      />
      <el-table-column
        align="center"
        label="老师名称"
        prop="teacher"
      />
      <el-table-column
        align="center"
        label="学期"
        prop="semester"
      />
      <el-table-column
        align="center"
        label="开始周"
        prop="startWeek"
      />
      <el-table-column
        align="center"
        label="结束周"
        prop="endWeek"
      />
      <el-table-column
        align="center"
        prop="createTime"
        label="添加时间"
      />
      <el-table-column
        align="center"
        prop="updateTime"
        label="更新时间"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
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
      :title="`${selectCourse.id ? '编辑' : '添加'}支撑课程`"
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
          prop="studentId"
          label="学生"
        >
          <el-select
            v-model="editForm.studentId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择学生"
            :remote-method="queryStudentList"
            :loading="loading"
          >
            <el-option
              v-for="item in studentList"
              :key="item.id"
              :label="item.sno+' '+item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="courseClassId"
          label="课程班级"
        >
          <el-select
            v-model="editForm.courseClassId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择指标点编号"
            :remote-method="queryCourseClassList"
            :loading="loading"
          >
            <el-option
              v-for="item in courseClassList"
              :key="item.id"
              :label="item.no"
              :value="item.id"
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
      action="/select-course/batchSave"
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
export default class SelectCourse extends Vue {
  data:m.SelectCourse[] = []
  total = 0
  loading = true
  selectCourse: m.SelectCourse = {} as any
  showDialog = false
  editForm:m.CreateSelectCourseForm={} as any
  showCheckbox = false
  selectCourseId:number[] = []
  showExcelDialog=false
  studentList:m.Student[] =[]
  courseClassList:m.CourseClass[]=[]

  queryOptions = {
    no: '',
    course: '',
    student: '',
    teacher: '',
    semester: '',
    page: 1,
    pageSize: 20
  }

  rules={
    courseClassId: [{ required: true, message: '课程班级不能为空', trigger: 'blur' }],
    studentId: [{ required: true, message: '学生不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.queryStudentList('')
    this.queryCourseClassList('')
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.querySelectCourse(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.selectCourse = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      courseClassId: undefined,
      studentId: undefined
    }
  }

  handleEdit(selectCourse: m.SelectCourse) {
    this.selectCourse = selectCourse
    this.editForm = {
      studentId: selectCourse.studentId,
      courseClassId: selectCourse.courseClassId
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.selectCourse.id) {
          const res = await this.api.putSelectCourse(this.selectCourse.id, this.editForm)
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
          const res = await this.api.createSelectCourse(this.editForm)
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

  handleDelete(selectCourse: m.SelectCourse) {
    this.$confirm(`确定删除这条信息吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteSelectCourse(selectCourse.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.SelectCourse) => e.id !== selectCourse.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async queryStudentList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryStudent(option)
    if (res.code === 0) {
      this.studentList = res.data.list
    }
  }

  async queryCourseClassList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryCourseClass(option)
    if (res.code === 0) {
      this.courseClassList = res.data.list
    }
  }

  handleSelect(select:m.SelectCourse[]) {
    this.selectCourseId = select.map((item:m.SelectCourse) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectCourseId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteSelectCourse(this.selectCourseId)
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
