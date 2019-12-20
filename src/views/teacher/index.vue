<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="jno"
      >
        <el-autocomplete
          v-model="queryOptions.jno"
          class="inline-input"
          :fetch-suggestions="queryTeacherList"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item
        prop="title"
      >
        <el-input
          v-model="queryOptions.title"
          placeholder="职称"
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
          教师
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
        type="primary"
        plain
        @click="showExcelDialog=true"
      >
        批量导入教师
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
        label="工号"
        prop="jno"
      />
      <!-- <el-table-column
        align="center"
        label="角色"
        prop="code"
      /> -->
      <el-table-column
        align="center"
        label="姓名"
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
            v-else-if="scope.row.sex==='女'"
            type="danger"
          >
            女
          </el-tag>
          <el-tag
            v-else
            type="danger"
          >
            未知
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="职称"
        prop="title"
      />
      <el-table-column
        align="center"
        prop="birth"
        label="出生日期"
      />
      <el-table-column
        align="center"
        prop="graduateSchool"
        label="毕业学校"
      />
      <el-table-column
        align="center"
        prop="graduateMajor"
        label="毕业专业"
      />
      <el-table-column
        align="center"
        prop="loginTime"
        label="上次登录时间"
      />
      <el-table-column
        align="center"
        label="操作"
        width="200"
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
      :title="`${teacher.id ? '编辑' : '添加'}教师`"
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
          prop="jno"
          label="工号"
        >
          <el-input
            v-model="editForm.jno"
            placeholder="请输入工号"
            maxlength="20"
          />
        </el-form-item>
        <!-- <el-form-item
          prop="role"
          label="角色"
        >
          <el-select
            v-model="editForm.role"
            placeholder="请选择教师角色"
          >
            <el-option
              label="admin"
              value="admin"
            />
            <el-option
              label="teacher"
              value="teacher"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item
          prop="name"
          label="姓名"
        >
          <el-input
            v-model="editForm.name"
            placeholder="请输入姓名"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="sex"
          label="性别"
        >
          <el-select
            v-model="editForm.sex"
            placeholder="请选择教师性别"
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
          prop="title"
          label="职称"
        >
          <el-select
            v-model="editForm.title"
            placeholder="请选择教师职称"
          >
            <el-option
              label="教授"
              value="教授"
            />
            <el-option
              label="副教授"
              value="副教授"
            />
            <el-option
              label="讲师"
              value="讲师"
            />
            <el-option
              label="助教"
              value="助教"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="出生日期"
          label="birth"
        >
          <el-date-picker
            v-model="editForm.birth"
            type="datetime"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          prop="graduateSchool"
          label="毕业学校"
        >
          <el-input
            v-model="editForm.graduateSchool"
            placeholder="请输入毕业学校"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="graduateMajor"
          label="毕业专业"
        >
          <el-input
            v-model="editForm.graduateMajor"
            placeholder="请输入毕业专业"
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
    <excel-dialog
      action="/teacher/batchSave"
      :show.sync="showExcelDialog"
      @requestData="requestData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'
@Component({})
export default class Teacher extends Vue {
  data:m.Teacher[] = []
  total = 0
  loading = true
  teacher: m.Teacher = {} as any
  showDialog = false
  editForm:m.CreateTeacherForm={} as any
  showCheckbox = false
  selectTeacherId:number[] = []

  showExcelDialog=false

  queryOptions = {
    title: '',
    jno: '',
    page: 1,
    pageSize: 20
  }

  rules={
    jno: [{ required: true, message: '教师工号不能为空', trigger: 'blur' }],
    // role: [{ required: true, message: '教师角色不能为空', trigger: 'blur' }],
    name: [{ required: true, message: '教师姓名不能为空', trigger: 'blur' }],
    title: [{ required: true, message: '教师职称不能为空', trigger: 'blur' }]
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
    const res = await this.api.queryTeacher(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.teacher = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      // role: '',
      title: '',
      jno: '',
      name: '',
      birth: '',
      graduateSchool: '',
      graduateMajor: ''
    }
  }

  handleEdit(teacher: m.Teacher) {
    this.teacher = teacher
    this.editForm = {
      // role: teacher.role,
      name: teacher.name,
      title: teacher.title,
      jno: teacher.jno,
      birth: teacher.birth,
      graduateSchool: teacher.graduateSchool,
      graduateMajor: teacher.graduateMajor
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.teacher.id) {
          const res = await this.api.putTeacher(this.teacher.id, this.editForm)
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
          const res = await this.api.createTeacher(this.editForm)
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

  handleDelete(teacher: m.Teacher) {
    this.$confirm(`确定删除${teacher.name}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteTeacher(teacher.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.Teacher) => e.id !== teacher.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async queryTeacherList(query: string, callback: any) {
    const option = {
      page: 1,
      pageSize: 20,
      jno: query
    }
    const res = await this.api.queryTeacher(option)
    let list = [{}]
    if (res.code === 0 && res.data.list.length > 0) {
      list = res.data.list
      list.forEach((element:any) => {
        element.value = element.jno
      })
    }
    callback(list)
  }

  handleSelect(select:m.Teacher[]) {
    this.selectTeacherId = select.map((item:m.Teacher) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectTeacherId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteTeacher(this.selectTeacherId)
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
