<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :inline="true"
      :model="queryOptions"
      @submit.native.prevent="handleFilter"
    >
      <el-form-item
        prop="title"
      >
        <el-input
          v-model="queryOptions.title"
          placeholder="请输入问题"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        prop="options"
      >
        <el-input
          v-model="queryOptions.options"
          placeholder="请输入选项"
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
          题目
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
        type="info"
        float:right
        @click="showPreview = true"
      >
        预览
      </el-button>
    </el-form>

    <el-table
      :key="tableChange"
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
        prop="sequence"
        label="序号"
      />
      <el-table-column
        align="center"
        label="问题"
        prop="title"
      />
      <el-table-column
        align="center"
        label="选项"
        prop="optionsList"
      >
        <template slot-scope="scope">
          <text-view :value="scope.row.optionsList|formatOptionList" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="描述"
        prop="describes"
      />
      <el-table-column
        align="center"
        prop="totalScore"
        label="总分"
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
<<<<<<< HEAD

=======
>>>>>>> abe9ae523e4941c2d635ba4c056bd106450eb0ca
    <div v-if="showDialog">
      <el-dialog
        :title="`${courseTarget.id ? '编辑' : '添加'}题目`"
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
            prop="sequence"
            label="序号"
          >
            <el-input
              v-model="editForm.sequence"
              placeholder="请输入序号"
              maxlength="10"
            />
          </el-form-item>
          <el-form-item
            prop="title"
            label="题目"
          >
            <el-input
              v-model="editForm.title"
              placeholder="请输入题目"
              maxlength="10"
            />
          </el-form-item>
          <el-form-item
            prop="totalScore"
            label="总分"
          >
            <el-input
              v-model="editForm.totalScore"
              placeholder="请输入总分"
              maxlength="10"
            />
          </el-form-item>
          <el-form-item
            prop="optionsList"
          >
            <el-row>
              <el-col :span="4">
                <label>选项</label>
              </el-col>
              <el-col :span="12">
                <label>内容</label>
<<<<<<< HEAD
              </el-col>
              <el-col :span="4">
                <label>分值</label>
              </el-col>
=======
              </el-col>
              <el-col :span="4">
                <label>分值</label>
              </el-col>
>>>>>>> abe9ae523e4941c2d635ba4c056bd106450eb0ca
            </el-row>
            <el-row>
              <el-form-item
                v-for="(item,index) in optionsList"
                :key="item.prefix"
              >
                <el-col :span="4">
                  <el-input v-model="item.prefix" />
                </el-col>
                <el-col :span="12">
                  <el-input v-model="item.content" />
                </el-col>
                <el-col :span="4">
                  <el-input v-model="item.score" />
                </el-col>
                <el-col :span="4">
                  <el-button @click="deleteOptions(index)">
                    删除选项
                  </el-button>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form-item>
          <div>
            <el-button @click="addOptions">
              增加选项
            </el-button>
          </div>
          <el-form-item
            prop="pointId"
            label="指标点"
<<<<<<< HEAD
          >
            <el-select
              v-model="editForm.pointId"
              filterable
              remote
              reserve-keyword
              placeholder="请选择指标点"
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
            prop="describes"
            label="描述"
          >
=======
          >
            <el-select
              v-model="editForm.pointId"
              filterable
              remote
              reserve-keyword
              placeholder="请选择指标点"
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
            prop="describes"
            label="描述"
          >
>>>>>>> abe9ae523e4941c2d635ba4c056bd106450eb0ca
            <el-input
              v-model="editForm.describes"
              placeholder="请输入描述"
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
    <el-dialog
      title="预览"
      :visible.sync="showPreview"
      @close="showPreview = false"
    >
      <div
        style="height: 75px;
                width: 300px;
                margin: auto;"
      >
        <span style="font-size:30px;">{{ name }}【自我评价】</span>
      </div>
      <el-divider />
      <div
        v-for="item in data"
        :key="item.id"
      >
        <div
          style="height: 40px;"
        >
          <span style="font-size:27px;">{{ item.sequence }}、{{ item.title }}({{ item.totalScore }}分)</span>
        </div>
        <div>
          <el-row>
            <span
              v-for="option in item.optionsList"
              :key="option.prefix"
            >
              <el-col
                :span="12"
                style="font-size:20px;"
              >
                {{ option.prefix }}、{{ option.content }}
              </el-col>
            </span>
          </el-row>
        </div>
        <el-divider />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
// eslint-disable-next-line import/no-duplicates
import * as m from '@/api/model'
// eslint-disable-next-line import/no-duplicates
import { OptionsList } from '@/api/model'

