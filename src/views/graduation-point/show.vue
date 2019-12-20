<template>
  <div class="app-container">
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
      </el-form-item>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as m from '@/api/model'

@Component({})
export default class GraduationPoint extends Vue {
  data:m.GraduationPoint[] = []
  total = 0
  loading = true

  queryOptions = {
    no: '',
    content: '',
    page: 1,
    pageSize: 20
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
    const res = await this.api.queryGraduationPoint(this.queryOptions)
    this.data = res.data.list
    this.total = res.data.total
    this.loading = false
  }
}
</script>
