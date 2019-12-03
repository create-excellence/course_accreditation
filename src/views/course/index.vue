<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="name"
      >
        <el-input
          v-model="queryOptions.name"
          placeholder="校区名称"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        prop="code"
      >
        <el-input
          v-model="queryOptions.code"
          placeholder="校区代码"
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          校区
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        align="center"
        label="课程名称"
        prop="name"
      />
      <el-table-column
        align="center"
        label="课程代码"
        prop="code"
      />
      <el-table-column
        align="center"
        prop="credit"
        label="学分"
      />
      <el-table-column
        align="center"
        prop="nature"
        label="课程性质"
      />
      <el-table-column
        align="center"
        prop="createTime"
        label="添加时间"
      />
      <el-table-column
        align="center"
        prop="updateTime"
        label="更新时间"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >
            删除
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

    <el-dialog
      :title="`${course.id ? '编辑' : '添加'}课程`"
      :visible.sync="showDialog"
      @close="showDialog = false"
    >
      <el-form
        v-if="showDialog"
        ref="editForm"
        :model="editForm"
        :rules="rules"
      >
        <el-form-item
          prop="name"
          label="课程名称"
        >
          <el-input
            v-model="editForm.name"
            placeholder="请输入课程名称"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="code"
          label="课程代码"
        >
          <el-input
            v-model="editForm.code"
            placeholder="请输入课程代码"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          label="课程学分"
        >
          <el-input
            v-model.number="editForm.credit"
            type="number"
            placeholder="请输入课程学分"
          />
        </el-form-item>
        <el-form-item
          prop="nature"
          label="课程性质"
        >
          <el-input
            v-model="editForm.nature"
            placeholder="请输入课程性质"
            maxlength="10"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showDialog = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'
import * as api from '@/api/api'

@Component({})
export default class Course extends Vue {
  data:m.Course[] = []
  total = 0
  loading = true
  course: m.Course = {} as any
  showDialog = false
  editForm:m.CreateCourseForm={} as any

  queryOptions = {
    name: '',
    code: '',
    page: 1,
    pageSize: 20
  }

  rules={
    name: [{ required: true, message: '校区名称不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '校区代码不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.$api.getCourseList({
      page: 1,
      pageSize: 20
    })
    this.data = res.data.records
    this.loading = false
  }

  handleCreate() {
    this.course = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      name: '',
      code: '',
      credit: 0,
      nature: ''
    }
  }

  handleEdit(course: m.Course) {
    this.course = course
    this.editForm = {
      code: course.code,
      name: course.name,
      credit: course.credit,
      nature: course.nature
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.course.id) {
          const res = await api.putCampus({ id: this.course.id, body: this.editForm })
          if (res.code === 0) {
            this.resetForm()
            this.showDialog = false
            this.requestData()
          }
        } else {
          const res = await api.postCampus({ body: this.editForm })
          if (res.code === 0) {
            (this.$refs['editForm'] as ElForm).resetFields()
            this.showDialog = false
            this.requestData()
          }
        }
      } else {
        return false
      }
    })
  }

  handleDelete(course: m.Course) {
    this.$confirm(`确定删除${course.name}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const resp = await api.deleteCampus({ id: course.id })
      if (resp.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.Course) => e.id !== course.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }
}
</script>
