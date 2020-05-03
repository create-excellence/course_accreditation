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
        <el-autocomplete
          v-model="queryOptions.name"
          :fetch-suggestions="querySemesterList"
          placeholder="请输入学期名称"
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
          学期
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
        批量导入学期
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
        label="学期名称"
        prop="name"
      />
      <el-table-column
        align="center"
        label="开始时间"
        prop="startTime"
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
      :title="`${semester.id ? '编辑' : '添加'}学期`"
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
          label="学期名称"
        >
          <el-input
            v-model="editForm.name"
            placeholder="请输入学期名称"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          prop="startTime"
          label="学期开始时间"
        >
          <el-date-picker
            v-model="editForm.startTime"
            type="datetime"
            placeholder="选择日期"
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
      action="/semester/batchSave"
      :show.sync="showExcelDialog"
      download="学期导入模板.xls"
      @requestData="requestData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class Semester extends Vue {
  data:m.Semester[] = []
  total = 0
  loading = true
  semester: m.Semester = {} as any
  showDialog = false
  editForm:m.CreateSemesterForm={} as any
  showCheckbox = false
  selectSemesterId:number[] = []
  showExcelDialog=false

  queryOptions = {
    name: '',
    page: 1,
    pageSize: 20
  }

  rules={
    name: [{ required: true, message: '学期名称不能为空', trigger: 'blur' }],
    startTime: [{ required: true, message: '开始时间不能为空', trigger: 'blur' }]
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
    const res = await this.api.querySemester(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.semester = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      name: '',
      startTime: ''
    }
  }

  handleEdit(semester: m.Semester) {
    this.semester = semester
    this.editForm = {
      name: semester.name
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.semester.id) {
          const res = await this.api.putSemester(this.semester.id, this.editForm)
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
          const res = await this.api.createSemester(this.editForm)
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

  handleDelete(semester: m.Semester) {
    this.$confirm(`确定删除${semester.name}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteSemester(semester.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.Semester) => e.id !== semester.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async querySemesterList(query: string, cb:any) {
    // cb为搜索后的回调钩子
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.querySemester(option)
    if (res.code === 0) {
      let semesterList = res.data.list.map((item:m.Semester) => {
        return { value: item.name }
      })
      cb(semesterList)
    }
  }

  handleSelect(select:m.Semester[]) {
    this.selectSemesterId = select.map((item:m.Semester) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectSemesterId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteSemester(this.selectSemesterId)
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
