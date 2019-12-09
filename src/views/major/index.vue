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
          :fetch-suggestions="queryMajorList"
          placeholder="请输入专业名称"
        />
      </el-form-item>
      <el-form-item
        prop="code"
      >
        <el-input
          v-model="queryOptions.code"
          placeholder="请输入专业代码"
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
          专业
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
        批量导入专业
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
      :title="`${major.id ? '编辑' : '添加'}专业`"
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
      action="/major/batchSave"
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
export default class Major extends Vue {
  data:m.Major[] = []
  total = 0
  loading = true
  major: m.Major = {} as any
  showDialog = false
  editForm:m.CreateMajorForm={} as any
  showCheckbox = false
  selectMajorId:number[] = []
  showExcelDialog=false

  queryOptions = {
    name: '',
    code: '',
    page: 1,
    pageSize: 20
  }

  rules={
    name: [{ required: true, message: '专业名称不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '专业代码不能为空', trigger: 'blur' }]
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
    const res = await this.api.queryMajor(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.major = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      name: '',
      code: ''
    }
  }

  handleEdit(major: m.Major) {
    this.major = major
    this.editForm = {
      code: major.code,
      name: major.name
    }
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.major.id) {
          const res = await this.api.putMajor(this.major.id, this.editForm)
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
          const res = await this.api.createMajor(this.editForm)
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

  handleDelete(major: m.Major) {
    this.$confirm(`确定删除${major.name}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const resp = await this.api.deleteMajor(major.id)
      if (resp.status === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.Major) => e.id !== major.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async queryMajorList(query: string, cb:any) {
    // cb为搜索后的回调钩子
    const option = {
      page: 1,
      pageSize: 20,
      name: query
    }
    const res = await this.api.queryMajor(option)
    if (res.status === 0) {
      let majorList = res.data.list.map((item:m.Major) => {
        return { value: item.name }
      })
      cb(majorList)
    }
  }

  handleSelect(select:m.Major[]) {
    this.selectMajorId = select.map((item:m.Major) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectMajorId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const resp = await this.api.batchDeleteMajor(this.selectMajorId)
      if (resp.status === 0) {
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
