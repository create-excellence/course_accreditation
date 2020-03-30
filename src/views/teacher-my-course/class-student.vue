<template>
  <div

    class="app-container"
  >
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="sno"
      >
        <el-autocomplete
          v-model="queryOptions.sno"
          class="inline-input"
          :fetch-suggestions="queryStudentList"
          placeholder="请输入学生学号"
        />
      </el-form-item>
      <el-form-item
        prop="name"
      >
        <el-input
          v-model="queryOptions.name"
          placeholder="学生姓名"
          maxlength="10"
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
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        label="学生姓名"
        prop="name"
      />
      <el-table-column
        align="center"
        label="学生学号"
        prop="sno"
      />
      <el-table-column
        align="center"
        label="性别"
        prop="sex"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex==='男'">
            男
          </el-tag>
          <el-tag
            v-if="scope.row.sex==='女'"
            type="danger"
          >
            女
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="年级"
        prop="grade"
      />
      <el-table-column
        prop="major"
        align="center"
        label="专业"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.major"
          >
            {{ scope.row.major }}
          </el-tag>
          <el-tag
            v-else
            type="danger"
          >
            无
          </el-tag>
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class Student extends Vue {
  data:m.Student[] = []
  total = 0
  loading = true
  student: m.Student = {} as any
  showDialog = false
  majorList:m.Major[] = []
  editForm:m.CreateStudentForm={} as any

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
    name: '',
    sno: '',
    courseClassId: -1,
    page: 1,
    pageSize: 20
  }

  created() {
    this.init()
  }

  async init() {
    let courseClassId = Number(this.$route.params.courseClassId)
    this.queryOptions.courseClassId = courseClassId
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryStudent(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  async queryStudentList(query: string, callback: any) {
    const option = {
      page: 1,
      pageSize: 20,
      sno: query
    }
    const res = await this.api.queryStudent(option)
    let list = [{}]
    if (res.code === 0 && res.data.list.length > 0) {
      list = res.data.list
      list.forEach((element:any) => {
        element.value = element.sno
      })
    }
    callback(list)
  }
}
</script>
