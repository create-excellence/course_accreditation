import Vue from 'vue'
import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import * as api from '@/api/api'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'
import Pagination from '@/components/Pagination/index.vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import TextEditor from '@/components/TextEditor/TextEditor.vue'

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})
Vue.prototype.api = api
Vue.component('pagination', Pagination)
Vue.component('excel-dialog', UploadExcel)
Vue.component('text-editor', TextEditor)
Vue.config.productionTip = false

declare module 'vue/types/vue' {
  interface Vue {
    api: api.api
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
