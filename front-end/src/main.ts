import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'
import registerGlobalComponents from './plugins/global-components'


const app = createApp(App)
app.use(router)
registerGlobalComponents(app)
app.mount('#app')
