<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      size="small"
      @submit.native.prevent="handleFilter"
    >
      <!-- <el-form-item
        style="margin-right:-30px"
      >
        <el-select
          v-model="queryOptions.status"
          @change="handleFilter"
        >
          <el-option
            v-for="item in statusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-input
          v-model="queryOptions.name"
          placeholder="请输入学生姓名"
          maxlength="20"
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
      fit
      highlight-current-row
      style="width: 80%;"
    >
      <el-table-column
        align="center"
        label="序号"
        type="index"
      />
      <el-table-column
        align="center"
        label="姓名"
        prop="name"
        width="150px"
      />
      <el-table-column
        align="center"
        label="学号"
        prop="sno"
        width="150px"
      />
      <el-table-column
        align="center"
        label="班级"
      >
        <span>{{ course }}</span>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width="100px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isEvaluation"
            type="success"
            size="mini"
            plain
          >
            已评价
          </el-button>
          <el-button
            v-else
            type="danger"
            size="mini"
            plain
          >
            未评价
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="提交时间"
        prop="submitTime"
      />
      <el-table-column
        align="center"
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isEvaluation"
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >
            查看问卷详情
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
  semesterList:m.Semester[] = []
  showDialog = false
  course = ''

  queryOptions = {
    student: '',
    courseEvaluationId: -1,
    page: 1,
    pageSize: 20
  }

    statusOption = [{
      value: -1,
      label: '课程评价状态'
    }, {
      value: 0,
      label: '未评价'
    }, {
      value: 1,
      label: '已评价'
    }]

  querySemesterOption = {
    page: 1,
    pageSize: 10
  }

  created() {
    this.init()
  }

  async init() {
    let courseEvaluationId = Number(this.$route.params.courseEvaluationId)
    this.queryOptions.courseEvaluationId = courseEvaluationId
    this.course = String(this.$route.query.course)
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.getCourseEvaluationStudent(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }
}
</script>

<style scoped>
.el-select{
    width: 80%;
}

.el-table {
    left: 10%
}

</style>
