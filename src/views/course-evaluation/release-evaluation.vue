<template>
  <div class="app-container">
    <div class="info">
      <el-container class="form">
        <el-header>
          <span class="title"> 发布课程评价</span>
        </el-header>
        <el-main>
          <el-form
            ref="editForm"
            :model="editForm"
            :rules="rules"
            label-position="top"
          >
            <el-form-item
              prop="name"
              label="课程评价名称"
            >
              <el-input
                v-model="editForm.name"
                placeholder="请输入课程评价名称"
                maxlength="10"
              />
            </el-form-item>
            <el-form-item
              prop="startTime"
              label="开始时间"
            >
              <el-date-picker
                v-model="editForm.startTime"
                :picker-options="startOptions"
                type="datetime"
                @change="handleStartChange"
              />
            </el-form-item>
            <el-form-item
              prop="endTime"
              label="结束时间"
            >
              <el-date-picker
                v-model="editForm.endTime"
                :picker-options="endOptions"
                type="datetime"
                @change="handleEndChange"
              />
            </el-form-item>
            <el-form-item
              prop="courseClassId"
              label="课程班级"
            >
              <el-select
                v-model="editForm.courseClassId"
                filterable
                remote
                no-data-text="没有可选的课程班级"
                placeholder="请选择课程班级"
                :remote-method="queryCourseClassList"
                @change="handleCourseClassChange"
              >
                <el-option
                  v-for="item in courseClassList"
                  :key="item.id"
                  :label="item.no+item.course"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="questionnaireId"
              label="问卷"
            >
              <el-select
                v-model="editForm.questionnaireId"
                filterable
                no-data-text="没有可选的问卷"
                remote
                placeholder="请选择问卷"
                :remote-method="queryQuestionnaireList"
              >
                <el-option
                  v-for="item in questionnaireList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <el-form-item
                label="描述"
              >
                <el-input
                  v-model="editForm.describes"
                  type="textarea"
                  placeholder="请输入描述"
                  maxlength="150"
                />
              </el-form-item>
              <el-button
                style="margin-left:200px;margin-top:10px;"
                size="small"
                type="primary"
                @click="handleSave"
              >
                发布
              </el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class ReleaseEvaluation extends Vue {
  total = 0
  loading = true
  showChange = true
  editForm:m.CreateCourseEvaluationForm={} as any
  courseClassList:m.CourseClass[] =[]
  questionnaireList: m.Questionnaire[] = []
  headers={} as any
  startOptions= {
    disabledDate: (time) => {
      return time.getTime() < Date.now() - 8.64e7
    }
  }
  endOptions= {
    disabledDate: (time) => {
      return time.getTime() < Date.now() - 8.64e7
    }
  }

  rules={
    name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
    courseClassId: [{ required: true, message: '课程班级不能为空', trigger: 'blur' }],
    questionnaireId: [{ required: true, message: '问卷不能为空', trigger: 'blur' }],
    startTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }],
    endTime: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.queryCourseClassList('')
    this.requestData()
    this.resetForm()
  }

  handleEndChange(endTime) {
    this.startOptions = Object.assign(this.startOptions, {
      disabledDate: (time) => {
        return time.getTime() < Date.now() - 8.64e7 || time.getTime() >= new Date(endTime).getTime()
      }
    })
  }
  handleStartChange(startTime) {
    this.endOptions = Object.assign(this.endOptions, {
      disabledDate: (time) => {
        return time.getTime() < Date.now() - 8.64e7 || !(time.getTime() >= new Date(startTime).getTime())
      }
    })
  }

  async requestData() {
  }

  async queryCourseClassList(key:String) {
    const option = {
      page: 1,
      pageSize: 10,
      course: key
    }
    const res = await this.api.getMyCourse(option)
    if (res.code === 0) {
      this.courseClassList = res.data.list
    }
  }

  async queryQuestionnaireList(key:String) {
    const option = {
      page: 1,
      pageSize: 10,
      name: key,
      courseClassId: this.editForm.courseClassId
    }
    const res = await this.api.getMyQuestionnaire(option)
    if (res.code === 0) {
      this.questionnaireList = res.data.list
    }
  }

  resetForm() {
    this.editForm = {
      name: '',
      startTime: undefined,
      endTime: undefined,
      courseClassId: undefined,
      questionnaireId: undefined,
      describes: ''
    }
  }

  handleCourseClassChange() {
    this.editForm.questionnaireId = undefined
    this.queryQuestionnaireList('')
  }

  async handleSave() {
    const res = await this.api.createCourseEvaluation(this.editForm)
    if (res.code === 0) {
      this.$message({
        type: 'success',
        message: res.message
      })
      this.resetForm()
    }
  }
}
</script>

<style lang="scss" scoped>

.el-container {
  margin: 0 0 0 -250px;
  position: absolute;
  top: 10%;
  left: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.form{
  width:700px;
  height:850px;
}
  .el-header {
    background-color: rgb(220, 226, 233);
    color: #333;
    line-height: 60px;
    text-align: center;
  }
 .el-main{
     margin: 10px 0 0 35px;
 }

.el-input{
    width: 80%;
}

.title {
    font-size: 26px;
    color: $darkGray;
    margin: 0px auto 40px auto;

    font-weight: bold;
}
</style>
