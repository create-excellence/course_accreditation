<template>
  <div>
    <router-view v-if="goSupportingCourse" />
    <div
      v-else
      class="app-container"
    >
      <el-form
        ref="searchForm"
        :inline="true"
        :model="queryOptions"
        @submit.native.prevent="handleFilter"
      >
        <el-form-item
          prop="no"
        >
          <el-input
            v-model="queryOptions.no"
            placeholder="请输入指标点编号"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item
          prop="content"
        >
          <el-input
            v-model="queryOptions.content"
            placeholder="请输入指标点内容"
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
            指标点
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
          label="指标点编号"
          prop="no"
        />
        <el-table-column
          align="center"
          label="毕业要求编号"
          prop="graduationDemandNo"
        />
        <el-table-column
          align="center"
          label="指标点内容"
          prop="content"
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
              style="margin-bottom: 10px"
              size="mini"
              type="primary"
              @click="$router.push(`/graduation-demand/${queryOptions.graduationDemandId}/graduation-point/${scope.row.id}/supporting-course`)"
            >
              查看支撑课程
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
        :total="total"
        :page.sync="queryOptions.page"
        :limit.sync="queryOptions.pageSize"
        @pagination="requestData"
      />

      <el-dialog
        :title="`${graduationPoint.id ? '编辑' : '添加'}指标点`"
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
            label="指标点编号"
          >
            <el-input
              v-model="editForm.no"
              placeholder="请输入指标点编号"
              maxlength="10"
            />
          </el-form-item>
          <el-form-item
            prop="graduationDemandId"
            label="毕业要求编号"
          >
            <el-select
              v-model="editForm.graduationDemandId"
              placeholder="请选择毕业要求编号"
            >
              <el-option
                v-for="item in graduationDemandList"
                :key="item.id"
                :label="item.no"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            prop="content"
            label="指标点内容"
          >
            <el-input
              v-model="editForm.content"
              placeholder="请输入指标点内容"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class GraduationPoint extends Vue {
  data:m.GraduationPoint[] = []
  total = 0
  loading = true
  graduationPoint: m.GraduationPoint = {} as any
  showDialog = false
  editForm:m.CreateGraduationPointForm={} as any
  showCheckbox = false
  selectGraduationPointId:number[] = []
  showExcelDialog=false
  graduationDemandList: m.GraduationDemand[] = []
  goSupportingCourse =false

  queryOptions = {
    no: '',
    content: '',
    graduationDemandId: -1,
    page: 1,
    pageSize: 20
  }

  rules={
    name: [{ required: true, message: '指标点名称不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '指标点代码不能为空', trigger: 'blur' }]
  }

  created() {
    this.init()
  }

 @Watch('$route')
  routechange(to: any, from: any) {
    if (to.path.indexOf('supporting-course') !== -1) {
      this.goSupportingCourse = true
    } else {
      this.goSupportingCourse = false
    }
  }

 async init() {
   let graduationDemandId = Number(this.$route.params.graduationDemandId)
   this.queryOptions.graduationDemandId = graduationDemandId
   let res = await this.api.getGraduationDemand(graduationDemandId)
   if (res.code === 0) {
     this.graduationDemandList.push(res.data)
   }

   this.requestData()
 }

 handleFilter() {
   this.queryOptions.page = 1
   this.requestData()
 }

 async requestData() {
   this.loading = true
   const res = await this.api.queryGraduationPoint(this.queryOptions)
   this.data = res.data.list
   this.total = res.data.total
   this.loading = false
 }

 handleCreate() {
   this.graduationPoint = {} as any
   this.resetForm()
   this.showDialog = true
 }

 resetForm() {
   this.editForm = {
     no: '',
     graduationDemandId: this.queryOptions.graduationDemandId,
     content: ''
   }
 }

 handleEdit(graduationPoint: m.GraduationPoint) {
   this.graduationPoint = graduationPoint
   this.editForm = {
     no: graduationPoint.no,
     graduationDemandId: graduationPoint.graduationDemandId,
     content: graduationPoint.content
   }
   this.showDialog = true
 }

 handleSave() {
   (this.$refs['editForm'] as ElForm).validate(async(valid : boolean) => {
     if (valid) {
       if (this.graduationPoint.id) {
         const res = await this.api.putGraduationPoint(this.graduationPoint.id, this.editForm)
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
         const res = await this.api.createGraduationPoint(this.editForm)
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

 handleDelete(graduationPoint: m.GraduationPoint) {
   this.$confirm(`确定删除改指标点吗？`, '提示', {
     type: 'warning'
   }).then(async() => {
     const res = await this.api.deleteGraduationPoint(graduationPoint.id)
     if (res.code === 0) {
       this.$message({
         type: 'success',
         message: '删除成功!'
       })
       this.data = this.data.filter((e: m.GraduationPoint) => e.id !== graduationPoint.id)
       if (this.total > 1) {
         this.total--
       } else {
         this.requestData()
       }
     }
   })
 }

 handleSelect(select:m.GraduationPoint[]) {
   this.selectGraduationPointId = select.map((item:m.GraduationPoint) => {
     return item.id
   })
 }

 handleBatchDelete() {
   if (this.selectGraduationPointId.length < 1) {
     this.$message({
       type: 'warning',
       message: '请先选择要删除项'
     })
     return
   }
   this.$confirm(`确定要批量删除所选项吗？`, '提示', {
     type: 'warning'
   }).then(async() => {
     const res = await this.api.batchDeleteGraduationPoint(this.selectGraduationPointId)
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
