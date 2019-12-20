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
      <el-button
        plain
        type="primary"
        @click="showCheckbox=!showCheckbox"
      >
        多选
      </el-button>
      <el-button
        plain
        type="primary"
        icon="el-icon-plus"
        style="margin-right:32px"
        @click="handleCreate"
      >
        毕业要求
      </el-button>
      <el-form-item
        prop="no"
      >
        <el-input
          v-model="queryOptions.no"
          placeholder="请输入毕业要求代码"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        prop="major"
      >
        <el-autocomplete
          v-model="queryOptions.major"
          class="inline-input"
          :fetch-suggestions="queryMajorList"
          placeholder="请输入专业名称"
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
      <el-button
        v-if="showCheckbox"
        style="float:right"
        type="danger"
        @click="handleBatchDelete"
      >
        批量删除
      </el-button>
      <el-button
        style="margin-right:10px; float:right"
        type="primary"
        @click="showExcelDialog=true"
      >
        批量导入毕业要求
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
        label="毕业要求代码"
        prop="no"
      />
      <el-table-column
        align="center"
        prop="content"
        label="描述"
      >
        <template slot-scope="scope">
          <text-view :value="scope.row.content|string2delta" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="major"
        label="专业"
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
      :title="`${graduationDemand.id ? '编辑' : '添加'}毕业要求`"
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
          prop="no"
          label="毕业要求代码"
        >
          <el-input
            v-model="editForm.no"
            placeholder="请输入毕业要求代码"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="majorId"
          label="专业"
        >
          <el-select
            v-model="editForm.majorId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择专业"
            :remote-method="queryMajorSelectList"
            :loading="loading"
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
          label="毕业要求描述"
          prop="content"
        >
          <text-editor
            ref="title"
            v-model="editForm.content"
            placeholder="请输入毕业要求描述"
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
      action="/graduationDemand/batchSave"
      :show.sync="showExcelDialog"
      @requestData="requestData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'
import { Quill } from 'quill'
import { string2delta, deltaToString } from '@/utils/quill'
import { deepcopy } from '../../utils'

@Component({})
export default class GraduationDemand extends Vue {
  data:m.GraduationDemand[] = []
  total = 0
  loading = true
  editForm:m.CreateGraduationDemandForm={} as any
  graduationDemand: m.GraduationDemand = {} as any
  showDialog = false
  showCheckbox = false
  selectGraduationDemandId:number[] = []
  showExcelDialog=false
  majorList: m.Major[] = []

  queryOptions = {
    no: '',
    content: '',
    page: 1,
    pageSize: 20
  }

  rules = {
    majorId: [{ required: true, message: '专业不能为空', trigger: 'blur' }],
    no: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
  };

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.queryMajorSelectList('')
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryGraduationDemand(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.graduationDemand = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      no: '',
      majorId: undefined,
      content: ''
    }
  }

  handleEdit(graduationDemand: m.GraduationDemand) {
    this.graduationDemand = graduationDemand
    Object.assign(this.editForm, {
      no: graduationDemand.no,
      content: graduationDemand.content,
      majorId: graduationDemand.majorId
    })
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.graduationDemand.id) {
          const res = await this.api.putGraduationDemand(this.graduationDemand.id, this.editForm)
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
          const res = await this.api.createGraduationDemand(this.editForm)
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

  handleDelete(graduationDemand: m.GraduationDemand) {
    this.$confirm(`确定删除${graduationDemand.no}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const resp = await this.api.deleteGraduationDemand(graduationDemand.id)
      if (resp.status === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.GraduationDemand) => e.id !== graduationDemand.id)
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

  async queryMajorSelectList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      sno: query
    }
    const res = await this.api.queryMajor(option)
    if (res.status === 0 && res.data.list.length > 0) {
      this.majorList = res.data.list
    }
  }

  handleSelect(select:m.GraduationDemand[]) {
    this.selectGraduationDemandId = select.map((item:m.GraduationDemand) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectGraduationDemandId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const resp = await this.api.batchDeleteGraduationDemand(this.selectGraduationDemandId)
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
