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
          maxlength="20"
        />
      </el-form-item>
      <el-form-item
        prop="options"
      >
        <el-input
          v-model="queryOptions.options"
          placeholder="请输入选项"
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
          题目
        </el-button>

        <el-button
          type="info"
          float:right
          @click="showPreview = true"
        >
          预览
        </el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <div style="text-align:center;">
        <h1 style="font-size:30px;">
          {{ name }}
        </h1>
      </div>
    </el-card>
    <div
      v-for="item in data"
      :key="item.id"
      style="margin-top:15px;"
    >
      <el-card class="box-card">
        <div style="float:right;">
          <el-button-group style="margin-right:200px;">
            <el-tooltip
              content="编辑"
              placement="top"
              effect="light"
            >
              <el-button
                icon="el-icon-setting"
                @click="handleEdit(item)"
              />
            </el-tooltip>
            <el-tooltip
              content="向下移动"
              placement="top"
              effect="light"
            >
              <el-button
                icon="el-icon-bottom"
                @click="handlemove(item.id , 1)"
              />
            </el-tooltip>
            <el-tooltip
              content="向上移动"
              placement="top"
              effect="light"
            >
              <el-button
                icon="el-icon-top"
                @click="handlemove(item.id , 0)"
              />
            </el-tooltip>
            <el-tooltip
              content="复制"
              placement="top"
              effect="light"
            >
              <el-button
                icon="el-icon-document-copy"
                @click="handlecopy(item.id)"
              />
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
              effect="light"
            >
              <el-button
                icon="el-icon-delete"
                @click="handleDelete(item.id)"
              />
            </el-tooltip>
          </el-button-group>
        </div>
        <div style="font-size:18px;margin-left:200px;display:inline-block;">
          <span style="font-weight:bold;display:inline-block;">{{ item.sequence }}.</span><text-view
            style="font-size:18px;display:inline-block;height:30px;overflow:hidden;"
            :value="item.title|string2delta"
          />
        </div>

        <div style="margin-left:200px;">
          <div
            v-for="option in item.optionsList"
            :key="option.prefix"
            style="margin-top:20px;"
          >
            <el-radio
              v-model="item.optionsScore"
              :label="option.prefix"
              size="medium"
              style="font-size:30px;"
            >
              <span
                style="font-size:18px;"
              >{{ option.prefix }} . {{ option.content }}</span>
            </el-radio>
          </div>
        </div>
      </el-card>
    </div>

    <div v-if="showDialog">
      <el-dialog
        :title="`${courseTarget.id ? '编辑' : '添加'}题目`"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
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
            prop="title"
            label="题目"
          >
            <text-editor
              ref="title"
              v-model="editForm.title"
              placeholder="请输入题目"
            />
          </el-form-item>

          <el-form-item
            prop="pointId"
            label="指标点"
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
                :label="item.no+item.content"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            prop="optionsList"
          >
            <el-row>
              <el-col :span="1">
                <label>选项</label>
              </el-col>
              <el-col :span="17">
                <label>内容</label>
              </el-col>
              <el-col
                :span="2"
                :offset="1"
              >
                <label>分值</label>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item
                v-for="(item) in optionsList"
                :key="item.prefix"
                style="margin-bottom:10px;"
              >
                <el-col :span="1">
                  <label>&nbsp;{{ item.prefix }}</label>
                </el-col>
                <el-col :span="17">
                  <el-input
                    v-model="item.content"
                  />
                </el-col>
                <el-col
                  :span="2"
                  :offset="1"
                >
                  <el-input-number
                    v-model="item.score"
                    :min="0"
                    :max="10"
                  />
                </el-col>
              </el-form-item>
            </el-row>
          </el-form-item>

          <el-form-item
            prop="describes"
            label="描述"
          >
            <el-input
              v-model="editForm.describes"
              type="textarea"
              :rows="2"
              placeholder="请输入描述"
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
        v-for="(item) in data"
        :key="item.id"
      >
        <div style="margin-left:100px;">
          <span style="font-size:18px;">
            <span style="font-weight:bold;display:inline-block;">{{ item.sequence }}.</span><text-view
              style="font-size:18px;display:inline-block;height:30px;"
              :value="item.title|string2delta"
            /></span>

          <div
            v-for="option in item.optionsList"
            :key="option.prefix"
            style="margin-left:20px;"
          >
            <el-radio
              v-model="item.optionsScore"
              :label="option.prefix"
              size="medium"
              style="margin-top:15px;"
            >
              <span
                style="font-size:18px;"
              >  {{ option.prefix }} . {{ option.content }}</span>
            </el-radio>
          </div>
        </div>

        <el-divider />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { string2delta } from '@/utils/quill'
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
  name : String = ''
  questionnaireId:number=-1
  describes : string = ''

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
    this.questionnaireId = questionnaireId
    this.queryOptions.questionnaireId = questionnaireId
    let res = await this.api.getQuestionnaire(questionnaireId)
    this.queryGraduationPointSelectList()
    if (res.code === 0) {
      this.questionnaireList.push(res.data)
    }
    if (this.questionnaireList[0].name !== undefined) {
      this.name = this.questionnaireList[0].name
    }
    if (this.questionnaireList[0].describes !== undefined) {
      this.describes = this.questionnaireList[0].describes
    }
    this.requestData()
  }

  async queryGraduationPointList(cb:any) {
    // cb为搜索后的回调钩子
    const res = await this.api.getPoint(this.questionnaireId)
    if (res.code === 0) {
      let GraduationPointList = res.data.map((item:m.GraduationPoint) => {
        return { value: item.no }
      })
      cb(GraduationPointList)
    }
  }

  async queryGraduationPointSelectList() {
    const res = await this.api.getPoint(this.questionnaireId)
    if (res.code === 0) {
      this.graduationPointList = res.data
    }
  }

  handleFilter() {
    this.queryOptions.page = 1
    this.requestData()
  }

  async handlemove(id, operate) {
    const res = await this.api.CourseTargetMove(id, operate)
    if (res.code === 0) {
      this.requestData()
    } else {
      this.$message({
        type: 'warning',
        message: '移动失败，请稍后再试！'
      })
    }
  }

  async handlecopy(id) {
    const res = await this.api.CourseTargetCopy(id)
    if (res.code === 0) {
      this.requestData()
    } else {
      this.$message({
        type: 'warning',
        message: '复制失败，请稍后再试！'
      })
    }
  }

  async requestData() {
    this.loading = true
    const res = await this.api.queryCourseTarget(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }

  smallScore(score, index) {
    if (this.courseTarget.totalScore !== undefined) {
      if (this.courseTarget.totalScore < score) {
        this.$message.error('不能大于总分')
        this.optionsList[index].score = this.courseTarget.totalScore.toString()
      }
    }
  }

  handleCreate() {
    let optionsList = [{ prefix: 'A', content: '', score: '' },
      { prefix: 'B', content: '', score: '' },
      { prefix: 'C', content: '', score: '' },
      { prefix: 'D', content: '', score: '' }]
    this.optionsList = optionsList
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
    this.courseTarget = courseTarget
    if (courseTarget.options !== undefined) {
      this.optionsList = JSON.parse(courseTarget.options)
    }
    this.editForm = {
      title: courseTarget.title,
      pointId: courseTarget.pointId,
      questionnaireId: courseTarget.questionnaireId,
      options: courseTarget.options,
      sequence: courseTarget.sequence,
      totalScore: courseTarget.totalScore,
      describes: courseTarget.describes
    }
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

  handleDelete(id:number) {
    this.$confirm(`确定删除该题吗？`, '提示', {
      type: 'warning'
    }).then(async() => {
      const res = await this.api.deleteCourseTarget(id)
      if (res.code === 0) {
        this.requestData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    })
  }

  handleSelect(select:m.CourseTarget[]) {
    this.selectCourseTargetId = select.map((item:m.CourseTarget) => {
      return item.id
    })
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
