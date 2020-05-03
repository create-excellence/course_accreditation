<template>
  <div class="app-container">
    <div class="info">
      <el-container :class="showChange?'form':''">
        <el-header>
          <span> 基本信息</span>
          <el-button
            v-if="!showChange"
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
            <div class="avatar">
              <el-avatar
                :size="100"
                :src="data.avatar"
              /> <br><br>
            </div>

            <svg-icon name="user" /> 姓名: {{ data.name }}
            <el-divider />
            <svg-icon name="sex" /> 性别: {{ data.sex }}
            <el-divider />
            <svg-icon name="birth" /> 生日: {{ data.birth }}
            <el-divider />
            <svg-icon name="title" /> 职称: {{ data.title }}
            <el-divider />
            <svg-icon name="school" /> 毕业学校: {{ data.graduateSchool }}
            <el-divider />
            <svg-icon name="major" /> 毕业专业: {{ data.graduateMajor }}
            <el-divider />
          </div>
          <el-form
            v-else
            ref="editForm"
            :model="editForm"
            :rules="rules"
            label-position="left"
            label-width="80px"
          >
            <div class="avatar">
              <el-avatar
                :size="100"
                :src="editForm.avatar"
              /><br><br>
              <el-upload
                :action="baseUrl+'/system/uploadAvatar'"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleSuccess"
              >
                <el-button
                  size="small"
                  type="primary"
                >
                  上传头像
                </el-button>
              </el-upload>
              <br>  <br>
            </div>

            <el-form-item
              prop="name"
              label="姓名"
            >
              <el-input
                v-model="editForm.name"
                placeholder="请输入姓名"
                maxlength="20"
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
                maxlength="20"
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
import { UserModule } from '@/store/modules/user'

@Component({})
export default class TeacherPersonInfo extends Vue {
  data:m.Teacher = {} as any
  total = 0
  loading = true
  showChange = false
  editForm:m.CreateTeacherForm={} as any
  headers={} as any
  baseUrl = process.env.VUE_APP_BASE_API

  rules={
    name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    if (UserModule.token) {
      this.headers['Authentication'] = UserModule.token
    }
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
      graduateMajor: data.graduateMajor,
      avatar: data.avatar
    }
  }

  handleSuccess(res) {
    if (res.code === 0) {
      console.log(1)
      this.editForm.avatar = this.baseUrl + '/img/' + res.data
      console.log(this.editForm.avatar)
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

.avatar{
  text-align: center;
}

.el-container {
  width:650px;
  height:650px;
  margin: -100px 0 0 -250px;
  position: absolute;
  top: 30%;
  left: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.form{
  width:650px;
  height:730px;
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
