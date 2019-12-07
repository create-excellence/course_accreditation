<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="sno"
      >
        <el-select
          v-model="queryOptions.sno"
          filterable
          remote
          reserve-keyword
          placeholder="请输入学生学号"
          :remote-method="queryStudentList"
          :loading="loading"
        >
          <el-option
            v-for="item in studentSearch"
            :key="item.id"
            :label="item.sno"
            :value="item.sno"
          />
        </el-select>
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          学生
        </el-button>
      </el-form-item>
      <el-button
        type="primary"
        plain
        @click="showExcelDialog=true"
      >
        批量导入学生
      </el-button>
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
        label="学生学号"
        prop="sno"
      />
      <el-table-column
        align="center"
        label="学生姓名"
        prop="name"
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
      <el-table-column
        align="center"
        label="状态"
        prop="status"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status===0"
            prop="status"
            type="success"
            size="mini"
            plain
          >
            正常
          </el-button>
          <el-button
            v-else-if="scope.row.status===1"
            type="danger"
            size="mini"
            plain
          >
            异常
          </el-button>
          <el-button
            v-else
            type="warning"
            size="mini"
            plain
          >
            未知
          </el-button>
        </template>
      </el-table-column>
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
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            style="marginTop:3px"
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
      :title="`${student.id ? '编辑' : '添加'}学生`"
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
          prop="sno"
          label="学生学号"
        >
          <el-input
            v-model="editForm.sno"
            placeholder="请输入学生学号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="name"
          label="学生姓名"
        >
          <el-input
            v-model="editForm.name"
            placeholder="请输入学生姓名"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="sex"
          label="性别"
        >
          <el-select
            v-model="editForm.sex"
            placeholder="请选择学生性别"
          >
            <el-option
              label="男"
              value="男"
            />
            <el-option
              label="女"
              value="女"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="grade"
          label="年级"
        >
          <el-input
            v-model="editForm.grade"
            placeholder="请输入年级"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="majorId"
          label="专业"
        >
          <el-select
            v-model="editForm.majorId"
            placeholder="请选择专业"
          >
            <el-option
              v-for="item in majorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="status"
          label="状态"
        >
          <el-select
            v-model="editForm.status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
    <excel-dialog
      action="/student/batchSave"
      :show.sync="showExcelDialog"
      @requestData="requestData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'
import * as api from '@/api/api'

@Component({})
export default class Student extends Vue {
  data:m.Student[] = []
  total = 0
  loading = true
  student: m.Student = {} as any
  showDialog = false
  majorList:m.Major[] = []
  studentSearch:m.Student[] = []
  studentList:m.Student[] = []
  editForm:m.CreateStudentForm={} as any

  showExcelDialog=false

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
    page: 1,
    pageSize: 20
  }

  rules={
    name: [{ required: true, message: '学生姓名不能为空', trigger: 'blur' }],
    sno: [{ required: true, message: '学生学号不能为空', trigger: 'blur' }],
    grade: [{ required: true, message: '学生学号不能为空', trigger: 'blur' }],
    majorId: [{ required: true, message: '学生专业不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.queryMajorList('')
    this.queryStudentList('')
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

  handleCreate() {
    this.student = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      sno: '',
      name: '',
      sex: '',
      grade: '',
      majorId: undefined,
      status: undefined
    }
  }

  handleEdit(student: m.Student) {
    this.student = student
    this.editForm = {
      sno: student.sno,
      name: student.name,
      sex: student.sex,
      grade: student.grade,
      majorId: student.majorId,
      status: student.status
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.student.id) {
          const res = await this.api.putStudent(this.student.id, this.editForm)
          if (res.status === 0) {
            this.resetForm()
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.requestData()
          }
        } else {
          const res = await this.api.createStudent(this.editForm)
          if (res.status === 0) {
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

  handleDelete(student: m.Student) {
    this.$confirm(`确定删除${student.name}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const resp = await this.api.deleteStudent(student.id!)
      if (resp.status === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.Student) => e.id !== student.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async queryMajorList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await api.queryMajor(option)
    if (res.status === 0 && res.data.list.length > 0) {
      this.majorList = res.data.list
    }
  }

  async queryStudentList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      sno: query
    }
    const res = await api.queryStudent(option)
    if (res.status === 0 && res.data.list.length > 0) {
      this.studentSearch = res.data.list
      if (query !== undefined && query !== '') {
        this.studentSearch = [Object.assign({}, this.studentSearch[0]), ...this.studentSearch]
        this.studentSearch[0].sno = query
        this.studentSearch[0].id = -1 * Math.floor(Math.random() * 99999)
      }
    }
  }
}
</script>
