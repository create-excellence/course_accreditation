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
        问卷
      </el-button>
      <el-form-item
        prop="name"
      >
        <el-input
          v-model="queryOptions.name"
          placeholder="请输入问卷名称"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        prop="courseClass"
      >
        <el-autocomplete
          v-model="queryOptions.courseClass"
          class="inline-input"
          :fetch-suggestions="queryCourseClassList"
          placeholder="请输入课程班级名称"
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
        批量导入问卷
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
        label="问卷名称"
        prop="name"
      />
      <el-table-column
        align="center"
        prop="totalScore"
        label="分数"
      />
      <el-table-column
        align="center"
        prop="courseClassId"
        label="班级"
      />
      <el-table-column
        align="center"
        prop="describes"
        label="描述"
      >
        <template slot-scope="scope">
          <text-view :value="scope.row.describes|string2delta" />
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
      >
        <template slot-scope="scope">
          <el-button
            style="margin-bottom: 10px"
            size="mini"
            type="primary"
            @click="$router.push(`/questionnaire/${scope.row.id}/course-target`)"
          >
            查看问卷
          </el-button><br>
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
      :title="`${questionnaire.id ? '编辑' : '添加'}问卷`"
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
          label="问卷名称"
        >
          <el-input
            v-model="editForm.name"
            placeholder="请输入问卷名称"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="courseClassId"
          label="班级"
        >
          <el-select
            v-model="editForm.courseClassId"
            filterable
            remote
            reserve-keyword
            placeholder="请选择班级"
            :remote-method="queryCourseClassList"
            :loading="loading"
          >
            <el-option
              v-for="item in courseClassList"
              :key="item.id"
              :label="item.no"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="totalScore"
          label="问卷总分"
        >
          <el-input
            v-model="editForm.totalScore"
            placeholder="请输入问卷总分"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          label="问卷描述"
          prop="describes"
        >
          <text-editor
            ref="title"
            v-model="editForm.describes"
            placeholder="请输入问卷描述"
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
      action="/questionnaire/batchSave"
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
export default class Questionnaire extends Vue {
  data:m.Questionnaire[] = []
  total = 0
  loading = true
  editForm:m.CreateQuestionnaireForm={} as any
  questionnaire: m.Questionnaire = {} as any
  showDialog = false
  showCheckbox = false
  selectQuestionnaireId:number[] = []
  showExcelDialog=false
  courseClassList: m.CourseClass[] = []

  queryOptions = {
    name: '',
    describes: '',
    page: 1,
    pageSize: 20
  }

  rules = {
    courseClassId: [{ required: true, message: '班级不能为空', trigger: 'blur' }],
    name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
  };

  created() {
    this.init()
  }

  async init() {
    this.requestData()
    this.queryCourseClassSelectList('')
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryQuestionnaire(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.questionnaire = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      name: '',
      courseClassId: undefined,
      totalScore: undefined,
      describes: ''
    }
  }

  handleEdit(questionnaire: m.Questionnaire) {
    this.questionnaire = questionnaire
    Object.assign(this.editForm, {
      name: questionnaire.name,
      totalScore: questionnaire.totalScore,
      describes: questionnaire.describes,
      courseClassId: questionnaire.courseClassId
    })
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.questionnaire.id) {
          const res = await this.api.putQuestionnaire(this.questionnaire.id, this.editForm)
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
          const res = await this.api.createQuestionnaire(this.editForm)
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

  handleDelete(questionnaire: m.Questionnaire) {
    this.$confirm(`确定删除${questionnaire.name}吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteQuestionnaire(questionnaire.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.Questionnaire) => e.id !== questionnaire.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  async queryCourseClassList(query: string, cb:any) {
    // cb为搜索后的回调钩子
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryCourseClass(option)
    if (res.code === 0) {
      let CourseClassList = res.data.list.map((item:m.CourseClass) => {
        return { value: item.no }
      })
      cb(CourseClassList)
    }
  }

  async queryCourseClassSelectList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryCourseClass(option)
    if (res.code === 0 && res.data.list.length > 0) {
      this.courseClassList = res.data.list
    }
  }

  handleSelect(select:m.Questionnaire[]) {
    this.selectQuestionnaireId = select.map((item:m.Questionnaire) => {
      return item.id
    })
  }

  handleBatchDelete() {
    if (this.selectQuestionnaireId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteQuestionnaire(this.selectQuestionnaireId)
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
