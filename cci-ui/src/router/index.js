import Vue from 'vue'
import Router from 'vue-router'

import { createRouter } from './router'
import Layout from '../layout'

Vue.use(Router)

export default createRouter(Layout)
