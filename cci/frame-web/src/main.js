import Vue from 'vue'
import './core/use'
import bootstrap from './core/bootstrap'
import router from '@/router'
import App from './App'
import store from '@/store'
import 'normalize.css/normalize.css'
// 城云layout组件样式包
import '@cci/cp-frame-layout-theme/src/index.scss'
// cci基础框架样式
import '@cci/theme-ant-design/src/index.scss'
// cp组件的样式包
import '@cci/cp-theme-default/src/index.scss'

import './styles/index.scss'
import { initPermissionInstance, AuthType } from '@/permission/permissionFactory'

Vue.config.productionTip = false

// 默认使用三中心的权限控制
initPermissionInstance(AuthType.TC)

const init = function () {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    created: bootstrap,
    store,
    render: h => h(App)
  })
}
init()
