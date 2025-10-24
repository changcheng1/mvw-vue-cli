import { createApp } from 'vue'
import Antd from 'ant-design-vue'{{#if useRouter}}
import router from './router'{{/if}}{{#if usePinia}}
import { createPinia } from 'pinia'{{/if}}
import App from './App.vue'

import 'ant-design-vue/dist/reset.css'{{#if hasScss}}
import './style/main.scss'{{/if}}{{#if hasLess}}
import './style/main.less'{{/if}}

const app = createApp(App)

app.use(Antd){{#if useRouter}}
app.use(router){{/if}}{{#if usePinia}}
app.use(createPinia()){{/if}}

app.mount('#app')