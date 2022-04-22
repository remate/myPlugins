import { createApp } from 'vue'
import App from './App.vue'
import plus from './untils/use'

let app = createApp(App)
app.use(plus, {
    num: 'plusNum'
})
app.mount('#app')
