<template>
  <el-dialog
    :title="showData?'导入数据结果':'通过Excel批量导入'"
    :visible.sync="visible"
    width="50%"
  >
    <div>
      <el-row v-if="!showData">
        <el-col :span="7">
          &nbsp;
        </el-col>
        <el-col :span="13">
          <el-upload
            class="upload-demo"
            drag
            :action="'http://localhost:8888/v1'+action"
            :show-file-list="false"
            :on-success="success"
            :headers="headers"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将Excel文件拖到此处，或<em>点击上传</em>
            </div>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              1.只能上传xls/xlsx文件，且不超过10MB
            </div>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              2.必须按照模板上传
              <el-link
                type="primary"
              >
                点击下载模板
              </el-link>
            </div>
          </el-upload>
        </el-col>
        <el-col :span="4">
         &nbsp;
        </el-col>
      </el-row>
      <div v-if="showData">
        <el-button
          icon="el-icon-back"
          @click="handleBack"
        >
          返回
        </el-button>
        <el-table
          :data="data.slice((pageOption.page-1)*pageOption.pageSize,pageOption.page*pageOption.pageSize)"
          style="width: 100%"
        >
          <el-table-column
            prop="no"
            label="序号"
            width="180"
          />
          <el-table-column
            prop="status"
            label="操作状态"
            width="180"
          >
            <template slot-scope="scope">
              <img
                v-if="scope.row.status===0"
                src="@/icons/svg/success.svg"
              >
              <img
                v-if="scope.row.status===1"
                src="@/icons/svg/fail.svg"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="message"
            label="操作信息"
          />
          <el-table-column
            prop="createTime"
            label="操作时间"
          />
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="pageOption.page"
          :limit.sync="pageOption.pageSize"
        />
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'UploadExcel'
})
export default class extends Vue {
    @Prop({ default: false, required: true }) private show!: boolean
    @Prop({ required: true }) private action!: string
    data=[]
    total = 0
    showData = false
    // TODO 下载模板未完成
  pageOption={
    page: 1,
    pageSize: 10
  }

  headers={} as any

  created() {
    if (UserModule.token) {
      this.headers['Authentication'] = UserModule.token
    }
  }

  get visible() {
    return this.show
  }

  set visible(value) {
    this.$emit('update:show', value)
  }

  handleBack() {
    this.pageOption.page = 1
    this.showData = false
  }

  success(res:any) {
    this.showData = true
    this.data = res.data
    this.total = res.data.length
    this.$emit('requestData')
  }
}
</script>
