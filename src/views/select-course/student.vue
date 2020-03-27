<template>
  <!-- <div class="student-container" style="margin-left: 40%; margin-top: 50px"> -->
  <div class="student-container">
    <el-form
      ref="editForm"
      class="student-form"
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
    <div style="margin-top: 60px">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'
// import { UserModule } from '@/store/modules/user'

@Component({})
export default class extends Vue {
  @Prop({ default: () => {} }) private selectCourse!: m.SelectCourse
  @Prop({ default: () => {} }) private dialogClose!: Function
  loading = true
  // permission: boolean = false
  editForm: m.CreateSelectCourseForm = {} as any
  studentList:m.Student[] =[]
  courseClassList:m.CourseClass[]=[]
  queryOptions = {
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
    // let roles = UserModule.roles
    // // 用户不是学生
    // if (roles.indexOf('student') === -1) {
    //   this.permission = true
    // }
    this.requestData()
    this.queryStudentList('')
    this.queryCourseClassList('')
    if (this.selectCourse) {
      this.editForm = {

        studentId: this.selectCourse.studentId,
        courseClassId: this.selectCourse.courseClassId
      }
    }
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.querySelectCourse(this.queryOptions)
    this.loading = false
  }

  resetForm() {
    this.editForm = {
      courseClassId: undefined,
      studentId: undefined
    }
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.selectCourse && this.selectCourse.id) {
          const res = await this.api.putSelectCourse(this.selectCourse.id, this.editForm)
          if (res.code === 0) {
            this.resetForm()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.dialogClose()
          }
        } else {
          const res = await this.api.createSelectCourse(this.editForm)
          if (res.code === 0) {
            (this.$refs['editForm'] as ElForm).resetFields()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogClose()
          }
        }
      } else {
        return false
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
}
</script>

<style lang="scss" scoped>
.student-container {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .password-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
