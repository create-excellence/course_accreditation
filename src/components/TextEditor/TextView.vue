<template>
  <div
    ref="preview-editor"
    class="preview-editor"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Quill, { Delta, DeltaStatic, DeltaOperation } from 'quill'

import 'quill/dist/quill.core.css'
import { string2delta } from '@/utils/quill'

@Component({})
export default class TextPreview extends Vue {
  @Prop({})
  value!: any;
  editor!: Quill;

  mounted() {
    const editorE = this.$refs['preview-editor'] as HTMLElement
    const editor = new Quill(editorE, {})
    editor.disable()
    this.editor = editor
    if (this.value) {
      this.setContents(this.value)
    }
  }

  @Watch('delta')
  onDeltaChanged(newValue: any) {
    this.setContents(newValue)
  }

  setContents(delta: any) {
    if (typeof delta === 'string') {
      delta = string2delta(delta)
    }
    this.editor.setContents(delta)
  }
}
</script>
