<template>
  <div class="app-container">
    <div class="info">
      <el-container :class="showChange?'form':''">
        <el-header>
          <span> 基本信息</span>
          <el-button
            style="float:right;margin-top:13px;"
            type="primary"
            size="middle"
            @click="handleEdit"
          >
            修改信息
          </el-button>
        </el-header>
        <el-main>
          <div v-if="!showChange">
            <svg-icon name="user" /> 学号: {{ data.sno }}<br><br><br>
            <svg-icon name="user" /> 姓名: {{ data.name }}<br><br><br>
            <svg-icon name="sex" /> 性别: {{ data.sex }}<br><br><br>
            <svg-icon name="birth" /> 年级: {{ data.grade }}<br><br><br>
            <svg-icon name="major" /> 毕业专业: {{ data.graduateMajor }}<br><br><br>
          </div>
          <el-form
            v-else
            ref="editForm"
            :model="editForm"
            :rules="rules"
            label-position="left"
            label-width="80px"
            width="50%"
          >
            <el-form-item
              prop="sno"
              label="学号"
            >
              <el-input
                v-model="editForm.sno"
                disabled
                placeholder="请输入学号"
                maxlength="20"
              />
            </el-form-item>
            <el-form-item
              prop="name"
              label="姓名"
            >
              <el-input
                v-model="editForm.name"
                placeholder="请输入姓名"
                maxlength="10"
              />
            </el-form-item>
            <el-form-item
              prop="sex"
              label="性别"
            >
              <el-radio-group v-model="editForm.sex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="grade"
              label="年级"
            >
              <el-input-number
                v-model="editForm.grade"
                :min="2000"
                :step="1"
                :max="2500"
              />
            </el-form-item>
            <el-form-item
              prop="majorId"
              label="毕业专业"
            >
              <el-select
                v-model="editForm.majorId"
                placeholder="请选择专业"
              >
                <el-option
                  v-for="item in majorList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-button
              style="margin-left:80px; margin-bottom: 30px"
              size="middle"
              type="info"
              @click="showChange = false"
            >
              取消
            </el-button>
            <el-button
              style="margin-left:64px; margin-bottom: 30px"
              size="middle"
              type="primary"
              @click="handleSave"
            >
              保存
            </el-button>
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
export default class TeacherPersonInfo extends Vue {
  data:m.Student = {} as any
  total = 0
  loading = true
  showChange = false
  majorList:m.Major[] = []
  editForm:m.CreateStudentForm={} as any

  rules={
    name: [{ required: true, message: '学生姓名不能为空', trigger: 'blur' }],
    sno: [{ required: true, message: '学生学号不能为空', trigger: 'blur' }],
    grade: [{ required: true, message: '年级不能为空', trigger: 'blur' }],
    majorId: [{ required: true, message: '学生专业不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.queryMajorList('')
  }

  async requestData() {
    const res = await this.api.getStudentInfo()
    if (res.code === 0) {
      this.data = res.data
    }
  }

  handleEdit() {
    this.showChange = true
    let data = JSON.parse(JSON.stringify(this.data))
    this.editForm = {
      sno: data.sno,
      name: data.name,
      sex: data.sex,
      grade: data.grade,
      majorId: data.majorId
    }
  }

  async queryMajorList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryMajor(option)
    if (res.code === 0 && res.data.list.length > 0) {
      this.majorList = res.data.list
    }
  }

  async handleSave() {
    const res = await this.api.updateStudentInfo(this.editForm)
    if (res.code === 0) {
      this.requestData()
      this.showChange = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  width:650px;
  height:450px;
  margin: -200px 0 0 -250px;
  position: absolute;
  top: 40%;
  left: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.form{
  width:750px;
  height:550px;
}
  .el-header {
    background-color: rgb(220, 226, 233);
    color: #333;
    line-height: 60px;
  }
 .el-main{
    margin: 10px 0 0 35px;
 }

.el-input{
    width: 80%;
}

</style>
