import Vue from 'vue'

// UI Library
import cui from '@cci/cui'
// import PCUi from '@cm/cm-pc-ui'
// import '@cm/cm-pc-ui/lib/theme-chalk/index.css'
import './lazyUse'
import CodeBox from '@/components/CodeBox'

// Lib Library
import cm from '@cm/cm-lib'

// icons
import '@/icons'

// directive
import '@/directive/index'

Vue.use(cui)
Vue.use(cm)
// Vue.use(PCUi)
Vue.component('CodeBox', CodeBox)
