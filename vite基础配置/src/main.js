import { createApp } from 'vue'
import App from './App.vue'
import '@/index.css'
import 'styles/index.scss'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import { Button } from 'vant';
const app = createApp(App)
app.use(Button);
app.component(SvgIcon.name, SvgIcon)
app.mount('#app')
