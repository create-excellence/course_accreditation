<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="courseName"
      >
        <el-input
          v-model="queryOptions.courseName"
          placeholder="请输入课程名称"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item
        prop="graduationPointContent"
      >
        <el-input
          v-model="queryOptions.graduationPointContent"
          placeholder="请输入指标点内容"
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          支撑课程
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
      <el-button
        @click="showExcelDialog=true"
      >
        批量导入支撑课程
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
        label="指标点编号"
        prop="graduationPointNo"
      />
      <el-table-column
        align="center"
        label="指标点内容"
        prop="graduationPointContent"
      />
      <el-table-column
        align="center"
        label="课程名称"
        prop="courseName"
      />
      <el-table-column
        align="center"
        label="课程代码"
        prop="courseCode"
      />

      <el-table-column
        align="center"
        label="权值"
        prop="weight"
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
      :title="`${supportingCourse.id ? '编辑' : '添加'}支撑课程`"
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
          prop="courseId"
          label="课程"
        >
          <el-select
            v-model="editForm.courseId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择课程"
            :remote-method="queryCourseList"
            :loading="loading"
          >
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.code+item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="graduationPointId"
          label="毕业要求指标点"
        >
          <el-select
            v-model="editForm.graduationPointId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择指标点编号"
            :remote-method="queryGraduationPointList"
            :loading="loading"
          >
            <el-option
              v-for="item in graduationPointList"
              :key="item.id"
              :label="item.no"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="weight"
          label="权值"
        >
          <el-input-number
            v-model="editForm.weight"
            placeholder="请输入权值"
            :min="0"
            :max="100"
            :precision="1"
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
    <excel-dialog
      action="/supporting-course/batchSave"
      :show.sync="showExcelDialog"
      download="支撑课程导入模板.xls"
      @requestData="requestData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class SupportingCourse extends Vue {
  data:m.SupportingCourse[] = []
  total = 0
  loading = true
  supportingCourse: m.SupportingCourse = {} as any
  showDialog = false
  editForm:m.CreateSupportingCourseForm={} as any
  showCheckbox = false
  selectSupportingCourseId:number[] = []
  showExcelDialog=false
  courseList:m.Course[] =[]
  graduationPointList:m.GraduationPoint[]=[]

  queryOptions = {
    courseName: '',
    graduationPointContent: '',
    page: 1,
    pageSize: 20
  }

  rules={
    graduationPointId: [{ required: true, message: '毕业指标点不能为空', trigger: 'blur' }],
    courseId: [{ required: true, message: '课程不能为空', trigger: 'blur' }],
    weight: [{ required: true, message: '权值不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.queryCourseList('')
    this.queryGraduationPointList('')
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.querySupportingCourse(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.supportingCourse = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      graduationPointId: undefined,
      courseId: undefined,
      weight: 0
    }
  }

  handleEdit(supportingCourse: m.SupportingCourse) {
    this.supportingCourse = supportingCourse
    this.editForm = {
      graduationPointId: supportingCourse.graduationPointId,
      courseId: supportingCourse.courseId,
      weight: supportingCourse.weight
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.supportingCourse.id) {
          const res = await this.api.putSupportingCourse(this.supportingCourse.id, this.editForm)
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
          const res = await this.api.createSupportingCourse(this.editForm)
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

  handleDelete(supportingCourse: m.SupportingCourse) {
    this.$confirm(`确定删除这条信息吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteSupportingCourse(supportingCourse.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.SupportingCourse) => e.id !== supportingCourse.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async queryCourseList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryCourse(option)
    if (res.code === 0) {
      this.courseList = res.data.list
    }
  }

  async queryGraduationPointList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryGraduationPoint(option)
    if (res.code === 0) {
      this.graduationPointList = res.data.list
    }
  }

  handleSelect(select:m.SupportingCourse[]) {
    this.selectSupportingCourseId = select.map((item:m.SupportingCourse) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectSupportingCourseId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteSupportingCourse(this.selectSupportingCourseId)
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
