<template>
  <div
    style="padding-bottom:100px"
    class="app-container"
  >
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="name"
      >
        <el-autocomplete
          v-model="queryOptions.name"
          :fetch-suggestions="queryCourseList"
          placeholder="请输入课程名称"
        />
      </el-form-item>
      <el-form-item
        prop="code"
      >
        <el-input
          v-model="queryOptions.code"
          placeholder="请输入课程代码"
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
          课程
        </el-button>
      </el-form-item>
      <el-button
        type="primary"
        plain
        @click="showCheckbox=!showCheckbox"
      >
        多选
      </el-button>
      <el-button
        v-if="showCheckbox"
        type="danger"
        @click="handleBatchDelete"
      >
        批量删除
      </el-button>
    </el-form>

    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelect"
    >
      <el-table-column
        v-if="showCheckbox"
        type="selection"
        width="55"
      />
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
      style="position:fixed; bottom:0px;"
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
        label-position="top"
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
          prop="credit"
        >
          <el-input-number
            v-model="editForm.credit"
            :min="0"
            :precision="1"
            :step="0.5"
            :max="10"
          />
        </el-form-item>
        <el-form-item
          prop="nature"
          label="课程性质"
        >
          <el-select
            v-model="editForm.nature"
            placeholder="请选择课程性质"
          >
            <el-option
              label="专业必修"
              value="专业必修"
            />
            <el-option
              label="专业选修"
              value="专业选修"
            />
          </el-select>
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

@Component({})
export default class Course extends Vue {
  data:m.Course[] = []
  total = 0
  loading = true
  course: m.Course = {} as any
  showDialog = false
  editForm:m.CreateCourseForm={} as any
  showCheckbox = false
  selectCourseId:number[] = []

  queryOptions = {
    name: '',
    code: '',
    courseId: -1,
    page: 1,
    pageSize: 20
  }

  rules={
    name: [{ required: true, message: '课程名称不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '课程代码不能为空', trigger: 'blur' }],
    credit: [{ required: true, message: '课程学分不能为空', trigger: 'blur' }],
    nature: [{ required: true, message: '课程性质不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    let courseId = Number(this.$route.params.courseId)
    this.queryOptions.courseId = courseId
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryCourse(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
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
      credit: 2.0,
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
          const res = await this.api.putCourse(this.course.id, this.editForm)
          if (res.code === 0) {
            this.resetForm()
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.requestData()
          }
        } else {
          const res = await this.api.createCourse(this.editForm)
          if (res.code === 0) {
            (this.$refs['editForm'] as ElForm).resetFields()
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
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
      const res = await this.api.deleteCourse(course.id)
      if (res.code === 0) {
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

  async queryCourseList(query: string, cb:any) {
    // cb为搜索后的回调钩子
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryCourse(option)
    if (res.code === 0) {
      let courseList = res.data.list.map((item:m.Course) => {
        return { value: item.name }
      })
      cb(courseList)
    }
  }
  handleSelect(select:m.Course[]) {
    this.selectCourseId = select.map((item:m.Course) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectCourseId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteCourse(this.selectCourseId)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.requestData()
      }
    })
  }
}
</script>
