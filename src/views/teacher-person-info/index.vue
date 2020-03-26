<template>
  <div class="app-container">
    <div class="info">
      <el-container :class="showChange?'form':''">
        <el-header>
          <span> 基本信息</span>
          <el-button
            style="float:right;margin-top:13px;"
            type="primary"
            size="small"
            @click="handleEdit"
          >
            修改信息
          </el-button>
        </el-header>
        <el-main>
          <div v-if="!showChange">
            <svg-icon name="user" /> 姓名: {{ data.name }}<br><br><br>
            <svg-icon name="sex" /> 性别: {{ data.sex }}<br><br><br>
            <svg-icon name="birth" /> 生日: {{ data.birth }}<br><br><br>
            <svg-icon name="title" /> 职称: {{ data.title }}<br><br><br>
            <svg-icon name="school" /> 毕业学校: {{ data.graduateSchool }}<br><br><br>
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
              prop="birth"
              label="生日"
            >
              <el-date-picker
                v-model="editForm.birth"
                type="date"
                placeholder="请选择生日"
              />
            </el-form-item>
            <el-form-item
              prop="title"
              label="职称"
            >
              <el-input
                v-model="editForm.title"
                placeholder="请输入职称"
                maxlength="10"
              />
            </el-form-item>
            <el-form-item
              prop="graduateSchool"
              label="毕业学校"
            >
              <el-input
                v-model="editForm.graduateSchool"
                placeholder="请输入毕业学校"
                maxlength="20"
              />
            </el-form-item>
            <el-form-item
              prop="graduateMajor"
              label="毕业专业"
            >
              <el-input
                v-model="editForm.graduateMajor"
                placeholder="请输入毕业专业"
                maxlength="20"
              />
            </el-form-item>
            <el-button
              style="margin-left:200px;"
              size="small"
              type="primary"
              @click="handleSave"
            >
              保存
            </el-button>
            <el-button
              style="margin-left:20px;"
              size="small"
              type="info"
              @click="showChange = false"
            >
              取消
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
  data:m.Teacher = {} as any
  total = 0
  loading = true
  showChange = false
  editForm:m.CreateTeacherForm={} as any

  rules={
    name: [{ required: true, message: '指标点名称不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
  }

  async requestData() {
    const res = await this.api.getUserInfo()
    if (res.code === 0) {
      this.data = res.data
    }
  }

  handleEdit() {
    this.showChange = true
    let data = JSON.parse(JSON.stringify(this.data))
    this.editForm = {
      name: data.name,
      sex: data.sex,
      birth: data.birth,
      title: data.title,
      graduateSchool: data.graduateSchool,
      graduateMajor: data.graduateMajor
    }
  }

  async handleSave() {
    const res = await this.api.updateUserInfo(this.editForm)
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
