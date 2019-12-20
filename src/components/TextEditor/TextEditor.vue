<template>
  <div class="text-editor">
    <div
      ref="toolbar"
      class="toolbar"
    >
      <button class="ql-bold" />
      <button class="ql-italic" />
      <button class="ql-underline" />
      <!-- <select class="ql-size">
        <option value="small">小</option>
        <option selected>正常</option>
        <option value="large">大</option>
        <option value="huge">超大</option>
      </select> -->
      <!-- Add subscript and superscript buttons -->
      <button
        class="ql-script"
        value="sub"
      />
      <button
        class="ql-script"
        value="super"
      />
      <select class="ql-color my-line-height" />
      <!-- <select class="ql-background">
      </select>
      <select class="ql-font">
      </select> -->
      <button ref="image-button">
        <i class="el-icon-picture size" />
      </button>
    </div>
    <div
      ref="editor"
      class="editor"
    />
    <input
      ref="image-input"
      accept="image/*"
      type="file"
      @change="handleUploadImageFiles"
    >
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import * as log from '@/log'
import { extractRejectText } from '@/utils'
import { string2delta, deltaToString } from '@/utils/quill'
// import { StorageTokenCategory } from '@/api/types'
// import { uploadFile } from '@/api'

const MAX_VIDEO_SIZE = 50 * 1000 * 1000 // 50M
const MAX_IMAGE_SIZE = 500 * 1000 // 500K

@Component({})
export default class extends Vue {
  @Model('input') value!: string;
  editor!: Quill;
  imageButton!: HTMLButtonElement;
  videoButton!: HTMLButtonElement;
  mounted() {
    const editorE = this.$refs['editor'] as HTMLElement
    const toolbarE = this.$refs['toolbar'] as HTMLElement
    const editor = new Quill(editorE, {
      modules: { toolbar: toolbarE },
      theme: 'snow'
    })
    if (this.value) {
      let content = string2delta(this.value)
      editor.setContents(content as any)
    }
    this.editor = editor
    this.imageButton = this.$refs['image-button'] as HTMLButtonElement
    const imageInput = this.$refs['image-input'] as HTMLInputElement
    this.imageButton.addEventListener('click', function(ev) {
      imageInput.click()
      ev.preventDefault()
    })
    editor.on('text-change', (newDelta, oldDelta, source) => {
      const newValue = deltaToString(newDelta)
      log.info('text-changed ', newValue)
      const contents = editor.getContents()
      const value = deltaToString(contents)
      this.$emit('input', value)
    })
  }

  appendImage(imgUrl: string) {
    const selection = this.editor.getSelection()
    const index = selection ? selection.index : 0
    this.editor.insertEmbed(index, 'image', imgUrl)
    this.editor.setSelection(index + 1, 1)
  }

  handleUploadImageFiles(e: UIEvent) {
    const input = e.target as HTMLInputElement
    const selectedFile = input.files && input.files[0]
    if (!selectedFile) {
      log.error('No select image', input)
      return
    }
    log.debug('selected file:', selectedFile)
    if (selectedFile.size > MAX_IMAGE_SIZE) {
      this.$message.error('图片不能大于500K')
    }
  //   uploadFile(selectedFile, StorageTokenCategory.paper)
  //     .then((res: any) => {
  //       log.info('Upload image success ', res)
  //       this.appendImage(res.url)
  //     })
  //     .catch((reason: any) => {
  //       this.$message.error(extractRejectText(reason))
  //     })
  }
}
</script>
<style lang="scss" scoped>
.text-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  .editor {
    flex: 1;
    height: 83%;
    min-height: 100px;
  }
  .toolbar {
    // height: 32px;
    // background: blanchedalmond;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
  input[type="file"] {
    display: none;
    position: absolute;
  }
}
.my-line-height {
  line-height: 0 !important;
}
.size {
  font-size: 17px;
}
</style>
