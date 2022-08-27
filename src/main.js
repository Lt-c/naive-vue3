import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'

const app = createApp(App)

setupStore(app) /* 需要注意引入插件循序 */
setupRouter(app) /* 在文件中挂载router */
app.mount('#app')
