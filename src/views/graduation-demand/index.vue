<template>
  <div>
    <text-editor
      ref="title"
      v-model="editForm.content"
      placeholder="请输入文本"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// import AppModule from '@/store/app'
// import * as api from '@/api'
// import * as m from '@/api/models'
import * as m from '@/api/model'
import * as api from '@/api/api'
import { ElForm } from 'element-ui/types/form'
import { Quill } from 'quill'
import { string2delta, deltaToString } from '@/utils/quill'
import { deepcopy } from '../../utils'

@Component({
  name: 'GraduationDemand'
})
export default class extends Vue {
  // @Prop({
  //   type: Object, // 父组件传递给子组件的数据类型
  //   required: false, // 是否必填
  //   default: () => ({}) // 默认值， 如果传入的是 Object，则要 default: ()=>({}) 参数为函数
  // })

  editForm = {
    majorId: undefined,
    no: '',
    content: ''
  };

  rules = {
    majorId: [{ required: true, message: '专业不能为空', trigger: 'blur' }],
    no: [{ required: true, message: '编号不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
  };

  created() {
    this.init()
  }

  async init() {
  }

  cancel() {
    this.$emit('cancel')
  }
}
</script>
