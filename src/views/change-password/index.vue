<template>
  <div class="password-container">
    <el-form
      ref="passwordForm"
      :model="passwordForm"
      :rules="passwordRules"
      class="password-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          修改密码
        </h3>
      </div>
      <el-form-item prop="oldPassword">
        <el-input
          ref="oldPassword"
          v-model="passwordForm.oldPassword"
          maxlength="25"
          :type="passwordType"
          placeholder="请输入旧密码"
          name="oldPassword"
          autocomplete="on"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon
            :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input
          ref="newPassword"
          v-model="passwordForm.newPassword"
          maxlength="25"
          :type="passwordType"
          placeholder="请输入新密码"
          name="newPassword"
          autocomplete="on"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon
            :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="rePassword">
        <el-input
          ref="rePassword"
          v-model="passwordForm.rePassword"
          maxlength="25"
          :type="passwordType"
          placeholder="再次输入确认密码"
          name="rePassword"
          autocomplete="on"
          @keyup.enter.native="handleSubmit"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon
            :name="passwordType === 'password' ? 'eye-off' : 'eye-on'"
          />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleSubmit"
      >
        修改
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { Form as ElForm, Input, Message, MessageBox } from 'element-ui'
import { isValidCode } from '@/utils/validate'
import * as m from '@/api/model'
@Component
export default class extends Vue {
  private passwordType = 'password'
  private loading = false
  passwordForm = {
    oldPassword: '',
    newPassword: '',
    rePassword: ''
  }
  private passwordRules = {
    oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
    newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    rePassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
  };

  mounted() {
    if (this.passwordForm.oldPassword === '') {
      (this.$refs.oldPassword as Input).focus()
    } else if (this.passwordForm.newPassword === '') {
      (this.$refs.newPassword as Input).focus()
    } else if (this.passwordForm.rePassword === '') {
      (this.$refs.rePassword as Input).focus()
    }
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.oldPassword as Input).focus()
    })
  }

  private handleSubmit() {
    (this.$refs.passwordForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = false
        // 校验输入是否合乎逻辑
        if (this.passwordForm.newPassword === this.passwordForm.oldPassword) {
          MessageBox.alert(`操作失败: 新密码与旧密码不能一致`, '错误')
          return false
        } else if (this.passwordForm.newPassword !== this.passwordForm.rePassword) {
          MessageBox.alert(`操作失败: 确认密码必须与新密码一致`, '错误')
          return false
        }

        let roles = UserModule.roles
        // 用户是学生
        if (roles.indexOf('student') !== -1) {
          await UserModule.ChangePassword(this.passwordForm)
            .then(() => {
              Message({
                message: '密码修改成功',
                type: 'success',
                duration: 5 * 1000
              })
              UserModule.LogOut()
              this.$router.push('/login')
            })
        } else {
          await UserModule.ChangePassword(this.passwordForm)
            .then(() => {
              Message({
                message: '密码修改成功',
                type: 'success',
                duration: 5 * 1000
              })
              UserModule.LogOut()
              this.$router.push('/login')
            })
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      }
    })
  }
}

</script>

<style lang="scss" scoped>
.password-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: $loginBg;

  .password-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $darkGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
