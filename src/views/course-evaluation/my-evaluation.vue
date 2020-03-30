<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
    >
      <el-form-item
        label="学期"
        style="margin-left: 20px"
      >
        <el-select
          v-model="queryOptions.semesterId"
          v-loadmore="handleLoadMore"
          size="medium"
          style="width:80%"
          placeholder="请选择学期"
          @change="requestData"
        >
          <el-option
            v-for="item in semesterList"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
        label="课程序号"
        prop="no"
      />
      <el-table-column
        align="center"
        label="课程代码"
        prop="courseCode"
      />
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
        label="操作"
        width="400"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >
            发布课程评价
          </el-button>
          <el-button
            size="mini"
            @click="$router.push(`/course-evaluation/my-course/${scope.row.id}/student`)"
          >
            查看班级学生
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
    semesterId: -1,
    page: 1,
    pageSize: 20
  }

  querySemesterOption = {
    page: 1,
    pageSize: 10
  }

  created() {
    this.init()
  }

  async init() {
    this.querySemesterList()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.getMyCourse(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  async querySemesterList() {
    const res = await this.api.querySemester(this.querySemesterOption)
    if (res.code === 0 && res.data.list.length > 0) {
      if (this.semesterList.length > 0) {
        this.semesterList = this.semesterList.concat(res.data.list)
      } else {
        this.semesterList = res.data.list
        this.queryOptions.semesterId = res.data.list[0].id
        this.requestData()
      }
    }
  }

  async handleLoadMore() {
    this.querySemesterOption.page++
    this.querySemesterList()
  }
}
</script>

<style scoped>
.el-table {
    left: 10%
}
</style>
