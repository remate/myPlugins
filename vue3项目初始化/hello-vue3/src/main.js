import { createApp } from 'vue'
import App from './App.vue'
import plus from './untils/use'

let app = createApp(App)
app.use(plus, {
    num: 'plusNum'
})
app.config.globalProperties.msg=1
app.mount('#app')