@Component({})
export default class CourseTarget extends Vue {
  data:m.CourseTarget[] = []
  showPreview = false
  total = 0
  loading = true
  courseTarget: m.CourseTarget = {} as any
  showDialog = false
  tableChange = true
  editForm:m.CreateCourseTargetForm={} as any
  showCheckbox = false
  selectCourseTargetId:number[] = []
  showExcelDialog=false
  questionnaireList: m.Questionnaire[] = []
  graduationPointList: m.GraduationPoint[] = []
  optionsList :m.OptionsList[]= []
  newOptionsList :m.OptionsList[]=
  [{ prefix: 'a', content: '', score: '' },
    { prefix: 'b', content: '', score: '' },
    { prefix: 'c', content: '', score: '' }]
  name : String = ''

  queryOptions = {
    title: '',
    option: '',
    questionnaireId: -1,
    page: 1,
    pageSize: 20
  }

  rules={
    title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
    option: [{ required: true, message: '选项不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

  @Watch('data')
  watchData() {
    this.tableChange = !this.tableChange
  }

  async init() {
    let questionnaireId = Number(this.$route.params.questionnaireId)
    this.queryOptions.questionnaireId = questionnaireId
    let res = await this.api.getQuestionnaire(questionnaireId)
    this.queryGraduationPointSelectList('')
    if (res.code === 0) {
      this.questionnaireList.push(res.data)
    }
    if (this.questionnaireList[0].name !== undefined) {
      this.name = this.questionnaireList[0].name
    }
    this.requestData()
  }

  async queryGraduationPointList(query: string, cb:any) {
    // cb为搜索后的回调钩子
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryGraduationPoint(option)
    if (res.code === 0) {
      let GraduationPointList = res.data.list.map((item:m.GraduationPoint) => {
        return { value: item.no }
      })
      cb(GraduationPointList)
    }
  }

  async queryGraduationPointSelectList(query: string) {
    const option = {
      page: 1,
      pageSize: 20,
      no: query
    }
    const res = await this.api.queryGraduationPoint(option)
    if (res.code === 0 && res.data.list.length > 0) {
      this.graduationPointList = res.data.list
    }
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryCourseTarget(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  handleCreate() {
    this.optionsList = this.newOptionsList
    this.courseTarget = {} as any
    this.resetForm()
    this.showDialog = true
  }

  resetForm() {
    this.editForm = {
      title: '',
      questionnaireId: this.queryOptions.questionnaireId,
      options: ''
    }
  }

  handleEdit(courseTarget: m.CourseTarget) {
    console.log('this.optionsList start')
    console.log(courseTarget.optionsList)
    console.log(this.optionsList)
    this.courseTarget = courseTarget
    if (courseTarget.optionsList !== undefined) {
      this.optionsList = courseTarget.optionsList
    }
    console.log(this.optionsList)
    console.log('this.optionsList end')
    this.editForm = {
      title: courseTarget.title,
      pointId: courseTarget.pointId,
      questionnaireId: courseTarget.questionnaireId,
      options: courseTarget.options,
      sequence: courseTarget.sequence,
      totalScore: courseTarget.totalScore,
      describes: courseTarget.describes
    }
    this.editForm.options = courseTarget.options
    this.showDialog = true
  }

  handleSave() {
    (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
      if (valid) {
        if (this.courseTarget.id) {
          this.editForm.options = JSON.stringify(this.optionsList)
          const res = await this.api.putCourseTarget(this.courseTarget.id, this.editForm)
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
          this.editForm.options = JSON.stringify(this.optionsList)
          const res = await this.api.createCourseTarget(this.editForm)
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

  handleDelete(courseTarget: m.CourseTarget) {
    this.$confirm(`确定删除该题吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteCourseTarget(courseTarget.id)
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.data = this.data.filter((e: m.CourseTarget) => e.id !== courseTarget.id)
        if (this.total > 1) {
          this.total--
        } else {
          this.requestData()
        }
      }
    })
  }

  handleSelect(select:m.CourseTarget[]) {
    this.selectCourseTargetId = select.map((item:m.CourseTarget) => {
      return item.id
    })
  }

  addOptions() {
    let optionsList = this.optionsList
    let last = optionsList[optionsList.length - 1]
    let newLastPrefix = String.fromCharCode(last.prefix.charCodeAt() + 1)
    optionsList.push({ prefix: newLastPrefix, content: '', score: '' })
  }

  deleteOptions(index) {
    this.optionsList.splice(index, 1)
  }

  handleBatchDelete() {
    if (this.selectCourseTargetId.length < 1) {
      this.$message({
        type: 'warning',
        message: '请先选择要删除项'
      })
      return
    }
    this.$confirm(`确定要批量删除所选项吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.batchDeleteCourseTarget(this.selectCourseTargetId)
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
