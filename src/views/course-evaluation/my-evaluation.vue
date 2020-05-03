<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      size="small"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
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
      </el-form-item>
      <el-form-item
        style="margin-right:-30px"
      >
        <el-select
          v-model="queryOptions.timeOrder"
          @change="handleFilter"
        >
          <el-option
            v-for="item in timeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryOptions.name"
          placeholder="请输入课程评价名称"
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
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        label="名称"
        prop="name"
      />
      <el-table-column
        align="center"
        label="班级"
        prop="course"
      />
      <el-table-column
        align="center"
        label="描述"
        width="200px"
        show-overflow-tooltip
        prop="describes"
      />

      <el-table-column
        align="center"
        label="状态"
        prop="status"
        width="130px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status===0"
            prop="status"
            type="warning"
            size="mini"
            plain
          >
            待开始
          </el-button>
          <el-button
            v-else-if="scope.row.status===1"
            type="primary"
            size="mini"
            plain
          >
            进行中
          </el-button>
          <el-button
            v-else
            type="success"
            size="mini"
            plain
          >
            已结束
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!permission"
        align="center"
        label="是否评价"
        prop="status"
        width="100px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isEvaluation"
            prop="status"
            type="success"
            size="mini"
            plain
          >
            已评价
          </el-button>
          <el-button
            v-else
            type="warning"
            size="mini"
            plain
          >
            未评价
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="startTime"
        label="开始时间"
      />
      <el-table-column
        align="center"
        prop="endTime"
        label="结束时间"
      />

      <el-table-column
        align="center"
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status===1">
            <el-button
              v-if="!scope.row.isEvaluation"
              size="mini"
              type="primary"
              @click="handleStart(scope.row.id)"
            >
              开始评价
            </el-button>
            <el-button
              v-else
              size="mini"
              type="success"
              plain
              @click="handleStart(scope.row.id)"
            >
              修改评价
            </el-button>
          </div>
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
import { UserModule } from '@/store/modules/user'
import * as m from '@/api/model'

@Component({})
export default class MyEvaluation extends Vue {
  data:m.CourseClass[] = []
  total = 0
  loading = true
  permission: boolean = false
  semesterList:m.Semester[] = []
  showDialog = false

  statusOption = [{
    value: -1,
    label: '课程评价状态'
  }, {
    value: -2,
    label: '已评价'
  }, {
    value: 0,
    label: '待开始'
  }, {
    value: 1,
    label: '进行中'
  }, {
    value: 2,
    label: '已结束'
  }]

  timeOption = [{
    value: -1,
    label: '课程评价更新时间'
  }, {
    value: 0,
    label: '过去一周内'
  }, {
    value: 1,
    label: '过去一个月内'
  }, {
    value: 2,
    label: '过去一年内'
  }]

  queryOptions = {
    name: '',
    status: -1,
    timeOrder: -1,
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
    const res = await this.api.getMyCourseEvaluation(this.queryOptions)
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
        this.requestData()
      }
    }
  }

  async handleLoadMore() {
    this.querySemesterOption.page++
    this.querySemesterList()
  }

  async handleStart(courseEvaluationId:number) {
    const res = await this.api.startEvaluation(courseEvaluationId)
    if (res.code === 0) {
      this.$router.push(`/my-evaluation/${courseEvaluationId}/evaluation_test`)
    }
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

</style>
