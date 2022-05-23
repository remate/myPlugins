import Vue from 'vue'

// UI Library
import cui from '@cci/cui'
import CMUi from '@cm/cm-ui'
import '@cm/cm-ui/lib/index.less'

import './lazy-use'

// Lib Library
import cm from '@cm/cm-lib'

// icons
import '@/icons'

// directive
import '@/directive/index'

Vue.use(cui)
Vue.use(CMUi)
Vue.use(cm)
