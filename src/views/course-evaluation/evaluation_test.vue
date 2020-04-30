<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="main"
  >
    <el-card
      class="box-card"
      shadow="never"
      style="background-color:white;"
    >
      <div style="text-align:center;">
        <h1 style="font-size:30px;">
          {{ name }}
        </h1>
      </div>
    </el-card>
    <el-card
      class="box-card"
      shadow="never"
      style="background-color:white;margin-top:15px;"
    >
      <div style="margin-top:15px;">
        <el-button
          v-for="item in data"
          :key="item.id"
          :type="item.choose?'primary':''"
          circle
          @click="goAnchor('#anchor-'+item.sequence)"
        >
          {{ item.sequence }}
        </el-button>
      </div>
    </el-card>
    <div
      v-for="item in data"
      :key="item.id"
      style="margin-top:15px;"
    >
      <el-card
        :id="'anchor-'+item.sequence"
        class="box-card"
        shadow="never"
        style="background-color:white;"
      >
        <div style="font-size:18px;">
          <span

            style="font-weight:bold;"
          >{{ item.sequence }}.{{ item.title }}</span>
        </div>

        <div>
          <div
            v-for="option in item.optionsList"
            :key="option.prefix"
            style="margin-top:15px;"
          >
            <el-radio
              v-model="item.choose"
              :label="option.prefix"
              size="medium"
              style="font-size:30px;"
            >
              <span
                style="font-size:18px;"
              >{{ option.prefix }} . {{ option.content }}</span>
            </el-radio>
          </div>
        </div>
      </el-card>
    </div>
    <el-card
      class="box-card"
      shadow="never"
      style="background-color:white;margin-top:15px;"
    >
      <el-button
        type="primary"
        style="float:right;"
        @click="handleSubmit"
      >
        提交
      </el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import * as m from '@/api/model'
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({})
export default class EvaluationTest extends Vue {
  name='测试卷一'
  data:m.CourseTarget[] = []
  courseEvaluationId=-1
  loading=false

  created() {
    this.init()
  }

  async init() {
    let courseEvaluationId = Number(this.$route.params.courseEvaluationId)
    this.courseEvaluationId = courseEvaluationId
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.getQuestions(this.courseEvaluationId)
    if (res.code === 0) {
      this.data = res.data
    }
    this.loading = false
  }

  async handleSubmit() {
    const res = await this.api.submit(this.data)
    if (res.code === 0) {
      this.$router.push(`/my-evaluation`)
    }
  }

  goAnchor(selector) {
    document.querySelector(selector).scrollIntoView(true)
  }
}
</script>

<style>
.main{
  width:1200px;
  margin:0 auto;
}
body {
background-color: #fafafa;
}
</style>
